(function () {
  function sortByDateAsc(flows) {
    return [...(flows || [])].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  }

  function getMaturityDate(flows) {
    const sorted = sortByDateAsc(flows);
    return sorted[sorted.length - 1]?.date || '';
  }

  window.BDI_FIXED_INCOME_DATES = {
    sortByDateAsc,
    getMaturityDate,
  };
})();
