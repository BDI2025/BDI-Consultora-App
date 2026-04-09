const express = require('express');
const fs = require('fs');
const path = require('path');

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

const NEWS_FEEDS = {
  es: 'https://news.google.com/rss/search?q=when:3h+mercados+OR+dolar+OR+bolsa+OR+wall+street+OR+bitcoin+OR+acciones+OR+bonos&hl=es-419&gl=AR&ceid=AR:es-419',
  en: 'https://news.google.com/rss/search?q=when:3h+markets+OR+dollar+OR+bonds+OR+stocks+OR+wall+street+OR+bitcoin+OR+treasury&hl=en-US&gl=US&ceid=US:en',
};

const heatmapReferenceCache = new Map();

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
    const payload = await fetchYahooRaw(encodeURIComponent(item.ticker), '1d', '5d');
    const change = payload.prevClose ? ((payload.price - payload.prevClose) / payload.prevClose) * 100 : 0;
    const quote = quoteMap.get(item.ticker);
    return {
      ...item,
      name: quote?.name || item.ticker,
      price: payload.price,
      change: Math.round(change * 100) / 100,
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
  const series = closes.filter((value) => value !== null && Number.isFinite(value));
  if (!meta || series.length < 1) {
    throw new Error('Invalid Yahoo Finance range response');
  }
  const startPrice = Number(series[0]);
  const lastClose = Number(series[series.length - 1]);
  const livePrice = Number(meta.regularMarketPrice);
  const endPrice = endDate ? lastClose : (Number.isFinite(livePrice) ? livePrice : lastClose);
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
    return {
      ...item,
      sector: item.sector,
      industry: reference?.sic_description || item.industry,
      name: quote?.name || reference?.name || item.ticker,
      price,
      change: Number.isFinite(change) ? Math.round(change * 100) / 100 : null,
      marketCap,
    };
  }).filter((item) => item.marketCap > 0 && item.price != null && item.change != null);
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
    let data = [];
    let provider = 'yahoo-fallback';
    const startDate = parseHeatmapDate(req.query.start);
    const endDate = parseHeatmapDate(req.query.end);

    if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
      return res.status(400).json({ error: 'Invalid heatmap date range' });
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

    res.json({ data, provider, updated: new Date().toISOString() });
  } catch (err) {
    console.error('Heatmap proxy error:', err.message);
    res.status(502).json({ error: 'Failed to fetch heatmap data' });
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
