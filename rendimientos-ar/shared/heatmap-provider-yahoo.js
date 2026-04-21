const { createHeatmapTile } = require('./heatmap-tile-contract');

function buildYahooQuoteMap(quoteResults) {
  return new Map(
    quoteResults
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
}

function buildYahooChartHeatmapData(universe, chartResults, quoteMap = new Map()) {
  return universe
    .map((item, index) => {
      const payload = chartResults[index];
      if (!payload) return null;
      const change = payload.prevClose ? ((payload.price - payload.prevClose) / payload.prevClose) * 100 : 0;
      const quote = quoteMap.get(item.ticker);
      return createHeatmapTile({
        ...item,
        name: quote?.name || item.ticker,
        price: payload.price,
        change: Math.round(change * 100) / 100,
        marketCap: Number(quote?.marketCap) || Number(item.marketCap) || 0,
      });
    })
    .filter((item) => item && item.marketCap > 0 && item.price != null && item.change != null);
}

function buildYahooRangeHeatmapData(universe, performanceMap, quoteMap = new Map()) {
  return universe
    .map((item) => {
      const performance = performanceMap.get(item.ticker);
      if (!performance) return null;
      const quote = quoteMap.get(item.ticker);
      return createHeatmapTile({
        ...item,
        name: quote?.name || item.ticker,
        price: performance.price,
        change: Number.isFinite(performance.change) ? Math.round(performance.change * 100) / 100 : null,
        marketCap: Number(quote?.marketCap) || Number(item.marketCap) || 0,
      });
    })
    .filter((item) => item && item.marketCap > 0 && item.price != null && item.change != null);
}

module.exports = {
  buildYahooQuoteMap,
  buildYahooChartHeatmapData,
  buildYahooRangeHeatmapData,
};
