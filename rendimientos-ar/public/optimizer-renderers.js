(function attachOptimizerRenderers(globalScope) {
  function getLanguage() {
    return globalScope.currentLanguage || 'es';
  }

  function getTranslator() {
    return typeof globalScope.t === 'function' ? globalScope.t : ((key) => key);
  }

  function formatPct(value, digits = 2) {
    return `${Number(value).toLocaleString('es-AR', { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
  }

  function renderOptimizerSummary(model) {
    const t = getTranslator();
    const el = document.getElementById('optimizer-summary');
    if (!el) return;
    const cards = [
      { label: t('optimizer_summary_assets'), value: String(model.assets.length), meta: model.assets.join(', ') },
      { label: t('optimizer_summary_max_sharpe'), value: formatPct(model.maxSharpe.ret * 100), meta: `Vol ${formatPct(model.maxSharpe.vol * 100)} | Sharpe ${model.maxSharpe.sharpe.toFixed(2)}` },
      { label: t('optimizer_summary_min_vol'), value: formatPct(model.minVol.ret * 100), meta: `Vol ${formatPct(model.minVol.vol * 100)} | Sharpe ${model.minVol.sharpe.toFixed(2)}` },
      { label: t('optimizer_summary_rf'), value: formatPct(model.rf * 100), meta: model.targetReturn != null ? t('optimizer_target', { value: formatPct(model.targetReturn * 100, 1) }) : t('optimizer_summary_no_target') },
    ];
    el.innerHTML = cards.map((card) => `<div class="optimizer-summary-card"><div class="label">${card.label}</div><div class="value">${card.value}</div><div class="meta">${card.meta}</div></div>`).join('');
  }

  function renderOptimizerWeights(model) {
    const t = getTranslator();
    const el = document.getElementById('optimizer-weights');
    if (!el) return;
    const headers = [t('optimizer_weights_asset'), ...model.optimizedPortfolios.map((portfolio) => portfolio.label)];
    const rows = model.assets.map((asset, index) => `<tr><td>${asset}</td>${model.optimizedPortfolios.map((portfolio) => `<td>${formatPct(portfolio.data.weights[index] * 100, 2)}</td>`).join('')}</tr>`).join('');
    el.innerHTML = `<div class="optimizer-table-wrap"><table class="optimizer-table"><thead><tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function renderOptimizerFrontier(model) {
    const t = getTranslator();
    const currentLanguage = getLanguage();
    const section = document.getElementById('optimizer-frontier-section');
    const canvas = globalScope.prepareOptimizerCanvas?.('optimizer-frontier-chart', 420);
    if (!canvas) return;
    if (section) {
      section.hidden = false;
      section.style.setProperty('display', 'block', 'important');
    }
    const width = 900;
    const height = 620;
    const randomData = model.randomPortfolios.map((portfolio) => ({ x: portfolio.vol * 100, y: portfolio.ret * 100, sharpe: portfolio.sharpe }));
    const points = [
      ...randomData,
      ...model.frontier,
      { x: model.maxSharpe.vol * 100, y: model.maxSharpe.ret * 100 },
      { x: model.minVol.vol * 100, y: model.minVol.ret * 100 },
      ...(model.targetPortfolio ? [{ x: model.targetPortfolio.vol * 100, y: model.targetPortfolio.ret * 100 }] : []),
    ];
    const scatterX = randomData.map((p) => p.x).sort((a, b) => a - b);
    const scatterY = randomData.map((p) => p.y).sort((a, b) => a - b);
    const rawXMin = 0;
    const rawXMax = Math.max(percentile(scatterX, 0.995), ...points.map((p) => p.x)) * 1.04;
    const rawYMin = Math.max(0, Math.min(percentile(scatterY, 0.005), model.rf * 100, ...points.map((p) => p.y)) * 0.92);
    const rawYMax = Math.max(percentile(scatterY, 0.995), ...points.map((p) => p.y)) * 1.06;
    const xTicks = buildNiceTicks(rawXMin, rawXMax, 6);
    const yTicks = buildNiceTicks(rawYMin, rawYMax, 6);
    const xMin = xTicks[0];
    const xMax = xTicks[xTicks.length - 1];
    const yMin = yTicks[0];
    const yMax = yTicks[yTicks.length - 1];
    const sharpeValues = randomData.map((p) => p.sharpe);
    const minSharpe = Math.min(...sharpeValues);
    const maxSharpe = Math.max(...sharpeValues);
    const sharpeLegendId = `optimizer-sharpe-gradient-${Date.now()}`;
    const margin = { top: 88, right: 118, bottom: 88, left: 88 };
    const scaleX = (value) => margin.left + ((value - xMin) / ((xMax - xMin) || 1)) * (width - margin.left - margin.right);
    const scaleY = (value) => height - margin.bottom - ((value - yMin) / ((yMax - yMin) || 1)) * (height - margin.top - margin.bottom);
    const frontierPath = buildLinearSvgPath(model.frontier.map((point) => ({ x: scaleX(point.x), y: scaleY(point.y) })));
    const cmlXStart = 0;
    const cmlYStart = model.rf * 100;
    const cmlMaxX = (((yMax / 100) - model.rf) / Math.max(model.maxSharpe.sharpe, 0.0001)) * 100;
    const cmlTargetX = Math.max(xMin, Math.min(xMax, cmlMaxX));
    const cmlStart = { x: cmlXStart, y: Math.max(yMin, Math.min(yMax, cmlYStart)) };
    const cmlEnd = { x: cmlTargetX, y: (model.rf + model.maxSharpe.sharpe * (cmlTargetX / 100)) * 100 };
    const cmlPath = `M ${scaleX(cmlStart.x).toFixed(2)} ${scaleY(cmlStart.y).toFixed(2)} L ${scaleX(cmlEnd.x).toFixed(2)} ${scaleY(cmlEnd.y).toFixed(2)}`;
    const scatterDots = randomData
      .filter((_, index) => index % Math.max(1, Math.ceil(randomData.length / 12000)) === 0)
      .map((point) => `<circle cx="${scaleX(point.x).toFixed(2)}" cy="${scaleY(point.y).toFixed(2)}" r="1.65" fill="${optimizerSharpeColor(point.sharpe, minSharpe, maxSharpe)}" />`)
      .join('');
    const legendX = 24;
    const legendY = 24;
    const legendWidth = 178;
    const legendHeight = model.targetPortfolio ? 116 : 96;

    canvas.innerHTML = `
      <div class="optimizer-svg-shell">
        <div class="optimizer-svg-frame">
          <svg class="optimizer-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" aria-label="Espacio de portfolios">
            <defs>
              <linearGradient id="${sharpeLegendId}" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stop-color="${optimizerSharpeColor(minSharpe, minSharpe, maxSharpe)}" />
                <stop offset="50%" stop-color="${optimizerSharpeColor((minSharpe + maxSharpe) / 2, minSharpe, maxSharpe)}" />
                <stop offset="100%" stop-color="${optimizerSharpeColor(maxSharpe, minSharpe, maxSharpe)}" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="${width}" height="${height}" fill="transparent" />
            ${xTicks.map((tick) => `<g><line x1="${scaleX(tick)}" y1="${margin.top}" x2="${scaleX(tick)}" y2="${height - margin.bottom}" stroke="rgba(15,23,42,0.08)" /><text x="${scaleX(tick)}" y="${height - 34}" font-size="11" text-anchor="middle" fill="#64748b">${tick.toFixed(1)}%</text></g>`).join('')}
            ${yTicks.map((tick) => `<g><line x1="${margin.left}" y1="${scaleY(tick)}" x2="${width - margin.right}" y2="${scaleY(tick)}" stroke="rgba(15,23,42,0.08)" /><text x="${margin.left - 14}" y="${scaleY(tick) + 4}" font-size="11" text-anchor="end" fill="#64748b">${tick.toFixed(1)}%</text></g>`).join('')}
            ${scatterDots}
            <path d="${frontierPath}" fill="none" stroke="#1f5eff" stroke-width="3" />
            <path d="${cmlPath}" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="7 5" />
            ${renderOptimizerStar(scaleX(model.maxSharpe.vol * 100), scaleY(model.maxSharpe.ret * 100), '#e0b100', 11)}
            ${renderOptimizerMarker(scaleX(model.minVol.vol * 100), scaleY(model.minVol.ret * 100), '#ef4444', 6.5)}
            ${model.targetPortfolio ? renderOptimizerDiamond(scaleX(model.targetPortfolio.vol * 100), scaleY(model.targetPortfolio.ret * 100), '#157347', 7) : ''}
            <g transform="translate(${legendX}, ${legendY})">
              <rect x="0" y="0" width="${legendWidth}" height="${legendHeight}" rx="12" fill="rgba(255,255,255,0.92)" stroke="rgba(15,23,42,0.08)" />
              <g transform="translate(14,18)">
                <line x1="0" y1="0" x2="24" y2="0" stroke="#1f5eff" stroke-width="3" />
                <text x="34" y="4" font-size="12" fill="#334155">${t('optimizer_frontier_line')}</text>
                <path d="M 0 22 L 24 22" stroke="#dc2626" stroke-width="2" stroke-dasharray="7 5" />
                <text x="34" y="26" font-size="12" fill="#334155">${t('optimizer_frontier_cml')}</text>
                ${renderOptimizerStar(12, 46, '#e0b100', 10)}
                <text x="34" y="50" font-size="12" fill="#334155">${currentLanguage === 'en' ? 'Optimal Sharpe' : 'Sharpe Óptimo'}</text>
                <circle cx="12" cy="70" r="6.5" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
                <text x="34" y="74" font-size="12" fill="#334155">${currentLanguage === 'en' ? 'Minimum Volatility' : 'Mínima Volatilidad'}</text>
              </g>
            </g>
            <g transform="translate(${width - 34}, ${margin.top + 8})">
              <rect x="0" y="0" width="12" height="${height - margin.top - margin.bottom - 16}" rx="6" fill="url(#${sharpeLegendId})" />
              <text x="6" y="-8" font-size="11" text-anchor="middle" fill="#475569">${t('optimizer_sharpe_ratio')}</text>
              <text x="18" y="${height - margin.top - margin.bottom - 12}" font-size="10" fill="#64748b">${minSharpe.toFixed(2)}</text>
              <text x="18" y="10" font-size="10" fill="#64748b">${maxSharpe.toFixed(2)}</text>
            </g>
            <text x="${width / 2}" y="${height - 10}" font-size="13" text-anchor="middle" fill="#475569">${t('optimizer_frontier_vol_axis')}</text>
            <text x="24" y="${height / 2}" font-size="13" text-anchor="middle" fill="#475569" transform="rotate(-90 24 ${height / 2})">${t('optimizer_frontier_ret_axis')}</text>
          </svg>
        </div>
      </div>
    `;
  }

  function optimizerSharpeColor(value, min, max) {
    const normalized = (value - min) / ((max - min) || 1);
    const hue = 210 - normalized * 150;
    return `hsla(${hue}, 72%, 48%, 0.58)`;
  }

  function renderOptimizerPerformance(model) {
    const currentLanguage = getLanguage();
    const section = document.getElementById('optimizer-performance-section');
    const assetCanvas = globalScope.prepareOptimizerCanvas?.('optimizer-assets-chart', 420);
    const portfolioCanvas = globalScope.prepareOptimizerCanvas?.('optimizer-portfolios-chart', 420);
    if (!assetCanvas || !portfolioCanvas) return;
    if (section) {
      section.hidden = false;
      section.style.setProperty('display', 'block', 'important');
    }
    const enrichedAssets = model.assetSeries.map((series, index) => ({
      ...series,
      color: optimizerPalette(index),
      endValue: series.values[series.values.length - 1] || 0,
    }));
    renderOptimizerLineSvg(
      assetCanvas,
      enrichedAssets.map((series) => ({
        ...series,
        highlighted: true,
        muted: false,
      })),
      currentLanguage === 'en' ? 'Accumulated returns (%) by asset' : 'Rendimientos acumulados (%) de cada activo',
      {
        subtitle: currentLanguage === 'en'
          ? 'Adjusted-close cumulative growth for each downloaded asset.'
          : 'Crecimiento acumulado desde precios ajustados para cada activo descargado.',
        legendMode: 'compact',
      }
    );

    renderOptimizerLineSvg(
      portfolioCanvas,
      model.portfolioSeries.map((series) => ({
        ...series,
        color: series.color,
        highlighted: true,
        muted: false,
      })),
      currentLanguage === 'en' ? 'Accumulated returns (%) of optimal portfolios' : 'Rendimientos acumulados (%) de portafolios óptimos',
      {
        subtitle: currentLanguage === 'en'
          ? 'Evolution of the optimized portfolios built from the same return series.'
          : 'Evolución de los portafolios óptimos construidos sobre la misma serie de retornos.',
        legendMode: 'labels',
      }
    );
  }

  function renderOptimizerCagr(model) {
    const t = getTranslator();
    const currentLanguage = getLanguage();
    const el = document.getElementById('optimizer-cagr');
    if (!el) return;
    const rows = model.cagrRows.map((row) => `<tr><td>${row.label}</td><td>${row.type === 'Activo' ? t('optimizer_type_asset') : t('optimizer_type_portfolio')}</td><td>${formatPct(row.cagr * 100, 2)}</td></tr>`).join('');
    const bars = model.cagrRows.map((row, index) => ({
      ...row,
      color: row.type === 'Activo'
        ? optimizerPalette(index)
        : (row.label.includes('Objetivo') || row.label.includes('Target') ? '#157347' : row.label.includes('Sharpe') ? '#e0b100' : '#e25555'),
    }));
    const width = 640;
    const height = 300;
    const margin = { top: 36, right: 18, bottom: 96, left: 56 };
    const yMax = Math.max(...bars.map((bar) => bar.cagr * 100), 0);
    const scaleY = (value) => height - margin.bottom - ((value - 0) / ((yMax - 0) || 1)) * (height - margin.top - margin.bottom);
    const barWidth = Math.max(18, ((width - margin.left - margin.right) / Math.max(bars.length, 1)) * 0.62);
    const gap = ((width - margin.left - margin.right) / Math.max(bars.length, 1));

    el.innerHTML = `
      <div class="optimizer-table-wrap"><table class="optimizer-table"><thead><tr><th>${t('optimizer_cagr_asset_portfolio')}</th><th>${t('optimizer_cagr_type')}</th><th>${t('optimizer_cagr_annual')}</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="optimizer-svg-shell" style="margin-top:18px">
        <div class="optimizer-svg-frame">
          <svg class="optimizer-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" aria-label="Comparación CAGR anual">
            <text x="${width / 2}" y="22" font-size="16" font-weight="700" text-anchor="middle" fill="#0f172a">${currentLanguage === 'en' ? 'Annual CAGR comparison' : 'Comparación CAGR anual Activos y Portfolios'}</text>
            ${buildLinearTicks(0, yMax, 5).map((tick) => `<g><line x1="${margin.left}" y1="${scaleY(tick)}" x2="${width - margin.right}" y2="${scaleY(tick)}" stroke="rgba(15,23,42,0.08)" /><text x="${margin.left - 10}" y="${scaleY(tick) + 4}" font-size="11" text-anchor="end" fill="#64748b">${tick.toFixed(1)}%</text></g>`).join('')}
            ${bars.map((bar, index) => {
              const x = margin.left + (index * gap) + ((gap - barWidth) / 2);
              const y = scaleY(bar.cagr * 100);
              const heightValue = Math.max(0, height - margin.bottom - y);
              return `
                <rect x="${x}" y="${y}" width="${barWidth}" height="${heightValue}" rx="6" fill="${bar.color}" opacity="${bar.type === 'Activo' ? 0.88 : 1}" />
                <text x="${x + barWidth / 2}" y="${y - 6}" font-size="10" text-anchor="middle" fill="#475569">${(bar.cagr * 100).toFixed(2)}%</text>
                <text x="${x + barWidth / 2}" y="${height - margin.bottom + 14}" font-size="10" text-anchor="end" fill="#475569" transform="rotate(-45 ${x + barWidth / 2} ${height - margin.bottom + 14})">${bar.label}</text>
              `;
            }).join('')}
          </svg>
        </div>
      </div>
    `;
  }

  function renderOptimizerCorrelation(model) {
    const t = getTranslator();
    const el = document.getElementById('optimizer-correlation');
    if (!el) return;
    const assets = model.assets;
    const matrix = model.correlation;
    const count = assets.length;
    const cell = count <= 8 ? 54 : count <= 12 ? 44 : 36;
    const left = 72;
    const top = 54;
    const width = left + cell * count + 84;
    const height = top + cell * count + 64;
    const gradientId = `optimizer-corr-gradient-${Date.now()}`;

    const cells = assets.map((asset, rowIndex) =>
      matrix[rowIndex].map((value, colIndex) => {
        const x = left + colIndex * cell;
        const y = top + rowIndex * cell;
        const fill = optimizerCorrelationColor(value);
        const textColor = value > 0.55 ? '#ffffff' : '#fffaf8';
        return `
          <rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${fill}" stroke="rgba(255,255,255,0.32)" stroke-width="1" />
          <text x="${x + cell / 2}" y="${y + cell / 2 + 4}" font-size="${cell > 42 ? 12 : 10}" font-weight="600" text-anchor="middle" fill="${textColor}">${value.toFixed(2)}</text>
        `;
      }).join('')
    ).join('');

    const xLabels = assets.map((asset, index) => {
      const x = left + index * cell + cell / 2;
      const y = top + cell * count + 18;
      return `<text x="${x}" y="${y}" font-size="11" text-anchor="end" fill="#475569" transform="rotate(-45 ${x} ${y})">${asset}</text>`;
    }).join('');

    const yLabels = assets.map((asset, index) => {
      const x = left - 12;
      const y = top + index * cell + cell / 2 + 4;
      return `<text x="${x}" y="${y}" font-size="11" text-anchor="end" fill="#475569">${asset}</text>`;
    }).join('');

    el.innerHTML = `
      <div class="optimizer-corr-wrap">
        <div class="optimizer-corr-card">
          <svg class="optimizer-svg optimizer-corr-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" aria-label="Matriz de correlación">
            <defs>
              <linearGradient id="${gradientId}" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stop-color="${optimizerCorrelationColor(0)}" />
                <stop offset="100%" stop-color="${optimizerCorrelationColor(1)}" />
              </linearGradient>
            </defs>
            <text x="${width / 2 - 18}" y="24" font-size="16" font-weight="700" text-anchor="middle" fill="#0f172a">${t('optimizer_corr_title')}</text>
            ${cells}
            ${xLabels}
            ${yLabels}
            <text x="${left + cell * count / 2}" y="${height - 8}" font-size="12" text-anchor="middle" fill="#475569">${t('optimizer_ticker')}</text>
            <text x="18" y="${top + cell * count / 2}" font-size="12" text-anchor="middle" fill="#475569" transform="rotate(-90 18 ${top + cell * count / 2})">${t('optimizer_ticker')}</text>
            <rect x="${width - 42}" y="${top}" width="16" height="${cell * count}" fill="url(#${gradientId})" rx="8" />
            ${buildLinearTicks(0, 1, 6).map((tick) => {
              const y = top + (1 - tick) * (cell * count);
              return `<text x="${width - 18}" y="${y + 4}" font-size="10" fill="#475569">${tick.toFixed(1)}</text>`;
            }).join('')}
            <text x="${width - 10}" y="${top + cell * count / 2}" font-size="12" text-anchor="middle" fill="#475569" transform="rotate(-90 ${width - 10} ${top + cell * count / 2})">${t('optimizer_correlation')}</text>
          </svg>
        </div>
      </div>
    `;
  }

  function renderOptimizerLineSvg(container, seriesList, title, options = {}) {
    const t = getTranslator();
    const width = 760;
    const height = 500;
    const margin = {
      top: 56,
      right: options.legendMode === 'labels' ? 96 : 26,
      bottom: 52,
      left: 64,
    };
    const allValues = seriesList.flatMap((series) => series.values);
    const yMin = Math.min(...allValues, 0);
    const yMax = Math.max(...allValues, 0);
    const xMax = Math.max(1, ...seriesList.map((series) => series.values.length - 1));
    const scaleX = (index) => margin.left + (index / xMax) * (width - margin.left - margin.right);
    const scaleY = (value) => height - margin.bottom - ((value - yMin) / ((yMax - yMin) || 1)) * (height - margin.top - margin.bottom);
    const yTicks = buildLinearTicks(yMin, yMax, 4);
    const xTicks = buildLinearTicks(0, xMax, 5).map((tick) => Math.round(tick));
    const paths = seriesList.map((series) => ({
      label: series.label,
      color: series.color,
      highlighted: !!series.highlighted,
      muted: !!series.muted,
      endValue: series.values[series.values.length - 1] || 0,
      endX: scaleX(Math.max(series.values.length - 1, 0)),
      endY: scaleY(series.values[series.values.length - 1] || 0),
      d: series.values.map((value, index) => `${index === 0 ? 'M' : 'L'} ${scaleX(index).toFixed(2)} ${scaleY(value).toFixed(2)}`).join(' ')
    }));

    const labelCandidates = options.legendMode === 'labels'
      ? paths.slice().sort((a, b) => a.endY - b.endY)
      : [];
    const placedLabels = [];
    labelCandidates.forEach((path) => {
      let y = path.endY;
      for (const used of placedLabels) {
        if (Math.abs(y - used) < 16) y = used + 16;
      }
      placedLabels.push(y);
      path.labelY = Math.max(margin.top + 10, Math.min(height - margin.bottom - 6, y));
    });

    container.innerHTML = `
      <div class="optimizer-svg-shell">
        <div class="optimizer-svg-frame">
          <svg class="optimizer-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" aria-label="${title}">
            <text x="${margin.left}" y="24" font-size="16" font-weight="700" text-anchor="start" fill="#0f172a">${title}</text>
            ${options.subtitle ? `<text x="${margin.left}" y="42" font-size="11" text-anchor="start" fill="#64748b">${options.subtitle}</text>` : ''}
            ${xTicks.map((tick) => `<g><line x1="${scaleX(tick)}" y1="${margin.top}" x2="${scaleX(tick)}" y2="${height - margin.bottom}" stroke="rgba(15,23,42,0.08)" /><text x="${scaleX(tick)}" y="${height - 16}" font-size="11" text-anchor="middle" fill="#64748b">${tick}</text></g>`).join('')}
            ${yTicks.map((tick) => `<g><line x1="${margin.left}" y1="${scaleY(tick)}" x2="${width - margin.right}" y2="${scaleY(tick)}" stroke="rgba(15,23,42,0.08)" /><text x="${margin.left - 10}" y="${scaleY(tick) + 4}" font-size="11" text-anchor="end" fill="#64748b">${tick.toFixed(0)}%</text></g>`).join('')}
            ${paths.map((path) => `<path d="${path.d}" fill="none" stroke="${path.color}" stroke-width="${path.highlighted ? 2.4 : 1.4}" opacity="${path.muted ? 0.28 : 0.95}" />`).join('')}
            ${options.legendMode === 'labels' ? paths.map((path) => `
              <g>
                <line x1="${path.endX + 4}" y1="${path.endY}" x2="${width - margin.right + 10}" y2="${path.labelY}" stroke="${path.color}" stroke-width="1.2" opacity="0.8" />
                <text x="${width - margin.right + 14}" y="${path.labelY + 4}" font-size="11" font-weight="600" text-anchor="start" fill="${path.color}">${path.label}</text>
              </g>
            `).join('') : ''}
            <text x="18" y="${height / 2}" font-size="13" text-anchor="middle" fill="#475569" transform="rotate(-90 18 ${height / 2})">Crecimiento acumulado (%)</text>
          </svg>
        </div>
        ${options.legendMode === 'compact' ? `
          <div class="optimizer-legend">
            ${paths.filter((path) => path.highlighted).map((path) => `<span class="optimizer-legend-item"><span class="optimizer-legend-swatch" style="background:${path.color}"></span>${path.label}</span>`).join('')}
            ${paths.some((path) => path.muted) ? `<span class="optimizer-legend-item"><span class="optimizer-legend-swatch" style="background:#cbd5e1"></span>${t('optimizer_assets_rest')}</span>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  function buildLinearTicks(min, max, count) {
    if (!Number.isFinite(min) || !Number.isFinite(max)) return [0];
    if (min === max) return [min];
    const ticks = [];
    for (let i = 0; i < count; i++) {
      ticks.push(min + ((max - min) * i / (count - 1)));
    }
    return ticks;
  }

  function buildNiceTicks(min, max, count = 6) {
    if (!Number.isFinite(min) || !Number.isFinite(max)) return [0];
    if (min === max) return [min];
    const span = Math.abs(max - min);
    const roughStep = span / Math.max(1, count - 1);
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const residual = roughStep / magnitude;
    let niceResidual = 1;
    if (residual > 5) niceResidual = 10;
    else if (residual > 2) niceResidual = 5;
    else if (residual > 1) niceResidual = 2;
    const step = niceResidual * magnitude;
    const niceMin = Math.floor(min / step) * step;
    const niceMax = Math.ceil(max / step) * step;
    const ticks = [];
    for (let value = niceMin; value <= niceMax + step * 0.5; value += step) {
      ticks.push(Number(value.toFixed(10)));
    }
    return ticks;
  }

  function percentile(sortedValues, ratio) {
    if (!sortedValues.length) return 0;
    const index = Math.min(sortedValues.length - 1, Math.max(0, ratio * (sortedValues.length - 1)));
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    if (lower === upper) return sortedValues[lower];
    const weight = index - lower;
    return sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight;
  }

  function buildLinearSvgPath(points) {
    if (!points.length) return '';
    return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ');
  }

  function renderOptimizerMarker(x, y, color, radius) {
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" stroke="#ffffff" stroke-width="2" />`;
  }

  function renderOptimizerStar(x, y, color, outerRadius) {
    const innerRadius = outerRadius * 0.45;
    const points = [];
    for (let i = 0; i < 10; i++) {
      const angle = (-Math.PI / 2) + (i * Math.PI / 5);
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      points.push(`${(x + Math.cos(angle) * radius).toFixed(2)},${(y + Math.sin(angle) * radius).toFixed(2)}`);
    }
    return `<polygon points="${points.join(' ')}" fill="${color}" stroke="#ffffff" stroke-width="2" />`;
  }

  function renderOptimizerDiamond(x, y, color, size) {
    return `<path d="M ${x} ${y - size} L ${x + size} ${y} L ${x} ${y + size} L ${x - size} ${y} Z" fill="${color}" stroke="#ffffff" stroke-width="2" />`;
  }

  function optimizerPalette(index) {
    const colors = ['#157347', '#1f5eff', '#d97706', '#dc2626', '#7c3aed', '#0f766e', '#b45309', '#334155'];
    return colors[index % colors.length];
  }

  function optimizerCorrelationColor(value) {
    const clamped = Math.max(0, Math.min(1, value));
    const start = { r: 173, g: 216, b: 230 };
    const end = { r: 255, g: 0, b: 0 };
    const red = Math.round(start.r + (end.r - start.r) * clamped);
    const green = Math.round(start.g + (end.g - start.g) * clamped);
    const blue = Math.round(start.b + (end.b - start.b) * clamped);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  globalScope.BDIOptimizerRenderers = {
    renderOptimizerSummary,
    renderOptimizerWeights,
    renderOptimizerCagr,
    renderOptimizerCorrelation,
    renderOptimizerFrontier,
    renderOptimizerPerformance,
  };
})(window);
