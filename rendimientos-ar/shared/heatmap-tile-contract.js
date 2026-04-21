function toFiniteNumber(value, fallback = null) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function toNonNegativeNumber(value, fallback = 0) {
  const num = toFiniteNumber(value, fallback);
  return Number.isFinite(num) ? Math.max(num, 0) : fallback;
}

function toText(value, fallback = '') {
  const text = String(value ?? '').trim();
  return text || fallback;
}

function createHeatmapTile(input = {}) {
  const ticker = toText(input.ticker || input.symbol, 'N/A').toUpperCase();
  const symbol = toText(input.symbol || input.ticker, ticker).toUpperCase();
  const sizeValue = toNonNegativeNumber(
    input.sizeValue ?? input.marketCap ?? input.volumeWeightedSize,
    0
  );
  const marketCap = toNonNegativeNumber(input.marketCap, sizeValue);
  const volume = toNonNegativeNumber(input.volume, 0);

  return {
    ticker,
    symbol,
    name: toText(input.name, ticker),
    sector: toText(input.sector, 'Sin sector'),
    industry: toText(input.industry, 'Sin industria'),
    price: toFiniteNumber(input.price, null),
    change: toFiniteNumber(input.change, null),
    marketCap,
    sizeValue,
    sizeLabel: toText(input.sizeLabel, 'Market cap'),
    sizeCurrency: toText(input.sizeCurrency, 'USD').toUpperCase(),
    volume,
    source: toText(input.source, ''),
    market: toText(input.market, ''),
    asOf: toText(input.asOf, ''),
  };
}

function normalizeHeatmapTiles(items) {
  return (Array.isArray(items) ? items : [])
    .map((item) => createHeatmapTile(item))
    .filter((item) => item.price != null && item.change != null && Math.max(item.sizeValue, item.marketCap) > 0);
}

module.exports = {
  createHeatmapTile,
  normalizeHeatmapTiles,
};
