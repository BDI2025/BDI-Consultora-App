(function initBdiHeatmapConfig(globalScope) {
  const HEATMAP_MARKETS = {
    usa: {
      key: 'usa',
      rangeEnabled: true,
      dailyOnly: false,
      defaultProvider: 'yahoo-fallback',
    },
    'argentina-ars': {
      key: 'argentina-ars',
      rangeEnabled: true,
      dailyOnly: false,
      defaultProvider: 'data912-argentina-ars',
    },
    'argentina-usd': {
      key: 'argentina-usd',
      rangeEnabled: false,
      dailyOnly: true,
      defaultProvider: 'data912-argentina-usd',
    },
  };

  globalScope.BDI_HEATMAP_CONFIG = {
    markets: HEATMAP_MARKETS,
    getMarketConfig(market) {
      return HEATMAP_MARKETS[market] || HEATMAP_MARKETS.usa;
    },
  };
}(window));
