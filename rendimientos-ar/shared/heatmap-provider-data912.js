const {
  getArgentinaHeatmapHistorySymbol,
  computeArgentinaRangeChange,
} = require('./heatmap-helpers');
const { createHeatmapTile } = require('./heatmap-tile-contract');

function getArgentinaSizeLabels(variant) {
  return variant === 'argentina-usd'
    ? { sizeLabel: 'Monto operado USD', sizeCurrency: 'USD' }
    : { sizeLabel: 'Monto operado ARS', sizeCurrency: 'ARS' };
}

function buildArgentinaLiveHeatmapData(variant, universe, rows) {
  const universeMap = new Map(universe.map((item) => [item.symbol, item]));
  const { sizeLabel, sizeCurrency } = getArgentinaSizeLabels(variant);

  return rows
    .map((row) => {
      const symbol = String(row?.symbol || '').trim().toUpperCase();
      const meta = universeMap.get(symbol);
      if (!meta) return null;
      const price = Number(row?.c);
      const change = Number(row?.pct_change);
      const volume = Number(row?.v);
      const sizeValue = Number.isFinite(price) && Number.isFinite(volume) ? Math.max(price * volume, 0) : 0;
      if (!Number.isFinite(price) || !Number.isFinite(change) || sizeValue <= 0) return null;
      return createHeatmapTile({
        ticker: symbol,
        symbol,
        name: meta.name,
        sector: meta.sector,
        industry: meta.industry,
        price,
        change: Math.round(change * 100) / 100,
        marketCap: sizeValue,
        sizeValue,
        sizeLabel,
        sizeCurrency,
        volume: Number.isFinite(volume) ? volume : 0,
      });
    })
    .filter(Boolean)
    .sort((a, b) => b.sizeValue - a.sizeValue);
}

function buildArgentinaRangeHeatmapData(variant, universe, liveRows, historyMap, startDate, endDate = null) {
  const liveMap = new Map(
    liveRows
      .map((row) => [String(row?.symbol || '').trim().toUpperCase(), row])
      .filter(([symbol]) => Boolean(symbol))
  );
  const { sizeLabel, sizeCurrency } = getArgentinaSizeLabels(variant);

  return universe
    .map((item) => {
      const symbol = String(item.symbol || '').trim().toUpperCase();
      const liveRow = liveMap.get(symbol);
      if (!liveRow) return null;

      const livePrice = Number(liveRow?.c);
      const volume = Number(liveRow?.v);
      const liveChange = Number(liveRow?.pct_change);
      const sizeValue = Number.isFinite(livePrice) && Number.isFinite(volume)
        ? Math.max(livePrice * volume, 0)
        : 0;
      if (sizeValue <= 0) return null;

      const historySymbol = getArgentinaHeatmapHistorySymbol(item);
      const series = historyMap.get(historySymbol) || [];
      const performance = computeArgentinaRangeChange(series, startDate, endDate, livePrice);
      if (!performance) return null;
      const collapsedHistoricalRange = Boolean(
        endDate
        && performance.startDate
        && performance.endDate
        && performance.startDate === performance.endDate
        && Number.isFinite(liveChange)
      );
      const effectiveChange = collapsedHistoricalRange
        ? liveChange
        : performance.change;
      const effectivePrice = collapsedHistoricalRange && Number.isFinite(livePrice)
        ? livePrice
        : performance.price;

      return createHeatmapTile({
        ticker: symbol,
        symbol,
        name: item.name,
        sector: item.sector,
        industry: item.industry,
        price: effectivePrice,
        change: Number.isFinite(effectiveChange) ? Math.round(effectiveChange * 100) / 100 : null,
        marketCap: sizeValue,
        sizeValue,
        sizeLabel,
        sizeCurrency,
        volume: Number.isFinite(volume) ? volume : 0,
      });
    })
    .filter((item) => item && item.price != null && item.change != null)
    .sort((a, b) => b.sizeValue - a.sizeValue);
}

module.exports = {
  buildArgentinaLiveHeatmapData,
  buildArgentinaRangeHeatmapData,
};
