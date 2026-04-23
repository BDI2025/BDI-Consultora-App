(function () {
  function parseNumber(value, fallback = 0) {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function parseInteger(value, fallback = 0) {
    const parsed = parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function formatPercent(value) {
    return `${(value || 0).toFixed(1)}%`;
  }

  function readCompoundCalculatorInputs(root = document) {
    return {
      initial: parseNumber(root.getElementById('compound-initial')?.value, 0),
      contribution: parseNumber(root.getElementById('compound-contribution')?.value, 0),
      years: parseNumber(root.getElementById('compound-years')?.value, 0),
      rate: parseNumber(root.getElementById('compound-rate')?.value, 0),
      variance: Math.max(0, parseNumber(root.getElementById('compound-variance')?.value, 0)),
      frequency: parseInteger(root.getElementById('compound-frequency')?.value, 12),
    };
  }

  function buildCompoundStatusMessage({ frequency, rate, variance, language, t }) {
    const baseRateLabel = language === 'en' ? 'Base rate' : 'Tasa base';
    const varianceLabel = language === 'en' ? 'Variance' : 'Varianza';
    return `${t('compound_frequency_label')}: ${t(`compound_frequency_${frequency}`)} · ${baseRateLabel} ${formatPercent(rate)} · ${varianceLabel} ±${formatPercent(variance)}`;
  }

  window.BDICompoundUI = {
    readCompoundCalculatorInputs,
    buildCompoundStatusMessage,
  };
})();
