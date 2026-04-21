function parseHeatmapDate(value) {
  if (!value) return null;
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(Date.UTC(year, month - 1, day));
}

function getArgentinaHeatmapHistorySymbol(item) {
  return String(item?.historySymbol || item?.symbol || '').trim().toUpperCase();
}

function normalizeArgentinaHistoricalRow(row) {
  const date = String(row?.date || '').trim();
  const close = Number(row?.c);
  const volume = Number(row?.v);
  if (!date || !Number.isFinite(close)) return null;
  return {
    date,
    close,
    volume: Number.isFinite(volume) ? volume : 0,
  };
}

function findFirstHistoryOnOrAfter(series, startDate) {
  const startIso = startDate.toISOString().slice(0, 10);
  return series.find((row) => row.date >= startIso) || null;
}

function findLastHistoryOnOrBefore(series, endDate) {
  const endIso = endDate.toISOString().slice(0, 10);
  for (let index = series.length - 1; index >= 0; index -= 1) {
    if (series[index].date <= endIso) return series[index];
  }
  return null;
}

function computeArgentinaRangeChange(series, startDate, endDate = null, livePrice = null) {
  if (!Array.isArray(series) || !series.length || !startDate) return null;

  const startPoint = findFirstHistoryOnOrAfter(series, startDate);
  if (!startPoint || !Number.isFinite(startPoint.close) || startPoint.close <= 0) return null;

  const historicalEndPoint = endDate
    ? findLastHistoryOnOrBefore(series, endDate)
    : series[series.length - 1];
  if (!historicalEndPoint || !Number.isFinite(historicalEndPoint.close)) return null;

  const endIso = endDate ? endDate.toISOString().slice(0, 10) : null;
  const shouldUseLivePrice = Boolean(
    endDate
    && Number.isFinite(livePrice)
    && historicalEndPoint.date < endIso
  );
  const endPrice = endDate
    ? (shouldUseLivePrice ? livePrice : historicalEndPoint.close)
    : (Number.isFinite(livePrice) ? livePrice : historicalEndPoint.close);
  if (!Number.isFinite(endPrice)) return null;

  const change = ((endPrice - startPoint.close) / startPoint.close) * 100;
  return {
    price: endPrice,
    change,
    startDate: startPoint.date,
    endDate: historicalEndPoint.date,
  };
}

module.exports = {
  parseHeatmapDate,
  getArgentinaHeatmapHistorySymbol,
  normalizeArgentinaHistoricalRow,
  findFirstHistoryOnOrAfter,
  findLastHistoryOnOrBefore,
  computeArgentinaRangeChange,
};
