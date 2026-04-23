(function () {
  const shared = window.BDI_FIXED_INCOME_SHARED || {};
  const dates = window.BDI_FIXED_INCOME_DATES || {};
  const instruments = window.BDI_FIXED_INCOME_CORPORATIVOS_INSTRUMENTS || {};
  const issuers = window.BDI_FIXED_INCOME_CORPORATIVOS_ISSUERS || {};

  function buildCorporateRecord(ticker, instrument) {
    const normalizedInstrument = shared.normalizeCorporateInstrument
      ? shared.normalizeCorporateInstrument(ticker, instrument)
      : instrument;
    if (!normalizedInstrument) return null;

    const issuer = shared.normalizeIssuer
      ? shared.normalizeIssuer(issuers[normalizedInstrument.issuerId])
      : (issuers[normalizedInstrument.issuerId] || null);

    return {
      ...normalizedInstrument,
      company: issuer?.name || normalizedInstrument.issuerId || ticker,
      shortName: issuer?.shortName || issuer?.name || ticker,
      description: issuer?.description || '',
      maturityDate: dates.getMaturityDate
        ? dates.getMaturityDate(normalizedInstrument.cashflows)
        : '',
    };
  }

  const bySymbol = Object.fromEntries(
    Object.entries(instruments)
      .map(([ticker, instrument]) => [ticker, buildCorporateRecord(ticker, instrument)])
      .filter(([, instrument]) => instrument)
  );

  function getByTicker(ticker) {
    return bySymbol[ticker] || null;
  }

  function getAll() {
    return Object.values(bySymbol);
  }

  window.BDI_FIXED_INCOME_CORPORATIVOS_CATALOG = {
    bySymbol,
    getByTicker,
    getAll,
  };
})();
