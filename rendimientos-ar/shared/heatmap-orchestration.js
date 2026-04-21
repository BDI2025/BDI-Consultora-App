function isArgentinaHeatmapMarket(market) {
  return market === 'argentina-ars' || market === 'argentina-usd';
}

function getHeatmapProviderForMarket(market) {
  return market === 'argentina-usd' ? 'data912-argentina-usd' : 'data912-argentina-ars';
}

function shouldUseArgentinaRangeHeatmap(market, startDate) {
  return market === 'argentina-ars' && Boolean(startDate);
}

function shouldAttemptPolygonReference({ market, startDate, polygonApiKey }) {
  return market === 'usa' && Boolean(polygonApiKey) && !startDate;
}

function getHeatmapExecutionPlan({ market, startDate, polygonApiKey }) {
  const argentinaMarket = isArgentinaHeatmapMarket(market);
  return {
    market,
    branch: argentinaMarket ? 'argentina' : 'usa',
    provider: argentinaMarket ? getHeatmapProviderForMarket(market) : 'yahoo-fallback',
    useRange: argentinaMarket ? shouldUseArgentinaRangeHeatmap(market, startDate) : Boolean(startDate),
    tryPolygonReference: shouldAttemptPolygonReference({ market, startDate, polygonApiKey }),
  };
}

module.exports = {
  isArgentinaHeatmapMarket,
  getHeatmapProviderForMarket,
  shouldUseArgentinaRangeHeatmap,
  shouldAttemptPolygonReference,
  getHeatmapExecutionPlan,
};
