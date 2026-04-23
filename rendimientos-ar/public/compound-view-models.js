(function () {
  function buildCompoundSummaryModel(results) {
    return {
      years: results.years,
      cards: [
        {
          kind: 'contributed',
          contributed: results.base.contributed,
        },
        {
          kind: 'cash',
          finalCash: results.base.finalCash,
        },
        {
          kind: 'base',
          finalValue: results.base.finalValue,
          annualRatePct: results.base.annualRatePct,
          earnedInterest: results.base.earnedInterest,
        },
        {
          kind: 'range',
          lowFinalValue: results.low.finalValue,
          highFinalValue: results.high.finalValue,
          lowAnnualRatePct: results.low.annualRatePct,
          highAnnualRatePct: results.high.annualRatePct,
        },
      ],
    };
  }

  function buildCompoundBreakdownModel(results) {
    return {
      frequency: results.frequency,
      contributed: results.base.contributed,
      rows: [
        {
          tone: 'cash',
          labelKey: 'compound_chart_cash',
          annualRatePct: 0,
          finalValue: results.base.finalCash,
          earnedInterest: results.base.finalCash - results.base.contributed,
          diffVsCash: 0,
        },
        {
          tone: 'low',
          labelKey: 'compound_low',
          annualRatePct: results.low.annualRatePct,
          finalValue: results.low.finalValue,
          earnedInterest: results.low.earnedInterest,
          diffVsCash: results.low.diffVsCash,
        },
        {
          tone: 'base',
          labelKey: 'compound_base',
          annualRatePct: results.base.annualRatePct,
          finalValue: results.base.finalValue,
          earnedInterest: results.base.earnedInterest,
          diffVsCash: results.base.diffVsCash,
        },
        {
          tone: 'high',
          labelKey: 'compound_high',
          annualRatePct: results.high.annualRatePct,
          finalValue: results.high.finalValue,
          earnedInterest: results.high.earnedInterest,
          diffVsCash: results.high.diffVsCash,
        },
      ],
    };
  }

  function buildCompoundChartModel(results) {
    const allSeries = results.base.series.map((point, idx) => ({
      month: point.month,
      cash: point.cash,
      low: results.low.series[idx]?.invested ?? point.invested,
      base: point.invested,
      high: results.high.series[idx]?.invested ?? point.invested,
    }));

    const maxMonth = allSeries[allSeries.length - 1]?.month || 1;
    const allValues = allSeries.flatMap((point) => [point.cash, point.low, point.base, point.high]);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const pad = Math.max((maxValue - minValue) * 0.08, Math.abs(maxValue) * 0.04, 1);
    const yMin = minValue >= 0 ? 0 : minValue - pad;
    const yMax = maxValue + pad;
    const xTickDivisions = Math.min(results.years, 6);
    const xTicks = Array.from({ length: xTickDivisions + 1 }, (_, idx) => {
      const year = Math.round((idx * maxMonth) / xTickDivisions);
      return Math.min(maxMonth, year);
    }).filter((value, idx, arr) => idx === 0 || value !== arr[idx - 1]);
    const yTicks = Array.from({ length: 6 }, (_, idx) => yMin + ((yMax - yMin) / 5) * idx);

    return {
      allSeries,
      maxMonth,
      yMin,
      yMax,
      xTicks,
      yTicks,
      lastPoint: allSeries[allSeries.length - 1] || { month: 0, cash: 0, base: 0 },
      legendItems: [
        { color: '#64748b', labelKey: 'compound_chart_cash' },
        { color: '#94a3b8', labelKey: 'compound_chart_band', dashed: true },
        { color: '#157347', labelKey: 'compound_chart_invested', suffixKey: 'compound_base' },
      ],
    };
  }

  window.BDICompoundViewModels = {
    buildCompoundSummaryModel,
    buildCompoundBreakdownModel,
    buildCompoundChartModel,
  };
})();
