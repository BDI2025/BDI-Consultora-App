(function () {
  window.BDIFixedIncomeData = {
    shared: {
      schemas: window.BDI_FIXED_INCOME_SHARED || {},
      dates: window.BDI_FIXED_INCOME_DATES || {},
      cashflows: window.BDI_FIXED_INCOME_CASHFLOWS || {},
      labels: window.BDI_FIXED_INCOME_LABELS || {},
    },
    lecaps: {
      instruments: window.BDI_FIXED_INCOME_LECAPS_INSTRUMENTS || {},
      catalog: window.BDI_FIXED_INCOME_LECAPS_CATALOG || {},
      adapters: window.BDI_FIXED_INCOME_LECAPS_ADAPTERS || {},
    },
    cer: {
      instruments: window.BDI_FIXED_INCOME_CER_INSTRUMENTS || {},
      catalog: window.BDI_FIXED_INCOME_CER_CATALOG || {},
      adapters: window.BDI_FIXED_INCOME_CER_ADAPTERS || {},
    },
    soberanos: {
      instruments: window.BDI_FIXED_INCOME_SOBERANOS_INSTRUMENTS || {},
      catalog: window.BDI_FIXED_INCOME_SOBERANOS_CATALOG || {},
      adapters: window.BDI_FIXED_INCOME_SOBERANOS_ADAPTERS || {},
    },
    corporativos: {
      instruments: window.BDI_FIXED_INCOME_CORPORATIVOS_INSTRUMENTS || {},
      issuers: window.BDI_FIXED_INCOME_CORPORATIVOS_ISSUERS || {},
      catalog: window.BDI_FIXED_INCOME_CORPORATIVOS_CATALOG || {},
      adapters: window.BDI_FIXED_INCOME_CORPORATIVOS_ADAPTERS || {},
    },
  };
})();
