(function () {
  const catalog = window.BDI_FIXED_INCOME_CORPORATIVOS_CATALOG || {};

  function getMonitorMap() {
    return catalog.bySymbol || {};
  }

  function getMonitorList() {
    return typeof catalog.getAll === 'function' ? catalog.getAll() : Object.values(catalog.bySymbol || {});
  }

  window.BDI_FIXED_INCOME_CORPORATIVOS_ADAPTERS = {
    getMonitorMap,
    getMonitorList,
  };
})();
