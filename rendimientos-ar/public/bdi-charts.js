(function () {
  const PALETTE = {
    axis: '#7d8a84',
    grid: '#d9e4dd',
    text: '#232323',
    muted: '#5f6b66',
    local: '#157347',
    ny: '#4cbdc2',
    cer: '#46b179',
    accent: '#4cbdc2',
  };

  function ensureHost(selector) {
    return document.querySelector(selector);
  }

  function formatNumber(value, digits) {
    return Number(value).toLocaleString('es-AR', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sortByX(points) {
    return [...points].sort((a, b) => a.x - b.x);
  }

  function quantile(values, q) {
    const sorted = [...values].sort((a, b) => a - b);
    if (!sorted.length) return null;
    const position = (sorted.length - 1) * q;
    const base = Math.floor(position);
    const rest = position - base;
    if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    }
    return sorted[base];
  }

  function median(values) {
    return quantile(values, 0.5);
  }

  function pointAt(points, q) {
    const sorted = sortByX(points);
    if (!sorted.length) return null;
    const index = Math.max(0, Math.min(sorted.length - 1, Math.round((sorted.length - 1) * q)));
    return sorted[index];
  }

  function pointNearX(points, targetX) {
    if (!points.length) return null;
    return points.reduce((best, point) => (
      Math.abs(point.x - targetX) < Math.abs(best.x - targetX) ? point : best
    ), points[0]);
  }

  function findPointByLabel(points, labels) {
    for (const label of labels) {
      const match = points.find((point) => String(point.label).toUpperCase().startsWith(String(label).toUpperCase()));
      if (match) return match;
    }
    return null;
  }

  function filterOutliers(points) {
    const sorted = sortByX(points);
    if (sorted.length < 5) return sorted;

    const ys = sorted.map((point) => point.y);
    const q1 = quantile(ys, 0.25);
    const q3 = quantile(ys, 0.75);
    const iqr = (q3 - q1) || 0;
    const lower = q1 - iqr * 1.5;
    const upper = q3 + iqr * 1.5;
    const filtered = sorted.filter((point) => point.y >= lower && point.y <= upper);

    return filtered.length >= 3 ? filtered : sorted;
  }

  function createTicks(min, max, count) {
    if (!Number.isFinite(min) || !Number.isFinite(max)) return [];
    if (Math.abs(max - min) < 1e-6) {
      min -= 1;
      max += 1;
    }
    const step = (max - min) / (count - 1);
    return Array.from({ length: count }, (_, index) => min + step * index);
  }

  function cumulativeMax(values) {
    const result = [];
    let current = -Infinity;
    for (const value of values) {
      current = Math.max(current, value);
      result.push(current);
    }
    return result;
  }

  function buildUpperAnchors(points, quantiles, mode = 'max') {
    const filtered = filterOutliers(points);
    if (filtered.length < 2) return filtered;
    const sorted = sortByX(filtered);
    const anchors = [];

    for (const q of quantiles) {
      const center = pointAt(sorted, q) || sorted[0];
      const span = Math.max(1, Math.round(sorted.length * 0.18));
      const centerIndex = sorted.indexOf(center);
      const slice = sorted.slice(
        Math.max(0, centerIndex - span),
        Math.min(sorted.length, centerIndex + span + 1)
      );
      const y = mode === 'median'
        ? median(slice.map((point) => point.y))
        : Math.max(...slice.map((point) => point.y));
      anchors.push({ x: center.x, y });
    }

    return sortByX(anchors);
  }

  function buildConcaveIncreaseGuide(points) {
    const filtered = filterOutliers(points);
    if (filtered.length < 2) return filtered;

    const sorted = sortByX(filtered);
    const upper = buildUpperAnchors(sorted, [0.18, 0.42, 0.7, 0.94], 'max');
    const rising = cumulativeMax(upper.map((point) => point.y));

    return [
      { x: upper[0].x, y: rising[0] },
      { x: upper[1].x, y: rising[1] },
      { x: upper[2].x, y: rising[2] },
      { x: upper[3].x, y: rising[3] },
    ];
  }

  function buildHumpGuide(points, options = {}) {
    const filtered = filterOutliers(points);
    if (filtered.length < 2) return filtered;

    const sorted = sortByX(filtered);
    const anchors = buildUpperAnchors(sorted, [0.16, 0.42, 0.74, 0.94], 'max');
    const peakPoint = sorted.reduce((best, point) => (point.y > best.y ? point : best), sorted[0]);
    const peakX = Math.max(anchors[1].x, Math.min(peakPoint.x, anchors[2].x));
    const tailMedian = median(sorted.slice(Math.max(0, sorted.length - 3)).map((point) => point.y));
    const endY = Math.max(
      tailMedian,
      anchors[3].y,
      peakPoint.y - (options.maxDrop || 0.6)
    );

    return [
      { x: anchors[0].x, y: anchors[0].y },
      { x: anchors[1].x, y: Math.max(anchors[1].y, anchors[0].y + (peakPoint.y - anchors[0].y) * 0.55) },
      { x: peakX, y: peakPoint.y },
      { x: anchors[3].x, y: endY },
    ];
  }

  function buildMedianTrendGuide(points) {
    const filtered = filterOutliers(points);
    if (filtered.length < 3) return sortByX(filtered);

    const sorted = sortByX(filtered);
    const anchors = buildUpperAnchors(sorted, [0.18, 0.4, 0.62, 0.84], 'median');
    if (anchors.length < 2) return sorted;

    const smoothedCore = anchors.map((anchor, index) => {
      const prev = anchors[Math.max(0, index - 1)];
      const next = anchors[Math.min(anchors.length - 1, index + 1)];
      return {
        x: anchor.x,
        y: median([prev.y, anchor.y, next.y]),
      };
    });

    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const firstCore = smoothedCore[0];
    const lastCore = smoothedCore[smoothedCore.length - 1];

    const guide = [
      { x: first.x, y: first.y },
      {
        x: firstCore.x,
        y: median([first.y, firstCore.y, smoothedCore[Math.min(1, smoothedCore.length - 1)].y]),
      },
      ...smoothedCore.slice(1, -1),
      {
        x: lastCore.x,
        y: median([smoothedCore[Math.max(0, smoothedCore.length - 2)].y, lastCore.y, last.y]),
      },
      { x: last.x, y: last.y },
    ];

    return sortByX(guide).filter((point, index, arr) => index === 0 || point.x > arr[index - 1].x);
  }

  function buildGuideFromLabels(points, labelGroups, fallbackBuilder) {
    const curated = labelGroups
      .map((group) => findPointByLabel(points, Array.isArray(group) ? group : [group]))
      .filter(Boolean);

    if (curated.length >= 3) return sortByX(curated);
    return fallbackBuilder(points);
  }

  function buildMonotonePath(points, scaleX, scaleY) {
    const sorted = sortByX(points);
    if (!sorted.length) return '';
    if (sorted.length === 1) {
      return `M ${scaleX(sorted[0].x)} ${scaleY(sorted[0].y)}`;
    }

    let path = `M ${scaleX(sorted[0].x)} ${scaleY(sorted[0].y)}`;
    for (let index = 0; index < sorted.length - 1; index += 1) {
      const current = sorted[index];
      const next = sorted[index + 1];
      const dx = next.x - current.x;
      const c1x = current.x + dx * 0.34;
      const c2x = current.x + dx * 0.66;
      path += ` C ${scaleX(c1x)} ${scaleY(current.y)}, ${scaleX(c2x)} ${scaleY(next.y)}, ${scaleX(next.x)} ${scaleY(next.y)}`;
    }
    return path;
  }

  function buildLegend(items) {
    if (!items?.length) return '';
    return `
      <div class="bdi-chart-legend">
        ${items.map((item) => `
          <span class="bdi-chart-legend-item">
            <span class="bdi-chart-legend-dot" style="background:${item.color}"></span>
            ${escapeHtml(item.label)}
          </span>
        `).join('')}
      </div>
    `;
  }

  function labelOffset(index, point) {
    const cycle = index % 4;
    if (cycle === 0) return { dx: 0, dy: -18 };
    if (cycle === 1) return { dx: 0, dy: 24 };
    if (cycle === 2) return { dx: 22, dy: -8 };
    return { dx: -22, dy: -8 };
  }

  function renderScatter(host, config) {
    if (!host) return;

    const series = (config.series || []).filter((item) => item.points?.length);
    const allPoints = series.flatMap((serie) => serie.points);
    if (!allPoints.length) {
      host.innerHTML = '<div class="bdi-chart-empty">No hay datos suficientes para graficar.</div>';
      return;
    }

    const width = 1320;
    const height = 620;
    const margin = { top: 12, right: 18, bottom: 72, left: 74 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const xs = allPoints.map((point) => point.x);
    const ys = allPoints.map((point) => point.y);
    let minX = Math.min(...xs);
    let maxX = Math.max(...xs);
    let minY = config.yDomain ? config.yDomain[0] : Math.min(...ys);
    let maxY = config.yDomain ? config.yDomain[1] : Math.max(...ys);

    const xPad = (maxX - minX) * 0.06 || 1;
    const yPad = config.yDomain ? 0 : ((maxY - minY) * 0.12 || 1);
    minX -= xPad;
    maxX += xPad;
    minY -= yPad;
    maxY += yPad;

    const scaleX = (value) => margin.left + ((value - minX) / (maxX - minX || 1)) * plotWidth;
    const scaleY = (value) => margin.top + plotHeight - ((value - minY) / (maxY - minY || 1)) * plotHeight;

    const xTicks = createTicks(minX, maxX, 5);
    const yTicks = createTicks(minY, maxY, 5);

    const gridLines = [
      ...xTicks.map((tick) => {
        const x = scaleX(tick);
        return `<line x1="${x}" y1="${margin.top}" x2="${x}" y2="${margin.top + plotHeight}" class="bdi-chart-grid" />`;
      }),
      ...yTicks.map((tick) => {
        const y = scaleY(tick);
        return `<line x1="${margin.left}" y1="${y}" x2="${margin.left + plotWidth}" y2="${y}" class="bdi-chart-grid" />`;
      }),
    ].join('');

    const xLabels = xTicks.map((tick) => {
      const x = scaleX(tick);
      return `<text x="${x}" y="${height - 38}" text-anchor="middle" class="bdi-chart-tick">${escapeHtml(config.xTickFormat(tick))}</text>`;
    }).join('');

    const yLabels = yTicks.map((tick) => {
      const y = scaleY(tick) + 5;
      return `<text x="${margin.left - 18}" y="${y}" text-anchor="end" class="bdi-chart-tick">${escapeHtml(config.yTickFormat(tick))}</text>`;
    }).join('');

    const curveMarkup = series.map((serie) => {
      const guidePoints = serie.guideBuilder(serie.points);
      const path = buildMonotonePath(guidePoints, scaleX, scaleY);
      return path ? `<path d="${path}" class="bdi-chart-curve" style="stroke:${serie.color}" />` : '';
    }).join('');

    const pointMarkup = allPoints.map((point, index) => {
      const cx = scaleX(point.x);
      const cy = scaleY(point.y);
      const offset = labelOffset(index, point);
      const labelX = Math.max(30, Math.min(width - 30, cx + offset.dx));
      const labelY = Math.max(24, Math.min(height - 90, cy + offset.dy));
      const valueText = `${formatNumber(point.y, 2)}%`;

      return `
        <g class="bdi-chart-point">
          <circle cx="${cx}" cy="${cy}" r="7" fill="${point.color}" class="bdi-chart-dot" />
          <text x="${labelX}" y="${labelY}" text-anchor="middle" class="bdi-chart-label">
            <tspan x="${labelX}" dy="0">${escapeHtml(point.label)}</tspan>
            <tspan x="${labelX}" dy="1.1em" class="bdi-chart-label-value">${escapeHtml(valueText)}</tspan>
          </text>
          <title>${escapeHtml(point.label)} - ${escapeHtml(valueText)}</title>
        </g>
      `;
    }).join('');

    host.innerHTML = `
      <div class="bdi-chart-shell">
        ${buildLegend(config.legend)}
        <svg viewBox="0 0 ${width} ${height}" class="bdi-chart-svg" aria-label="${escapeHtml(config.title)}">
          <rect x="${margin.left}" y="${margin.top}" width="${plotWidth}" height="${plotHeight}" class="bdi-chart-plot-bg"></rect>
          ${gridLines}
          <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="bdi-chart-axis" />
          <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="bdi-chart-axis" />
          ${curveMarkup}
          ${pointMarkup}
          ${xLabels}
          ${yLabels}
          <text x="${margin.left + plotWidth / 2}" y="${height - 8}" text-anchor="middle" class="bdi-chart-axis-label">${escapeHtml(config.xLabel)}</text>
          <text x="26" y="${margin.top + plotHeight / 2}" text-anchor="middle" class="bdi-chart-axis-label" transform="rotate(-90 26 ${margin.top + plotHeight / 2})">${escapeHtml(config.yLabel)}</text>
        </svg>
        ${config.caption ? `<p class="bdi-chart-caption">${escapeHtml(config.caption)}</p>` : ''}
      </div>
    `;
  }

  function renderLecapScatterBDI(items) {
    const host = ensureHost('#lecaps-chart-section .scatter-plot');
    const lecapPoints = items
      .filter((item) => !item.ticker.startsWith('T'))
      .map((item) => ({ x: item.dias / 365, y: item.tir, label: item.ticker, color: PALETTE.local }));
    const boncapPoints = items
      .filter((item) => item.ticker.startsWith('T'))
      .map((item) => ({ x: item.dias / 365, y: item.tir, label: item.ticker, color: PALETTE.accent }));

    renderScatter(host, {
      title: 'Curva de renta fija ARS',
      series: [
        {
          color: PALETTE.local,
          points: lecapPoints,
          guideBuilder: (points) => buildGuideFromLabels(
            points,
            ['S15Y6', 'S29Y6', 'S31L6', 'S30S6', 'S3006', 'S30N6'],
            buildConcaveIncreaseGuide
          ),
        },
        {
          color: PALETTE.accent,
          points: boncapPoints,
          guideBuilder: (points) => buildGuideFromLabels(
            points,
            ['T30J6', 'T15E7', 'T30A7', 'T31Y7', 'T30J7'],
            (series) => buildHumpGuide(series, { minPeakT: 0.5, maxPeakT: 0.78, maxDrop: 0.18 })
          ),
        },
      ],
      legend: [
        { label: 'LECAP', color: PALETTE.local },
        { label: 'BONCAP', color: PALETTE.accent },
      ],
      xLabel: 'Duration aproximada (anos)',
      yLabel: 'TIR (%)',
      yDomain: [26.4, 31.9],
      xTickFormat: (value) => formatNumber(value, 2),
      yTickFormat: (value) => `${formatNumber(value, 1)}%`,
      caption: 'Ticker y TIR actual de cada instrumento ultima cotizacion',
    });
  }

  function renderSoberanosCurveBDI(items) {
    const host = ensureHost('#soberanos-chart-section .scatter-plot');
    const lang = localStorage.getItem('bdi-language') || 'es';
    const localPoints = items
      .filter((item) => item.ley !== 'NY')
      .map((item) => ({ x: item.duration, y: item.ytm, label: item.symbol, color: PALETTE.local }));
    const nyPoints = items
      .filter((item) => item.ley === 'NY')
      .map((item) => ({ x: item.duration, y: item.ytm, label: item.symbol, color: PALETTE.ny }));

    renderScatter(host, {
      title: 'Curva soberana en USD',
      series: [
        {
          color: PALETTE.local,
          points: localPoints,
          guideBuilder: (points) => buildGuideFromLabels(
            points,
            ['AL29', 'AL30', 'AN29', 'AE38', 'AL35', 'AL41'],
            (series) => buildHumpGuide(series, { minPeakT: 0.48, maxPeakT: 0.78, maxDrop: 0.75 })
          ),
        },
        {
          color: PALETTE.ny,
          points: nyPoints,
          guideBuilder: (points) => buildGuideFromLabels(
            points,
            ['GD29', 'GD30', 'GD38', 'GD35', 'GD41'],
            (series) => buildHumpGuide(series, { minPeakT: 0.48, maxPeakT: 0.8, maxDrop: 0.48 })
          ),
        },
      ],
      legend: [
        { label: 'Ley local', color: PALETTE.local },
        { label: 'Ley NY', color: PALETTE.ny },
      ],
      xLabel: 'Duration (anos)',
      yLabel: 'TIR (%)',
      yDomain: [4.3, 11.2],
      xTickFormat: (value) => formatNumber(value, 1),
      yTickFormat: (value) => `${formatNumber(value, 1)}%`,
      caption: lang === 'en'
        ? 'Visual comparison between local-law and NY-law bonds to track curve shape and relative yield.'
        : 'Curva soberanos ultima cotizacion',
    });
  }

  function renderCERCurveBDI(items) {
    const host = ensureHost('#cer-chart-section .scatter-plot');
    const cerPoints = items.map((item) => ({ x: item.duration, y: item.ytm, label: item.symbol, color: PALETTE.cer }));

    renderScatter(host, {
      title: 'Curva CER',
      series: [
        {
          color: PALETTE.cer,
          points: cerPoints,
          guideBuilder: (points) => buildGuideFromLabels(
            points,
            ['TZX26', 'X30N6', 'TZX27', 'TZXD7', 'TZX28', 'DICP', 'PARP'],
            buildConcaveIncreaseGuide
          ),
        },
      ],
      xLabel: 'Duration (anos)',
      yLabel: 'TIR real (%)',
      yDomain: [-11.5, 25.5],
      xTickFormat: (value) => formatNumber(value, 1),
      yTickFormat: (value) => `${formatNumber(value, 1)}%`,
      caption: 'Curva Familia CER ultima cotizacion',
    });
  }

  function renderONsCurveBDI(items) {
    const host = ensureHost('#ons-chart-section .scatter-plot');
    const lang = localStorage.getItem('bdi-language') || 'es';
    const allItems = [...items]
      .filter((item) => Number.isFinite(item?.duration) && Number.isFinite(item?.ytm))
      .sort((a, b) => a.duration - b.duration);

    const onPoints = allItems.map((item) => ({
      x: item.duration,
      y: item.ytm,
      label: item.symbol || item.d912Ticker,
      color: PALETTE.accent,
    }));

    renderScatter(host, {
      title: 'Curva de corporativos en USD',
      series: [
        {
          color: PALETTE.accent,
          points: onPoints,
          guideBuilder: () => [],
        },
      ],
      xLabel: 'Duration (anos)',
      yLabel: 'TIR (%)',
      xTickFormat: (value) => formatNumber(value, 1),
      yTickFormat: (value) => `${formatNumber(value, 1)}%`,
      caption: lang === 'en'
        ? 'corporate issuers based on the same data visible in the table'
        : 'emisores corporativos sobre los mismos datos visibles en la tabla',
    });
  }

  window.renderLecapScatter = renderLecapScatterBDI;
  window.renderYieldCurve = renderSoberanosCurveBDI;
  window.renderCERCurve = renderCERCurveBDI;
  window.renderONsYieldCurve = renderONsCurveBDI;
})();
