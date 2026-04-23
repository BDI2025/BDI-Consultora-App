(function () {
  const catalog = window.BDI_FIXED_INCOME_SOBERANOS_CATALOG || {};

  function getConfigMap() {
    return catalog.bySymbol || {};
  }

  function getTickers() {
    return Object.keys(catalog.bySymbol || {});
  }

  window.BDI_FIXED_INCOME_SOBERANOS_ADAPTERS = {
    getConfigMap,
    getTickers,
  };
})();
