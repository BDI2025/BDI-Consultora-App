(function () {
  function getNextCashflow(cashflows, today = new Date()) {
    const todayIso = today.toISOString().slice(0, 10);
    return (cashflows || []).find((flow) => flow.date >= todayIso) || null;
  }

  window.BDI_FIXED_INCOME_CASHFLOWS = {
    getNextCashflow,
  };
})();
