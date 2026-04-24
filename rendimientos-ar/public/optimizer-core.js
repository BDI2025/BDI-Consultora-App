(function attachOptimizerCore(globalScope) {
  const OPTIMIZER_JS_FALLBACK_RANDOM_COUNT = 15000;
  const OPTIMIZER_JS_FALLBACK_FRONTIER_POINTS = 60;

  function getLanguage() {
    return globalScope.currentLanguage || 'es';
  }

  function getTranslator() {
    return typeof globalScope.t === 'function' ? globalScope.t : ((key) => key);
  }

  async function fetchPythonOptimizerModel({ tickers, years, rf, minWeight, targetReturn, randomCount }) {
    const response = await fetch('/api/optimizer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tickers,
        years,
        rf,
        minWeight,
        targetReturn,
        randomCount,
      }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload?.error || `HTTP ${response.status}`);
    }

    const payload = await response.json();
    return hydratePythonOptimizerModel(payload);
  }

  function hydratePythonOptimizerModel(payload) {
    const currentLanguage = getLanguage();
    const model = {
      ...payload,
      assets: Array.isArray(payload.assets) ? payload.assets : [],
      dates: Array.isArray(payload.dates) ? payload.dates : [],
      rf: Number(payload.rf || 0),
      minWeight: Number(payload.minWeight || 0),
      targetReturn: payload.targetReturn == null ? null : Number(payload.targetReturn),
      randomPortfolios: Array.isArray(payload.randomPortfolios) ? payload.randomPortfolios : [],
      frontier: Array.isArray(payload.frontier) ? payload.frontier : [],
      correlation: Array.isArray(payload.correlation) ? payload.correlation : [],
      assetSeries: Array.isArray(payload.assetSeries) ? payload.assetSeries : [],
      cagrRows: Array.isArray(payload.cagrRows) ? payload.cagrRows : [],
      engine: payload.engine || 'python-scipy',
    };

    const optimizedPortfolios = [
      { key: 'max_sharpe', label: currentLanguage === 'en' ? 'Optimal Sharpe' : 'Sharpe Óptimo', color: '#e0b100', data: payload.maxSharpe },
      { key: 'min_vol', label: currentLanguage === 'en' ? 'Minimum Volatility' : 'Mínima Volatilidad', color: '#e25555', data: payload.minVol },
    ];

    if (payload.targetPortfolio) {
      optimizedPortfolios.push({
        key: 'target',
        label: currentLanguage === 'en'
          ? `Target Portfolio ${(Number(payload.targetReturn || 0) * 100).toFixed(2)}%`
          : `Portfolio Objetivo ${(Number(payload.targetReturn || 0) * 100).toFixed(2)}%`,
        color: '#157347',
        data: payload.targetPortfolio,
      });
    }

    model.maxSharpe = payload.maxSharpe;
    model.minVol = payload.minVol;
    model.targetPortfolio = payload.targetPortfolio || null;
    model.optimizedPortfolios = optimizedPortfolios;
    model.portfolioSeries = (Array.isArray(payload.portfolioSeries) ? payload.portfolioSeries : []).map((series) => {
      const mapped = optimizedPortfolios.find((portfolio) => portfolio.key === series.key);
      return {
        ...series,
        label: mapped?.label || series.label,
        color: mapped?.color || series.color,
      };
    });

    return model;
  }

  async function fetchOptimizerHistories(tickers, years) {
    const responses = await Promise.all(
      tickers.map(async (ticker) => {
        const res = await fetch(`/api/mundo?ticker=${encodeURIComponent(ticker)}&range=${years}y`);
        if (!res.ok) throw new Error(`Error trayendo ${ticker}`);
        const payload = await res.json();
        return { ticker, points: payload.points || [] };
      })
    );

    return responses.filter((item) => item.points.length > 10);
  }

  function prepareOptimizerDataset(histories) {
    const seriesMaps = histories.map((history) => {
      const byDate = new Map();
      history.points.forEach((point) => {
        if (!Number.isFinite(point.v)) return;
        const iso = new Date(point.t).toISOString().slice(0, 10);
        byDate.set(iso, point.v);
      });
      return { ticker: history.ticker, byDate };
    });

    if (!seriesMaps.length) return null;

    let commonDates = Array.from(seriesMaps[0].byDate.keys());
    for (const series of seriesMaps.slice(1)) {
      const set = new Set(series.byDate.keys());
      commonDates = commonDates.filter((date) => set.has(date));
    }

    commonDates.sort();
    if (commonDates.length < 40) return null;

    const assets = seriesMaps.map((series) => series.ticker);
    const priceMatrix = seriesMaps.map((series) => commonDates.map((date) => series.byDate.get(date)));
    const returnsByAsset = priceMatrix.map((prices) => {
      const values = [];
      for (let i = 1; i < prices.length; i++) {
        values.push(prices[i - 1] > 0 ? (prices[i] / prices[i - 1]) - 1 : 0);
      }
      return values;
    });

    const returnDates = commonDates.slice(1);
    const dailyReturnsMatrix = returnDates.map((_, index) => returnsByAsset.map((assetReturns) => assetReturns[index]));
    return { assets, priceDates: commonDates, prices: priceMatrix, dates: returnDates, returnsByAsset, dailyReturnsMatrix };
  }

  function buildOptimizerFallbackModel(prepared, rf, minWeight, targetReturn) {
    const { assets, dates, prices, returnsByAsset, dailyReturnsMatrix } = prepared;
    const currentLanguage = getLanguage();
    const numAssets = assets.length;
    const meanReturns = returnsByAsset.map((series) => average(series) * 252);
    const covMatrix = covarianceMatrix(returnsByAsset, 252);
    const randomCount = numAssets === 1 ? 1 : OPTIMIZER_JS_FALLBACK_RANDOM_COUNT;
    const randomPortfolios = [];
    const w0 = Array(numAssets).fill(1 / numAssets);
    const optSharpe = optimizePortfolio({
      objective: 'negSharpe',
      initialWeights: w0,
      meanReturns,
      covMatrix,
      rf,
      minWeight,
    });
    const maxSharpe = { ...portfolioStats(optSharpe.x, meanReturns, covMatrix, rf), weights: optSharpe.x.slice(), success: optSharpe.success };
    const optVol = optimizePortfolio({
      objective: 'minVol',
      initialWeights: w0,
      meanReturns,
      covMatrix,
      rf,
      minWeight,
    });
    const minVol = { ...portfolioStats(optVol.x, meanReturns, covMatrix, rf), weights: optVol.x.slice(), success: optVol.success };

    let targetPortfolio = null;
    if (targetReturn != null) {
      const optTarget = optimizePortfolio({
        objective: 'minVol',
        initialWeights: w0,
        meanReturns,
        covMatrix,
        rf,
        minWeight,
        targetReturn,
      });
      if (optTarget.success) {
        targetPortfolio = {
          ...portfolioStats(optTarget.x, meanReturns, covMatrix, rf),
          weights: optTarget.x.slice(),
          success: true,
        };
      }
    }

    const frontierSolutions = buildEfficientFrontier(
      meanReturns,
      covMatrix,
      rf,
      minWeight,
      w0,
      OPTIMIZER_JS_FALLBACK_FRONTIER_POINTS
    );
    const frontier = frontierSolutions.map((item) => ({ x: item.vol * 100, y: item.ret * 100 }));
    for (let i = 0; i < randomCount; i++) {
      const weights = sampleDirichletWeights(numAssets);
      if (minWeight > 0 && weights.some((weight) => weight < minWeight)) continue;
      const stats = portfolioStats(weights, meanReturns, covMatrix, rf);
      randomPortfolios.push({ weights, ...stats });
    }
    const assetSeries = assets.map((asset, index) => ({ label: asset, values: cumulativeSeries(returnsByAsset[index]) }));
    const optimizedPortfolios = [
      { key: 'max_sharpe', label: 'Máx Sharpe', color: '#e0b100', data: maxSharpe },
      { key: 'min_vol', label: 'Mín. Vol', color: '#e25555', data: minVol },
    ];
    if (targetPortfolio) {
      optimizedPortfolios.push({ key: 'target', label: `Objetivo ${formatPct(targetReturn * 100, 1)}`, color: '#157347', data: targetPortfolio });
    }

    optimizedPortfolios.forEach((portfolio) => {
      if (portfolio.key === 'max_sharpe') {
        portfolio.label = currentLanguage === 'en' ? 'Optimal Sharpe' : 'Sharpe Óptimo';
      } else if (portfolio.key === 'min_vol') {
        portfolio.label = currentLanguage === 'en' ? 'Minimum Volatility' : 'Mínima Volatilidad';
      } else if (portfolio.key === 'target') {
        portfolio.label = currentLanguage === 'en'
          ? `Target Portfolio ${(targetReturn * 100).toFixed(2)}%`
          : `Portfolio Objetivo ${(targetReturn * 100).toFixed(2)}%`;
      }
    });

    const portfolioSeries = optimizedPortfolios.map((portfolio) => ({
      ...portfolio,
      values: cumulativeSeries(computePortfolioDailyReturns(dailyReturnsMatrix, portfolio.data.weights)),
    }));

    const cagrRows = [
      ...assetSeries.map((series) => ({ label: series.label, type: 'Activo', cagr: calcSeriesCagr(series.values, dates) })),
      ...portfolioSeries.map((series) => ({ label: series.label, type: 'Portfolio', cagr: calcSeriesCagr(series.values, dates) })),
    ];

    return {
      assets, dates, prices, returnsByAsset, dailyReturnsMatrix, rf, minWeight, targetReturn, meanReturns, covMatrix,
      randomPortfolios, frontier, maxSharpe, minVol, targetPortfolio, assetSeries, portfolioSeries, optimizedPortfolios,
      cagrRows, correlation: correlationMatrix(returnsByAsset), engine: 'js-contingency',
    };
  }

  function average(values) {
    return values.reduce((sum, value) => sum + value, 0) / (values.length || 1);
  }

  function covarianceMatrix(seriesByAsset, annualFactor = 1) {
    return seriesByAsset.map((seriesA) => seriesByAsset.map((seriesB) => covariance(seriesA, seriesB) * annualFactor));
  }

  function covariance(a, b) {
    const meanA = average(a);
    const meanB = average(b);
    let sum = 0;
    for (let i = 0; i < a.length; i++) sum += (a[i] - meanA) * (b[i] - meanB);
    return sum / Math.max(1, a.length - 1);
  }

  function correlationMatrix(seriesByAsset) {
    return seriesByAsset.map((seriesA, i) =>
      seriesByAsset.map((seriesB, j) => {
        if (i === j) return 1;
        const cov = covariance(seriesA, seriesB);
        const stdA = Math.sqrt(Math.max(covariance(seriesA, seriesA), 0));
        const stdB = Math.sqrt(Math.max(covariance(seriesB, seriesB), 0));
        return stdA && stdB ? cov / (stdA * stdB) : 0;
      })
    );
  }

  function sampleDirichletWeights(numAssets) {
    if (numAssets === 1) return [1];
    const values = Array.from({ length: numAssets }, () => -Math.log(Math.max(Math.random(), 1e-12)));
    const total = values.reduce((sum, value) => sum + value, 0) || 1;
    return values.map((value) => value / total);
  }

  function portfolioStats(weights, meanReturns, covMatrix, rf) {
    const ret = dot(weights, meanReturns);
    const variance = quadraticForm(weights, covMatrix);
    const vol = Math.sqrt(Math.max(variance, 0));
    const sharpe = vol > 0 ? (ret - rf) / vol : 0;
    return { ret, vol, sharpe };
  }

  function dot(a, b) {
    return a.reduce((sum, value, index) => sum + value * b[index], 0);
  }

  function quadraticForm(weights, matrix) {
    let total = 0;
    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights.length; j++) total += weights[i] * matrix[i][j] * weights[j];
    }
    return total;
  }

  function optimizePortfolio({ objective, initialWeights, meanReturns, covMatrix, rf, minWeight, targetReturn = null }) {
    const starts = [initialWeights.slice()];
    if (initialWeights.length > 1) {
      starts.push(...Array.from({ length: 7 }, () => projectWeightsToBounds(sampleDirichletWeights(initialWeights.length), minWeight)));
    }

    let best = null;
    for (const start of starts) {
      const candidate = runProjectedOptimizer(start, { objective, meanReturns, covMatrix, rf, minWeight, targetReturn });
      if (!best || candidate.score < best.score) best = candidate;
    }

    const tolerance = targetReturn == null ? 1e-4 : 0.0025;
    return {
      success: !!best && Number.isFinite(best.score) && (targetReturn == null || Math.abs(best.ret - targetReturn) <= tolerance),
      x: best ? best.weights.slice() : initialWeights.slice(),
      score: best ? best.score : Number.POSITIVE_INFINITY,
    };
  }

  function runProjectedOptimizer(startWeights, config) {
    const { objective, meanReturns, covMatrix, rf, minWeight, targetReturn } = config;
    let weights = projectWeightsToBounds(startWeights, minWeight);
    let current = evaluateOptimizerCandidate(weights, objective, meanReturns, covMatrix, rf, targetReturn);
    let best = { ...current, weights: weights.slice() };
    let step = objective === 'negSharpe' ? 0.18 : 0.12;

    for (let iter = 0; iter < 2200; iter++) {
      const gradient = optimizerGradient(weights, objective, meanReturns, covMatrix, rf, targetReturn);
      let improved = false;

      for (let attempt = 0; attempt < 8; attempt++) {
        const candidateWeights = projectWeightsToBounds(
          weights.map((value, index) => value - step * gradient[index]),
          minWeight
        );
        const candidate = evaluateOptimizerCandidate(candidateWeights, objective, meanReturns, covMatrix, rf, targetReturn);
        if (candidate.score + 1e-10 < current.score) {
          weights = candidateWeights;
          current = candidate;
          improved = true;
          if (candidate.score < best.score) best = { ...candidate, weights: candidateWeights.slice() };
          step *= 1.02;
          break;
        }
        step *= 0.5;
      }

      if (!improved) {
        const jitteredWeights = projectWeightsToBounds(
          weights.map((value, index) => value + ((Math.random() - 0.5) * 0.02 * (index % 2 === 0 ? 1 : -1))),
          minWeight
        );
        const jittered = evaluateOptimizerCandidate(jitteredWeights, objective, meanReturns, covMatrix, rf, targetReturn);
        if (jittered.score < current.score) {
          weights = jitteredWeights;
          current = jittered;
          if (jittered.score < best.score) best = { ...jittered, weights: jitteredWeights.slice() };
        }
      }
    }

    return best;
  }

  function evaluateOptimizerCandidate(weights, objective, meanReturns, covMatrix, rf, targetReturn) {
    const stats = portfolioStats(weights, meanReturns, covMatrix, rf);
    let score = objective === 'negSharpe' ? -stats.sharpe : stats.vol;
    if (targetReturn != null) {
      score += 1800 * Math.pow(stats.ret - targetReturn, 2);
    }
    return { ...stats, score };
  }

  function optimizerGradient(weights, objective, meanReturns, covMatrix, rf, targetReturn) {
    const stats = portfolioStats(weights, meanReturns, covMatrix, rf);
    const safeVol = Math.max(stats.vol, 1e-10);
    const covTimesWeights = multiplyMatrixVector(covMatrix, weights);
    let gradient;

    if (objective === 'negSharpe') {
      gradient = meanReturns.map((assetReturn, index) => -((assetReturn / safeVol) - (((stats.ret - rf) * covTimesWeights[index]) / Math.pow(safeVol, 3))));
    } else {
      gradient = covTimesWeights.map((value) => value / safeVol);
    }

    if (targetReturn != null) {
      const penaltyGradient = meanReturns.map((assetReturn) => 3600 * (stats.ret - targetReturn) * assetReturn);
      gradient = gradient.map((value, index) => value + penaltyGradient[index]);
    }

    return gradient;
  }

  function buildEfficientFrontier(meanReturns, covMatrix, rf, minWeight, w0, pointCount = 100) {
    const returnsRange = linspace(Math.min(...meanReturns), Math.max(...meanReturns), Math.max(2, pointCount));
    const frontier = [];

    returnsRange.forEach((target) => {
      const solution = optimizePortfolio({
        objective: 'minVol',
        initialWeights: w0,
        meanReturns,
        covMatrix,
        rf,
        minWeight,
        targetReturn: target,
      });
      if (!solution.success) return;
      frontier.push({ ...portfolioStats(solution.x, meanReturns, covMatrix, rf), weights: solution.x.slice() });
    });

    return frontier;
  }

  function multiplyMatrixVector(matrix, vector) {
    return matrix.map((row) => row.reduce((sum, value, index) => sum + value * vector[index], 0));
  }

  function linspace(start, end, count) {
    if (count <= 1) return [start];
    return Array.from({ length: count }, (_, index) => start + ((end - start) * index / (count - 1)));
  }

  function projectWeightsToBounds(values, minWeight) {
    const n = values.length;
    const floor = minWeight || 0;
    const residual = 1 - floor * n;
    if (residual < 0) return Array(n).fill(1 / n);
    const shifted = values.map((value) => value - floor);
    const projected = projectToSimplex(shifted, residual);
    const weights = projected.map((value) => value + floor);
    const sum = weights.reduce((acc, value) => acc + value, 0) || 1;
    return weights.map((value) => value / sum);
  }

  function projectToSimplex(values, targetSum = 1) {
    const sorted = [...values].sort((a, b) => b - a);
    let cumulative = 0;
    let rho = 0;
    for (let i = 0; i < sorted.length; i++) {
      cumulative += sorted[i];
      const threshold = (cumulative - targetSum) / (i + 1);
      if (sorted[i] - threshold > 0) rho = i + 1;
    }
    const theta = (sorted.slice(0, rho).reduce((sum, value) => sum + value, 0) - targetSum) / Math.max(rho, 1);
    return values.map((value) => Math.max(value - theta, 0));
  }

  function computePortfolioDailyReturns(dailyReturnsMatrix, weights) {
    return dailyReturnsMatrix.map((row) => dot(row, weights));
  }

  function cumulativeSeries(dailyReturns) {
    let acc = 1;
    return dailyReturns.map((value) => {
      acc *= (1 + value);
      return (acc - 1) * 100;
    });
  }

  function calcSeriesCagr(cumulativePercentSeries, dates) {
    if (!cumulativePercentSeries.length || dates.length < 2) return 0;
    const start = new Date(dates[0]);
    const end = new Date(dates[dates.length - 1]);
    const years = (end - start) / (365.25 * 24 * 60 * 60 * 1000);
    if (years <= 0) return 0;
    const totalReturn = 1 + (cumulativePercentSeries[cumulativePercentSeries.length - 1] / 100);
    return Math.pow(Math.max(totalReturn, 0.0001), 1 / years) - 1;
  }

  function formatPct(value, digits = 2) {
    return `${Number(value).toLocaleString('es-AR', { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
  }

  globalScope.BDIOptimizerCore = {
    fetchPythonOptimizerModel,
    hydratePythonOptimizerModel,
    fetchOptimizerHistories,
    prepareOptimizerDataset,
    buildOptimizerFallbackModel,
  };
})(window);
