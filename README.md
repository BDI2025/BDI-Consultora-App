# BDI Consultora App

## Objetivo General2
Transformar la aplicaciÃ³n base `rendimientos-ar` en un producto propio de BDI Consultora, preservando las funcionalidades valiosas y redefiniendo identidad visual, experiencia, arquitectura de presentaciÃ³n, organizaciÃ³n de la informaciÃ³n, textos y branding.

## Objetivos EspecÃ­ficos
- Auditar tÃ©cnicamente el proyecto base antes de modificarlo.
- Identificar dependencias, fuentes de datos, endpoints y riesgos de mantenimiento.
- Definir una propuesta de producto y sistema visual alineados con BDI Consultora.
- Implementar una migraciÃ³n progresiva, con bajo riesgo y documentaciÃ³n persistente.
- Mantener compatibilidad funcional mientras se refactoriza.

## Estado Actual Del Workspace
- Carpeta de trabajo activa: `C:\Users\juand\Documents\GitHub\BDI-Consultora-App`
- Estado de Git/worktree:
  - la carpeta raÃ­z `BDI-Consultora-App` ahora es el repositorio Git principal del proyecto;
  - estado actual: repo BDI inicializado y ya con commits locales de trabajo;
  - no hay remoto configurado todavÃ­a;
  - `rendimientos-ar` ya no contiene `.git` propio y quedÃ³ integrado como carpeta de cÃ³digo dentro del proyecto BDI.
- Contenido detectado al inicio:
  - `Estilo visual BDI/Manual de marca.pdf`
  - `Estilo visual BDI/Marca_02 Isotipo 6.png`
- Estado del cÃ³digo fuente de la app:
  - el repositorio base ya fue clonado localmente;
  - la auditorÃ­a ya puede hacerse sobre archivos reales del proyecto.

## Estructura Actual Del Proyecto
```text
BDI-Consultora-App/
â”œâ”€ Estilo visual BDI/
â”‚  â”œâ”€ Manual de marca.pdf
â”‚  â””â”€ Marca_02 Isotipo 6.png
â”œâ”€ rendimientos-ar/
â”‚  â”œâ”€ netlify/functions/
â”‚  â”œâ”€ public/
â”‚  â”œâ”€ supabase/
â”‚  â”œâ”€ test/
â”‚  â”œâ”€ server.js
â”‚  â”œâ”€ netlify.toml
â”‚  â””â”€ package.json
â”œâ”€ README.md
â”œâ”€ AGENTS.md
â””â”€ LOG.md
```

## Estructura Objetivo Tentativa
Pendiente de confirmar luego de la auditorÃ­a tÃ©cnica del repositorio base. La estructura final deberÃ¡ separar claramente:
- frontend pÃºblico,
- configuraciÃ³n,
- funciones serverless o adapters,
- documentaciÃ³n de despliegue,
- assets de marca BDI.

## Reglas De OrganizaciÃ³n
- Trabajar Ãºnicamente dentro de `C:\Users\juand\Documents\GitHub\BDI-Consultora-App`.
- No borrar, mover ni renombrar archivos sin instrucciÃ³n explÃ­cita del usuario.
- Inspeccionar siempre antes de modificar.
- Documentar cada cambio relevante en `README.md`, `AGENTS.md` y `LOG.md` cuando corresponda.
- Mantener diferenciados: hallazgo tÃ©cnico, propuesta de mejora, cambio obligatorio y mejora opcional.

## EstÃ¡ndar TÃ©cnico Activo
- Para el desarrollo de BDI, especialmente en `Optimizador de carteras` y en los mÃ³dulos de `Renta fija ARS`, `Bonos CER`, `Soberanos` y `Corporativos`, se adopta como referencia tÃ©cnica el bloque `Engineering / Compound` incluido en [AGENTS.md](/C:/Users/juand/Documents/GitHub/BDI-Consultora-App/AGENTS.md).
- Esto implica priorizar:
  - arquitectura explÃ­cita y mantenible;
  - separaciÃ³n clara entre cÃ¡lculo, transformaciÃ³n de datos y render;
  - reglas y mapeos explÃ­citos;
  - estructuras de datos consistentes;
  - validaciones tÃ©cnicas antes de cerrar cambios relevantes.
- La documentaciÃ³n operativa de BDI no cambia:
  - [LOG.md](/C:/Users/juand/Documents/GitHub/BDI-Consultora-App/LOG.md) sigue siendo el registro cronolÃ³gico obligatorio;
  - [README.md](/C:/Users/juand/Documents/GitHub/BDI-Consultora-App/README.md) refleja cambios de comportamiento, alcance y estructura;
  - [AGENTS.md](/C:/Users/juand/Documents/GitHub/BDI-Consultora-App/AGENTS.md) conserva las reglas y restricciones activas.

## Estado Actual Del Proyecto
- Etapa activa: `Etapa 4 - Plan tÃ©cnico de implementaciÃ³n`
- DocumentaciÃ³n operativa inicial: creada.
- AuditorÃ­a del repositorio fuente: en curso, ahora sobre el clon local `rendimientos-ar` y complementada con la app publicada `https://rendimientos.co/`.
- ImplementaciÃ³n local sobre el cÃ³digo fuente: iniciada en `Bloque 1 - identidad visual y branding base`.

## Propuesta Inicial De Producto BDI

### Objetivo De Producto
Convertir la app actual desde un comparador financiero amplio hacia una herramienta de lectura de mercado y seguimiento de instrumentos con enfoque consultivo, institucional y claro para usuarios argentinos.

### Cambio De Enfoque Recomendado
- De: comparador general con navegaciÃ³n por tipo tÃ©cnico de producto.
- A: terminal liviana / dashboard consultivo de BDI con navegaciÃ³n por objetivo, moneda y lectura de mercado.

### QuÃ© Conservar
- Monitor global.
- Cotizaciones y noticias.
- Billeteras / liquidez.
- FCIs de liquidez.
- Plazo fijo.
- LECAPs / BONCAPs.
- Bonos CER.
- Soberanos USD.
- ONs corporativas.
- Herramientas de anÃ¡lisis propias de BDI:
  - optimizador de carteras;
  - heatmap de mercado tipo Finviz para large caps de Estados Unidos;
  - calculadora de interÃ©s compuesto.

### QuÃ© Reordenar
- La navegaciÃ³n principal.
- El naming de secciones.
- La jerarquÃ­a entre home, secciones locales y renta fija.
- La lÃ³gica de presentaciÃ³n de tablas, badges y resÃºmenes.

### QuÃ© Dejar En RevisiÃ³n
- Portfolio:
  - aporta valor, pero agrega complejidad por depender de Supabase, login Google, permisos y persistencia;
  - conviene mantenerlo como mÃ³dulo secundario hasta estabilizar el core pÃºblico BDI.

### NavegaciÃ³n BDI Propuesta
- `Inicio`
  - resumen ejecutivo del mercado;
  - indicadores clave;
  - noticias y oportunidades destacadas.
- `Liquidez`
  - cuentas remuneradas;
  - billeteras;
  - FCIs money market;
  - plazo fijo.
- `Renta fija ARS`
  - LECAPs / BONCAPs;
  - instrumentos a tasa fija en pesos;
  - tabla con TNA, TIR, TEM, duration y duration modificada.
- `Bonos CER`
  - bonos ajustados por inflaciÃ³n;
  - lectura de duration, TIR real, TEM y sensibilidad.
- `Renta fija USD`
  - soberanos hard dollar;
  - curva y mÃ©tricas clave.
- `Corporativos`
  - ONs en USD;
  - comparador institucional con filtros por emisor, duration y rendimiento.
- `InterÃ©s compuesto`
  - simulador de capital inicial, aportes, tasa y frecuencia de capitalizaciÃ³n;
  - comparaciÃ³n entre trayectoria sin invertir y escenarios con inversiÃ³n compuesta.
- `Heatmap USA`
  - mapa sectorial tipo Finviz con acciones large cap de Estados Unidos;
  - tamaÃ±o relativo por market cap y color por variaciÃ³n diaria.
  - proveedor preparado para migrar de Yahoo fallback a Polygon mediante `POLYGON_API_KEY`.
- `Mi cartera` o `Portfolio`
  - sÃ³lo si se decide preservar el mÃ³dulo autenticado en la primera versiÃ³n BDI.

### Criterio De Renombre
- `Mundo` â†’ `Inicio` o `Mercado`
- `ARS` â†’ desagregar en `Liquidez`, `Renta fija ARS` y `Bonos CER`
- `Bonos` â†’ `Renta fija USD`
- `ONs` â†’ `Corporativos`
- `Portfolio` â†’ `Mi cartera` o `Mi portfolio BDI`

### PriorizaciÃ³n Recomendada
1. Inicio / Resumen ejecutivo
2. Liquidez
3. Renta fija ARS
4. Bonos CER
5. Renta fija USD
6. Corporativos
7. Portfolio

### Tono Y Copy Recomendados
- Profesional, claro y directo.
- Menos comparador informal, mÃ¡s lectura de mercado.
- Evitar tono fintech o trading especulativo.
- Usar lenguaje como:
  - `Rendimiento estimado`
  - `Tasa nominal anual`
  - `DuraciÃ³n`
  - `Perfil conservador / moderado`
  - `Fuente y actualizaciÃ³n`
  - `Lectura rÃ¡pida`

### Home BDI Propuesta
- Encabezado con resumen del dÃ­a:
  - tasas clave;
  - dÃ³lar oficial / MEP / CCL;
  - riesgo paÃ­s;
  - equity y commodities globales.
- Bloque de â€œLectura BDIâ€:
  - breve interpretaciÃ³n del contexto.
- Bloques de acceso rÃ¡pido:
  - Liquidez;
  - Pesos a tasa fija;
  - CER;
  - USD;
  - Corporativos.
- Noticias en formato mÃ¡s sobrio y menos â€œticker invasivoâ€.

### Principios De UX Recomendados
- Menos tabs horizontales tÃ©cnicas.
- MÃ¡s jerarquÃ­a editorial.
- Tablas con filtros claros y badges Ãºtiles.
- Priorizar mobile como lectura guiada, no como rÃ©plica comprimida del desktop.
- Mostrar fuente y fecha de actualizaciÃ³n en cada mÃ³dulo crÃ­tico.

## Insumos De Marca Disponibles
- Carpeta de marca:
  - `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\Estilo visual BDI`
- Archivos detectados:
  - `Manual de marca.pdf`
  - `Marca_02 Isotipo 6.png`

## Nota Sobre La Etapa Visual
- El isotipo pudo inspeccionarse visualmente de forma local.
- El manual PDF estÃ¡ disponible y debe considerarse fuente de verdad de la marca.
- LimitaciÃ³n actual del entorno:
  - no fue posible extraer texto legible del PDF con las herramientas disponibles en esta sesiÃ³n;
  - por eso, la propuesta visual se apoya en seÃ±ales verificables del isotipo y en una traducciÃ³n prudente a sistema de interfaz, sin afirmar reglas exactas del manual que no pudieron leerse automÃ¡ticamente.

## Confirmaciones Visuales Aportadas Por El Usuario
- AplicaciÃ³n preferente de marca:
  - usar la marca en color institucional negro con isotipo color siempre que se pueda;
  - en fondos complejos o fotogrÃ¡ficos, usar variantes monocromÃ¡ticas segÃºn necesidad.
- Paleta confirmada desde capturas del manual:
  - Negro: `#232323`
  - Verde oscuro: `#157347`
  - Verde: `#46B179`
  - Turquesa: `#4CBDC2`
  - Gris: `#EEEEEF`
  - Blanco: `#FFFFFF`

## ObservaciÃ³n Operativa Sobre Git/GitHub Desktop
- La carpeta raÃ­z `C:\Users\juand\Documents\GitHub\BDI-Consultora-App` ahora sÃ­ es el repositorio Git principal.
- `rendimientos-ar` dejÃ³ de ser un repo independiente y pasÃ³ a ser parte del proyecto BDI.
- Para ver el proyecto correctamente en GitHub Desktop debe abrirse la carpeta raÃ­z `BDI-Consultora-App`, no la subcarpeta `rendimientos-ar`.

## DecisiÃ³n De Estructura Tomada
- Objetivo elegido por el usuario:
  - pasar a un repo propio de BDI con independencia real;
  - conservar la estructura de trabajo y el contenido base que hoy estÃ¡ dentro de `rendimientos-ar`.
- Implicancia tÃ©cnica:
  - el clon original no alcanzaba para ser â€œpropioâ€ solo por existir en la mÃ¡quina local;
  - esa dependencia quedÃ³ cortada al eliminar `.git` dentro de `rendimientos-ar` y crear `.git` en la raÃ­z del proyecto.
- Estrategia objetivo:
  - `C:\Users\juand\Documents\GitHub\BDI-Consultora-App` ya es el repo principal del producto BDI;
  - el cÃ³digo fuente quedÃ³ incorporado como parte del proyecto propio;
  - cÃ³digo, documentaciÃ³n y branding ya comparten una sola raÃ­z versionada.

## PrÃ³ximo Paso Operativo En Git
1. Abrir `C:\Users\juand\Documents\GitHub\BDI-Consultora-App` en GitHub Desktop.
2. Verificar que aparezcan como cambios:
  - `AGENTS.md`

## Estado De Datos Del Heatmap
- Fuente actual por default:
  - `Yahoo Finance` para precio y variaciÃ³n diaria;
  - escala curada de market cap para el tamaÃ±o relativo.
- MigraciÃ³n preparada:
  - si existe la variable de entorno `POLYGON_API_KEY`, el backend del heatmap prioriza `Polygon`;
  - en ese modo, el endpoint intenta usar snapshots y referencia corporativa de Polygon para mejorar realismo en precio, variaciÃ³n diaria y market cap;
  - si Polygon no estÃ¡ configurado o falla, el sistema vuelve automÃ¡ticamente al fallback de Yahoo para no romper la visualizaciÃ³n.
   - `LOG.md`
   - `README.md`
   - `Estilo visual BDI/`
   - `rendimientos-ar/`
3. Crear luego un repositorio nuevo de BDI en GitHub y agregarlo como remoto cuando el usuario lo decida.

## Estado Git Actual
- La carpeta raÃ­z ya fue agregada a GitHub Desktop como repositorio local confiable.
- Es normal que el primer estado muestre una gran cantidad de archivos para commit:
  - incluye documentaciÃ³n raÃ­z;
  - incluye assets de marca;
  - incluye todo el cÃ³digo fuente dentro de `rendimientos-ar/`.
- Esto corresponde al primer versionado del proyecto BDI como repositorio independiente.

## Avance De ImplementaciÃ³n

### Bloque 1 En Curso
- Branding base aplicado en:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/public/manifest.json`
  - `rendimientos-ar/netlify/functions/auth-config.js`
  - `rendimientos-ar/public/bdi-overrides.js`
- Cambios introducidos:
  - tÃ­tulos y metadatos BDI;
  - header y navegaciÃ³n con naming inicial BDI;
  - tipografÃ­a base migrada a `IBM Plex Sans` / `IBM Plex Mono`;
  - paleta base alineada con colores confirmados de marca;
  - visual principal movida desde terminal oscura a interfaz clara institucional;
  - CORS preparado para `bdiconsultora.com`.
  - script de overrides para alinear tÃ­tulos y copy visibles sin reescribir por completo la lÃ³gica central de `app.js`.
  - home reforzada con briefing editorial y shortcuts a bloques principales.

### LimitaciÃ³n De VerificaciÃ³n Actual
- En esta sesiÃ³n no hay `node` ni `npm`, por lo que no fue posible levantar la app localmente desde el entorno del agente.
- El testing visual/manual de este bloque deberÃ¡ hacerse en la mÃ¡quina del usuario cuando lo indique el flujo.

## Plan TÃ©cnico De ImplementaciÃ³n

### Objetivo Del Plan
Aplicar la transformaciÃ³n a producto BDI en bloques de bajo riesgo, preservando compatibilidad funcional mientras se desacopla branding, navegaciÃ³n y lÃ³gica.

### Orden Recomendado De Trabajo
1. `Bloque 0 - Base y seguridad operativa`
   - corregir documentaciÃ³n del proyecto propio;
   - revisar `.gitignore` y variables de entorno;
   - confirmar estructura final de trabajo.
2. `Bloque 1 - Identidad visual y branding base`
   - reemplazar nombre, metadatos, favicon, colores y tipografÃ­a;
   - actualizar header, footer y textos de marca;
   - corregir problemas de encoding visibles.
3. `Bloque 2 - ReorganizaciÃ³n de navegaciÃ³n`
   - transformar la jerarquÃ­a actual de tabs hacia la navegaciÃ³n BDI;
   - sin alterar todavÃ­a cÃ¡lculos financieros ni endpoints.
4. `Bloque 3 - RediseÃ±o de home e informaciÃ³n clave`
   - convertir `Mundo` en `Inicio`/`Resumen ejecutivo`;
   - reformular ticker, cotizaciones y noticias a formato mÃ¡s consultivo.
5. `Bloque 4 - Reordenamiento por secciones`
   - Liquidez;
   - Renta fija ARS;
   - Bonos CER;
   - Renta fija USD;
   - Corporativos.
6. `Bloque 5 - Refactor tÃ©cnico interno`
   - modularizar `app.js`;
   - separar fetch, transformaciÃ³n y render;
   - aislar config y utilidades.
7. `Bloque 6 - Portfolio`
   - decidir continuidad;
   - si se conserva, rebrandear y auditar auth/Supabase con cuidado.
8. `Bloque 7 - Deploy y endurecimiento`
   - actualizar README tÃ©cnico;
   - documentar variables de entorno;
   - preparar remoto y despliegue propio.

### Archivos A Modificar Primero
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\public\index.html`
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\public\styles.css`
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\public\app.js`
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\public\manifest.json`
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\public\config.json`
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\server.js`
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\netlify.toml`
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\netlify\functions\auth-config.js`
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\README.md`

### Archivos Nuevos Recomendados
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\docs\migration-plan.md`
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\docs\deploy.md`
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\docs\data-sources.md`
- `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\public\icons\...` actualizados a marca BDI
- archivos modulares futuros para reemplazar partes de `app.js`, por ejemplo:
  - `public/js/navigation.js`
  - `public/js/market-home.js`
  - `public/js/liquidity.js`
  - `public/js/fixed-income.js`

### Archivos A No Tocar En La Primera Ola
- `supabase/rls_policies.sql` salvo necesidad puntual.
- lÃ³gica de cÃ¡lculos financieros profundos mientras se reordena branding y UX.
- funciones serverless de datos, excepto branding/cors/documentaciÃ³n mÃ­nima.

### Riesgos De Compatibilidad
- cambiar nombres de secciones sin mapear bien los IDs y hashes puede romper navegaciÃ³n.
- mover demasiado rÃ¡pido lÃ³gica desde `app.js` puede romper render, eventos y cÃ¡lculos.
- tocar `config.json` sin disciplina puede romper portfolio, bonos y cashflows.
- tocar Netlify o auth demasiado temprano puede romper entorno productivo y login.
- cambiar branding sin revisar manifest, metadata social y favicon deja inconsistencias de producto.

### Estrategia De Testing Manual
- revisar desktop y mobile en cada bloque.
- validar navegaciÃ³n hash/tab por tab.
- validar que cada secciÃ³n cargue datos o falle de forma controlada.
- verificar:
  - Mundo/Inicio
  - Liquidez
  - Plazo fijo
  - LECAPs
  - CER
  - Soberanos
  - ONs
  - Portfolio si sigue activo
- verificar que login no muestre errores si faltan credenciales.
- revisar encoding de textos y consistencia visual.

### Estrategia De Despliegue
- no desplegar primero sobre el dominio productivo BDI;
- usar entorno de preview o branch deploy;
- revisar variables:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - CORS y dominios permitidos;
- definir luego remoto GitHub propio y target de hosting propio.

## AuditorÃ­a Remota Inicial Del Repositorio Base

### Stack Detectado
- Frontend web estÃ¡tico en `HTML + CSS + JavaScript` sin framework SPA moderno visible.
- Backend liviano para desarrollo local con `Node.js + Express`.
- Serverless functions en `Netlify Functions`.
- ConfiguraciÃ³n de despliegue en `netlify.toml`.
- PWA con `manifest.json` y `service worker`.
- IntegraciÃ³n real con `Supabase` para autenticaciÃ³n Google, portfolio y tracking de page views.

### Estructura Remota Detectada
- `.agents/`
- `.claude/`
- `logo_cache/`
- `netlify/functions/`
- `public/`
- `supabase/`
- `test/`
- `.env.example`
- `netlify.toml`
- `package.json`
- `package-lock.json`
- `server.js`
- `README.md`

### Estructura Funcional Principal
- `public/index.html`: landing/app principal.
- `public/app.js`: lÃ³gica central del frontend y renderizado de secciones.
- `public/config.json`: configuraciÃ³n estÃ¡tica y hardcodeada de instrumentos/flujos.
- `public/styles.css`: estilos y dark mode.
- `server.js`: servidor Express para desarrollo local.
- `netlify/functions/*.js`: adapters/proxies para fuentes externas.

### Variables De Entorno Detectadas
- `.env.example` expone solo:
  - `PORT=3000`
  - `NODE_ENV=development`
- ObservaciÃ³n:
  - el servidor local expone `/api/auth-config`, que espera:
    - `SUPABASE_URL`
    - `SUPABASE_ANON_KEY`
  - estas variables no estÃ¡n documentadas en `.env.example`, por lo que la configuraciÃ³n actual estÃ¡ incompleta.

### Endpoints PÃºblicos Documentados
- `GET /api/mundo`
- `GET /api/mundo?symbol=X&range=Y`
- `GET /api/news`
- `GET /api/config`
- `GET /api/fci`
- `GET /api/lecaps`
- `GET /api/soberanos`
- `GET /api/ons`
- `GET /api/cer`
- `GET /api/cer-precios`
- `GET /api/cer-ultimo`
- `GET /api/visits`
- `GET /api/auth-config`
- Redirect adicional:
  - `/api/cafci/ficha/:fondoId/:claseId` proxya directo a `api.cafci.org.ar`

### Fuentes De Datos Detectadas
- Yahoo Finance: monitor global.
- Google News RSS: noticias.
- ArgentinaDatos: FCIs y plazo fijo.
- CAFCI: fichas de fondos.
- data912: LECAPs, BONCAPs, soberanos USD, ONs y precios CER.
- BCRA: Ã­ndice CER y Ãºltimo CER.
- Config estÃ¡tica en `config.json`: billeteras y flujos hardcodeados.

### Dependencias CrÃ­ticas
- `express` y `node-fetch` como dependencias declaradas en `package.json`.
- Netlify como capa de routing serverless en producciÃ³n.
- Terceros de mercado y scraping/proxy para precios.
- ConfiguraciÃ³n manual en `config.json` para instrumentos y cashflows.
- Supabase para auth, persistencia del portfolio y page views.

### Riesgos Iniciales
- Fuerte dependencia de terceros sin contrato estable: Yahoo Finance, Google News RSS, data912, BCRA, ArgentinaDatos, CAFCI.
- La lÃ³gica de negocio estÃ¡ muy concentrada en `public/app.js` (aprox. 182 KB), lo que sugiere acoplamiento alto entre fetch, transformaciÃ³n, cÃ¡lculos financieros y UI.
- `config.json` concentra datos manuales sensibles al mantenimiento.
- Entorno local incompleto respecto de producciÃ³n: el proyecto usa redirects y funciones Netlify que no quedan totalmente replicadas con `server.js`.
- La configuraciÃ³n de Supabase no aparece claramente documentada en `.env.example`.
- `server.js` intenta leer `data_base/CER_serie.csv`, pero esa carpeta no existe en el clon local; esto puede romper la parte CER en entorno local.
- Se observan problemas de encoding de texto (`Ãƒ`, `Ã¢`) en varios archivos, lo que indica inconsistencias de codificaciÃ³n a corregir en la migraciÃ³n.

### ObservaciÃ³n Legal/Licencia
- En `package.json` figura `"license": "ISC"`, pero no se detectÃ³ archivo `LICENSE` visible en la raÃ­z del repositorio base durante la inspecciÃ³n remota.
- Hasta validar la licencia efectiva y el alcance de reutilizaciÃ³n comercial, **no conviene asumir libre explotaciÃ³n comercial del repo tal como estÃ¡**.
- RecomendaciÃ³n: antes de desplegar una versiÃ³n comercial BDI derivada, confirmar licencia del repo y, si hace falta, solicitar autorizaciÃ³n explÃ­cita o reconstruir componentes sensibles con implementaciÃ³n propia.

## Hallazgos Iniciales Importantes
- La carpeta local seleccionada todavÃ­a no contiene el cÃ³digo fuente de la aplicaciÃ³n objetivo.
- Existe material de marca BDI disponible para informar el futuro rebranding.
- Antes de cualquier refactor o rebranding, serÃ¡ necesario decidir si:
  - se clona el repositorio base dentro de esta carpeta y se trabaja allÃ­, o
  - se recrea una base propia tomando el repo sÃ³lo como referencia tÃ©cnica.

## Supuestos Importantes
- El usuario quiere preservar la compatibilidad funcional del producto actual mientras se lo transforma.
- La nueva app serÃ¡ una evoluciÃ³n del proyecto original, no una copia superficial.
- La marca BDI requiere una estÃ©tica institucional, sobria y clara.
- La documentaciÃ³n del proyecto debe poder reconstruir el contexto aunque se pierda la conversaciÃ³n.

## Restricciones Relevantes
- No borrar archivos.
- No mover archivos.
- No renombrar archivos.
- No salir de la carpeta seleccionada salvo instrucciÃ³n explÃ­cita del usuario.
- No modificar carpetas externas o vecinas.
- No hacer cambios destructivos ni reestructuraciones no autorizadas.
- No dejar documentaciÃ³n desactualizada respecto del estado real del proyecto.

## PrÃ³ximos Pasos Sugeridos
1. Completar la auditorÃ­a local del clon `rendimientos-ar`.
2. Explicar arquitectura y conceptos base en lenguaje no tÃ©cnico para acompaÃ±ar la decisiÃ³n de producto.
3. Evaluar legalidad/licencia de reutilizaciÃ³n comercial.
4. Proponer estrategia de migraciÃ³n BDI sobre el repo local sin romper endpoints.
5. Definir estructura objetivo y fases de implementaciÃ³n antes de editar la app.
## Actualizacion De Estado 2026-03-25

### Repo Y Worktree
- La raiz `C:\Users\juand\Documents\GitHub\BDI-Consultora-App` ya es el repo Git principal del proyecto BDI.
- `rendimientos-ar` ya no es un repo separado: quedo integrado como carpeta de codigo dentro del proyecto propio.
- La documentacion operativa que se debe mantener es:
  - `README.md`
  - `AGENTS.md`
  - `LOG.md`

### Avance Real De Implementacion
- Etapa actual: `Etapa 5 - Implementacion incremental`
- Bloque activo: `Bloque 1 - Branding base BDI`
- Implementado hasta ahora:
  - metadata y manifest rebrandeados a BDI;
  - header y hero con identidad BDI;
  - home con bloque editorial de lectura ejecutiva;
  - shortcuts hacia Liquidez, Renta fija ARS, Bonos CER, Soberanos y Corporativos;
  - paleta clara institucional basada en marca BDI;
  - tipografias `IBM Plex Sans` y `IBM Plex Mono`;
  - `auth-config.js` actualizado para contemplar dominios BDI;
  - `rendimientos-ar/public/bdi-overrides.js` agregado para sostener copy y rotulos BDI sin reescribir todavia todo `app.js`.
  - `rendimientos-ar/public/bdi-ons-data.js` agregado como capa de datos propia para el monitor institucional de ONs BDI.
  - monitor global agrupado por categorias (`Indices`, `Tasas`, `Energia`, `Metales`, `Agro`, `Crypto`, `FX`);
  - cards de `Mundo` con sparkline intradiaria, variacion diaria y unidad visible;
  - nueva seccion `Noticias de mercado` para finanzas y mercado de capitales;
  - `Hot Movers` compactado para lectura mas editorial;
  - `Tablero ejecutivo` removido por redundancia con la tira superior de cotizaciones.
  - mejora de copy y jerarquia en secciones de Liquidez, Renta fija ARS, CER, Soberanos y Corporativos;
  - `Plazo fijo` ahora usa un `section-source` dedicado para no escribir la fuente en el bloque equivocado.
  - nueva direccion visual inspirada en la landing de BDI:
    - header oscuro institucional;
    - hero con panel negro/verde;
    - superficies mas premium y menos genericas;
    - acentos verde/turquesa con mayor coherencia de marca.
  - ajuste de paleta hacia la variante propuesta por BDI:
    - fondo general `#EFEDEA`;
    - verde principal `#137247`;
    - turquesa de apoyo `#17BEBB`;
    - separacion visual mas clara entre dashboard, `Hot Movers` y `Noticias de mercado`.
  - iconos de app y favicon reemplazados por el isotipo BDI en `public/icons/icon-192.png` y `public/icons/icon-512.png`.
  - iconos regenerados con recorte mas cerrado para que el isotipo se perciba mas grande en la pestaÃ±a del navegador.
  - footer institucional actualizado a `BDI Consultora, elaborado por TomÃ¡s RodrÃ­guez` con fuentes resumidas.
  - seccion `Corporativos` rearmada sobre una seleccion BDI de ONs para mostrar:
    - precio en USD;
    - precio en ARS cuando existe punta local;
    - TC implicito;
    - paridad;
    - TIR USD;
    - TIR ARS;
    - duration;
    - proximo pago;
    - ficha tecnica y descripcion del emisor en modal.
  - seccion `Liquidez` ampliada para mostrar `Duration mod.` en los FCIs cuando la ficha de CAFCI expone ese dato.
  - toggle de idioma `ES / EN` agregado en el header para recargar la interfaz en ingles cuando el usuario lo necesite.

### Riesgo Tecnico Vigente
- `rendimientos-ar/public/app.js` sigue siendo el archivo mas fragil por tamano, acoplamiento y problemas de encoding.
- Se prioriza una estrategia de cambios visuales controlados y overrides antes de una refactorizacion profunda.

### Bloque Tecnico En Curso
- Se inicio una pasada de estabilizacion funcional sobre el servidor local.
- Cambio aplicado en curso:
  - `rendimientos-ar/server.js` fue rearmado para que el entorno local exponga de forma consistente las rutas que la app ya espera.
- Objetivos de esta pasada:
  - corregir el fallback de CER cuando falta `data_base/CER_serie.csv`;
  - exponer `/api/ons` en local para ONs / Corporativos;
  - ampliar `/api/cer-precios` para incluir tickers CER de bonos y letras;
  - robustecer rutas locales de desarrollo;
  - evitar que la ausencia de `Chart` rompa secciones enteras;
  - corregir la duplicacion visual de labels en navegacion.

### Testing Manual
- Aun no se realizo una prueba visual completa en navegador desde esta sesion porque el entorno del agente no tiene `node` ni `npm`.
- La app no conviene abrirla con doble click sobre `index.html`, porque depende de endpoints y rutas que esperan un servidor local.
- Proximo uso previsto del testing manual:
  1. levantar la app localmente en la maquina del usuario;
  2. validar branding BDI visible;
  3. revisar navegacion, home, tablas, cards y cambios de seccion.

### Resultado De La Primera Prueba Local
- La app ya abre correctamente en `http://localhost:3000`.
- `node` esta disponible en la maquina del usuario.
- En PowerShell, `npm` directo falla por politica de scripts, pero `npm.cmd` funciona correctamente.
- El branding base y la home ya pueden validarse en navegador real.
- Problemas funcionales confirmados en testing:
  - CER falla localmente porque falta `data_base/CER_serie.csv`;
  - tambien hay errores al probar Renta fija ARS y Corporativos/ONs, que deben auditarse en una siguiente pasada tecnica;
  - esto confirma que el primer hito actual sirve como base visual, pero no cierra aun la estabilizacion funcional completa.

### Resultado De La Segunda Prueba Local
- `Liquidez`, `Soberanos`, `Corporativos` y `Renta fija ARS` ya cargan sin los errores bloqueantes detectados en la primera prueba.
- La navegacion visible ya no duplica labels en el header.
- Queda pendiente una mejora funcional de visualizacion:
  - recuperar o rediseÃ±ar las curvas de TIR vs Duration en `Renta fija ARS`, `Soberanos` y `Corporativos`.
- Decision vigente:
  - el estado actual ya es apto para un commit de estabilizacion;
  - la vuelta de curvas/graficos se toma como siguiente bloque de trabajo, no como bloqueo para este corte.

### Proxima Validacion Manual
- Reiniciar el servidor local luego de los cambios de `server.js`.
- Probar de nuevo:
  1. Bonos CER
  2. Renta fija ARS
  3. Corporativos / ONs
- Confirmar si:
  - desaparece el error de CER por archivo faltante;
  - ONs deja de fallar por ausencia de endpoint local;
  - LECAPs carga tabla y curva de forma normal.

### Siguiente Bloque Funcional Sugerido
- Reincorporar curvas de `Duration` vs `TIR` de forma estable y consistente con la identidad BDI.
- Revisar si conviene mantener el esquema anterior de scatter plot o rediseÃ±ar los graficos con una presentacion mas consultiva e institucional.

### Avance Del Bloque De Curvas
- Se agrego `rendimientos-ar/public/bdi-charts.js` como capa propia de visualizacion para curvas de instrumentos.
- Alcance actual:
  - `Renta fija ARS`
  - `Soberanos`
  - `Bonos CER`
  - `Corporativos`
- Criterio de implementacion:
  - no depender de `Chart.js` para la visualizacion principal de curvas;
  - usar una lectura mas controlada y consistente con el producto BDI;
  - dejar la base lista para un refinamiento visual posterior.
- Refinamiento aplicado luego del primer feedback visual:
  - mas altura util en los graficos;
  - linea de tendencia suavizada;
  - rotulado selectivo para evitar saturacion, especialmente en Corporativos;
  - leyendas visuales para distinguir tipos de instrumentos cuando corresponde.
- Ajuste conceptual aplicado despues del segundo feedback:
  - la curva paso a construirse como una guia robusta, no como una linea arrastrada por outliers;
  - para `Soberanos` se separan curvas por ley local y ley NY;
  - las etiquetas muestran ticker y TIR actual sobre cada punto.
- Ajuste estructural aplicado despues del tercer feedback:
  - la trayectoria de cada curva ahora se construye con formas disciplinadas y concavidad controlada;
  - se evita la ondulacion libre entre puntos;
  - las curvas se apoyan en anclas robustas por mediana y reglas de forma por familia de instrumentos.
- Ajuste adicional aplicado despues del cuarto feedback:
  - se reemplazo el trazo anterior por una interpolacion monotona por tramos;
  - el grafico gana mas altura util;
  - para familias que lo requieren se usa una trayectoria de subida y posterior declive suave, evitando formas en U incorrectas.
- Ajuste adicional aplicado despues del quinto feedback:
  - el area util del grafico se amplio todavia mas y el contenedor blanco se redujo;
  - las curvas ahora se construyen con puntos filtrados de outliers cuando hace falta, sin dejar de mostrar los instrumentos reales;
  - en `Corporativos` el grafico pasa a una seleccion curada de 2-3 ONs por anio segun TIR para mejorar legibilidad.
- Ajuste adicional aplicado despues del sexto feedback:
  - se aumento aun mas la escala del grafico y se comprimio el encuadre blanco;
  - la curva pasa a separarse mejor del conjunto de puntos visibles, usando puntos guia mas limpios;
  - `LECAPs`, `Soberanos`, `CER` y `Corporativos` quedan listos para una nueva validacion visual inmediata.
- Ajuste adicional aplicado despues del septimo feedback:
  - se reemplazo la logica anterior de curvas por una guia mas simple y controlada, sin ondulaciones ni valles artificiales;
  - `LECAPs` ahora usa una curva creciente y concava como guia principal;
  - `BONCAPs`, `Soberanos ley local`, `Soberanos ley NY` y `Corporativos` pasan a una curva tipo loma suave, tomando como referencia visual la prolijidad de la curva de ley NY;
  - `Corporativos` reduce aun mas la cantidad de ONs visibles por anio para evitar un grafico plano o saturado;
  - el SVG gana mas espacio util y se agrandan etiquetas, ejes, puntos y leyendas.
- Ajuste adicional aplicado despues del octavo feedback:
  - se redujo todavia mas la distancia visual entre leyenda, grafico y descripcion;
  - `LECAPs` y `CER` vuelven a una guia creciente y concava, pero con menos puntos guia para evitar serruchos u ondulaciones;
  - `Soberanos` vuelve a una curva tipo loma mas contenida, buscando recuperar la prolijidad que el usuario valido antes en la familia ley NY;
  - `Corporativos` deja de usar seleccion automatica por anio y pasa a una lista puntual de ONs preferidas indicada por el usuario.
- Ajuste adicional aplicado despues del noveno feedback:
  - la guia de cada curva pasa a construirse sobre instrumentos representativos elegidos por familia, en vez de apoyarse solo en percentiles u outliers;
  - se suma un `yDomain` especifico por grafico para mejorar lectura y evitar aplanamientos innecesarios;
  - `LECAPs`, `CER`, `Soberanos` y `Corporativos` ahora buscan pasar cerca de los tickers relevantes y no necesariamente por todos los puntos.

### Proximos Pasos Actualizados
1. Cerrar este primer hito de branding base y tomarlo como commit logico inicial.
2. Explicar al usuario, en lenguaje simple, como abrir la app localmente para testing manual.
3. Validar visualmente el Bloque 1 en navegador real.
4. Avanzar luego con reorganizacion de secciones y navegacion manteniendo compatibilidad actual.

## Como Abrir La App Localmente

### Que significa "levantar la app"
- No es abrir un archivo suelto.
- Es encender un pequeÃ±o servidor local para que la app funcione como sitio web en tu computadora.
- Este proyecto usa `node` para eso.

### Paso 1 - Ver si ya tenes Node instalado
En Windows, abri:
- `PowerShell`, o
- `Terminal`, o
- `SÃ­mbolo del sistema`

Y ejecuta:

```powershell
node -v
npm -v
```

Si ambos muestran un numero, ya lo tenes instalado.
Si alguno dice que no existe, hay que instalar Node.js antes de seguir.

### Nota sobre PowerShell y `npm`
- Puede pasar que `node -v` funcione pero `npm -v` falle con un error de `PSSecurityException`.
- Eso no significa que `npm` no este instalado.
- Significa que PowerShell esta bloqueando la ejecucion del wrapper `npm.ps1`.
- En ese caso, se puede usar directamente:

```powershell
npm.cmd -v
```

- Y para correr el proyecto:

```powershell
npm.cmd install
npm.cmd start
```

### Paso 2 - Ir a la carpeta correcta
La carpeta desde la que hay que correr la app es:

`C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar`

### Paso 3 - Instalar dependencias
Solo la primera vez:

```powershell
cd "C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar"
npm install
```

Esto descarga lo necesario para que el proyecto pueda correr.

### Paso 4 - Iniciar la app

```powershell
npm start
```

Segun `package.json`, eso ejecuta:

```powershell
node server.js
```

### Paso 5 - Abrirla en el navegador
Cuando el servidor arranque, abri:

[http://localhost:3000](http://localhost:3000)

### Importante
- No conviene abrir `public/index.html` con doble click.
- Si lo haces asi, varias partes pueden fallar porque la app espera rutas tipo `/api/...` y un servidor local.

### Limitaciones conocidas al probar local
- La parte de `Mi cartera` puede aparecer incompleta si no estan cargadas variables de Supabase.
- La seccion CER puede tener problemas locales porque `server.js` espera un archivo `data_base/CER_serie.csv` que hoy no esta en el repo.
- Eso no invalida probar branding, home, navegacion y muchas tablas principales.

## Como Publicarla Y Compartir Un Link

### Opcion Recomendada
- Publicarla con `Netlify`.
- Motivo:
  - este proyecto ya trae `netlify.toml`;
  - ya usa `netlify/functions`;
  - es la forma mas simple de pasar de entorno local a una URL publica.

### Antes De Publicar
- Confirmar que el estado visual y funcional de la app ya este suficientemente estable.
- Tener el proyecto subido a un repo propio de GitHub.
- Decidir si `Mi cartera` va a quedar activa en la primera publicacion o si puede salir desactivada temporalmente.

### Paso A Paso Simple
1. Crear un repositorio nuevo en GitHub con el proyecto BDI.
2. Subir el contenido actual de `C:\Users\juand\Documents\GitHub\BDI-Consultora-App`.
3. Crear una cuenta o iniciar sesion en [Netlify](https://www.netlify.com/).
4. Elegir `Add new site` o `Import from Git`.
5. Conectar Netlify con el repo de GitHub donde quedo este proyecto.
6. En la configuracion del sitio, indicar como base de deploy la carpeta:
   - `rendimientos-ar`
7. Verificar que Netlify tome estos valores:
   - `Publish directory`: `public`
   - `Functions directory`: `netlify/functions`
8. Ejecutar el primer deploy.
9. Copiar la URL publica generada por Netlify.

### Variables De Entorno A Revisar
- Si se quiere conservar `Mi cartera`, Netlify va a necesitar:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
- Si esas variables no estan cargadas:
  - la parte publica puede seguir funcionando;
  - `Mi cartera` puede quedar incompleta o sin login.

### Dominio Y Auth
- `rendimientos-ar/netlify/functions/auth-config.js` ya fue ajustado para tolerar:
  - dominios propios de BDI;
  - dominios `.netlify.app`;
  - `localhost`.
- Si se usa Supabase con login Google, tambien hay que registrar en Supabase:
  - la URL publica de Netlify;
  - y luego, si se quiere, el dominio propio final.

### Resultado Esperado
- Al terminar el deploy, Netlify genera una URL publica del estilo:
  - `https://nombre-del-sitio.netlify.app`
- Esa URL ya se puede compartir con otras personas para ver la app.

### Camino Recomendado De Publicacion
1. Publicar primero en una URL de Netlify.
2. Revisar la app online.
3. Corregir detalles finales.
4. ReciÃ©n despues conectar dominio propio si hace falta.

## Actualizacion De Home BDI
- El monitor global deja de estar renderizado como una sola grilla plana.
- La home ahora incorpora categorias de lectura:
  - `Indices`
  - `Tasas`
  - `Energia`
  - `Metales`
  - `Agro`
  - `Crypto`
  - `FX`
- La fuente de datos sigue siendo la misma capa `/api/mundo`, pero con un universo ampliado de simbolos y una presentacion mas ordenada.
- Objetivo de este bloque:
  - acercar la portada a un dashboard consultivo tipo research/market monitor;
  - mejorar jerarquia y escaneabilidad sin copiar literalmente el sitio de referencia.

## Auditoria De Fuentes De Datos

| Seccion | Endpoint / flujo | Fuente real | Tipo de dato | Mantenimiento | Riesgo |
|---|---|---|---|---|---|
| Panorama global: indices, tasas, energia, metales, agro, crypto, FX | `/api/mundo` | Yahoo Finance (`query1.finance.yahoo.com`) | precios, cierre previo, cambio %, sparkline | automatico | medio |
| Cotizaciones superiores: oficial, MEP, CCL, riesgo pais | `/api/cotizaciones` | Yahoo Finance + data912 + ArgentinaDatos | dolar oficial, bonos para MEP/CCL, riesgo pais | automatico | medio-alto |
| Billeteras / cuentas remuneradas | `/api/config` -> `config.json` | carga manual en proyecto | tasas, limites, descripcion, condiciones | manual | alto |
| FCIs | `/api/fci` | ArgentinaDatos | VCP, patrimonio, TNA calculada entre ultimo y penultimo dato | automatico | medio |
| Plazo fijo | fetch directo desde frontend | ArgentinaDatos | tasas por banco, clientes / no clientes | automatico | medio |
| LECAPs / BONCAPs | `/api/lecaps` + `/api/config` | data912 + `config.json` | precio live, flujos, vencimientos, tipo | mixto | alto |
| Bonos CER | `/api/cer`, `/api/cer-ultimo`, `/api/cer-precios`, `/api/config` | BCRA + data912 + `config.json` | CER, ultimo CER, precios, flujos, vencimientos | mixto | alto |
| Soberanos USD | `/api/soberanos` + `/api/config` | data912 + `config.json` | precio live, ley, flujos, vencimientos | mixto | alto |
| ONs / Corporativos | `/api/ons` + `/api/config` | data912 + `config.json` | precio live, ticker puente, flujos, vencimientos | mixto | alto |
| Noticias | `/api/news` | Google News RSS | titulares y links | automatico | medio |

### Lectura Rapida De Riesgo
- `Yahoo Finance`: buena para monitor global y sparklines, pero no es fuente institucional formal.
- `ArgentinaDatos`: razonablemente confiable para datos publicos, pero hay que vigilar cambios de esquema o disponibilidad.
- `data912`: hoy es critica para renta fija; si falla, impacta fuerte en LECAPs, CER, soberanos y ONs.
- `config.json`: es clave porque contiene parte del â€œcerebroâ€ del producto; si queda desactualizado, aunque la API viva responda, los calculos pueden quedar mal.
## Estado Actual Del Heatmap USA
- El modulo `Heatmap USA` ya puede trabajar con un esquema hibrido para mejorar realismo sin romper la app actual.
- Si existe `POLYGON_API_KEY`:
  - `Polygon` se usa para market cap y metadata corporativa de referencia.
  - `Yahoo Finance` se mantiene para precio y variacion diaria cuando la cuenta de Polygon no tiene entitlement para snapshots de mercado.
- Si `POLYGON_API_KEY` no existe o falla:
  - el backend vuelve automaticamente a un fallback de `Yahoo Finance` enriquecido con `batch quote`.
- El fallback de Yahoo ahora aprovecha mejor:
  - `market cap`,
  - `precio`,
  - `variacion diaria`,
  - `nombre corto / largo`,
  en lugar de depender tanto de una escala curada fija.
- El universo del heatmap tambien fue ampliado para cubrir una porcion bastante mayor del universo large-cap de Estados Unidos, con mas profundidad en tecnologia, consumo, salud, finanzas, industriales, energia, real estate y utilities.
- El heatmap ahora tambien puede colorearse por periodo personalizado:
  - fecha inicial + fecha final;
  - o fecha inicial hasta el momento actual si la fecha final queda vacia.
- Esto mejora hoy mismo el tamano relativo y la precision de los labels, aun antes de contratar un plan con snapshots completos.
- El modulo `Heatmap` ahora tambien puede cargar un primer boceto de acciones argentinas:
  - `USA` mantiene el mapa actual con Yahoo/Polygon;
  - `Argentina ARS` usa `data912` (`/live/arg_stocks`) y ya puede calcular variacion por rango historico;
  - `Argentina USD` usa los tickers dolarizados del mismo feed de `data912`, pero por ahora se mantiene solo con variacion diaria para no sugerir un historico que hoy no esta bien soportado;
  - en ambos mapas argentinos, el tamano relativo se apoya en el mismo proxy live de `monto operado`, para conservar la lectura visual ya estabilizada y no depender de market cap real;
  - los sectores e industrias son una primera curacion BDI y deberan afinarse con revision manual posterior.
## Optimizador De Carteras
- Se agrego una nueva solapa principal de `Optimizador` dentro de la app.
- El modulo reutiliza `/api/mundo` para descargar historicos diarios de Yahoo Finance por ticker y periodo (`1y` a `10y`).
- Inputs disponibles:
  - tickers separados por coma;
  - anios de historia;
  - tasa libre de riesgo;
  - retorno objetivo opcional;
  - peso minimo por activo.
- Salidas actuales:
  - espacio riesgo-retorno con `100000` portfolios aleatorios coloreados por Sharpe Ratio;
  - frontera eficiente construida sobre `100` puntos de retorno objetivo;
  - cartera de Sharpe optimo;
  - cartera de minima volatilidad;
  - cartera de retorno objetivo solo si la optimizacion encuentra solucion valida;
  - linea CML;
  - tabla de pesos;
  - series acumuladas por activo y por portfolio optimo;
  - tabla de CAGR y grafico comparativo de CAGR;
  - matriz de correlacion.
- Layout actual:
  - en desktop ancho, `Espacio de portfolios` y `Pesos optimos` comparten una grilla `70/30`;
  - en mobile y pantallas angostas, el modulo vuelve a una sola columna.
- Implementacion:
  - el frontend del optimizador ahora intenta primero un endpoint local `POST /api/optimizer` que ejecuta `rendimientos-ar/python/optimizer_runner.py`;
  - ese runner usa `yfinance`, `numpy`, `pandas` y `scipy.optimize.minimize(method='SLSQP')` para acercarse al script Python original del usuario;
  - las dependencias de Python quedaron documentadas en `rendimientos-ar/python/requirements.txt`;
  - instalacion local esperada: `python -m pip install -r rendimientos-ar/python/requirements.txt`;
  - si Python no esta disponible o falla, el modulo conserva un fallback en `JavaScript` para no romper la pagina;
  - el flujo buscado sigue al script Python original: descarga de Yahoo, retornos diarios, media/covarianza anualizadas, optimizacion de Sharpe, minima volatilidad, retorno objetivo, frontera eficiente, CAGR y matriz de correlacion.

## Ajustes recientes
- La calculadora de `Interes compuesto` comenzo su separacion tecnica del resto de `app.js`:
  - la logica financiera pura vive ahora en `rendimientos-ar/public/compound-core.js`;
  - la lectura del formulario y el armado del mensaje de estado viven ahora en `rendimientos-ar/public/compound-ui.js`;
  - la preparacion de datos para resumen, breakdown y grafico vive ahora en `rendimientos-ar/public/compound-view-models.js`;
  - el render visual de tarjetas, tabla y grafico vive ahora en `rendimientos-ar/public/compound-renderers.js`;
  - `app.js` conserva por ahora solo la orquestacion de la seccion;
  - la separacion actual ya desacopla calculo, UI, view-models y render sin cambiar el comportamiento visible;
  - queda pendiente una limpieza controlada del codigo legacy que quedo eclipsado dentro de `app.js`, aunque ya no es necesaria para que la arquitectura siga separada y estable.
- `Renta fija ARS` y `Bonos CER` suman columna `TEM` en sus tablas de monitoreo.
- `Renta fija ARS` excluye automaticamente letras o bonos capitalizables que ya vencieron o que vencen en la fecha de liquidacion T+1, evitando TIRs artificiales al cierre del instrumento.
- Los graficos de monitoreo de activos a cotizacion actual (`Renta fija ARS`, `Bonos CER`, `Soberanos` y `Corporativos`) ahora muestran una `regresion polinomica` de grado 2 en `JavaScript` como guia visual; en `Renta fija ARS`, la logica `Nelson-Siegel` sigue preservada en codigo para futuras comparaciones.
- Los graficos SVG de monitoreo de activos ahora muestran solo puntos y etiquetas, sin lineas de union.
- `Soberanos` usa un eje Y dinamico para evitar que queden puntos fuera del grafico.
- `Renta fija ARS`, `Bonos CER` y `Corporativos` ahora tambien ajustan dinamicamente el eje Y para que la escala acompanÌƒe mejor a los datos visibles.
- Las etiquetas de los graficos de renta fija se distribuyen con reglas automaticas de colision, sin offsets manuales por ticker.
- Los ejes X de los graficos de renta fija ya no se fuerzan a arrancar en `0`; ahora se ajustan automaticamente segun el rango efectivo de cada familia.
- El `Heatmap` usa un date picker propio para las fechas de USA, evitando el calendario nativo del navegador.
- El `Heatmap` usa tambien un selector propio para el universo (`USA / Argentina ARS / Argentina USD`), con la misma linea visual que el date picker.
- El date picker del `Heatmap` ahora permite abrir una vista de meses desde el titulo del calendario y cambiar rapidamente el anio con las flechas laterales.
- El `Heatmap USA` ahora abre por defecto con la ultima rueda valida frente a la rueda previa, en lugar de usar literalmente `ayer -> hoy`.
- El `Heatmap` ahora resuelve la rueda diaria por defecto con logica de ultima sesion valida:
  - si el dia actual es habil, compara contra la rueda previa;
  - si cae en fin de semana, toma la ultima rueda disponible y la compara contra la anterior;
  - esto evita rangos triviales o engaÃ±osos al abrir `USA` y `Argentina ARS`.
- Para el `Heatmap` por rango:
  - `USA` ahora puede usar precio live cuando la fecha final es `hoy` pero el historico diario todavia no incorporo esa rueda;
  - `Argentina ARS` tambien puede caer a la variacion live del feed cuando el historico de `data912` colapsa el rango actual a un mismo dia y devolveria `0%` artificial.
- El resumen de estado del `Heatmap` se muestra debajo del grafico, con un formato mas editorial y menos tecnico para salida publica.
- El modulo `Heatmap` ahora usa un titulo y una descripcion genericos del concepto, para que funcionen igual al cambiar entre `USA`, `Argentina ARS` y `Argentina USD`.
- La banda de controles del `Heatmap` ahora queda centrada dentro de su box y concentra ahi mismo el hint operativo de fechas.
- A nivel tecnico, el backend local y la function serverless del `Heatmap` ya comparten una misma fuente de metadata en `rendimientos-ar/shared/heatmap-config.js`, como primera fase de una refactorizacion segura y reversible para reducir duplicacion sin cambiar el resultado visible.
- El frontend del `Heatmap` tambien lee ahora una config explicita en `rendimientos-ar/public/heatmap-config.js` para definir por mercado si hay rango historico, si el universo es daily-only y cual es el provider base esperado, evitando condicionales dispersos en `app.js`.
- El backend del `Heatmap` tambien comparte ahora helpers puros en `rendimientos-ar/shared/heatmap-helpers.js` para parseo de fechas, normalizacion de historicos argentinos y calculo de variacion por rango, dejando `server.js` y la function de Netlify mas cerca de un rol de orquestacion.
- El modulo suma ahora una primera capa de adaptadores por provider en:
  - `rendimientos-ar/shared/heatmap-provider-data912.js`
  - `rendimientos-ar/shared/heatmap-provider-yahoo.js`
  para separar fetch de normalizacion/construccion de tiles y reducir duplicacion entre backend local y Netlify.
- La seleccion del flujo del endpoint `Heatmap` tambien quedo centralizada en `rendimientos-ar/shared/heatmap-orchestration.js`, para decidir de forma explicita:
  - si un mercado usa rama argentina o USA;
  - si corresponde rango historico;
  - si vale intentar referencia con `Polygon`;
  - que provider debe declararse en la respuesta.
- El `Heatmap` ahora tambien formaliza un contrato unico de tile:
  - backend: `rendimientos-ar/shared/heatmap-tile-contract.js`
  - frontend: `rendimientos-ar/public/heatmap-tile-contract.js`
  - este contrato normaliza campos como `ticker`, `name`, `sector`, `industry`, `price`, `change`, `marketCap`, `sizeValue`, `sizeLabel` y `sizeCurrency` antes del render, para que futuras mejoras de fuentes no dependan de objetos armados de forma implicita.
- El endpoint del `Heatmap` suma ahora una capa de observabilidad liviana en `rendimientos-ar/shared/heatmap-observability.js`:
  - normaliza y valida el dataset final antes de responder;
  - registra en logs si algun provider devuelve tiles que quedan fuera del contrato;
  - esto permite detectar degradaciones de Yahoo, `data912` o `Polygon` sin cambiar la experiencia visible.
- La orquestacion del endpoint tambien quedo mas declarativa con `getHeatmapExecutionPlan()` en `rendimientos-ar/shared/heatmap-orchestration.js`, para resolver en un solo paso:
  - rama `USA` vs `Argentina`;
  - modo `daily` vs `range`;
  - provider esperado;
  - intento de referencia con `Polygon`.
- La metadata manual de `Renta fija` comenzo a ordenarse en una capa propia bajo `rendimientos-ar/public/fixed-income/`:
  - se creo la estructura base por familia: `lecaps/`, `cer/`, `soberanos/` y `corporativos/`;
  - se agregaron helpers compartidos en `rendimientos-ar/public/fixed-income/shared/`;
  - `corporativos` fue la primera familia migrada;
  - los instrumentos de ONs ahora viven en `rendimientos-ar/public/fixed-income/corporativos/instruments.js`;
  - la informacion de emisores vive en `rendimientos-ar/public/fixed-income/corporativos/issuers.js`;
  - el catalogo normalizado y el adaptador de compatibilidad viven en:
    - `rendimientos-ar/public/fixed-income/corporativos/catalog.js`
    - `rendimientos-ar/public/fixed-income/corporativos/adapters.js`
  - `rendimientos-ar/public/bdi-ons-data.js` se mantiene como shim de compatibilidad para no romper el monitor actual mientras se migra el resto de renta fija.
- `Soberanos` fue la segunda familia migrada a esta capa:
  - la metadata manual ahora vive en `rendimientos-ar/public/fixed-income/soberanos/instruments.js`;
  - el catalogo y el adaptador viven en:
    - `rendimientos-ar/public/fixed-income/soberanos/catalog.js`
    - `rendimientos-ar/public/fixed-income/soberanos/adapters.js`
  - `app.js` ya consume primero esta capa y usa `config.json` solo como fallback transitorio.
- `CER` fue la tercera familia migrada a esta capa:
  - la metadata manual ahora vive en `rendimientos-ar/public/fixed-income/cer/instruments.js`;
  - el catalogo y el adaptador viven en:
    - `rendimientos-ar/public/fixed-income/cer/catalog.js`
    - `rendimientos-ar/public/fixed-income/cer/adapters.js`
  - `app.js` ya consume primero esta capa y usa `config.json` solo como fallback transitorio.
- `LECAPs/BONCAPs` fue la cuarta familia migrada a esta capa:
  - la metadata manual ahora vive en `rendimientos-ar/public/fixed-income/lecaps/instruments.js`;
  - el catalogo y el adaptador viven en:
    - `rendimientos-ar/public/fixed-income/lecaps/catalog.js`
    - `rendimientos-ar/public/fixed-income/lecaps/adapters.js`
  - `app.js` ya consume primero esta capa y usa `config.json` solo como fallback transitorio.
- Despues de validar visualmente la integracion de `LECAPs/BONCAPs`, `CER` y `Soberanos`, se realizo una limpieza controlada de metadata legacy en `rendimientos-ar/public/config.json`:
  - `lecaps` quedo reducido a un placeholder minimo con `fuente`, `actualizado` y `letras: []`;
  - `soberanos` quedo como objeto vacio;
  - `bonos_cer` quedo como objeto vacio;
  - la fuente operativa real para esas familias pasa a ser la capa `public/fixed-income/`.

