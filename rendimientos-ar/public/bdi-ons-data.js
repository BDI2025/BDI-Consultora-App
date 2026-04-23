(function () {
  const adapters = window.BDI_FIXED_INCOME_CORPORATIVOS_ADAPTERS || {};
  const catalog = window.BDI_FIXED_INCOME_CORPORATIVOS_CATALOG || {};

  const monitorMap = typeof adapters.getMonitorMap === 'function'
    ? adapters.getMonitorMap()
    : (catalog.bySymbol || {});

  window.BDI_ON_MONITOR = monitorMap;
})();
