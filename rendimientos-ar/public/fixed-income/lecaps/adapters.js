(function () {
  const catalog = window.BDI_FIXED_INCOME_LECAPS_CATALOG || {};

  function getConfig() {
    return {
      fuente: catalog.fuente || '',
      actualizado: catalog.actualizado || '',
      letras: catalog.getAll ? catalog.getAll() : [],
    };
  }

  function getByTicker(ticker) {
    return catalog.getByTicker ? catalog.getByTicker(ticker) : null;
  }

  function getTickers() {
    return Object.keys(catalog.bySymbol || {});
  }

  window.BDI_FIXED_INCOME_LECAPS_ADAPTERS = {
    getConfig,
    getByTicker,
    getTickers,
  };
})();
