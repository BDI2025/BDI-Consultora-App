const https = require('https');
const POLYGON_API_KEY = process.env.POLYGON_API_KEY || '';
const {
  HEATMAP_UNIVERSE_USA,
  HEATMAP_UNIVERSE_ARGENTINA_ARS,
  HEATMAP_UNIVERSE_ARGENTINA_USD,
} = require('../../shared/heatmap-config');
const {
  parseHeatmapDate,
  getArgentinaHeatmapHistorySymbol,
  normalizeArgentinaHistoricalRow,
  computeArgentinaRangeChange,
} = require('../../shared/heatmap-helpers');
const {
  buildArgentinaLiveHeatmapData,
  buildArgentinaRangeHeatmapData,
} = require('../../shared/heatmap-provider-data912');
const {
  buildYahooQuoteMap,
  buildYahooChartHeatmapData,
  buildYahooRangeHeatmapData,
} = require('../../shared/heatmap-provider-yahoo');
const {
  getHeatmapExecutionPlan,
} = require('../../shared/heatmap-orchestration');
const {
  createHeatmapTile,
} = require('../../shared/heatmap-tile-contract');
const {
  finalizeHeatmapDataset,
  logHeatmapDatasetSummary,
} = require('../../shared/heatmap-observability');

const HEATMAP_UNIVERSE = HEATMAP_UNIVERSE_USA;
const ARGENTINA_HEATMAP_ARS = HEATMAP_UNIVERSE_ARGENTINA_ARS;
const ARGENTINA_HEATMAP_USD = HEATMAP_UNIVERSE_ARGENTINA_USD;

const heatmapReferenceCache = new Map();
const argentinaHeatmapHistoryCache = new Map();

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function fetchArgentinaHeatmapData(variant = 'argentina-ars') {
  const universe = variant === 'argentina-usd' ? ARGENTINA_HEATMAP_USD : ARGENTINA_HEATMAP_ARS;
  const response = await fetchJSON('https://data912.com/live/arg_stocks');
  const rows = Array.isArray(response) ? response : [];
  return buildArgentinaLiveHeatmapData(variant, universe, rows);
}

async function fetchArgentinaHistoricalSeries(symbol) {
  const normalizedSymbol = String(symbol || '').trim().toUpperCase();
  if (!normalizedSymbol) return [];

  const cached = argentinaHeatmapHistoryCache.get(normalizedSymbol);
  if (cached && (Date.now() - cached.cachedAt) < 6 * 60 * 60 * 1000) {
    return cached.data;
  }

  const payload = await fetchJSON(`https://data912.com/historical/stocks/${encodeURIComponent(normalizedSymbol)}`);
  const data = (Array.isArray(payload) ? payload : [])
    .map(normalizeArgentinaHistoricalRow)
    .filter(Boolean)
    .sort((a, b) => a.date.localeCompare(b.date));

  argentinaHeatmapHistoryCache.set(normalizedSymbol, { cachedAt: Date.now(), data });
  return data;
}

async function fetchArgentinaRangeHeatmapData(variant = 'argentina-ars', startDate, endDate = null) {
  const universe = variant === 'argentina-usd' ? ARGENTINA_HEATMAP_USD : ARGENTINA_HEATMAP_ARS;
  const liveResponse = await fetchJSON('https://data912.com/live/arg_stocks');
  const liveRows = Array.isArray(liveResponse) ? liveResponse : [];

  const historySymbols = [...new Set(universe.map(getArgentinaHeatmapHistorySymbol).filter(Boolean))];
  const historyResults = await Promise.allSettled(historySymbols.map((symbol) => fetchArgentinaHistoricalSeries(symbol)));
  const historyMap = new Map(
    historySymbols.map((symbol, index) => [
      symbol,
      historyResults[index].status === 'fulfilled' ? historyResults[index].value : [],
    ])
  );

  return buildArgentinaRangeHeatmapData(variant, universe, liveRows, historyMap, startDate, endDate);
}

function fetchPolygonJSON(pathname, query = {}) {
  return new Promise((resolve, reject) => {
    if (!POLYGON_API_KEY) {
      reject(new Error('Polygon API key is not configured'));
      return;
    }

    const params = new URLSearchParams({ ...query, apiKey: POLYGON_API_KEY });
    const url = `https://api.polygon.io${pathname}?${params.toString()}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

function fetchYahooChart(ticker) {
  return fetchJSON(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=5d`);
}

async function fetchYahooQuoteBatch(tickers) {
  const symbols = tickers.filter(Boolean);
  if (!symbols.length) return new Map();

  const chunkSize = 25;
  const batches = [];
  for (let index = 0; index < symbols.length; index += chunkSize) {
    batches.push(symbols.slice(index, index + chunkSize));
  }

  try {
    const responses = await Promise.all(batches.map(async (chunk) => {
      const json = await fetchJSON(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(chunk.join(','))}`);
      return Array.isArray(json?.quoteResponse?.result) ? json.quoteResponse.result : [];
    }));

    return buildYahooQuoteMap(responses.flat());
  } catch (error) {
    console.warn('Yahoo quote batch unavailable, using chart fallback:', error.message);
    return new Map();
  }
}

async function fetchYahooChartHeatmapData(universe, quoteMap = new Map()) {
  const results = await Promise.allSettled(universe.map(async (item) => {
    const json = await fetchYahooChart(item.ticker);
    const meta = json?.chart?.result?.[0]?.meta;
    if (!meta) throw new Error(`Invalid Yahoo response for ${item.ticker}`);
    return {
      price: Number(meta.regularMarketPrice) || null,
      prevClose: Number(meta.chartPreviousClose || meta.previousClose) || 0,
    };
  }));
  const chartPayloads = results.map((result) => (result.status === 'fulfilled' ? result.value : null));
  return buildYahooChartHeatmapData(universe, chartPayloads, quoteMap);
}

async function fetchYahooRangeChange(ticker, startDate, endDate = null) {
  const startTs = Math.floor(startDate.getTime() / 1000);
  const endTs = endDate
    ? Math.floor((endDate.getTime() + 24 * 60 * 60 * 1000) / 1000)
    : Math.floor(Date.now() / 1000);
  const json = await fetchJSON(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&period1=${startTs}&period2=${endTs}`);
  const result = json?.chart?.result?.[0];
  const meta = result?.meta;
  const closes = result?.indicators?.quote?.[0]?.close || [];
  const timestamps = result?.timestamp || [];
  const series = closes.filter((value) => value !== null && Number.isFinite(value));
  if (!meta || series.length < 1) {
    throw new Error(`Invalid Yahoo range response for ${ticker}`);
  }
  const startPrice = Number(series[0]);
  const lastClose = Number(series[series.length - 1]);
  const livePrice = Number(meta.regularMarketPrice);
  const lastTimestamp = timestamps.length ? timestamps[timestamps.length - 1] : null;
  const lastSeriesDate = Number.isFinite(lastTimestamp)
    ? new Date(lastTimestamp * 1000).toISOString().slice(0, 10)
    : null;
  const endIso = endDate ? endDate.toISOString().slice(0, 10) : null;
  const shouldUseLivePrice = Boolean(
    endDate
    && Number.isFinite(livePrice)
    && lastSeriesDate
    && lastSeriesDate < endIso
  );
  const endPrice = endDate
    ? (shouldUseLivePrice ? livePrice : lastClose)
    : (Number.isFinite(livePrice) ? livePrice : lastClose);
  const change = startPrice ? ((endPrice - startPrice) / startPrice) * 100 : 0;
  return { price: endPrice, change };
}

async function fetchYahooRangeHeatmapData(universe, quoteMap = new Map(), startDate, endDate = null) {
  const results = await Promise.allSettled(universe.map(async (item) => {
    const performance = await fetchYahooRangeChange(item.ticker, startDate, endDate);
    return [item.ticker, performance];
  }));
  const performanceMap = new Map(
    results
      .map((result) => (result.status === 'fulfilled' ? result.value : null))
      .filter(Boolean)
  );
  return buildYahooRangeHeatmapData(universe, performanceMap, quoteMap);
}

async function fetchPolygonTickerReference(ticker) {
  const cached = heatmapReferenceCache.get(ticker);
  if (cached && (Date.now() - cached.cachedAt) < 24 * 60 * 60 * 1000) {
    return cached.data;
  }

  const payload = await fetchPolygonJSON(`/v3/reference/tickers/${ticker}`);
  const data = payload?.results || null;
  if (data) {
    heatmapReferenceCache.set(ticker, { cachedAt: Date.now(), data });
  }
  return data;
}

async function fetchPolygonReferenceHeatmapData(universe) {
  const references = await Promise.allSettled(universe.map((item) => fetchPolygonTickerReference(item.ticker)));
  const quoteMap = await fetchYahooQuoteBatch(universe.map((item) => item.ticker));

  return universe.map((item, index) => {
    const referenceResult = references[index];
    const reference = referenceResult.status === 'fulfilled' ? referenceResult.value : null;
    const quote = quoteMap.get(item.ticker);
    const price = quote?.price ?? null;
    const change = quote?.change;
    const marketCap = Number(reference?.market_cap) || Number(item.marketCap) || 0;
    return createHeatmapTile({
      ...item,
      name: quote?.name || reference?.name || item.ticker,
      price,
      change: Number.isFinite(change) ? Math.round(change * 100) / 100 : null,
      marketCap,
      industry: reference?.sic_description || item.industry,
    });
  }).filter((item) => item.marketCap > 0 && item.price != null && item.change != null);
}

function buildHeatmapNetlifyResponse({ market, provider, data }) {
  const { data: normalizedData, summary } = finalizeHeatmapDataset(data);
  logHeatmapDatasetSummary({ market, provider, summary, runtime: 'netlify' });
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=120',
    },
    body: JSON.stringify({
      data: normalizedData,
      provider,
      updated: new Date().toISOString(),
    }),
  };
}

exports.handler = async (event) => {
  try {
    const market = String(event?.queryStringParameters?.market || 'usa').toLowerCase();
    const startDate = parseHeatmapDate(event?.queryStringParameters?.start || '');
    const endDate = parseHeatmapDate(event?.queryStringParameters?.end || '');
    const plan = getHeatmapExecutionPlan({ market, startDate, polygonApiKey: POLYGON_API_KEY });

    if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Invalid heatmap date range' }),
      };
    }

    if (plan.branch === 'argentina') {
      const data = plan.useRange
        ? await fetchArgentinaRangeHeatmapData(market, startDate, endDate)
        : await fetchArgentinaHeatmapData(market);
      return buildHeatmapNetlifyResponse({
        market,
        provider: plan.provider,
        data,
      });
    }

    let data = [];
    let provider = plan.provider;

    if (plan.tryPolygonReference) {
      try {
        data = await fetchPolygonReferenceHeatmapData(HEATMAP_UNIVERSE);
        provider = 'polygon-reference+yahoo';
      } catch (polygonError) {
        console.warn('Polygon heatmap failed, falling back to Yahoo:', polygonError.message);
      }
    }

    if (!data.length) {
      const yahooQuotes = await fetchYahooQuoteBatch(HEATMAP_UNIVERSE.map((item) => item.ticker));
      data = plan.useRange
        ? await fetchYahooRangeHeatmapData(HEATMAP_UNIVERSE, yahooQuotes, startDate, endDate)
        : await fetchYahooChartHeatmapData(HEATMAP_UNIVERSE, yahooQuotes);
    }

    return buildHeatmapNetlifyResponse({ market, provider, data });
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
