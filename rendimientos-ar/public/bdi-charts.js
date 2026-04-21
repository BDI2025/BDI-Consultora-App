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

  function solveLinearSystem3x3(matrix, vector) {
    const a = matrix.map((row, index) => [...row, vector[index]]);
    const size = 3;

    for (let pivot = 0; pivot < size; pivot += 1) {
      let maxRow = pivot;
      for (let row = pivot + 1; row < size; row += 1) {
        if (Math.abs(a[row][pivot]) > Math.abs(a[maxRow][pivot])) maxRow = row;
      }
      if (Math.abs(a[maxRow][pivot]) < 1e-10) return null;
      if (maxRow !== pivot) {
        const temp = a[pivot];
        a[pivot] = a[maxRow];
        a[maxRow] = temp;
      }

      const pivotValue = a[pivot][pivot];
      for (let col = pivot; col <= size; col += 1) a[pivot][col] /= pivotValue;

      for (let row = 0; row < size; row += 1) {
        if (row === pivot) continue;
        const factor = a[row][pivot];
        for (let col = pivot; col <= size; col += 1) {
          a[row][col] -= factor * a[pivot][col];
        }
      }
    }

    return a.map((row) => row[size]);
  }

  function nelsonSiegelLoadings(x, tau) {
    const safeX = Math.max(x, 1e-6);
    const safeTau = Math.max(tau, 1e-6);
    const ratio = safeX / safeTau;
    const expTerm = Math.exp(-ratio);
    const l1 = (1 - expTerm) / ratio;
    const l2 = l1 - expTerm;
    return [1, l1, l2];
  }

  function fitNelsonSiegel(points) {
    const filtered = sortByX(points).filter((point) => Number.isFinite(point.x) && point.x > 0 && Number.isFinite(point.y));
    if (filtered.length < 4) return null;

    const minX = Math.min(...filtered.map((point) => point.x));
    const maxX = Math.max(...filtered.map((point) => point.x));
    const tauMin = Math.max(0.04, minX * 0.35);
    const tauMax = Math.max(tauMin + 0.08, maxX * 1.45);
    let best = null;

    for (let step = 0; step <= 180; step += 1) {
      const tau = tauMin + ((tauMax - tauMin) * step) / 180;
      const gram = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      const rhs = [0, 0, 0];

      filtered.forEach((point) => {
        const loading = nelsonSiegelLoadings(point.x, tau);
        for (let row = 0; row < 3; row += 1) {
          rhs[row] += loading[row] * point.y;
          for (let col = 0; col < 3; col += 1) {
            gram[row][col] += loading[row] * loading[col];
          }
        }
      });

      const betas = solveLinearSystem3x3(gram, rhs);
      if (!betas) continue;

      const sse = filtered.reduce((acc, point) => {
        const loading = nelsonSiegelLoadings(point.x, tau);
        const fitted = betas[0] * loading[0] + betas[1] * loading[1] + betas[2] * loading[2];
        return acc + (point.y - fitted) ** 2;
      }, 0);

      if (!best || sse < best.sse) {
        best = {
          tau,
          beta0: betas[0],
          beta1: betas[1],
          beta2: betas[2],
          sse,
        };
      }
    }

    if (!best) return null;

    const pointCount = 90;
    const curvePoints = Array.from({ length: pointCount }, (_, index) => {
      const x = minX + ((maxX - minX) * index) / (pointCount - 1);
      const loading = nelsonSiegelLoadings(x, best.tau);
      const y = best.beta0 * loading[0] + best.beta1 * loading[1] + best.beta2 * loading[2];
      return { x, y };
    });

    return {
      ...best,
      points: curvePoints,
    };
  }

  function fitPolynomialCurve(points, degree = 2, samples = 90) {
    const filtered = sortByX(points).filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
    if (filtered.length < degree + 1 || degree !== 2) return null;

    const xs = filtered.map((point) => point.x);
    const ys = filtered.map((point) => point.y);
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const vector = [0, 0, 0];

    for (let row = 0; row <= degree; row += 1) {
      for (let col = 0; col <= degree; col += 1) {
        matrix[row][col] = xs.reduce((sum, x) => sum + (x ** (row + col)), 0);
      }
      vector[row] = xs.reduce((sum, x, index) => sum + (ys[index] * (x ** row)), 0);
    }

    const coefficients = solveLinearSystem3x3(matrix, vector);
    if (!coefficients) return null;

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const curvePoints = Array.from({ length: samples }, (_, index) => {
      const x = minX + ((maxX - minX) * index) / (samples - 1);
      const y = coefficients.reduce((sum, coefficient, power) => sum + coefficient * (x ** power), 0);
      return { x, y };
    });

    return {
      degree,
      coefficients,
      points: curvePoints,
    };
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

  function estimateLabelBox(point, x, y, anchor = 'middle', options = {}) {
    const valueText = `${formatNumber(point.y, 2)}%`;
    const inlineText = options.inline ? `${point.label}; ${valueText}` : null;
    const labelWidth = Math.max(36, String(point.label || '').length * 7.1);
    const valueWidth = Math.max(34, valueText.length * 6.2);
    const inlineWidth = inlineText ? Math.max(46, inlineText.length * 6.6) : 0;
    const boxWidth = Math.max(labelWidth, valueWidth, inlineWidth) + 10;
    const boxHeight = options.inline ? 16 : 30;
    const left = anchor === 'start'
      ? x - 2
      : anchor === 'end'
        ? x - boxWidth + 2
        : x - boxWidth / 2;
    return {
      left,
      right: left + boxWidth,
      top: y - 12,
      bottom: y + boxHeight,
    };
  }

  function overlaps(boxA, boxB) {
    return !(
      boxA.right < boxB.left ||
      boxA.left > boxB.right ||
      boxA.bottom < boxB.top ||
      boxA.top > boxB.bottom
    );
  }

  function countNearbyPoints(points, index, scaleX, scaleY, radiusX = 70, radiusY = 44) {
    const current = points[index];
    const cx = scaleX(current.x);
    const cy = scaleY(current.y);
    let count = 0;

    points.forEach((point, pointIndex) => {
      if (pointIndex === index) return;
      const dx = Math.abs(scaleX(point.x) - cx);
      const dy = Math.abs(scaleY(point.y) - cy);
      if (dx <= radiusX && dy <= radiusY) count += 1;
    });

    return count;
  }

  function buildAutoLabelPlacements(points, scaleX, scaleY, width, height, margin, options = {}) {
    const occupied = [];
    const placements = [];
    const plotLeft = margin.left + 8;
    const plotRight = width - margin.right - 8;
    const plotTop = margin.top + 8;
    const plotBottom = height - margin.bottom - 24;
    const repelRadius = Number.isFinite(options.pointRepelRadius) ? options.pointRepelRadius : 11;
    const sorted = points
      .map((point, index) => ({ point, index }))
      .sort((a, b) => a.point.x - b.point.x || a.point.y - b.point.y);

    sorted.forEach(({ point, index }, sortedIndex) => {
      const cx = scaleX(point.x);
      const cy = scaleY(point.y);
      const preferred = [
        { dx: 0, dy: -18, anchor: 'middle' },
        { dx: 0, dy: 24, anchor: 'middle' },
        { dx: 14, dy: -8, anchor: 'start' },
        { dx: -14, dy: -8, anchor: 'end' },
        { dx: 16, dy: 16, anchor: 'start' },
        { dx: -16, dy: 16, anchor: 'end' },
        { dx: 26, dy: -4, anchor: 'start' },
        { dx: -26, dy: -4, anchor: 'end' },
        { dx: 22, dy: 24, anchor: 'start' },
        { dx: -22, dy: 24, anchor: 'end' },
      ];

      if (sortedIndex === 0) {
        preferred.unshift({ dx: 10, dy: -8, anchor: 'start' });
      } else if (sortedIndex === sorted.length - 1) {
        preferred.unshift({ dx: -10, dy: -8, anchor: 'end' });
      }

      let best = null;
      preferred.forEach((candidate, candidateIndex) => {
        const x = cx + candidate.dx;
        const y = cy + candidate.dy;
        const box = estimateLabelBox(point, x, y, candidate.anchor, { inline: options.inlineLabels });
        let penalty = candidateIndex * 4;

        if (box.left < plotLeft) penalty += (plotLeft - box.left) * 5;
        if (box.right > plotRight) penalty += (box.right - plotRight) * 5;
        if (box.top < plotTop) penalty += (plotTop - box.top) * 5;
        if (box.bottom > plotBottom) penalty += (box.bottom - plotBottom) * 5;

        occupied.forEach((otherBox) => {
          if (overlaps(box, otherBox)) penalty += 120;
        });

        points.forEach((otherPoint, otherIndex) => {
          const otherCx = scaleX(otherPoint.x);
          const otherCy = scaleY(otherPoint.y);
          const circleBox = {
            left: otherCx - repelRadius,
            right: otherCx + repelRadius,
            top: otherCy - repelRadius,
            bottom: otherCy + repelRadius,
          };
          if (overlaps(box, circleBox)) {
            penalty += otherIndex === index ? 40 : 85;
          }
        });

        if (!best || penalty < best.penalty) {
          best = { ...candidate, penalty, box };
        }
      });

      const resolved = best || { dx: 0, dy: -18, anchor: 'middle', box: estimateLabelBox(point, cx, cy - 18, 'middle', { inline: options.inlineLabels }) };
      occupied.push(resolved.box);
      placements[index] = resolved;
    });

    return placements;
  }

  function getDynamicXDomain(points, fallbackMin, fallbackMax, options = {}) {
    const values = points.map((point) => point.x).filter((value) => Number.isFinite(value));
    const minValue = values.length ? Math.min(...values) : fallbackMin;
    const maxValue = values.length ? Math.max(...values) : fallbackMax;
    const ratio = Number.isFinite(options.padRatio) ? options.padRatio : 0.05;
    const minPad = Number.isFinite(options.minPad) ? options.minPad : 0.05;
    const pad = Math.max((maxValue - minValue) * ratio, minPad);
    return [Math.max(0, minValue - pad), maxValue + pad];
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
    let minX = config.xDomain ? config.xDomain[0] : Math.min(...xs);
    let maxX = config.xDomain ? config.xDomain[1] : Math.max(...xs);
    let minY = config.yDomain ? config.yDomain[0] : Math.min(...ys);
    let maxY = config.yDomain ? config.yDomain[1] : Math.max(...ys);

    const xPad = config.xDomain ? 0 : ((maxX - minX) * 0.06 || 1);
    const yPad = config.yDomain ? 0 : ((maxY - minY) * 0.12 || 1);
    minX -= xPad;
    maxX += xPad;
    minY -= yPad;
    maxY += yPad;

    const scaleX = (value) => margin.left + ((value - minX) / (maxX - minX || 1)) * plotWidth;
    const scaleY = (value) => margin.top + plotHeight - ((value - minY) / (maxY - minY || 1)) * plotHeight;

    const xTicks = createTicks(minX, maxX, config.xTickCount || 5);
    const yTicks = createTicks(minY, maxY, config.yTickCount || 5);

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

    const curveMarkup = config.showCurve
      ? series.map((serie) => {
          const guidePoints = typeof serie.guideBuilder === 'function' ? serie.guideBuilder(serie.points) : [];
          const path = buildMonotonePath(guidePoints, scaleX, scaleY);
          if (!path) return '';
          return `<path d="${path}" class="bdi-chart-curve ${config.curveClass || ''}" style="stroke:${config.curveColor || serie.color}" />`;
        }).join('')
      : '';
    const extraCurveMarkup = (config.extraCurves || []).map((curve) => {
      const path = buildMonotonePath(curve.points || [], scaleX, scaleY);
      if (!path) return '';
      return `<path d="${path}" class="bdi-chart-curve ${curve.className || ''}" style="stroke:${curve.color || PALETTE.local}" />`;
    }).join('');

    const autoPlacements = buildAutoLabelPlacements(
      allPoints,
      scaleX,
      scaleY,
      width,
      height,
      margin,
      { pointRepelRadius: config.pointRepelRadius, inlineLabels: config.inlineLabels }
    );
    const compactThreshold = Number.isFinite(config.compactThreshold) ? config.compactThreshold : 2;
    const ultraCompactThreshold = Number.isFinite(config.ultraCompactThreshold) ? config.ultraCompactThreshold : 4;
    const pointRadius = Number.isFinite(config.pointRadius) ? config.pointRadius : 7;

    const pointMarkup = allPoints.map((point, index) => {
      const cx = scaleX(point.x);
      const cy = scaleY(point.y);
      const offset = autoPlacements[index] || (typeof config.labelOffset === 'function'
        ? config.labelOffset(point, index, allPoints)
        : labelOffset(index, point));
      const textAnchor = offset.anchor || 'middle';
      const labelX = Math.max(36, Math.min(width - 36, cx + offset.dx));
      const labelY = Math.max(24, Math.min(height - 90, cy + offset.dy));
      const valueText = `${formatNumber(point.y, 2)}%`;
      const nearbyCount = countNearbyPoints(allPoints, index, scaleX, scaleY);
      const compact = nearbyCount >= compactThreshold;
      const ultraCompact = nearbyCount >= ultraCompactThreshold;
      const showValue = typeof config.showValue === 'function'
        ? config.showValue(point, nearbyCount, allPoints)
        : !ultraCompact;
      const labelClass = [
        'bdi-chart-label',
        compact ? 'compact' : '',
        ultraCompact ? 'ultra-compact' : '',
        config.inlineLabels ? 'inline' : '',
        config.labelClass || '',
      ].filter(Boolean).join(' ');
      const callout = config.showCallout && (Math.abs(offset.dx) > 8 || Math.abs(offset.dy) > 12)
        ? `<line x1="${cx}" y1="${cy}" x2="${labelX}" y2="${labelY - 6}" class="bdi-chart-callout" />`
        : '';
      const inlineText = `${point.label}; ${valueText}`;

      return `
        <g class="bdi-chart-point">
          ${callout}
          <circle cx="${cx}" cy="${cy}" r="${pointRadius}" fill="${point.color}" class="bdi-chart-dot" />
          <text x="${labelX}" y="${labelY}" text-anchor="${textAnchor}" class="${labelClass}">
            ${config.inlineLabels
              ? `<tspan x="${labelX}" dy="0">${escapeHtml(showValue ? inlineText : point.label)}</tspan>`
              : `<tspan x="${labelX}" dy="0">${escapeHtml(point.label)}</tspan>${showValue ? `<tspan x="${labelX}" dy="${compact ? '1.0em' : '1.1em'}" class="bdi-chart-label-value">${escapeHtml(valueText)}</tspan>` : ''}`}
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
          ${extraCurveMarkup}
          ${pointMarkup}
          ${xLabels}
          ${yLabels}
          <text x="${margin.left + plotWidth / 2}" y="${height - 8}" text-anchor="middle" class="bdi-chart-axis-label">${escapeHtml(config.xLabel)}</text>
          <text x="26" y="${margin.top + plotHeight / 2}" text-anchor="middle" class="bdi-chart-axis-label" transform="rotate(-90 26 ${margin.top + plotHeight / 2})">${escapeHtml(config.yLabel)}</text>
        </svg>
        ${config.caption ? `<p class="bdi-chart-caption">${escapeHtml(config.caption)}</p>` : ''}
        ${config.metaHtml ? `<div class="bdi-chart-meta">${config.metaHtml}</div>` : ''}
      </div>
    `;
  }

  function getDynamicYDomain(points, fallbackMin, fallbackMax, options = {}) {
    const values = points.map((point) => point.y).filter((value) => Number.isFinite(value));
    const minValue = values.length ? Math.min(...values) : fallbackMin;
    const maxValue = values.length ? Math.max(...values) : fallbackMax;
    const ratio = Number.isFinite(options.padRatio) ? options.padRatio : 0.14;
    const minPad = Number.isFinite(options.minPad) ? options.minPad : 0.35;
    const floor = Number.isFinite(options.floor) ? options.floor : null;
    const ceil = Number.isFinite(options.ceil) ? options.ceil : null;
    const pad = Math.max((maxValue - minValue) * ratio, minPad);
    let domainMin = minValue - pad;
    let domainMax = maxValue + pad;
    if (floor != null) domainMin = Math.max(floor, domainMin);
    if (ceil != null) domainMax = Math.min(ceil, domainMax);
    return [domainMin, domainMax];
  }

  function renderLecapScatterBDI(items) {
    const host = ensureHost('#lecaps-chart-section .scatter-plot');
    const lecapPoints = items
      .filter((item) => !item.ticker.startsWith('T'))
      .map((item) => ({ x: item.dias / 365, y: item.tir, label: item.ticker, color: PALETTE.local }));
    const boncapPoints = items
      .filter((item) => item.ticker.startsWith('T'))
      .map((item) => ({ x: item.dias / 365, y: item.tir, label: item.ticker, color: PALETTE.accent }));
    const polynomialFit = fitPolynomialCurve([...lecapPoints, ...boncapPoints], 2, 120);
    const lecapYDomain = getDynamicYDomain([...lecapPoints, ...boncapPoints], 26.4, 31.9, { minPad: 0.3, padRatio: 0.12 });
    const lecapXDomain = getDynamicXDomain([...lecapPoints, ...boncapPoints], 0, 1.2, { padRatio: 0.06, minPad: 0.025 });

    renderScatter(host, {
      title: 'Curva de renta fija ARS',
      series: [
        {
          color: PALETTE.local,
          points: lecapPoints,
        },
        {
          color: PALETTE.accent,
          points: boncapPoints,
        },
      ],
      extraCurves: polynomialFit ? [
        {
          points: polynomialFit.points,
          color: '#ff9500',
          className: 'polynomial-curve',
        },
      ] : [],
      legend: [
        { label: 'LECAP', color: PALETTE.local },
        { label: 'BONCAP', color: PALETTE.accent },
        ...(polynomialFit ? [{ label: 'Regresión polinómica', color: '#ff9500' }] : []),
      ],
      xLabel: 'Duration aproximada (a\u00f1os)',
      yLabel: 'TIR (%)',
      xDomain: lecapXDomain,
      yDomain: lecapYDomain,
      xTickCount: 4,
      yTickCount: 4,
      xTickFormat: (value) => formatNumber(value, 2),
      yTickFormat: (value) => `${formatNumber(value, 1)}%`,
      caption: 'Ticker y TIR actual de cada instrumento ultima cotizacion',
      metaHtml: polynomialFit ? `
        <div class="bdi-chart-parameter-panel">
          <div class="bdi-chart-parameter-head">
            <span class="bdi-chart-parameter-title">Ajuste polinómico</span>
            <span class="bdi-chart-parameter-model">Grado 2</span>
          </div>
          <div class="bdi-chart-parameter-grid">
            <div>
              <span>Nivel base estimado</span>
              <strong>${escapeHtml(formatNumber(polynomialFit.coefficients[0], 3))}</strong>
            </div>
            <div>
              <span>Pendiente inicial</span>
              <strong>${escapeHtml(formatNumber(polynomialFit.coefficients[1], 3))}</strong>
            </div>
            <div>
              <span>Curvatura</span>
              <strong>${escapeHtml(formatNumber(polynomialFit.coefficients[2], 3))}</strong>
            </div>
          </div>
        </div>
        <div class="bdi-chart-parameter-notes">
          <div class="bdi-chart-parameter-note">
            <strong>Lo que se observa en la curva</strong>
            <span>El nivel base estimado para durations cortas es ${escapeHtml(formatNumber(polynomialFit.coefficients[0], 2))}, lo que da una referencia inicial del tramo más cercano.</span>
          </div>
          <div class="bdi-chart-parameter-note">
            <strong>Cómo arranca la pendiente</strong>
            <span>La pendiente inicial estimada es ${escapeHtml(formatNumber(polynomialFit.coefficients[1], 2))}, útil para ver si la curva comienza empinándose o más estable.</span>
          </div>
          <div class="bdi-chart-parameter-note">
            <strong>Qué tan curva se vuelve</strong>
            <span>La curvatura estimada es ${escapeHtml(formatNumber(polynomialFit.coefficients[2], 2))}, y ayuda a leer si el trazado se acelera, se aplana o cambia de forma al alargar duration.</span>
          </div>
        </div>
      ` : '',
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
    const localPolynomialFit = fitPolynomialCurve(localPoints, 2, 120);
    const nyPolynomialFit = fitPolynomialCurve(nyPoints, 2, 120);
    const soberanosYDomain = getDynamicYDomain([...localPoints, ...nyPoints], 4.3, 11.2, { minPad: 0.45, padRatio: 0.16, floor: 0 });
    const soberanosXDomain = getDynamicXDomain([...localPoints, ...nyPoints], 0, 7, { padRatio: 0.06, minPad: 0.08 });

    renderScatter(host, {
      title: 'Curva soberana en USD',
      series: [
        {
          color: PALETTE.local,
          points: localPoints,
        },
        {
          color: PALETTE.ny,
          points: nyPoints,
        },
      ],
      extraCurves: [
        ...(localPolynomialFit ? [{
          points: localPolynomialFit.points,
          color: PALETTE.local,
          className: 'polynomial-curve',
        }] : []),
        ...(nyPolynomialFit ? [{
          points: nyPolynomialFit.points,
          color: PALETTE.ny,
          className: 'polynomial-curve',
        }] : []),
      ],
      legend: [
        { label: 'Ley local', color: PALETTE.local },
        { label: 'Ley NY', color: PALETTE.ny },
        ...(localPolynomialFit ? [{ label: 'Ajuste ley local', color: PALETTE.local }] : []),
        ...(nyPolynomialFit ? [{ label: 'Ajuste ley NY', color: PALETTE.ny }] : []),
      ],
      xLabel: 'Duration (a\u00f1os)',
      yLabel: 'TIR (%)',
      xDomain: soberanosXDomain,
      yDomain: soberanosYDomain,
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
    const cerPolynomialFit = fitPolynomialCurve(cerPoints, 2, 120);
    const cerYDomain = getDynamicYDomain(cerPoints, -11.5, 25.5, { minPad: 0.6, padRatio: 0.14 });
    const cerXDomain = getDynamicXDomain(cerPoints, 0, 7, { padRatio: 0.06, minPad: 0.08 });

    renderScatter(host, {
      title: 'Curva CER',
      series: [
        {
          color: PALETTE.cer,
          points: cerPoints,
        },
      ],
      extraCurves: cerPolynomialFit ? [
        {
          points: cerPolynomialFit.points,
          color: '#ff9500',
          className: 'polynomial-curve cer-curve',
        },
      ] : [],
      legend: [
        { label: 'CER', color: PALETTE.cer },
        ...(cerPolynomialFit ? [{ label: 'Ajuste polinómico', color: '#ff9500' }] : []),
      ],
      xLabel: 'Duration (a\u00f1os)',
      yLabel: 'TIR real (%)',
      xDomain: cerXDomain,
      yDomain: cerYDomain,
      xTickCount: 4,
      yTickCount: 6,
      xTickFormat: (value) => formatNumber(value, 1),
      yTickFormat: (value) => `${formatNumber(value, 1)}%`,
      compactThreshold: 1,
      ultraCompactThreshold: 2,
      pointRadius: 6.5,
      pointRepelRadius: 14,
      showCallout: true,
      inlineLabels: true,
      labelClass: 'cer-label',
      showValue: (point, nearbyCount) => nearbyCount === 0,
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
    const onsYDomain = getDynamicYDomain(onPoints, 0, 20, { minPad: 0.4, padRatio: 0.12, floor: 0 });
    const onsXDomain = getDynamicXDomain(onPoints, 0, 10, { padRatio: 0.06, minPad: 0.08 });

    renderScatter(host, {
      title: 'Curva de corporativos en USD',
      series: [
        {
          color: PALETTE.accent,
          points: onPoints,
        },
      ],
      extraCurves: onPoints.length >= 3 ? [
        {
          points: fitPolynomialCurve(onPoints, 2, 120)?.points || [],
          color: '#ff9500',
          className: 'polynomial-curve',
        },
      ].filter((curve) => curve.points.length) : [],
      legend: [
        { label: lang === 'en' ? 'Corporate bonds' : 'Corporativos', color: PALETTE.accent },
        ...(onPoints.length >= 3 ? [{ label: lang === 'en' ? 'Polynomial fit' : 'Ajuste polinómico', color: '#ff9500' }] : []),
      ],
      xLabel: 'Duration (a\u00f1os)',
      yLabel: 'TIR (%)',
      xDomain: onsXDomain,
      yDomain: onsYDomain,
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
