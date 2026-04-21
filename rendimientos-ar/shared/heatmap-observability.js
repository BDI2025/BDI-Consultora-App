const { normalizeHeatmapTiles } = require('./heatmap-tile-contract');

function finalizeHeatmapDataset(items) {
  const rawItems = Array.isArray(items) ? items : [];
  const data = normalizeHeatmapTiles(rawItems);
  return {
    data,
    summary: {
      rawCount: rawItems.length,
      validCount: data.length,
      droppedCount: Math.max(rawItems.length - data.length, 0),
    },
  };
}

function logHeatmapDatasetSummary({ market, provider, summary, logger = console, runtime = 'server' }) {
  if (!summary) return;
  if (summary.droppedCount > 0) {
    logger.warn(
      `[heatmap:${runtime}] contract filtered ${summary.droppedCount}/${summary.rawCount} tiles for market=${market} provider=${provider}`
    );
  }
}

module.exports = {
  finalizeHeatmapDataset,
  logHeatmapDatasetSummary,
};
