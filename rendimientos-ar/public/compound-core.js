(function () {
  function getEffectiveMonthlyRate(annualRatePct, frequencyPerYear) {
    const annualRate = annualRatePct / 100;
    if (!Number.isFinite(annualRate) || !Number.isFinite(frequencyPerYear) || frequencyPerYear <= 0) {
      return 0;
    }
    if (annualRate <= -1) return -1;
    const effectiveAnnual = Math.pow(1 + annualRate / frequencyPerYear, frequencyPerYear) - 1;
    return Math.pow(1 + effectiveAnnual, 1 / 12) - 1;
  }

  function runCompoundScenario({ initial, contribution, years, annualRatePct, frequency }) {
    const months = Math.max(1, Math.round(years * 12));
    const monthlyRate = getEffectiveMonthlyRate(annualRatePct, frequency);
    const series = [];
    let cashOnly = initial;
    let invested = initial;

    series.push({ month: 0, cash: cashOnly, invested });

    for (let month = 1; month <= months; month += 1) {
      cashOnly += contribution;
      invested = invested * (1 + monthlyRate) + contribution;
      series.push({ month, cash: cashOnly, invested });
    }

    const contributed = initial + contribution * months;
    const finalValue = series[series.length - 1]?.invested || 0;
    const finalCash = series[series.length - 1]?.cash || 0;

    return {
      annualRatePct,
      contributed,
      finalCash,
      finalValue,
      earnedInterest: finalValue - contributed,
      diffVsCash: finalValue - finalCash,
      series,
    };
  }

  function isValidCompoundInputSet({ initial, contribution, years, rate, frequency }) {
    return Number.isFinite(initial)
      && Number.isFinite(contribution)
      && Number.isFinite(years)
      && years > 0
      && Number.isFinite(rate)
      && Number.isFinite(frequency)
      && frequency > 0;
  }

  function buildCompoundResults({ initial, contribution, years, rate, variance, frequency }) {
    const safeVariance = Math.max(0, variance);
    const lowRate = Math.max(-99.9, rate - safeVariance);
    const highRate = Math.max(lowRate, rate + safeVariance);

    return {
      years,
      frequency,
      variance: safeVariance,
      inputRate: rate,
      low: runCompoundScenario({ initial, contribution, years, annualRatePct: lowRate, frequency }),
      base: runCompoundScenario({ initial, contribution, years, annualRatePct: rate, frequency }),
      high: runCompoundScenario({ initial, contribution, years, annualRatePct: highRate, frequency }),
    };
  }

  window.BDICompoundCore = {
    getEffectiveMonthlyRate,
    runCompoundScenario,
    isValidCompoundInputSet,
    buildCompoundResults,
  };
})();
