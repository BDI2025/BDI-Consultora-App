(function () {
  function normalizeCashflows(cashflows) {
    if (!Array.isArray(cashflows)) return [];
    return cashflows
      .map((flow) => ({
        date: flow?.date || '',
        amount: Number(flow?.amount || 0),
      }))
      .filter((flow) => flow.date);
  }

  function normalizeCorporateInstrument(ticker, instrument) {
    if (!instrument) return null;
    return {
      ticker,
      issuerId: instrument.issuerId || '',
      arsTicker: instrument.arsTicker || '',
      usdTicker: instrument.usdTicker || '',
      lotSize: Number(instrument.lotSize || 0),
      law: instrument.law || '',
      rating: instrument.rating || '',
      couponAnnual: Number(instrument.couponAnnual || 0),
      parValue: Number(instrument.parValue || 100),
      active: instrument.active !== false,
      cashflows: normalizeCashflows(instrument.cashflows),
    };
  }

  function normalizeIssuer(issuer) {
    if (!issuer) return null;
    return {
      name: issuer.name || '',
      shortName: issuer.shortName || issuer.name || '',
      description: issuer.description || '',
    };
  }

  window.BDI_FIXED_INCOME_SHARED = {
    normalizeCashflows,
    normalizeCorporateInstrument,
    normalizeIssuer,
  };
})();
