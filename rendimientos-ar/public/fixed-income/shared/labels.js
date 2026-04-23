(function () {
  function buildCorporateLabel(item) {
    return item?.shortName || item?.company || item?.ticker || '';
  }

  window.BDI_FIXED_INCOME_LABELS = {
    buildCorporateLabel,
  };
})();
