const https = require('https');
const POLYGON_API_KEY = process.env.POLYGON_API_KEY || '';

const HEATMAP_UNIVERSE = [
  { ticker: 'MSFT', sector: 'Technology', industry: 'Software - Infrastructure', marketCap: 3100000000000 },
  { ticker: 'ORCL', sector: 'Technology', industry: 'Software - Infrastructure', marketCap: 470000000000 },
  { ticker: 'PLTR', sector: 'Technology', industry: 'Software - Infrastructure', marketCap: 220000000000 },
  { ticker: 'SNPS', sector: 'Technology', industry: 'Software - Application', marketCap: 90000000000 },
  { ticker: 'CRM', sector: 'Technology', industry: 'Software - Application', marketCap: 270000000000 },
  { ticker: 'ADBE', sector: 'Technology', industry: 'Software - Application', marketCap: 240000000000 },
  { ticker: 'INTU', sector: 'Technology', industry: 'Software - Application', marketCap: 180000000000 },
  { ticker: 'NOW', sector: 'Technology', industry: 'Software - Application', marketCap: 160000000000 },
  { ticker: 'IBM', sector: 'Technology', industry: 'Information Technology Services', marketCap: 240000000000 },
  { ticker: 'ACN', sector: 'Technology', industry: 'Information Technology Services', marketCap: 210000000000 },
  { ticker: 'CSCO', sector: 'Technology', industry: 'Communication Equipment', marketCap: 200000000000 },
  { ticker: 'ANET', sector: 'Technology', industry: 'Communication Equipment', marketCap: 120000000000 },
  { ticker: 'NVDA', sector: 'Technology', industry: 'Semiconductors', marketCap: 4300000000000 },
  { ticker: 'AVGO', sector: 'Technology', industry: 'Semiconductors', marketCap: 1600000000000 },
  { ticker: 'AMD', sector: 'Technology', industry: 'Semiconductors', marketCap: 360000000000 },
  { ticker: 'MU', sector: 'Technology', industry: 'Semiconductors', marketCap: 140000000000 },
  { ticker: 'QCOM', sector: 'Technology', industry: 'Semiconductors', marketCap: 250000000000 },
  { ticker: 'TXN', sector: 'Technology', industry: 'Semiconductors', marketCap: 190000000000 },
  { ticker: 'AMAT', sector: 'Technology', industry: 'Semiconductor Equipment & Materials', marketCap: 170000000000 },
  { ticker: 'LRCX', sector: 'Technology', industry: 'Semiconductor Equipment & Materials', marketCap: 120000000000 },
  { ticker: 'KLAC', sector: 'Technology', industry: 'Semiconductor Equipment & Materials', marketCap: 100000000000 },
  { ticker: 'INTC', sector: 'Technology', industry: 'Semiconductors', marketCap: 130000000000 },
  { ticker: 'AAPL', sector: 'Technology', industry: 'Consumer Electronics', marketCap: 3800000000000 },
  { ticker: 'AMZN', sector: 'Consumer Cyclical', industry: 'Internet Retail', marketCap: 2400000000000 },
  { ticker: 'BKNG', sector: 'Consumer Cyclical', industry: 'Travel Services', marketCap: 160000000000 },
  { ticker: 'UBER', sector: 'Consumer Cyclical', industry: 'Software - Application', marketCap: 170000000000 },
  { ticker: 'TSLA', sector: 'Consumer Cyclical', industry: 'Auto Manufacturers', marketCap: 980000000000 },
  { ticker: 'HD', sector: 'Consumer Cyclical', industry: 'Home Improvement', marketCap: 360000000000 },
  { ticker: 'LOW', sector: 'Consumer Cyclical', industry: 'Home Improvement', marketCap: 140000000000 },
  { ticker: 'MCD', sector: 'Consumer Cyclical', industry: 'Restaurants', marketCap: 220000000000 },
  { ticker: 'CMG', sector: 'Consumer Cyclical', industry: 'Restaurants', marketCap: 80000000000 },
  { ticker: 'TJX', sector: 'Consumer Cyclical', industry: 'Apparel Retail', marketCap: 130000000000 },
  { ticker: 'NKE', sector: 'Consumer Cyclical', industry: 'Apparel Retail', marketCap: 110000000000 },
  { ticker: 'GOOGL', sector: 'Communication Services', industry: 'Internet Content & Information', marketCap: 2300000000000 },
  { ticker: 'META', sector: 'Communication Services', industry: 'Internet Content & Information', marketCap: 1500000000000 },
  { ticker: 'NFLX', sector: 'Communication Services', industry: 'Entertainment', marketCap: 520000000000 },
  { ticker: 'DIS', sector: 'Communication Services', industry: 'Entertainment', marketCap: 180000000000 },
  { ticker: 'CMCSA', sector: 'Communication Services', industry: 'Telecom Services', marketCap: 160000000000 },
  { ticker: 'TMUS', sector: 'Communication Services', industry: 'Telecom Services', marketCap: 330000000000 },
  { ticker: 'VZ', sector: 'Communication Services', industry: 'Telecom Services', marketCap: 190000000000 },
  { ticker: 'T', sector: 'Communication Services', industry: 'Telecom Services', marketCap: 130000000000 },
  { ticker: 'WMT', sector: 'Consumer Defensive', industry: 'Discount Stores', marketCap: 780000000000 },
  { ticker: 'COST', sector: 'Consumer Defensive', industry: 'Discount Stores', marketCap: 420000000000 },
  { ticker: 'KO', sector: 'Consumer Defensive', industry: 'Beverages - Non-Alcoholic', marketCap: 320000000000 },
  { ticker: 'PG', sector: 'Consumer Defensive', industry: 'Household & Personal Products', marketCap: 380000000000 },
  { ticker: 'PEP', sector: 'Consumer Defensive', industry: 'Beverages - Non-Alcoholic', marketCap: 240000000000 },
  { ticker: 'PM', sector: 'Consumer Defensive', industry: 'Tobacco', marketCap: 150000000000 },
  { ticker: 'MO', sector: 'Consumer Defensive', industry: 'Tobacco', marketCap: 90000000000 },
  { ticker: 'CL', sector: 'Consumer Defensive', industry: 'Household & Personal Products', marketCap: 80000000000 },
  { ticker: 'KMB', sector: 'Consumer Defensive', industry: 'Household & Personal Products', marketCap: 45000000000 },
  { ticker: 'LLY', sector: 'Healthcare', industry: 'Drug Manufacturers - General', marketCap: 720000000000 },
  { ticker: 'JNJ', sector: 'Healthcare', industry: 'Drug Manufacturers - General', marketCap: 370000000000 },
  { ticker: 'MRK', sector: 'Healthcare', industry: 'Drug Manufacturers - General', marketCap: 210000000000 },
  { ticker: 'ABBV', sector: 'Healthcare', industry: 'Drug Manufacturers - General', marketCap: 340000000000 },
  { ticker: 'PFE', sector: 'Healthcare', industry: 'Drug Manufacturers - General', marketCap: 160000000000 },
  { ticker: 'UNH', sector: 'Healthcare', industry: 'Healthcare Plans', marketCap: 470000000000 },
  { ticker: 'ABT', sector: 'Healthcare', industry: 'Medical Devices', marketCap: 220000000000 },
  { ticker: 'TMO', sector: 'Healthcare', industry: 'Diagnostics & Research', marketCap: 200000000000 },
  { ticker: 'DHR', sector: 'Healthcare', industry: 'Diagnostics & Research', marketCap: 180000000000 },
  { ticker: 'ISRG', sector: 'Healthcare', industry: 'Medical Devices', marketCap: 160000000000 },
  { ticker: 'JPM', sector: 'Financial', industry: 'Banks - Diversified', marketCap: 670000000000 },
  { ticker: 'BAC', sector: 'Financial', industry: 'Banks - Diversified', marketCap: 320000000000 },
  { ticker: 'WFC', sector: 'Financial', industry: 'Banks - Diversified', marketCap: 260000000000 },
  { ticker: 'C', sector: 'Financial', industry: 'Banks - Diversified', marketCap: 120000000000 },
  { ticker: 'PNC', sector: 'Financial', industry: 'Banks - Regional', marketCap: 70000000000 },
  { ticker: 'V', sector: 'Financial', industry: 'Credit Services', marketCap: 650000000000 },
  { ticker: 'MA', sector: 'Financial', industry: 'Credit Services', marketCap: 520000000000 },
  { ticker: 'AXP', sector: 'Financial', industry: 'Credit Services', marketCap: 160000000000 },
  { ticker: 'BRK-B', sector: 'Financial', industry: 'Insurance - Diversified', marketCap: 1150000000000 },
  { ticker: 'BLK', sector: 'Financial', industry: 'Asset Management', marketCap: 120000000000 },
  { ticker: 'SPGI', sector: 'Financial', industry: 'Financial Data & Stock Exchanges', marketCap: 160000000000 },
  { ticker: 'SCHW', sector: 'Financial', industry: 'Capital Markets', marketCap: 140000000000 },
  { ticker: 'GS', sector: 'Financial', industry: 'Capital Markets', marketCap: 220000000000 },
  { ticker: 'MS', sector: 'Financial', industry: 'Capital Markets', marketCap: 250000000000 },
  { ticker: 'GE', sector: 'Industrials', industry: 'Aerospace & Defense', marketCap: 240000000000 },
  { ticker: 'RTX', sector: 'Industrials', industry: 'Aerospace & Defense', marketCap: 180000000000 },
  { ticker: 'BA', sector: 'Industrials', industry: 'Aerospace & Defense', marketCap: 120000000000 },
  { ticker: 'CAT', sector: 'Industrials', industry: 'Farm & Heavy Construction', marketCap: 180000000000 },
  { ticker: 'DE', sector: 'Industrials', industry: 'Farm & Heavy Construction', marketCap: 140000000000 },
  { ticker: 'LMT', sector: 'Industrials', industry: 'Aerospace & Defense', marketCap: 120000000000 },
  { ticker: 'HON', sector: 'Industrials', industry: 'Conglomerates', marketCap: 140000000000 },
  { ticker: 'UNP', sector: 'Industrials', industry: 'Railroads', marketCap: 140000000000 },
  { ticker: 'UPS', sector: 'Industrials', industry: 'Integrated Freight & Logistics', marketCap: 120000000000 },
  { ticker: 'ETN', sector: 'Industrials', industry: 'Specialty Industrial Machinery', marketCap: 130000000000 },
  { ticker: 'WM', sector: 'Industrials', industry: 'Waste Management', marketCap: 90000000000 },
  { ticker: 'XOM', sector: 'Energy', industry: 'Oil & Gas Integrated', marketCap: 510000000000 },
  { ticker: 'CVX', sector: 'Energy', industry: 'Oil & Gas Integrated', marketCap: 300000000000 },
  { ticker: 'COP', sector: 'Energy', industry: 'Oil & Gas E&P', marketCap: 160000000000 },
  { ticker: 'SLB', sector: 'Energy', industry: 'Oil & Gas Equipment & Services', marketCap: 90000000000 },
  { ticker: 'EOG', sector: 'Energy', industry: 'Oil & Gas E&P', marketCap: 70000000000 },
  { ticker: 'MPC', sector: 'Energy', industry: 'Oil & Gas Refining & Marketing', marketCap: 70000000000 },
  { ticker: 'OXY', sector: 'Energy', industry: 'Oil & Gas E&P', marketCap: 60000000000 },
  { ticker: 'PLD', sector: 'Real Estate', industry: 'REIT - Industrial', marketCap: 110000000000 },
  { ticker: 'AMT', sector: 'Real Estate', industry: 'REIT - Specialty', marketCap: 95000000000 },
  { ticker: 'EQIX', sector: 'Real Estate', industry: 'REIT - Specialty', marketCap: 85000000000 },
  { ticker: 'PSA', sector: 'Real Estate', industry: 'REIT - Industrial', marketCap: 50000000000 },
  { ticker: 'CCI', sector: 'Real Estate', industry: 'REIT - Specialty', marketCap: 45000000000 },
  { ticker: 'NEE', sector: 'Utilities', industry: 'Utilities - Regulated Electric', marketCap: 160000000000 },
  { ticker: 'SO', sector: 'Utilities', industry: 'Utilities - Regulated Electric', marketCap: 95000000000 },
  { ticker: 'DUK', sector: 'Utilities', industry: 'Utilities - Regulated Electric', marketCap: 90000000000 },
  { ticker: 'AEP', sector: 'Utilities', industry: 'Utilities - Regulated Electric', marketCap: 55000000000 },
];

const heatmapReferenceCache = new Map();

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

    return new Map(
      responses
        .flat()
        .map((item) => {
          const ticker = item?.symbol;
          if (!ticker) return null;
          const price = Number(item.regularMarketPrice);
          const prevClose = Number(item.regularMarketPreviousClose ?? item.previousClose ?? item.chartPreviousClose);
          const rawChange = Number(item.regularMarketChangePercent);
          const computedChange = prevClose && Number.isFinite(price) ? ((price - prevClose) / prevClose) * 100 : null;
          return [ticker, {
            ticker,
            name: item.longName || item.shortName || ticker,
            price: Number.isFinite(price) ? price : null,
            change: Number.isFinite(rawChange) ? rawChange : computedChange,
            marketCap: Number(item.marketCap) || null,
          }];
        })
        .filter(Boolean)
    );
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
    const price = Number(meta.regularMarketPrice) || null;
    const prevClose = Number(meta.chartPreviousClose || meta.previousClose) || 0;
    const change = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;
    const quote = quoteMap.get(item.ticker);
    return {
      ...item,
      name: quote?.name || item.ticker,
      price,
      change: Number.isFinite(change) ? Math.round(change * 100) / 100 : null,
      marketCap: Number(quote?.marketCap) || Number(item.marketCap) || 0,
    };
  }));

  return results
    .map((result) => (result.status === 'fulfilled' ? result.value : null))
    .filter((item) => item && item.marketCap > 0 && item.price != null && item.change != null);
}

function parseHeatmapDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(Date.UTC(year, month - 1, day));
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
  const series = closes.filter((value) => value !== null && Number.isFinite(value));
  if (!meta || series.length < 1) {
    throw new Error(`Invalid Yahoo range response for ${ticker}`);
  }
  const startPrice = Number(series[0]);
  const lastClose = Number(series[series.length - 1]);
  const livePrice = Number(meta.regularMarketPrice);
  const endPrice = endDate ? lastClose : (Number.isFinite(livePrice) ? livePrice : lastClose);
  const change = startPrice ? ((endPrice - startPrice) / startPrice) * 100 : 0;
  return { price: endPrice, change };
}

async function fetchYahooRangeHeatmapData(universe, quoteMap = new Map(), startDate, endDate = null) {
  const results = await Promise.allSettled(universe.map(async (item) => {
    const performance = await fetchYahooRangeChange(item.ticker, startDate, endDate);
    const quote = quoteMap.get(item.ticker);
    return {
      ...item,
      name: quote?.name || item.ticker,
      price: performance.price,
      change: Number.isFinite(performance.change) ? Math.round(performance.change * 100) / 100 : null,
      marketCap: Number(quote?.marketCap) || Number(item.marketCap) || 0,
    };
  }));

  return results
    .map((result) => (result.status === 'fulfilled' ? result.value : null))
    .filter((item) => item && item.marketCap > 0 && item.price != null && item.change != null);
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
    return {
      ...item,
      name: quote?.name || reference?.name || item.ticker,
      price,
      change: Number.isFinite(change) ? Math.round(change * 100) / 100 : null,
      marketCap,
      industry: reference?.sic_description || item.industry,
    };
  }).filter((item) => item.marketCap > 0 && item.price != null && item.change != null);
}

exports.handler = async (event) => {
  try {
    let data = [];
    let provider = 'yahoo-fallback';
    const startDate = parseHeatmapDate(event?.queryStringParameters?.start || '');
    const endDate = parseHeatmapDate(event?.queryStringParameters?.end || '');

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

    if (POLYGON_API_KEY && !startDate) {
      try {
        data = await fetchPolygonReferenceHeatmapData(HEATMAP_UNIVERSE);
        provider = 'polygon-reference+yahoo';
      } catch (polygonError) {
        console.warn('Polygon heatmap failed, falling back to Yahoo:', polygonError.message);
      }
    }

    if (!data.length) {
      const yahooQuotes = await fetchYahooQuoteBatch(HEATMAP_UNIVERSE.map((item) => item.ticker));
      data = startDate
        ? await fetchYahooRangeHeatmapData(HEATMAP_UNIVERSE, yahooQuotes, startDate, endDate)
        : await fetchYahooChartHeatmapData(HEATMAP_UNIVERSE, yahooQuotes);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=120',
      },
      body: JSON.stringify({ data, provider, updated: new Date().toISOString() }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
