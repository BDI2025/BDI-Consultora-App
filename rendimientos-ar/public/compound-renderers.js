(function () {
  function formatCompoundPercent(value) {
    return `${(value || 0).toFixed(1)}%`;
  }

  function formatCompoundAxisCurrency(value, { currentLanguage, formatCompoundCurrency }) {
    const abs = Math.abs(value || 0);
    const sign = value < 0 ? '-' : '';
    const locale = currentLanguage === 'en' ? 'en-US' : 'es-AR';
    if (abs >= 1_000_000) {
      return `${sign}US$ ${(abs / 1_000_000).toLocaleString(locale, { maximumFractionDigits: 1 })}M`;
    }
    if (abs >= 1_000) {
      return `${sign}US$ ${(abs / 1_000).toLocaleString(locale, { maximumFractionDigits: 1 })}K`;
    }
    return `${sign}${formatCompoundCurrency(abs)}`;
  }

  function buildCompoundLabel(monthIndex, { currentLanguage }) {
    const years = monthIndex / 12;
    if (currentLanguage === 'en') {
      return years === 1 ? '1 year' : `${years.toFixed(years % 1 === 0 ? 0 : 1)} years`;
    }
    return years === 1 ? '1 año' : `${years.toFixed(years % 1 === 0 ? 0 : 1)} años`;
  }

  function buildSmoothSvgPath(points) {
    if (!points.length) return '';
    if (points.length < 3) {
      return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ');
    }
    let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
    for (let i = 0; i < points.length - 1; i += 1) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;
      path += ` Q ${current.x.toFixed(2)} ${current.y.toFixed(2)} ${midX.toFixed(2)} ${midY.toFixed(2)}`;
    }
    const last = points[points.length - 1];
    path += ` T ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;
    return path;
  }

  function renderCompoundSummary(results, deps) {
    const { document, currentLanguage, t, formatCompoundCurrency, viewModels } = deps;
    const summaryEl = document.getElementById('compound-summary');
    if (!summaryEl) return;
    const model = viewModels?.buildCompoundSummaryModel?.(results) || {
      years: results.years,
      cards: [
        { kind: 'contributed', contributed: results.base.contributed },
        { kind: 'cash', finalCash: results.base.finalCash },
        { kind: 'base', finalValue: results.base.finalValue, annualRatePct: results.base.annualRatePct, earnedInterest: results.base.earnedInterest },
        { kind: 'range', lowFinalValue: results.low.finalValue, highFinalValue: results.high.finalValue, lowAnnualRatePct: results.low.annualRatePct, highAnnualRatePct: results.high.annualRatePct },
      ],
    };

    summaryEl.innerHTML = `
      ${model.cards.map((card) => {
        if (card.kind === 'contributed') {
          return `
            <article class="compound-summary-card">
              <div class="label">${t('compound_summary_contributed')}</div>
              <div class="value">${formatCompoundCurrency(card.contributed)}</div>
              <div class="meta">${model.years} ${currentLanguage === 'en' ? 'years horizon' : 'años de horizonte'}</div>
            </article>
          `;
        }
        if (card.kind === 'cash') {
          return `
            <article class="compound-summary-card">
              <div class="label">${t('compound_summary_without')}</div>
              <div class="value">${formatCompoundCurrency(card.finalCash)}</div>
              <div class="meta">${t('compound_chart_cash')}</div>
            </article>
          `;
        }
        if (card.kind === 'base') {
          return `
            <article class="compound-summary-card">
              <div class="label">${t('compound_summary_base')}</div>
              <div class="value">${formatCompoundCurrency(card.finalValue)}</div>
              <div class="meta">${formatCompoundPercent(card.annualRatePct)} · ${t('compound_summary_interest')}: ${formatCompoundCurrency(card.earnedInterest)}</div>
            </article>
          `;
        }
        return `
          <article class="compound-summary-card">
            <div class="label">${t('compound_summary_range')}</div>
            <div class="value">${formatCompoundCurrency(card.lowFinalValue)} - ${formatCompoundCurrency(card.highFinalValue)}</div>
            <div class="meta">${formatCompoundPercent(card.lowAnnualRatePct)} / ${formatCompoundPercent(card.highAnnualRatePct)}</div>
          </article>
        `;
      }).join('')}
    `;
  }

  function renderCompoundBreakdown(results, deps) {
    const { document, t, formatCompoundCurrency, viewModels } = deps;
    const breakdownEl = document.getElementById('compound-breakdown');
    const sectionEl = document.getElementById('compound-breakdown-section');
    if (!breakdownEl || !sectionEl) return;
    const model = viewModels?.buildCompoundBreakdownModel?.(results) || {
      frequency: results.frequency,
      contributed: results.base.contributed,
      rows: [
        { tone: 'cash', labelKey: 'compound_chart_cash', annualRatePct: 0, finalValue: results.base.finalCash, earnedInterest: results.base.finalCash - results.base.contributed, diffVsCash: 0 },
        { tone: 'low', labelKey: 'compound_low', annualRatePct: results.low.annualRatePct, finalValue: results.low.finalValue, earnedInterest: results.low.earnedInterest, diffVsCash: results.low.diffVsCash },
        { tone: 'base', labelKey: 'compound_base', annualRatePct: results.base.annualRatePct, finalValue: results.base.finalValue, earnedInterest: results.base.earnedInterest, diffVsCash: results.base.diffVsCash },
        { tone: 'high', labelKey: 'compound_high', annualRatePct: results.high.annualRatePct, finalValue: results.high.finalValue, earnedInterest: results.high.earnedInterest, diffVsCash: results.high.diffVsCash },
      ],
    };

    breakdownEl.innerHTML = `
      <div class="compound-breakdown-wrap">
        <table class="optimizer-table compound-breakdown-table">
          <thead>
            <tr>
              <th>${t('compound_table_scenario')}</th>
              <th>${t('compound_table_rate')}</th>
              <th>${t('compound_summary_contributed')}</th>
              <th>${t('compound_table_final')}</th>
              <th>${t('compound_table_interest')}</th>
              <th>${t('compound_table_vs_cash')}</th>
            </tr>
          </thead>
          <tbody>
            ${model.rows.map((row) => `
              <tr class="compound-breakdown-row compound-breakdown-row--${row.tone}">
                <td class="compound-breakdown-scenario">${t(row.labelKey)}</td>
                <td>${formatCompoundPercent(row.annualRatePct)}</td>
                <td class="compound-breakdown-money">${formatCompoundCurrency(model.contributed)}</td>
                <td class="compound-breakdown-money">${formatCompoundCurrency(row.finalValue)}</td>
                <td class="compound-breakdown-money">${formatCompoundCurrency(row.earnedInterest)}</td>
                <td class="compound-breakdown-money">${formatCompoundCurrency(row.diffVsCash)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p class="compound-chart-note">${t('compound_frequency_label')}: ${t(`compound_frequency_${model.frequency}`)}</p>
      </div>
    `;

    sectionEl.style.display = 'block';
  }

  function renderCompoundChart(results, deps) {
    const { document, currentLanguage, t, formatCompoundCurrency, viewModels } = deps;
    const container = document.getElementById('compound-chart');
    const wrap = document.getElementById('compound-chart-wrap');
    const empty = document.getElementById('compound-chart-empty');
    if (!container || !wrap || !empty) return;
    const chartModel = viewModels?.buildCompoundChartModel?.(results) || null;

    const width = 920;
    const height = 520;
    const margin = { top: 22, right: 24, bottom: 58, left: 132 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const allSeries = chartModel?.allSeries || results.base.series.map((point, idx) => ({
      month: point.month,
      cash: point.cash,
      low: results.low.series[idx]?.invested ?? point.invested,
      base: point.invested,
      high: results.high.series[idx]?.invested ?? point.invested,
    }));
    const maxMonth = chartModel?.maxMonth || (allSeries[allSeries.length - 1]?.month || 1);
    const yMin = chartModel?.yMin ?? Math.min(...allSeries.flatMap((point) => [point.cash, point.low, point.base, point.high]));
    const yMax = chartModel?.yMax ?? Math.max(...allSeries.flatMap((point) => [point.cash, point.low, point.base, point.high]));

    const xScale = (month) => margin.left + (month / maxMonth) * plotWidth;
    const yScale = (value) => margin.top + plotHeight - ((value - yMin) / (yMax - yMin || 1)) * plotHeight;

    const cashPath = buildSmoothSvgPath(allSeries.map((point) => ({ x: xScale(point.month), y: yScale(point.cash) })));
    const basePath = buildSmoothSvgPath(allSeries.map((point) => ({ x: xScale(point.month), y: yScale(point.base) })));
    const lowPath = buildSmoothSvgPath(allSeries.map((point) => ({ x: xScale(point.month), y: yScale(point.low) })));
    const highPath = buildSmoothSvgPath(allSeries.map((point) => ({ x: xScale(point.month), y: yScale(point.high) })));
    const areaPath = [
      `M ${xScale(allSeries[0].month)} ${yScale(allSeries[0].high)}`,
      ...allSeries.slice(1).map((point) => `L ${xScale(point.month)} ${yScale(point.high)}`),
      ...allSeries.slice().reverse().map((point) => `L ${xScale(point.month)} ${yScale(point.low)}`),
      'Z',
    ].join(' ');

    const xTicks = chartModel?.xTicks || Array.from({ length: Math.min(results.years, 6) + 1 }, (_, idx) => {
      const year = Math.round((idx * maxMonth) / Math.min(results.years, 6));
      return Math.min(maxMonth, year);
    }).filter((value, idx, arr) => idx === 0 || value !== arr[idx - 1]);

    const yTicks = chartModel?.yTicks || Array.from({ length: 6 }, (_, idx) => yMin + ((yMax - yMin) / 5) * idx);
    const lastPoint = chartModel?.lastPoint || allSeries[allSeries.length - 1];
    const endX = xScale(lastPoint.month);
    const endCashY = yScale(lastPoint.cash);
    const endBaseY = yScale(lastPoint.base);

    const legendItems = (chartModel?.legendItems || [
      { color: '#64748b', labelKey: 'compound_chart_cash' },
      { color: '#94a3b8', labelKey: 'compound_chart_band', dashed: true },
      { color: '#157347', labelKey: 'compound_chart_invested', suffixKey: 'compound_base' },
    ]).map((item) => ({
      ...item,
      label: item.suffixKey ? `${t(item.labelKey)} · ${t(item.suffixKey)}` : t(item.labelKey),
    }));

    container.innerHTML = `
      <div class="optimizer-svg-shell">
        <div class="optimizer-svg-frame">
          <svg class="optimizer-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${t('compound_chart_title')}">
            <defs>
              <linearGradient id="compound-area-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(70,177,121,0.22)"></stop>
                <stop offset="100%" stop-color="rgba(70,177,121,0.04)"></stop>
              </linearGradient>
            </defs>
            <rect class="bdi-chart-plot-bg" x="${margin.left}" y="${margin.top}" width="${plotWidth}" height="${plotHeight}" rx="18"></rect>
            ${yTicks.map((tick) => `
              <g>
                <line class="bdi-chart-grid" x1="${margin.left}" y1="${yScale(tick)}" x2="${width - margin.right}" y2="${yScale(tick)}"></line>
                <text class="bdi-chart-tick" x="${margin.left - 12}" y="${yScale(tick) + 4}" text-anchor="end">${formatCompoundAxisCurrency(tick, { currentLanguage, formatCompoundCurrency })}</text>
              </g>
            `).join('')}
            ${xTicks.map((tick) => `
              <g>
                <line class="bdi-chart-grid" x1="${xScale(tick)}" y1="${margin.top}" x2="${xScale(tick)}" y2="${height - margin.bottom}"></line>
                <text class="bdi-chart-tick" x="${xScale(tick)}" y="${height - margin.bottom + 24}" text-anchor="middle">${buildCompoundLabel(tick, { currentLanguage })}</text>
              </g>
            `).join('')}
            <path d="${areaPath}" fill="url(#compound-area-fill)" stroke="none"></path>
            <path d="${lowPath}" fill="none" stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.9"></path>
            <path d="${highPath}" fill="none" stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.9"></path>
            <path d="${cashPath}" fill="none" stroke="#64748b" stroke-width="2.6"></path>
            <path d="${basePath}" fill="none" stroke="#157347" stroke-width="3.2"></path>
            <circle cx="${endX}" cy="${endCashY}" r="4.2" fill="#64748b" stroke="#ffffff" stroke-width="2"></circle>
            <circle cx="${endX}" cy="${endBaseY}" r="4.8" fill="#157347" stroke="#ffffff" stroke-width="2"></circle>
            <text x="${Math.min(width - margin.right - 8, endX - 12)}" y="${endCashY - 10}" text-anchor="end" font-size="11" font-weight="600" fill="#475569">${t('compound_chart_cash')}</text>
            <text x="${Math.min(width - margin.right - 8, endX - 12)}" y="${endBaseY - 12}" text-anchor="end" font-size="11" font-weight="700" fill="#157347">${t('compound_base')}</text>
            <line class="bdi-chart-axis" x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}"></line>
            <line class="bdi-chart-axis" x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}"></line>
            <text class="bdi-chart-label" x="${margin.left + plotWidth / 2}" y="${height - 12}" text-anchor="middle">${t('compound_axis_year')}</text>
            <text class="bdi-chart-label" transform="translate(34 ${margin.top + plotHeight / 2}) rotate(-90)" text-anchor="middle">${t('compound_axis_value')}</text>
          </svg>
        </div>
        <div class="optimizer-legend">
          ${legendItems.map((item) => `
            <span class="optimizer-legend-item">
              <span class="optimizer-legend-swatch ${item.dashed ? 'line' : ''}" style="color:${item.color};background:${item.dashed ? 'transparent' : item.color};border-top:${item.dashed ? `2px dashed ${item.color}` : 'none'}"></span>
              ${item.label}
            </span>
          `).join('')}
        </div>
      </div>
    `;

    empty.style.display = 'none';
    wrap.style.display = 'block';
  }

  window.BDICompoundRenderers = {
    renderCompoundSummary,
    renderCompoundBreakdown,
    renderCompoundChart,
  };
})();
