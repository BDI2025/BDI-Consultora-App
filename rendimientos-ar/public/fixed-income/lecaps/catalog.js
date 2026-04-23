(function () {
  const raw = window.BDI_FIXED_INCOME_LECAPS_INSTRUMENTS || {};
  const instruments = raw.byTicker || {};

  function getByTicker(ticker) {
    return instruments[ticker] || null;
  }

  function getAll() {
    return Object.entries(instruments).map(([ticker, meta]) => ({
      ticker,
      ...meta,
    }));
  }

  window.BDI_FIXED_INCOME_LECAPS_CATALOG = {
    fuente: raw.fuente || '',
    actualizado: raw.actualizado || '',
    bySymbol: instruments,
    getByTicker,
    getAll,
  };
})();
