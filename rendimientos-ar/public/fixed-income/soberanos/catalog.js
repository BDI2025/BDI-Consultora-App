(function () {
  const instruments = window.BDI_FIXED_INCOME_SOBERANOS_INSTRUMENTS || {};

  function getByTicker(ticker) {
    return instruments[ticker] || null;
  }

  function getAll() {
    return Object.entries(instruments).map(([ticker, meta]) => ({
      ticker,
      ...meta,
    }));
  }

  window.BDI_FIXED_INCOME_SOBERANOS_CATALOG = {
    bySymbol: instruments,
    getByTicker,
    getAll,
  };
})();
