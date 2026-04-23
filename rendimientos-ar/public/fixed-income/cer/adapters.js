(function () {
  const catalog = window.BDI_FIXED_INCOME_CER_CATALOG || {};

  function getConfigMap() {
    return catalog.bySymbol || {};
  }

  function getTickers() {
    return Object.keys(catalog.bySymbol || {});
  }

  window.BDI_FIXED_INCOME_CER_ADAPTERS = {
    getConfigMap,
    getTickers,
  };
})();
