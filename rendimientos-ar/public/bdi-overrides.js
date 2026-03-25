(function () {
  const HERO_COPY = {
    mundo: {
      title: 'Panorama de mercado',
      description: 'Lectura rapida del contexto global y referencias que impactan sobre decisiones locales.',
      pageTitle: 'Panorama de mercado | BDI Consultora',
    },
    ars: {
      title: 'Liquidez en pesos',
      description: 'Cuentas remuneradas y fondos de liquidez para ordenar caja y alternativas de corto plazo.',
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
  };

  const NAV_LABELS = {
    'header-mundo': 'Inicio',
    'header-ars': 'Liquidez',
    'header-soberanos': 'Soberanos',
    'header-ons': 'Corporativos',
    'header-portfolio': 'Mi cartera',
    'tab-billeteras-tab': 'Liquidez',
    'tab-plazofijo-tab': 'Plazo fijo',
    'tab-lecaps-tab': 'Renta fija ARS',
    'tab-cer-tab': 'Bonos CER',
  };

  function currentSection() {
    const hash = window.location.hash.replace('#', '');
    return hash || 'mundo';
  }

  function syncStaticLabels() {
    Object.entries(NAV_LABELS).forEach(([id, label]) => {
      const node = document.getElementById(id);
      if (!node) return;

      const flag = node.querySelector('.flag');
      if (flag) {
        const textNode = Array.from(node.childNodes).find(
          child => child.nodeType === Node.TEXT_NODE
        );

        if (textNode) {
          textNode.textContent = ` ${label}`;
        } else {
          node.appendChild(document.createTextNode(` ${label}`));
        }
        return;
      }

      node.textContent = label;
    });
  }

  function syncBDICopy() {
    const section = currentSection();
    const hero = document.getElementById('hero');
    const h1 = hero?.querySelector('h1');
    const p = hero?.querySelector('p');
    const copy = HERO_COPY[section] || HERO_COPY.mundo;

    if (section === 'portfolio') {
      if (hero) hero.style.display = 'none';
    } else if (hero) {
      hero.style.display = '';
      if (h1) h1.textContent = copy.title;
      if (p) p.textContent = copy.description;
    }

    if (copy.pageTitle) {
      document.title = copy.pageTitle;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    syncStaticLabels();
    syncBDICopy();
    window.setTimeout(syncStaticLabels, 50);
    window.setTimeout(syncBDICopy, 50);
    window.setTimeout(syncStaticLabels, 250);
    window.setTimeout(syncBDICopy, 250);
  });

  window.addEventListener('hashchange', () => {
    syncStaticLabels();
    syncBDICopy();
    window.setTimeout(syncStaticLabels, 50);
    window.setTimeout(syncBDICopy, 50);
  });
})();
