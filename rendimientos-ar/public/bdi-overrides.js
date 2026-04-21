(function () {
  const LANGUAGE_STORAGE_KEY = 'bdi-language';

  const COPY = {
    es: {
      meta: {
        title: 'BDI Consultora | Mercado, liquidez y renta fija',
        description: 'BDI Consultora. Seguimiento de liquidez, renta fija, bonos CER, soberanos USD y corporativos para inversores argentinos.',
      },
      hero: {
        mundo: {
          title: 'Panorama de mercado',
          description: 'Lectura rapida del contexto global y referencias que impactan sobre decisiones locales.',
          pageTitle: 'Panorama de mercado | BDI Consultora',
        },
        ars: {
          title: 'Liquidez',
          description: 'Tasas bancarias y alternativas de corto plazo para ordenar liquidez en pesos.',
          pageTitle: 'Liquidez | BDI Consultora',
        },
        plazofijo: {
          title: 'Plazo fijo',
          description: 'Compara tasas de plazo fijo de bancos argentinos con foco en lectura comparativa y claridad.',
          pageTitle: 'Plazo fijo | BDI Consultora',
        },
        lecaps: {
          title: 'Renta fija ARS',
          description: 'Seguimiento de letras y bonos capitalizables del Tesoro en pesos segun precio de mercado.',
          pageTitle: 'Renta fija ARS | BDI Consultora',
        },
        cer: {
          title: 'Bonos CER',
          description: 'Instrumentos ajustados por inflacion para analizar cobertura, duration y rendimiento real.',
          pageTitle: 'Bonos CER | BDI Consultora',
        },
        bonos: {
          title: 'Renta fija USD',
          description: 'Bonos soberanos hard dollar para seguir rendimiento, duration y forma de la curva.',
          pageTitle: 'Renta fija USD | BDI Consultora',
        },
        ons: {
          title: 'Corporativos en USD',
          description: 'Seguimiento de obligaciones negociables con foco en rendimiento, duration y comparacion entre emisores.',
          pageTitle: 'Corporativos en USD | BDI Consultora',
        },
        portfolio: {
          title: '',
          description: '',
          pageTitle: 'Mi cartera | BDI Consultora',
        },
      },
      nav: {
        'header-mundo': { flag: 'Mercado', label: 'Inicio' },
        'header-ars': { flag: 'ARS', label: 'Liquidez' },
        'header-soberanos': { flag: 'USD', label: 'Soberanos' },
        'header-ons': { flag: 'USD', label: 'Corporativos' },
        'header-optimizer': { flag: 'BDI', label: 'Optimizador' },
        'header-heatmap': { flag: 'USA', label: 'Heatmap' },
        'header-compound': { flag: 'BDI', label: 'Interés compuesto' },
        'header-portfolio': { flag: 'BDI', label: 'Mi cartera' },
        'tab-plazofijo-tab': 'Plazo fijo',
        'tab-lecaps-tab': 'Renta fija ARS',
        'tab-cer-tab': 'Bonos CER',
      },
      selectors: {
        '.briefing-panel-primary h2': 'Resumen ejecutivo para una lectura rapida del mercado',
        '.briefing-panel-primary p': 'Una vista ordenada de referencias globales y accesos directos a liquidez, renta fija en pesos, CER, soberanos en USD y corporativos.',
        '.briefing-panel:nth-of-type(2) .briefing-kicker': 'Cobertura',
        '.briefing-panel:nth-of-type(3) .briefing-kicker': 'Seguimiento',
        '.briefing-panel:nth-of-type(2) .briefing-list li:nth-child(1)': 'Liquidez y tasa corta en pesos',
        '.briefing-panel:nth-of-type(2) .briefing-list li:nth-child(2)': 'Renta fija ARS y capitalizables',
        '.briefing-panel:nth-of-type(2) .briefing-list li:nth-child(3)': 'Bonos CER para cobertura inflacionaria',
        '.briefing-panel:nth-of-type(3) .briefing-list li:nth-child(1)': 'Soberanos hard dollar',
        '.briefing-panel:nth-of-type(3) .briefing-list li:nth-child(2)': 'Corporativos en USD',
        '.briefing-panel:nth-of-type(3) .briefing-list li:nth-child(3)': 'Referencias internacionales y noticias',
        '.shortcut-card[href="#ars"] .shortcut-label': 'Liquidez',
        '.shortcut-card[href="#ars"] strong': 'Plazo fijo',
        '.shortcut-card[href="#ars"] p': 'Tasas bancarias para una lectura rapida de liquidez.',
        '.shortcut-card[href="#lecaps"] .shortcut-label': 'Renta fija ARS',
        '.shortcut-card[href="#lecaps"] strong': 'LECAPs y BONCAPs',
        '.shortcut-card[href="#lecaps"] p': 'Tasa fija en pesos con lectura por precio, TIR y vencimiento.',
        '.shortcut-card[href="#cer"] .shortcut-label': 'Bonos CER',
        '.shortcut-card[href="#cer"] strong': 'Bonos CER',
        '.shortcut-card[href="#cer"] p': 'Seguimiento de instrumentos ajustados por inflacion.',
        '.shortcut-card[href="#bonos"] .shortcut-label': 'Hard dollar',
        '.shortcut-card[href="#bonos"] strong': 'Soberanos USD',
        '.shortcut-card[href="#bonos"] p': 'Curva, duration y rendimiento de deuda soberana en dolares.',
        '.shortcut-card[href="#ons"] .shortcut-label': 'Corporativos',
        '.shortcut-card[href="#ons"] strong': 'Obligaciones negociables',
        '.shortcut-card[href="#ons"] p': 'Comparacion entre emisores y rendimiento en USD.',
        '#section-hot .hot-title': 'Hot Movers',
        '#section-hot .hot-subtitle': 'Acciones globales con mayor movimiento diario',
        '#section-news .news-section-title': 'Noticias de mercado',
        '#section-news .news-section-desc': 'Cobertura de finanzas, dolar, bonos, acciones y mercado de capitales.',
        '#plazofijo-section h2': 'Plazo fijo',
        '#plazofijo-section .section-desc': 'TNA para plazo fijo de $100.000 a 30 dias. Fuente de referencia: BCRA',
        '#pf-chart-section h2': 'Comparacion de tasas',
        '#pf-chart-section .section-desc': 'TNA de plazos fijos ordenados por rendimiento',
        '#lecaps-section h2': 'Renta fija ARS',
        '#lecaps-section .section-desc': 'LECAPs y BONCAPs para seguir precio, vencimiento, duration aproximada y TIR en pesos.',
        '#lecaps-chart-section h2': 'Curva de pesos',
        '#lecaps-chart-section .section-desc': 'Duration aproximada y TIR de instrumentos capitalizables en pesos para una lectura rapida de la curva.',
        '#cer-section h2': 'Bonos CER',
        '#cer-section .section-desc': 'Instrumentos ajustados por inflacion para seguir TIR real, duration y referencias de cobertura.',
        '#cer-chart-section h2': 'Curva CER',
        '#cer-chart-section .section-desc': 'Lectura visual de duration y TIR real para la familia CER sobre ultima cotizacion disponible.',
        '#ons-section h2': 'Corporativos en USD',
        '#ons-section .section-desc': 'Obligaciones negociables para comparar emisores, duration y rendimiento en dolares.',
        '#ons-chart-section h2': 'Grafico corporativo',
        '#ons-chart-section .section-desc': 'Relacion entre duration y TIR para los emisores visibles en la tabla.',
        '#optimizer-section h2': 'Optimizador de carteras',
        '#optimizer-section .section-desc': 'Portacion del flujo Python original de Markowitz con Sharpe optimo, minima volatilidad, retorno objetivo opcional y restricciones por peso minimo.',
        '#optimizer-frontier-section h2': 'Espacio de portfolios',
        '#optimizer-frontier-section .section-desc': 'Mapa riesgo-retorno con portfolios aleatorios, frontera eficiente y CML coloreado por Sharpe Ratio.',
        '#optimizer-weights-section h2': 'Pesos optimos',
        '#optimizer-weights-section .section-desc': 'Comparacion de asignaciones para maximo Sharpe, minima volatilidad y retorno objetivo.',
        '#optimizer-performance-section h2': 'Rendimientos acumulados',
        '#optimizer-performance-section .section-desc': 'Rendimientos acumulados por activo y de los portafolios optimos construidos sobre la misma serie historica.',
        '#optimizer-analytics-section h2': 'Matriz y CAGR',
        '#optimizer-analytics-section .section-desc': 'Resumen CAGR anual y matriz de correlacion entre activos.',
        '#heatmap-section h2': 'Heatmap',
        '#heatmap-section .section-desc': 'Un heatmap ordena los activos por tamaño relativo y los colorea según su variación para ofrecer una lectura rápida del mercado.',
        '#compound-section h2': 'Calculadora de interés compuesto',
        '#compound-section .section-desc': 'Proyectá capital, aportes y crecimiento compuesto para comparar el valor invertido contra una trayectoria sin inversión.',
        '#compound-chart-section h2': 'Comparación de trayectorias',
        '#compound-chart-section .section-desc': 'Evolución del capital sin invertir versus escenarios con interés compuesto a lo largo del tiempo.',
        '#compound-breakdown-section h2': 'Desglose final',
        '#compound-breakdown-section .section-desc': 'Comparación de aporte total, capital final, interés ganado y sensibilidad por tasa.',
        '#compound-run-btn': 'Calcular escenario',
        '#soberanos-section h2': 'Soberanos USD',
        '#soberanos-section .section-desc': 'Bonos soberanos hard dollar con lectura por ley, duration y rendimiento estimado.',
        '#soberanos-chart-section h2': 'Curva soberana',
        '#soberanos-chart-section .section-desc': 'Comparacion visual entre ley local y ley NY para seguir forma de curva y rendimiento relativo.',
        '#portfolio-login-prompt h2': 'Mi cartera',
        '#portfolio-login-prompt p': 'Gestiona tus inversiones, segui tu valuacion y ordena tus cobros futuros desde un unico panel.',
        '.footer p:first-child': 'BDI Consultora, elaborado por Tomas Rodriguez y Juan Di Maria.',
        '.footer p:last-child': 'Fuentes consultadas: CAFCI, ArgentinaDatos, BCRA, data912, Yahoo Finance y Google News.',
      },
    },
    en: {
      meta: {
        title: 'BDI Consultora | Markets, liquidity and fixed income',
        description: 'BDI Consultora. Tracking liquidity, fixed income, CER bonds, USD sovereigns and corporates for Argentine investors.',
      },
      hero: {
        mundo: {
          title: 'Market overview',
          description: 'A clear read on the global backdrop and the references that matter for local decisions.',
          pageTitle: 'Market overview | BDI Consultora',
        },
        ars: {
          title: 'Liquidity',
          description: 'Bank rates and short-term peso alternatives to organize cash and compare liquidity options.',
          pageTitle: 'Liquidity | BDI Consultora',
        },
        plazofijo: {
          title: 'Time deposit',
          description: 'Compare Argentine bank deposit rates with a cleaner, more consultative view.',
          pageTitle: 'Time deposit | BDI Consultora',
        },
        lecaps: {
          title: 'ARS fixed income',
          description: 'Tracking treasury bills and capitalizing bonds in pesos based on market pricing.',
          pageTitle: 'ARS fixed income | BDI Consultora',
        },
        cer: {
          title: 'CER bonds',
          description: 'Inflation-linked instruments to analyze hedge value, duration and real yield.',
          pageTitle: 'CER bonds | BDI Consultora',
        },
        bonos: {
          title: 'USD fixed income',
          description: 'Hard-dollar sovereign bonds to follow yield, duration and curve shape.',
          pageTitle: 'USD fixed income | BDI Consultora',
        },
        ons: {
          title: 'USD corporates',
          description: 'Corporate bond monitoring focused on yield, duration and issuer comparison.',
          pageTitle: 'USD corporates | BDI Consultora',
        },
        portfolio: {
          title: '',
          description: '',
          pageTitle: 'My portfolio | BDI Consultora',
        },
      },
      nav: {
        'header-mundo': { flag: 'Market', label: 'Home' },
        'header-ars': { flag: 'ARS', label: 'Liquidity' },
        'header-soberanos': { flag: 'USD', label: 'Sovereigns' },
        'header-ons': { flag: 'USD', label: 'Corporates' },
        'header-optimizer': { flag: 'BDI', label: 'Optimizer' },
        'header-heatmap': { flag: 'USA', label: 'Heatmap' },
        'header-compound': { flag: 'BDI', label: 'Compound' },
        'header-portfolio': { flag: 'BDI', label: 'My portfolio' },
        'tab-plazofijo-tab': 'Time deposit',
        'tab-lecaps-tab': 'ARS fixed income',
        'tab-cer-tab': 'CER bonds',
      },
      selectors: {
        '.briefing-panel-primary h2': 'Executive snapshot for a faster market read',
        '.briefing-panel-primary p': 'An ordered view of global references and direct access to liquidity, peso fixed income, CER, USD sovereigns and corporates.',
        '.briefing-panel:nth-of-type(2) .briefing-kicker': 'Hedging',
        '.briefing-panel:nth-of-type(3) .briefing-kicker': 'Coverage',
        '.briefing-panel:nth-of-type(2) .briefing-list li:nth-child(1)': 'Liquidity and short-term peso rates',
        '.briefing-panel:nth-of-type(2) .briefing-list li:nth-child(2)': 'ARS fixed income and capitalizing bonds',
        '.briefing-panel:nth-of-type(2) .briefing-list li:nth-child(3)': 'CER bonds for inflation hedging',
        '.briefing-panel:nth-of-type(3) .briefing-list li:nth-child(1)': 'Hard-dollar sovereigns',
        '.briefing-panel:nth-of-type(3) .briefing-list li:nth-child(2)': 'USD corporates',
        '.briefing-panel:nth-of-type(3) .briefing-list li:nth-child(3)': 'Global references and news',
        '.shortcut-card[href="#ars"] .shortcut-label': 'Liquidity',
        '.shortcut-card[href="#ars"] strong': 'Time deposit',
        '.shortcut-card[href="#ars"] p': 'Bank rates for a quick liquidity read.',
        '.shortcut-card[href="#lecaps"] .shortcut-label': 'ARS fixed income',
        '.shortcut-card[href="#lecaps"] strong': 'LECAPs and BONCAPs',
        '.shortcut-card[href="#lecaps"] p': 'Peso fixed-rate instruments with price, yield and maturity focus.',
        '.shortcut-card[href="#cer"] .shortcut-label': 'CER bonds',
        '.shortcut-card[href="#cer"] strong': 'CER bonds',
        '.shortcut-card[href="#cer"] p': 'Monitoring of inflation-linked instruments.',
        '.shortcut-card[href="#bonos"] .shortcut-label': 'Hard dollar',
        '.shortcut-card[href="#bonos"] strong': 'USD sovereigns',
        '.shortcut-card[href="#bonos"] p': 'Curve, duration and yield for sovereign debt in dollars.',
        '.shortcut-card[href="#ons"] .shortcut-label': 'Corporates',
        '.shortcut-card[href="#ons"] strong': 'Corporate bonds',
        '.shortcut-card[href="#ons"] p': 'Issuer comparison and USD yield tracking.',
        '#section-hot .hot-title': 'Hot Movers',
        '#section-hot .hot-subtitle': 'Global equities with the largest daily move',
        '#section-news .news-section-title': 'Market news',
        '#section-news .news-section-desc': 'Coverage of finance, FX, bonds, equities and capital markets.',
        '#plazofijo-section h2': 'Time deposit',
        '#plazofijo-section .section-desc': 'APR for a ARS 100,000 deposit over 30 days. Reference source: BCRA.',
        '#pf-chart-section h2': 'Rate comparison',
        '#pf-chart-section .section-desc': 'Time deposit APR ranked by yield.',
        '#lecaps-section h2': 'ARS fixed income',
        '#lecaps-section .section-desc': 'LECAPs and BONCAPs to track price, maturity, approximate duration and peso yield.',
        '#lecaps-chart-section h2': 'Peso curve',
        '#lecaps-chart-section .section-desc': 'Approximate duration and YTM for capitalizing peso instruments to read the curve more quickly.',
        '#cer-section h2': 'CER bonds',
        '#cer-section .section-desc': 'Inflation-linked instruments to track real YTM, duration and hedging references.',
        '#cer-chart-section h2': 'CER curve',
        '#cer-chart-section .section-desc': 'Visual read of duration and real YTM across the CER family using the latest available quote.',
        '#ons-section h2': 'USD corporates',
        '#ons-section .section-desc': 'Corporate bonds to compare issuers, duration and USD yield.',
        '#ons-chart-section h2': 'Corporate chart',
        '#ons-chart-section .section-desc': 'Relationship between duration and yield for the issuers visible in the table.',
        '#optimizer-section h2': 'Portfolio optimizer',
        '#optimizer-section .section-desc': 'Port of the original Python Markowitz workflow with optimal Sharpe, minimum volatility, optional target return and minimum-weight constraints.',
        '#optimizer-frontier-section h2': 'Portfolio space',
        '#optimizer-frontier-section .section-desc': 'Risk-return map with random portfolios, efficient frontier and the CML colored by Sharpe Ratio.',
        '#optimizer-weights-section h2': 'Optimal weights',
        '#optimizer-weights-section .section-desc': 'Allocation comparison for max-Sharpe, minimum-volatility and target-return portfolios.',
        '#optimizer-performance-section h2': 'Cumulative performance',
        '#optimizer-performance-section .section-desc': 'Accumulated returns for each asset and for the optimal portfolios built on the same history.',
        '#optimizer-analytics-section h2': 'Matrix and CAGR',
        '#optimizer-analytics-section .section-desc': 'Annual CAGR summary and correlation matrix across assets.',
        '#heatmap-section h2': 'Heatmap',
        '#heatmap-section .section-desc': 'A heatmap arranges assets by relative size and colors them by performance to offer a quick market read.',
        '#compound-section h2': 'Compound interest calculator',
        '#compound-section .section-desc': 'Project capital, contributions and compounded growth to compare invested value against a no-investment path.',
        '#compound-chart-section h2': 'Trajectory comparison',
        '#compound-chart-section .section-desc': 'Capital growth without investing versus compound-interest scenarios over time.',
        '#compound-breakdown-section h2': 'Final breakdown',
        '#compound-breakdown-section .section-desc': 'Comparison of total contributions, ending value, earned interest and rate sensitivity.',
        '#compound-run-btn': 'Run scenario',
        '#soberanos-section h2': 'USD Sovereigns',
        '#soberanos-section .section-desc': 'Hard-dollar sovereign bonds with law, duration and estimated yield read-through.',
        '#soberanos-chart-section h2': 'Sovereign curve',
        '#soberanos-chart-section .section-desc': 'Visual comparison between local-law and NY-law bonds to track curve shape and relative yield.',
        '#portfolio-login-prompt h2': 'My portfolio',
        '#portfolio-login-prompt p': 'Manage your investments, track valuation and organize future cash flows from a single dashboard.',
        '.footer p:first-child': 'BDI Consultora, prepared by Tomas Rodriguez and Juan Di Maria.',
        '.footer p:last-child': 'Sources: CAFCI, ArgentinaDatos, BCRA, data912, Yahoo Finance and Google News.',
      },
    },
  };

  function currentLanguage() {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'es';
  }

  function currentSection() {
    const hash = window.location.hash.replace('#', '');
    return hash || 'mundo';
  }

  function syncStaticLabels() {
    const lang = currentLanguage();
    const labels = COPY[lang].nav;
    Object.entries(labels).forEach(([id, value]) => {
      const node = document.getElementById(id);
      if (!node) return;

      if (typeof value === 'object' && value.flag) {
        node.innerHTML = `<span class="flag">${value.flag}</span> ${value.label}`;
        return;
      }

      node.textContent = value;
    });
  }

  function syncSelectors() {
    const lang = currentLanguage();
    Object.entries(COPY[lang].selectors).forEach(([selector, text]) => {
      const node = document.querySelector(selector);
      if (node) node.textContent = text;
    });
  }

  function syncMeta() {
    const lang = currentLanguage();
    document.title = COPY[lang].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', COPY[lang].meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', COPY[lang].meta.title);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', COPY[lang].meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', COPY[lang].meta.description);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', COPY[lang].meta.description);
  }

  function syncHero() {
    const lang = currentLanguage();
    const section = currentSection();
    const hero = document.getElementById('hero');
    const h1 = hero?.querySelector('h1');
    const p = hero?.querySelector('p');
    const copy = COPY[lang].hero[section] || COPY[lang].hero.mundo;

    if (section === 'portfolio') {
      if (hero) hero.style.display = 'none';
    } else if (hero) {
      hero.style.display = '';
      if (h1) h1.textContent = copy.title;
      if (p) p.textContent = copy.description;
    }

    if (copy.pageTitle) document.title = copy.pageTitle;
  }

  function syncLanguage() {
    syncStaticLabels();
    syncSelectors();
    syncMeta();
    syncHero();
  }

  document.addEventListener('DOMContentLoaded', () => {
    syncLanguage();
    window.setTimeout(syncLanguage, 80);
    window.setTimeout(syncLanguage, 240);
  });

  window.addEventListener('hashchange', () => {
    syncLanguage();
    window.setTimeout(syncLanguage, 80);
  });
})();
