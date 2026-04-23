// ─── Supabase Auth ───
let supabaseClient = null;
let currentUser = null;
let _portfolioConfig = null; // cached config for portfolio use
const LANGUAGE_STORAGE_KEY = 'bdi-language';
let currentLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'es';

const UI_TEXT = {
  es: {
    loading_yields: 'Cargando rendimientos...',
    no_data: 'No se pudieron cargar los datos.',
    loading_rates: 'Cargando tasas...',
    rates_error: 'Error al cargar datos de plazos fijos.',
    hot_movers_loading: 'Cargando movers...',
    hot_movers_empty: 'Sin datos de movers disponibles.',
    hot_movers_error: 'Error al cargar movers.',
    official_dollar: 'Dólar Oficial',
    ccl_dollar: 'Contado con Liqui',
    mep_dollar: 'Dólar MEP',
    country_risk: 'Riesgo País',
    ars_hero_title: 'Liquidez',
    ars_hero_desc: 'Compará tasas bancarias y alternativas de corto plazo en pesos para una lectura rápida de liquidez.',
    time_deposit_title: 'Plazo fijo',
    time_deposit_desc: 'Compará tasas de plazo fijo de bancos argentinos. Datos provistos por el BCRA.',
    lecaps_title: 'LECAPs y BONCAPs',
    lecaps_hero_desc: 'Rendimiento implícito de letras y bonos capitalizables del Tesoro según precio de mercado.',
    cer_title: 'Bonos CER',
    cer_hero_desc: 'Instrumentos ajustados por inflación para analizar cobertura, duration y rendimiento real.',
    ons_title: 'Corporativos en USD',
    ons_hero_desc: 'Rendimiento de bonos corporativos en USD. Hacé click en cualquier ON para abrir la calculadora.',
    world_error: 'Error al cargar datos globales.',
    world_detail_loading: 'Cargando...',
    world_detail_error: 'Error al cargar datos.',
    lecaps_error: 'Error al cargar datos de LECAPs.',
    lecaps_calc_hint: 'Click en cualquier LECAP para abrir la calculadora',
    settlement_note: 'Liquidación T+1: {date}. Los días al vencimiento se calculan desde la fecha de liquidación.',
    live_prices_source: 'Fuente: data912 para precios live + config interna para flujos y vencimientos.',
    no_live_prices_source: 'Fuente: config interna. No se pudieron traer precios live de data912.',
    lecap_col_price: 'Precio',
    lecap_col_final_payment: 'Pago Final',
    lecap_col_days: 'Días',
    lecap_col_maturity: 'Vencimiento',
    lecap_curve_label: 'Curva',
    lecap_label: 'LECAP',
    boncap_label: 'BONCAP',
    lecap_tooltip: '{ticker}: TIR {tir}% - {days} días',
    lecap_x_title: 'Días al vencimiento',
    lecap_y_title: 'TIR (%)',
    cer_loading: 'Cargando bonos CER...',
    cer_empty: 'No se pudieron cargar los datos de bonos CER.',
    cer_error: 'Error al cargar datos de bonos CER.',
    cer_source: 'Fuente: BCRA para CER + data912 para precios + config interna para flujos.',
    cer_calc_hint: 'Click en un bono para abrir la calculadora',
    cer_note: 'TIR Real calculada con flujos ajustados por CER. Duration en años (Macaulay) y Duration Mod. = Duration / (1 + tasa).',
    cer_col_price: 'PRECIO (AR$)',
    cer_col_maturity: 'VENCIMIENTO',
    cer_col_real_ytm: 'TIR REAL',
    ons_loading: 'Cargando ONs...',
    ons_empty: 'No hay cotizaciones disponibles para el monitor BDI de ONs.',
    ons_source_short: 'Fuente: data912 para precios corporativos y /api/cotizaciones para MEP.',
    ons_source_full: 'Fuente: data912 para precios corporativos, monitor BDI para cashflows técnicos y /api/cotizaciones para dólar MEP.',
    ons_error: 'Error cargando ONs: {message}',
    optimizer_empty_tickers: 'Ingresá al menos un ticker para correr la optimización.',
    optimizer_invalid_min_weight: 'El peso mínimo es demasiado alto para la cantidad de activos seleccionados.',
    optimizer_loading: 'Descargando históricos para {count} activos...',
    optimizer_no_histories: 'No se encontraron históricos comparables para los tickers ingresados.',
    optimizer_error: 'No se pudo correr el optimizador: {message}',
    optimizer_source: 'Fuente: Yahoo Finance vía API interna. {assets} activos, {days} ruedas comparables, período {years}y.',
    optimizer_summary_assets: 'Activos comparables',
    optimizer_summary_max_sharpe: 'Máx Sharpe',
    optimizer_summary_min_vol: 'Mín. volatilidad',
    optimizer_summary_rf: 'Tasa libre de riesgo',
    optimizer_summary_no_target: 'Sin retorno objetivo cargado',
    optimizer_target: 'Objetivo {value}',
    optimizer_weights_asset: 'Activo',
    optimizer_frontier_title: 'Espacio de portfolios',
    optimizer_frontier_desc: 'Mapa riesgo-retorno con portfolios aleatorios, frontera eficiente y cartera de mercado implícita.',
    optimizer_frontier_empty: 'Corré una optimización para ver el mapa riesgo-retorno.',
    optimizer_frontier_random: 'Portfolios aleatorios',
    optimizer_frontier_line: 'Frontera eficiente',
    optimizer_frontier_cml: 'CML',
    optimizer_frontier_min_vol: 'Mín. Volatilidad',
    optimizer_frontier_vol_axis: 'Volatilidad anual (%)',
    optimizer_frontier_ret_axis: 'Rendimiento anual (%)',
    optimizer_sharpe_ratio: 'Sharpe Ratio',
    optimizer_assets_title: 'Activos',
    optimizer_assets_subtitle: 'Top movers resaltados; resto del universo en segundo plano.',
    optimizer_assets_rest: 'Resto del universo',
    optimizer_portfolios_title: 'Portfolios óptimos',
    optimizer_portfolios_subtitle: 'Comparación directa entre carteras optimizadas.',
    optimizer_performance_empty: 'Corré una optimización para ver la evolución acumulada de activos y portfolios.',
    optimizer_growth_axis: 'Crecimiento acumulado (%)',
    optimizer_cagr_asset_portfolio: 'Activo / Portfolio',
    optimizer_cagr_type: 'Tipo',
    optimizer_cagr_annual: 'CAGR anual',
    optimizer_type_asset: 'Activo',
    optimizer_type_portfolio: 'Portfolio',
    optimizer_corr_title: 'Matriz de correlación entre activos',
    optimizer_ticker: 'Ticker',
    optimizer_correlation: 'Correlación',
    heatmap_title: 'Heatmap',
    heatmap_hero_desc: 'Un heatmap ordena los activos por tamaño relativo y los colorea según su variación para ofrecer una lectura rápida del mercado.',
    heatmap_loading: 'Cargando heatmap...',
    heatmap_empty: 'No se pudieron cargar datos para el heatmap.',
    heatmap_error: 'Error al cargar heatmap: {message}',
    heatmap_refresh: 'Aplicar',
    heatmap_market_label: 'Universo',
    heatmap_market_usa: 'USA',
    heatmap_market_argentina_ars: 'Argentina ARS',
    heatmap_market_argentina_usd: 'Argentina USD',
    heatmap_start_label: 'Inicio',
    heatmap_end_label: 'Fin',
    heatmap_now: 'Hasta hoy',
    heatmap_period_hint: 'Por defecto se muestra la última rueda disponible frente a la rueda previa.',
    heatmap_source: 'Datos de mercado provistos por Yahoo Finance. El tamaño relativo acompaña la capitalización de cada compañía.',
    heatmap_source_polygon: 'Fuente: Polygon para precio, variación diaria y referencia corporativa. Tamaño relativo usando market cap real cuando el proveedor lo devuelve.',
    heatmap_source_polygon_reference: 'Fuente: Polygon para market cap y referencia corporativa, con precio y variación diaria desde Yahoo Finance. Mejora el realismo del tamaño relativo del mapa.',
    heatmap_source_yahoo: 'Datos de mercado provistos por Yahoo Finance. El tamaño relativo acompaña la capitalización de cada compañía.',
  heatmap_source_argentina_ars: 'Fuente: data912 para precios y variaciones de acciones argentinas en ARS. El tamaño relativo se mantiene con el mismo proxy visual de monto operado.',
  heatmap_source_argentina_usd: 'Fuente: data912 para acciones argentinas en USD. En este universo, por ahora solo se muestra la variacion diaria y el mismo proxy visual de monto operado.',
    heatmap_legend_negative: 'Caída',
    heatmap_legend_flat: 'Neutral',
    heatmap_legend_positive: 'Suba',
    compound_title: 'Calculadora de interés compuesto',
    compound_hero_desc: 'Simulá aportes, capitalización y sensibilidad de tasas para proyectar crecimiento del capital.',
    compound_status_ready: 'Ingresá los supuestos y corré la simulación para comparar escenarios.',
    compound_status_invalid: 'Revisá los valores ingresados. El plazo debe ser mayor a cero y la frecuencia de capitalización también.',
    compound_chart_empty: 'Corré la calculadora para ver el gráfico comparativo.',
    compound_chart_title: 'Comparación de trayectorias',
    compound_chart_desc: 'Evolución del capital sin invertir versus escenarios con interés compuesto a lo largo del tiempo.',
    compound_breakdown_title: 'Desglose final',
    compound_breakdown_desc: 'Comparación de aporte total, capital final, interés ganado y sensibilidad por tasa.',
    compound_summary_contributed: 'Capital aportado',
    compound_summary_without: 'Sin invertir',
    compound_summary_base: 'Escenario base',
    compound_summary_range: 'Rango final',
    compound_summary_interest: 'Interés ganado',
    compound_low: 'Tasa baja',
    compound_high: 'Tasa alta',
    compound_base: 'Tasa base',
    compound_table_scenario: 'Escenario',
    compound_table_rate: 'Tasa anual',
    compound_table_final: 'Capital final',
    compound_table_interest: 'Interés ganado',
    compound_table_vs_cash: 'Dif. vs sin invertir',
    compound_axis_year: 'A\u00f1os',
    compound_axis_value: 'Valor acumulado',
    compound_chart_cash: 'Sin invertir',
    compound_chart_invested: 'Invertido',
    compound_chart_band: 'Rango de tasas',
    compound_frequency_label: 'Frecuencia de capitalización',
    compound_frequency_1: 'Anual',
    compound_frequency_2: 'Semestral',
    compound_frequency_4: 'Trimestral',
    compound_frequency_12: 'Mensual',
    compound_frequency_24: 'Quincenal',
    compound_frequency_52: 'Semanal',
    compound_frequency_365: 'Diaria',
    compound_step_1: 'Paso 1',
    compound_step_2: 'Paso 2',
    compound_step_3: 'Paso 3',
    compound_step_4: 'Paso 4',
    compound_step_1_title: 'Inversión inicial',
    compound_step_2_title: 'Contribución',
    compound_step_3_title: 'Tasa de interés',
    compound_step_4_title: 'Capitalización',
    compound_step_1_copy: 'Monto de dinero que tiene disponible para invertir inicialmente.',
    compound_step_2_copy: 'Monto que tiene previsto agregar al capital cada mes, o un número negativo para el monto que tiene previsto extraer cada mes.',
    compound_step_3_copy: 'Definí la tasa anual estimada y el rango de varianza para evaluar escenarios alrededor del caso base.',
    compound_step_4_copy: 'Cantidad de veces por año que se capitalizará el interés.',
    compound_initial_label: 'Inversión inicial',
    compound_contribution_label: 'Contribución mensual',
    compound_years_label: 'Cantidad de tiempo en años',
    compound_rate_label: 'Tasa de interés estimada (%)',
    compound_variance_label: 'Rango de varianza de las tasas (%)',
    wallet: 'Billetera',
    limit_prefix: 'Limite',
    no_limit: 'Sin Limites',
    assets: 'Patrimonio',
    rate_label: 'TNA',
    valid_since: 'TNA vigente desde el {date}',
    between_dates: 'Entre {from} y {to}',
    modified_duration: 'Duration mod.',
    unavailable: 'n/d',
    logout: 'Salir',
  },
  en: {
    loading_yields: 'Loading yields...',
    no_data: 'Data could not be loaded.',
    wallet: 'Wallet',
    limit_prefix: 'Limit',
    no_limit: 'No limit',
    assets: 'AUM',
    rate_label: 'APR',
    valid_since: 'APR effective since {date}',
    between_dates: 'Between {from} and {to}',
    modified_duration: 'Mod. duration',
    unavailable: 'n/a',
    logout: 'Sign out',
    loading_rates: 'Loading rates...',
    rates_error: 'Error loading time deposit data.',
    hot_movers_loading: 'Loading movers...',
    hot_movers_empty: 'No mover data available.',
    hot_movers_error: 'Error loading movers.',
    official_dollar: 'Official dollar',
    ccl_dollar: 'Cash-settled with liquidation',
    mep_dollar: 'MEP dollar',
    country_risk: 'Country risk',
    ars_hero_title: 'Liquidity',
    ars_hero_desc: 'Compare bank rates and short-term peso alternatives for a quick liquidity read.',
    time_deposit_title: 'Time deposit',
    time_deposit_desc: 'Compare time deposit rates from Argentine banks. Data provided by the BCRA.',
    lecaps_title: 'LECAPs and BONCAPs',
    lecaps_hero_desc: 'Implied yield on Treasury bills and capitalizing peso bonds based on market pricing.',
    cer_title: 'CER bonds',
    cer_hero_desc: 'Inflation-linked instruments to analyze hedge value, duration and real yield.',
    ons_title: 'USD corporates',
    ons_hero_desc: 'USD corporate bond yields. Click any bond to open the calculator.',
    world_error: 'Error loading global data.',
    world_detail_loading: 'Loading...',
    world_detail_error: 'Error loading data.',
    lecaps_error: 'Error loading LECAP data.',
    lecaps_calc_hint: 'Click any LECAP to open the calculator',
    settlement_note: 'T+1 settlement: {date}. Days to maturity are calculated from the settlement date.',
    live_prices_source: 'Source: data912 live prices + internal config for cash flows and maturities.',
    no_live_prices_source: 'Source: internal config. Live prices from data912 could not be retrieved.',
    lecap_col_price: 'Price',
    lecap_col_final_payment: 'Final payment',
    lecap_col_days: 'Days',
    lecap_col_maturity: 'Maturity',
    lecap_curve_label: 'Curve',
    lecap_label: 'LECAP',
    boncap_label: 'BONCAP',
    lecap_tooltip: '{ticker}: YTM {tir}% - {days} days',
    lecap_x_title: 'Days to maturity',
    lecap_y_title: 'YTM (%)',
    cer_loading: 'Loading CER bonds...',
    cer_empty: 'CER bond data could not be loaded.',
    cer_error: 'Error loading CER bond data.',
    cer_source: 'Source: BCRA for CER + data912 for prices + internal config for cash flows.',
    cer_calc_hint: 'Click any bond to open the calculator',
    cer_note: 'Real YTM is calculated using CER-adjusted cash flows. Duration is shown in years (Macaulay) and Mod. Duration = Duration / (1 + rate).',
    cer_col_price: 'PRICE (ARS)',
    cer_col_maturity: 'MATURITY',
    cer_col_real_ytm: 'REAL YTM',
    ons_loading: 'Loading corporate bonds...',
    ons_empty: 'No quotes are available for the BDI corporate bond monitor.',
    ons_source_short: 'Source: data912 for corporate prices and /api/cotizaciones for MEP.',
    ons_source_full: 'Source: data912 for corporate prices, the BDI monitor for technical cash flows and /api/cotizaciones for MEP FX.',
    ons_error: 'Error loading corporate bonds: {message}',
    optimizer_empty_tickers: 'Enter at least one ticker to run the optimization.',
    optimizer_invalid_min_weight: 'The minimum weight is too high for the selected number of assets.',
    optimizer_loading: 'Downloading historical data for {count} assets...',
    optimizer_no_histories: 'No comparable historical series were found for the selected tickers.',
    optimizer_error: 'The optimizer could not be run: {message}',
    optimizer_source: 'Source: Yahoo Finance via internal API. {assets} assets, {days} comparable trading days, period {years}y.',
    optimizer_summary_assets: 'Comparable assets',
    optimizer_summary_max_sharpe: 'Max Sharpe',
    optimizer_summary_min_vol: 'Min volatility',
    optimizer_summary_rf: 'Risk-free rate',
    optimizer_summary_no_target: 'No target return loaded',
    optimizer_target: 'Target {value}',
    optimizer_weights_asset: 'Asset',
    optimizer_frontier_title: 'Portfolio space',
    optimizer_frontier_desc: 'Risk-return map with random portfolios, efficient frontier and implied market portfolio.',
    optimizer_frontier_empty: 'Run an optimization to view the risk-return map.',
    optimizer_frontier_random: 'Random portfolios',
    optimizer_frontier_line: 'Efficient frontier',
    optimizer_frontier_cml: 'CML',
    optimizer_frontier_min_vol: 'Min volatility',
    optimizer_frontier_vol_axis: 'Annual volatility (%)',
    optimizer_frontier_ret_axis: 'Annual return (%)',
    optimizer_sharpe_ratio: 'Sharpe Ratio',
    optimizer_assets_title: 'Assets',
    optimizer_assets_subtitle: 'Top movers highlighted; the rest of the universe is shown in the background.',
    optimizer_assets_rest: 'Rest of universe',
    optimizer_portfolios_title: 'Optimal portfolios',
    optimizer_portfolios_subtitle: 'Direct comparison between optimized portfolios.',
    optimizer_performance_empty: 'Run an optimization to view cumulative asset and portfolio performance.',
    optimizer_growth_axis: 'Cumulative growth (%)',
    optimizer_cagr_asset_portfolio: 'Asset / Portfolio',
    optimizer_cagr_type: 'Type',
    optimizer_cagr_annual: 'Annual CAGR',
    optimizer_type_asset: 'Asset',
    optimizer_type_portfolio: 'Portfolio',
    optimizer_corr_title: 'Asset correlation matrix',
    optimizer_ticker: 'Ticker',
    optimizer_correlation: 'Correlation',
    heatmap_title: 'Heatmap',
    heatmap_hero_desc: 'A heatmap arranges assets by relative size and colors them by performance to offer a quick market read.',
    heatmap_loading: 'Loading heatmap...',
    heatmap_empty: 'Heatmap data could not be loaded.',
    heatmap_error: 'Error loading heatmap: {message}',
    heatmap_refresh: 'Apply',
    heatmap_market_label: 'Universe',
    heatmap_market_usa: 'USA',
    heatmap_market_argentina_ars: 'Argentina ARS',
    heatmap_market_argentina_usd: 'Argentina USD',
    heatmap_start_label: 'Start',
    heatmap_end_label: 'End',
    heatmap_now: 'Through today',
    heatmap_period_hint: 'By default, the map compares the latest available session against the prior one.',
    heatmap_source: 'Market data comes from Yahoo Finance. Relative block size follows each company market capitalization.',
    heatmap_source_polygon: 'Source: Polygon for price, daily move and company reference data. Relative size uses real market cap when the provider returns it.',
    heatmap_source_polygon_reference: 'Source: Polygon for market cap and company reference data, with price and daily move from Yahoo Finance. This improves the realism of relative block sizing.',
    heatmap_source_yahoo: 'Market data comes from Yahoo Finance. Relative block size follows each company market capitalization.',
  heatmap_source_argentina_ars: 'Source: data912 for Argentine equity prices and returns in ARS. Relative size keeps the same traded-amount visual proxy.',
  heatmap_source_argentina_usd: 'Source: data912 for Argentine equities in USD. In this universe, only the daily move is currently shown, while size keeps the same traded-amount visual proxy.',
    heatmap_legend_negative: 'Down',
    heatmap_legend_flat: 'Flat',
    heatmap_legend_positive: 'Up',
    compound_title: 'Compound interest calculator',
    compound_hero_desc: 'Model contributions, compounding and rate sensitivity to project capital growth.',
    compound_status_ready: 'Enter your assumptions and run the simulation to compare scenarios.',
    compound_status_invalid: 'Please review the inputs. Time horizon and compounding frequency must be greater than zero.',
    compound_chart_empty: 'Run the calculator to view the comparison chart.',
    compound_chart_title: 'Trajectory comparison',
    compound_chart_desc: 'Capital growth without investing versus compound-interest scenarios over time.',
    compound_breakdown_title: 'Final breakdown',
    compound_breakdown_desc: 'Comparison of total contributions, ending value, earned interest and rate sensitivity.',
    compound_summary_contributed: 'Contributed capital',
    compound_summary_without: 'Without investing',
    compound_summary_base: 'Base scenario',
    compound_summary_range: 'Ending range',
    compound_summary_interest: 'Interest earned',
    compound_low: 'Lower rate',
    compound_high: 'Higher rate',
    compound_base: 'Base rate',
    compound_table_scenario: 'Scenario',
    compound_table_rate: 'Annual rate',
    compound_table_final: 'Ending value',
    compound_table_interest: 'Interest earned',
    compound_table_vs_cash: 'Diff. vs no investing',
    compound_axis_year: 'Years',
    compound_axis_value: 'Accumulated value',
    compound_chart_cash: 'Without investing',
    compound_chart_invested: 'Invested',
    compound_chart_band: 'Rate range',
    compound_frequency_label: 'Compounding frequency',
    compound_frequency_1: 'Annual',
    compound_frequency_2: 'Semiannual',
    compound_frequency_4: 'Quarterly',
    compound_frequency_12: 'Monthly',
    compound_frequency_24: 'Biweekly',
    compound_frequency_52: 'Weekly',
    compound_frequency_365: 'Daily',
    compound_step_1: 'Step 1',
    compound_step_2: 'Step 2',
    compound_step_3: 'Step 3',
    compound_step_4: 'Step 4',
    compound_step_1_title: 'Initial investment',
    compound_step_2_title: 'Contribution',
    compound_step_3_title: 'Interest rate',
    compound_step_4_title: 'Compounding',
    compound_step_1_copy: 'Amount of money available to invest at the start.',
    compound_step_2_copy: 'Amount you plan to add each month, or a negative number if you expect to withdraw capital every month.',
    compound_step_3_copy: 'Set the estimated annual rate and the variance band to evaluate surrounding scenarios.',
    compound_step_4_copy: 'Number of times per year the interest will compound.',
    compound_initial_label: 'Initial investment',
    compound_contribution_label: 'Monthly contribution',
    compound_years_label: 'Time horizon in years',
    compound_rate_label: 'Estimated interest rate (%)',
    compound_variance_label: 'Interest-rate variance range (%)',
    market_overview: 'Market overview',
    world_indicators: 'Key global market indicators in real time.',
    ars_fixed_income_desc: 'Implied yield on Treasury bills and capitalizing peso bonds based on market pricing.',
    usd_sovereign_desc: 'USD Argentine sovereign bonds with local-law and NY-law comparison.',
    global_source: 'Source: Yahoo Finance. Price, daily move and intraday sparkline.',
    sovereigns_loading: 'Loading sovereign bonds...',
    sovereigns_empty: 'Sovereign bond data could not be loaded.',
    sovereigns_error: 'Error loading sovereign bond data.',
    sovereigns_source: 'Source: data912 for prices + internal config for cashflows, law and maturity.',
    bond_calc_hint: 'Click any bond to open the calculator',
    ytm_duration_note: 'YTM is calculated from discounted future cash flows. Duration is shown in years (Macaulay).',
    market_news_empty: 'No market news available.',
    market_news_error: 'Error loading market news.',
    market_news_fallback_source: 'Market',
    corporates_caption: 'corporate issuers based on the same data visible in the table',
    category_crypto: 'Crypto',
    category_crypto_desc: 'Liquid digital assets',
    sovereign_curve_title: 'Sovereign curve',
    sovereign_curve_desc: 'Visual comparison between local-law and NY-law bonds to follow curve shape and relative yield.',
    usd_sovereigns_title: 'USD Sovereigns',
    usd_sovereigns_desc: 'Hard-dollar sovereign bonds with law, duration and yield read-through.',
  },
};

function t(key, replacements = {}) {
  const dictionary = UI_TEXT[currentLanguage] || UI_TEXT.es;
  let template = dictionary[key] || UI_TEXT.es[key] || key;
  for (const [name, value] of Object.entries(replacements)) {
    template = template.replaceAll(`{${name}}`, value);
  }
  return template;
}

function updateLanguageButtons() {
  document.documentElement.lang = currentLanguage;
  document.getElementById('lang-es')?.classList.toggle('active', currentLanguage === 'es');
  document.getElementById('lang-en')?.classList.toggle('active', currentLanguage === 'en');
  const logoutBtn = document.getElementById('auth-logout-btn');
  if (logoutBtn) logoutBtn.textContent = t('logout');
}

function setLanguage(nextLanguage) {
  if (!['es', 'en'].includes(nextLanguage) || nextLanguage === currentLanguage) return;
  currentLanguage = nextLanguage;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  updateLanguageButtons();
  window.location.reload();
}

function setupLanguageToggle() {
  updateLanguageButtons();
  document.getElementById('lang-es')?.addEventListener('click', () => setLanguage('es'));
  document.getElementById('lang-en')?.addEventListener('click', () => setLanguage('en'));
}

function normalizeTranslationKey(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function parseMetricNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = trimmed.includes(',') && trimmed.includes('.')
    ? trimmed.replace(/\./g, '').replace(',', '.')
    : trimmed.replace(',', '.');
  const parsed = parseFloat(normalized.replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function extractModifiedDuration(payload) {
  let found = null;
  const visited = new Set();

  function visit(node, parentHint = '') {
    if (found != null || !node || typeof node !== 'object') return;
    if (visited.has(node)) return;
    visited.add(node);

    if (Array.isArray(node)) {
      node.forEach((item) => visit(item, parentHint));
      return;
    }

    Object.entries(node).forEach(([key, value]) => {
      if (found != null) return;
      const combinedHint = normalizeTranslationKey(`${parentHint}_${key}_${value?.nombre || ''}_${value?.label || ''}_${value?.descripcion || ''}`);
      const looksLikeModifiedDuration =
        (combinedHint.includes('duracion') || combinedHint.includes('duration')) &&
        (combinedHint.includes('modificada') || combinedHint.includes('modified') || combinedHint.includes('modif'));

      if (looksLikeModifiedDuration) {
        const candidate = typeof value === 'object' && value !== null
          ? parseMetricNumber(value.valor ?? value.value ?? value.dato ?? value.contenido)
          : parseMetricNumber(value);
        if (candidate != null) {
          found = candidate;
          return;
        }
      }

      visit(value, combinedHint);
    });
  }

  visit(payload);
  return found;
}

async function fetchFCIModifiedDurations(activeFcis) {
  const entries = await Promise.all(activeFcis.map(async (fund) => {
    if (!fund.fondo_id || fund.clase_id == null) return [fund.nombre, null];
    try {
      const response = await fetch(`/api/cafci/ficha/${fund.fondo_id}/${fund.clase_id}`);
      if (!response.ok) throw new Error(`CAFCI ${response.status}`);
      const payload = await response.json();
      return [fund.nombre, extractModifiedDuration(payload)];
    } catch (error) {
      return [fund.nombre, null];
    }
  }));

  return Object.fromEntries(entries);
}

async function initSupabase() {
  try {
    const resp = await fetch('/api/auth-config');
    const { url, anonKey } = await resp.json();
    if (!url || !anonKey) return;
    supabaseClient = window.supabase.createClient(url, anonKey, {
      auth: { flowType: 'pkce' }
    });

    // Handle PKCE OAuth callback (code in query params)
    const params = new URLSearchParams(location.search);
    if (params.has('code')) {
      const { data: { session }, error } = await supabaseClient.auth.exchangeCodeForSession(params.get('code'));
      if (session) {
        currentUser = session.user;
        updateAuthUI();
        history.replaceState(null, '', location.pathname + '#portfolio');
        if (window._switchToPortfolio) window._switchToPortfolio();
        // Ensure portfolio loads after OAuth redirect
        setTimeout(() => loadPortfolio(), 100);
        return;
      }
    }

    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
      currentUser = session.user;
      updateAuthUI(); // handles portfolio-login-prompt / portfolio-content visibility
      // If user is on portfolio tab, load holdings now that we have the session
      if (location.hash === '#portfolio') loadPortfolio();
    }

    supabaseClient.auth.onAuthStateChange((event, session) => {
      currentUser = session?.user || null;
      updateAuthUI();
    });

    // Track page view (fire and forget, once per session)
    if (!sessionStorage.getItem('pv_tracked')) {
      supabaseClient.from('page_views').insert({
        path: (location.hash || '/').slice(0, 200),
        referrer: (document.referrer || '').slice(0, 500) || null,
      }).catch(() => {});
      sessionStorage.setItem('pv_tracked', '1');
    }
  } catch (e) {
    console.warn('Supabase init skipped:', e.message);
  }
}

async function loginWithGoogle() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/#portfolio' }
  });
}

async function logout() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  currentUser = null;
  updateAuthUI();
  if (location.hash === '#portfolio') location.hash = 'mundo';
}

function updateAuthUI() {
  const userDiv = document.getElementById('auth-user');
  const avatar = document.getElementById('auth-avatar');
  const portfolioLoginPrompt = document.getElementById('portfolio-login-prompt');
  const portfolioContent = document.getElementById('portfolio-content');
  if (currentUser) {
    if (userDiv) userDiv.style.display = 'flex';
    if (avatar) avatar.src = currentUser.user_metadata?.avatar_url || '';
    if (portfolioLoginPrompt) portfolioLoginPrompt.style.display = 'none';
    if (portfolioContent) portfolioContent.style.display = '';
  } else {
    if (userDiv) userDiv.style.display = 'none';
    if (portfolioLoginPrompt) portfolioLoginPrompt.style.display = '';
    if (portfolioContent) portfolioContent.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupLanguageToggle();
  setupThemeToggle();
  init();
  setupTabs();
  setupKeyboardNav();
  setupOptimizer();
  setupHeatmap();
  setupCompoundCalculator();
  loadMundo();
  loadHotMovers();
  loadCotizaciones();
  loadNewsTicker();
  loadNewsSection();
  initSupabase();

  // Auth event listeners
  document.getElementById('auth-logout-btn')?.addEventListener('click', logout);
  document.getElementById('portfolio-google-login')?.addEventListener('click', loginWithGoogle);
  document.getElementById('portfolio-add-btn')?.addEventListener('click', openAddHoldingModal);
});

function setupThemeToggle() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

// Entity name → base64 data URI logo mapping
const ENTITY_LOGOS = {
  // Garantizados / Especiales (matched by item.nombre or item.id)
  "Naranja X": "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiIHN0eWxlPSJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBzdHlsZT0iZmlsbDogcmdiKDI1MCwgMjUwLCAyNTApOyIvPjxnPjxwYXRoIGQ9Ik0zLjAxLDEyLjM1di02LjdzLjA0LS4wOS4wOS0uMDloLjkzcy4wNS4wMS4wNy4wM2wzLjQsNC41M2MuMDUuMDcuMTUuMDMuMTUtLjA1di00LjQzcy4wNC0uMDkuMDktLjA5aDEuMDRzLjA5LjA0LjA5LjA5djYuN3MtLjA0LjA5LS4wOS4wOWgtLjkycy0uMDUtLjAxLS4wNy0uMDNsLTMuNC00LjUzYy0uMDUtLjA3LS4xNS0uMDMtLjE1LjA1djQuNDNzLS4wNC4wOS0uMDkuMDloLTEuMDVzLS4wOS0uMDQtLjA5LS4wOVoiIHN0eWxlPSJmaWxsOiByZ2IoMjU0LCA4MCwgMCk7Ii8+PGc+PHBhdGggZD0iTTEyLjcxLDguODJsLTIuMDQtMy4xNmMtLjA0LS4wNi0uMS0uMDktLjE3LS4wOWgtMS4zNnMtLjA3LjAzLS4wNy4wN2MwLC4wMSwwLC4wMi4wMS4wM2wyLjEyLDMuM3MuMDEuMDUsMCwuMDdsLTIuMTIsMy4yOXMtLjAxLjA3LjAyLjA5Yy4wMSwwLC4wMi4wMS4wNC4wMWgxLjM2Yy4wNywwLC4xMy0uMDMuMTctLjA5bDIuMDQtMy4xNWMuMDctLjExLjA3LS4yNiwwLS4zN2gwWiIgc3R5bGU9ImZpbGw6IHJnYigyNTQsIDgwLCAwKTsiLz48cGF0aCBkPSJNMTMuMTMsOS40NnMtLjA2LS4wNC0uMDktLjAyYzAsMC0uMDEuMDEtLjAyLjAybC0uNTYuODdjLS4xMS4xNy0uMTEuMzksMCwuNTVsLjk1LDEuNDdzLjA5LjA4LjE0LjA4aDEuNDFzLjA1LS4wMi4wNS0uMDVjMCwwLDAtLjAyLDAtLjAzbC0xLjg3LTIuODlaIiBzdHlsZT0iZmlsbDogcmdiKDgwLCAwLCAxMjcpOyIvPjxwYXRoIGQ9Ik0xMy4wMiw4LjUzcy4wNi4wNC4wOS4wMmMwLDAsLjAxLS4wMS4wMi0uMDJsMS44Ny0yLjg5czAtLjA2LS4wMi0uMDdjMCwwLS4wMiwwLS4wMywwaC0xLjQxYy0uMDYsMC0uMTEuMDMtLjE0LjA4bC0uOTUsMS40N2MtLjExLjE3LS4xMS4zOSwwLC41NWwuNTYuODZaIiBzdHlsZT0iZmlsbDogcmdiKDgwLCAwLCAxMjcpOyIvPjwvZz48L2c+PC9zdmc+",
  "Fiwind": "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiIHN0eWxlPSJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBzdHlsZT0iZmlsbDogcmdiKDEwLCAxMCwgMTApOyIvPjxnPjxwYXRoIGQ9Ik03LjkyLDkuNThoLTEuNTdjLS4yLDAtLjM2LS4xNi0uMzYtLjM2cy4xNi0uMzYuMzYtLjM2aDEuNTdjLjIsMCwuMzYuMTYuMzYuMzZzLS4xNi4zNi0uMzYuMzZaTTYuMzYsNy45NmMtLjIsMC0uMzYtLjE2LS4zNi0uMzZzLjE2LS4zNi4zNi0uMzZoMi4wNWMuMiwwLC4zNi4xNi4zNi4zNnMtLjE2LjM2LS4zNi4zNmgtMi4wNVpNOC43LDExLjQ4Yy0uMTktLjA2LS4zLS4yNi0uMjQtLjQ1bDEuMS0zLjYxYy4wNi0uMTkuMjYtLjMuNDUtLjI0LjE5LjA2LjMuMjYuMjQuNDVsLTEuMSwzLjYxYy0uMDYuMTktLjI2LjMtLjQ1LjI0Wk0xMS44OSw3LjYzbC0xLjEsMy42MWMtLjA2LjE5LS4yNi4zLS40NS4yNC0uMTktLjA2LS4zLS4yNi0uMjQtLjQ1bDEuMS0zLjYxYy4wNi0uMTkuMjYtLjMuNDUtLjI0LjE5LjA2LjMuMjYuMjQuNDVaIiBzdHlsZT0iZmlsbDogcmdiKDIzOSwgMTgwLCAyOSk7Ii8+PHBhdGggZD0iTTksMTQuMDFjLTIuNzYsMC01LTIuMjUtNS01LjAxczIuMjQtNS4wMSw1LTUuMDEsNSwyLjI1LDUsNS4wMS0yLjI0LDUuMDEtNSw1LjAxWk05LDQuNjJjLTIuNDEsMC00LjM3LDEuOTYtNC4zNyw0LjM3czEuOTYsNC4zNyw0LjM3LDQuMzcsNC4zNy0xLjk2LDQuMzctNC4zNy0xLjk2LTQuMzctNC4zNy00LjM3WiIgc3R5bGU9ImZpbGw6IHJnYigyMzksIDE4MCwgMjkpOyIvPjwvZz48L3N2Zz4=",
  "Ualá": "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiIHN0eWxlPSJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBzdHlsZT0iZmlsbDogcmdiKDIsIDQyLCAxNTUpOyIvPjxnIGlkPSJudWV2byI+PHBhdGggZD0iTTYuODEsMTIuMDVjLTEuODcsMC0zLjgtMS41Ny0zLjgtMy43MSwwLS41NS4zOS0xLjIxLDEuMTItMS4yMXMxLjA5LjQzLDEuMTQsMS4yMWMuMDksMS4yNC41OCwyLjE5LjY3LDIuMzgsMCwuMDEuMDEuMDIuMDEuMDMuMjkuNTkuODcuOTYsMS41Ny45Ni40NiwwLC44NS0uMTcsMS4xOS0uNDYtLjU5LjU3LTEuMjIuODEtMS45LjgxWiIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz48cGF0aCBkPSJNMTEuMjEsNS45NWMxLjg3LDAsMy44LDEuNTcsMy44LDMuNzEsMCwuNTUtLjM5LDEuMjEtMS4xMiwxLjIxcy0xLjA5LS40My0xLjE0LTEuMjFjLS4xLTEuMzQtLjY2LTIuMzUtLjY5LTIuNC0uMy0uNTctLjg5LS45Ni0xLjU3LS45Ni0uNDYsMC0uODUuMTctMS4xOS40Ni41OS0uNTcsMS4yMi0uODEsMS45LS44MVoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+PHBhdGggZD0iTTEyLjA2LDcuMjZjLS4zLS41Ny0uODktLjk1LTEuNTctLjk1LS40NiwwLS44NS4xNy0xLjE5LjQ2aDBjLTEuMzIsMS4xOS0yLjA3LDMuNDItMy4zNiwzLjk1LDAsLjAxLjAxLjAyLjAxLjAzLjI5LjU5Ljg3Ljk2LDEuNTcuOTYuNDYsMCwuODUtLjE3LDEuMTktLjQ2LDEuMzctMS4yMiwxLjk3LTMuMzUsMy4zNS0zLjk4WiIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDg4LCAxMTYpOyIvPjwvZz48L3N2Zz4=",
  "COCOS": "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiIHN0eWxlPSJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBzdHlsZT0iZmlsbDogcmdiKDAsIDk4LCAyMjUpOyIvPjxnPjxwYXRoIGQ9Ik03LjQ5LDExLjYyYy0xLjM2LjAxLTIuNjEtLjY0LTMuMTgtMS44Mi0uMi0uNDMtLjMxLS45LS4zMS0xLjM3cy4xLS45NC4zMS0xLjM3Yy40MS0uOTEsMS4xMy0xLjY0LDIuMDMtMi4wN2wuNjYtLjMyLjY0LDEuMzMtLjY2LjMyYy0uNTguMjctMS4wNS43NS0xLjMzLDEuMzMtLjIyLjQ3LS4yMywxLjAyLS4wMSwxLjUuNDcuOTcsMS44NSwxLjI4LDMuMDcuNjlsLjY2LS4zMi42NCwxLjMzLS42Ni4zMmMtLjU4LjI4LTEuMjEuNDQtMS44Ni40NCIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz48cGF0aCBkPSJNMTEuMDgsMTMuMzRsLS42Ny0xLjMxLjY1LS4zNGMxLjItLjYyLDEuNzgtMS45MSwxLjI4LTIuODdzLTEuODgtMS4yNS0zLjA4LS42M2wtLjY1LjM0LS42Ny0xLjMxLjY1LS4zNGMxLjkzLTEsNC4yLS40Miw1LjA3LDEuMjYuODcsMS42OSwwLDMuODctMS45Miw0Ljg3bC0uNjUuMzRoMFoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+PC9nPjwvc3ZnPg==",
  "Supervielle": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOCAxOCIgc3R5bGU9IndpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHg7Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHN0eWxlPSJmaWxsOiByZ2IoMjUwLCAyNTAsIDI1MCk7Ii8+PGc+PHBhdGggZD0iTTMuNDMsMy41N2MuNzksMi4wOSwxLjcsNi4zMi0uNDMsMTAuOTgtLjAyLjA2LjA1LjExLjEzLjA2LDIuNTUtMS43LDQuNzctNC45Niw1LjUtNy42Mi0yLjUzLTEuMzItNC4wNi0yLjY5LTQuOTgtMy41Ni0uMTItLjEyLS4yNy4wMS0uMjIuMTRaIiBzdHlsZT0iZmlsbDogcmdiKDIzNywgMjgsIDM2KTsiLz48cGF0aCBkPSJNMTQuOSw5LjA1Yy0yLjExLS4zNC00LjE2LTEuMDQtNS41LTEuNjktLjc3LDIuMDctMi4yNyw0LjI5LTMuODMsNS44MS0uMDkuMDctLjAyLjIuMTIuMSwzLjM0LTIuMzYsNi44My0zLjQ5LDkuMjItMy45Ni4xMy0uMDMuMTMtLjIzLDAtLjI2WiIgc3R5bGU9ImZpbGw6IHJnYigxMzIsIDAsIDY1KTsiLz48L2c+PC9zdmc+",

  // FCI entities
  "Prex": "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iMCAwIDE4IDE4IiBzdHlsZT0id2lkdGg6IDQwcHg7IGhlaWdodDogNDBweDsiPjxkZWZzPjxtYXNrIGlkPSJtYXNrIiB4PSIzLjAxIiB5PSI1LjYxIiB3aWR0aD0iMTEuODgiIGhlaWdodD0iNi42NSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGcgaWQ9Im1hc2stMiIgZGF0YS1uYW1lPSJtYXNrIj48cmVjdCB4PSIzLjAxIiB5PSI1LjYxIiB3aWR0aD0iMTEuODgiIGhlaWdodD0iNi42NSIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz48cGF0aCBkPSJNMTQuODksNy44NWgtMy4xOGwuMywxLjUtLjMsMS41aDMuMTh2LS4wMmgtLjk0bC0uNTUtLjc2LjQ2LS42MSwxLjAzLDEuMzdNMTEuNzYsNy45MWguOTRsLjU1Ljc3LS40Ni42MS0xLjAzLTEuMzdoMFpNMTIuNjMsMTAuODRoLS44NmwyLjI3LTIuOTNoLjg1cy0yLjI2LDIuOTMtMi4yNiwyLjkzWiIvPjwvZz48L21hc2s+PC9kZWZzPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgc3R5bGU9ImZpbGw6IHJnYig5MCwgODAsIDI0OSk7Ii8+PGc+PHBhdGggZD0iTTQuNjksOS4wM2MuMDksMCwuMTcsMCwuMjUtLjA0cy4xNS0uMDcuMjItLjEzYy4wNi0uMDYuMTEtLjEzLjE1LS4ycy4wNS0uMTYuMDUtLjI0LS4wMi0uMTctLjA1LS4yNGMtLjAzLS4wOC0uMDgtLjE1LS4xNS0uMi0uMDYtLjA2LS4xNC0uMS0uMjItLjEzcy0uMTctLjA0LS4yNS0uMDRoLS44NnYxLjI0aC44NlpNMy4wMSw3LjFoMS42OGMuOTEsMCwxLjUuNTYsMS41LDEuMzJzLS41OSwxLjMtMS41LDEuM2gtLjg2djEuMTJoLS44MXYtMy43NFoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+PHBhdGggZD0iTTYuNTEsOS4yNmMwLTEuNTQsMS40NS0xLjQ5LDEuOTktMS4zNmwtLjA5LjY5Yy0uNjUtLjE5LTEuMTQuMDktMS4xNC42djEuNjVoLS43N3YtMS41OFoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+PHBhdGggZD0iTTEwLjk0LDkuMDdjLS4wNS0uMTctLjE1LS4zMi0uMjktLjQyLS4xNC0uMTEtLjMyLS4xNi0uNS0uMTZzLS4zNS4wNi0uNS4xNmMtLjE0LjExLS4yNC4yNS0uMjkuNDJoMS41N1pNMTAuMTUsNy44NWMxLjAxLDAsMS43Mi44MSwxLjU2LDEuNzhoLTIuMzZjLjA0LjE4LjE1LjM1LjMxLjQ2cy4zNS4xNy41NC4xNmMuMTYsMCwuMzEtLjAzLjQ1LS4xMS4xNC0uMDcuMjUtLjE5LjMzLS4zMmwuNjMuMjdjLS4xNC4yNC0uMzUuNDUtLjYuNTktLjI1LjE0LS41NC4yMS0uODMuMi0uOTIsMC0xLjYyLS42Ni0xLjYyLTEuNTMsMC0uMi4wNC0uNC4xMi0uNTlzLjItLjM2LjM0LS41LjMyLS4yNS41Mi0uMzNjLjE5LS4wNy40LS4xMS42MS0uMTEiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+PGcgc3R5bGU9Im1hc2s6IHVybCgmcXVvdDsjbWFzayZxdW90Oyk7Ij48cGF0aCBkPSJNMTIuODcsOS4zOWwtMS4xMS0xLjQ4aC45NGwuNjQuODkuNjUtLjg5aC44OWwtMS4xMSwxLjQ1LDEuMTEsMS40OGgtLjk0bC0uNjQtLjg5LS42NS44OWgtLjg5bDEuMTEtMS40NWgwWiIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz48L2c+PC9nPjwvc3ZnPg==",
  "ICBC": "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiIHN0eWxlPSJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBzdHlsZT0iZmlsbDogcmdiKDI1MCwgMjUwLCAyNTApOyIvPjxnPjxwYXRoIGlkPSJMYXllciIgZD0iTTMuMDEsOS4wMWMwLTMuMzMsMi42OC02LjAxLDYuMDEtNi4wMXM1Ljk5LDIuNjgsNS45OSw2LjAxLTIuNyw1Ljk5LTUuOTksNS45OS02LjAxLTIuNy02LjAxLTUuOTlaTTMuOSw5LjAxYzAsLjY4LjEyLDEuMzMuMzksMS45Ni4yNy42LjYzLDEuMTgsMS4xMSwxLjY0LjQ4LjQ4LDEuMDQuODcsMS42NywxLjExLjYuMjcsMS4yOC4zOSwxLjk2LjM5LDIuNzgsMCw1LjA1LTIuMjcsNS4wNS01LjA5cy0yLjI3LTUuMTItNS4wNS01LjEyYy0uNjgsMC0xLjM1LjE0LTEuOTYuMzktLjYzLjI3LTEuMTguNjMtMS42NywxLjExcy0uODUsMS4wNC0xLjExLDEuNjdjLS4yNy42LS4zOSwxLjI4LS4zOSwxLjk2aDBaIiBzdHlsZT0iZmlsbDogcmdiKDE4NCwgMzAsIDQ1KTsgZmlsbC1ydWxlOiBldmVub2RkOyIvPjxwYXRoIGlkPSJMYXllci0yIiBkYXRhLW5hbWU9IkxheWVyIiBkPSJNNS44MiwxMi4yaDIuOTJ2LS44NWgtMi4wOHYtMS4wMWgxLjg2di0yLjY2aC0xLjg2di0xLjAxaDIuMDh2LS44NWgtMi45MnYyLjc1aDEuODZ2Ljk0aC0xLjg2djIuNjhaTTEyLjIsOS40OWgtMS45MXYtLjk0aDEuOTF2LTIuNzVoLTIuOTV2Ljg1aDIuMXYxLjAxaC0xLjkxdjIuNjhoMS45MXYxLjAxaC0yLjF2Ljg1aDIuOTV2LTIuN1oiIHN0eWxlPSJmaWxsOiByZ2IoMTg0LCAzMCwgNDUpOyBmaWxsLXJ1bGU6IGV2ZW5vZGQ7Ii8+PC9nPjwvc3ZnPg==",
  "Adcap": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCIgc3R5bGU9IndpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHg7Ij48cmVjdCB3aWR0aD0iMjgiIGhlaWdodD0iMjgiLz48Zz48cGF0aCBkPSJNMTMuMzQsMTguNjlsLTEuMDMtMi4wOWgtNS4zMWwtMS4wMywyLjA5aC0xLjQ2bDQuNDEtOC45OWgxLjYxbDQuMzQsOC45OWgtMS41MlpNOC45NywxMi41NmwtMS4zLDIuNzFoNC4wMWwtMS4zNC0yLjczYy0uMTMtLjI0LS4yNC0uNDktLjMzLS43LS4xMy0uMjItLjIyLS40OS0uMzMtLjczLS4xMy4yNy0uMjIuNTEtLjMzLjc2LS4xMy4yMi0uMjQuNDYtLjM3LjdaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTIyLjQ4LDkuMTl2OS41aC0xLjN2LTEuMTVjLS4xOC4yMi0uNDIuNDItLjc2LjY0LS4zMy4xOC0uNy4zNy0xLjEyLjQ5LS40Mi4xMy0uODUuMTgtMS4zLjE4LS44MiwwLTEuNTItLjE1LTIuMTItLjQ2cy0xLjA2LS43LTEuMzktMS4yNWMtLjMzLS41MS0uNDktMS4xMi0uNDktMS44M3MuMTgtMS4yOC41MS0xLjgzYy4zMy0uNTEuODItLjk0LDEuNDMtMS4yNXMxLjMtLjQ2LDIuMTItLjQ2Yy43LDAsMS4zLjEzLDEuODUuMzMuNTUuMjIuOTcuNDksMS4yNS43OXYtMy43NGgxLjM0bC0uMDIuMDNaTTE4LjI5LDE3LjZjLjU4LDAsMS4xLS4wOSwxLjU1LS4zMS40Mi0uMjIuNzktLjQ5LDEuMDMtLjgycy4zNy0uNzMuMzctMS4xNS0uMTMtLjgyLS4zNy0xLjE1LS41OC0uNjEtMS4wMy0uODJjLS40Mi0uMTgtLjk0LS4zMS0xLjU1LS4zMXMtMS4xLjA5LTEuNTIuMzFjLS40Ni4xOC0uNzkuNDYtMS4wMy44Mi0uMjQuMzMtLjM3LjczLS4zNywxLjE1cy4xMy44Mi4zNywxLjE1Yy4yNC4zMy42MS42MSwxLjAzLjgyLjQyLjIyLjk0LjMxLDEuNTIuMzFaIiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==",
  "IEB+": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCIgc3R5bGU9IndpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHg7Ij48cmVjdCB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHN0eWxlPSJmaWxsOiByZ2IoMTAsIDEwLCAxMCk7Ii8+PGc+PHBhdGggZD0iTTIzLjc5LDguNDdoLTUuODZjLS4wNiwwLS4wOS4wMy0uMTMuMDZsLTIuNTYsMi41M2MtLjA2LjA2LS4wNi4xMy0uMDMuMTguMDMuMDYuMDkuMTMuMTUuMTNoNC41NHY3Ljk4YzAsLjA2LjAzLjEzLjEzLjE1aC4wNnMuMDktLjAzLjEzLS4wNmwzLjctMy43cy4wNi0uMDkuMDYtLjEzdi02Ljk3Yy0uMDMtLjEyLS4xMi0uMTgtLjIxLS4xOFpNMjMuNiw4Ljh2Mi4xNmgtMy4zNXYtMi4xNmgzLjM1Wk0xNS44LDExbDIuMTktMi4xNmgxLjg4djIuMTZoLTQuMDZaTTIwLjI3LDE4Ljkydi03LjU4aDMuMzV2NC4yM2wtMy4zNSwzLjM1WiIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz48cGF0aCBkPSJNNCwxOS41MXYtNi4zOWgxLjQ1djYuNDFoLTEuNDV2LS4wM1oiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+PHBhdGggZD0iTTYuNzQsMTMuMTJoNC44NXYxLjIzaC0zLjM5djEuM2gzLjJ2MS4yM2gtMy4ydjEuNDFoMy4zOXYxLjIzaC00Ljg1di02LjQxWiIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz48cGF0aCBkPSJNMTIuNjIsMTkuNTF2LTYuMzloMy4zYzEuMjEsMCwyLjAxLjc1LDIuMDEsMS43OSwwLC41NS0uMjIuOTUtLjU5LDEuMjMuNDkuMjguODQuNzcuODQsMS41MiwwLDEuMTEtLjg0LDEuODgtMi4wNywxLjg4aC0zLjQ4di0uMDNaTTE1Ljg0LDE1LjYxYy40LDAsLjY0LS4yMi42NC0uNjQsMC0uNC0uMjItLjY0LS42NC0uNjRoLTEuNzJ2MS4zaDEuNzJaTTE1Ljk1LDE4LjI3Yy41NSwwLC43NS0uMzEuNzUtLjc1LDAtLjQtLjIyLS43NS0uNzUtLjc1aC0xLjg4djEuNDVoMS44OHYuMDRaIiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMjU1LCAyNTUpOyIvPjwvZz48L3N2Zz4=",
  "Balanz": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCIgc3R5bGU9IndpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHg7Ij48cmVjdCB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHN0eWxlPSJmaWxsOiByZ2IoMTMsIDMyLCA4NSk7Ii8+PGcgaWQ9IkdydXBvXzU1NiI+PHBhdGggaWQ9IlRyYXphZG9fMTM2NyIgZD0iTTExLjQzLDE4LjY2aDMuMzVjMS4yMywwLDIuMzQtLjM5LDIuMzQtMS45cy0uOTUtMi4wNi0yLjI5LTIuMDZoLTMuNHYzLjk2Wk0xMS40MywxMi42M2gzLjE4YzEuMTIsMCwxLjk1LS41LDEuOTUtMS43MywwLTEuMzQtMS4wNi0xLjYyLTIuMTgtMS42MmgtMi45NnYzLjM1Wk04LjI1LDYuODNoNi43NWMyLjczLDAsNC41Ny44OSw0LjU3LDMuNTcuMDYsMS4yOC0uNzMsMi41MS0xLjk1LDMuMDEsMS42Mi4zOSwyLjczLDEuOTUsMi42MiwzLjYzLDAsMi45LTIuNDUsNC4xMy01LjA0LDQuMTNoLTYuOTJWNi44M1oiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+PC9nPjwvc3ZnPg==",
  "Galicia": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOCAxOCIgc3R5bGU9IndpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHg7Ij48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxwYXRoIGZpbGw9IiNFODZFMkMiIGQ9Ik0wIDBoMTh2MThIMFYwWiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMS42ODYgNi40NDhhLjA2MS4wNjEgMCAwIDEtLjAzNi0uMDEyIDIuMTk3IDIuMTk3IDAgMCAwLS40NTctLjE4NGMtLjM1LS4xMDYtLjk2LS4yMzctMS44OTUtLjI2LjA1My45OTkuMjMgMS41NzcuMzMyIDEuODMybC4wMTMuMDMxYy4wNTkuMTM4LjIyNC40NjYuNDgzLjU0MmEuMDYyLjA2MiAwIDAgMSAuMDQyLjA3NGwtMS4xMDMgNy41MDRhLjA2My4wNjMgMCAwIDEtLjA2Mi4wNTQuMDYzLjA2MyAwIDAgMS0uMDYyLS4wNTRsLTEuMTA4LTcuNWEuMDYyLjA2MiAwIDAgMSAuMDQxLS4wNzhjLjI1OC0uMDc1LjQyMy0uNDAyLjQ4MS0uNTM4LjEwNy0uMjYuMjkxLS44NDIuMzQ2LTEuODY4LS45MzUuMDIzLTEuNTQ1LjE1NC0xLjg5NC4yNjFhMi4wMyAyLjAzIDAgMCAwLS40NTcuMTg2LjA2LjA2IDAgMCAxLS4wMjIuMDA5Ljc0NC43NDQgMCAxIDEtLjAxNC0xLjQ4NmMuMDAzIDAgLjAwNyAwIC4wMTEuMDAyYS4wNjMuMDYzIDAgMCAxIC4wMjUuMDA5cy4xNC4wODguNDU2LjE4NWMuMzUxLjEwOC45NjYuMjQgMS45MDguMjYyLS4wMjQtLjkzNi0uMTU1LTEuNTQ0LS4yNjItMS44OTFhMi4xMDQgMi4xMDQgMCAwIDAtLjE4Ni0uNDU0LjA2LjA2IDAgMCAxLS4wMDUtLjA0OS43MzUuNzM1IDAgMCAxIC40NTYtLjY2OC43MzUuNzM1IDAgMCAxIC4yODQtLjA1Ni43Mi43MiAwIDAgMSAuNzQuNzMyLjA2OC4wNjggMCAwIDEtLjAxLjA0NiAyIDIgMCAwIDAtLjE4Mi40NWMtLjEwNy4zNDctLjIzOC45NTUtLjI2MyAxLjg5Ljk0MS0uMDIyIDEuNTU0LS4xNTIgMS45MDUtLjI1OS4yODctLjA4OC40MjgtLjE2OC40NTYtLjE4NWEuMDYyLjA2MiAwIDAgMSAuMDQtLjAxNC43NDUuNzQ1IDAgMCAxIDAgMS40ODdaIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGgxOHYxOEgweiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==",
  "Cocos Ahorro": "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiIHN0eWxlPSJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBzdHlsZT0iZmlsbDogcmdiKDAsIDk4LCAyMjUpOyIvPjxnPjxwYXRoIGQ9Ik03LjQ5LDExLjYyYy0xLjM2LjAxLTIuNjEtLjY0LTMuMTgtMS44Mi0uMi0uNDMtLjMxLS45LS4zMS0xLjM3cy4xLS45NC4zMS0xLjM3Yy40MS0uOTEsMS4xMy0xLjY0LDIuMDMtMi4wN2wuNjYtLjMyLjY0LDEuMzMtLjY2LjMyYy0uNTguMjctMS4wNS43NS0xLjMzLDEuMzMtLjIyLjQ3LS4yMywxLjAyLS4wMSwxLjUuNDcuOTcsMS44NSwxLjI4LDMuMDcuNjlsLjY2LS4zMi42NCwxLjMzLS42Ni4zMmMtLjU4LjI4LTEuMjEuNDQtMS44Ni40NCIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz48cGF0aCBkPSJNMTEuMDgsMTMuMzRsLS42Ny0xLjMxLjY1LS4zNGMxLjItLjYyLDEuNzgtMS45MSwxLjI4LTIuODdzLTEuODgtMS4yNS0zLjA4LS42M2wtLjY1LjM0LS42Ny0xLjMxLjY1LS4zNGMxLjkzLTEsNC4yLS40Miw1LjA3LDEuMjYuODcsMS42OSwwLDMuODctMS45Miw0Ljg3bC0uNjUuMzRoMFoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+PC9nPjwvc3ZnPg==",
  "Cocos": "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiIHN0eWxlPSJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBzdHlsZT0iZmlsbDogcmdiKDAsIDk4LCAyMjUpOyIvPjxnPjxwYXRoIGQ9Ik03LjQ5LDExLjYyYy0xLjM2LjAxLTIuNjEtLjY0LTMuMTgtMS44Mi0uMi0uNDMtLjMxLS45LS4zMS0xLjM3cy4xLS45NC4zMS0xLjM3Yy40MS0uOTEsMS4xMy0xLjY0LDIuMDMtMi4wN2wuNjYtLjMyLjY0LDEuMzMtLjY2LjMyYy0uNTguMjctMS4wNS43NS0xLjMzLDEuMzMtLjIyLjQ3LS4yMywxLjAyLS4wMSwxLjUuNDcuOTcsMS44NSwxLjI4LDMuMDcuNjlsLjY2LS4zMi42NCwxLjMzLS42Ni4zMmMtLjU4LjI4LTEuMjEuNDQtMS44Ni40NCIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsiLz48cGF0aCBkPSJNMTEuMDgsMTMuMzRsLS42Ny0xLjMxLjY1LS4zNGMxLjItLjYyLDEuNzgtMS45MSwxLjI4LTIuODdzLTEuODgtMS4yNS0zLjA4LS42M2wtLjY1LjM0LS42Ny0xLjMxLjY1LS4zNGMxLjkzLTEsNC4yLS40Miw1LjA3LDEuMjYuODcsMS42OSwwLDMuODctMS45Miw0Ljg3bC0uNjUuMzRoMFoiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ii8+PC9nPjwvc3ZnPg==",
  "Claro Pay": "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiIHN0eWxlPSJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBzdHlsZT0iZmlsbDogcmdiKDI1MCwgMjUwLCAyNTApOyIvPjxnPjxwYXRoIGQ9Ik0xMS44NCw1LjA5bC0yLjg1LDIuODYuNzUuNzUsMi44NS0yLjg2LS43NS0uNzVaIiBzdHlsZT0iZmlsbDogcmdiKDIzNSwgNTksIDQ3KTsiLz48cGF0aCBkPSJNNy43NCw0LjVoLTEuMDZ2My4wNmgxLjA2di0zLjA2WiIgc3R5bGU9ImZpbGw6IHJnYigyMzUsIDU5LCA0Nyk7Ii8+PHBhdGggZD0iTTcuMDcsOC41MmMtLjY3LDAtMS4yNS4yNC0xLjczLjczLS40OS40OS0uNzMsMS4wOC0uNzMsMS43NnMuMjQsMS4yOC43MywxLjc1Yy40OC40OSwxLjA2Ljc0LDEuNzMuNzRzMS4yNi0uMjUsMS43NS0uNzRjLjQ4LS40OC43Mi0xLjA3LjcyLTEuNzVzLS4yNC0xLjI4LS43Mi0xLjc2Yy0uNDktLjQ5LTEuMDgtLjczLTEuNzUtLjczWk03Ljk5LDExLjkzYy0uMjUuMjYtLjU2LjM4LS45Mi4zOHMtLjY2LS4xMy0uOTEtLjM4Yy0uMjUtLjI2LS4zOS0uNTctLjM5LS45MnMuMTQtLjY4LjM5LS45M2MuMjUtLjI2LjU2LS4zOS45MS0uMzguMzYtLjAxLjY3LjExLjkzLjM4LjI0LjI1LjM3LjU2LjM4LjkzLS4wMi4zNS0uMTQuNjYtLjM5LjkyWiIgc3R5bGU9ImZpbGw6IHJnYigyMzUsIDU5LCA0Nyk7Ii8+PHBhdGggZD0iTTEzLjM5LDEwLjJ2LS4zMWgtMy4xM3YxLjA2aDMuMTN2LS43NFoiIHN0eWxlPSJmaWxsOiByZ2IoMjM1LCA1OSwgNDcpOyIvPjwvZz48L3N2Zz4=",
  "SBS": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjggMjgiIHN0eWxlPSJ3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHgxPSI2LjkzIiB5MT0iOC45MyIgeDI9IjIxLjA3IiB5Mj0iMjMuMDciIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAzMCkgc2NhbGUoMSAtMSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNhMDZhMjgiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZGRlOGEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMjgiIGhlaWdodD0iMjgiLz48Zz48Zz48cGF0aCBkPSJNMTEuMDgsMTUuMDNjMC0uMTUtLjA2LS4yOS0uMTgtLjM4cy0uMzItLjE4LS42Mi0uMjZjLS4yOS0uMDktLjUzLS4xOC0uNy0uMjktLjQ3LS4yNi0uNy0uNTktLjctMS4wMywwLS4yMy4wNi0uNDEuMTgtLjU5cy4yOS0uMzIuNTMtLjQxLjUtLjE1Ljc5LS4xNS41Ni4wNi43OS4xNWMuMjMuMTIuNDEuMjYuNTMuNDQuMTIuMjEuMjEuNDEuMjEuNjhoLS44NWMwLS4xOC0uMDYtLjMyLS4xOC0uNDRzLS4yOS0uMTUtLjUtLjE1LS4zOC4wNi0uNS4xNWMtLjEyLjA5LS4xOC4yMS0uMTguMzVzLjA2LjIzLjIxLjM1Yy4xNS4wOS4zMi4xOC41OS4yNi41LjE1Ljg1LjMyLDEuMDYuNTMuMjMuMjEuMzIuNS4zMi43OSwwLC4zNS0uMTUuNjUtLjQxLjg1cy0uNjUuMjktMS4wOS4yOWMtLjMyLDAtLjYyLS4wNi0uODgtLjE4LS4yNi0uMTItLjQ3LS4yNi0uNTktLjQ3cy0uMjEtLjQ0LS4yMS0uN2guODVjMCwuNDcuMjYuNjguODIuNjguMjEsMCwuMzUtLjAzLjQ3LS4xMi4xOC0uMDkuMjMtLjIxLjIzLS4zNVoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTIuNTIsMTYuMTF2LTQuMTRoMS40NGMuNSwwLC44OC4wOSwxLjE1LjI5cy4zOC40Ny4zOC44NWMwLC4yMS0uMDYuMzgtLjE1LjUzLS4xMi4xNS0uMjMuMjYtLjQ0LjM1LjIxLjA2LjM4LjE1LjUuMzIuMTIuMTUuMTguMzUuMTguNTksMCwuNDEtLjEyLjctLjM4LjkxLS4yNi4yMS0uNjIuMzItMS4wOS4zMmgtMS41OXYtLjAzWk0xMy4zNywxMy43MWguNjJjLjQ0LDAsLjY1LS4xOC42NS0uNTMsMC0uMTgtLjA2LS4zMi0uMTgtLjQxLS4xMi0uMDktLjI5LS4xMi0uNTMtLjEyaC0uNTl2MS4wNmguMDNaTTEzLjM3LDE0LjI5djEuMTJoLjczYy4yMSwwLC4zNS0uMDYuNDctLjE1LjEyLS4wOS4xOC0uMjMuMTgtLjM4LDAtLjM4LS4yMS0uNTYtLjU5LS41OWgtLjc5WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xOC4zNiwxNS4wM2MwLS4xNS0uMDYtLjI5LS4xOC0uMzgtLjEyLS4wOS0uMzItLjE4LS42Mi0uMjYtLjI5LS4wOS0uNTMtLjE4LS43LS4yOS0uNDctLjI2LS43LS41OS0uNy0xLjAzLDAtLjIzLjA2LS40MS4xOC0uNTkuMTItLjE4LjI5LS4zMi41My0uNDFzLjUtLjE1Ljc5LS4xNS41Ni4wNi43OS4xNWMuMjMuMTIuNDEuMjYuNTMuNDQuMTIuMjEuMjEuNDEuMjEuNjhoLS44NWMwLS4xOC0uMDYtLjMyLS4xOC0uNDQtLjEyLS4xMi0uMjktLjE1LS41LS4xNXMtLjM4LjA2LS41LjE1LS4xOC4yMS0uMTguMzUuMDYuMjMuMjEuMzVjLjE1LjA5LjMyLjE4LjU5LjI2LjUuMTUuODUuMzIsMS4wNi41My4yMy4yMS4zMi41LjMyLjc5LDAsLjM1LS4xNS42NS0uNDEuODVzLS42NS4yOS0xLjA5LjI5Yy0uMzIsMC0uNjItLjA2LS44OC0uMTgtLjI2LS4xMi0uNDctLjI2LS41OS0uNDctLjE1LS4yMS0uMjEtLjQ0LS4yMS0uN2guODVjMCwuNDcuMjYuNjguODIuNjguMjEsMCwuMzUtLjAzLjQ3LS4xMi4xOC0uMDkuMjMtLjIxLjIzLS4zNVoiIGZpbGw9IiNmZmYiLz48L2c+PHBhdGggZD0iTTEzLjk5LDMuOTl2MS43M2MyLjIsMCw0LjI5Ljg1LDUuODQsMi40NHMyLjQ0LDMuNjQsMi40NCw1Ljg0LS44NSw0LjI5LTIuNDQsNS44NC0zLjY0LDIuNDQtNS44NCwyLjQ0LTQuMjktLjg1LTUuODQtMi40NC0yLjQxLTMuNjQtMi40MS01Ljg0Ljg1LTQuMjksMi40NC01Ljg0YzEuNTYtMS41NiwzLjY0LTIuNDQsNS44NC0yLjQ0di0xLjczTTEzLjk5LDMuOTljLTUuNTIsMC05Ljk5LDQuNDktOS45OSwxMC4wMXM0LjQ5LDEwLjAxLDEwLjAxLDEwLjAxLDkuOTktNC40OSw5Ljk5LTEwLjAxUzE5LjUxLDMuOTksMTMuOTksMy45OWgwWiIgZmlsbD0idXJsKCNsaW5lYXItZ3JhZGllbnQpIi8+PC9nPjwvc3ZnPg==",
  "Delta": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCIgc3R5bGU9IndpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHg7Ij48cmVjdCB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9IiMwOTQxYTUiLz48cGF0aCBkPSJNMTcuODcsOS43M2MtMS4yMS4zLTIuNDMuNi0zLjY0LjktMi4zNC41OC00LjY5LDEuMTUtNy4wMiwxLjc2LS41My4xNC0uNzEuMDYtLjctLjUxLjAyLTEuNTkuMDItMy4xOCwwLTQuNzcsMC0uNS4xOC0uNjMuNjUtLjYyLDIuNDkuMDIsNC45OC0uMDIsNy40Ny4wMiwzLjQ0LjA1LDYuMywyLjY2LDYuNzgsNi4xMi4zNiwyLjY0LS4xOSw1LTIuMTIsNi45Mi0xLjI4LDEuMjgtMi44OCwxLjkxLTQuNjcsMS45NC0yLjQuMDQtNC44LjAxLTcuMTksMC0uMTksMC0uMzgtLjEtLjU2LS4xNS4xLS4xOS4xNy0uNDEuMzEtLjU2LDMuNDUtMy40Niw2LjkxLTYuOTIsMTAuMzYtMTAuMzguMTYtLjE2LjMtLjM1LjQ2LS41Mi0uMDMtLjA1LS4wNy0uMS0uMS0uMTZaIiBmaWxsPSIjZmZmIi8+PC9zdmc+",
  "Carrefour Banco": "https://api.argentinadatos.com/static/logos/carrefour-banco.png",
  "Mercado Fondo": "https://api.argentinadatos.com/static/logos/mercado-pago.png",
  "LB Finanzas": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiPgogIDxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgc3R5bGU9ImZpbGw6ICM1MjIzOTg7Ii8+CiAgPGc+CiAgICA8cGF0aCBkPSJNNi43MSw3Ljc3bC4zOS40OWMuNTIuNjQsMS4xMS45NiwxLjc1Ljk2LDEuMTksMCwyLjI3LTEuMTIsMi4zOS0xLjMxLDAsLjAyLDAsMCwuMDMtLjA1LTEuNDUtLjkyLTIuODktMS44NC00LjMzLTIuNzctLjI0LS4xNS0uNDgtLjIzLS43Mi0uMDUtLjI0LjE5LS4yMi40My0uMTQuNy4yMi42OC40MywxLjM1LjYzLDIuMDNaIiBzdHlsZT0iZmlsbDogI2ZmZjsiLz4KICAgIDxwYXRoIGQ9Ik0xMiw5LjExYzAsLjM2LS4yLjctLjUxLjg4LTEuNDcuOTUtMi45NiwxLjg5LTQuNDMsMi44NC0uMDcuMDUtLjE0LjA5LS4yMi4xNC0uMTguMTQtLjQ0LjE0LS42MiwwLS4xOS0uMTQtLjI2LS4zOS0uMTgtLjYxLjExLS40LjIzLS43OS4zNi0xLjE5LjE4LS41Ny4zOC0xLjEyLjUtMS43LjA3LS4zLjA3LS42MSwwLS45MSwyLjExLDIuNTksNC42OS0uMzYsNC41OS0uNDMuMzQuMjIuNTEuNTMuNTEuOThaIiBzdHlsZT0iZmlsbDogI2ZmZjsiLz4KICA8L2c+Cjwvc3ZnPg==",
  "Pellegrini": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTggMTgiPgogIDxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgc3R5bGU9ImZpbGw6ICMwMDVmODY7Ii8+CiAgPGc+CiAgICA8cGF0aCBkPSJNOSw0Yy0yLjc2LDAtNSwyLjI0LTUsNXMyLjI0LDUsNSw1LDUtMi4yNCw1LTUtMi4yNC01LTUtNVpNMTEuODIsMTEuOXMwLC4wMS0uMDEuMDFoLTUuNnMtLjAxLDAtLjAxLS4wMXYtLjU2czAtLjAxLjAxLS4wMWg1LjZzLjAxLDAsLjAxLjAxdi41NmgwWk04LjA0LDEwLjQzdi0yLjg0aC42NHYyLjg0aC42M3YtMi44NGguNjR2Mi44NGguNjR2LTIuODRoLjY0djIuODRoLjI5di41OHMwLC4wMS0uMDEuMDFoLTUuMDJzLS4wMSwwLS4wMS0uMDF2LS41OGguMjh2LTIuODRoLjY0djIuODRoLjY0LDBaTTEyLjAxLDYuOTlsLS4xOC4zMXMtLjAyLjAyLS4wMy4wMmgtNS41OXMtLjAyLDAtLjAzLS4wMmwtLjE4LS4zMXMwLS4wMiwwLS4wM2wyLjk4LTEuNThzLjAzLDAsLjA0LDBsMi45OCwxLjU4cy4wMS4wMiwwLC4wM2gwWiIgc3R5bGU9ImZpbGw6ICNmZmY7Ii8+CiAgICA8cGF0aCBkPSJNMTAuNDQsNi43OGwtMS40LS42OHMtLjAyLS4wMS0uMDMtLjAxYzAsMC0uMDIsMC0uMDMsMGwtMS40Mi42OXMwLDAsMCwwaDIuODhzLjAxLDAsMCwwWiIgc3R5bGU9ImZpbGw6ICNmZmY7Ii8+CiAgPC9nPgo8L3N2Zz4=",
};

// Lookup logo for garantizados/especiales by nombre
function getLogoForItem(item) {
  // Direct match by nombre
  if (ENTITY_LOGOS[item.nombre]) return ENTITY_LOGOS[item.nombre];
  // Match Ualá variants
  if (item.nombre && item.nombre.startsWith('Ualá')) return ENTITY_LOGOS['Ualá'];
  // Match exact broker name
  if (item.nombre && item.nombre.toUpperCase() === 'COCOS') return ENTITY_LOGOS['COCOS'];
  return null;
}

// Lookup logo for FCI by entidad
function getLogoForEntity(entidad) {
  if (ENTITY_LOGOS[entidad]) return ENTITY_LOGOS[entidad];
  // Try partial matches
  const lower = entidad.toLowerCase();
  if (lower.includes('cocos')) return ENTITY_LOGOS['Cocos'];
  if (lower.includes('fiwind')) return ENTITY_LOGOS['Fiwind'];
  if (lower.includes('mercado')) return ENTITY_LOGOS['Mercado Fondo'];
  if (lower.includes('pellegrini') || lower.includes('nacion') || lower.includes('nación')) return ENTITY_LOGOS['Pellegrini'];
  return null;
}

async function init() {
  const config = await fetch('/api/config').then(r => r.json());

  const mainList = document.getElementById('main-list');
  mainList.innerHTML = `<div class="loading"><div class="loading-spinner"></div><p>${t('loading_yields')}</p></div>`;

  // Fetch FCI data from ArgentinaDatos (via our serverless function)
  const activeFcis = config.fcis.filter(i => i.activo);
  const [fciResults, modifiedDurationMap] = await Promise.all([
    fetchFCIData(activeFcis),
    fetchFCIModifiedDurations(activeFcis),
  ]);

  // Build garantizados cards data
  const garantizadosCards = config.garantizados.filter(i => i.activo).map(item => ({
    tna: item.tna,
    nombre: item.nombre,
    logoSrc: getLogoForItem(item),
    logo: item.logo,
    logoBg: item.logo_bg,
    card: createCard({
      logo: item.logo, logoBg: item.logo_bg, logoSrc: getLogoForItem(item),
      name: item.nombre,
      tags: [
        { text: t('wallet'), type: 'billetera' },
        ...(item.tipo && item.tipo !== 'Billetera' && item.tipo !== 'Cuenta Remunerada' ? [{ text: item.tipo, type: 'type' }] : []),
        { text: item.limite === 'Sin Límites' ? t('no_limit') : `${t('limit_prefix')}: ${item.limite}`, type: item.limite === 'Sin Límites' ? 'limit no-limit' : 'limit' }
      ],
      rate: `${item.tna.toFixed(2)}%`, rateLabel: t('rate_label'),
      rateDate: t('valid_since', { date: item.vigente_desde })
    })
  }));

  // Build FCI cards data
  const fciCards = fciResults.map((item, idx) => ({
    tna: item.tna,
    nombre: item.nombre,
    logoSrc: getLogoForEntity(item.entidad),
    logo: item.entidad.substring(0, 2).toUpperCase(),
    logoBg: stringToColor(item.entidad),
    card: createCard({
      logo: item.entidad.substring(0, 2).toUpperCase(),
      logoBg: stringToColor(item.entidad), logoSrc: getLogoForEntity(item.entidad),
      name: item.nombre, entity: item.entidad,
      tags: [
        { text: item.categoria, type: 'category' },
        { text: `${t('assets')}: ${formatPatrimonio(item.patrimonio)}`, type: '' },
        { text: `${t('modified_duration')}: ${modifiedDurationMap[item.nombre] != null ? formatModifiedDuration(modifiedDurationMap[item.nombre]) : t('unavailable')}`, type: '' }
      ],
      rate: `${item.tna.toFixed(2)}%`, rateLabel: t('rate_label'),
      rateDate: item.fechaDesde && item.fechaHasta ? t('between_dates', { from: item.fechaDesde, to: item.fechaHasta }) : '',
      extraMeta: modifiedDurationMap[item.nombre] != null ? `${t('modified_duration')}: ${formatModifiedDuration(modifiedDurationMap[item.nombre])}` : ''
    })
  }));

  // Merge and sort all by TNA descending
  const all = [...garantizadosCards, ...fciCards].sort((a, b) => b.tna - a.tna);

  mainList.innerHTML = '';
  if (all.length === 0) {
    mainList.innerHTML = `<div class="loading">${t('no_data')}</div>`;
  } else {
    all.forEach(item => mainList.appendChild(item.card));
  }

  // Render bar chart
  renderRendimientosChart(all);

  // Render especiales at the bottom
  renderEspeciales(config.especiales.filter(i => i.activo));
}

function renderRendimientosChart(items, containerId) {
  const container = document.getElementById(containerId || 'rendimientos-chart');
  if (!container || items.length === 0) return;

  // Sort descending: highest on top
  const sorted = [...items].sort((a, b) => b.tna - a.tna);
  const maxTna = Math.max(...sorted.map(i => i.tna));
  const minTna = Math.min(...sorted.map(i => i.tna));

  // Gradient from vibrant green (top) to muted (bottom)
  function getBarColor(tna) {
    const ratio = (tna - minTna) / (maxTna - minTna || 1);
    const h = 160; // green hue
    const s = 45 + ratio * 30;  // 45% to 75% saturation
    const l = 55 - ratio * 15;  // 55% to 40% lightness
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  const rows = sorted.map(item => {
    const chartMin = 10;
    const pct = Math.max(8, ((item.tna - chartMin) / (maxTna - chartMin)) * 100);
    const color = getBarColor(item.tna);
    const safeChartLogoSrc = item.logoSrc?.replace(/^http:\/\//, 'https://');
    const logoInner = safeChartLogoSrc
      ? `<img src="${safeChartLogoSrc}" alt="${item.nombre}" onerror="this.parentElement.textContent='${item.logo}'">`
      : item.logo;
    const logoBg = safeChartLogoSrc ? 'transparent' : item.logoBg;

    return `
      <div class="chart-row">
        <div class="chart-logo" style="background:${logoBg}">${logoInner}</div>
        <div class="chart-bar-wrap">
          <div class="chart-bar" style="width:${pct}%;background:${color}">
            <span class="chart-value">${item.tna.toFixed(2)}%</span>
          </div>
        </div>
      </div>`;
  }).join('');

  container.innerHTML = rows;
}

function createCard({ logo, logoBg, logoSrc, name, entity, description, tags, rate, rateLabel, rateDate, highlighted, extraMeta }) {
  const card = document.createElement('div');
  card.className = 'fund-card' + (highlighted ? ' highlighted' : '');

  const tagsHTML = tags.map(t => {
    let cls = 'tag';
    if (t.type) cls += ' ' + t.type;
    return `<span class="${cls}">${t.text}</span>`;
  }).join('');

  const descHTML = description ? `<div class="fund-description">${description}</div>` : '';
  const entityHTML = entity ? `<div class="fund-entity">${entity}</div>` : '';
  const extraMetaHTML = extraMeta ? `<div class="fund-extra-meta">${extraMeta}</div>` : '';

  // Use real logo image if available, otherwise fallback to initials
  // Fix mixed content: upgrade http:// to https:// for BCRA logos
  const safeLogoSrc = logoSrc?.replace(/^http:\/\//, 'https://');
  const logoInner = safeLogoSrc
    ? `<img src="${safeLogoSrc}" alt="${name}">`
    : logo;

  card.innerHTML = `
    <div class="fund-logo" style="background:${safeLogoSrc ? 'transparent' : logoBg}">${logoInner}</div>
    <div class="fund-info">
      <div class="fund-name">${name}</div>
      ${entityHTML}
      ${descHTML}
      <div class="fund-tags">${tagsHTML}</div>
      ${extraMetaHTML}
    </div>
    <div class="fund-rate">
      <div class="rate-value">${rate}</div>
      <div class="rate-label">${rateLabel}</div>
      <div class="rate-date">${rateDate}</div>
    </div>
  `;

  // Add error handler for logo images
  if (safeLogoSrc) {
    const img = card.querySelector('.fund-logo img');
    if (img) {
      img.onerror = function() {
        const parent = this.parentElement;
        this.remove();
        parent.style.background = logoBg;
        parent.textContent = logo;
      };
    }
  }

  return card;
}

async function fetchFCIData(activeFcis) {
  try {
    const resp = await fetch('/api/fci');
    const { data } = await resp.json();
    if (!data) return [];
    // Match API results to our configured funds by name
    const activeNames = new Set(activeFcis.map(f => f.nombre));
    return data
      .filter(f => activeNames.has(f.nombre))
      .map(f => {
        const cfg = activeFcis.find(c => c.nombre === f.nombre);
        return {
          ...cfg,
          tna: f.tna,
          patrimonio: f.patrimonio,
          fechaDesde: f.fechaDesde,
          fechaHasta: f.fechaHasta,
        };
      });
  } catch (e) {
    console.error('Error fetching FCI data:', e);
    return [];
  }
}

function formatModifiedDuration(value) {
  return Number(value).toLocaleString(currentLanguage === 'en' ? 'en-US' : 'es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function translateAppText(key) {
  return t(key);
}

function calcModifiedDuration(duration, ratePct) {
  const rate = Number(ratePct) / 100;
  if (!Number.isFinite(duration) || !Number.isFinite(rate)) return null;
  return duration / (1 + rate);
}

function calcTEM(ratePct) {
  const annualRate = Number(ratePct) / 100;
  if (!Number.isFinite(annualRate) || annualRate <= -1) return null;
  return (Math.pow(1 + annualRate, 1 / 12) - 1) * 100;
}

function renderEspeciales(items) {
  const container = document.getElementById('especiales-list');
  container.innerHTML = '';

  items.sort((a, b) => b.tna - a.tna).forEach(item => {
    const logoSrc = getLogoForItem(item);
    const card = createCard({
      logo: item.logo,
      logoBg: item.logo_bg,
      logoSrc,
      name: item.nombre,
      description: item.descripcion,
      tags: [
        { text: item.tipo, type: 'type' },
        { text: `${t('limit_prefix')}: ${item.limite}`, type: 'limit' }
      ],
      rate: `${item.tna.toFixed(2)}%`,
      rateLabel: t('rate_label'),
      rateDate: t('valid_since', { date: item.vigente_desde })
    });
    container.appendChild(card);
  });
}

function formatPatrimonio(value) {
  if (!value) return '—';
  const num = parseFloat(value);
  if (num >= 1e12) return `${(num / 1e12).toFixed(1)} B`;
  if (num >= 1e9) return `${Math.round(num / 1e9)} mil M`;
  if (num >= 1e6) return `${Math.round(num / 1e6)} M`;
  if (num >= 1e3) return `${Math.round(num / 1e3)} K`;
  return num.toString();
}

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 55%, 45%)`;
}

// ─── Tab switching ───
function setupTabs() {
  const tabs = document.querySelectorAll('.subnav-tab[data-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const target = tab.dataset.tab;
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      document.getElementById('tab-plazofijo').style.display = target === 'plazofijo' ? '' : 'none';
      document.getElementById('tab-lecaps').style.display = target === 'lecaps' ? '' : 'none';
      document.getElementById('tab-cer').style.display = target === 'cer' ? '' : 'none';
      document.getElementById('tab-soberanos').style.display = 'none';

      const hero = document.getElementById('hero');
      if (target === 'plazofijo') {
        hero.querySelector('h1').textContent = t('time_deposit_title');
        hero.querySelector('p').textContent = t('time_deposit_desc');
        if (!document.getElementById('plazofijo-list').hasChildNodes()) {
          loadPlazoFijo();
        }
      } else if (target === 'lecaps') {
      hero.querySelector('h1').textContent = t('lecaps_title');
        hero.querySelector('p').textContent = t('lecaps_hero_desc');
        if (!document.getElementById('lecaps-list').hasChildNodes()) {
          loadLecaps();
        }
      } else if (target === 'cer') {
        hero.querySelector('h1').textContent = t('cer_title');
        hero.querySelector('p').textContent = t('cer_hero_desc');
        if (!document.getElementById('cer-list').hasChildNodes()) {
          loadCER();
        }
      }
      // Update hash for sub-tabs
      location.hash = target === 'plazofijo' ? 'ars' : target;
    });
  });

  // Header-level switching
  const headerArs = document.getElementById('header-ars');
  const subnav = document.querySelector('.subnav');
  const hero = document.getElementById('hero');

  const headerSoberanos = document.getElementById('header-soberanos');
  const headerONs = document.getElementById('header-ons');
  const headerOptimizer = document.getElementById('header-optimizer');
  const headerHeatmap = document.getElementById('header-heatmap');
  const headerCompound = document.getElementById('header-compound');
  const headerMundo = document.getElementById('header-mundo');

  const headerPortfolio = document.getElementById('header-portfolio');

  function hideAllTabs() {
    document.getElementById('tab-plazofijo').style.display = 'none';
    document.getElementById('tab-lecaps').style.display = 'none';
    document.getElementById('tab-cer').style.display = 'none';
    document.getElementById('tab-ons').style.display = 'none';
    document.getElementById('tab-optimizer').style.display = 'none';
    document.getElementById('tab-heatmap').style.display = 'none';
    document.getElementById('tab-compound').style.display = 'none';
    document.getElementById('tab-soberanos').style.display = 'none';
    document.getElementById('section-mundo').style.display = 'none';
    document.getElementById('tab-portfolio').style.display = 'none';
    [headerArs, headerSoberanos, headerONs, headerOptimizer, headerHeatmap, headerCompound, headerMundo, headerPortfolio].forEach(b => b && b.classList.remove('active'));
    hero.style.display = '';
  }

  function updatePageTitle(section) {
    const base = 'BDI Consultora';
    const titles = {
      mundo: currentLanguage === 'en' ? 'Market overview' : 'Panorama de mercado',
      ars: currentLanguage === 'en' ? 'Liquidity' : 'Liquidez',
      bonos: currentLanguage === 'en' ? 'USD fixed income' : 'Renta fija USD',
      plazofijo: t('time_deposit_title'),
      lecaps: currentLanguage === 'en' ? 'ARS fixed income' : 'Renta fija ARS',
      ons: t('ons_title'),
      optimizer: currentLanguage === 'en' ? 'Portfolio optimizer' : 'Optimizador de carteras',
      heatmap: t('heatmap_title'),
      compound: t('compound_title'),
      portfolio: currentLanguage === 'en' ? 'My portfolio' : 'Mi cartera'
    };
    document.title = titles[section] ? `${titles[section]} — ${base}` : base;
  }

  function switchToPortfolio() {
    hideAllTabs();
    headerPortfolio.classList.add('active');
    subnav.style.display = 'none';
    document.getElementById('tab-portfolio').style.display = 'block';
    hero.querySelector('h1').textContent = '';
    hero.querySelector('p').textContent = '';
    hero.style.display = 'none';
    updatePageTitle('portfolio');
    if (currentUser) {
      document.getElementById('portfolio-login-prompt').style.display = 'none';
      document.getElementById('portfolio-content').style.display = '';
      loadPortfolio();
    } else {
      document.getElementById('portfolio-login-prompt').style.display = '';
      document.getElementById('portfolio-content').style.display = 'none';
    }
  }

  function switchToArs() {
    hideAllTabs();
    headerArs.classList.add('active');
    subnav.style.display = '';
    // Show whichever ARS tab was active
    const activeTab = document.querySelector('.subnav-tab.active');
    if (activeTab) {
      const target = activeTab.dataset.tab;
      document.getElementById('tab-plazofijo').style.display = target === 'plazofijo' ? '' : 'none';
      document.getElementById('tab-lecaps').style.display = target === 'lecaps' ? '' : 'none';
      document.getElementById('tab-cer').style.display = target === 'cer' ? '' : 'none';
    } else {
      document.getElementById('tab-plazofijo').style.display = '';
      document.getElementById('tab-lecaps').style.display = 'none';
      document.getElementById('tab-cer').style.display = 'none';
    }
    // Restore hero
    const activeSubtab = document.querySelector('.subnav-tab.active');
    if (activeSubtab && activeSubtab.dataset.tab === 'plazofijo') {
      hero.querySelector('h1').textContent = t('time_deposit_title');
      hero.querySelector('p').textContent = t('time_deposit_desc');
    } else if (activeSubtab && activeSubtab.dataset.tab === 'lecaps') {
      hero.querySelector('h1').textContent = currentLanguage === 'en' ? 'ARS fixed income' : 'Renta fija ARS';
      hero.querySelector('p').textContent = t('lecaps_hero_desc');
    } else if (activeSubtab && activeSubtab.dataset.tab === 'cer') {
      hero.querySelector('h1').textContent = t('cer_title');
      hero.querySelector('p').textContent = t('cer_hero_desc');
    } else {
      hero.querySelector('h1').textContent = t('time_deposit_title');
      hero.querySelector('p').textContent = t('time_deposit_desc');
    }
    const sub = document.querySelector('.subnav-tab.active')?.dataset.tab || 'plazofijo';
    updatePageTitle(sub === 'plazofijo' ? 'ars' : sub);
  }

  function switchToSoberanos() {
    hideAllTabs();
    headerSoberanos.classList.add('active');
    subnav.style.display = 'none';
    document.getElementById('tab-soberanos').style.display = 'block';
    hero.querySelector('h1').textContent = currentLanguage === 'en' ? translateAppText('usd_sovereigns_title') : 'Renta fija USD';
    hero.querySelector('p').textContent = currentLanguage === 'en'
      ? translateAppText('usd_sovereigns_desc')
      : 'Rendimiento de bonos soberanos argentinos en dólares. Ley local y ley extranjera.';
    updatePageTitle('bonos');
    if (!document.getElementById('soberanos-list').hasChildNodes()) {
      loadSoberanos();
    }
  }

  function switchToMundo() {
    hideAllTabs();
    headerMundo.classList.add('active');
    subnav.style.display = 'none';
    document.getElementById('section-mundo').style.display = '';
    hero.querySelector('h1').textContent = currentLanguage === 'en' ? translateAppText('market_overview') : 'Panorama de mercado';
    hero.querySelector('p').textContent = currentLanguage === 'en'
      ? translateAppText('world_indicators')
      : 'Principales indicadores del mercado mundial en tiempo real.';
    updatePageTitle('mundo');
    if (!document.getElementById('mundo-grid').hasChildNodes()) {
      loadMundo();
      loadHotMovers();
    }
    if (!document.getElementById('news-grid')?.hasChildNodes()) {
      loadNewsSection();
    }
  }

  function switchToONs() {
    hideAllTabs();
    headerONs.classList.add('active');
    subnav.style.display = 'none';
    document.getElementById('tab-ons').style.display = 'block';
    hero.querySelector('h1').textContent = t('ons_title');
    hero.querySelector('p').textContent = t('ons_hero_desc');
    updatePageTitle('ons');
    if (!document.getElementById('ons-list').hasChildNodes()) {
      loadONs();
    }
  }

  function switchToOptimizer() {
    hideAllTabs();
    headerOptimizer.classList.add('active');
    subnav.style.display = 'none';
    document.getElementById('tab-optimizer').style.display = 'block';
    hero.querySelector('h1').textContent = currentLanguage === 'en' ? 'Portfolio optimizer' : 'Optimizador de carteras';
    hero.querySelector('p').textContent = currentLanguage === 'en'
      ? 'Run a Markowitz allocation model with custom tickers, efficient frontier and optimized portfolio comparisons.'
      : 'Corre un modelo de Markowitz con tickers propios, frontera eficiente y comparacion de carteras optimizadas.';
    updatePageTitle('optimizer');
  }

  function switchToCompound() {
    hideAllTabs();
    headerCompound.classList.add('active');
    subnav.style.display = 'none';
    document.getElementById('tab-compound').style.display = 'block';
    hero.querySelector('h1').textContent = t('compound_title');
    hero.querySelector('p').textContent = t('compound_hero_desc');
    updatePageTitle('compound');
  }

  function switchToHeatmap() {
    hideAllTabs();
    headerHeatmap.classList.add('active');
    subnav.style.display = 'none';
    document.getElementById('tab-heatmap').style.display = 'block';
    hero.querySelector('h1').textContent = t('heatmap_title');
    hero.querySelector('p').textContent = t('heatmap_hero_desc');
    updatePageTitle('heatmap');
    loadHeatmapV2();
  }

  if (headerArs) headerArs.addEventListener('click', (e) => { e.preventDefault(); switchToArs(); location.hash = 'ars'; });
  if (headerSoberanos) headerSoberanos.addEventListener('click', (e) => { e.preventDefault(); switchToSoberanos(); location.hash = 'bonos'; });
  if (headerONs) headerONs.addEventListener('click', (e) => { e.preventDefault(); switchToONs(); location.hash = 'ons'; });
  if (headerOptimizer) headerOptimizer.addEventListener('click', (e) => { e.preventDefault(); switchToOptimizer(); location.hash = 'optimizer'; });
  if (headerHeatmap) headerHeatmap.addEventListener('click', (e) => { e.preventDefault(); switchToHeatmap(); location.hash = 'heatmap'; });
  if (headerCompound) headerCompound.addEventListener('click', (e) => { e.preventDefault(); switchToCompound(); location.hash = 'compound'; });
  if (headerMundo) headerMundo.addEventListener('click', (e) => { e.preventDefault(); switchToMundo(); location.hash = 'mundo'; });
  if (headerPortfolio) headerPortfolio.addEventListener('click', (e) => { e.preventDefault(); switchToPortfolio(); location.hash = 'portfolio'; });
  window._switchToPortfolio = switchToPortfolio;

  // Handle initial hash on page load
  const initialHash = location.hash.replace('#', '');
  if (initialHash === 'ars') switchToArs();
  else if (initialHash === 'bonos') switchToSoberanos();
  else if (initialHash === 'plazofijo') { switchToArs(); document.querySelector('.subnav-tab[data-tab="plazofijo"]')?.click(); }
  else if (initialHash === 'lecaps') { switchToArs(); document.querySelector('.subnav-tab[data-tab="lecaps"]')?.click(); }
  else if (initialHash === 'cer') { switchToArs(); document.querySelector('.subnav-tab[data-tab="cer"]')?.click(); }
  else if (initialHash === 'ons') switchToONs();
  else if (initialHash === 'optimizer') switchToOptimizer();
  else if (initialHash === 'heatmap') switchToHeatmap();
  else if (initialHash === 'compound') switchToCompound();
  else if (initialHash === 'portfolio') switchToPortfolio();

  // Handle back/forward navigation (skip if subnav tab already active)
  let _hashChanging = false;
  window.addEventListener('hashchange', () => {
    if (_hashChanging) return;
    _hashChanging = true;
    const h = location.hash.replace('#', '');
    if (h === 'ars') switchToArs();
    else if (h === 'bonos') switchToSoberanos();
    else if (h === 'plazofijo') { switchToArs(); document.querySelector('.subnav-tab[data-tab="plazofijo"]')?.click(); }
    else if (h === 'lecaps') { switchToArs(); document.querySelector('.subnav-tab[data-tab="lecaps"]')?.click(); }
    else if (h === 'cer') { switchToArs(); document.querySelector('.subnav-tab[data-tab="cer"]')?.click(); }
    else if (h === 'ons') switchToONs();
    else if (h === 'optimizer') switchToOptimizer();
    else if (h === 'heatmap') switchToHeatmap();
    else if (h === 'compound') switchToCompound();
    else if (h === 'portfolio') switchToPortfolio();
    else switchToMundo();
    _hashChanging = false;
  });
}

// ─── Keyboard navigation for subnav tabs ───
function setupKeyboardNav() {
  const tablist = document.querySelector('.subnav');
  if (!tablist) return;
  tablist.setAttribute('role', 'tablist');

  const tabs = Array.from(tablist.querySelectorAll('.subnav-tab[data-tab]'));
  tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');
    tab.addEventListener('keydown', (e) => {
      let next = -1;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      if (next === -1) return;
      e.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    });
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('tabindex', '-1'));
      tab.setAttribute('tabindex', '0');
    });
  });
}

// ─── Plazo Fijo section ───
async function loadPlazoFijo() {
  const container = document.getElementById('plazofijo-list');
  container.innerHTML = `<div class="loading"><div class="loading-spinner"></div><p>${t('loading_rates')}</p></div>`;

  try {
    const res = await fetch('https://api.argentinadatos.com/v1/finanzas/tasas/plazoFijo');
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const bancos = await res.json();
    if (!bancos || !bancos.length) {
      container.innerHTML = `<div class="loading">${t('no_data')}</div>`;
      return;
    }

    // Normalize API data: rates come as decimals (0.23 = 23%)
    const normalized = bancos.map(b => ({
      nombre: b.entidad,
      tna_clientes: b.tnaClientes != null ? Math.round(b.tnaClientes * 100 * 100) / 100 : null,
      tna_no_clientes: b.tnaNoClientes != null ? Math.round(b.tnaNoClientes * 100 * 100) / 100 : null,
      enlace: b.enlace,
      logo: b.logo,
    }));

    // Sort by best available rate, Banco Voii first on ties, then alphabetically
    const PROMOTED = ["BANCO VOII S.A."];
    const sorted = [...normalized].sort((a, b) => {
      const rateA = Math.max(a.tna_no_clientes || 0, a.tna_clientes || 0);
      const rateB = Math.max(b.tna_no_clientes || 0, b.tna_clientes || 0);
      if (rateB !== rateA) return rateB - rateA;
      const promoA = PROMOTED.includes(a.nombre) ? -1 : 0;
      const promoB = PROMOTED.includes(b.nombre) ? -1 : 0;
      if (promoA !== promoB) return promoA - promoB;
      return a.nombre.localeCompare(b.nombre);
    });

    container.innerHTML = '';
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    sorted.forEach((banco, idx) => {
      const displayName = formatBankName(banco.nombre);
      const initials = displayName.replace(/^Banco\s*/i, '').substring(0, 2).toUpperCase();
      const bestRate = Math.max(banco.tna_clientes || 0, banco.tna_no_clientes || 0);

      const tags = [];
      if (banco.enlace) {
        tags.push({ text: 'Plazo Fijo Online', type: 'billetera' });
      }

      const card = createCard({
        logo: initials,
        logoBg: stringToColor(banco.nombre),
        logoSrc: banco.logo || null,
        name: displayName,
        tags,
        rate: `${bestRate.toFixed(1)}%`,
        rateLabel: 'TNA',
        rateDate: `Actualizado: ${dateStr}`
      });

      if (PROMOTED.includes(banco.nombre)) card.classList.add('promoted');

      if (banco.enlace) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => window.open(banco.enlace, '_blank', 'noopener,noreferrer'));
      }

      container.appendChild(card);
    });

    // Source note
    const source = document.getElementById('plazofijo-source');
    if (source) source.textContent = currentLanguage === 'en'
      ? 'Source: ArgentinaDatos. Rates published by each bank.'
      : 'Fuente: ArgentinaDatos. Tasas publicadas por banco.';

    // Render plazo fijo chart
    const chartItems = sorted.map(banco => {
      const displayName = formatBankName(banco.nombre);
      return {
        tna: Math.max(banco.tna_clientes || 0, banco.tna_no_clientes || 0),
        nombre: displayName,
        logoSrc: banco.logo || null,
        logo: displayName.replace(/^Banco\s*/i, '').substring(0, 2).toUpperCase(),
        logoBg: stringToColor(banco.nombre)
      };
    });
    renderRendimientosChart(chartItems, 'plazofijo-chart');
  } catch (e) {
    console.error('Error loading plazo fijo:', e);
    container.innerHTML = `<div class="loading">${t('rates_error')}</div>`;
  }
}

// Format API bank names to shorter display names
function formatBankName(name) {
  const MAP = {
    'BANCO DE LA NACION ARGENTINA': 'Banco Nación',
    'BANCO SANTANDER ARGENTINA S.A.': 'Banco Santander',
    'BANCO DE GALICIA Y BUENOS AIRES S.A.': 'Banco Galicia',
    'BANCO DE LA PROVINCIA DE BUENOS AIRES': 'Banco Provincia',
    'BANCO BBVA ARGENTINA S.A.': 'BBVA Argentina',
    'BANCO MACRO S.A.': 'Banco Macro',
    'BANCO CREDICOOP COOPERATIVO LIMITADO': 'Banco Credicoop',
    'INDUSTRIAL AND COMMERCIAL BANK OF CHINA (ARGENTINA) S.A.U.': 'ICBC Argentina',
    'BANCO DE LA CIUDAD DE BUENOS AIRES': 'Banco Ciudad',
    'BANCO BICA S.A.': 'Banco BICA',
    'BANCO CMF S.A.': 'Banco CMF',
    'BANCO COMAFI SOCIEDAD ANONIMA': 'Banco Comafi',
    'BANCO DE COMERCIO S.A.': 'Banco de Comercio',
    'BANCO DE CORRIENTES S.A.': 'Banco de Corrientes',
    'BANCO DE FORMOSA S.A.': 'Banco de Formosa',
    'BANCO DE LA PROVINCIA DE CORDOBA S.A.': 'Banco de Córdoba',
    'BANCO DEL CHUBUT S.A.': 'Banco del Chubut',
    'BANCO DEL SOL S.A.': 'Banco del Sol',
    'BANCO DINO S.A.': 'Banco Dino',
    'BANCO HIPOTECARIO S.A.': 'Banco Hipotecario',
    'BANCO JULIO SOCIEDAD ANONIMA': 'Banco Julio',
    'BANCO MARIVA S.A.': 'Banco Mariva',
    'BANCO MASVENTAS S.A.': 'Banco Masventas',
    'BANCO MERIDIAN S.A.': 'Banco Meridian',
    'BANCO PROVINCIA DE TIERRA DEL FUEGO': 'Banco Tierra del Fuego',
    'BANCO VOII S.A.': 'Banco Voii',
    'BIBANK S.A.': 'Bibank',
    'CRÉDITO REGIONAL COMPAÑÍA FINANCIERA S.A.U.': 'Crédito Regional',
    'REBA COMPAÑIA FINANCIERA S.A.': 'Reba',
    'UALA': 'Ualá',
  };
  return MAP[name] || name;
}

// ─── LECAPs section ───

// Parse YYYY-MM-DD as local date (not UTC)
function parseLocalDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

// Format date as YYYY-MM-DD local
function toLocalISO(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// Get next business day (skip weekends + AR holidays)
function getSettlementDate(from) {
  // Argentine holidays 2026-2027 (fixed + moveable + puentes)
  const holidays = [
    '2026-03-23','2026-03-24','2026-04-02','2026-04-03',
    '2026-05-01','2026-05-25','2026-06-15','2026-06-20',
    '2026-07-09','2026-08-17','2026-10-12','2026-11-23',
    '2026-12-07','2026-12-08','2026-12-25','2027-01-01',
  ];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let steps = 0;
  while (steps < 1) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    const iso = toLocalISO(d);
    if (holidays.includes(iso)) continue;
    steps++;
  }
  return d;
}

async function loadLecaps() {
  const container = document.getElementById('lecaps-list');
  container.innerHTML = `<div class="loading"><div class="loading-spinner"></div><p>Cargando LECAPs...</p></div>`;

  try {
    // Fetch config (fallback prices) and live BYMA data in parallel
    const [config, bymaRes] = await Promise.all([
      fetch('/api/config').then(r => r.json()),
      fetch('/api/lecaps').then(r => r.ok ? r.json() : { data: [] }).catch(() => ({ data: [] }))
    ]);

    const lecaps = getLecapMetadataConfig(config);
    if (!lecaps || !lecaps.letras || !lecaps.letras.length) {
      container.innerHTML = '<div class="loading">No se pudieron cargar los datos de LECAPs.</div>';
      return;
    }

    // Build live price lookup from BYMA
    const livePrices = {};
    for (const item of (bymaRes.data || [])) {
      livePrices[item.symbol] = item.price;
    }
    const hasLive = Object.keys(livePrices).length > 0;

    // Settlement is T+1 business day
    const today = new Date();
    const settlement = getSettlementDate(today);

    const items = lecaps.letras
      .filter(l => l.activo)
      .map(l => {
        // Use live price if available, fallback to config
        const precio = livePrices[l.ticker] || l.precio;
        const vto = parseLocalDate(l.fecha_vencimiento);
        const dias = Math.round((vto - settlement) / (1000 * 60 * 60 * 24));
        if (!isFinite(precio) || precio <= 0 || !vto || dias <= 0) return null;
        const ganancia = l.pago_final / precio;
        const tna = (ganancia - 1) * (365 / dias) * 100;
        const tir = (Math.pow(ganancia, 365 / dias) - 1) * 100;
        const tem = calcTEM(tir);
        const duration = dias / 365;
        const modifiedDuration = calcModifiedDuration(duration, tir);
        return { ...l, precio, dias, tna, tir, tem, duration, modifiedDuration, live: !!livePrices[l.ticker] };
      })
      .filter(Boolean);

    // Sort by days to maturity (ascending)
    items.sort((a, b) => a.dias - b.dias);

    // Render table
    const bestTir = Math.max(...items.map(i => i.tir));
    const settlStr = `${String(settlement.getDate()).padStart(2,'0')}/${String(settlement.getMonth()+1).padStart(2,'0')}/${settlement.getFullYear()}`;
    const rows = items.map(l => {
      const isBoncap = l.ticker.startsWith('T');
      const tipo = isBoncap ? 'boncap' : 'lecap';
      const isHighlighted = l.tir === bestTir ? ' highlighted-row' : '';
      const vtoDate = parseLocalDate(l.fecha_vencimiento);
      const vtoStr = `${String(vtoDate.getDate()).padStart(2,'0')}/${String(vtoDate.getMonth()+1).padStart(2,'0')}/${vtoDate.getFullYear()}`;
      return `<tr class="${isHighlighted}">
        <td><span class="lecap-ticker">${l.ticker}</span><span class="lecap-type-badge ${tipo}">${tipo.toUpperCase()}</span></td>
        <td>${l.precio.toFixed(2)}</td>
        <td>${l.pago_final.toFixed(3)}</td>
        <td>${l.dias}</td>
        <td>${vtoStr}</td>
        <td class="lecap-tna">${l.tna.toFixed(2)}%</td>
        <td class="col-tem">${l.tem != null ? `${l.tem.toFixed(2)}%` : '—'}</td>
        <td class="lecap-tir">${l.tir.toFixed(2)}%</td>
        <td class="col-duration">${l.duration.toFixed(2)}</td>
        <td class="col-mod-duration">${l.modifiedDuration.toFixed(2)}</td>
      </tr>`;
    }).join('');

    container.innerHTML = `
      <div class="lecap-table-wrap">
        <table class="lecap-table">
          <thead>
            <tr>
              <th class="col-ticker">Ticker</th>
              <th class="col-precio">${t('lecap_col_price')}</th>
              <th class="col-pago">${t('lecap_col_final_payment')}</th>
              <th class="col-dias">${t('lecap_col_days')}</th>
              <th class="col-vto">${t('lecap_col_maturity')}</th>
              <th class="col-tna">TNA</th>
              <th class="col-tem">TEM</th>
              <th class="col-tir">TIR</th>
              <th class="col-duration">Duration</th>
              <th class="col-mod-duration">Dur. Mod.</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <p class="calc-hint">💡 ${t('lecaps_calc_hint')}</p>
      <p style="font-size:0.7rem;color:var(--text-tertiary);margin-top:6px">${t('settlement_note', { date: settlStr })}</p>`;

    // Make table sortable
    const table = container.querySelector('.lecap-table');
    if (table) makeSortable(table);

    // Add click handlers for calculator
    container.querySelectorAll('tbody tr').forEach((row, idx) => {
      row.style.cursor = 'pointer';
      row.addEventListener('click', () => {
        const item = items[idx];
        if (item) openLecapCalculator(item);
      });
    });

    // Source note
    const source = document.getElementById('lecaps-source');
    const liveCount = items.filter(i => i.live).length;
    if (source) {
      if (hasLive) {
        source.textContent = t('live_prices_source');
      } else {
        source.textContent = t('no_live_prices_source');
      }
    }

    // Render scatter plot (TIR vs Días)
    (window.renderLecapScatter || renderLecapScatter)(items);
  } catch (e) {
    console.error('Error loading LECAPs:', e);
    container.innerHTML = `<div class="loading">${t('lecaps_error')}</div>`;
  }
}

function renderLecapScatter(items) {
  const canvas = document.getElementById('lecaps-scatter');
  if (!canvas || typeof Chart === 'undefined') return;

  const textColor = '#555555';
  const gridColor = '#1a1a1a';

  const lecapData = items.filter(l => !l.ticker.startsWith('T'));
  const boncapData = items.filter(l => l.ticker.startsWith('T'));

  // Polynomial regression (degree 2) for trend curve
  const allPoints = items.map(l => [l.dias, l.tir]).sort((a, b) => a[0] - b[0]);
  const curve = fitPolyCurve(allPoints, 2, 50);

  new Chart(canvas, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: t('lecap_curve_label'),
          data: curve,
          type: 'line',
          borderColor: isDark ? 'rgba(160,160,168,0.4)' : 'rgba(0,0,0,0.15)',
          borderWidth: 2,
          borderDash: [6, 3],
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.4,
          fill: false,
          order: 2,
        },
        {
          label: t('lecap_label'),
          data: lecapData.map(l => ({ x: l.dias, y: l.tir, ticker: l.ticker })),
          backgroundColor: '#00d26a',
          borderColor: '#00d26a',
          pointRadius: 7,
          pointHoverRadius: 10,
          order: 1,
        },
        {
          label: t('boncap_label'),
          data: boncapData.map(l => ({ x: l.dias, y: l.tir, ticker: l.ticker })),
          backgroundColor: '#4da6ff',
          borderColor: '#4da6ff',
          pointRadius: 7,
          pointHoverRadius: 10,
          pointStyle: 'rectRounded',
          order: 1,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 10, right: 20, bottom: 5, left: 5 } },
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: { family: "'Inter', sans-serif", size: 12 },
            filter: (item) => item.text !== t('lecap_curve_label')
          }
        },
        tooltip: {
          filter: (item) => item.dataset.label !== t('lecap_curve_label'),
          callbacks: {
            label: (ctx) => {
              const p = ctx.raw;
              return t('lecap_tooltip', { ticker: p.ticker, tir: p.y.toFixed(2), days: p.x });
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: t('lecap_x_title'), color: textColor, font: { family: "'Inter', sans-serif", size: 12 } },
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: "'Inter', sans-serif" } }
        },
        y: {
          title: { display: true, text: t('lecap_y_title'), color: textColor, font: { family: "'Inter', sans-serif", size: 12 } },
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: "'Inter', sans-serif" }, callback: v => v.toFixed(1) + '%' }
        }
      }
    }
  });
}

// Fit polynomial of given degree, return n evenly-spaced {x,y} points
function fitPolyCurve(points, degree, n) {
  const xs = points.map(p => p[0]);
  const ys = points.map(p => p[1]);
  const m = degree + 1;

  // Build normal equations (Vandermonde)
  const A = [];
  const B = [];
  for (let i = 0; i < m; i++) {
    A[i] = [];
    for (let j = 0; j < m; j++) {
      A[i][j] = xs.reduce((s, x) => s + Math.pow(x, i + j), 0);
    }
    B[i] = xs.reduce((s, x, k) => s + ys[k] * Math.pow(x, i), 0);
  }

  // Gaussian elimination
  for (let i = 0; i < m; i++) {
    let maxRow = i;
    for (let k = i + 1; k < m; k++) if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
    [A[i], A[maxRow]] = [A[maxRow], A[i]];
    [B[i], B[maxRow]] = [B[maxRow], B[i]];
    for (let k = i + 1; k < m; k++) {
      const f = A[k][i] / A[i][i];
      for (let j = i; j < m; j++) A[k][j] -= f * A[i][j];
      B[k] -= f * B[i];
    }
  }
  const coeffs = new Array(m);
  for (let i = m - 1; i >= 0; i--) {
    coeffs[i] = B[i];
    for (let j = i + 1; j < m; j++) coeffs[i] -= A[i][j] * coeffs[j];
    coeffs[i] /= A[i][i];
  }

  // Generate curve points
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const result = [];
  for (let i = 0; i <= n; i++) {
    const x = minX + (maxX - minX) * (i / n);
    let y = 0;
    for (let j = 0; j < m; j++) y += coeffs[j] * Math.pow(x, j);
    result.push({ x: Math.round(x), y });
  }
  return result;
}

// ─── Soberanos USD section ───

async function loadSoberanos() {
  const container = document.getElementById('soberanos-list');
  container.innerHTML = `<div class="loading"><div class="loading-spinner"></div><p>${currentLanguage === 'en' ? translateAppText('sovereigns_loading') : 'Cargando bonos soberanos...'}</p></div>`;

  try {
    const [config, apiRes] = await Promise.all([
      fetch('/api/config').then(r => r.json()),
      fetch('/api/soberanos').then(r => r.ok ? r.json() : { data: [] }).catch(() => ({ data: [] }))
    ]);

    const soberanos = getSovereignMetadataMap(config);
    const bondPrices = apiRes.data || [];

    if (!bondPrices.length) {
      container.innerHTML = `<div class="loading">${currentLanguage === 'en' ? translateAppText('sovereigns_empty') : 'No se pudieron cargar los datos de bonos soberanos.'}</div>`;
      return;
    }

    const today = new Date();
    const items = [];

    for (const bp of bondPrices) {
      const bondConfig = soberanos[bp.symbol];
      if (!bondConfig || !bondConfig.flujos) continue;

      const priceUsd = bp.price_usd;
      if (priceUsd <= 0) continue;

      // Filter future flows only
      const futureFlows = bondConfig.flujos
        .map(f => ({ fecha: parseLocalDate(f.fecha), monto: f.monto }))
        .filter(f => f.fecha > today);

      if (futureFlows.length === 0) continue;

      // Calculate YTM
      const ytm = calcYTM(priceUsd, futureFlows, today);

      // Calculate modified duration
      const duration = calcDuration(priceUsd, futureFlows, today, ytm);

      // Years to maturity
      const lastFlow = futureFlows[futureFlows.length - 1].fecha;
      const yearsToMaturity = (lastFlow - today) / (365.25 * 24 * 60 * 60 * 1000);

      items.push({
        symbol: bp.symbol,
        ley: bondConfig.ley,
        par: bondConfig.par,
        priceUsd,
        ytm,
        duration,
        yearsToMaturity,
        vencimiento: bondConfig.vencimiento,
        volume: bp.volume,
        flujos: futureFlows,
      });
    }

    // Sort by duration (ascending)
    items.sort((a, b) => a.duration - b.duration);

    renderSoberanosTable(container, items);

    // Render yield curve
    (window.renderYieldCurve || renderYieldCurve)(items);

    const source = document.getElementById('soberanos-source');
    if (source) {
      source.textContent = currentLanguage === 'en'
        ? translateAppText('sovereigns_source')
        : 'Fuente: data912 para precios + config interna para flujos, ley y vencimientos.';
    }
  } catch (e) {
    console.error('Error loading soberanos:', e);
    container.innerHTML = `<div class="loading">${currentLanguage === 'en' ? translateAppText('sovereigns_error') : 'Error al cargar datos de bonos soberanos.'}</div>`;
  }
}

// Newton-Raphson YTM calculation for bonds with multiple cash flows
function calcYTM(price, flows, settlementDate) {
  const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
  let r = 0.10; // initial guess 10%

  for (let iter = 0; iter < 100; iter++) {
    let pv = 0;
    let dpv = 0;
    for (const f of flows) {
      const t = (f.fecha - settlementDate) / MS_PER_YEAR;
      if (t <= 0) continue;
      const disc = Math.pow(1 + r, t);
      pv += f.monto / disc;
      dpv -= t * f.monto / (disc * (1 + r));
    }
    const diff = pv - price;
    if (Math.abs(diff) < 0.0001) break;
    if (Math.abs(dpv) < 1e-12) break;
    r -= diff / dpv;
    if (r < -0.5) r = -0.5;
    if (r > 2) r = 2;
  }
  return r * 100; // return as percentage
}

// Price from target TIR (inverse of calcYTM)
function calcPriceFromYTM(targetYTMpct, flows, settlementDate) {
  const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
  const r = targetYTMpct / 100;
  let pv = 0;
  for (const f of flows) {
    const t = (f.fecha - settlementDate) / MS_PER_YEAR;
    if (t <= 0) continue;
    pv += f.monto / Math.pow(1 + r, t);
  }
  return pv;
}

// Macaulay duration
function calcDuration(price, flows, settlementDate, ytmPct) {
  const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
  const r = ytmPct / 100;
  let weightedTime = 0;
  let totalPV = 0;
  for (const f of flows) {
    const t = (f.fecha - settlementDate) / MS_PER_YEAR;
    if (t <= 0) continue;
    const pv = f.monto / Math.pow(1 + r, t);
    weightedTime += t * pv;
    totalPV += pv;
  }
  return totalPV > 0 ? weightedTime / totalPV : 0;
}

let _soberanosItems = [];
function renderSoberanosTable(container, items) {
  _soberanosItems = items;
  const rows = items.map((item, idx) => {
    const leyClass = item.ley === 'NY' ? 'ley-ny' : 'ley-local';
    const leyLabel = item.ley === 'NY' ? 'NY' : 'Local';
    return `<tr data-sob-idx="${idx}" style="cursor:pointer">
      <td><span class="soberano-ticker">${item.symbol}</span><span class="soberano-ley ${leyClass}">${leyLabel}</span></td>
      <td class="col-ley">${leyLabel}</td>
      <td>US$${item.priceUsd.toFixed(2)}</td>
      <td class="col-duration">${item.duration.toFixed(1)}</td>
      <td class="col-vto">${item.vencimiento}</td>
      <td class="lecap-tir">${item.ytm.toFixed(2)}%</td>
    </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="soberanos-table-wrap">
      <table class="soberanos-table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th class="col-ley">Ley</th>
            <th>Precio</th>
            <th class="col-duration">Duration</th>
            <th class="col-vto">Vencimiento</th>
            <th>TIR</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="calc-hint">📊 ${currentLanguage === 'en' ? translateAppText('bond_calc_hint') : 'Click en cualquier bono para abrir la calculadora'}</p>
    <p style="font-size:0.7rem;color:var(--text-tertiary);margin-top:6px">
      ${currentLanguage === 'en' ? translateAppText('ytm_duration_note') : 'TIR (YTM) calculada con flujos de fondos futuros descontados. Duration en años (Macaulay).'}
    </p>`;

  container.querySelectorAll('tr[data-sob-idx]').forEach(tr => {
    tr.addEventListener('click', () => {
      const item = _soberanosItems[parseInt(tr.dataset.sobIdx)];
      if (item) openSoberanoCalculator(item);
    });
  });

  const table = container.querySelector('.soberanos-table');
  if (table) makeSortable(table);
}

function openSoberanoCalculator(item) {
  document.querySelector('.mundo-modal-overlay')?.remove();
  const overlay = document.createElement('div');
  overlay.className = 'mundo-modal-overlay';
  const inputStyle = 'display:block;font-size:1.1rem;font-weight:700;width:130px;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text)';
  const leyLabel = item.ley === 'NY' ? 'Ley NY' : 'Ley Local';
  overlay.innerHTML = `
    <div class="mundo-modal">
      <div class="mundo-modal-header">
        <div><h3 style="margin:0">${item.symbol} — Calculadora</h3>
        <p style="margin:4px 0 0;color:var(--text-secondary);font-size:0.85rem">${leyLabel} — Vencimiento: ${item.vencimiento}</p></div>
        <button class="mundo-modal-close">&times;</button>
      </div>
      <div class="mundo-modal-body" style="padding:16px">
        <div style="display:flex;gap:20px;align-items:center;margin-bottom:12px;flex-wrap:wrap">
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">Precio USD</label>
            <input type="number" id="sob-calc-price" value="${item.priceUsd.toFixed(2)}" step="0.01" style="${inputStyle}"></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">Monto a invertir (USD)</label>
            <input type="number" id="sob-calc-monto" value="10000" step="100" style="${inputStyle}"></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">TIR</label>
            <div id="sob-calc-tir" style="font-size:1.5rem;font-weight:700;color:${item.ytm >= 0 ? 'var(--green)' : 'var(--red)'}">${item.ytm.toFixed(2)}%</div></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">Duration</label>
            <div id="sob-calc-duration" style="font-size:1.2rem;font-weight:600;color:var(--text)">${item.duration.toFixed(2)} años</div></div>
        </div>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px;flex-wrap:wrap;padding:8px 12px;background:var(--bg-subtle);border-radius:2px">
          <span style="font-size:0.75rem;color:var(--text-secondary);font-weight:600">Costos:</span>
          <div style="display:flex;align-items:center;gap:4px"><label style="font-size:0.75rem;color:var(--text-secondary)">Arancel %</label>
            <input type="number" id="sob-calc-arancel" value="0.45" step="0.01" style="width:70px;padding:4px 6px;font-size:0.85rem;font-weight:600;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)"></div>
          <div style="display:flex;align-items:center;gap:4px"><label style="font-size:0.75rem;color:var(--text-secondary)">Impuestos %</label>
            <input type="number" id="sob-calc-impuestos" value="0.01" step="0.01" style="width:70px;padding:4px 6px;font-size:0.85rem;font-weight:600;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)"></div>
        </div>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px;flex-wrap:wrap;padding:10px 12px;background:#0a1628;border:1px solid #1a3050;border-radius:2px">
          <span style="font-size:0.75rem;color:var(--blue);font-weight:700">TIR Objetivo:</span>
          <div style="display:flex;align-items:center;gap:4px"><label style="font-size:0.75rem;color:var(--text-secondary)">TIR %</label>
            <input type="number" id="sob-calc-target-tir" value="" placeholder="${item.ytm.toFixed(1)}" step="0.1" style="width:80px;padding:4px 6px;font-size:0.85rem;font-weight:600;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)"></div>
          <div id="sob-calc-target-result" style="font-size:0.8rem;color:var(--text-secondary)">Ingresá una TIR para ver el precio implícito</div>
        </div>
        <div id="sob-calc-flows"></div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.mundo-modal-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  function renderSobFlows() {
    const price = parseFloat(document.getElementById('sob-calc-price').value) || item.priceUsd;
    const arancel = parseFloat(document.getElementById('sob-calc-arancel').value) || 0;
    const impuestos = parseFloat(document.getElementById('sob-calc-impuestos').value) || 0;
    const costosPct = (arancel + impuestos) / 100;
    const effectivePrice = price * (1 + costosPct);
    const monto = parseFloat(document.getElementById('sob-calc-monto').value) || 10000;
    const nominales = monto / (effectivePrice / 100);
    const scale = nominales / 100;
    const flowsHTML = item.flujos.map(f => {
      const scaled = f.monto * scale;
      return `<tr><td>${f.fecha.toLocaleDateString('es-AR')}</td><td style="text-align:right">$${f.monto.toFixed(2)}</td><td style="text-align:right;font-weight:600">$${scaled.toFixed(2)}</td></tr>`;
    }).join('');
    const totalPer100 = item.flujos.reduce((s, f) => s + f.monto, 0);
    const totalScaled = totalPer100 * scale;
    const ganancia = totalScaled - monto;
    document.getElementById('sob-calc-flows').innerHTML = `
      <h4 style="margin:0 0 8px;font-size:0.85rem;color:var(--text-secondary)">Flujos de fondos</h4>
      <table style="width:100%;font-size:0.8rem;border-collapse:collapse">
        <thead><tr><th style="text-align:left;padding:4px 8px;border-bottom:1px solid var(--border)">Fecha</th>
        <th style="text-align:right;padding:4px 8px;border-bottom:1px solid var(--border)">Por 100 VN</th>
        <th style="text-align:right;padding:4px 8px;border-bottom:1px solid var(--border)">Tu inversión</th></tr></thead>
        <tbody>${flowsHTML}</tbody>
        <tfoot>
          <tr style="font-weight:700;border-top:2px solid var(--border)">
            <td style="padding:4px 8px">Total cobros</td><td style="text-align:right;padding:4px 8px">$${totalPer100.toFixed(2)}</td>
            <td style="text-align:right;padding:4px 8px">$${totalScaled.toFixed(2)}</td></tr>
          <tr style="font-weight:700;color:${ganancia >= 0 ? 'var(--green)' : 'var(--red)'}">
            <td style="padding:4px 8px">Ganancia</td><td></td>
            <td style="text-align:right;padding:4px 8px">${ganancia >= 0 ? '+' : ''}$${ganancia.toFixed(2)}</td></tr>
        </tfoot>
      </table>
      <p style="font-size:0.7rem;color:var(--text-tertiary);margin-top:8px">Comprás ${nominales.toFixed(0)} VN a US$${(price/100).toFixed(4)}/VN</p>`;
  }
  renderSobFlows();

  const priceInput = document.getElementById('sob-calc-price');
  const montoInput = document.getElementById('sob-calc-monto');
  const arancelInput = document.getElementById('sob-calc-arancel');
  const impuestosInput = document.getElementById('sob-calc-impuestos');
  const tirDisplay = document.getElementById('sob-calc-tir');
  const durDisplay = document.getElementById('sob-calc-duration');
  function recalcSob() {
    const newPrice = parseFloat(priceInput.value);
    if (!newPrice || newPrice <= 0) return;
    const arancel = parseFloat(arancelInput.value) || 0;
    const impuestos = parseFloat(impuestosInput.value) || 0;
    const costosPct = (arancel + impuestos) / 100;
    const effectivePrice = newPrice * (1 + costosPct);
    const today = new Date();
    const newYtm = calcYTM(effectivePrice, item.flujos, today);
    const newDur = calcDuration(effectivePrice, item.flujos, today, newYtm);
    if (isFinite(newYtm)) { tirDisplay.textContent = newYtm.toFixed(2) + '%'; tirDisplay.style.color = newYtm >= 0 ? 'var(--green)' : 'var(--red)'; }
    if (isFinite(newDur)) { durDisplay.textContent = newDur.toFixed(2) + ' años'; }
    renderSobFlows();
  }
  const targetTirInput = document.getElementById('sob-calc-target-tir');
  const targetResult = document.getElementById('sob-calc-target-result');
  function recalcTargetTir() {
    const targetTir = parseFloat(targetTirInput.value);
    if (!targetTir && targetTir !== 0) { targetResult.innerHTML = 'Ingresá una TIR para ver el precio implícito'; return; }
    const today = new Date();
    const impliedPrice = calcPriceFromYTM(targetTir, item.flujos, today);
    const currentPrice = parseFloat(priceInput.value) || item.priceUsd;
    const upside = ((impliedPrice - currentPrice) / currentPrice * 100);
    const upsideColor = upside >= 0 ? 'var(--green)' : 'var(--red)';
    targetResult.innerHTML = `Precio: <strong style="color:var(--accent)">US$${impliedPrice.toFixed(2)}</strong> &nbsp;|&nbsp; Upside: <strong style="color:${upsideColor}">${upside >= 0 ? '+' : ''}${upside.toFixed(1)}%</strong> vs actual`;
  }
  targetTirInput.addEventListener('input', recalcTargetTir);
  priceInput.addEventListener('input', () => { recalcSob(); recalcTargetTir(); });
  montoInput.addEventListener('input', renderSobFlows);
  arancelInput.addEventListener('input', recalcSob);
  impuestosInput.addEventListener('input', recalcSob);
  recalcSob();
}

let soberanosChart = null;
function renderYieldCurve(items) {
  const canvas = document.getElementById('soberanos-scatter');
  if (!canvas || typeof Chart === 'undefined') return;
  if (soberanosChart) soberanosChart.destroy();

  const textColor = '#555555';
  const gridColor = '#1a1a1a';

  const localBonds = items.filter(i => i.ley === 'local');
  const nyBonds = items.filter(i => i.ley === 'NY');

  // Polynomial regression curves (degree 2, 300 points for smoothness)
  const localPoints = localBonds.map(i => [i.duration, i.ytm]);
  const nyPoints = nyBonds.map(i => [i.duration, i.ytm]);
  const localCurve = localPoints.length >= 3 ? fitPolyCurve(localPoints, 2, 300) : [];
  const nyCurve = nyPoints.length >= 3 ? fitPolyCurve(nyPoints, 2, 300) : [];

  // Use labels array for x-axis to make line charts work properly
  // Collect all x values and curve x values, build unified x scale
  const datasets = [];

  if (localCurve.length) {
    datasets.push({
      label: 'Ley Local (curva)',
      data: localCurve,
      borderColor: '#ff9500',
      borderWidth: 1.5,
      borderDash: [6, 3],
      pointRadius: 0,
      pointHitRadius: 0,
      fill: false,
      order: 2,
    });
  }
  if (nyCurve.length) {
    datasets.push({
      label: 'Ley NY (curva)',
      data: nyCurve,
      borderColor: '#4da6ff',
      borderWidth: 1.5,
      borderDash: [6, 3],
      pointRadius: 0,
      pointHitRadius: 0,
      fill: false,
      order: 2,
    });
  }

  datasets.push({
    label: 'Ley Local',
    data: localBonds.map(i => ({ x: i.duration, y: i.ytm, label: i.symbol })),
    backgroundColor: '#ff9500',
    borderColor: '#ff9500',
    borderWidth: 1.5,
    pointRadius: 7,
    pointHoverRadius: 9,
    showLine: false,
    order: 1,
  });

  datasets.push({
    label: 'Ley NY',
    data: nyBonds.map(i => ({ x: i.duration, y: i.ytm, label: i.symbol })),
    backgroundColor: '#4da6ff',
    borderColor: '#4da6ff',
    borderWidth: 1.5,
    pointRadius: 7,
    pointHoverRadius: 9,
    showLine: false,
    order: 1,
  });

  soberanosChart = new Chart(canvas, {
    type: 'line',
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: textColor, filter: (item) => !item.text.includes('curva') } },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const d = ctx.raw;
              return `${d.label || ''}: TIR ${d.y?.toFixed(2) || ctx.parsed.y.toFixed(2)}%`;
            }
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          title: { display: true, text: 'Duration (años)', color: textColor },
          grid: { color: gridColor },
          ticks: { color: textColor },
        },
        y: {
          type: 'linear',
          title: { display: true, text: 'TIR (%)', color: textColor },
          grid: { color: gridColor },
          ticks: { color: textColor, callback: v => v.toFixed(1) + '%' },
        }
      }
    }
  });
}

// ─── Mundo (Global Monitor) ───
function drawSparkline(canvasId, data, isUp) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.round(rect.width || canvas.clientWidth || canvas.width || 160));
  const h = Math.max(1, Math.round(rect.height || canvas.clientHeight || canvas.height || 52));
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 4;

  const color = isUp ? getComputedStyle(document.documentElement).getPropertyValue('--green').trim()
                     : getComputedStyle(document.documentElement).getPropertyValue('--red').trim();

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';

  let lastX, lastY;
  for (let i = 0; i < data.length; i++) {
    const x = (i / (data.length - 1)) * (w - pad * 2) + pad;
    const y = h - pad - ((data[i] - min) / range) * (h - pad * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
    lastX = x;
    lastY = y;
  }
  ctx.stroke();

  // Pulsing dot at the end — CSS overlay
  const parent = canvas.parentElement;
  parent.style.position = 'relative';
  parent.querySelectorAll('.spark-dot').forEach((node) => node.remove());
  const dot = document.createElement('div');
  dot.className = 'spark-dot';
  dot.style.left = (lastX / w * 100) + '%';
  dot.style.top = (lastY / h * 100) + '%';
  dot.style.background = color;
  dot.style.boxShadow = `0 0 6px ${color}`;
  parent.appendChild(dot);
}

async function loadMundo() {
  const grid = document.getElementById('mundo-grid');
  grid.innerHTML = `<div class="loading"><div class="loading-spinner"></div><p>Cargando datos globales...</p></div>`;

  try {
    const res = await fetch('/api/mundo');
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const { data, updated } = await res.json();

    const mundoMeta = {
      spx: { category: 'indices', icon: 'SP', unit: 'USD' },
      nasdaq: { category: 'indices', icon: 'NQ', unit: 'USD' },
      dow: { category: 'indices', icon: 'DJ', unit: 'USD' },
      tnx: { category: 'tasas', icon: '10Y', unit: '%' },
      fvx: { category: 'tasas', icon: '5Y', unit: '%' },
      tyx: { category: 'tasas', icon: '30Y', unit: '%' },
      oil: { category: 'energia', icon: 'WTI', unit: 'USD' },
      brent: { category: 'energia', icon: 'BRE', unit: 'USD' },
      natgas: { category: 'energia', icon: 'GAS', unit: 'USD' },
      gold: { category: 'metales', icon: 'AU', unit: 'USD' },
      silver: { category: 'metales', icon: 'AG', unit: 'USD' },
      copper: { category: 'metales', icon: 'CU', unit: 'USD' },
      corn: { category: 'agro', icon: 'MZ', unit: 'USD' },
      soy: { category: 'agro', icon: 'SJ', unit: 'USD' },
      wheat: { category: 'agro', icon: 'TG', unit: 'USD' },
      btc: { category: 'crypto', icon: 'BTC', unit: 'USD' },
      eth: { category: 'crypto', icon: 'ETH', unit: 'USD' },
      eurusd: { category: 'fx', icon: 'FX', unit: 'Par' },
    };

    const categoryLabels = currentLanguage === 'en'
      ? {
          indices: 'Equities',
          tasas: 'Rates',
          energia: 'Energy',
          metales: 'Metals',
          agro: 'Agri',
          crypto: translateAppText('category_crypto'),
          fx: 'FX',
        }
      : {
          indices: 'Indices',
          tasas: 'Tasas',
          energia: 'Energia',
          metales: 'Metales',
          agro: 'Agro',
          crypto: 'Crypto',
          fx: 'FX',
        };

    const categoryDescriptions = currentLanguage === 'en'
      ? {
          indices: 'Global equity benchmarks',
          tasas: 'US rates curve',
          energia: 'Energy commodities',
          metales: 'Industrial and precious metals',
          agro: 'Agricultural references',
          crypto: translateAppText('category_crypto_desc'),
          fx: 'Currencies and crosses',
        }
      : {
          indices: 'Referencias globales de equity',
          tasas: 'Curva de rendimientos USA',
          energia: 'Commodities energeticos',
          metales: 'Metales industriales y preciosos',
          agro: 'Referencias agricolas',
          crypto: 'Activos digitales liquidos',
          fx: 'Monedas y cruces',
        };

    const grouped = {};
    grid.innerHTML = '';
    data.forEach(item => {
      if (item.price === null) return;

      const meta = mundoMeta[item.id] || {};
      const category = item.category || meta.category || 'indices';
      const icon = item.icon || meta.icon || item.name.slice(0, 2).toUpperCase();
      const unit = meta.unit || '';
      const isRate = ['tnx', 'fvx', 'tyx'].includes(item.id);
      const isUp = item.change >= 0;
      const changeColor = isUp ? 'var(--green)' : 'var(--red)';
      const arrow = isUp ? '▲' : '▼';

      let priceStr;
      if (isRate) {
        priceStr = item.price.toFixed(3) + '%';
      } else if (item.price >= 10000) {
        priceStr = item.price.toLocaleString('es-AR', { maximumFractionDigits: 0 });
      } else if (item.price >= 100) {
        priceStr = item.price.toLocaleString('es-AR', { maximumFractionDigits: 2 });
      } else {
        priceStr = item.price.toLocaleString('es-AR', { maximumFractionDigits: 4 });
      }

      if (!grouped[category]) grouped[category] = [];
      grouped[category].push({
        ...item,
        category,
        icon,
        unit,
        isUp,
        arrow,
        changeColor,
        priceStr,
      });
    });

    Object.entries(categoryLabels).forEach(([category, label]) => {
      const items = grouped[category];
      if (!items?.length) return;

      const section = document.createElement('section');
      section.className = 'mundo-category-section';
      section.innerHTML = `
        <div class="mundo-category-head">
          <div>
            <h3 class="mundo-category-title">${label}</h3>
            <p class="mundo-category-desc">${categoryDescriptions[category] || ''}</p>
          </div>
        </div>
        <div class="mundo-category-grid"></div>
      `;

      const categoryGrid = section.querySelector('.mundo-category-grid');

      items.forEach((item) => {
        const canvasId = `spark-${item.id}`;
        const card = document.createElement('div');
        card.className = 'mundo-card';
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => openMundoDetail(item.id, item.name, item.icon));
        card.innerHTML = `
          <div class="mundo-card-top">
            <div class="mundo-icon">${item.icon}</div>
            <div class="mundo-info">
              <div class="mundo-name">${item.name}</div>
              <div class="mundo-price">${item.priceStr}</div>
              <div class="mundo-unit">${item.unit}</div>
            </div>
            <div class="mundo-change" style="color:${item.changeColor}">
              <span class="mundo-arrow">${item.arrow}</span>
              <span>${Math.abs(item.change).toFixed(2)}%</span>
            </div>
          </div>
          <div class="mundo-card-bottom">
            <div class="mundo-spark"><canvas id="${canvasId}" width="160" height="52"></canvas></div>
          </div>
        `;
        categoryGrid.appendChild(card);

        if (item.sparkline && item.sparkline.length > 1) {
          requestAnimationFrame(() => drawSparkline(canvasId, item.sparkline, item.isUp));
        }
      });

      grid.appendChild(section);
    });

    const src = document.getElementById('mundo-source');
    if (src) src.textContent = currentLanguage === 'en'
      ? translateAppText('global_source')
      : 'Fuente: Yahoo Finance. Precio, variacion diaria y sparkline intradiaria.';
  } catch (e) {
    grid.innerHTML = `<div class="loading">${t('world_error')}</div>`;
    console.error('Mundo error:', e);
  }
}

// ─── Hot US Movers ───

async function loadHotMovers() {
  const grid = document.getElementById('hot-grid');
  if (!grid) return;
  grid.innerHTML = `<div class="loading"><div class="loading-spinner"></div><p>${t('hot_movers_loading')}</p></div>`;

  try {
    const res = await fetch('/api/hot-movers');
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const { data } = await res.json();

    if (!data || !data.length) {
      grid.innerHTML = `<div class="loading">${t('hot_movers_empty')}</div>`;
      return;
    }

    grid.innerHTML = '';
    data.slice(0, 6).forEach((item, i) => {
      const isUp = item.change >= 0;
      const changeColor = isUp ? 'var(--green)' : 'var(--red)';
      const arrow = isUp ? '▲' : '▼';
      const sign = isUp ? '+' : '';
      const shortName = item.name.length > 42 ? `${item.name.slice(0, 39)}...` : item.name;

      const card = document.createElement('div');
      card.className = 'hot-card';
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => openMundoDetail(item.symbol.toLowerCase(), item.name, '', item.symbol));
      card.innerHTML = `
        <div class="hot-rank">${i + 1}</div>
        <div class="hot-info">
          <div class="hot-symbol">${item.symbol}</div>
          <div class="hot-name">${shortName}</div>
        </div>
        <div class="hot-metrics">
          <div class="hot-price">$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div class="hot-change" style="color:${changeColor}">
            <span class="hot-arrow">${arrow}</span>
            <span>${sign}${item.change.toFixed(2)}%</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (e) {
    grid.innerHTML = `<div class="loading">${t('hot_movers_error')}</div>`;
    console.error('Hot movers error:', e);
  }
}

// ─── Mundo Detail Modal ───
let mundoDetailChart = null;
let mundoDetailPoints = [];

function formatChartPrice(val) {
  if (val >= 10000) return val.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (val >= 100) return val.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return val.toLocaleString('en-US', { maximumFractionDigits: 4 });
}

function updateMundoHeader(points, hoveredIndex) {
  const priceEl = document.getElementById('mundo-modal-price');
  const changeEl = document.getElementById('mundo-modal-change');
  const dateEl = document.getElementById('mundo-modal-date');
  if (!priceEl || !points.length) return;

  const first = points[0].v;
  const current = hoveredIndex != null ? points[hoveredIndex].v : points[points.length - 1].v;
  const diff = current - first;
  const pct = first ? (diff / first) * 100 : 0;
  const isUp = diff >= 0;
  const sign = isUp ? '+' : '';
  const color = isUp ? 'var(--green)' : 'var(--red)';

  priceEl.textContent = formatChartPrice(current);

  changeEl.style.color = color;
  changeEl.textContent = `${sign}${formatChartPrice(diff)} (${sign}${pct.toFixed(2)}%)`;

  if (hoveredIndex != null) {
    const d = new Date(points[hoveredIndex].t);
    dateEl.textContent = d.toLocaleString('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  } else {
    dateEl.textContent = '';
  }
}

// Crosshair plugin for Chart.js
const crosshairPlugin = {
  id: 'crosshair',
  afterDraw(chart) {
    if (chart._crosshairX == null) return;
    const { ctx, chartArea: { top, bottom } } = chart;
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([4, 3]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(150,150,150,0.6)';
    ctx.moveTo(chart._crosshairX, top);
    ctx.lineTo(chart._crosshairX, bottom);
    ctx.stroke();
    ctx.restore();
  }
};

async function openMundoDetail(id, name, icon, ticker) {
  // Remove existing modal
  const existing = document.getElementById('mundo-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'mundo-modal';
  modal.className = 'mundo-modal-overlay';
  modal.innerHTML = `
    <div class="mundo-modal">
      <div class="mundo-modal-header">
        <div class="mundo-modal-header-left">
          <span class="mundo-modal-title">${icon ? icon + ' ' : ''}${name}</span>
          <div class="mundo-modal-price-row">
            <span class="mundo-modal-price" id="mundo-modal-price">-</span>
            <span class="mundo-modal-change" id="mundo-modal-change"></span>
          </div>
          <span class="mundo-modal-date" id="mundo-modal-date"></span>
        </div>
        <div class="mundo-modal-header-right">
          <div class="mundo-modal-tabs">
            <button class="mundo-range-btn active" data-range="1d">1D</button>
            <button class="mundo-range-btn" data-range="5d">5D</button>
            <button class="mundo-range-btn" data-range="1mo">1M</button>
            <button class="mundo-range-btn" data-range="3mo">3M</button>
          </div>
          <button class="mundo-modal-close">&times;</button>
        </div>
      </div>
      <div class="mundo-modal-body">
        <canvas id="mundo-detail-chart"></canvas>
      </div>
      <div class="mundo-modal-loading" id="mundo-modal-loading">${t('world_detail_loading')}</div>
    </div>
  `;
  document.body.appendChild(modal);

  // Close handlers
  modal.querySelector('.mundo-modal-close').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

  // Build fetch URL helper
  const buildUrl = (range) => ticker
    ? `/api/mundo?ticker=${encodeURIComponent(ticker)}&name=${encodeURIComponent(name)}&range=${range}`
    : `/api/mundo?symbol=${id}&range=${range}`;

  // Range buttons
  modal.querySelectorAll('.mundo-range-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.querySelectorAll('.mundo-range-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadMundoChart(buildUrl, btn.dataset.range);
    });
  });

  loadMundoChart(buildUrl, '1d');
}

async function loadMundoChart(buildUrl, range) {
  const loading = document.getElementById('mundo-modal-loading');
  if (loading) loading.style.display = 'block';

  try {
    const res = await fetch(buildUrl(range));
    if (!res.ok) throw new Error('API error');
    const data = await res.json();

    if (loading) loading.style.display = 'none';

    const canvas = document.getElementById('mundo-detail-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (mundoDetailChart) mundoDetailChart.destroy();

    const points = data.points || [];
    mundoDetailPoints = points;
    if (!points.length) return;

    // Update header with default (last point)
    updateMundoHeader(points, null);

    const isUp = points[points.length - 1].v >= points[0].v;
    const lineColor = isUp ? '#00d26a' : '#ff3b3b';
    const bgColor = isUp ? 'rgba(0,210,106,0.08)' : 'rgba(255,59,59,0.08)';

    mundoDetailChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: points.map(p => p.t),
        datasets: [{
          data: points.map(p => p.v),
          borderColor: lineColor,
          backgroundColor: bgColor,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: lineColor,
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
          fill: true,
          tension: 0.3,
        }]
      },
      plugins: [crosshairPlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
        interaction: { intersect: false, mode: 'index' },
        onHover: (event, elements, chart) => {
          if (elements.length > 0) {
            const idx = elements[0].index;
            chart._crosshairX = elements[0].element.x;
            updateMundoHeader(mundoDetailPoints, idx);
          } else {
            chart._crosshairX = null;
            updateMundoHeader(mundoDetailPoints, null);
          }
          chart.draw();
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: {
            display: true,
            ticks: {
              color: 'var(--text-tertiary)',
              maxTicksLimit: 6,
              font: { size: 11 },
              callback: function(val, index) {
                const ts = points[index]?.t;
                if (!ts) return '';
                const d = new Date(ts);
                if (range === '1d') return d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
                return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
              }
            },
            grid: { color: 'rgba(150,150,150,0.08)' },
          },
          y: {
            display: true,
            ticks: { color: 'var(--text-tertiary)', maxTicksLimit: 5, font: { size: 11 } },
            grid: { color: 'rgba(150,150,150,0.08)' },
          }
        }
      }
    });

    // Reset crosshair on mouse leave
    canvas.addEventListener('mouseleave', () => {
      mundoDetailChart._crosshairX = null;
      updateMundoHeader(mundoDetailPoints, null);
      mundoDetailChart.draw();
    });
  } catch (e) {
    if (loading) loading.textContent = t('world_detail_error');
    console.error('Detail chart error:', e);
  }
}

// ─── Cotizaciones Strip ───
async function loadCotizaciones() {
  try {
    const res = await fetch('/api/cotizaciones');
    if (!res.ok) throw new Error('Cotizaciones API error');
    const data = await res.json();

    const strip = document.getElementById('cotizaciones-strip');
    const inner = document.getElementById('cotizaciones-strip-inner');
    if (!strip || !inner) return;

    const items = [];

    if (data.oficial) {
      items.push({ label: t('official_dollar'), price: `$${formatCotizPrice(data.oficial.price)}` });
    }
    if (data.ccl) {
      items.push({ label: t('ccl_dollar'), price: `$${formatCotizPrice(data.ccl.price)}` });
    }
    if (data.mep) {
      items.push({ label: t('mep_dollar'), price: `$${formatCotizPrice(data.mep.price)}` });
    }
    if (data.riesgoPais) {
      items.push({ label: t('country_risk'), price: data.riesgoPais.value.toLocaleString(currentLanguage === 'en' ? 'en-US' : 'es-AR') });
    }

    if (items.length === 0) return;

    inner.innerHTML = items.map(item =>
      `<div class="cotiz-item"><span class="cotiz-label">${item.label}</span><span class="cotiz-price">${item.price}</span></div>`
    ).join('');

    strip.classList.add('loaded');
  } catch (e) {
    console.error('Cotizaciones strip error:', e);
  }
}

function formatCotizPrice(val) {
  if (val == null) return '—';
  return val.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─── News Ticker ───
async function loadNewsTicker() {
  try {
    const res = await fetch(`/api/news?lang=${currentLanguage}`);
    if (!res.ok) throw new Error('News API error');
    const { data } = await res.json();
    if (!data || !data.length) return;

    const track = document.getElementById('news-ticker-track');
    if (!track) return;

    // Build items HTML
    const html = data.map(item =>
      `<a class="news-ticker-item" href="${item.link}" target="_blank" rel="noopener">` +
      (item.source ? `<span class="news-ticker-source">${item.source}</span>` : '') +
      `${item.title}</a>`
    ).join('');

    // Duplicate for seamless loop
    track.innerHTML = html + html;

    const ticker = document.getElementById('news-ticker');
    ticker.style.display = 'flex';

    document.getElementById('news-ticker-close').addEventListener('click', () => {
      ticker.style.display = 'none';
    });
  } catch (e) {
    // Silently fail — ticker is non-essential
    console.error('News ticker error:', e);
  }
}

// ─── Bonos CER section ───

function formatNewsSectionDate(rawDate) {
  if (!rawDate) return currentLanguage === 'en' ? 'Financial coverage' : 'Cobertura financiera';
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) return currentLanguage === 'en' ? 'Financial coverage' : 'Cobertura financiera';
  return parsed.toLocaleString(currentLanguage === 'en' ? 'en-US' : 'es-AR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

async function loadNewsSection() {
  const grid = document.getElementById('news-grid');
  if (!grid) return;

  grid.innerHTML = `<div class="loading"><div class="loading-spinner"></div><p>${currentLanguage === 'en' ? 'Loading financial news...' : 'Cargando noticias financieras...'}</p></div>`;

  try {
    const res = await fetch(`/api/news?lang=${currentLanguage}`);
    if (!res.ok) throw new Error('News section API error');
    const { data } = await res.json();

    if (!data || !data.length) {
      grid.innerHTML = `<div class="loading">${currentLanguage === 'en' ? translateAppText('market_news_empty') : 'No hay noticias de mercado disponibles.'}</div>`;
      return;
    }

    const filtered = data.filter(item => {
      const haystack = `${item.title || ''} ${item.source || ''}`.toLowerCase();
      const terms = currentLanguage === 'en'
        ? ['market', 'finance', 'bond', 'stock', 'wall street', 'bitcoin', 'fed', 'rates', 's&p', 'nasdaq', 'treasury']
        : ['mercado', 'finanzas', 'bonos', 'acciones', 'wall street', 'dolar', 'dólar', 'riesgo país', 'riesgo pais', 'fed', 'tasas', 's&p', 'nasdaq'];
      return terms.some(term => haystack.includes(term));
    });

    const items = (filtered.length ? filtered : data).slice(0, 6);
    grid.innerHTML = items.map(item => `
      <a class="news-card" href="${item.link}" target="_blank" rel="noopener">
        <span class="news-card-source">${item.source || (currentLanguage === 'en' ? translateAppText('market_news_fallback_source') : 'Mercado')}</span>
        <div class="news-card-title">${item.title}</div>
        <div class="news-card-meta">${formatNewsSectionDate(item.pubDate)}</div>
      </a>
    `).join('');
  } catch (e) {
    grid.innerHTML = `<div class="loading">${currentLanguage === 'en' ? translateAppText('market_news_error') : 'Error al cargar noticias de mercado.'}</div>`;
    console.error('News section error:', e);
  }
}

async function loadCER() {
  const container = document.getElementById('cer-list');
  container.innerHTML = `<div class="loading"><div class="loading-spinner"></div><p>${t('cer_loading')}</p></div>`;

  try {
    const [config, cerData, cerUltimo, preciosData] = await Promise.all([
      fetch('/api/config').then(r => r.json()),
      fetch('/api/cer?v=2').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/cer-ultimo').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/cer-precios').then(r => r.ok ? r.json() : { data: [] }).catch(() => ({ data: [] }))
    ]);

    const bonosCER = getCerMetadataMap(config);
    const cerActual = cerData?.cer || 0; // CER T-10 para cálculos
    const cerUltimoPublicado = cerUltimo?.cer || 0; // Último CER para mostrar en UI
    const fechaUltimoCER = cerUltimo?.fecha || '';
    const bondPrices = preciosData.data || [];

    if (!cerActual || !bondPrices.length) {
      container.innerHTML = `<div class="loading">${t('cer_empty')}</div>`;
      return;
    }

    const today = new Date();
    const items = [];

    for (const bp of bondPrices) {
      const bondConfig = bonosCER[bp.symbol];
      if (!bondConfig || !bondConfig.flujos) continue;

      const precioARS = bp.c || bp.price;
      if (!precioARS || precioARS <= 0) continue;

      const cerEmision = bondConfig.cer_emision || 1;
      let coefCER = cerActual / cerEmision;
      
      // DICP: factor especial 1.27 (intereses capitalizados históricos)
      if (bp.symbol === 'DICP') {
        coefCER = coefCER * 1.27;
      }

      // Calcular VR_antes para cada flujo (igual que Flask)
      // Primero calcular VR para TODOS los flujos, luego filtrar futuros
      let amortAcum = 0;
      const todosLosFlujos = bondConfig.flujos.map(f => {
        const vr_antes = 1 - amortAcum;
        amortAcum += f.amortizacion;
        return { ...f, vr_antes };
      });

      // Ahora filtrar solo flujos futuros y calcular flujos ajustados
      const flujosAjustados = todosLosFlujos
        .map(f => {
          const fecha = parseLocalDate(f.fecha);
          if (fecha <= today) return null;

          // FF = (VR_antes × Tasa × Base + Amort) × Coef_CER
          const interes = f.vr_antes * f.tasa_interes * f.base;
          const flujoNominal = interes + f.amortizacion;
          const flujoAjustado = flujoNominal * coefCER;

          return { fecha, monto: flujoAjustado };
        })
        .filter(f => f !== null);

      if (flujosAjustados.length === 0) continue;

      // Precio se divide por 100 (igual que Flask: bid/100)
      const precioNormalizado = precioARS / 100;

      // Calcular TIR real
      const ytm = calcYTM(precioNormalizado, flujosAjustados, today);

      // Calcular duration
      const duration = calcDuration(precioNormalizado, flujosAjustados, today, ytm);
      const modifiedDuration = calcModifiedDuration(duration, ytm);
      const tem = calcTEM(ytm);

      items.push({
        symbol: bp.symbol,
        priceArs: precioARS,
        ytm,
        tem,
        duration,
        modifiedDuration,
        vencimiento: bondConfig.vencimiento,
        volume: bp.v || 0,
        flujosAjustados,
      });
    }

    // Sort by duration (ascending)
    items.sort((a, b) => a.duration - b.duration);

    renderCERTable(container, items);

    // Render yield curve
    try {
      (window.renderCERCurve || renderCERCurve)(items);
    } catch (chartError) {
      console.warn('Chart.js not available, skipping curve:', chartError.message);
    }

    const source = document.getElementById('cer-source');
    if (source) {
      source.textContent = t('cer_source');
    }
  } catch (e) {
    console.error('Error loading CER bonds:', e);
    container.innerHTML = `<div class="loading">${t('cer_error')}</div>`;
  }
}

let _cerItems = [];
function renderCERTable(container, items) {
  _cerItems = items;
  const rows = items.map((item, idx) => {
    return `<tr data-cer-idx="${idx}" style="cursor:pointer">
      <td><span class="soberano-ticker">${item.symbol}</span></td>
      <td>$${item.priceArs.toFixed(2)}</td>
      <td class="col-duration">${item.duration.toFixed(1)}</td>
      <td class="col-duration">${item.modifiedDuration.toFixed(1)}</td>
      <td class="col-vto">${item.vencimiento}</td>
      <td class="lecap-tir">${item.ytm.toFixed(2)}%</td>
      <td>${item.tem != null ? `${item.tem.toFixed(2)}%` : '—'}</td>
    </tr>`;
  }).join('');

  container.innerHTML = `
    <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:8px">📊 ${t('cer_calc_hint')}</p>
    <div class="soberanos-table-wrap">
      <table class="soberanos-table cer-table">
        <thead>
          <tr>
            <th>TICKER</th>
            <th>${t('cer_col_price')}</th>
            <th class="col-duration">DURATION</th>
            <th class="col-duration">DURATION MOD.</th>
            <th class="col-vto">${t('cer_col_maturity')}</th>
            <th>${t('cer_col_real_ytm')}</th>
            <th>TEM</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p style="font-size:0.7rem;color:var(--text-tertiary);margin-top:6px">
      ${t('cer_note')}
    </p>`;
  container.querySelectorAll('tr[data-cer-idx]').forEach(tr => {
    tr.addEventListener('click', () => {
      const item = _cerItems[parseInt(tr.dataset.cerIdx)];
      if (item) openCERCalculator(item);
    });
  });
  const table = container.querySelector('.cer-table');
  if (table) makeSortable(table);
}

function openCERCalculator(item) {
  document.querySelector('.mundo-modal-overlay')?.remove();
  const overlay = document.createElement('div');
  overlay.className = 'mundo-modal-overlay';
  const inputStyle = 'display:block;font-size:1.1rem;font-weight:700;width:140px;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text)';
  overlay.innerHTML = `
    <div class="mundo-modal">
      <div class="mundo-modal-header">
        <div><h3 style="margin:0">${item.symbol} — Calculadora CER</h3>
        <p style="margin:4px 0 0;color:var(--text-secondary);font-size:0.85rem">Vencimiento: ${item.vencimiento}</p></div>
        <button class="mundo-modal-close">&times;</button>
      </div>
      <div class="mundo-modal-body" style="padding:16px">
        <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">Precio (AR$)</label>
            <input type="number" id="cer-calc-price" value="${item.priceArs.toFixed(2)}" step="0.01" style="${inputStyle}"></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">Monto a invertir ($)</label>
            <input type="number" id="cer-calc-monto" value="1000000" step="10000" style="${inputStyle}"></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">TIR Real</label>
            <div id="cer-calc-tir" style="font-size:1.5rem;font-weight:700;color:${item.ytm >= 0 ? 'var(--green)' : 'var(--red)'}">${item.ytm.toFixed(2)}%</div></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">Duration</label>
            <div id="cer-calc-duration" style="font-size:1.2rem;font-weight:600;color:var(--text)">${item.duration.toFixed(1)} años</div></div>
        </div>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px;flex-wrap:wrap;padding:8px 12px;background:var(--bg-subtle);border-radius:6px">
          <span style="font-size:0.75rem;color:var(--text-secondary);font-weight:600">Costos:</span>
          <div style="display:flex;align-items:center;gap:4px"><label style="font-size:0.75rem;color:var(--text-secondary)">Arancel %</label>
            <input type="number" id="cer-calc-arancel" value="0.45" step="0.01" style="width:70px;padding:4px 6px;font-size:0.85rem;font-weight:600;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)"></div>
          <div style="display:flex;align-items:center;gap:4px"><label style="font-size:0.75rem;color:var(--text-secondary)">Impuestos %</label>
            <input type="number" id="cer-calc-impuestos" value="0.01" step="0.01" style="width:70px;padding:4px 6px;font-size:0.85rem;font-weight:600;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)"></div>
        </div>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px;flex-wrap:wrap;padding:10px 12px;background:#0a1628;border:1px solid #1a3050;border-radius:2px">
          <span style="font-size:0.75rem;color:var(--blue);font-weight:700">TIR Objetivo:</span>
          <div style="display:flex;align-items:center;gap:4px"><label style="font-size:0.75rem;color:var(--text-secondary)">TIR %</label>
            <input type="number" id="cer-calc-target-tir" value="" placeholder="${item.ytm.toFixed(1)}" step="0.1" style="width:80px;padding:4px 6px;font-size:0.85rem;font-weight:600;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)"></div>
          <div id="cer-calc-target-result" style="font-size:0.8rem;color:var(--text-secondary)">Ingresá una TIR para ver el precio implícito</div>
        </div>
        <div id="cer-calc-resumen"></div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.mundo-modal-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  function renderCERResumen() {
    const price = parseFloat(document.getElementById('cer-calc-price').value) || item.priceArs;
    const arancel = parseFloat(document.getElementById('cer-calc-arancel').value) || 0;
    const impuestos = parseFloat(document.getElementById('cer-calc-impuestos').value) || 0;
    const costosPct = (arancel + impuestos) / 100;
    const effectivePrice = price * (1 + costosPct);
    const monto = parseFloat(document.getElementById('cer-calc-monto').value) || 1000000;
    const pricePer1VN = effectivePrice / 100; // precio es por 100 VN (con costos)
    const nominales = monto / pricePer1VN; // VN comprados
    // Show adjusted flows if available (flujos are per 1 VN)
    const flujos = item.flujosAjustados || [];
    let flowsHTML = '';
    let totalCobro = 0;
    if (flujos.length > 0) {
      flowsHTML = flujos.map(f => {
        const scaled = f.monto * nominales;
        totalCobro += scaled;
        return `<tr><td>${f.fecha instanceof Date ? f.fecha.toLocaleDateString('es-AR') : f.fecha}</td><td style="text-align:right">$${f.monto.toFixed(4)}</td><td style="text-align:right;font-weight:600">$${scaled.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}</td></tr>`;
      }).join('');
    }
    const ganancia = totalCobro - monto;
    document.getElementById('cer-calc-resumen').innerHTML = `
      <div style="background:var(--bg-subtle);border-radius:8px;padding:12px 16px;font-size:0.85rem;margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>Comprás</span><strong>${nominales.toFixed(0)} VN a $${pricePer1VN.toFixed(2)}/VN</strong></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>Invertís</span><strong>$${monto.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></div>
        ${totalCobro > 0 ? `<div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>Cobrás (estimado)</span><strong>$${totalCobro.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></div>
        <div style="display:flex;justify-content:space-between;font-size:1rem;margin-top:8px;padding-top:8px;border-top:1px solid var(--border);color:${ganancia >= 0 ? 'var(--green)' : 'var(--red)'}">
          <span>Ganancia estimada</span><strong>${ganancia >= 0 ? '+' : ''}$${ganancia.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></div>` : ''}
      </div>
      ${flowsHTML ? `<h4 style="margin:8px 0;font-size:0.85rem;color:var(--text-secondary)">Flujos ajustados por CER</h4>
      <div>
        <table style="width:100%;font-size:0.8rem;border-collapse:collapse">
          <thead><tr><th style="text-align:left;padding:4px 8px;border-bottom:1px solid var(--border)">Fecha</th>
          <th style="text-align:right;padding:4px 8px;border-bottom:1px solid var(--border)">Por 1 VN</th>
          <th style="text-align:right;padding:4px 8px;border-bottom:1px solid var(--border)">Tu inversión</th></tr></thead>
          <tbody>${flowsHTML}</tbody>
        </table></div>` : '<p style="font-size:0.8rem;color:var(--text-tertiary)">Nota: Los flujos futuros dependen de la evolución del CER (inflación).</p>'}`;
  }
  renderCERResumen();
  const cerTargetInput = document.getElementById('cer-calc-target-tir');
  const cerTargetResult = document.getElementById('cer-calc-target-result');
  function recalcCERTarget() {
    const targetTir = parseFloat(cerTargetInput.value);
    if (!targetTir && targetTir !== 0) { cerTargetResult.innerHTML = 'Ingresá una TIR para ver el precio implícito'; return; }
    const today = new Date();
    const flows = item.flujosAjustados || item.flujos || [];
    const impliedPrice = calcPriceFromYTM(targetTir, flows, today);
    const currentPrice = parseFloat(document.getElementById('cer-calc-price').value) || item.priceArs;
    const upside = ((impliedPrice - currentPrice) / currentPrice * 100);
    const upsideColor = upside >= 0 ? 'var(--green)' : 'var(--red)';
    cerTargetResult.innerHTML = `Precio: <strong style="color:var(--accent)">$${impliedPrice.toFixed(2)}</strong> &nbsp;|&nbsp; Upside: <strong style="color:${upsideColor}">${upside >= 0 ? '+' : ''}${upside.toFixed(1)}%</strong> vs actual`;
  }
  cerTargetInput.addEventListener('input', recalcCERTarget);
  document.getElementById('cer-calc-price').addEventListener('input', () => { renderCERResumen(); recalcCERTarget(); });
  document.getElementById('cer-calc-monto').addEventListener('input', renderCERResumen);
  document.getElementById('cer-calc-arancel').addEventListener('input', renderCERResumen);
  document.getElementById('cer-calc-impuestos').addEventListener('input', renderCERResumen);
}

let cerChart = null;
function renderCERCurve(items) {
  const canvas = document.getElementById('cer-scatter');
  if (!canvas || typeof Chart === 'undefined') return;
  if (cerChart) cerChart.destroy();

  const textColor = '#555555';
  const gridColor = '#1a1a1a';

  // Polynomial regression curve (degree 2, 300 points for smoothness)
  const points = items.map(i => [i.duration, i.ytm]);
  const curve = points.length >= 3 ? fitPolyCurve(points, 2, 300) : [];

  const datasets = [];

  if (curve.length) {
    datasets.push({
      label: currentLanguage === 'en' ? 'CER bonds (curve)' : 'Bonos CER (curva)',
      data: curve,
      borderColor: '#ff9500',
      borderWidth: 1.5,
      borderDash: [6, 3],
      pointRadius: 0,
      pointHitRadius: 0,
      fill: false,
      order: 2,
    });
  }

  datasets.push({
    label: currentLanguage === 'en' ? 'CER bonds' : 'Bonos CER',
    data: items.map(i => ({ x: i.duration, y: i.ytm, label: i.symbol })),
    backgroundColor: '#00d26a',
    borderColor: '#00d26a',
    borderWidth: 1.5,
    pointRadius: 7,
    pointHoverRadius: 9,
    showLine: false,
    order: 1,
  });

  cerChart = new Chart(canvas, {
    type: 'line',
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: textColor, filter: (item) => !item.text.includes('curva') } },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const d = ctx.raw;
              return `${d.label || ''}: TIR Real ${d.y?.toFixed(2) || ctx.parsed.y.toFixed(2)}%`;
            }
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          title: { display: true, text: 'Duration (años)', color: textColor },
          grid: { color: gridColor },
          ticks: { color: textColor },
        },
        y: {
          title: { display: true, text: 'TIR Real (%)', color: textColor },
          grid: { color: gridColor },
          ticks: { color: textColor },
        }
      }
    }
  });
}


// ─── ONs (Obligaciones Negociables) section ───
let onsChart = null;
const BDI_ON_MONITOR = window.BDI_ON_MONITOR || {};

function formatOnNumber(value, digits = 2) {
  if (value == null || !isFinite(value)) return '—';
  return Number(value).toLocaleString('es-AR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatOnPercent(value, digits = 2) {
  if (value == null || !isFinite(value)) return '—';
  return `${formatOnNumber(value, digits)}%`;
}

function formatOnDate(dateValue) {
  if (!dateValue) return '—';
  const date = dateValue instanceof Date ? dateValue : parseLocalDate(dateValue);
  return isNaN(date.getTime()) ? '—' : date.toLocaleDateString('es-AR');
}

function calcConvexity(flows, settlementDate, ytmPct) {
  const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
  const r = ytmPct / 100;
  let pvTotal = 0;
  let convexity = 0;
  for (const flow of flows) {
    const t = (flow.fecha - settlementDate) / MS_PER_YEAR;
    if (t <= 0) continue;
    const pv = flow.monto / Math.pow(1 + r, t);
    pvTotal += pv;
    convexity += pv * (t * t + t);
  }
  return pvTotal > 0 ? convexity / (pvTotal * Math.pow(1 + r, 2)) : 0;
}

function getPrevCouponDate(schedule, today) {
  const pastDates = schedule
    .map((flow) => parseLocalDate(flow.date))
    .filter((date) => date < today);
  if (!pastDates.length) return null;
  return new Date(Math.max(...pastDates.map((date) => date.getTime())));
}

function normalizeOnPrice(rawPrice) {
  if (!rawPrice || !isFinite(rawPrice)) return null;
  return rawPrice < 10 ? rawPrice * 100 : rawPrice;
}

function buildBDIOnItems(prices, mepPrice) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const priceLookup = {};
  for (const item of prices) {
    if (!item?.symbol) continue;
    priceLookup[item.symbol] = parseFloat(item.c || item.price || 0);
  }

  const items = [];
  for (const [symbol, meta] of Object.entries(BDI_ON_MONITOR)) {
    const priceUSD = normalizeOnPrice(priceLookup[meta.usdTicker]);
    if (!priceUSD || priceUSD <= 0) continue;

    const priceARS = normalizeOnPrice(priceLookup[meta.arsTicker]);
    const normalizedFlows = meta.cashflows
      .map((flow) => ({ fecha: parseLocalDate(flow.date), monto: flow.amount / 100 }))
      .filter((flow) => flow.fecha >= today);
    if (!normalizedFlows.length) continue;

    const pricePer100 = priceUSD;
    const pricePer1VN = pricePer100 / 100;
    const ytm = calcYTM(pricePer1VN, normalizedFlows, today);
    if (!isFinite(ytm)) continue;

    const duration = calcDuration(pricePer1VN, normalizedFlows, today, ytm);
    const convexity = calcConvexity(normalizedFlows, today, ytm);
    const implicitFx = priceARS && priceUSD ? priceARS / priceUSD : null;
    const costArsInUsd = implicitFx && mepPrice ? pricePer1VN * (implicitFx / mepPrice) : null;
    const ytmArs = costArsInUsd ? calcYTM(costArsInUsd, normalizedFlows, today) : null;

    const prevCouponDate = getPrevCouponDate(meta.cashflows, today);
    const daysAccrued = prevCouponDate ? Math.round((today - prevCouponDate) / 86400000) : 0;
    const accruedInterest = meta.parValue * (meta.couponAnnual / 100) * (daysAccrued / 365);
    const technicalValue = meta.parValue + accruedInterest;
    const parity = technicalValue > 0 ? (pricePer100 / technicalValue) * 100 : null;

    const nextPaymentRaw = meta.cashflows.find((flow) => parseLocalDate(flow.date) >= today);
    const nextPaymentLabel = nextPaymentRaw
      ? `${formatOnDate(nextPaymentRaw.date)} (US$${formatOnNumber(nextPaymentRaw.amount, 2)})`
      : '—';

    items.push({
      symbol,
      d912Ticker: meta.usdTicker,
      arsTicker: meta.arsTicker,
      company: meta.company,
      rating: meta.rating,
      law: meta.law,
      lotSize: meta.lotSize,
      description: meta.description,
      couponAnnual: meta.couponAnnual,
      priceUSD: pricePer100,
      priceARS,
      implicitFx,
      parity,
      ytm,
      ytmArs,
      duration,
      convexity,
      vencimiento: formatOnDate(meta.cashflows[meta.cashflows.length - 1]?.date),
      nextPaymentLabel,
      mepPrice,
      flujos: normalizedFlows,
    });
  }

  return items.sort((a, b) => b.ytm - a.ytm);
}

async function loadONs() {
  const container = document.getElementById('ons-list');
  container.innerHTML = `<p style="text-align:center;color:var(--text-secondary)">${t('ons_loading')}</p>`;
  try {
    const [pricesRes, cotizacionesRes] = await Promise.all([
      fetch('/api/ons').then(r => r.json()),
      fetch('/api/cotizaciones').then(r => r.json())
    ]);
    const prices = (pricesRes.data || []);
    const mepPrice = cotizacionesRes?.mep?.price || null;
    const items = buildBDIOnItems(prices, mepPrice);
    if (!items.length) {
      container.innerHTML = `<p style="text-align:center;color:var(--text-secondary)">${t('ons_empty')}</p>`;
      document.getElementById('ons-source').textContent = t('ons_source_short');
      (window.renderONsYieldCurve || renderONsYieldCurve)([]);
      return;
    }
    renderONsTable(container, items);
    (window.renderONsYieldCurve || renderONsYieldCurve)(items);
    document.getElementById('ons-source').textContent = t('ons_source_full');
  } catch(err) {
    container.innerHTML = `<p style="color:var(--red)">${t('ons_error', { message: err.message })}</p>`;
  }
}

function renderONsTable(container, items) {
  const mep = items[0]?.mepPrice || null;
  const best = items.reduce((acc, item) => item.ytm > (acc?.ytm ?? -Infinity) ? item : acc, null);
  const avgTir = items.reduce((sum, item) => sum + item.ytm, 0) / items.length;
  const pricedInArs = items.filter((item) => item.priceARS != null).length;

  const summaryCards = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin-bottom:16px">
      <div style="padding:14px 16px;border:1px solid var(--border);border-radius:10px;background:var(--surface)">
        <div style="font-size:0.75rem;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.06em">Dolar MEP</div>
        <div style="margin-top:6px;font-size:1.5rem;font-weight:700;color:var(--accent)">$${formatOnNumber(mep, 2)}</div>
      </div>
      <div style="padding:14px 16px;border:1px solid var(--border);border-radius:10px;background:var(--surface)">
        <div style="font-size:0.75rem;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.06em">Emisores con punta ARS</div>
        <div style="margin-top:6px;font-size:1.5rem;font-weight:700;color:var(--text)">${pricedInArs}/${items.length}</div>
      </div>
      <div style="padding:14px 16px;border:1px solid var(--border);border-radius:10px;background:var(--surface)">
        <div style="font-size:0.75rem;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.06em">TIR promedio</div>
        <div style="margin-top:6px;font-size:1.5rem;font-weight:700;color:var(--text)">${formatOnPercent(avgTir, 2)}</div>
      </div>
      <div style="padding:14px 16px;border:1px solid var(--border);border-radius:10px;background:var(--surface)">
        <div style="font-size:0.75rem;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.06em">Mejor TIR</div>
        <div style="margin-top:6px;font-size:1.5rem;font-weight:700;color:var(--green)">${best ? `${best.symbol} · ${formatOnPercent(best.ytm, 2)}` : '—'}</div>
      </div>
    </div>`;

  let html = `<div class="bdi-ons-table-wrap"><table class="soberanos-table bdi-ons-table">
    <thead><tr><th>TICKER</th><th>EMISOR</th><th class="col-ley">LEY</th><th>ARS</th><th>USD</th><th>TC IMPL.</th><th>PARIDAD</th><th>TIR USD</th><th>TIR ARS</th><th class="col-duration">DURATION</th><th class="col-vto">PROX. PAGO</th><th class="col-vto">VTO.</th></tr></thead><tbody>`;
  for (const item of items) {
    html += `<tr class="on-row" data-symbol="${item.symbol}" style="cursor:pointer">
      <td>
        <strong style="color:var(--accent)">${item.symbol}</strong>
        <div style="font-size:0.72rem;color:var(--text-secondary)">${item.d912Ticker}${item.arsTicker ? ` / ${item.arsTicker}` : ''}</div>
      </td>
      <td>
        <div>${item.company || ''}</div>
        <div style="font-size:0.72rem;color:var(--text-secondary)">Calif.: ${item.rating || '—'} · Lamina: ${item.lotSize || '—'}</div>
      </td>
      <td>${item.law || '—'}</td>
      <td style="text-align:right">${item.priceARS != null ? `$${formatOnNumber(item.priceARS, 2)}` : '—'}</td>
      <td style="text-align:right">US$${formatOnNumber(item.priceUSD, 2)}</td>
      <td style="text-align:right">${item.implicitFx != null ? `$${formatOnNumber(item.implicitFx, 2)}` : '—'}</td>
      <td style="text-align:right">${formatOnPercent(item.parity, 2)}</td>
      <td class="lecap-tir" style="text-align:right">${formatOnPercent(item.ytm, 2)}</td>
      <td style="text-align:right">${formatOnPercent(item.ytmArs, 2)}</td>
      <td class="col-duration" style="text-align:right">${formatOnNumber(item.duration, 2)}</td>
      <td class="col-vto bdi-ons-next-payment">${item.nextPaymentLabel}</td>
      <td class="col-vto bdi-ons-maturity">${item.vencimiento}</td></tr>`;
  }
  html += '</tbody></table></div><p class="calc-hint">💡 <span>Click</span> en cualquier ON para abrir la calculadora y revisar sensibilidad, flujos y ficha tecnica.</p>';
  container.innerHTML = summaryCards + html;
  // Make sortable
  const table = container.querySelector('.soberanos-table');
  if (table) makeSortable(table);
  container.querySelectorAll('.on-row').forEach(row => {
    row.addEventListener('click', () => {
      const sym = row.dataset.symbol;
      const item = items.find(i => i.symbol === sym);
      if (item) openONCalculator(item);
    });
  });
}

function renderONsYieldCurve(items) {
  const canvas = document.getElementById('ons-scatter');
  if (!canvas || typeof Chart === 'undefined') return;
  if (onsChart) onsChart.destroy();
  if (!items.length) return;
  const textColor = '#555555';
  const gridColor = '#1a1a1a';
  const points = [...items]
    .sort((a, b) => a.duration - b.duration)
    .map(i => ({ x: i.duration, y: i.ytm, label: i.symbol }));
  const curvePoints = points.length >= 3 ? fitPolyCurve(points.map(p => [p.x, p.y]), 2, 200) : [];
  const datasets = [{
    label: 'ONs', data: points, backgroundColor: '#00d26a', borderColor: '#00d26a',
    pointRadius: 5, pointHoverRadius: 7, showLine: false,
  }];
  if (curvePoints.length > 0) {
    datasets.push({
      label: 'Curva', data: curvePoints, borderColor: '#ff9500', borderWidth: 1.5,
      borderDash: [4, 3], pointRadius: 0, showLine: true, tension: 0, fill: false,
    });
  }
  onsChart = new Chart(canvas, {
    type: 'scatter', data: { datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1a1a1a', titleColor: '#ff9500', bodyColor: '#e0e0e0', borderColor: '#333', borderWidth: 1, callbacks: { label: ctx => { const p = ctx.raw; return p.label ? `${p.label}: ${p.y.toFixed(2)}%` : `${p.y.toFixed(2)}%`; } } } },
      scales: {
        x: { type: 'linear', title: { display: true, text: 'Duration (años)', color: textColor }, grid: { color: gridColor }, ticks: { color: textColor } },
        y: { type: 'linear', title: { display: true, text: 'TIR (%)', color: textColor }, grid: { color: gridColor }, ticks: { color: textColor, callback: v => v.toFixed(1) + '%' } }
      }
    }
  });
}

function openONCalculator(item) {
  document.querySelector('.mundo-modal-overlay')?.remove();
  const overlay = document.createElement('div');
  overlay.className = 'mundo-modal-overlay';
  const inputStyle = 'display:block;font-size:1.1rem;font-weight:700;width:130px;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text)';
  overlay.innerHTML = `
    <div class="mundo-modal">
      <div class="mundo-modal-header">
        <div><h3 style="margin:0">${item.symbol} — ${item.company || item.d912Ticker}</h3>
        <p style="margin:4px 0 0;color:var(--text-secondary);font-size:0.85rem">${item.d912Ticker}${item.arsTicker ? ` / ${item.arsTicker}` : ''} · Vencimiento: ${item.vencimiento}</p></div>
        <button class="mundo-modal-close">&times;</button>
      </div>
      <div class="mundo-modal-body" style="padding:16px">
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px">
          <span style="padding:6px 10px;border-radius:999px;background:rgba(19,114,71,0.12);color:var(--accent);font-size:0.78rem;font-weight:700">Ley ${item.law || '—'}</span>
          <span style="padding:6px 10px;border-radius:999px;background:var(--bg-subtle);color:var(--text-secondary);font-size:0.78rem;font-weight:700">Calif. ${item.rating || '—'}</span>
          <span style="padding:6px 10px;border-radius:999px;background:var(--bg-subtle);color:var(--text-secondary);font-size:0.78rem;font-weight:700">Lamina ${item.lotSize || '—'}</span>
          <span style="padding:6px 10px;border-radius:999px;background:var(--bg-subtle);color:var(--text-secondary);font-size:0.78rem;font-weight:700">Paridad ${formatOnPercent(item.parity, 2)}</span>
          <span style="padding:6px 10px;border-radius:999px;background:var(--bg-subtle);color:var(--text-secondary);font-size:0.78rem;font-weight:700">Prox. pago ${item.nextPaymentLabel || '—'}</span>
        </div>
        ${item.description ? `<p style="margin:0 0 14px;color:var(--text-secondary);line-height:1.55">${item.description}</p>` : ''}
        <div style="display:flex;gap:20px;align-items:center;margin-bottom:12px;flex-wrap:wrap">
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">Precio USD</label>
            <input type="number" id="on-calc-price" value="${item.priceUSD.toFixed(2)}" step="0.01" style="${inputStyle}"></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">Monto a invertir (USD)</label>
            <input type="number" id="on-calc-monto" value="10000" step="100" style="${inputStyle}"></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">TIR</label>
            <div id="on-calc-tir" style="font-size:1.5rem;font-weight:700;color:${item.ytm >= 0 ? 'var(--green)' : 'var(--red)'}">${item.ytm.toFixed(2)}%</div></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">Duration</label>
            <div id="on-calc-duration" style="font-size:1.2rem;font-weight:600;color:var(--text)">${item.duration.toFixed(2)} años</div></div>
        </div>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px;flex-wrap:wrap;padding:8px 12px;background:var(--bg-subtle);border-radius:6px">
          <span style="font-size:0.75rem;color:var(--text-secondary);font-weight:600">Referencia BDI:</span>
          <span style="font-size:0.82rem;color:var(--text-secondary)">Precio ARS: <strong style="color:var(--text)">${item.priceARS != null ? `$${formatOnNumber(item.priceARS, 2)}` : '—'}</strong></span>
          <span style="font-size:0.82rem;color:var(--text-secondary)">TC implicito: <strong style="color:var(--text)">${item.implicitFx != null ? `$${formatOnNumber(item.implicitFx, 2)}` : '—'}</strong></span>
          <span style="font-size:0.82rem;color:var(--text-secondary)">TIR ARS: <strong style="color:var(--text)">${formatOnPercent(item.ytmArs, 2)}</strong></span>
          <span style="font-size:0.82rem;color:var(--text-secondary)">Convexity: <strong style="color:var(--text)">${formatOnNumber(item.convexity, 2)}</strong></span>
        </div>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px;flex-wrap:wrap;padding:8px 12px;background:var(--bg-subtle);border-radius:6px">
          <span style="font-size:0.75rem;color:var(--text-secondary);font-weight:600">Costos:</span>
          <div style="display:flex;align-items:center;gap:4px"><label style="font-size:0.75rem;color:var(--text-secondary)">Arancel %</label>
            <input type="number" id="on-calc-arancel" value="0.45" step="0.01" style="width:70px;padding:4px 6px;font-size:0.85rem;font-weight:600;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)"></div>
          <div style="display:flex;align-items:center;gap:4px"><label style="font-size:0.75rem;color:var(--text-secondary)">Impuestos %</label>
            <input type="number" id="on-calc-impuestos" value="0.01" step="0.01" style="width:70px;padding:4px 6px;font-size:0.85rem;font-weight:600;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)"></div>
        </div>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px;flex-wrap:wrap;padding:10px 12px;background:#0a1628;border:1px solid #1a3050;border-radius:2px">
          <span style="font-size:0.75rem;color:var(--blue);font-weight:700">TIR Objetivo:</span>
          <div style="display:flex;align-items:center;gap:4px"><label style="font-size:0.75rem;color:var(--text-secondary)">TIR %</label>
            <input type="number" id="on-calc-target-tir" value="" placeholder="${item.ytm.toFixed(1)}" step="0.1" style="width:80px;padding:4px 6px;font-size:0.85rem;font-weight:600;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)"></div>
          <div id="on-calc-target-result" style="font-size:0.8rem;color:var(--text-secondary)">Ingresá una TIR para ver el precio implícito</div>
        </div>
        <h4 style="margin:12px 0 8px;font-size:0.85rem;color:var(--text-secondary)">Flujos de fondos</h4>
        <div id="on-calc-flows"></div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.mundo-modal-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  function renderONFlows() {
    const price = parseFloat(document.getElementById('on-calc-price').value) || item.priceUSD;
    const arancel = parseFloat(document.getElementById('on-calc-arancel').value) || 0;
    const impuestos = parseFloat(document.getElementById('on-calc-impuestos').value) || 0;
    const costosPct = (arancel + impuestos) / 100;
    const effectivePrice = price * (1 + costosPct);
    const monto = parseFloat(document.getElementById('on-calc-monto').value) || 10000;
    const pricePer1VN = effectivePrice / 100; // precio por 1 VN (con costos)
    const nominales = monto / pricePer1VN; // VN comprados
    const scale = nominales; // flujos son por 1 VN, multiplicar por cantidad de VN
    const flowsHTML = item.flujos.map(f => {
      const scaled = f.monto * scale;
      return `<tr><td>${f.fecha.toLocaleDateString('es-AR')}</td><td style="text-align:right">$${f.monto.toFixed(6)}</td><td style="text-align:right;font-weight:600">$${scaled.toFixed(2)}</td></tr>`;
    }).join('');
    const totalPer1VN = item.flujos.reduce((s, f) => s + f.monto, 0);
    const totalScaled = totalPer1VN * scale;
    const ganancia = totalScaled - monto;
    document.getElementById('on-calc-flows').innerHTML = `
      <table style="width:100%;font-size:0.8rem;border-collapse:collapse">
        <thead><tr><th style="text-align:left;padding:4px 8px;border-bottom:1px solid var(--border)">Fecha</th>
        <th style="text-align:right;padding:4px 8px;border-bottom:1px solid var(--border)">Por 1 VN</th>
        <th style="text-align:right;padding:4px 8px;border-bottom:1px solid var(--border)">Tu inversión</th></tr></thead>
        <tbody>${flowsHTML}</tbody>
        <tfoot>
          <tr style="font-weight:700;border-top:2px solid var(--border)">
            <td style="padding:4px 8px">Total cobros</td><td style="text-align:right;padding:4px 8px">$${totalPer1VN.toFixed(6)}</td>
            <td style="text-align:right;padding:4px 8px">$${totalScaled.toFixed(2)}</td></tr>
          <tr style="font-weight:700;color:${ganancia >= 0 ? 'var(--green)' : 'var(--red)'}">
            <td style="padding:4px 8px">Ganancia</td><td></td>
            <td style="text-align:right;padding:4px 8px">${ganancia >= 0 ? '+' : ''}$${ganancia.toFixed(2)}</td></tr>
        </tfoot>
      </table>
      <p style="font-size:0.7rem;color:var(--text-tertiary);margin-top:8px">Comprás ${nominales.toFixed(0)} VN a $${pricePer1VN.toFixed(4)}/VN (precio ${price.toFixed(2)} por 100 VN)</p>`;
  }
  renderONFlows();

  const priceInput = document.getElementById('on-calc-price');
  const montoInput = document.getElementById('on-calc-monto');
  const arancelInput = document.getElementById('on-calc-arancel');
  const impuestosInput = document.getElementById('on-calc-impuestos');
  const tirDisplay = document.getElementById('on-calc-tir');
  const durDisplay = document.getElementById('on-calc-duration');
  function recalc() {
    const newPrice = parseFloat(priceInput.value);
    if (!newPrice || newPrice <= 0) return;
    const arancel = parseFloat(arancelInput.value) || 0;
    const impuestos = parseFloat(impuestosInput.value) || 0;
    const costosPct = (arancel + impuestos) / 100;
    const effectivePrice = (newPrice / 100) * (1 + costosPct);
    const today = new Date();
    const newYtm = calcYTM(effectivePrice, item.flujos, today);
    const newDur = calcDuration(effectivePrice, item.flujos, today, newYtm);
    if (isFinite(newYtm)) { tirDisplay.textContent = newYtm.toFixed(2) + '%'; tirDisplay.style.color = newYtm >= 0 ? 'var(--green)' : 'var(--red)'; }
    if (isFinite(newDur)) { durDisplay.textContent = newDur.toFixed(2) + ' años'; }
    renderONFlows();
  }
  const onTargetInput = document.getElementById('on-calc-target-tir');
  const onTargetResult = document.getElementById('on-calc-target-result');
  function recalcONTarget() {
    const targetTir = parseFloat(onTargetInput.value);
    if (!targetTir && targetTir !== 0) { onTargetResult.innerHTML = 'Ingresá una TIR para ver el precio implícito'; return; }
    const today = new Date();
    const impliedPricePer1 = calcPriceFromYTM(targetTir, item.flujos, today);
    const impliedPrice = impliedPricePer1 * 100; // ONs: price per 100 VN
    const currentPrice = parseFloat(priceInput.value) || item.priceUSD;
    const upside = ((impliedPrice - currentPrice) / currentPrice * 100);
    const upsideColor = upside >= 0 ? 'var(--green)' : 'var(--red)';
    onTargetResult.innerHTML = `Precio: <strong style="color:var(--accent)">US$${impliedPrice.toFixed(2)}</strong> &nbsp;|&nbsp; Upside: <strong style="color:${upsideColor}">${upside >= 0 ? '+' : ''}${upside.toFixed(1)}%</strong> vs actual`;
  }
  onTargetInput.addEventListener('input', recalcONTarget);
  priceInput.addEventListener('input', () => { recalc(); recalcONTarget(); });
  montoInput.addEventListener('input', renderONFlows);
  arancelInput.addEventListener('input', recalc);
  impuestosInput.addEventListener('input', recalc);
  recalc();
}

// ─── Generic sortable table ───
function makeSortable(tableEl) {
  const headers = tableEl.querySelectorAll('th');
  let currentSort = { col: -1, asc: true };
  headers.forEach((th, colIdx) => {
    const arrow = document.createElement('span');
    arrow.className = 'sort-arrow';
    arrow.textContent = '↕';
    th.appendChild(arrow);
    th.addEventListener('click', () => {
      const asc = currentSort.col === colIdx ? !currentSort.asc : false; // default descending
      currentSort = { col: colIdx, asc };
      // Update arrows
      headers.forEach(h => { const a = h.querySelector('.sort-arrow'); if (a) { a.textContent = '↕'; a.classList.remove('active'); } });
      arrow.textContent = asc ? '↑' : '↓';
      arrow.classList.add('active');
      // Sort rows
      const tbody = tableEl.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      rows.sort((a, b) => {
        const aText = a.cells[colIdx]?.textContent.trim().replace(/[%$,]/g, '') || '';
        const bText = b.cells[colIdx]?.textContent.trim().replace(/[%$,]/g, '') || '';
        const aNum = parseFloat(aText);
        const bNum = parseFloat(bText);
        if (!isNaN(aNum) && !isNaN(bNum)) return asc ? aNum - bNum : bNum - aNum;
        return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
      });
      rows.forEach(r => tbody.appendChild(r));
    });
  });
}

// ─── LECAP Calculator Popup ───
function openLecapCalculator(item) {
  document.querySelector('.mundo-modal-overlay')?.remove();
  const overlay = document.createElement('div');
  overlay.className = 'mundo-modal-overlay';
  const inputStyle = 'display:block;font-size:1.1rem;font-weight:700;width:130px;padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text)';
  overlay.innerHTML = `
    <div class="mundo-modal">
      <div class="mundo-modal-header">
        <div><h3 style="margin:0">${item.ticker} — Calculadora</h3>
        <p style="margin:4px 0 0;color:var(--text-secondary);font-size:0.85rem">${item.tipo || 'LECAP'} — Vence: ${item.vencimiento} — Pago final: ${item.pago_final}</p></div>
        <button class="mundo-modal-close">&times;</button>
      </div>
      <div class="mundo-modal-body" style="padding:16px">
        <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">Precio</label>
            <input type="number" id="lecap-calc-price" value="${item.precio.toFixed(2)}" step="0.01" style="${inputStyle}"></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">Monto a invertir ($)</label>
            <input type="number" id="lecap-calc-monto" value="1000000" step="10000" style="${inputStyle}"></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">TNA</label>
            <div id="lecap-calc-tna" style="font-size:1.3rem;font-weight:700;color:var(--text)">${item.tna.toFixed(2)}%</div></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">TIR</label>
            <div id="lecap-calc-tir" style="font-size:1.5rem;font-weight:700;color:var(--green)">${item.tir.toFixed(2)}%</div></div>
          <div><label style="font-size:0.8rem;color:var(--text-secondary)">Días</label>
            <div style="font-size:1.2rem;font-weight:600;color:var(--text)">${item.dias}</div></div>
        </div>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px;flex-wrap:wrap;padding:8px 12px;background:var(--bg-subtle);border-radius:6px">
          <span style="font-size:0.75rem;color:var(--text-secondary);font-weight:600">Costos:</span>
          <div style="display:flex;align-items:center;gap:4px"><label style="font-size:0.75rem;color:var(--text-secondary)">Arancel %</label>
            <input type="number" id="lecap-calc-arancel" value="0.10" step="0.01" style="width:70px;padding:4px 6px;font-size:0.85rem;font-weight:600;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)"></div>
          <div style="display:flex;align-items:center;gap:4px"><label style="font-size:0.75rem;color:var(--text-secondary)">Impuestos %</label>
            <input type="number" id="lecap-calc-impuestos" value="0.01" step="0.01" style="width:70px;padding:4px 6px;font-size:0.85rem;font-weight:600;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)"></div>
        </div>
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px;flex-wrap:wrap;padding:10px 12px;background:#0a1628;border:1px solid #1a3050;border-radius:2px">
          <span style="font-size:0.75rem;color:var(--blue);font-weight:700">TIR Objetivo:</span>
          <div style="display:flex;align-items:center;gap:4px"><label style="font-size:0.75rem;color:var(--text-secondary)">TIR %</label>
            <input type="number" id="lecap-calc-target-tir" value="" placeholder="${item.tir.toFixed(1)}" step="0.1" style="width:80px;padding:4px 6px;font-size:0.85rem;font-weight:600;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)"></div>
          <div id="lecap-calc-target-result" style="font-size:0.8rem;color:var(--text-secondary)">Ingresá una TIR para ver el precio implícito</div>
        </div>
        <div id="lecap-calc-resumen"></div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.mundo-modal-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  function renderLecapResumen() {
    const price = parseFloat(document.getElementById('lecap-calc-price').value) || item.precio;
    const arancel = parseFloat(document.getElementById('lecap-calc-arancel').value) || 0;
    const impuestos = parseFloat(document.getElementById('lecap-calc-impuestos').value) || 0;
    const costosPct = (arancel + impuestos) / 100;
    const effectivePrice = price * (1 + costosPct);
    const monto = parseFloat(document.getElementById('lecap-calc-monto').value) || 1000000;
    const nominales = monto / effectivePrice * 100; // VN comprados (precio efectivo con costos)
    const cobro = nominales / 100 * item.pago_final;
    const ganancia = cobro - monto;
    document.getElementById('lecap-calc-resumen').innerHTML = `
      <div style="background:var(--bg-subtle);border-radius:8px;padding:12px 16px;font-size:0.85rem">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>Comprás</span><strong>${nominales.toFixed(0)} VN a $${price.toFixed(2)}</strong></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>Invertís</span><strong>$${monto.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>Al vencimiento cobrás</span><strong>$${cobro.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></div>
        <div style="display:flex;justify-content:space-between;font-size:1rem;margin-top:8px;padding-top:8px;border-top:1px solid var(--border);color:${ganancia >= 0 ? 'var(--green)' : 'var(--red)'}">
          <span>Ganancia</span><strong>${ganancia >= 0 ? '+' : ''}$${ganancia.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2})}</strong></div>
      </div>`;
  }
  renderLecapResumen();

  function recalcLecap() {
    const p = parseFloat(document.getElementById('lecap-calc-price').value);
    if (!p || p <= 0) return;
    const arancel = parseFloat(document.getElementById('lecap-calc-arancel').value) || 0;
    const impuestos = parseFloat(document.getElementById('lecap-calc-impuestos').value) || 0;
    const costosPct = (arancel + impuestos) / 100;
    const ep = p * (1 + costosPct); // precio efectivo con costos
    const tna = (item.pago_final / ep - 1) * (365 / item.dias) * 100;
    const tir = (Math.pow(item.pago_final / ep, 365 / item.dias) - 1) * 100;
    document.getElementById('lecap-calc-tna').textContent = tna.toFixed(2) + '%';
    const tirEl = document.getElementById('lecap-calc-tir');
    tirEl.textContent = tir.toFixed(2) + '%';
    tirEl.style.color = tir >= 0 ? 'var(--green)' : 'var(--red)';
    renderLecapResumen();
  }
  const lecapTargetInput = document.getElementById('lecap-calc-target-tir');
  const lecapTargetResult = document.getElementById('lecap-calc-target-result');
  function recalcLecapTarget() {
    const targetTir = parseFloat(lecapTargetInput.value);
    if (!targetTir && targetTir !== 0) { lecapTargetResult.innerHTML = 'Ingresá una TIR para ver el precio implícito'; return; }
    const impliedPrice = item.pago_final / Math.pow(1 + targetTir / 100, item.dias / 365);
    const currentPrice = parseFloat(document.getElementById('lecap-calc-price').value) || item.precio;
    const upside = ((impliedPrice - currentPrice) / currentPrice * 100);
    const upsideColor = upside >= 0 ? 'var(--green)' : 'var(--red)';
    lecapTargetResult.innerHTML = `Precio: <strong style="color:var(--accent)">$${impliedPrice.toFixed(2)}</strong> &nbsp;|&nbsp; Upside: <strong style="color:${upsideColor}">${upside >= 0 ? '+' : ''}${upside.toFixed(1)}%</strong> vs actual`;
  }
  lecapTargetInput.addEventListener('input', recalcLecapTarget);
  document.getElementById('lecap-calc-price').addEventListener('input', () => { recalcLecap(); recalcLecapTarget(); });
  document.getElementById('lecap-calc-monto').addEventListener('input', renderLecapResumen);
  document.getElementById('lecap-calc-arancel').addEventListener('input', recalcLecap);
  document.getElementById('lecap-calc-impuestos').addEventListener('input', recalcLecap);
  recalcLecap();
}

// ─── PORTFOLIO MODULE ───

const MONTH_NAMES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

const ASSET_TYPES = {
  soberano: { label: currentLanguage === 'en' ? 'Sovereigns' : 'Soberanos', emoji: '🏛️', currency: 'USD', qtyLabel: currentLanguage === 'en' ? 'Face value (VN)' : 'Valor Nominal (VN)' },
  on: { label: currentLanguage === 'en' ? 'Corporate bonds' : 'ONs', emoji: '🏢', currency: 'USD', qtyLabel: currentLanguage === 'en' ? 'Face value (VN)' : 'Valor Nominal (VN)' },
  cer: { label: currentLanguage === 'en' ? 'CER bonds' : 'Bonos CER', emoji: '📊', currency: 'ARS', qtyLabel: currentLanguage === 'en' ? 'Face value (VN)' : 'Valor Nominal (VN)' },
  lecap: { label: 'LECAPs', emoji: '📈', currency: 'ARS', qtyLabel: currentLanguage === 'en' ? 'Face value (VN)' : 'Valor Nominal (VN)' },
  fci: { label: 'FCIs', emoji: '💰', currency: 'ARS', qtyLabel: currentLanguage === 'en' ? 'Fund units' : 'Cuotapartes' },
  garantizado: { label: currentLanguage === 'en' ? 'Wallets' : 'Billeteras', emoji: '🏦', currency: 'ARS', qtyLabel: currentLanguage === 'en' ? 'Amount (ARS)' : 'Monto (ARS)' },
  cash: { label: 'Cash', emoji: '💵', currency: 'USD', qtyLabel: currentLanguage === 'en' ? 'Amount' : 'Monto' },
  custom: { label: currentLanguage === 'en' ? 'Other' : 'Otro', emoji: '⭐', currency: 'USD', qtyLabel: currentLanguage === 'en' ? 'Quantity' : 'Cantidad' },
};

// ─── PPP & Operations helpers ───
function getOperationsFromHolding(holding) {
  if (Array.isArray(holding.metadata?.operations) && holding.metadata.operations.length > 0) {
    return holding.metadata.operations;
  }
  // Backwards compat: synthesize single buy from existing data
  return [{
    type: 'buy',
    qty: parseFloat(holding.quantity) || 0,
    price: parseFloat(holding.purchase_price) || 0,
    date: holding.purchase_date || new Date().toISOString().slice(0, 10)
  }];
}

function computePosition(operations) {
  let totalBuyQty = 0, totalBuyCost = 0, totalSellQty = 0;
  for (const op of operations) {
    const qty = parseFloat(op.qty) || 0;
    const price = parseFloat(op.price) || 0;
    if (op.type === 'buy') {
      totalBuyQty += qty;
      totalBuyCost += qty * price;
    } else if (op.type === 'sell') {
      totalSellQty += qty;
    }
  }
  const netQty = totalBuyQty - totalSellQty;
  const ppp = totalBuyQty > 0 ? totalBuyCost / totalBuyQty : 0;
  return { ppp, netQty };
}

async function addOperationToHolding(holdingId, operation) {
  const holding = _portfolioHoldings.find(h => h.id === holdingId);
  if (!holding) return { error: 'Holding no encontrado' };

  const ops = getOperationsFromHolding(holding);
  if (operation.type === 'sell') {
    const { netQty } = computePosition(ops);
    if (operation.qty > netQty) return { error: `No podes vender más de ${netQty}` };
  }
  ops.push(operation);
  const { ppp, netQty } = computePosition(ops);

  const newMeta = { ...(holding.metadata || {}), operations: ops };
  const { error } = await supabaseClient.from('holdings').update({
    quantity: netQty,
    purchase_price: ppp,
    metadata: newMeta,
  }).eq('id', holdingId);

  if (error) return { error: error.message };
  return { ok: true };
}

let _portfolioHoldings = [];
let _portfolioPrices = {};
let _portfolioLoading = false;
let _portfolioTC = null; // tipo de cambio implícito (AL30 ARS / AL30D USD)
let _portfolioViewCurrency = 'split'; // 'split' | 'usd' | 'ars'

async function getPortfolioConfig() {
  if (_portfolioConfig) return _portfolioConfig;
  const resp = await fetch('/api/config');
  _portfolioConfig = await resp.json();
  return _portfolioConfig;
}

function getSovereignMetadataMap(config) {
  return window.BDIFixedIncomeData?.soberanos?.adapters?.getConfigMap?.()
    || config?.soberanos
    || {};
}

function getCerMetadataMap(config) {
  return window.BDIFixedIncomeData?.cer?.adapters?.getConfigMap?.()
    || config?.bonos_cer
    || {};
}

function getLecapMetadataConfig(config) {
  return window.BDIFixedIncomeData?.lecaps?.adapters?.getConfig?.()
    || config?.lecaps
    || { letras: [] };
}

function getLecapMetadataByTicker(config, ticker) {
  return window.BDIFixedIncomeData?.lecaps?.adapters?.getByTicker?.(ticker)
    || (config?.lecaps?.letras || []).find((item) => item.ticker === ticker)
    || null;
}

function getTickersForType(config, type) {
  switch (type) {
    case 'soberano': return Object.keys(getSovereignMetadataMap(config));
    case 'on': return Object.keys(config.ons || {});
    case 'cer': return Object.keys(getCerMetadataMap(config));
    case 'lecap': return (getLecapMetadataConfig(config).letras || []).filter(l => l.activo).map(l => l.ticker);
    case 'fci': return (config.fcis || []).filter(f => f.activo).map(f => f.nombre);
    case 'garantizado': return [...(config.garantizados || []), ...(config.especiales || [])].filter(g => g.activo).map(g => g.nombre);
    case 'cash': return ['USD', 'ARS'];
    case 'custom': return [];
    default: return [];
  }
}

async function loadPortfolio() {
  if (!supabaseClient || !currentUser || _portfolioLoading) return;
  _portfolioLoading = true;

  const holdingsEl = document.getElementById('portfolio-holdings');
  holdingsEl.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';

  try {
    const { data, error } = await supabaseClient.from('holdings').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    _portfolioHoldings = data || [];

    const config = await getPortfolioConfig();
    const [prices, tc] = await Promise.all([
      fetchPortfolioPrices(_portfolioHoldings, config),
      fetchTipoCambio(),
    ]);
    _portfolioPrices = prices;
    _portfolioTC = tc;

    renderPortfolioGreeting();
    renderPortfolioTCToggle(config);
    renderPortfolioSummary(config);
    renderPortfolioHoldings(config);
    renderPortfolioCashflows(config);
  } catch (e) {
    holdingsEl.innerHTML = `<p style="color:var(--red);font-size:0.85rem">Error cargando portfolio: ${e.message}</p>`;
  }
  _portfolioLoading = false;
}

async function fetchPortfolioPrices(holdings, config) {
  const needs = new Set(holdings.map(h => h.asset_type));
  const prices = {};
  const fetches = [];

  if (needs.has('soberano')) {
    fetches.push(fetch('/api/soberanos').then(r => r.json()).then(d => {
      for (const b of (d.data || [])) prices['soberano:' + b.symbol] = { price: parseFloat(b.c || b.price_usd || 0), currency: 'USD' };
    }).catch(() => {}));
  }
  if (needs.has('on')) {
    fetches.push(fetch('/api/ons').then(r => r.json()).then(d => {
      for (const b of (d.data || [])) {
        prices['on:' + b.symbol] = { price: parseFloat(b.c || 0), currency: 'USD' };
        // Also store without D suffix so holdings match (MGCRD → MGCR)
        const noD = b.symbol.endsWith('D') ? b.symbol.slice(0, -1) : b.symbol;
        prices['on:' + noD] = { price: parseFloat(b.c || 0), currency: 'USD' };
      }
    }).catch(() => {}));
  }
  if (needs.has('lecap')) {
    fetches.push(fetch('/api/lecaps').then(r => r.json()).then(d => {
      for (const item of (d.data || [])) prices['lecap:' + item.symbol] = { price: parseFloat(item.c || item.price || 0), currency: 'ARS' };
    }).catch(() => {}));
  }
  if (needs.has('cer')) {
    fetches.push(fetch('/api/cer-precios').then(r => r.json()).then(d => {
      for (const b of (d.data || [])) prices['cer:' + b.symbol] = { price: parseFloat(b.c || 0), currency: 'ARS' };
    }).catch(() => {}));
  }
  // FCIs and garantizados: use config TNA (no market price per se)
  if (needs.has('garantizado')) {
    const all = [...(config.garantizados || []), ...(config.especiales || [])];
    for (const g of all) prices['garantizado:' + g.nombre] = { tna: g.tna, currency: 'ARS' };
  }

  await Promise.all(fetches);
  return prices;
}

async function fetchTipoCambio() {
  try {
    // Fetch all bonds from data912 via cer-precios (which hits arg_bonds) - it has both ARS and USD tickers
    const resp = await fetch('https://data912.com/live/arg_bonds');
    const raw = await resp.json();
    const bonds = Array.isArray(raw) ? raw : [];
    const al30ars = bonds.find(b => b.symbol === 'AL30');
    const al30usd = bonds.find(b => b.symbol === 'AL30D');
    if (al30ars && al30usd) {
      const arsPrice = parseFloat(al30ars.c || 0);
      const usdPrice = parseFloat(al30usd.c || 0);
      if (usdPrice > 0 && arsPrice > 0) return arsPrice / usdPrice;
    }
  } catch (e) { /* ignore */ }
  return null;
}

function renderPortfolioGreeting() {
  const el = document.getElementById('portfolio-greeting');
  if (!el || !currentUser) return;
  const name = (currentUser.user_metadata?.full_name || currentUser.email || '').split(' ')[0];
  const hour = new Date().getHours();
  let saludo = 'Buenas noches';
  if (hour >= 6 && hour < 12) saludo = 'Buenos días';
  else if (hour >= 12 && hour < 19) saludo = 'Buenas tardes';
  el.innerHTML = `
    <h2 style="font-size:1.6rem;margin:0">${saludo}, ${name} 👋</h2>
    <p style="color:var(--text-tertiary);font-size:0.82rem;margin-top:4px">Gracias por usar rendimientos.co — hecho con mucho ❤️ desde Argentina 🇦🇷. Parece que HTML funciona 😂</p>`;
}

function renderPortfolioTCToggle(config) {
  const el = document.getElementById('portfolio-tc-toggle');
  if (!el) return;
  const tcStr = _portfolioTC ? `TC: $${_portfolioTC.toLocaleString('es-AR', {maximumFractionDigits:0})}` : '';
  el.innerHTML = `
    <button class="portfolio-tc-btn ${_portfolioViewCurrency === 'split' ? 'active' : ''}" data-vc="split">USD + ARS</button>
    <button class="portfolio-tc-btn ${_portfolioViewCurrency === 'usd' ? 'active' : ''}" data-vc="usd">Todo USD</button>
    <button class="portfolio-tc-btn ${_portfolioViewCurrency === 'ars' ? 'active' : ''}" data-vc="ars">Todo ARS</button>
    ${tcStr ? `<span style="font-size:0.65rem;color:var(--text-tertiary);padding:4px 8px">${tcStr}</span>` : ''}`;
  el.querySelectorAll('.portfolio-tc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      _portfolioViewCurrency = btn.dataset.vc;
      renderPortfolioTCToggle(config);
      renderPortfolioSummary(config);
      renderPortfolioHoldings(config);
    });
  });
}

function getHoldingValue(holding, config) {
  const key = holding.asset_type + ':' + holding.ticker;
  const priceData = _portfolioPrices[key];
  const qty = parseFloat(holding.quantity) || 0;
  const purchasePrice = parseFloat(holding.purchase_price) || 0;

  if (holding.asset_type === 'cash') {
    const curr = holding.ticker === 'USD' ? 'USD' : 'ARS';
    return { currentPrice: null, value: qty, pnl: 0, currency: curr };
  }
  if (holding.asset_type === 'custom') {
    const curr = (holding.metadata?.currency) || 'USD';
    const manualPrice = parseFloat(holding.metadata?.current_price) || purchasePrice;
    const value = qty * manualPrice;
    const cost = qty * purchasePrice;
    return { currentPrice: manualPrice, value, cost, pnl: value - cost, currency: curr };
  }
  if (holding.asset_type === 'garantizado') {
    return { currentPrice: null, value: qty, pnl: 0, currency: 'ARS', tna: priceData?.tna };
  }
  if (holding.asset_type === 'fci') {
    // FCIs: qty = cuotapartes, price = NAV per cuotaparte
    // We don't have live NAV per holding easily, just show purchase value
    return { currentPrice: null, value: qty * purchasePrice, pnl: 0, currency: 'ARS' };
  }

  const currentPrice = priceData?.price || 0;
  const currency = priceData?.currency || ASSET_TYPES[holding.asset_type]?.currency || 'USD';

  // No live price available
  if (!currentPrice) {
    const cost = (purchasePrice / 100) * qty;
    return { currentPrice: null, value: cost, cost, pnl: null, currency, noPrice: true };
  }

  // For bonds: qty = VN, price is per 100 VN
  const value = (currentPrice / 100) * qty;
  const cost = (purchasePrice / 100) * qty;

  return { currentPrice, value, cost, pnl: value - cost, currency };
}

function fmtMoney(amount, currency) {
  const sym = currency === 'USD' ? 'US$' : '$';
  if (Math.abs(amount) >= 1e9) return sym + (amount / 1e9).toLocaleString('es-AR', {minimumFractionDigits:1, maximumFractionDigits:1}) + 'B';
  if (Math.abs(amount) >= 1e6) return sym + (amount / 1e6).toLocaleString('es-AR', {minimumFractionDigits:1, maximumFractionDigits:1}) + 'M';
  return sym + amount.toLocaleString('es-AR', {minimumFractionDigits:0, maximumFractionDigits:0});
}

function renderPortfolioSummary(config) {
  const summary = document.getElementById('portfolio-summary');
  if (_portfolioHoldings.length === 0) {
    summary.innerHTML = '';
    return;
  }

  let totalUSD = 0, totalARS = 0, pnlUSD = 0, pnlARS = 0;
  for (const h of _portfolioHoldings) {
    const v = getHoldingValue(h, config);
    if (v.noPrice) continue; // skip holdings without live price
    if (v.currency === 'USD') { totalUSD += v.value; pnlUSD += v.pnl || 0; }
    else { totalARS += v.value; pnlARS += v.pnl || 0; }
  }

  const tc = _portfolioTC || 0;
  const vc = _portfolioViewCurrency;
  let cards = '';

  if (vc === 'split') {
    cards = `
      <div class="portfolio-summary-card"><div class="label">Valor USD</div><div class="value">${fmtMoney(totalUSD, 'USD')}</div></div>
      <div class="portfolio-summary-card"><div class="label">Valor ARS</div><div class="value">${fmtMoney(totalARS, 'ARS')}</div></div>
      <div class="portfolio-summary-card"><div class="label">P&L USD</div><div class="value" style="color:${pnlUSD >= 0 ? 'var(--green)' : 'var(--red)'}">${pnlUSD >= 0 ? '+' : ''}${fmtMoney(pnlUSD, 'USD')}</div></div>
      <div class="portfolio-summary-card"><div class="label">P&L ARS</div><div class="value" style="color:${pnlARS >= 0 ? 'var(--green)' : 'var(--red)'}">${pnlARS >= 0 ? '+' : ''}${fmtMoney(pnlARS, 'ARS')}</div></div>`;
  } else if (vc === 'usd' && tc) {
    const total = totalUSD + totalARS / tc;
    const pnl = pnlUSD + pnlARS / tc;
    cards = `
      <div class="portfolio-summary-card"><div class="label">Valor Total</div><div class="value">${fmtMoney(total, 'USD')}</div></div>
      <div class="portfolio-summary-card"><div class="label">P&L Total</div><div class="value" style="color:${pnl >= 0 ? 'var(--green)' : 'var(--red)'}">${pnl >= 0 ? '+' : ''}${fmtMoney(pnl, 'USD')}</div></div>
      <div class="portfolio-summary-card"><div class="label">USD</div><div class="value">${fmtMoney(totalUSD, 'USD')}</div></div>
      <div class="portfolio-summary-card"><div class="label">ARS → USD</div><div class="value">${fmtMoney(totalARS / tc, 'USD')}</div></div>`;
  } else if (vc === 'ars' && tc) {
    const total = totalARS + totalUSD * tc;
    const pnl = pnlARS + pnlUSD * tc;
    cards = `
      <div class="portfolio-summary-card"><div class="label">Valor Total</div><div class="value">${fmtMoney(total, 'ARS')}</div></div>
      <div class="portfolio-summary-card"><div class="label">P&L Total</div><div class="value" style="color:${pnl >= 0 ? 'var(--green)' : 'var(--red)'}">${pnl >= 0 ? '+' : ''}${fmtMoney(pnl, 'ARS')}</div></div>
      <div class="portfolio-summary-card"><div class="label">ARS</div><div class="value">${fmtMoney(totalARS, 'ARS')}</div></div>
      <div class="portfolio-summary-card"><div class="label">USD → ARS</div><div class="value">${fmtMoney(totalUSD * tc, 'ARS')}</div></div>`;
  } // else: split cards already set above

  // Big total number
  let totalHTML = '';
  if (tc) {
    const totalEnUSD = totalUSD + totalARS / tc;
    const totalEnARS = totalARS + totalUSD * tc;
    const pnlEnUSD = pnlUSD + pnlARS / tc;
    const pnlEnARS = pnlARS + pnlUSD * tc;
    const showARS = vc === 'ars';
    const grandTotal = showARS ? totalEnARS : totalEnUSD;
    const grandPnl = showARS ? pnlEnARS : pnlEnUSD;
    const grandCurr = showARS ? 'ARS' : 'USD';
    const pnlTotalColor = grandPnl >= 0 ? 'var(--green)' : 'var(--red)';
    totalHTML = `
      <div style="margin-bottom:16px">
        <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-tertiary);font-weight:600">Valor total del portfolio</div>
        <div style="font-size:2.4rem;font-weight:800;color:var(--text);line-height:1.2">${fmtMoney(grandTotal, grandCurr)}</div>
        <div style="font-size:1rem;font-weight:600;color:${pnlTotalColor}">${grandPnl >= 0 ? '+' : ''}${fmtMoney(grandPnl, grandCurr)} P&L</div>
      </div>`;
  }

  summary.innerHTML = `${totalHTML}<div class="portfolio-summary-grid">${cards}</div>`;
}

function renderPortfolioHoldings(config) {
  const container = document.getElementById('portfolio-holdings');
  if (_portfolioHoldings.length === 0) {
    container.innerHTML = `
      <div class="portfolio-empty">
        <div class="emoji">📭</div>
        <p>No tenés activos en tu portfolio.</p>
        <p style="margin-top:8px;font-size:0.8rem">Hacé click en <strong>+ Agregar activo</strong> para empezar.</p>
      </div>`;
    return;
  }

  const rows = _portfolioHoldings.map(h => {
    const typeInfo = ASSET_TYPES[h.asset_type] || {};
    const v = getHoldingValue(h, config);
    const pnlColor = v.pnl != null && v.pnl >= 0 ? 'var(--green)' : v.pnl != null ? 'var(--red)' : 'var(--text-tertiary)';
    const currSymbol = v.currency === 'USD' ? 'US$' : '$';
    const priceStr = v.currentPrice != null ? `${currSymbol}${v.currentPrice.toFixed(2)}` : '<span style="color:var(--text-tertiary)">Sin precio</span>';
    const valueStr = v.noPrice ? '—' : fmtMoney(v.value, v.currency);
    const pnlStr = v.pnl != null ? `${v.pnl >= 0 ? '+' : ''}${fmtMoney(v.pnl, v.currency)}` : '—';
    const qty = parseFloat(h.quantity);
    const qtyStr = h.asset_type === 'garantizado' ? `$${qty.toLocaleString('es-AR')}` : qty.toLocaleString('es-AR');
    const ops = getOperationsFromHolding(h);
    const opsCount = ops.length;
    const opsBadge = opsCount > 1 ? `<span class="ops-badge">${opsCount} ops</span>` : '';

    return `<tr>
      <td><strong>${h.ticker}</strong>${opsBadge}<br><span style="font-size:0.7rem;color:var(--text-tertiary)">${typeInfo.label || h.asset_type}</span></td>
      <td>${qtyStr}</td>
      <td>${currSymbol}${parseFloat(h.purchase_price).toFixed(2)}</td>
      <td>${priceStr}</td>
      <td style="color:${pnlColor};font-weight:600">${pnlStr}</td>
      <td style="font-weight:700">${valueStr}</td>
      <td class="col-actions">
        <button onclick="openOperationsModal('${h.id}')" title="Operaciones">➕</button>
        <button onclick="deleteHolding('${h.id}')" title="Eliminar">🗑️</button>
      </td>
    </tr>`;
  }).join('');

  container.innerHTML = `
    <table class="portfolio-table">
      <thead><tr>
        <th>Activo</th><th>Cantidad</th><th>PPP</th><th>P.Actual</th><th>P&L</th><th>Valor</th><th></th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  makeSortable(container.querySelector('.portfolio-table'));
}

// ─── Add/Edit Holding Modal ───

function openAddHoldingModal(editId) {
  const isEdit = typeof editId === 'string' && editId.length > 10;
  const existing = isEdit ? _portfolioHoldings.find(h => h.id === editId) : null;

  document.querySelector('.mundo-modal-overlay')?.remove();
  const overlay = document.createElement('div');
  overlay.className = 'mundo-modal-overlay';
  overlay.innerHTML = `
    <div class="mundo-modal" style="max-width:420px">
      <div class="mundo-modal-header">
        <h3 style="margin:0">${isEdit ? 'Editar' : 'Agregar'} activo</h3>
        <button class="mundo-modal-close">&times;</button>
      </div>
      <div class="mundo-modal-body" style="padding:16px">
        <div id="modal-step1">
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px">Tipo de activo</p>
          <div class="portfolio-type-grid">
            ${Object.entries(ASSET_TYPES).map(([key, t]) => `
              <button class="portfolio-type-btn ${existing?.asset_type === key ? 'selected' : ''}" data-type="${key}">
                <span class="emoji">${t.emoji}</span>${t.label}
              </button>`).join('')}
          </div>
        </div>
        <div id="modal-step2" style="display:none">
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:8px">Elegí el activo</p>
          <select id="modal-ticker" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;font-family:var(--font);background:var(--card-bg);color:var(--text)"></select>
          <div style="margin-top:16px;display:flex;flex-direction:column;gap:12px">
            <div>
              <label style="font-size:0.8rem;color:var(--text-secondary)" id="modal-qty-label">Cantidad</label>
              <input type="number" id="modal-qty" value="${existing ? existing.quantity : ''}" step="any" style="display:block;width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.95rem;font-weight:600;font-family:var(--font);background:var(--bg);color:var(--text)">
            </div>
            <div>
              <label style="font-size:0.8rem;color:var(--text-secondary)">Precio de compra <span id="modal-price-hint" style="color:var(--text-tertiary)">(por 100 VN)</span></label>
              <input type="number" id="modal-price" value="${existing ? existing.purchase_price : ''}" step="any" placeholder="Ej: 62.50" style="display:block;width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.95rem;font-weight:600;font-family:var(--font);background:var(--bg);color:var(--text)">
              <p id="modal-price-example" style="font-size:0.7rem;color:var(--text-tertiary);margin-top:4px">Precio en la moneda del activo, por cada 100 VN. Ej: AL30 a US$62.50</p>
            </div>
            <div>
              <label style="font-size:0.8rem;color:var(--text-secondary)">Fecha de compra</label>
              <input type="date" id="modal-date" value="${existing ? existing.purchase_date : new Date().toISOString().slice(0,10)}" style="display:block;width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;font-family:var(--font);background:var(--bg);color:var(--text)">
            </div>
          </div>
          <button id="modal-save" style="margin-top:16px;width:100%;padding:10px;background:var(--accent);color:#fff;border:none;border-radius:6px;font-size:0.9rem;font-weight:600;cursor:pointer;font-family:var(--font)">
            ${isEdit ? 'Guardar cambios' : 'Agregar al portfolio'}
          </button>
          <p id="modal-error" style="color:var(--red);font-size:0.8rem;margin-top:8px;display:none"></p>
        </div>
      </div>
    </div>`;

  document.body.appendChild(overlay);
  overlay.querySelector('.mundo-modal-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  let selectedType = existing?.asset_type || null;

  async function showStep2(type) {
    selectedType = type;
    overlay.querySelectorAll('.portfolio-type-btn').forEach(b => b.classList.toggle('selected', b.dataset.type === type));
    const config = await getPortfolioConfig();
    const tickers = getTickersForType(config, type);
    const select = overlay.querySelector('#modal-ticker');
    const step2 = overlay.querySelector('#modal-step2');

    // Remove custom fields if they exist
    overlay.querySelector('#modal-custom-fields')?.remove();

    if (type === 'cash') {
      select.innerHTML = '<option value="USD">Dólares (USD)</option><option value="ARS">Pesos (ARS)</option>';
      if (existing) select.value = existing.ticker;
      overlay.querySelector('#modal-qty-label').textContent = 'Monto';
      overlay.querySelector('#modal-price-hint').textContent = '(no aplica)';
      overlay.querySelector('#modal-price-example').textContent = 'Para cash poné 1 como precio';
      overlay.querySelector('#modal-price').placeholder = '1';
      overlay.querySelector('#modal-price').value = existing ? existing.purchase_price : '1';
    } else if (type === 'custom') {
      select.innerHTML = '<option value="">Escribí el nombre abajo</option>';
      // Add custom fields: name, currency, current price
      const customHTML = `<div id="modal-custom-fields" style="margin-top:12px;display:flex;flex-direction:column;gap:12px">
        <div><label style="font-size:0.8rem;color:var(--text-secondary)">Nombre del activo</label>
          <input type="text" id="modal-custom-name" value="${existing?.ticker || ''}" placeholder="Ej: Bitcoin, AAPL, Ethereum" style="display:block;width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.95rem;font-weight:600;font-family:var(--font);background:var(--bg);color:var(--text)"></div>
        <div><label style="font-size:0.8rem;color:var(--text-secondary)">Moneda</label>
          <select id="modal-custom-currency" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;font-family:var(--font);background:var(--card-bg);color:var(--text)">
            <option value="USD" ${existing?.metadata?.currency === 'USD' || !existing ? 'selected' : ''}>USD</option>
            <option value="ARS" ${existing?.metadata?.currency === 'ARS' ? 'selected' : ''}>ARS</option>
          </select></div>
        <div><label style="font-size:0.8rem;color:var(--text-secondary)">Precio actual (opcional, para calcular P&L)</label>
          <input type="number" id="modal-custom-current-price" value="${existing?.metadata?.current_price || ''}" placeholder="Ej: 70000" step="any" style="display:block;width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.95rem;font-weight:600;font-family:var(--font);background:var(--bg);color:var(--text)"></div>
      </div>`;
      select.style.display = 'none';
      select.insertAdjacentHTML('afterend', customHTML);
      overlay.querySelector('#modal-qty-label').textContent = 'Cantidad';
      overlay.querySelector('#modal-price-hint').textContent = '(precio de compra por unidad)';
      overlay.querySelector('#modal-price-example').textContent = 'Precio al que compraste cada unidad';
      overlay.querySelector('#modal-price').placeholder = 'Ej: 65000';
    } else {
      select.style.display = '';
      select.innerHTML = tickers.map(t => `<option value="${t}" ${existing?.ticker === t ? 'selected' : ''}>${t}</option>`).join('');
      overlay.querySelector('#modal-qty-label').textContent = ASSET_TYPES[type]?.qtyLabel || 'Cantidad';
      const priceHints = {
        soberano: { hint: '(USD por 100 VN)', example: 'Precio en USD por cada 100 VN. Ej: AL30 a US$62.50', placeholder: 'Ej: 62.50' },
        on: { hint: '(USD por 100 VN)', example: 'Precio en USD por cada 100 VN. Ej: BACG a US$102.50', placeholder: 'Ej: 102.50' },
        cer: { hint: '(ARS por 100 VN)', example: 'Precio en ARS por cada 100 VN. Ej: TX26 a $110.25', placeholder: 'Ej: 110.25' },
        lecap: { hint: '(ARS por 100 VN)', example: 'Precio en ARS por cada 100 VN. Ej: S17A6 a $108.40', placeholder: 'Ej: 108.40' },
        fci: { hint: '(por cuotaparte)', example: 'Valor de la cuotaparte al momento de compra', placeholder: 'Ej: 5250.00' },
        garantizado: { hint: '(no aplica)', example: 'Para billeteras no se usa precio de compra, poné 1', placeholder: '1' },
      };
      const ph = priceHints[type] || {};
      overlay.querySelector('#modal-price-hint').textContent = ph.hint || '';
      overlay.querySelector('#modal-price-example').textContent = ph.example || '';
      overlay.querySelector('#modal-price').placeholder = ph.placeholder || '';
    }
    step2.style.display = '';
  }

  overlay.querySelectorAll('.portfolio-type-btn').forEach(btn => {
    btn.addEventListener('click', () => showStep2(btn.dataset.type));
  });

  if (existing) showStep2(existing.asset_type);

  overlay.querySelector('#modal-save').addEventListener('click', async () => {
    let ticker = overlay.querySelector('#modal-ticker').value;
    const qty = parseFloat(overlay.querySelector('#modal-qty').value);
    const price = parseFloat(overlay.querySelector('#modal-price').value);
    const date = overlay.querySelector('#modal-date').value;
    const errorEl = overlay.querySelector('#modal-error');

    let metadata = {};
    if (selectedType === 'custom') {
      ticker = overlay.querySelector('#modal-custom-name')?.value?.trim() || '';
      const curr = overlay.querySelector('#modal-custom-currency')?.value || 'USD';
      const curPrice = parseFloat(overlay.querySelector('#modal-custom-current-price')?.value) || 0;
      metadata = { currency: curr, current_price: curPrice || null };
    }

    if (!selectedType || !ticker || !qty || !date) {
      errorEl.textContent = 'Completá todos los campos';
      errorEl.style.display = '';
      return;
    }
    if (selectedType !== 'cash' && !price) {
      errorEl.textContent = 'Completá el precio de compra';
      errorEl.style.display = '';
      return;
    }

    // ─── Input validation (defense in depth) ───
    const VALID_TYPES = ['soberano', 'on', 'cer', 'lecap', 'fci', 'garantizado', 'cash', 'custom'];
    if (!VALID_TYPES.includes(selectedType)) {
      errorEl.textContent = 'Tipo de activo inválido';
      errorEl.style.display = '';
      return;
    }
    if (ticker.length > 50) {
      errorEl.textContent = 'Ticker demasiado largo';
      errorEl.style.display = '';
      return;
    }
    if (qty <= 0 || qty > 1e12) {
      errorEl.textContent = 'Cantidad inválida';
      errorEl.style.display = '';
      return;
    }
    if (price < 0 || price > 1e12) {
      errorEl.textContent = 'Precio inválido';
      errorEl.style.display = '';
      return;
    }
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime()) || dateObj < new Date('2000-01-01') || dateObj > new Date('2100-01-01')) {
      errorEl.textContent = 'Fecha inválida';
      errorEl.style.display = '';
      return;
    }
    if (JSON.stringify(metadata).length > 5000) {
      errorEl.textContent = 'Metadata demasiado grande';
      errorEl.style.display = '';
      return;
    }

    // Store initial buy operation in metadata for PPP tracking
    const initialOp = { type: 'buy', qty, price: price || 1, date };
    metadata.operations = [initialOp];

    const record = {
      user_id: currentUser.id,
      asset_type: selectedType,
      ticker,
      quantity: qty,
      purchase_price: price || 1,
      purchase_date: date,
      metadata,
    };

    try {
      if (isEdit) {
        const { error } = await supabaseClient.from('holdings').update(record).eq('id', editId);
        if (error) throw error;
      } else {
        const { error } = await supabaseClient.from('holdings').insert(record);
        if (error) throw error;
      }
      overlay.remove();
      loadPortfolio();
    } catch (e) {
      errorEl.textContent = 'Error: ' + e.message;
      errorEl.style.display = '';
    }
  });
}

function editHolding(id) {
  openOperationsModal(id);
}

function openOperationsModal(holdingId) {
  const holding = _portfolioHoldings.find(h => h.id === holdingId);
  if (!holding) return;

  const ops = getOperationsFromHolding(holding);
  const { ppp, netQty } = computePosition(ops);
  const typeInfo = ASSET_TYPES[holding.asset_type] || {};
  const curr = typeInfo.currency === 'USD' ? 'US$' : '$';
  const isBond = ['soberano', 'on', 'cer', 'lecap'].includes(holding.asset_type);
  const priceLabel = isBond ? 'por 100 VN' : 'por unidad';

  const opsRows = ops.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '')).map(op => {
    const isBuy = op.type === 'buy';
    const typeClass = isBuy ? 'ops-buy' : 'ops-sell';
    const typeText = isBuy ? 'Compra' : 'Venta';
    return `<tr class="${typeClass}">
      <td>${op.date || '—'}</td>
      <td>${typeText}</td>
      <td>${parseFloat(op.qty).toLocaleString('es-AR')}</td>
      <td>${curr}${parseFloat(op.price).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
    </tr>`;
  }).join('');

  const overlay = document.createElement('div');
  overlay.className = 'mundo-modal-overlay';
  overlay.innerHTML = `
    <div class="mundo-modal ops-modal">
      <button class="mundo-modal-close" id="ops-close">&times;</button>
      <h3 style="margin:0 0 12px;font-size:1.1rem;font-weight:700;color:var(--text)">${holding.ticker} <span style="font-weight:400;color:var(--text-secondary);font-size:0.85rem">${typeInfo.label || ''}</span></h3>

      <div class="ops-summary">
        <div class="ops-summary-item"><span class="ops-label">Posición</span><span class="ops-value">${netQty.toLocaleString('es-AR')} ${isBond ? 'VN' : typeInfo.qtyLabel || ''}</span></div>
        <div class="ops-summary-item"><span class="ops-label">PPP</span><span class="ops-value">${curr}${ppp.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
        <div class="ops-summary-item"><span class="ops-label">Operaciones</span><span class="ops-value">${ops.length}</span></div>
      </div>

      ${ops.length > 0 ? `
      <table class="ops-table">
        <thead><tr><th>Fecha</th><th>Tipo</th><th>Cantidad</th><th>Precio</th></tr></thead>
        <tbody>${opsRows}</tbody>
      </table>` : ''}

      <div class="ops-add-section">
        <div style="font-size:0.85rem;font-weight:600;color:var(--text);margin-bottom:8px">Agregar operación</div>
        <div class="ops-type-toggle">
          <button class="ops-type-btn ops-type-buy active" data-type="buy">Compra</button>
          <button class="ops-type-btn ops-type-sell" data-type="sell">Venta</button>
        </div>
        <div class="ops-form-row">
          <div class="ops-field">
            <label>Cantidad</label>
            <input type="number" id="ops-qty" step="any" min="0" placeholder="${isBond ? 'VN' : 'Cant.'}">
          </div>
          <div class="ops-field">
            <label>Precio <span style="color:var(--text-tertiary);font-size:0.75rem">${priceLabel}</span></label>
            <input type="number" id="ops-price" step="any" min="0" placeholder="${curr}0.00">
          </div>
          <div class="ops-field">
            <label>Fecha</label>
            <input type="date" id="ops-date" value="${new Date().toISOString().slice(0, 10)}">
          </div>
        </div>
        <div id="ops-error" style="color:var(--red);font-size:0.8rem;margin-top:4px;display:none"></div>
        <button id="ops-save" class="portfolio-add-btn" style="width:100%;margin-top:10px;padding:10px">Agregar</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));

  // Type toggle
  let selectedOpType = 'buy';
  overlay.querySelectorAll('.ops-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.querySelectorAll('.ops-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedOpType = btn.dataset.type;
    });
  });

  // Save operation
  overlay.querySelector('#ops-save').addEventListener('click', async () => {
    const errorEl = overlay.querySelector('#ops-error');
    errorEl.style.display = 'none';
    const qty = parseFloat(overlay.querySelector('#ops-qty').value);
    const price = parseFloat(overlay.querySelector('#ops-price').value);
    const date = overlay.querySelector('#ops-date').value;

    if (!qty || qty <= 0) { errorEl.textContent = 'Cantidad debe ser mayor a 0'; errorEl.style.display = ''; return; }
    if (isNaN(price) || price < 0) { errorEl.textContent = 'Precio inválido'; errorEl.style.display = ''; return; }
    if (!date) { errorEl.textContent = 'Fecha requerida'; errorEl.style.display = ''; return; }

    const result = await addOperationToHolding(holdingId, { type: selectedOpType, qty, price, date });
    if (result.error) {
      errorEl.textContent = result.error;
      errorEl.style.display = '';
      return;
    }
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 200);
    loadPortfolio();
  });

  // Close
  const close = () => { overlay.classList.remove('active'); setTimeout(() => overlay.remove(), 200); };
  overlay.querySelector('#ops-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
}

async function deleteHolding(id) {
  if (!confirm('¿Eliminar este activo del portfolio?')) return;
  try {
    await supabaseClient.from('holdings').delete().eq('id', id);
    loadPortfolio();
  } catch (e) {
    alert('Error eliminando: ' + e.message);
  }
}

// ─── Cash Flow Calendar ───

async function renderPortfolioCashflows(config) {
  const container = document.getElementById('portfolio-cashflows');
  const chartWrapper = document.getElementById('portfolio-cashflow-chart-wrapper');
  const bondHoldings = _portfolioHoldings.filter(h => ['soberano', 'on', 'cer', 'lecap'].includes(h.asset_type));

  if (bondHoldings.length === 0) {
    container.innerHTML = '<p style="color:var(--text-tertiary);font-size:0.85rem;padding:16px 0">Agregá bonos a tu portfolio para ver el calendario de cobros.</p>';
    if (chartWrapper) chartWrapper.style.display = 'none';
    return;
  }

  // Fetch CER coefficient if needed
  let cerActual = 0;
  const hasCER = bondHoldings.some(h => h.asset_type === 'cer');
  if (hasCER) {
    try {
      const cerResp = await fetch('/api/cer?v=2').then(r => r.json());
      cerActual = cerResp?.cer || cerResp?.data || 0;
    } catch (e) { /* ignore */ }
  }

  const flows = [];
  const today = new Date();

  for (const holding of bondHoldings) {
    const qty = parseFloat(holding.quantity) || 0;

    if (holding.asset_type === 'soberano') {
      const bond = getSovereignMetadataMap(config)?.[holding.ticker];
      if (!bond?.flujos) continue;
      for (const f of bond.flujos) {
        const fecha = typeof f.fecha === 'string' ? parseLocalDate(f.fecha) : f.fecha;
        if (fecha <= today) continue;
        flows.push({ date: fecha, amount: f.monto * (qty / 100), currency: 'USD', ticker: holding.ticker, type: 'soberano' });
      }
    }

    if (holding.asset_type === 'on') {
      const bond = config.ons?.[holding.ticker];
      if (!bond?.flujos) continue;
      for (const f of bond.flujos) {
        const fecha = typeof f.fecha === 'string' ? parseLocalDate(f.fecha) : f.fecha;
        if (fecha <= today) continue;
        flows.push({ date: fecha, amount: f.monto * qty, currency: 'USD', ticker: holding.ticker, type: 'on' });
      }
    }

    if (holding.asset_type === 'cer' && cerActual) {
      const bond = getCerMetadataMap(config)?.[holding.ticker];
      if (!bond?.flujos) continue;
      const coefCER = cerActual / (bond.cer_emision || 1);
      let amortAcum = 0;
      for (const f of bond.flujos) {
        const vrAntes = 1 - amortAcum;
        amortAcum += (f.amortizacion || 0);
        const fecha = typeof f.fecha === 'string' ? parseLocalDate(f.fecha) : f.fecha;
        if (fecha <= today) continue;
        const flujo = (vrAntes * (f.tasa_interes || 0) * (f.base || 0.5) + (f.amortizacion || 0)) * coefCER;
        const multiplier = holding.ticker === 'DICP' ? 1.27 : 1;
        flows.push({ date: fecha, amount: flujo * qty * multiplier, currency: 'ARS', ticker: holding.ticker, type: 'cer' });
      }
    }

    if (holding.asset_type === 'lecap') {
      const lecap = getLecapMetadataByTicker(config, holding.ticker);
      if (!lecap) continue;
      const fecha = parseLocalDate(lecap.fecha_vencimiento);
      if (fecha <= today) continue;
      flows.push({ date: fecha, amount: lecap.pago_final * (qty / 100), currency: 'ARS', ticker: holding.ticker, type: 'lecap' });
    }
  }

  flows.sort((a, b) => a.date - b.date);

  if (flows.length === 0) {
    container.innerHTML = '<p style="color:var(--text-tertiary);font-size:0.85rem;padding:16px 0">No hay flujos futuros para tus bonos actuales.</p>';
    if (chartWrapper) chartWrapper.style.display = 'none';
    return;
  }

  // Group by month
  const months = {};
  for (const f of flows) {
    const key = f.date.getFullYear() + '-' + String(f.date.getMonth() + 1).padStart(2, '0');
    if (!months[key]) months[key] = { usd: 0, ars: 0, details: [] };
    if (f.currency === 'USD') months[key].usd += f.amount;
    else months[key].ars += f.amount;
    months[key].details.push(f);
  }

  const monthNames = MONTH_NAMES;
  let tableHTML = '';
  for (const [key, m] of Object.entries(months)) {
    const [year, mon] = key.split('-');
    const monthLabel = `${monthNames[parseInt(mon)-1]} ${year}`;
    const totalUsdStr = m.usd > 0 ? 'US$' + m.usd.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2}) : '';
    const totalArsStr = m.ars > 0 ? '$' + m.ars.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2}) : '';
    const totalStr = [totalUsdStr, totalArsStr].filter(Boolean).join(' + ');
    tableHTML += `<tr class="cashflow-month-header"><td colspan="4">${monthLabel} <span style="font-weight:400;font-size:0.75rem;color:var(--text-secondary);margin-left:8px">${totalStr}</span></td></tr>`;
    // Individual flows sorted by date
    const sorted = m.details.sort((a, b) => a.date - b.date);
    for (const d of sorted) {
      const sym = d.currency === 'USD' ? 'US$' : '$';
      const dateStr = d.date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
      tableHTML += `<tr>
        <td style="color:var(--text-secondary)">${dateStr}</td>
        <td style="text-align:right;font-weight:600">${d.currency === 'USD' ? sym + d.amount.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2}) : '—'}</td>
        <td style="text-align:right;font-weight:600">${d.currency === 'ARS' ? sym + d.amount.toLocaleString('es-AR', {minimumFractionDigits:2, maximumFractionDigits:2}) : '—'}</td>
        <td style="font-size:0.75rem;color:var(--text-tertiary)">${d.ticker} <span style="opacity:0.6">${d.type}</span></td>
      </tr>`;
    }
  }

  container.innerHTML = `
    <table class="cashflow-table">
      <thead><tr><th>Fecha</th><th style="text-align:right">USD</th><th style="text-align:right">ARS</th><th>Activo</th></tr></thead>
      <tbody>${tableHTML}</tbody>
    </table>`;

  // Render chart
  if (chartWrapper) {
    chartWrapper.style.display = '';
    renderCashflowChart(months);
  }
}

let _cashflowChart = null;
function renderCashflowChart(months) {
  const canvas = document.getElementById('portfolio-cashflow-chart');
  if (!canvas) return;
  if (_cashflowChart) _cashflowChart.destroy();

  const textColor = '#555555';
  const gridColor = '#1a1a1a';
  const monthNames = MONTH_NAMES;
  const labels = Object.keys(months).map(k => { const [y,m] = k.split('-'); return `${monthNames[parseInt(m)-1]} ${y}`; });
  const usdData = Object.values(months).map(m => m.usd);
  const arsData = Object.values(months).map(m => m.ars);

  _cashflowChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'USD', data: usdData, backgroundColor: '#4da6ff', yAxisID: 'yUSD', borderRadius: 2 },
        { label: 'ARS', data: arsData, backgroundColor: '#00d26a', yAxisID: 'yARS', borderRadius: 2 },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor } },
        yUSD: { position: 'left', title: { display: true, text: 'USD', color: textColor }, ticks: { color: textColor }, grid: { color: gridColor } },
        yARS: { position: 'right', title: { display: true, text: 'ARS', color: textColor }, ticks: { color: textColor }, grid: { display: false } },
      }
    }
  });
}

// ─── PORTFOLIO OPTIMIZER ───
let optimizerFrontierChart = null;
let optimizerAssetsChart = null;
let optimizerPortfoliosChart = null;

function formatCompoundCurrency(value) {
  return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-US' : 'es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatMarketCapCompact(value) {
  const locale = currentLanguage === 'en' ? 'en-US' : 'es-AR';
  if (value >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toLocaleString(locale, { maximumFractionDigits: 1 })}T`;
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toLocaleString(locale, { maximumFractionDigits: 0 })}B`;
  return `${(value / 1_000_000).toLocaleString(locale, { maximumFractionDigits: 0 })}M`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatHeatmapPrice(value) {
  return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-US' : 'es-AR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value >= 100 ? 0 : 2,
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value || 0);
}

function formatHeatmapCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-US' : 'es-AR', {
    style: 'currency',
    currency,
    minimumFractionDigits: value >= 100 ? 0 : 2,
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value || 0);
}

function formatHeatmapSizeValue(tile) {
  const sizeValue = Number(tile.sizeValue || tile.marketCap || 0);
  if ((tile.sizeLabel || '').toLowerCase().includes('market cap')) {
    return formatMarketCapCompact(sizeValue);
  }
  const currency = tile.sizeCurrency || 'USD';
  if (sizeValue >= 1_000_000_000) {
    return `${formatHeatmapCurrency(sizeValue / 1_000_000_000, currency)}B`;
  }
  if (sizeValue >= 1_000_000) {
    return `${formatHeatmapCurrency(sizeValue / 1_000_000, currency)}M`;
  }
  return formatHeatmapCurrency(sizeValue, currency);
}

function buildHeatmapTooltip(tile) {
  const isEnglish = currentLanguage === 'en';
  const sizeLabel = tile.sizeLabel || (isEnglish ? 'Market cap' : 'Market cap');
  const priceCurrency = tile.sizeCurrency === 'ARS' ? 'ARS' : 'USD';
  return `
    <div class="heatmap-tooltip-head">
      <div>
        <div class="heatmap-tooltip-ticker">${escapeHtml(tile.ticker)}</div>
        <div class="heatmap-tooltip-name">${escapeHtml(tile.name || tile.ticker)}</div>
      </div>
      <div class="heatmap-tooltip-change ${Number(tile.change || 0) >= 0 ? 'positive' : 'negative'}">${Number(tile.change || 0) >= 0 ? '+' : ''}${Number(tile.change || 0).toFixed(2)}%</div>
    </div>
    <div class="heatmap-tooltip-grid">
      <div><span>${isEnglish ? 'Price' : 'Precio'}</span><strong>${formatHeatmapCurrency(Number(tile.price || 0), priceCurrency)}</strong></div>
      <div><span>${escapeHtml(sizeLabel)}</span><strong>${formatHeatmapSizeValue(tile)}</strong></div>
      <div><span>${isEnglish ? 'Sector' : 'Sector'}</span><strong>${escapeHtml(tile.sector || '-')}</strong></div>
      <div><span>${isEnglish ? 'Industry' : 'Industria'}</span><strong>${escapeHtml(tile.industry || '-')}</strong></div>
    </div>
  `;
}

function setupHeatmapTooltip(container) {
  const shell = container.querySelector('.optimizer-svg-shell');
  const tooltip = container.querySelector('.heatmap-tooltip');
  const frame = container.querySelector('.optimizer-svg-frame');
  if (!shell || !tooltip || !frame) return;

  const positionTooltip = (event) => {
    if (tooltip.hidden) return;
    const shellRect = shell.getBoundingClientRect();
    const offsetX = event.clientX - shellRect.left + 18;
    const offsetY = event.clientY - shellRect.top + 18;
    const maxX = shellRect.width - tooltip.offsetWidth - 8;
    const maxY = shellRect.height - tooltip.offsetHeight - 8;
    const x = Math.max(8, Math.min(offsetX, maxX));
    const y = Math.max(8, Math.min(offsetY, maxY));
    tooltip.style.transform = `translate(${x}px, ${y}px)`;
  };

  const showTooltip = (target, event) => {
    tooltip.innerHTML = buildHeatmapTooltip(target.dataset);
    tooltip.hidden = false;
    positionTooltip(event);
  };

  const hideTooltip = () => {
    tooltip.hidden = true;
  };

  frame.querySelectorAll('[data-heatmap-tile="true"]').forEach((tile) => {
    tile.addEventListener('mouseenter', (event) => showTooltip(tile, event));
    tile.addEventListener('mousemove', positionTooltip);
    tile.addEventListener('mouseleave', hideTooltip);
  });
  frame.addEventListener('mouseleave', hideTooltip);
}

function sliceDiceLayout(items, x, y, width, height, horizontal = true) {
  const total = items.reduce((sum, item) => sum + Math.max(item.value || 0, 0), 0) || 1;
  let cursor = horizontal ? x : y;
  return items.map((item, index) => {
    const fraction = (Math.max(item.value || 0, 0)) / total;
    const isLast = index === items.length - 1;
    if (horizontal) {
      const itemWidth = isLast ? (x + width - cursor) : width * fraction;
      const rect = { ...item, x: cursor, y, width: itemWidth, height };
      cursor += itemWidth;
      return rect;
    }
    const itemHeight = isLast ? (y + height - cursor) : height * fraction;
    const rect = { ...item, x, y: cursor, width, height: itemHeight };
    cursor += itemHeight;
    return rect;
  });
}

function splitTreemapItems(items) {
  const total = items.reduce((sum, item) => sum + Math.max(item.value || 0, 0), 0) || 1;
  let running = 0;
  let splitIndex = 0;
  for (let i = 0; i < items.length; i += 1) {
    running += Math.max(items[i].value || 0, 0);
    splitIndex = i + 1;
    if (running >= total / 2) break;
  }
  if (splitIndex <= 0 || splitIndex >= items.length) {
    splitIndex = Math.max(1, Math.floor(items.length / 2));
  }
  const first = items.slice(0, splitIndex);
  const second = items.slice(splitIndex);
  const firstValue = first.reduce((sum, item) => sum + Math.max(item.value || 0, 0), 0);
  return { first, second, firstValue, total };
}

function balancedTreemapLayout(items, x, y, width, height) {
  const filtered = items.filter((item) => (item.value || 0) > 0);
  if (!filtered.length) return [];
  if (filtered.length === 1) return [{ ...filtered[0], x, y, width, height }];

  const { first, second, firstValue, total } = splitTreemapItems(filtered);
  const ratio = total > 0 ? firstValue / total : 0.5;

  if (width >= height) {
    const firstWidth = width * ratio;
    return [
      ...balancedTreemapLayout(first, x, y, firstWidth, height),
      ...balancedTreemapLayout(second, x + firstWidth, y, Math.max(0, width - firstWidth), height),
    ];
  }

  const firstHeight = height * ratio;
  return [
    ...balancedTreemapLayout(first, x, y, width, firstHeight),
    ...balancedTreemapLayout(second, x, y + firstHeight, width, Math.max(0, height - firstHeight)),
  ];
}

function partitionHeatmapRows(items, rowCount = 2) {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  const rows = Array.from({ length: rowCount }, () => []);
  const rowTotals = Array.from({ length: rowCount }, () => 0);
  items.forEach((item) => {
    const target = rowTotals.indexOf(Math.min(...rowTotals));
    rows[target].push(item);
    rowTotals[target] += item.value;
  });
  return rows
    .map((row, index) => ({ items: row, value: rowTotals[index] }))
    .filter((row) => row.items.length > 0)
    .map((row) => ({ ...row, ratio: row.value / total }));
}

function heatmapColor(change) {
  const clamped = Math.max(-6, Math.min(6, change || 0));
  if (Math.abs(clamped) < 0.25) return 'rgb(78, 82, 96)';
  if (clamped > 0) {
    const intensity = clamped / 6;
    const red = Math.round(28 + intensity * 14);
    const green = Math.round(92 + intensity * 98);
    const blue = Math.round(40 + intensity * 22);
    return `rgb(${red}, ${green}, ${blue})`;
  }
  const intensity = Math.abs(clamped) / 6;
  const red = Math.round(126 + intensity * 110);
  const green = Math.round(42 + intensity * 16);
  const blue = Math.round(50 + intensity * 16);
  return `rgb(${red}, ${green}, ${blue})`;
}

function renderHeatmap(data) {
  const container = document.getElementById('heatmap-chart');
  const empty = document.getElementById('heatmap-empty');
  if (!container || !empty) return;
  const activeMarket = document.getElementById('heatmap-market-select')?.value || 'usa';
  const isArgentina = activeMarket !== 'usa';
  const sizeLegend = data[0]?.sizeLabel || (currentLanguage === 'en' ? 'Size by market cap' : 'Tamaño por market cap');

  const width = isArgentina ? 1720 : 1520;
  const height = isArgentina ? 860 : 820;
  const sectorHeader = isArgentina ? 30 : 26;
  const industryHeader = isArgentina ? 18 : 16;
  const innerGap = isArgentina ? 4 : 3;
  const outerGap = isArgentina ? 10 : 14;

  const getSectorLayoutWeight = (sectorName) => {
    const normalized = String(sectorName || '').toUpperCase();
    if (isArgentina) {
      if (normalized === 'ENERGY') return 0.84;
      if (normalized === 'FINANCIALS' || normalized === 'FINANCIAL') return 0.86;
      if (normalized === 'CONSUMER STAPLES' || normalized === 'CONSUMER DEFENSIVE') return 1.34;
      if (normalized === 'REAL ESTATE') return 1.18;
      if (normalized === 'MATERIALS') return 1.1;
      if (normalized === 'UTILITIES') return 1.08;
      return 1;
    }
    if (normalized === 'FINANCIAL') return 0.88;
    if (normalized === 'CONSUMER DEFENSIVE') return 0.9;
    if (normalized === 'UTILITIES') return 1.28;
    if (normalized === 'REAL ESTATE') return 1.34;
    return 1;
  };

  const getItemLayoutValue = (item) => {
    const rawValue = Number(item.sizeValue || item.marketCap || 0);
    if (!isArgentina) return rawValue;
    const ticker = String(item.ticker || item.symbol || '').toUpperCase();
    let adjustedValue = Math.pow(Math.max(rawValue, 0), 0.82);
    if (['YPFD', 'YPFDD'].includes(ticker)) adjustedValue *= 0.48;
    if (['GGAL', 'GGALD'].includes(ticker)) adjustedValue *= 0.72;
    if (['BMA', 'BMA.D', 'BMAD'].includes(ticker)) adjustedValue *= 0.64;
    if (['VALO', 'VALOD'].includes(ticker)) adjustedValue *= 0.78;
    if (['PAMP', 'PAMPD'].includes(ticker)) adjustedValue *= 0.78;
    return adjustedValue;
  };

  const sectorBase = Array.from(data.reduce((map, item) => {
    if (!map.has(item.sector)) map.set(item.sector, []);
    map.get(item.sector).push(item);
    return map;
  }, new Map()).entries()).map(([sector, items]) => ({
    sector,
    actualValue: items.reduce((sum, item) => sum + Number(item.sizeValue || item.marketCap || 0), 0),
    items: items
      .slice()
      .sort((a, b) => Number(b.sizeValue || b.marketCap || 0) - Number(a.sizeValue || a.marketCap || 0))
      .map((item) => ({ ...item, layoutValue: getItemLayoutValue(item) })),
  }));

  const argentinaSectorBaseAverage = isArgentina
    ? (sectorBase.reduce((sum, sector) => sum + Math.pow(Math.max(sector.items.reduce((acc, item) => acc + item.layoutValue, 0), 0), 0.78), 0) / Math.max(sectorBase.length, 1))
    : 0;

  const sectors = sectorBase.map((sector) => {
    const layoutSum = sector.items.reduce((sum, item) => sum + item.layoutValue, 0);
    const compressedSectorValue = isArgentina
      ? (Math.pow(Math.max(layoutSum, 0), 0.78) + argentinaSectorBaseAverage * 0.52)
      : layoutSum;
    return {
      ...sector,
      value: compressedSectorValue * getSectorLayoutWeight(sector.sector),
    };
  }).sort((a, b) => b.value - a.value);
  const totalMarketCap = sectors.reduce((sum, sector) => sum + sector.actualValue, 0) || 1;
  const compactSectorLabel = (label, boxWidth) => {
    const normalized = String(label || '').toUpperCase();
    if (boxWidth >= 150) return normalized;
    if (normalized === 'REAL ESTATE') return boxWidth < 118 ? 'REAL EST.' : 'REAL ESTATE';
    if (normalized === 'COMMUNICATION SERVICES') return boxWidth < 132 ? 'COMM. SERVICES' : 'COMM SERVICES';
    if (normalized === 'CONSUMER DEFENSIVE') return boxWidth < 126 ? 'CONS. DEFENSIVE' : 'CONSUMER DEFENSIVE';
    if (normalized === 'CONSUMER CYCLICAL') return boxWidth < 126 ? 'CONS. CYCLICAL' : 'CONSUMER CYCLICAL';
    if (normalized === 'UTILITIES') return boxWidth < 118 ? 'UTIL.' : 'UTILITIES';
    return normalized;
  };

  const rowGroups = partitionHeatmapRows(sectors, isArgentina ? 4 : 4);
  let rowCursorY = outerGap;
  const sectorRects = [];
  rowGroups.forEach((row, rowIndex) => {
    const rowHeight = (height - outerGap * (rowGroups.length + 1)) * row.ratio;
    const effectiveRowHeight = rowIndex === rowGroups.length - 1 ? height - rowCursorY - outerGap : rowHeight;
    const rowRects = sliceDiceLayout(row.items, outerGap, rowCursorY, width - outerGap * 2, effectiveRowHeight, true);
    sectorRects.push(...rowRects);
    rowCursorY += effectiveRowHeight + outerGap;
  });

  const sectorSvg = sectorRects.map((sectorRect, sectorIndex) => {
    const sectorInset = isArgentina ? 1.5 : 3;
    const sx = sectorRect.x + sectorInset;
    const sy = sectorRect.y + sectorInset;
    const sw = Math.max(80, sectorRect.width - sectorInset * 2);
    const sh = Math.max(90, sectorRect.height - sectorInset * 2);
      const sectorInnerX = sx + 4;
      const sectorInnerY = sy + sectorHeader + 4;
      const sectorInnerW = Math.max(20, sw - 8);
      const sectorInnerH = Math.max(20, sh - sectorHeader - 8);

    const industries = Array.from(sectorRect.items.reduce((map, item) => {
      if (!map.has(item.industry)) map.set(item.industry, []);
      map.get(item.industry).push(item);
      return map;
    }, new Map()).entries()).map(([industry, items]) => ({
      industry,
      value: items.reduce((sum, item) => sum + Number(item.layoutValue || item.sizeValue || item.marketCap || 0), 0),
      items: items.slice().sort((a, b) => Number(b.sizeValue || b.marketCap || 0) - Number(a.sizeValue || a.marketCap || 0)),
    })).sort((a, b) => b.value - a.value);

    const industryRects = balancedTreemapLayout(
      industries.map((industry) => ({ ...industry, value: industry.value })),
      sectorInnerX,
      sectorInnerY,
      sectorInnerW,
      sectorInnerH
    );

    const industrySvg = industryRects.map((industryRect, industryIndex) => {
        const ix = industryRect.x + 2;
        const iy = industryRect.y + 2;
        const iw = Math.max(12, industryRect.width - 4);
        const ih = Math.max(12, industryRect.height - 4);
      const industryLabel = String(industryRect.industry || '').toUpperCase();
      const industryFontSize = iw > 150 ? 7.8 : 6.9;
      const industryLabelWidth = Math.min(iw - 8, Math.max(52, industryLabel.length * industryFontSize * 0.64 + 16));
      const showIndustryHeader = iw * ih > (isArgentina ? 15000 : 11500) && iw > 92 && ih > 58;

      const tileRects = balancedTreemapLayout(
        industryRect.items.map((item) => ({ ...item, value: Number(item.layoutValue || item.sizeValue || item.marketCap || 0) })),
        ix,
        iy + (showIndustryHeader ? industryHeader : 0),
        iw,
        Math.max(10, ih - (showIndustryHeader ? industryHeader : 0))
      );

        const tileSvg = tileRects.map((tile) => {
          const tx = tile.x + innerGap / 2;
          const ty = tile.y + innerGap / 2;
          const tw = Math.max(8, tile.width - innerGap);
          const th = Math.max(8, tile.height - innerGap);
        const area = tw * th;
          const huge = area > 32000;
          const large = area > 17500;
          const medium = area > 8400;
          const small = area > 3800;
          const tiny = area > 1850;
          const baseSymbolSize = huge ? 40 : large ? 26 : medium ? 16 : small ? 11 : 9;
          const symbolSize = Math.max(8, Math.min(baseSymbolSize, Math.floor(tw / Math.max(tile.ticker.length * 0.55, 2.8))));
          const changeSize = huge ? 15 : large ? 12 : medium ? 10 : 8;
          const showTicker = tw > 28 && th > 18;
          const showChange = small && th > 32 && tw > 42;
          const showLabelBlock = medium && tw > 92 && th > 58;
          const showMiniTicker = !showLabelBlock && tiny && tw > 44 && th > 24;
          const tileStroke = area > 6000 ? 'rgba(6, 10, 18, 0.56)' : 'rgba(6, 10, 18, 0.42)';
          const labelShadow = 'paint-order: stroke; stroke: rgba(8, 12, 20, 0.22); stroke-width: 1.3;';
          return `
            <g class="heatmap-tile" data-heatmap-tile="true" data-ticker="${escapeHtml(tile.ticker)}" data-name="${escapeHtml(tile.name || tile.ticker)}" data-sector="${escapeHtml(tile.sector || '')}" data-industry="${escapeHtml(tile.industry || '')}" data-price="${tile.price || 0}" data-change="${tile.change || 0}" data-market-cap="${tile.marketCap || 0}" data-size-value="${tile.sizeValue || tile.marketCap || 0}" data-size-label="${escapeHtml(tile.sizeLabel || 'Market cap')}" data-size-currency="${escapeHtml(tile.sizeCurrency || 'USD')}">
              <rect class="heatmap-tile-main" x="${tx.toFixed(2)}" y="${ty.toFixed(2)}" width="${tw.toFixed(2)}" height="${th.toFixed(2)}" rx="4.5" fill="${heatmapColor(tile.change)}" stroke="${tileStroke}" stroke-width="0.9"></rect>
              <rect class="heatmap-tile-sheen" x="${tx.toFixed(2)}" y="${ty.toFixed(2)}" width="${tw.toFixed(2)}" height="${Math.max(5, th * 0.16).toFixed(2)}" rx="4.5" fill="rgba(255,255,255,0.04)"></rect>
              ${showLabelBlock ? `
                <text x="${(tx + tw / 2).toFixed(2)}" y="${(ty + th / 2 - 4).toFixed(2)}" text-anchor="middle" font-size="${symbolSize}" font-weight="700" fill="#ffffff" style="${labelShadow}">${tile.ticker}</text>
                <text x="${(tx + tw / 2).toFixed(2)}" y="${(ty + th / 2 + (huge ? 24 : 16)).toFixed(2)}" text-anchor="middle" font-size="${changeSize}" font-weight="700" fill="rgba(255,255,255,0.96)" style="${labelShadow}">${tile.change > 0 ? '+' : ''}${tile.change.toFixed(1)}%</text>
              ` : showMiniTicker && showTicker ? `
                <text x="${(tx + tw / 2).toFixed(2)}" y="${(ty + th / 2 + 3).toFixed(2)}" text-anchor="middle" font-size="${symbolSize}" font-weight="700" fill="#ffffff" style="${labelShadow}">${tile.ticker}</text>
              ` : ''}
              ${showChange && !showLabelBlock ? `<text x="${(tx + tw / 2).toFixed(2)}" y="${(ty + th - 7).toFixed(2)}" text-anchor="middle" font-size="7.8" font-weight="700" fill="rgba(255,255,255,0.94)" style="${labelShadow}">${tile.change > 0 ? '+' : ''}${tile.change.toFixed(1)}%</text>` : ''}
            </g>
          `;
        }).join('');

        return `
          <g>
            ${showIndustryHeader ? `
              <rect x="${ix.toFixed(2)}" y="${iy.toFixed(2)}" width="${industryLabelWidth.toFixed(2)}" height="${(industryHeader - 3).toFixed(2)}" rx="4" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.065)" stroke-width="0.6"></rect>
              <text x="${(ix + 7).toFixed(2)}" y="${(iy + 10.8).toFixed(2)}" font-size="${industryFontSize}" font-weight="700" letter-spacing="0.18" fill="rgba(255,255,255,0.72)">${industryLabel}</text>
            ` : ''}
            ${tileSvg}
          </g>
        `;
      }).join('');

      const sectorLabel = compactSectorLabel(sectorRect.sector, sw);
      const sectorFontSize = Math.max(8, Math.min(11, Math.floor((sw - 22) / Math.max(sectorLabel.length * 0.78, 6))));
      const sectorChipWidth = Math.min(sw - 18, Math.max(108, sectorLabel.length * sectorFontSize * 0.78 + 24));
      const sectorChipHeight = sectorHeader - 8;
      const sectorChipY = sy + 5;
      const sectorHeaderVisible = sw > 90 && sh > 46;
      const sectorShare = `${(((sectorRect.actualValue || sectorRect.value) / totalMarketCap) * 100).toFixed(sw > 190 ? 1 : 0)}%`;

      return `
        <g>
          <rect x="${sx.toFixed(2)}" y="${sy.toFixed(2)}" width="${sw.toFixed(2)}" height="${sh.toFixed(2)}" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.075)" stroke-width="0.9"></rect>
          ${sectorHeaderVisible ? `<rect x="${(sx + 8).toFixed(2)}" y="${sectorChipY.toFixed(2)}" width="${sectorChipWidth.toFixed(2)}" height="${sectorChipHeight.toFixed(2)}" rx="8" fill="rgba(255,255,255,0.042)" stroke="rgba(255,255,255,0.055)" stroke-width="0.7"></rect>` : ''}
          ${sectorHeaderVisible ? `<line x1="${(sx + 8).toFixed(2)}" y1="${(sy + sectorHeader - 1).toFixed(2)}" x2="${(sx + sw - 8).toFixed(2)}" y2="${(sy + sectorHeader - 1).toFixed(2)}" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"></line>` : ''}
          ${sectorHeaderVisible ? `<text x="${(sx + 18).toFixed(2)}" y="${(sectorChipY + sectorChipHeight / 2 + 3).toFixed(2)}" font-size="${sectorFontSize}" font-weight="700" letter-spacing="${sectorFontSize <= 9 ? 0.16 : 0.42}" fill="#f8fafc">${sectorLabel}</text>` : ''}
          ${sectorHeaderVisible && sw > 220 ? `<text x="${(sx + sw - 12).toFixed(2)}" y="${(sectorChipY + sectorChipHeight / 2 + 3).toFixed(2)}" text-anchor="end" font-size="8.6" font-weight="700" letter-spacing="0.2" fill="rgba(255,255,255,0.5)">${sectorShare}</text>` : ''}
          ${industrySvg}
        </g>
      `;
    }).join('');

  container.innerHTML = `
    <div class="optimizer-svg-shell ${isArgentina ? 'heatmap-shell-argentina' : 'heatmap-shell-usa'}">
      <div class="optimizer-svg-frame ${isArgentina ? 'heatmap-frame-argentina' : 'heatmap-frame-usa'}">
        <svg class="optimizer-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${t('heatmap_title')}">
          <defs>
            <linearGradient id="heatmapBg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#232633"></stop>
              <stop offset="100%" stop-color="#171922"></stop>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="${width}" height="${height}" fill="url(#heatmapBg)"></rect>
          <rect x="7" y="7" width="${width - 14}" height="${height - 14}" rx="18" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1"></rect>
          ${sectorSvg}
        </svg>
      </div>
      <div class="optimizer-legend" style="justify-content:center">
        <span class="optimizer-legend-item"><span class="optimizer-legend-swatch" style="background:${heatmapColor(-3.5)}"></span>${t('heatmap_legend_negative')}</span>
        <span class="optimizer-legend-item"><span class="optimizer-legend-swatch" style="background:${heatmapColor(0)}"></span>${t('heatmap_legend_flat')}</span>
        <span class="optimizer-legend-item"><span class="optimizer-legend-swatch" style="background:${heatmapColor(3.5)}"></span>${t('heatmap_legend_positive')}</span>
        <span class="optimizer-legend-item">${currentLanguage === 'en' ? 'Size by market cap' : 'Tamaño por market cap'}</span>
      </div>
      <div class="heatmap-tooltip" hidden></div>
    </div>
  `;

  empty.style.display = 'none';
  const sizeLegendEl = container.querySelector('.optimizer-legend-item:last-child');
  if (sizeLegendEl) sizeLegendEl.textContent = sanitizeHeatmapCopy(sizeLegend);
  setupHeatmapTooltip(container);
}

async function loadHeatmap() {
  const statusEl = document.getElementById('heatmap-status');
  const sourceEl = document.getElementById('heatmap-source');
  const emptyEl = document.getElementById('heatmap-empty');
  const chartEl = document.getElementById('heatmap-chart');
  const marketSelect = document.getElementById('heatmap-market-select');
  const startInput = document.getElementById('heatmap-start-date');
  const endInput = document.getElementById('heatmap-end-date');
  const market = marketSelect?.value || 'usa';
  const marketConfig = getHeatmapMarketConfig(market);
  const start = getHeatmapDateValue(startInput);
  const end = getHeatmapDateValue(endInput);
  if (statusEl) statusEl.textContent = t('heatmap_loading');
  if (sourceEl) sourceEl.textContent = resolveHeatmapSource(marketConfig.defaultProvider);
  if (emptyEl) emptyEl.style.display = '';
  if (chartEl) chartEl.innerHTML = '';

  try {
    const params = new URLSearchParams();
    params.set('market', market);
    if (start) params.set('start', start);
    if (end) params.set('end', end);
    const response = await fetch(`/api/heatmap${params.toString() ? `?${params.toString()}` : ''}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const data = normalizeHeatmapTiles(payload?.data);
    if (!data.length) {
      if (statusEl) statusEl.textContent = t('heatmap_empty');
      if (emptyEl) emptyEl.textContent = t('heatmap_empty');
      return;
    }
    renderHeatmap(data);
    if (statusEl) {
      statusEl.textContent = `${data.length} ${currentLanguage === 'en' ? 'stocks loaded' : 'acciones cargadas'} · ${describeHeatmapPeriod(start, end)} · ${currentLanguage === 'en' ? 'updated' : 'actualizado'} ${new Date(payload.updated || Date.now()).toLocaleTimeString(currentLanguage === 'en' ? 'en-US' : 'es-AR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    if (statusEl) {
      statusEl.textContent = `${data.length} ${currentLanguage === 'en' ? 'stocks loaded' : 'acciones cargadas'} · ${describeHeatmapPeriodForMarket(start, end, market)} · ${currentLanguage === 'en' ? 'updated' : 'actualizado'} ${new Date(payload.updated || Date.now()).toLocaleTimeString(currentLanguage === 'en' ? 'en-US' : 'es-AR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    if (sourceEl) sourceEl.textContent = sanitizeHeatmapCopy(resolveHeatmapSource(payload.provider));
    if (statusEl) {
      const updatedAt = new Date(payload.updated || Date.now()).toLocaleTimeString(
        currentLanguage === 'en' ? 'en-US' : 'es-AR',
        { hour: '2-digit', minute: '2-digit' }
      );
      statusEl.textContent = sanitizeHeatmapCopy(currentLanguage === 'en'
        ? `${data.length} stocks | ${describeHeatmapPeriodForMarket(start, end, market)} | updated ${updatedAt}`
        : `${data.length} acciones | ${describeHeatmapPeriodForMarket(start, end, market)} | actualizado ${updatedAt}`);
    }
  } catch (error) {
    if (statusEl) statusEl.textContent = t('heatmap_error', { message: error.message });
    if (emptyEl) emptyEl.textContent = t('heatmap_empty');
  }
}

function setupHeatmap() {
  const marketSelect = document.getElementById('heatmap-market-select');
  const startInput = document.getElementById('heatmap-start-date');
  const endInput = document.getElementById('heatmap-end-date');
  const defaultRange = getYesterdayAndTodayRange();
  setupHeatmapDateInputs();
  setupHeatmapMarketControl();
  if (startInput) setHeatmapDateValue(startInput, defaultRange.start);
  if (endInput) setHeatmapDateValue(endInput, defaultRange.end);
  document.getElementById('heatmap-refresh-btn')?.addEventListener('click', loadHeatmapV2);
  document.getElementById('heatmap-now-btn')?.addEventListener('click', () => {
    const latestRange = getYesterdayAndTodayRange();
    setHeatmapDateValue(document.getElementById('heatmap-start-date'), latestRange.start);
    setHeatmapDateValue(document.getElementById('heatmap-end-date'), latestRange.end);
    loadHeatmapV2();
  });
  marketSelect?.addEventListener('change', () => {
    updateHeatmapMarketUI();
    loadHeatmapV2();
  });
  const statusEl = document.getElementById('heatmap-status');
  const sourceEl = document.getElementById('heatmap-source');
  const emptyEl = document.getElementById('heatmap-empty');
  const marketLabel = document.getElementById('heatmap-market-label');
  const startLabel = document.getElementById('heatmap-start-label');
  const endLabel = document.getElementById('heatmap-end-label');
  const periodHint = document.getElementById('heatmap-period-hint-legacy') || document.getElementById('heatmap-period-hint');
  const activeMarket = marketSelect?.value || 'usa';
  const activeMarketConfig = getHeatmapMarketConfig(activeMarket);
  if (statusEl) statusEl.textContent = t('heatmap_loading');
  if (marketLabel) marketLabel.textContent = t('heatmap_market_label');
  if (sourceEl) sourceEl.textContent = sanitizeHeatmapCopy(resolveHeatmapSource(activeMarketConfig.defaultProvider));
  if (emptyEl) emptyEl.textContent = currentLanguage === 'en' ? 'Load the map to view the sector layout.' : 'Cargá el mapa para ver la distribución sectorial.';
  if (startLabel) startLabel.textContent = t('heatmap_start_label');
  if (endLabel) endLabel.textContent = t('heatmap_end_label');
  if (periodHint) periodHint.textContent = sanitizeHeatmapCopy(t('heatmap_period_hint'));
  if (emptyEl) emptyEl.textContent = sanitizeHeatmapCopy(emptyEl.textContent);
  if (marketSelect) {
    if (marketSelect.options[0]) marketSelect.options[0].textContent = t('heatmap_market_usa');
    if (marketSelect.options[1]) marketSelect.options[1].textContent = t('heatmap_market_argentina_ars');
    if (marketSelect.options[2]) marketSelect.options[2].textContent = t('heatmap_market_argentina_usd');
  }
  updateHeatmapMarketTriggerLabel();
  if (heatmapMarketPickerState?.panel && !heatmapMarketPickerState.panel.hidden) renderHeatmapMarketPicker();
  document.getElementById('heatmap-now-btn')?.replaceChildren(document.createTextNode(t('heatmap_now')));
  document.getElementById('heatmap-refresh-btn')?.replaceChildren(document.createTextNode(t('heatmap_refresh')));
  ['heatmap-start-date', 'heatmap-end-date'].forEach((id) => {
    const input = document.getElementById(id);
    if (input) input.placeholder = currentLanguage === 'en' ? 'Select date' : 'Seleccionar fecha';
    setHeatmapDateValue(input, getHeatmapDateValue(input));
  });
  if (heatmapDatePickerState?.activeInput) renderHeatmapDatePickerV3();
  updateHeatmapMarketUI();
}

async function loadHeatmapV2() {
  const statusEl = document.getElementById('heatmap-status');
  const sourceEl = document.getElementById('heatmap-source');
  const emptyEl = document.getElementById('heatmap-empty');
  const chartEl = document.getElementById('heatmap-chart');
  const marketSelect = document.getElementById('heatmap-market-select');
  const startInput = document.getElementById('heatmap-start-date');
  const endInput = document.getElementById('heatmap-end-date');
  const market = marketSelect?.value || 'usa';
  const marketConfig = getHeatmapMarketConfig(market);
  const start = getHeatmapDateValue(startInput);
  const end = getHeatmapDateValue(endInput);

  if (statusEl) statusEl.textContent = t('heatmap_loading');
  if (sourceEl) {
    sourceEl.textContent = resolveHeatmapSource(marketConfig.defaultProvider);
  }
  if (emptyEl) emptyEl.style.display = '';
  if (chartEl) chartEl.innerHTML = '';

  try {
    const params = new URLSearchParams();
    params.set('market', market);
    if (start) params.set('start', start);
    if (end) params.set('end', end);

    const response = await fetch(`/api/heatmap${params.toString() ? `?${params.toString()}` : ''}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    const data = normalizeHeatmapTiles(payload?.data);

    if (!data.length) {
      if (statusEl) statusEl.textContent = t('heatmap_empty');
      if (emptyEl) emptyEl.textContent = t('heatmap_empty');
      return;
    }

    renderHeatmap(data);
    if (sourceEl) sourceEl.textContent = sanitizeHeatmapCopy(resolveHeatmapSource(payload.provider));
    if (statusEl) statusEl.textContent = describeHeatmapStatus(data.length, start, end, market, payload.updated);
  } catch (error) {
    if (statusEl) statusEl.textContent = t('heatmap_error', { message: error.message });
    if (emptyEl) emptyEl.textContent = t('heatmap_empty');
  }
}

function resolveHeatmapSource(provider) {
  if (provider === 'polygon-reference+yahoo') return t('heatmap_source_polygon_reference');
  if (provider === 'polygon') return t('heatmap_source_polygon');
  if (provider === 'data912-argentina-ars') return t('heatmap_source_argentina_ars');
  if (provider === 'data912-argentina-usd') return t('heatmap_source_argentina_usd');
  return t('heatmap_source_yahoo');
}

function getHeatmapMarketConfig(market) {
  const configApi = window.BDI_HEATMAP_CONFIG;
  if (configApi && typeof configApi.getMarketConfig === 'function') {
    return configApi.getMarketConfig(market);
  }
  return {
    key: market || 'usa',
    rangeEnabled: market !== 'argentina-usd',
    dailyOnly: market === 'argentina-usd',
    defaultProvider: market === 'argentina-usd'
      ? 'data912-argentina-usd'
      : market === 'argentina-ars'
        ? 'data912-argentina-ars'
      : 'yahoo-fallback',
  };
}

function normalizeHeatmapTiles(items) {
  const contractApi = window.BDI_HEATMAP_TILE_CONTRACT;
  if (contractApi && typeof contractApi.normalizeTiles === 'function') {
    return contractApi.normalizeTiles(items);
  }
  return Array.isArray(items) ? items : [];
}

function sanitizeHeatmapCopy(text) {
  return String(text || '')
    .replaceAll('Â·', '|')
    .replaceAll('variaciÃ³n', 'variacion')
    .replaceAll('variaciÃƒÂ³n', 'variacion')
    .replaceAll('TamaÃ±o', 'Tamano')
    .replaceAll('CargÃ¡', 'Carga')
    .replaceAll('distribuciÃ³n', 'distribucion');
}

let heatmapDatePickerState = null;
let heatmapMarketPickerState = null;
let compoundFrequencyPickerState = null;

function parseHeatmapISODate(value) {
  if (!value) return null;
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatHeatmapInputDate(value) {
  const date = parseHeatmapISODate(value);
  if (!date) return '';
  return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getHeatmapDateValue(input) {
  if (!input) return '';
  return input.dataset.isoValue || '';
}

function setHeatmapDateValue(input, value) {
  if (!input) return;
  const isoValue = value || '';
  input.dataset.isoValue = isoValue;
  input.value = formatHeatmapInputDate(isoValue);
  input.classList.toggle('has-value', Boolean(isoValue));
}

function formatHeatmapDateLabel(value) {
  if (!value) return currentLanguage === 'en' ? 'now' : 'ahora';
  const date = parseHeatmapISODate(value) || new Date();
  return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function toHeatmapIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getPreviousBusinessDay(date) {
  const cursor = new Date(date);
  do {
    cursor.setDate(cursor.getDate() - 1);
  } while (cursor.getDay() === 0 || cursor.getDay() === 6);
  return cursor;
}

function getYesterdayAndTodayRange() {
  const today = new Date();
  const endDate = new Date(today);
  if (endDate.getDay() === 6) {
    endDate.setDate(endDate.getDate() - 1);
  } else if (endDate.getDay() === 0) {
    endDate.setDate(endDate.getDate() - 2);
  }
  const startDate = getPreviousBusinessDay(endDate);
  return {
    start: toHeatmapIsoDate(startDate),
    end: toHeatmapIsoDate(endDate),
  };
}

function isSameHeatmapDayRange(start, end) {
  const range = getYesterdayAndTodayRange();
  return start === range.start && end === range.end;
}

function describeHeatmapStatus(dataLength, start, end, market, updatedValue) {
  const updatedAt = new Date(updatedValue || Date.now()).toLocaleTimeString(
    currentLanguage === 'en' ? 'en-US' : 'es-AR',
    { hour: '2-digit', minute: '2-digit' }
  );
  const universeLabel = currentLanguage === 'en'
    ? `${dataLength} names`
    : `${dataLength} activos`;
  const marketConfig = getHeatmapMarketConfig(market);
  let rangeLabel;
  if (marketConfig.dailyOnly) {
    rangeLabel = currentLanguage === 'en' ? 'Daily move' : 'Variacion diaria';
  } else if (isSameHeatmapDayRange(start, end)) {
    rangeLabel = currentLanguage === 'en' ? 'Latest daily session' : 'Ultima rueda diaria';
  } else if (start && !end) {
    rangeLabel = currentLanguage === 'en'
      ? `Range: ${formatHeatmapDateLabel(start)} - now`
      : `Rango: ${formatHeatmapDateLabel(start)} a ahora`;
  } else {
    rangeLabel = currentLanguage === 'en'
      ? `Range: ${formatHeatmapDateLabel(start)} - ${formatHeatmapDateLabel(end)}`
      : `Rango: ${formatHeatmapDateLabel(start)} al ${formatHeatmapDateLabel(end)}`;
  }
  return sanitizeHeatmapCopy(
    currentLanguage === 'en'
      ? `${universeLabel} | ${rangeLabel} | Updated ${updatedAt}`
      : `${universeLabel} | ${rangeLabel} | Actualizado ${updatedAt}`
  );
}

function formatHeatmapCalendarMonth(date) {
  return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'es-AR', {
    month: 'long',
    year: 'numeric',
  });
}

function buildHeatmapMonthGrid(selectedMonth) {
  const formatter = new Intl.DateTimeFormat(currentLanguage === 'en' ? 'en-US' : 'es-AR', { month: 'short' });
  return Array.from({ length: 12 }, (_, index) => {
    const monthDate = new Date(2024, index, 1);
    return `<button type="button" class="heatmap-calendar-month ${index === selectedMonth ? 'is-selected' : ''}" data-calendar-month="${index}">${formatter.format(monthDate)}</button>`;
  }).join('');
}

function buildHeatmapCalendarDays(viewDate, selectedIso) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthStart = new Date(year, month, 1);
  const startWeekday = monthStart.getDay();
  const today = new Date();
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const cells = [];

  for (let index = 0; index < 42; index += 1) {
    const dayNumber = index - startWeekday + 1;
    const cellDate = new Date(year, month, dayNumber);
    const iso = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, '0')}-${String(cellDate.getDate()).padStart(2, '0')}`;
    const inMonth = cellDate.getMonth() === month;
    const classes = [
      'heatmap-calendar-day',
      inMonth ? '' : 'is-outside',
      iso === selectedIso ? 'is-selected' : '',
      iso === todayIso ? 'is-today' : '',
    ].filter(Boolean).join(' ');
    cells.push(`<button type="button" class="${classes}" data-date="${iso}">${cellDate.getDate()}</button>`);
  }

  return cells.join('');
}

function closeHeatmapDatePicker() {
  if (!heatmapDatePickerState?.panel) return;
  heatmapDatePickerState.panel.hidden = true;
  heatmapDatePickerState.activeInput = null;
}

function updateHeatmapMarketTriggerLabel() {
  const select = document.getElementById('heatmap-market-select');
  const triggerText = document.getElementById('heatmap-market-trigger-text');
  if (!select || !triggerText) return;
  const option = select.options[select.selectedIndex];
  triggerText.textContent = option ? option.textContent : 'USA';
}

function closeHeatmapMarketPicker() {
  if (!heatmapMarketPickerState?.panel || !heatmapMarketPickerState?.trigger) return;
  heatmapMarketPickerState.panel.hidden = true;
  heatmapMarketPickerState.trigger.setAttribute('aria-expanded', 'false');
}

function positionHeatmapMarketPicker() {
  if (!heatmapMarketPickerState?.panel || !heatmapMarketPickerState?.trigger || heatmapMarketPickerState.panel.hidden) return;
  const rect = heatmapMarketPickerState.trigger.getBoundingClientRect();
  const panelWidth = 260;
  const maxLeft = window.scrollX + window.innerWidth - panelWidth - 16;
  heatmapMarketPickerState.panel.style.top = `${window.scrollY + rect.bottom + 10}px`;
  heatmapMarketPickerState.panel.style.left = `${Math.max(16, Math.min(window.scrollX + rect.left, maxLeft))}px`;
}

function renderHeatmapMarketPicker() {
  if (!heatmapMarketPickerState?.panel) return;
  const select = document.getElementById('heatmap-market-select');
  if (!select) return;
  heatmapMarketPickerState.panel.innerHTML = Array.from(select.options).map((option) => `
    <button type="button" class="heatmap-select-option ${option.selected ? 'is-selected' : ''}" data-market-value="${option.value}">${option.textContent}</button>
  `).join('');
  heatmapMarketPickerState.panel.hidden = false;
  heatmapMarketPickerState.trigger?.setAttribute('aria-expanded', 'true');
  positionHeatmapMarketPicker();
}

function ensureHeatmapMarketPicker() {
  if (heatmapMarketPickerState?.panel) return;
  const panel = document.createElement('div');
  panel.className = 'heatmap-select-popover';
  panel.hidden = true;
  document.body.appendChild(panel);

  panel.addEventListener('mousedown', (event) => event.preventDefault());
  panel.addEventListener('click', (event) => {
    event.stopPropagation();
    const option = event.target.closest('[data-market-value]');
    if (!option) return;
    const select = document.getElementById('heatmap-market-select');
    if (!select) return;
    select.value = option.dataset.marketValue;
    updateHeatmapMarketTriggerLabel();
    closeHeatmapMarketPicker();
    updateHeatmapMarketUI();
    loadHeatmapV2();
  });

  document.addEventListener('click', (event) => {
    if (!heatmapMarketPickerState?.panel || heatmapMarketPickerState.panel.hidden) return;
    const trigger = event.target.closest('#heatmap-market-trigger');
    if (trigger || heatmapMarketPickerState.panel.contains(event.target)) return;
    closeHeatmapMarketPicker();
  });

  window.addEventListener('resize', positionHeatmapMarketPicker);
  window.addEventListener('scroll', positionHeatmapMarketPicker, true);

  heatmapMarketPickerState = {
    panel,
    trigger: null,
  };
}

function positionHeatmapDatePicker() {
  if (!heatmapDatePickerState?.panel || !heatmapDatePickerState?.activeInput || heatmapDatePickerState.panel.hidden) return;
  const rect = heatmapDatePickerState.activeInput.getBoundingClientRect();
  const panelWidth = 312;
  const maxLeft = window.scrollX + window.innerWidth - panelWidth - 16;
  heatmapDatePickerState.panel.style.top = `${window.scrollY + rect.bottom + 10}px`;
  heatmapDatePickerState.panel.style.left = `${Math.max(16, Math.min(window.scrollX + rect.left, maxLeft))}px`;
}

function renderHeatmapDatePicker() {
  if (!heatmapDatePickerState?.panel || !heatmapDatePickerState?.activeInput) return;
  const { panel, activeInput, viewDate } = heatmapDatePickerState;
  const selectedIso = getHeatmapDateValue(activeInput);
  const weekdayFormatter = new Intl.DateTimeFormat(currentLanguage === 'en' ? 'en-US' : 'es-AR', { weekday: 'short' });
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(2024, 0, 7 + index);
    return `<span>${weekdayFormatter.format(day).slice(0, 2)}</span>`;
  }).join('');

  panel.innerHTML = `
    <div class="heatmap-calendar-header">
      <button type="button" class="heatmap-calendar-nav" data-calendar-nav="-1" aria-label="${currentLanguage === 'en' ? 'Previous month' : 'Mes anterior'}">‹</button>
      <div class="heatmap-calendar-title">${formatHeatmapCalendarMonth(viewDate)}</div>
      <button type="button" class="heatmap-calendar-nav" data-calendar-nav="1" aria-label="${currentLanguage === 'en' ? 'Next month' : 'Mes siguiente'}">›</button>
    </div>
    <div class="heatmap-calendar-weekdays">${weekdays}</div>
    <div class="heatmap-calendar-grid">${buildHeatmapCalendarDays(viewDate, selectedIso)}</div>
    <div class="heatmap-calendar-footer">
      <button type="button" class="heatmap-calendar-link" data-calendar-action="clear">${currentLanguage === 'en' ? 'Clear' : 'Limpiar'}</button>
      <button type="button" class="heatmap-calendar-link" data-calendar-action="today">${currentLanguage === 'en' ? 'Today' : 'Hoy'}</button>
    </div>
  `;
  panel.hidden = false;
  positionHeatmapDatePicker();
}

function renderHeatmapDatePickerV2() {
  if (!heatmapDatePickerState?.panel || !heatmapDatePickerState?.activeInput) return;
  const { panel, activeInput, viewDate } = heatmapDatePickerState;
  const selectedIso = getHeatmapDateValue(activeInput);
  const weekdayFormatter = new Intl.DateTimeFormat(currentLanguage === 'en' ? 'en-US' : 'es-AR', { weekday: 'short' });
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(2024, 0, 7 + index);
    return `<span>${weekdayFormatter.format(day).slice(0, 2)}</span>`;
  }).join('');

  panel.innerHTML = `
    <div class="heatmap-calendar-header">
      <button type="button" class="heatmap-calendar-nav" data-calendar-nav="-1" aria-label="${currentLanguage === 'en' ? 'Previous year' : 'Año anterior'}">&lt;</button>
      <button type="button" class="heatmap-calendar-title heatmap-calendar-title-button" data-calendar-view="months">${formatHeatmapCalendarMonth(viewDate)}</button>
      <button type="button" class="heatmap-calendar-nav" data-calendar-nav="1" aria-label="${currentLanguage === 'en' ? 'Next year' : 'Año siguiente'}">&gt;</button>
    </div>
    ${heatmapDatePickerState.mode === 'months'
      ? `<div class="heatmap-calendar-months">${buildHeatmapMonthGrid(viewDate.getMonth())}</div>`
      : `<div class="heatmap-calendar-weekdays">${weekdays}</div><div class="heatmap-calendar-grid">${buildHeatmapCalendarDays(viewDate, selectedIso)}</div>`}
    <div class="heatmap-calendar-footer">
      <button type="button" class="heatmap-calendar-link" data-calendar-action="clear">${currentLanguage === 'en' ? 'Clear' : 'Limpiar'}</button>
      <button type="button" class="heatmap-calendar-link" data-calendar-action="today">${currentLanguage === 'en' ? 'Today' : 'Hoy'}</button>
    </div>
  `;
  panel.hidden = false;
  positionHeatmapDatePicker();
}

function renderHeatmapDatePickerV3() {
  if (!heatmapDatePickerState?.panel || !heatmapDatePickerState?.activeInput) return;
  const { panel, activeInput, viewDate } = heatmapDatePickerState;
  const selectedIso = getHeatmapDateValue(activeInput);
  const isMonthMode = heatmapDatePickerState.mode === 'months';
  const weekdayFormatter = new Intl.DateTimeFormat(currentLanguage === 'en' ? 'en-US' : 'es-AR', { weekday: 'short' });
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(2024, 0, 7 + index);
    return `<span>${weekdayFormatter.format(day).slice(0, 2)}</span>`;
  }).join('');

  panel.innerHTML = `
    <div class="heatmap-calendar-header">
      <button type="button" class="heatmap-calendar-nav" data-calendar-nav="-1" aria-label="${isMonthMode ? (currentLanguage === 'en' ? 'Previous year' : 'Año anterior') : (currentLanguage === 'en' ? 'Previous month' : 'Mes anterior')}">&lt;</button>
      <button type="button" class="heatmap-calendar-title heatmap-calendar-title-button" data-calendar-view="months">${formatHeatmapCalendarMonth(viewDate)}</button>
      <button type="button" class="heatmap-calendar-nav" data-calendar-nav="1" aria-label="${isMonthMode ? (currentLanguage === 'en' ? 'Next year' : 'Año siguiente') : (currentLanguage === 'en' ? 'Next month' : 'Mes siguiente')}">&gt;</button>
    </div>
    ${isMonthMode
      ? `<div class="heatmap-calendar-months">${buildHeatmapMonthGrid(viewDate.getMonth())}</div>`
      : `<div class="heatmap-calendar-weekdays">${weekdays}</div><div class="heatmap-calendar-grid">${buildHeatmapCalendarDays(viewDate, selectedIso)}</div>`}
    <div class="heatmap-calendar-footer">
      <button type="button" class="heatmap-calendar-link" data-calendar-action="clear">${currentLanguage === 'en' ? 'Clear' : 'Limpiar'}</button>
      <button type="button" class="heatmap-calendar-link" data-calendar-action="today">${currentLanguage === 'en' ? 'Today' : 'Hoy'}</button>
    </div>
  `;
  panel.hidden = false;
  positionHeatmapDatePicker();
}

function openHeatmapDatePicker(input) {
  if (!heatmapDatePickerState?.panel || !input || input.disabled) return;
  heatmapDatePickerState.activeInput = input;
  heatmapDatePickerState.viewDate = parseHeatmapISODate(getHeatmapDateValue(input)) || new Date();
  heatmapDatePickerState.mode = 'days';
  renderHeatmapDatePickerV3();
}

function ensureHeatmapDatePicker() {
  if (heatmapDatePickerState?.panel) return;
  const panel = document.createElement('div');
  panel.className = 'heatmap-calendar-popover';
  panel.hidden = true;
  document.body.appendChild(panel);

  panel.addEventListener('mousedown', (event) => event.preventDefault());
  panel.addEventListener('click', (event) => {
    event.stopPropagation();
    const nav = event.target.closest('[data-calendar-nav]');
    if (nav) {
      const delta = Number(nav.dataset.calendarNav || 0);
      if (heatmapDatePickerState.mode === 'months') {
        heatmapDatePickerState.viewDate = new Date(
          heatmapDatePickerState.viewDate.getFullYear() + delta,
          heatmapDatePickerState.viewDate.getMonth(),
          1
        );
      } else {
        heatmapDatePickerState.viewDate = new Date(
          heatmapDatePickerState.viewDate.getFullYear(),
          heatmapDatePickerState.viewDate.getMonth() + delta,
          1
        );
      }
      renderHeatmapDatePickerV3();
      return;
    }

    const monthViewBtn = event.target.closest('[data-calendar-view="months"]');
    if (monthViewBtn) {
      heatmapDatePickerState.mode = 'months';
      renderHeatmapDatePickerV3();
      return;
    }

    const monthBtn = event.target.closest('[data-calendar-month]');
    if (monthBtn) {
      heatmapDatePickerState.viewDate = new Date(
        heatmapDatePickerState.viewDate.getFullYear(),
        Number(monthBtn.dataset.calendarMonth || 0),
        1
      );
      heatmapDatePickerState.mode = 'days';
      renderHeatmapDatePickerV3();
      return;
    }

    const dayBtn = event.target.closest('[data-date]');
    if (dayBtn && heatmapDatePickerState.activeInput) {
      setHeatmapDateValue(heatmapDatePickerState.activeInput, dayBtn.dataset.date);
      closeHeatmapDatePicker();
      return;
    }

    const actionBtn = event.target.closest('[data-calendar-action]');
    if (!actionBtn || !heatmapDatePickerState.activeInput) return;
    if (actionBtn.dataset.calendarAction === 'clear') {
      setHeatmapDateValue(heatmapDatePickerState.activeInput, '');
      closeHeatmapDatePicker();
      return;
    }
    const now = new Date();
    const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    setHeatmapDateValue(heatmapDatePickerState.activeInput, iso);
    closeHeatmapDatePicker();
  });

  document.addEventListener('click', (event) => {
    if (!heatmapDatePickerState?.panel || heatmapDatePickerState.panel.hidden) return;
    const clickedInput = event.target.closest('.heatmap-date-input');
    if (clickedInput || heatmapDatePickerState.panel.contains(event.target)) return;
    closeHeatmapDatePicker();
  });

  window.addEventListener('resize', positionHeatmapDatePicker);
  window.addEventListener('scroll', positionHeatmapDatePicker, true);

  heatmapDatePickerState = {
    panel,
    activeInput: null,
    viewDate: new Date(),
    mode: 'days',
  };
}

function setupHeatmapDateInputs() {
  ensureHeatmapDatePicker();
  ['heatmap-start-date', 'heatmap-end-date'].forEach((id) => {
    const input = document.getElementById(id);
    if (!input || input.dataset.calendarBound === 'true') return;
    input.dataset.calendarBound = 'true';
    setHeatmapDateValue(input, getHeatmapDateValue(input));
    input.addEventListener('click', () => openHeatmapDatePicker(input));
    input.addEventListener('focus', () => openHeatmapDatePicker(input));
  });
}

function setupHeatmapMarketControl() {
  ensureHeatmapMarketPicker();
  const trigger = document.getElementById('heatmap-market-trigger');
  const select = document.getElementById('heatmap-market-select');
  if (!trigger || !select || trigger.dataset.marketBound === 'true') return;
  heatmapMarketPickerState.trigger = trigger;
  trigger.dataset.marketBound = 'true';
  updateHeatmapMarketTriggerLabel();
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (heatmapMarketPickerState.panel.hidden) {
      renderHeatmapMarketPicker();
      return;
    }
    closeHeatmapMarketPicker();
  });
}

function updateCompoundFrequencyTriggerLabel() {
  const select = document.getElementById('compound-frequency');
  const triggerText = document.getElementById('compound-frequency-trigger-text');
  if (!select || !triggerText) return;
  const option = select.options[select.selectedIndex];
  triggerText.textContent = option ? option.textContent : '';
}

function closeCompoundFrequencyPicker() {
  if (!compoundFrequencyPickerState?.panel || !compoundFrequencyPickerState?.trigger) return;
  compoundFrequencyPickerState.panel.hidden = true;
  compoundFrequencyPickerState.trigger.setAttribute('aria-expanded', 'false');
}

function positionCompoundFrequencyPicker() {
  if (!compoundFrequencyPickerState?.panel || !compoundFrequencyPickerState?.trigger || compoundFrequencyPickerState.panel.hidden) return;
  const rect = compoundFrequencyPickerState.trigger.getBoundingClientRect();
  const panelWidth = 260;
  const maxLeft = window.scrollX + window.innerWidth - panelWidth - 16;
  compoundFrequencyPickerState.panel.style.top = `${window.scrollY + rect.bottom + 10}px`;
  compoundFrequencyPickerState.panel.style.left = `${Math.max(16, Math.min(window.scrollX + rect.left, maxLeft))}px`;
}

function renderCompoundFrequencyPicker() {
  if (!compoundFrequencyPickerState?.panel) return;
  const select = document.getElementById('compound-frequency');
  if (!select) return;
  compoundFrequencyPickerState.panel.innerHTML = Array.from(select.options).map((option) => `
    <button type="button" class="heatmap-select-option ${option.selected ? 'is-selected' : ''}" data-compound-frequency="${option.value}">${option.textContent}</button>
  `).join('');
  compoundFrequencyPickerState.panel.hidden = false;
  compoundFrequencyPickerState.trigger?.setAttribute('aria-expanded', 'true');
  positionCompoundFrequencyPicker();
}

function ensureCompoundFrequencyPicker() {
  if (compoundFrequencyPickerState?.panel) return;
  const panel = document.createElement('div');
  panel.className = 'heatmap-select-popover compound-select-popover';
  panel.hidden = true;
  document.body.appendChild(panel);

  panel.addEventListener('mousedown', (event) => event.preventDefault());
  panel.addEventListener('click', (event) => {
    event.stopPropagation();
    const option = event.target.closest('[data-compound-frequency]');
    if (!option) return;
    const select = document.getElementById('compound-frequency');
    if (!select) return;
    select.value = option.dataset.compoundFrequency;
    updateCompoundFrequencyTriggerLabel();
    closeCompoundFrequencyPicker();
  });

  document.addEventListener('click', (event) => {
    if (!compoundFrequencyPickerState?.panel || compoundFrequencyPickerState.panel.hidden) return;
    const trigger = event.target.closest('#compound-frequency-trigger');
    if (trigger || compoundFrequencyPickerState.panel.contains(event.target)) return;
    closeCompoundFrequencyPicker();
  });

  window.addEventListener('resize', positionCompoundFrequencyPicker);
  window.addEventListener('scroll', positionCompoundFrequencyPicker, true);

  compoundFrequencyPickerState = {
    panel,
    trigger: null,
  };
}

function setupCompoundFrequencyControl() {
  ensureCompoundFrequencyPicker();
  const trigger = document.getElementById('compound-frequency-trigger');
  const select = document.getElementById('compound-frequency');
  if (!trigger || !select) return;
  compoundFrequencyPickerState.trigger = trigger;
  updateCompoundFrequencyTriggerLabel();
  if (trigger.dataset.frequencyBound === 'true') return;
  trigger.dataset.frequencyBound = 'true';
  select.addEventListener('change', updateCompoundFrequencyTriggerLabel);
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (compoundFrequencyPickerState.panel.hidden) {
      renderCompoundFrequencyPicker();
      return;
    }
    closeCompoundFrequencyPicker();
  });
}

function describeHeatmapPeriod(start, end) {
  if (!start) return currentLanguage === 'en' ? 'daily move' : 'variación diaria';
  if (!end) return currentLanguage === 'en'
    ? `from ${formatHeatmapDateLabel(start)} to now`
    : `desde ${formatHeatmapDateLabel(start)} hasta ahora`;
  return currentLanguage === 'en'
    ? `from ${formatHeatmapDateLabel(start)} to ${formatHeatmapDateLabel(end)}`
    : `desde ${formatHeatmapDateLabel(start)} hasta ${formatHeatmapDateLabel(end)}`;
}

function describeHeatmapPeriodForMarket(start, end, market) {
  if (market !== 'usa') return currentLanguage === 'en' ? 'daily move' : 'variaciÃ³n diaria';
  return describeHeatmapPeriod(start, end);
}

function updateHeatmapMarketUI() {
  const market = document.getElementById('heatmap-market-select')?.value || 'usa';
  const marketConfig = getHeatmapMarketConfig(market);
  const titleEl = document.getElementById('heatmap-section-title');
  const descEl = document.getElementById('heatmap-section-desc');
  const startInput = document.getElementById('heatmap-start-date');
  const endInput = document.getElementById('heatmap-end-date');
  const startControl = document.getElementById('heatmap-start-label')?.parentElement;
  const endControl = document.getElementById('heatmap-end-label')?.parentElement;
  const nowBtn = document.getElementById('heatmap-now-btn');
  const hint = document.getElementById('heatmap-period-hint-legacy') || document.getElementById('heatmap-period-hint');
  const rangeEnabled = !!marketConfig.rangeEnabled;

  if (titleEl) {
    titleEl.textContent = t('heatmap_title');
  }

  if (descEl) {
    descEl.textContent = t('heatmap_hero_desc');
  }

  [startInput, endInput].forEach((input) => {
    if (input) {
      input.disabled = !rangeEnabled;
      input.placeholder = currentLanguage === 'en' ? 'Select date' : 'Seleccionar fecha';
    }
  });
  [startControl, endControl, nowBtn].forEach((el) => {
    if (el) el.style.display = rangeEnabled ? '' : 'none';
  });
  if (!rangeEnabled) closeHeatmapDatePicker();
  if (hint) {
    hint.textContent = rangeEnabled
      ? (currentLanguage === 'en'
        ? 'By default, the map opens with the latest available session against the prior one.'
        : 'Por defecto, el mapa abre con la ultima rueda disponible frente a la rueda previa.')
      : (currentLanguage === 'en'
        ? 'In Argentina USD, historical range is not available yet, so the map shows only the latest daily move.'
        : 'En Argentina USD, por ahora no hay rango historico disponible, asi que el mapa muestra solo la variacion diaria mas reciente.');
  }
  if (descEl) descEl.textContent = sanitizeHeatmapCopy(descEl.textContent);
  if (hint) hint.textContent = sanitizeHeatmapCopy(hint.textContent);
}

// Keep period wording consistent across USA and Argentina heatmaps once range support is enabled.
function describeHeatmapPeriodForMarket(start, end, market) {
  const marketConfig = getHeatmapMarketConfig(market);
  if (marketConfig.dailyOnly) return currentLanguage === 'en' ? 'daily move' : 'variacion diaria';
  return describeHeatmapPeriod(start, end);
}

function formatCompoundAxisCurrency(value) {
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

function formatCompoundPercent(value) {
  return `${(value || 0).toFixed(1)}%`;
}

function buildCompoundLabel(monthIndex) {
  const years = monthIndex / 12;
  if (currentLanguage === 'en') {
    return years === 1 ? '1 year' : `${years.toFixed(years % 1 === 0 ? 0 : 1)} years`;
  }
  return years === 1 ? '1 a\u00f1o' : `${years.toFixed(years % 1 === 0 ? 0 : 1)} a\u00f1os`;
}

function renderCompoundSummary(results) {
  const summaryEl = document.getElementById('compound-summary');
  if (!summaryEl) return;
  const viewModels = window.BDICompoundViewModels;
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

function renderCompoundBreakdown(results) {
  const breakdownEl = document.getElementById('compound-breakdown');
  const sectionEl = document.getElementById('compound-breakdown-section');
  if (!breakdownEl || !sectionEl) return;
  const viewModels = window.BDICompoundViewModels;
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

function renderCompoundChart(results) {
  const container = document.getElementById('compound-chart');
  const wrap = document.getElementById('compound-chart-wrap');
  const empty = document.getElementById('compound-chart-empty');
  if (!container || !wrap || !empty) return;
  const viewModels = window.BDICompoundViewModels;
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
              <text class="bdi-chart-tick" x="${margin.left - 12}" y="${yScale(tick) + 4}" text-anchor="end">${formatCompoundAxisCurrency(tick)}</text>
            </g>
          `).join('')}
          ${xTicks.map((tick) => `
            <g>
              <line class="bdi-chart-grid" x1="${xScale(tick)}" y1="${margin.top}" x2="${xScale(tick)}" y2="${height - margin.bottom}"></line>
              <text class="bdi-chart-tick" x="${xScale(tick)}" y="${height - margin.bottom + 24}" text-anchor="middle">${buildCompoundLabel(tick)}</text>
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

function renderCompoundSummary(results) {
  const renderers = window.BDICompoundRenderers;
  if (!renderers?.renderCompoundSummary) return;
  renderers.renderCompoundSummary(results, {
    document,
    currentLanguage,
    t,
    formatCompoundCurrency,
    viewModels: window.BDICompoundViewModels,
  });
}

function renderCompoundBreakdown(results) {
  const renderers = window.BDICompoundRenderers;
  if (!renderers?.renderCompoundBreakdown) return;
  renderers.renderCompoundBreakdown(results, {
    document,
    t,
    formatCompoundCurrency,
    viewModels: window.BDICompoundViewModels,
  });
}

function renderCompoundChart(results) {
  const renderers = window.BDICompoundRenderers;
  if (!renderers?.renderCompoundChart) return;
  renderers.renderCompoundChart(results, {
    document,
    currentLanguage,
    t,
    formatCompoundCurrency,
    viewModels: window.BDICompoundViewModels,
  });
}

function runCompoundCalculator() {
  const compoundCore = window.BDICompoundCore;
  const compoundUi = window.BDICompoundUI;
  const compoundRenderers = window.BDICompoundRenderers;
  const { initial, contribution, years, rate, variance, frequency } =
    compoundUi?.readCompoundCalculatorInputs?.(document) || {
      initial: parseFloat(document.getElementById('compound-initial')?.value || '0'),
      contribution: parseFloat(document.getElementById('compound-contribution')?.value || '0'),
      years: parseFloat(document.getElementById('compound-years')?.value || '0'),
      rate: parseFloat(document.getElementById('compound-rate')?.value || '0'),
      variance: Math.max(0, parseFloat(document.getElementById('compound-variance')?.value || '0')),
      frequency: parseInt(document.getElementById('compound-frequency')?.value || '12', 10),
    };
  const statusEl = document.getElementById('compound-status');

  if (!compoundCore || typeof compoundCore.buildCompoundResults !== 'function' || typeof compoundCore.isValidCompoundInputSet !== 'function') {
    if (statusEl) statusEl.textContent = currentLanguage === 'en'
      ? 'Compound calculator core is not available.'
      : 'El motor de interés compuesto no está disponible.';
    return;
  }

  if (!compoundRenderers
    || typeof compoundRenderers.renderCompoundSummary !== 'function'
    || typeof compoundRenderers.renderCompoundChart !== 'function'
    || typeof compoundRenderers.renderCompoundBreakdown !== 'function') {
    if (statusEl) statusEl.textContent = currentLanguage === 'en'
      ? 'Compound calculator render layer is not available.'
      : 'La capa de render de interÃ©s compuesto no estÃ¡ disponible.';
    return;
  }

  if (!compoundCore.isValidCompoundInputSet({ initial, contribution, years, rate, frequency })) {
    if (statusEl) statusEl.textContent = t('compound_status_invalid');
    return;
  }

  const results = compoundCore.buildCompoundResults({
    initial,
    contribution,
    years,
    rate,
    variance,
    frequency,
  });

  renderCompoundSummary(results);
  renderCompoundChart(results);
  renderCompoundBreakdown(results);

  if (statusEl) {
    statusEl.textContent = compoundUi?.buildCompoundStatusMessage?.({
      frequency,
      rate,
      variance,
      language: currentLanguage,
      t,
    }) || `${t('compound_frequency_label')}: ${t(`compound_frequency_${frequency}`)} · ${currentLanguage === 'en' ? 'Base rate' : 'Tasa base'} ${formatCompoundPercent(rate)} · ${currentLanguage === 'en' ? 'Variance' : 'Varianza'} ±${formatCompoundPercent(variance)}`;
  }
}

function syncCompoundFrequencyLabels() {
  const select = document.getElementById('compound-frequency');
  if (!select) return;
  Array.from(select.options).forEach((option) => {
    option.textContent = t(`compound_frequency_${option.value}`);
  });
  updateCompoundFrequencyTriggerLabel();
}

function updateCompoundStaticText() {
  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };

  const stepCards = Array.from(document.querySelectorAll('#compound-section .compound-step-card'));
  const mappings = [
    ['compound_step_1', 'compound_step_1_title', 'compound_step_1_copy'],
    ['compound_step_2', 'compound_step_2_title', 'compound_step_2_copy'],
    ['compound_step_3', 'compound_step_3_title', 'compound_step_3_copy'],
    ['compound_step_4', 'compound_step_4_title', 'compound_step_4_copy'],
  ];

  stepCards.forEach((card, index) => {
    const [kickerKey, titleKey, copyKey] = mappings[index] || [];
    const kicker = card.querySelector('.compound-step-kicker');
    const title = card.querySelector('h3');
    const copy = card.querySelector('.compound-step-copy');
    if (kicker && kickerKey) kicker.textContent = t(kickerKey);
    if (title && titleKey) title.textContent = t(titleKey);
    if (copy && copyKey) copy.textContent = t(copyKey);
  });

  setText('#compound-run-btn', currentLanguage === 'en' ? 'Run scenario' : 'Calcular escenario');

  const labels = {
    '#compound-initial': 'compound_initial_label',
    '#compound-contribution': 'compound_contribution_label',
    '#compound-years': 'compound_years_label',
    '#compound-rate': 'compound_rate_label',
    '#compound-variance': 'compound_variance_label',
    '#compound-frequency': 'compound_frequency_label',
  };

  Object.entries(labels).forEach(([selector, key]) => {
    const input = document.querySelector(selector);
    const labelSpan = input?.closest('label')?.querySelector('span');
    if (labelSpan) labelSpan.textContent = t(key);
  });
}

function setupCompoundCalculator() {
  document.getElementById('compound-run-btn')?.addEventListener('click', runCompoundCalculator);
  updateCompoundStaticText();
  syncCompoundFrequencyLabels();
  setupCompoundFrequencyControl();
  const statusEl = document.getElementById('compound-status');
  const emptyEl = document.getElementById('compound-chart-empty');
  const summaryEl = document.getElementById('compound-summary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <article class="optimizer-summary-card compound-summary-placeholder">
        <div class="label">${currentLanguage === 'en' ? 'Preview' : 'Vista previa'}</div>
        <div class="value">${currentLanguage === 'en' ? 'Not run yet' : 'Sin correr'}</div>
        <div class="meta">${currentLanguage === 'en' ? 'The final comparison will appear here.' : 'La comparación final se mostrará acá.'}</div>
      </article>
    `;
  }
  if (statusEl) statusEl.textContent = t('compound_status_ready');
  if (emptyEl) emptyEl.textContent = t('compound_chart_empty');
}

function setupOptimizer() {
  document.getElementById('optimizer-run-btn')?.addEventListener('click', runPortfolioOptimizer);
  setOptimizerResultsVisible(false);
  setOptimizerChartVisibility(false);
}

function forceOptimizerSectionState(id, visible) {
  const node = document.getElementById(id);
  if (!node) return;
  node.hidden = !visible;
  if (visible) {
    node.style.setProperty('display', 'block', 'important');
    node.style.setProperty('visibility', 'visible', 'important');
    node.style.setProperty('opacity', '1', 'important');
  } else {
    node.style.setProperty('display', 'none', 'important');
  }
}

function setOptimizerResultsVisible(visible) {
  [
    'optimizer-weights-section',
    'optimizer-analytics-section',
  ].forEach((id) => {
    forceOptimizerSectionState(id, visible);
  });
}

function setOptimizerChartVisibility(visible) {
  const frontierEmpty = document.getElementById('optimizer-frontier-empty');
  const frontierWrap = document.getElementById('optimizer-frontier-chart-wrap');
  const performanceEmpty = document.getElementById('optimizer-performance-empty');
  const performanceGrid = document.getElementById('optimizer-performance-grid');

  if (frontierEmpty) frontierEmpty.style.display = visible ? 'none' : '';
  if (frontierWrap) frontierWrap.style.display = visible ? 'block' : 'none';
  if (performanceEmpty) performanceEmpty.style.display = visible ? 'none' : '';
  if (performanceGrid) performanceGrid.style.display = visible ? 'grid' : 'none';
}

function prepareOptimizerCanvas(canvasId, height = 420) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  const parent = canvas.parentElement;
  if (parent) {
    parent.style.removeProperty('height');
    parent.style.removeProperty('min-height');
  }
  canvas.style.removeProperty('height');
  canvas.style.setProperty('width', '100%', 'important');
  return canvas;
}

async function runPortfolioOptimizer() {
  const tickersRaw = document.getElementById('optimizer-tickers')?.value || '';
  const years = Math.min(10, Math.max(1, parseInt(document.getElementById('optimizer-years')?.value || '5', 10) || 5));
  const rf = (parseFloat(String(document.getElementById('optimizer-rf')?.value || '2').replace(',', '.')) || 0) / 100;
  const targetInput = String(document.getElementById('optimizer-target')?.value || '').trim();
  const targetReturn = targetInput ? (parseFloat(targetInput.replace(',', '.')) || 0) / 100 : null;
  const minWeight = Math.max(0, (parseFloat(String(document.getElementById('optimizer-min-weight')?.value || '0').replace(',', '.')) || 0) / 100);
  const tickers = Array.from(new Set(
    tickersRaw
      .split(',')
      .map((ticker) => ticker.trim().toUpperCase())
      .filter(Boolean)
  )).slice(0, 50);

  const statusEl = document.getElementById('optimizer-status');
  const summaryEl = document.getElementById('optimizer-summary');
  const weightsEl = document.getElementById('optimizer-weights');
  const cagrEl = document.getElementById('optimizer-cagr');
  const corrEl = document.getElementById('optimizer-correlation');

  if (tickers.length === 0) {
    setOptimizerResultsVisible(false);
    setOptimizerChartVisibility(false);
    if (statusEl) statusEl.textContent = t('optimizer_empty_tickers');
    return;
  }

  if (tickers.length * minWeight > 1) {
    setOptimizerResultsVisible(false);
    setOptimizerChartVisibility(false);
    if (statusEl) statusEl.textContent = t('optimizer_invalid_min_weight');
    return;
  }

  setOptimizerResultsVisible(false);
  setOptimizerChartVisibility(false);
  if (statusEl) statusEl.textContent = t('optimizer_loading', { count: tickers.length });
  if (summaryEl) summaryEl.innerHTML = '';
  if (weightsEl) weightsEl.innerHTML = '';
  if (cagrEl) cagrEl.innerHTML = '';
  if (corrEl) corrEl.innerHTML = '';

  try {
    let model = null;
    let engine = 'python';

    try {
      model = await fetchPythonOptimizerModel({ tickers, years, rf, minWeight, targetReturn, randomCount: 100000 });
    } catch (pythonError) {
      console.warn('Python optimizer unavailable, falling back to JS engine:', pythonError.message);
      engine = 'js-fallback';
      const histories = await fetchOptimizerHistories(tickers, years);
      const prepared = prepareOptimizerDataset(histories);
      if (!prepared || prepared.assets.length === 0) {
        throw new Error(t('optimizer_no_histories'));
      }
      model = buildOptimizerModel(prepared, rf, minWeight, targetReturn);
    }

    setOptimizerResultsVisible(true);
    setOptimizerChartVisibility(true);
    renderOptimizerSummary(model);
    renderOptimizerWeights(model);
    renderOptimizerCagr(model);
    renderOptimizerCorrelation(model);
    await new Promise((resolve) => setTimeout(resolve, 80));
    renderOptimizerFrontier(model);
    renderOptimizerPerformance(model);

    if (statusEl) {
      statusEl.textContent = engine === 'python'
        ? `${t('optimizer_source', { assets: model.assets.length, days: model.dates.length, years })} · ${currentLanguage === 'en' ? 'Python engine' : 'Motor Python'}`
        : `${t('optimizer_source', { assets: model.assets.length, days: model.dates.length, years })} · ${currentLanguage === 'en' ? 'JS fallback' : 'Fallback JS'}`;
    }
  } catch (error) {
    setOptimizerResultsVisible(false);
    setOptimizerChartVisibility(false);
    if (statusEl) statusEl.textContent = t('optimizer_error', { message: error.message });
    console.error('Optimizer error:', error);
  }
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

function buildOptimizerModel(prepared, rf, minWeight, targetReturn) {
  const { assets, dates, prices, returnsByAsset, dailyReturnsMatrix } = prepared;
  const numAssets = assets.length;
  const meanReturns = returnsByAsset.map((series) => average(series) * 252);
  const covMatrix = covarianceMatrix(returnsByAsset, 252);
  const randomCount = numAssets === 1 ? 1 : 100000;
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

  const frontierSolutions = buildEfficientFrontier(meanReturns, covMatrix, rf, minWeight, w0);
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
    cagrRows, correlation: correlationMatrix(returnsByAsset),
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

function buildEfficientFrontier(meanReturns, covMatrix, rf, minWeight, w0) {
  const returnsRange = linspace(Math.min(...meanReturns), Math.max(...meanReturns), 100);
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

function renderOptimizerSummary(model) {
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
  const el = document.getElementById('optimizer-weights');
  if (!el) return;
  const headers = [t('optimizer_weights_asset'), ...model.optimizedPortfolios.map((portfolio) => portfolio.label)];
  const rows = model.assets.map((asset, index) => `<tr><td>${asset}</td>${model.optimizedPortfolios.map((portfolio) => `<td>${formatPct(portfolio.data.weights[index] * 100, 2)}</td>`).join('')}</tr>`).join('');
  el.innerHTML = `<div class="optimizer-table-wrap"><table class="optimizer-table"><thead><tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderOptimizerFrontier(model) {
  const section = document.getElementById('optimizer-frontier-section');
  const canvas = prepareOptimizerCanvas('optimizer-frontier-chart', 420);
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
  const section = document.getElementById('optimizer-performance-section');
  const assetCanvas = prepareOptimizerCanvas('optimizer-assets-chart', 420);
  const portfolioCanvas = prepareOptimizerCanvas('optimizer-portfolios-chart', 420);
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

function optimizerLineChartOptions(yTitle) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#555555' } } },
    scales: {
      x: { ticks: { color: '#555555', maxTicksLimit: 8 }, grid: { color: '#1a1a1a' } },
      y: { title: { display: true, text: yTitle, color: '#555555' }, ticks: { color: '#555555' }, grid: { color: '#1a1a1a' } },
    }
  };
}

function renderOptimizerLineSvg(container, seriesList, title, options = {}) {
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

function buildSmoothSvgPath(points) {
  if (!points.length) return '';
  if (points.length < 3) return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ');
  let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
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

function renderOptimizerCagr(model) {
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

function optimizerCorrelationColor(value) {
  const clamped = Math.max(0, Math.min(1, value));
  const start = { r: 173, g: 216, b: 230 };
  const end = { r: 255, g: 0, b: 0 };
  const red = Math.round(start.r + (end.r - start.r) * clamped);
  const green = Math.round(start.g + (end.g - start.g) * clamped);
  const blue = Math.round(start.b + (end.b - start.b) * clamped);
  return `rgb(${red}, ${green}, ${blue})`;
}
