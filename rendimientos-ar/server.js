const express = require('express');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const {
  HEATMAP_UNIVERSE_USA,
  HEATMAP_UNIVERSE_ARGENTINA_ARS,
  HEATMAP_UNIVERSE_ARGENTINA_USD,
} = require('./shared/heatmap-config');
const {
  parseHeatmapDate,
  getArgentinaHeatmapHistorySymbol,
  normalizeArgentinaHistoricalRow,
  computeArgentinaRangeChange,
} = require('./shared/heatmap-helpers');
const {
  buildArgentinaLiveHeatmapData,
  buildArgentinaRangeHeatmapData,
} = require('./shared/heatmap-provider-data912');
const {
  buildYahooQuoteMap,
  buildYahooChartHeatmapData,
  buildYahooRangeHeatmapData,
} = require('./shared/heatmap-provider-yahoo');
const {
  getHeatmapExecutionPlan,
} = require('./shared/heatmap-orchestration');
const {
  createHeatmapTile,
} = require('./shared/heatmap-tile-contract');
const {
  finalizeHeatmapDataset,
  logHeatmapDatasetSummary,
} = require('./shared/heatmap-observability');

function loadLocalEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const equalsIndex = trimmed.indexOf('=');
    if (equalsIndex === -1) return;
    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim();
    if (key) {
      // In local development we want project-level secrets to win over stale shell env vars.
      process.env[key] = value;
    }
  });
}

loadLocalEnvFile();

const fetchImpl = global.fetch
  ? (...args) => global.fetch(...args)
  : require('node-fetch');

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const CONFIG_PATH = path.join(__dirname, 'public', 'config.json');
const CER_CSV_PATH = path.join(__dirname, 'data_base', 'CER_serie.csv');
const POLYGON_API_KEY = process.env.POLYGON_API_KEY || '';
const OPTIMIZER_PYTHON_SCRIPT = path.join(__dirname, 'python', 'optimizer_runner.py');

const MUNDO_SYMBOLS = [
  { id: 'spx', symbol: 'ES%3DF', name: 'S&P 500', category: 'indices', icon: 'SP' },
  { id: 'nasdaq', symbol: 'NQ%3DF', name: 'Nasdaq 100', category: 'indices', icon: 'NQ' },
  { id: 'dow', symbol: 'YM%3DF', name: 'Dow Jones', category: 'indices', icon: 'DJ' },
  { id: 'tnx', symbol: '%5ETNX', name: 'Tasa 10Y USA', category: 'tasas', icon: '10Y' },
  { id: 'fvx', symbol: '%5EFVX', name: 'Tasa 5Y USA', category: 'tasas', icon: '5Y' },
  { id: 'tyx', symbol: '%5ETYX', name: 'Tasa 30Y USA', category: 'tasas', icon: '30Y' },
  { id: 'oil', symbol: 'CL%3DF', name: 'Petroleo WTI', category: 'energia', icon: 'WTI' },
  { id: 'brent', symbol: 'BZ%3DF', name: 'Petroleo Brent', category: 'energia', icon: 'BRE' },
  { id: 'natgas', symbol: 'NG%3DF', name: 'Gas natural', category: 'energia', icon: 'GAS' },
  { id: 'gold', symbol: 'GC%3DF', name: 'Oro', category: 'metales', icon: 'AU' },
  { id: 'silver', symbol: 'SI%3DF', name: 'Plata', category: 'metales', icon: 'AG' },
  { id: 'copper', symbol: 'HG%3DF', name: 'Cobre', category: 'metales', icon: 'CU' },
  { id: 'corn', symbol: 'ZC%3DF', name: 'Maiz', category: 'agro', icon: 'MZ' },
  { id: 'soy', symbol: 'ZS%3DF', name: 'Soja', category: 'agro', icon: 'SJ' },
  { id: 'wheat', symbol: 'ZW%3DF', name: 'Trigo', category: 'agro', icon: 'TG' },
  { id: 'btc', symbol: 'BTC-USD', name: 'Bitcoin', category: 'crypto', icon: 'BTC' },
  { id: 'eth', symbol: 'ETH-USD', name: 'Ethereum', category: 'crypto', icon: 'ETH' },
  { id: 'eurusd', symbol: 'EURUSD%3DX', name: 'EUR/USD', category: 'fx', icon: 'FX' },
];

const HEATMAP_UNIVERSE = HEATMAP_UNIVERSE_USA;
const ARGENTINA_HEATMAP_ARS = HEATMAP_UNIVERSE_ARGENTINA_ARS;
const ARGENTINA_HEATMAP_USD = HEATMAP_UNIVERSE_ARGENTINA_USD;

const NEWS_FEEDS = {
  es: 'https://news.google.com/rss/search?q=when:3h+mercados+OR+dolar+OR+bolsa+OR+wall+street+OR+bitcoin+OR+acciones+OR+bonos&hl=es-419&gl=AR&ceid=AR:es-419',
  en: 'https://news.google.com/rss/search?q=when:3h+markets+OR+dollar+OR+bonds+OR+stocks+OR+wall+street+OR+bitcoin+OR+treasury&hl=en-US&gl=US&ceid=US:en',
};

const heatmapReferenceCache = new Map();
const argentinaHeatmapHistoryCache = new Map();

app.disable('x-powered-by');
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "img-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "connect-src 'self' https://api.argentinadatos.com https://data912.com https://api.bcra.gob.ar https://*.supabase.co https://news.google.com https://query1.finance.yahoo.com",
      "frame-src https://*.supabase.co",
      "object-src 'none'",
    ].join('; ')
  );
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

function readConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
}

function jsonOrThrow(response, label) {
  if (!response.ok) {
    throw new Error(`${label} error: ${response.status}`);
  }
  return response.json();
}

async function runPythonOptimizer(params) {
  const pythonCandidates = [
    process.env.OPTIMIZER_PYTHON_BIN ? { command: process.env.OPTIMIZER_PYTHON_BIN, args: [OPTIMIZER_PYTHON_SCRIPT] } : null,
    { command: 'python', args: [OPTIMIZER_PYTHON_SCRIPT] },
    { command: 'py', args: ['-3', OPTIMIZER_PYTHON_SCRIPT] },
    { command: 'py', args: [OPTIMIZER_PYTHON_SCRIPT] },
    { command: 'python3', args: [OPTIMIZER_PYTHON_SCRIPT] },
  ].filter(Boolean);

  let lastError = null;

  for (const candidate of pythonCandidates) {
    try {
      const result = await spawnPythonProcess(candidate.command, candidate.args, params);
      return result;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Python runtime not available');
}

function spawnPythonProcess(command, args, params) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: __dirname,
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true,
    });

    let stdout = '';
    let stderr = '';
    let finished = false;

    const timeout = setTimeout(() => {
      if (finished) return;
      finished = true;
      child.kill();
      reject(new Error('Python optimizer timeout'));
    }, 120000);

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      reject(error);
    });

    child.on('close', (code) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);

      if (code !== 0) {
        const parsedError = tryParseJson(stderr);
        reject(new Error(parsedError?.error || stderr || `Python exited with code ${code}`));
        return;
      }

      try {
        resolve(JSON.parse(stdout));
      } catch (error) {
        reject(new Error(`Invalid optimizer JSON output: ${error.message}`));
      }
    });

    child.stdin.write(JSON.stringify(params));
    child.stdin.end();
  });
}

function tryParseJson(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

function parseCsvCerSeries(csvText) {
  return csvText
    .trim()
    .split('\n')
    .slice(1)
    .map((line) => {
      const [fecha, valor] = line.split(',');
      return { fecha, valor: parseFloat(valor) };
    })
    .filter((item) => item.fecha && Number.isFinite(item.valor))
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
}

function readLocalCerSeries() {
  if (!fs.existsSync(CER_CSV_PATH)) return null;
  const csv = fs.readFileSync(CER_CSV_PATH, 'utf-8');
  const serie = parseCsvCerSeries(csv);
  return serie.length ? serie : null;
}

async function fetchBcraCerSeries() {
  const response = await fetchImpl('https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/30', {
    headers: { Accept: 'application/json' },
  });
  const data = await jsonOrThrow(response, 'BCRA API');
  const detalle = data?.results?.[0]?.detalle;
  if (!Array.isArray(detalle) || detalle.length === 0) {
    throw new Error('Invalid BCRA API response format');
  }
  return detalle
    .map((item) => ({ fecha: item.fecha, valor: parseFloat(item.valor) }))
    .filter((item) => item.fecha && Number.isFinite(item.valor))
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
}

async function getCerSeries() {
  const localSerie = readLocalCerSeries();
  if (localSerie) {
    return { serie: localSerie, fuente: 'Serie historica CER local' };
  }
  return { serie: await fetchBcraCerSeries(), fuente: 'BCRA' };
}

function getCerT10FromSeries(serie) {
  const hoy = new Date();
  const settlement = new Date(hoy);
  settlement.setDate(settlement.getDate() + 1);
  const fc = new Date(settlement);
  fc.setDate(fc.getDate() - 14);
  const fcStr = fc.toISOString().split('T')[0];

  for (let i = serie.length - 1; i >= 0; i -= 1) {
    if (serie[i].fecha <= fcStr) return serie[i];
  }

  return serie[serie.length - 1] || null;
}

function ensureArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

async function fetchYahooRaw(symbolEncoded, interval, range) {
  const response = await fetchImpl(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbolEncoded}?interval=${interval}&range=${range}`,
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  );
  const json = await jsonOrThrow(response, 'Yahoo Finance');
  const result = json?.chart?.result?.[0];
  if (!result?.meta) {
    throw new Error('Invalid Yahoo Finance response');
  }
  const closes = result?.indicators?.quote?.[0]?.close || [];
  return {
    price: result.meta.regularMarketPrice,
    prevClose: result.meta.chartPreviousClose || result.meta.previousClose || 0,
    sparkline: closes.filter((value) => value !== null),
    result,
  };
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
      const response = await fetchImpl(
        `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(chunk.join(','))}`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } }
      );
      const json = await jsonOrThrow(response, 'Yahoo Finance');
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
    const payload = await fetchYahooRaw(encodeURIComponent(item.ticker), '1d', '5d');
    return payload;
  }));
  const chartPayloads = results.map((result) => (result.status === 'fulfilled' ? result.value : null));
  return buildYahooChartHeatmapData(universe, chartPayloads, quoteMap);
}

async function fetchYahooRangeChange(symbolEncoded, startDate, endDate = null) {
  const startTs = Math.floor(startDate.getTime() / 1000);
  const endTs = endDate
    ? Math.floor((endDate.getTime() + 24 * 60 * 60 * 1000) / 1000)
    : Math.floor(Date.now() / 1000);
  const response = await fetchImpl(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbolEncoded}?interval=1d&period1=${startTs}&period2=${endTs}`,
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  );
  const json = await jsonOrThrow(response, 'Yahoo Finance');
  const result = json?.chart?.result?.[0];
  const meta = result?.meta;
  const closes = result?.indicators?.quote?.[0]?.close || [];
  const timestamps = result?.timestamp || [];
  const series = closes.filter((value) => value !== null && Number.isFinite(value));
  if (!meta || series.length < 1) {
    throw new Error('Invalid Yahoo Finance range response');
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
  return {
    price: endPrice,
    change,
    startPrice,
    endPrice,
  };
}

async function fetchYahooRangeHeatmapData(universe, quoteMap = new Map(), startDate, endDate = null) {
  const results = await Promise.allSettled(universe.map(async (item) => {
    const performance = await fetchYahooRangeChange(encodeURIComponent(item.ticker), startDate, endDate);
    return [item.ticker, performance];
  }));
  const performanceMap = new Map(
    results
      .map((result) => (result.status === 'fulfilled' ? result.value : null))
      .filter(Boolean)
  );
  return buildYahooRangeHeatmapData(universe, performanceMap, quoteMap);
}

async function fetchYahooOverview(symbolEncoded) {
  const intraday = await fetchYahooRaw(symbolEncoded, '5m', '1d');
  if (intraday.sparkline.length >= 10) return intraday;
  return fetchYahooRaw(symbolEncoded, '15m', '5d');
}

async function fetchYahooChartPoints(symbolEncoded, interval, range) {
  const payload = await fetchYahooRaw(symbolEncoded, interval, range);
  const timestamps = payload.result.timestamp || [];
  const closes = payload.result?.indicators?.quote?.[0]?.close || [];
  const points = [];
  for (let i = 0; i < timestamps.length; i += 1) {
    if (closes[i] !== null) {
      points.push({ t: timestamps[i] * 1000, v: closes[i] });
    }
  }
  return points;
}

async function fetchPolygonJson(pathname, query = {}) {
  if (!POLYGON_API_KEY) {
    throw new Error('Polygon API key is not configured');
  }

  const params = new URLSearchParams({ ...query, apiKey: POLYGON_API_KEY });
  const response = await fetchImpl(`https://api.polygon.io${pathname}?${params.toString()}`, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  return jsonOrThrow(response, 'Polygon');
}

async function fetchPolygonTickerReference(ticker) {
  const cached = heatmapReferenceCache.get(ticker);
  if (cached && (Date.now() - cached.cachedAt) < 24 * 60 * 60 * 1000) {
    return cached.data;
  }

  const payload = await fetchPolygonJson(`/v3/reference/tickers/${ticker}`);
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
      sector: item.sector,
      industry: reference?.sic_description || item.industry,
      name: quote?.name || reference?.name || item.ticker,
      price,
      change: Number.isFinite(change) ? Math.round(change * 100) / 100 : null,
      marketCap,
    });
  }).filter((item) => item.marketCap > 0 && item.price != null && item.change != null);
}

function finalizeHeatmapResponse({ market, provider, data }) {
  const { data: normalizedData, summary } = finalizeHeatmapDataset(data);
  logHeatmapDatasetSummary({ market, provider, summary, runtime: 'express' });
  return {
    data: normalizedData,
    provider,
    updated: new Date().toISOString(),
  };
}

async function fetchArgentinaHeatmapData(variant = 'argentina-ars') {
  const universe = variant === 'argentina-usd' ? ARGENTINA_HEATMAP_USD : ARGENTINA_HEATMAP_ARS;
  const response = await fetchImpl('https://data912.com/live/arg_stocks');
  const rows = ensureArray(await jsonOrThrow(response, 'data912'));
  return buildArgentinaLiveHeatmapData(variant, universe, rows);
}

async function fetchArgentinaHistoricalSeries(symbol) {
  const normalizedSymbol = String(symbol || '').trim().toUpperCase();
  if (!normalizedSymbol) return [];

  const cached = argentinaHeatmapHistoryCache.get(normalizedSymbol);
  if (cached && (Date.now() - cached.cachedAt) < 6 * 60 * 60 * 1000) {
    return cached.data;
  }

  const response = await fetchImpl(`https://data912.com/historical/stocks/${encodeURIComponent(normalizedSymbol)}`);
  const payload = await jsonOrThrow(response, 'data912 historical');
  const data = ensureArray(payload)
    .map(normalizeArgentinaHistoricalRow)
    .filter(Boolean)
    .sort((a, b) => a.date.localeCompare(b.date));

  argentinaHeatmapHistoryCache.set(normalizedSymbol, { cachedAt: Date.now(), data });
  return data;
}

async function fetchArgentinaRangeHeatmapData(variant = 'argentina-ars', startDate, endDate = null) {
  const universe = variant === 'argentina-usd' ? ARGENTINA_HEATMAP_USD : ARGENTINA_HEATMAP_ARS;
  const liveResponse = await fetchImpl('https://data912.com/live/arg_stocks');
  const liveRows = ensureArray(await jsonOrThrow(liveResponse, 'data912'));

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

function cleanRssText(text) {
  return text
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function parseNewsRSS(xml) {
  const items = [];
  const regex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    const block = match[1];
    const title = cleanRssText((block.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/ - [^-]+$/, '');
    const link = cleanRssText((block.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '');
    const pubDate = cleanRssText((block.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '');
    const source = cleanRssText((block.match(/<source[^>]*>([\s\S]*?)<\/source>/) || [])[1] || '');
    if (title) {
      items.push({ title, source, link, date: pubDate });
    }
  }
  return items;
}

// --- Auth Config API ---
app.get('/api/auth-config', (req, res) => {
  res.json({
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  });
});

// --- Config API ---
app.get('/api/config', (req, res) => {
  res.json(readConfig());
});

// --- FCI Data ---
app.get('/api/fci', async (req, res) => {
  try {
    const [mmLatest, mmPrevious, rmLatest, rmPrevious] = await Promise.all([
      fetchImpl('https://api.argentinadatos.com/v1/finanzas/fci/mercadoDinero/ultimo').then((r) => r.json()),
      fetchImpl('https://api.argentinadatos.com/v1/finanzas/fci/mercadoDinero/penultimo').then((r) => r.json()),
      fetchImpl('https://api.argentinadatos.com/v1/finanzas/fci/rentaMixta/ultimo').then((r) => r.json()),
      fetchImpl('https://api.argentinadatos.com/v1/finanzas/fci/rentaMixta/penultimo').then((r) => r.json()),
    ]);

    const filterValid = (rows) => rows.filter((row) => row.fecha && row.vcp);
    const allLatest = [...filterValid(mmLatest), ...filterValid(rmLatest)];
    const allPrevious = [...filterValid(mmPrevious), ...filterValid(rmPrevious)];
    const prevMap = {};
    for (const fund of allPrevious) prevMap[fund.fondo] = fund;

    const results = [];
    for (const fund of allLatest) {
      const prev = prevMap[fund.fondo];
      if (!prev || !prev.vcp || !fund.vcp) continue;
      const days = Math.abs(Math.round((new Date(fund.fecha) - new Date(prev.fecha)) / 86400000));
      if (days <= 0) continue;
      const tna = Math.round((((fund.vcp - prev.vcp) / prev.vcp / days) * 365 * 100) * 100) / 100;
      results.push({
        nombre: fund.fondo,
        tna,
        patrimonio: fund.patrimonio,
        fechaDesde: prev.fecha,
        fechaHasta: fund.fecha,
      });
    }

    res.json({ data: results });
  } catch (err) {
    console.error('FCI proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch FCI data' });
  }
});

// --- CAFCI Ficha Proxy ---
app.get('/api/cafci/ficha/:fondoId/:claseId', async (req, res) => {
  const { fondoId, claseId } = req.params;
  const url = `https://api.cafci.org.ar/estadisticas/informacion/diaria/ficha/${encodeURIComponent(fondoId)}/${encodeURIComponent(claseId)}`;

  try {
    const response = await fetchImpl(url, {
      headers: {
        Accept: 'application/json',
        Referer: 'https://www.cafci.org.ar/',
        Origin: 'https://www.cafci.org.ar',
      },
    });
    const data = await jsonOrThrow(response, 'CAFCI API');
    res.json(data);
  } catch (err) {
    console.error('CAFCI ficha proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch CAFCI ficha data' });
  }
});

// --- Mundo ---
app.get('/api/mundo', async (req, res) => {
  const { symbol, ticker, name, range = '5d' } = req.query;

  try {
    if (symbol || ticker) {
      let encodedSymbol;
      let responseName;
      let responseId;

      if (ticker) {
        const normalizedTicker = String(ticker).toUpperCase();
        encodedSymbol = encodeURIComponent(normalizedTicker);
        responseName = name || normalizedTicker;
        responseId = normalizedTicker.toLowerCase();
      } else {
        const selected = MUNDO_SYMBOLS.find((item) => item.id === symbol);
        if (!selected) {
          res.status(404).json({ error: 'Unknown symbol' });
          return;
        }
        encodedSymbol = selected.symbol;
        responseName = selected.name;
        responseId = selected.id;
      }

      let interval = range === '1d' ? '5m' : range === '5d' ? '15m' : range === '1mo' ? '1h' : '1d';
      let points = await fetchYahooChartPoints(encodedSymbol, interval, range);
      let effectiveRange = range;

      if (points.length === 0 && range === '1d') {
        effectiveRange = '5d';
        interval = '15m';
        points = await fetchYahooChartPoints(encodedSymbol, interval, effectiveRange);
      }

      res.json({ id: responseId, name: responseName, icon: '', range: effectiveRange, points });
      return;
    }

    const results = await Promise.allSettled(MUNDO_SYMBOLS.map((item) => fetchYahooOverview(item.symbol)));
    const data = MUNDO_SYMBOLS.map((item, index) => {
      const result = results[index];
      if (result.status !== 'fulfilled') {
        return { ...item, price: null, prevClose: null, change: null, sparkline: [], error: true, icon: '' };
      }
      const price = result.value.price;
      const prevClose = result.value.prevClose;
      const change = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;
      return {
        ...item,
        icon: '',
        price,
        prevClose,
        change: Math.round(change * 100) / 100,
        sparkline: result.value.sparkline,
      };
    });

    res.json({ data, updated: new Date().toISOString() });
  } catch (err) {
    console.error('Mundo proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch mundo data' });
  }
});

// --- News ---
app.get('/api/news', async (req, res) => {
  try {
    const lang = String(req.query.lang || 'es').toLowerCase() === 'en' ? 'en' : 'es';
    const response = await fetchImpl(NEWS_FEEDS[lang], { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const xml = await response.text();
    if (!xml) {
      throw new Error('Empty response');
    }
    const items = parseNewsRSS(xml).slice(0, 20);
    res.json({ data: items, updated: new Date().toISOString() });
  } catch (err) {
    console.error('News proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch finance news' });
  }
});

// --- Soberanos ---
app.get('/api/soberanos', async (req, res) => {
  try {
    const response = await fetchImpl('https://data912.com/live/arg_bonds');
    const data = ensureArray(await jsonOrThrow(response, 'data912'));
    const tickers = ['BPD7D', 'AO27D', 'AN29D', 'AL29D', 'AL30D', 'AL35D', 'AE38D', 'AL41D', 'GD29D', 'GD30D', 'GD35D', 'GD38D', 'GD41D'];

    const result = data
      .filter((bond) => tickers.includes(bond.symbol))
      .map((bond) => ({
        symbol: bond.symbol.replace(/D$/, ''),
        price_usd: parseFloat(bond.c) || 0,
        bid: parseFloat(bond.px_bid) || 0,
        ask: parseFloat(bond.px_ask) || 0,
        volume: bond.v || 0,
        pct_change: bond.pct_change || 0,
      }))
      .filter((bond) => bond.price_usd > 0);

    res.json({ data: result, source: 'data912' });
  } catch (err) {
    console.error('Soberanos proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch soberanos data' });
  }
});

// --- Lecaps / Boncaps ---
app.get('/api/lecaps', async (req, res) => {
  try {
    const [notesRaw, bondsRaw] = await Promise.all([
      fetchImpl('https://data912.com/live/arg_notes').then((r) => r.json()),
      fetchImpl('https://data912.com/live/arg_bonds').then((r) => r.json()),
    ]);

    const notes = ensureArray(notesRaw);
    const bonds = ensureArray(bondsRaw);
    const lecapTickers = ['S17A6', 'S30A6', 'S15Y6', 'S29Y6', 'S31L6', 'S31G6', 'S30S6', 'S30O6', 'S30N6'];
    const boncapTickers = ['T30J6', 'T15E7', 'T30A7', 'T31Y7', 'T30J7'];
    const result = [];

    for (const item of notes) {
      const price = parseFloat(item.c) || 0;
      if (!lecapTickers.includes(item.symbol) || price <= 0) continue;
      result.push({
        symbol: item.symbol,
        price,
        bid: parseFloat(item.px_bid) || 0,
        ask: parseFloat(item.px_ask) || 0,
        type: 'LECAP',
      });
    }

    for (const item of bonds) {
      const price = parseFloat(item.c) || 0;
      if (!boncapTickers.includes(item.symbol) || price <= 0) continue;
      result.push({
        symbol: item.symbol,
        price,
        bid: parseFloat(item.px_bid) || 0,
        ask: parseFloat(item.px_ask) || 0,
        type: 'BONCAP',
      });
    }

    res.json({ data: result, source: 'data912' });
  } catch (err) {
    console.error('LECAP proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch LECAP data' });
  }
});

// --- CER ---
app.get('/api/cer', async (req, res) => {
  try {
    const { serie, fuente } = await getCerSeries();
    const cerT10 = getCerT10FromSeries(serie);
    if (!cerT10) {
      throw new Error('No CER data available');
    }
    res.json({ cer: cerT10.valor, fecha: cerT10.fecha, fuente: `${fuente} (T-10)` });
  } catch (err) {
    console.error('CER proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch CER data' });
  }
});

app.get('/api/cer-ultimo', async (req, res) => {
  try {
    const { serie, fuente } = await getCerSeries();
    const ultimo = serie[serie.length - 1];
    if (!ultimo) {
      throw new Error('No CER data available');
    }
    res.json({ cer: ultimo.valor, fecha: ultimo.fecha, fuente });
  } catch (err) {
    console.error('CER ultimo proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch CER data' });
  }
});

app.get('/api/cer-precios', async (req, res) => {
  try {
    const [bondsRaw, notesRaw] = await Promise.all([
      fetchImpl('https://data912.com/live/arg_bonds').then((r) => r.json()),
      fetchImpl('https://data912.com/live/arg_notes').then((r) => r.json()),
    ]);
    const bonds = ensureArray(bondsRaw);
    const notes = ensureArray(notesRaw);
    const bondTickers = ['TZX26', 'TZXO6', 'TX26', 'TZXD6', 'TZXM6', 'TZXM7', 'TZX27', 'TZXD7', 'TZX28', 'TX28', 'DICP', 'PARP'];
    const noteTickers = ['X15Y6', 'X29Y6', 'X31L6', 'X30S6', 'X30N6'];
    const bonosCER = [
      ...bonds.filter((bond) => bondTickers.includes(bond.symbol)),
      ...notes.filter((bond) => noteTickers.includes(bond.symbol)),
    ];
    res.json({ data: bonosCER, timestamp: new Date().toISOString(), count: bonosCER.length });
  } catch (err) {
    console.error('CER prices proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch CER bond prices' });
  }
});

// --- ONs / Corporativos ---
app.get('/api/ons', async (req, res) => {
  try {
    const response = await fetchImpl('https://data912.com/live/arg_corp');
    const allBonds = ensureArray(await jsonOrThrow(response, 'data912'));
    const validBonds = allBonds.filter((bond) => bond.symbol && (parseFloat(bond.c) || 0) > 0);
    res.json({ data: validBonds, timestamp: new Date().toISOString(), source: 'data912' });
  } catch (err) {
    console.error('ONs proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch ON prices' });
  }
});

app.get('/api/heatmap', async (req, res) => {
  try {
    const market = String(req.query.market || 'usa').toLowerCase();
    const startDate = parseHeatmapDate(req.query.start);
    const endDate = parseHeatmapDate(req.query.end);
    const plan = getHeatmapExecutionPlan({ market, startDate, polygonApiKey: POLYGON_API_KEY });

    if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
      return res.status(400).json({ error: 'Invalid heatmap date range' });
    }

    if (plan.branch === 'argentina') {
      const data = plan.useRange
        ? await fetchArgentinaRangeHeatmapData(market, startDate, endDate)
        : await fetchArgentinaHeatmapData(market);
      return res.json(finalizeHeatmapResponse({
        market,
        provider: plan.provider,
        data,
      }));
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

    res.json(finalizeHeatmapResponse({ market, provider, data }));
  } catch (err) {
    console.error('Heatmap proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch heatmap data' });
  }
});

app.post('/api/optimizer', async (req, res) => {
  try {
    const tickers = Array.isArray(req.body?.tickers) ? req.body.tickers : [];
    const years = parseInt(req.body?.years || '5', 10);
    const rf = Number(req.body?.rf ?? 0.02);
    const targetReturn = req.body?.targetReturn == null || req.body?.targetReturn === ''
      ? null
      : Number(req.body.targetReturn);
    const minWeight = Number(req.body?.minWeight ?? 0);
    const randomCount = parseInt(req.body?.randomCount || '25000', 10);

    const payload = await runPythonOptimizer({
      tickers,
      years: Number.isFinite(years) ? years : 5,
      rf: Number.isFinite(rf) ? rf : 0.02,
      targetReturn: Number.isFinite(targetReturn) ? targetReturn : null,
      minWeight: Number.isFinite(minWeight) ? minWeight : 0,
      randomCount: Number.isFinite(randomCount) ? randomCount : 25000,
    });

    res.json(payload);
  } catch (error) {
    console.error('Python optimizer error:', error.message);
    res.status(502).json({ error: error.message });
  }
});

// --- Hot movers ---
app.get('/api/hot-movers', async (req, res) => {
  const pool = [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'AMD', 'NFLX', 'COIN',
    'PLTR', 'SMCI', 'MSTR', 'AVGO', 'CRM', 'UBER', 'SNOW', 'SQ', 'SHOP', 'RIVN',
    'SOFI', 'HOOD', 'INTC', 'BA', 'DIS', 'NKE', 'PYPL', 'BABA', 'JPM', 'V',
  ];

  try {
    const results = await Promise.allSettled(pool.map(async (ticker) => {
      const payload = await fetchYahooRaw(encodeURIComponent(ticker), '1d', '5d');
      const change = payload.prevClose ? ((payload.price - payload.prevClose) / payload.prevClose) * 100 : 0;
      return {
        symbol: ticker,
        name: ticker,
        price: payload.price,
        change: Math.round(change * 100) / 100,
      };
    }));

    const data = results
      .map((item) => (item.status === 'fulfilled' ? item.value : null))
      .filter((item) => item && item.price != null && item.change != null)
      .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
      .slice(0, 5);

    res.json({ data, updated: new Date().toISOString() });
  } catch (err) {
    console.error('Hot movers proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch hot movers data' });
  }
});

// --- Cotizaciones ---
app.get('/api/cotizaciones', async (req, res) => {
  try {
    const [yahooResp, bondsResp, riesgoResp] = await Promise.allSettled([
      fetchImpl('https://query1.finance.yahoo.com/v8/finance/chart/ARS%3DX?interval=1d&range=5d', {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      }).then((r) => r.json()),
      fetchImpl('https://data912.com/live/arg_bonds').then((r) => r.json()),
      fetchImpl('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo').then((r) => r.json()),
    ]);

    let oficial = null;
    if (yahooResp.status === 'fulfilled') {
      try {
        const meta = yahooResp.value.chart.result[0].meta;
        oficial = {
          price: meta.regularMarketPrice,
          prevClose: meta.chartPreviousClose || meta.previousClose || 0,
        };
      } catch (error) {
        oficial = null;
      }
    }

    let ccl = null;
    let mep = null;
    if (bondsResp.status === 'fulfilled' && Array.isArray(bondsResp.value)) {
      const al30 = bondsResp.value.find((bond) => bond.symbol === 'AL30');
      const al30d = bondsResp.value.find((bond) => bond.symbol === 'AL30D');
      const al30c = bondsResp.value.find((bond) => bond.symbol === 'AL30C');
      const arsPrice = al30 ? parseFloat(al30.c) : 0;

      if (al30c && arsPrice > 0) {
        const cclUsd = parseFloat(al30c.c);
        if (cclUsd > 0) ccl = { price: Math.round((arsPrice / cclUsd) * 100) / 100 };
      }

      if (al30d && arsPrice > 0) {
        const mepUsd = parseFloat(al30d.c);
        if (mepUsd > 0) mep = { price: Math.round((arsPrice / mepUsd) * 100) / 100 };
      }
    }

    let riesgoPais = null;
    if (riesgoResp.status === 'fulfilled' && riesgoResp.value?.valor != null) {
      riesgoPais = { value: riesgoResp.value.valor };
    }

    res.json({ oficial, ccl, mep, riesgoPais, updated: new Date().toISOString() });
  } catch (err) {
    console.error('Cotizaciones proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch cotizaciones' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
