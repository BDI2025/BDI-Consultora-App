(function () {
  const instruments = window.BDI_FIXED_INCOME_CER_INSTRUMENTS || {};

  function getByTicker(ticker) {
    return instruments[ticker] || null;
  }

  function getAll() {
    return Object.entries(instruments).map(([ticker, meta]) => ({
      ticker,
      ...meta,
    }));
  }

  window.BDI_FIXED_INCOME_CER_CATALOG = {
    bySymbol: instruments,
    getByTicker,
    getAll,
  };
})();
