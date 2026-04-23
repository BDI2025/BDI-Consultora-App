# LOG.md

## 2026-03-25 12:28:35 -03:00
- AcciÃ³n: inspecciÃ³n inicial del workspace seleccionado.
- Archivos afectados: ninguno.
- Motivo: verificar el estado real del proyecto antes de cualquier cambio.
- Resultado:
  - la carpeta raÃ­z `C:\Users\juand\Documents\GitHub\BDI-Consultora-App` no contiene todavÃ­a un repositorio Git del producto;
  - se detectÃ³ Ãºnicamente la carpeta `Estilo visual BDI/`;
  - dentro de esa carpeta hay un manual de marca en PDF y un isotipo PNG.
- Problemas encontrados:
  - el cÃ³digo fuente de la app a transformar no estÃ¡ presente en el workspace local;
  - `git status` en la raÃ­z fallÃ³ porque no existe repo inicializado;
  - `rg --files` no pudo ejecutarse por acceso denegado en este entorno, por lo que la inspecciÃ³n local se hizo con `Get-ChildItem`.
- Intentos fallidos:
  - `rg --files` en la raÃ­z del workspace.
  - `git status --short --branch` en la raÃ­z y en `Estilo visual BDI/`.
- Decisiones tomadas:
  - crear documentaciÃ³n operativa base antes de avanzar;
  - dejar explÃ­cito que la auditorÃ­a del repo fuente se estÃ¡ haciendo de forma remota mientras no exista un clon local.
- Pendientes:
  - completar auditorÃ­a tÃ©cnica del repositorio `rendimientos-ar`;
  - documentar arquitectura, endpoints, dependencias y riesgos;
  - definir estrategia de incorporaciÃ³n del cÃ³digo fuente al workspace.
- Siguiente paso sugerido:
  - cerrar la auditorÃ­a inicial y luego decidir si conviene clonar el repo base dentro de esta carpeta o construir una base propia inspirada en Ã©l.

## 2026-03-25 12:28:35 -03:00
- AcciÃ³n: creaciÃ³n de documentaciÃ³n persistente inicial.
- Archivos afectados:
  - `README.md`
  - `AGENTS.md`
  - `LOG.md`
- Motivo: cumplir la disciplina documental obligatoria del proyecto y dejar memoria operativa persistente.
- Resultado:
  - se creÃ³ `README.md` con objetivo, estado del workspace, restricciones, estructura actual y prÃ³ximos pasos;
  - se creÃ³ `AGENTS.md` con reglas operativas, alcance, TO DO y NOT DO;
  - se creÃ³ `LOG.md` como registro cronolÃ³gico del proyecto.
- Problemas encontrados: ninguno durante la creaciÃ³n de estos archivos.
- Decisiones tomadas:
  - mantener el nombre operativo del proyecto como `BDI Consultora App` hasta definir branding definitivo del producto;
  - registrar explÃ­citamente que la carpeta raÃ­z no es aÃºn un repositorio Git.
- Pendientes:
  - actualizar estos archivos al finalizar la auditorÃ­a inicial con hallazgos mÃ¡s precisos;
  - incorporar la estructura real del cÃ³digo fuente cuando exista en local.
- Siguiente paso sugerido:
  - terminar el diagnÃ³stico tÃ©cnico del proyecto base y convertirlo en una propuesta de migraciÃ³n BDI sin alterar todavÃ­a el funcionamiento.

## 2026-03-25 12:28:35 -03:00
- AcciÃ³n: auditorÃ­a remota inicial del repositorio fuente `arisbdar/rendimientos-ar` y de la app publicada `rendimientos.co`.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: documentar la arquitectura actual del producto base antes de cualquier clonaciÃ³n o implementaciÃ³n local.
- Resultado:
  - se identificÃ³ stack basado en frontend estÃ¡tico + Express local + Netlify Functions;
  - se relevaron endpoints pÃºblicos, fuentes de datos y estructura principal del repo;
  - se detectÃ³ presencia de `supabase/` y endpoint `/api/auth-config`, lo que sugiere dependencia de auth/portfolio no documentada del todo;
  - se confirmÃ³ que producciÃ³n depende de redirects y funciones de Netlify;
  - se dejÃ³ asentada advertencia legal por ausencia visible de archivo `LICENSE`, aunque `package.json` declara `ISC`.
- Problemas encontrados:
  - el cÃ³digo fuente no estÃ¡ aÃºn en el workspace local;
  - la inspecciÃ³n remota permite ver estructura y documentaciÃ³n, pero no reemplaza una revisiÃ³n de cÃ³digo local completa;
  - no fue posible validar todavÃ­a el detalle interno de todas las Netlify functions ni de `server.js`.
- Intentos fallidos:
  - apertura parcial de algunos archivos remotos vÃ­a raw/click que devolvieron cache miss.
- Decisiones tomadas:
  - basar esta primera auditorÃ­a en seÃ±ales consistentes del README remoto, `package.json`, `netlify.toml` y la app publicada;
  - no asumir compatibilidad comercial automÃ¡tica por la licencia hasta revisarla mejor.
- Pendientes:
  - decidir si se clona el repo base dentro del workspace para una auditorÃ­a local completa;
  - revisar material de marca BDI para alimentar sistema visual;
  - pasar a propuesta de producto BDI y plan tÃ©cnico de migraciÃ³n.
- Siguiente paso sugerido:
  - definir estrategia de incorporaciÃ³n del cÃ³digo fuente al workspace y luego avanzar con la propuesta de producto/navegaciÃ³n BDI sobre una base auditada.

## 2026-03-25 12:43:00 -03:00
- AcciÃ³n: verificaciÃ³n del clon local del repositorio fuente dentro del workspace.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: confirmar que el proyecto base ya estÃ¡ disponible localmente y actualizar el contexto operativo.
- Resultado:
  - se detectÃ³ la carpeta `rendimientos-ar/` dentro de `C:\Users\juand\Documents\GitHub\BDI-Consultora-App`;
  - el repo contiene `.git`, `public/`, `netlify/`, `supabase/`, `test/`, `server.js`, `netlify.toml` y `package.json`;
  - `git status --short --branch` dentro del clon devolviÃ³ `## main...origin/main`, sin cambios locales.
- Problemas encontrados: ninguno en la verificaciÃ³n del clon.
- Decisiones tomadas:
  - pasar de auditorÃ­a remota a auditorÃ­a local real;
  - mantener la documentaciÃ³n raÃ­z como fuente de contexto del proyecto contenedor.
- Pendientes:
  - mapear arquitectura funcional local;
  - explicar dependencias y flujo de datos en lenguaje simple.
- Siguiente paso sugerido:
  - revisar archivos clave del clon: `server.js`, `public/index.html`, `public/app.js`, `netlify/functions/*`, `supabase/*`.

## 2026-03-25 12:43:00 -03:00
- AcciÃ³n: auditorÃ­a local inicial de archivos clave del repo clonado.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: identificar funcionamiento real, dependencias efectivas y riesgos de mantenimiento sobre cÃ³digo local.
- Resultado:
  - se confirmÃ³ uso de `express` y `node-fetch`;
  - se confirmÃ³ integraciÃ³n real con `Supabase` para login Google, tabla `holdings` y tracking `page_views`;
  - se identificÃ³ que `public/app.js` centraliza gran parte de la lÃ³gica del producto;
  - se verificÃ³ la existencia de 12 Netlify Functions;
  - se detectÃ³ un posible error local: `server.js` intenta leer `data_base/CER_serie.csv`, pero la carpeta `data_base` no existe;
  - se detectaron problemas de codificaciÃ³n de caracteres en varios archivos (`Ãƒ`, `Ã¢`), probablemente por encoding inconsistente.
- Problemas encontrados:
  - entorno local posiblemente incompleto para CER;
  - variables de entorno Supabase ausentes en `.env.example`.
- Intentos fallidos:
  - inspecciÃ³n de `data_base/` devolviÃ³ ruta inexistente.
- Decisiones tomadas:
  - marcar como riesgo obligatorio la rotura potencial de CER en local;
  - explicar al usuario tÃ©rminos base como HTML y PWA en lenguaje simple.
- Pendientes:
  - cerrar el mapa detallado de flujo de datos;
  - pasar luego a la propuesta BDI de producto y navegaciÃ³n.
- Siguiente paso sugerido:
  - documentar por secciÃ³n quÃ© endpoint alimenta cada bloque de la app y quÃ© conviene conservar, aislar o refactorizar primero.

## 2026-03-25 12:50:00 -03:00
- AcciÃ³n: verificaciÃ³n adicional de consistencia entre cÃ³digo, funciones y documentaciÃ³n; intento de ejecuciÃ³n de tests.
- Archivos afectados:
  - `LOG.md`
- Motivo: detectar desfasajes entre README y cÃ³digo real, y validar el estado bÃ¡sico del proyecto sin editarlo.
- Resultado:
  - se confirmÃ³ que `README.md` del repo original quedÃ³ parcialmente desfasado respecto del cÃ³digo;
  - el README menciona `visits.js` y `/api/visits`, pero esa funciÃ³n no existe en `netlify/functions/`;
  - `public/app.js` busca un botÃ³n `theme-toggle`, pero `public/index.html` no lo incluye;
  - `public/manifest.json` todavÃ­a menciona CEDEARs, aunque esa secciÃ³n no estÃ¡ implementada en la interfaz principal;
  - `netlify/functions/auth-config.js` restringe CORS a dominios productivos del proyecto original, lo que es relevante para el futuro rebranding/despliegue BDI;
  - el intento de correr tests con `npm test` fallÃ³ porque `npm` no estÃ¡ disponible en el entorno actual.
- Problemas encontrados:
  - documentaciÃ³n original inconsistente con el estado real del cÃ³digo;
  - imposibilidad de ejecutar tests automÃ¡ticos en este entorno por falta de `npm`.
- Intentos fallidos:
  - `npm test`.
- Decisiones tomadas:
  - considerar el README original como fuente Ãºtil pero no autoritativa;
  - marcar los desfasajes detectados como deuda tÃ©cnica/documental a corregir en la migraciÃ³n.
- Pendientes:
  - cerrar el mapa explicativo de arquitectura para el usuario;
  - proponer luego la estructura BDI de producto.
- Siguiente paso sugerido:
  - entregar una auditorÃ­a tÃ©cnica explicada paso a paso, separando hallazgos confirmados, riesgos y consecuencias para la migraciÃ³n.

## 2026-03-25 12:56:00 -03:00
- AcciÃ³n: inicio de Etapa 2, propuesta de producto BDI basada en la auditorÃ­a tÃ©cnica local.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: traducir el diagnÃ³stico tÃ©cnico en una propuesta concreta de navegaciÃ³n, jerarquÃ­a de secciones y enfoque de producto.
- Resultado:
  - se dejÃ³ documentado un cambio de enfoque desde comparador generalista hacia dashboard consultivo institucional;
  - se propuso una nueva navegaciÃ³n BDI: Inicio, Liquidez, Renta fija ARS, Bonos CER, Renta fija USD, Corporativos y Portfolio en revisiÃ³n;
  - se diferenciaron mÃ³dulos a conservar, reordenar y revisar;
  - se documentÃ³ una propuesta inicial de tono, jerarquÃ­a editorial y home BDI.
- Problemas encontrados: ninguno nuevo en esta etapa de propuesta.
- Decisiones tomadas:
  - no proponer nuevas features complejas no justificadas;
  - mantener Portfolio como mÃ³dulo opcional o secundario hasta validar su prioridad real en el producto BDI.
- Pendientes:
  - entregar al usuario la Etapa 2 explicada en lenguaje simple;
  - pasar luego a Etapa 3 con sistema visual BDI.
- Siguiente paso sugerido:
  - definir identidad visual, paleta, tipografÃ­a, componentes y responsive design antes de tocar la UI existente.

## 2026-03-25 13:05:00 -03:00
- AcciÃ³n: relevamiento de insumos de marca BDI para la Etapa 3.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: basar la propuesta visual en la marca real disponible dentro del proyecto.
- Resultado:
  - se verificÃ³ la existencia de `Manual de marca.pdf` y `Marca_02 Isotipo 6.png` en `Estilo visual BDI/`;
  - se inspeccionÃ³ visualmente el isotipo, que muestra una direcciÃ³n de marca sobria con blanco, verde y degradado;
  - no fue posible extraer texto utilizable del PDF con las herramientas disponibles en este entorno;
  - se documentÃ³ explÃ­citamente esta limitaciÃ³n para no atribuir al manual reglas no confirmadas.
- Problemas encontrados:
  - `python`, `py` y utilidades comunes de extracciÃ³n PDF no estÃ¡n disponibles en la sesiÃ³n;
  - el PDF parece comprimido y no devuelve texto legible con inspecciÃ³n simple.
- Intentos fallidos:
  - `python --version`
  - `py --version`
  - bÃºsqueda de utilidades como `pdftotext`, `mutool`, `pdfinfo`, `magick`
  - extracciÃ³n simple de cadenas desde el PDF.
- Decisiones tomadas:
  - apoyar la Etapa 3 en el isotipo validado visualmente y en criterios prudentes de diseÃ±o institucional;
  - no presentar como oficiales detalles del manual que no pudieron leerse automÃ¡ticamente.
- Pendientes:
  - entregar propuesta visual completa BDI;
  - cuando el entorno lo permita, contrastar implementaciÃ³n final con el PDF manual.
- Siguiente paso sugerido:
  - proponer sistema visual BDI para la app: color, tipografÃ­a, componentes, navegaciÃ³n y responsive design.

## 2026-03-25 13:18:00 -03:00
- AcciÃ³n: incorporaciÃ³n de confirmaciones visuales del manual de marca aportadas por el usuario y verificaciÃ³n del estado Git local.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: afinar la Etapa 3 con colores confirmados y explicar por quÃ© GitHub Desktop no muestra los archivos documentales.
- Resultado:
  - se confirmaron colores de marca a partir de capturas del manual:
    - `#232323`
    - `#157347`
    - `#46B179`
    - `#4CBDC2`
    - `#EEEEEF`
    - `#FFFFFF`
  - se verificÃ³ que `BDI-Consultora-App` no es repo Git;
  - se verificÃ³ que `rendimientos-ar` sÃ­ es repo Git, con remoto `origin` apuntando a `https://github.com/arisbdar/rendimientos-ar.git`;
  - se documentÃ³ que los archivos creados en la raÃ­z no aparecen en GitHub Desktop porque estÃ¡n fuera del repo abierto.
- Problemas encontrados:
  - la estructura actual separa documentaciÃ³n raÃ­z y repo clonado, lo que genera confusiÃ³n operativa en GitHub Desktop.
- Decisiones tomadas:
  - explicarle al usuario la causa exacta sin mover ni renombrar archivos;
  - usar la paleta confirmada por capturas como base mÃ¡s confiable para la Etapa 3.
- Pendientes:
  - redefinir la propuesta visual final con la paleta confirmada;
  - definir con el usuario cÃ³mo quiere estructurar el repo propio antes de implementar.
- Siguiente paso sugerido:
  - proponer opciones concretas para pasar de repo ajeno clonado a repo propio de BDI sin perder trazabilidad ni romper el trabajo.

## 2026-03-25 13:24:00 -03:00
- AcciÃ³n: registro de decisiÃ³n de avanzar hacia repo propio de BDI con independencia real.
- Archivos afectados:
  - `README.md`
  - `AGENTS.md`
  - `LOG.md`
- Motivo: dejar asentada la direcciÃ³n elegida por el usuario antes de ejecutar cambios estructurales sobre Git.
- Resultado:
  - se documentÃ³ que el objetivo ya no es trabajar indefinidamente sobre el clon de `arisbdar/rendimientos-ar`;
  - se dejÃ³ asentado que la meta es convertir `BDI-Consultora-App` en la raÃ­z principal del proyecto versionado;
  - se registrÃ³ que una independencia real requerirÃ¡ actuar sobre los metadatos Git del clon interno o redefinir la estructura del proyecto.
- Problemas encontrados:
  - la estructura actual tiene documentaciÃ³n en la raÃ­z y cÃ³digo dentro de un repo anidado;
  - eso impide una experiencia clara en GitHub Desktop.
- Decisiones tomadas:
  - no ejecutar aÃºn una modificaciÃ³n destructiva de metadatos Git sin explicar primero la consecuencia al usuario;
  - preparar una explicaciÃ³n simple del paso tÃ©cnico necesario.
- Pendientes:
  - obtener confirmaciÃ³n final para cortar el vÃ­nculo Git del clon interno y convertir la raÃ­z en repo propio;
  - luego unificar estado Git y continuar implementaciÃ³n.
- Siguiente paso sugerido:
  - explicar claramente al usuario quÃ© significa â€œhacerlo propioâ€ a nivel Git y pedir confirmaciÃ³n para el cambio estructural mÃ­nimo necesario.

## 2026-03-25 13:32:00 -03:00
- AcciÃ³n: conversiÃ³n del proyecto a repo propio de BDI.
- Archivos afectados:
  - metadatos Git del proyecto
  - `README.md`
  - `AGENTS.md`
  - `LOG.md`
- Motivo: materializar la independencia real del proyecto respecto del repo original clonado.
- Resultado:
  - se eliminÃ³ `C:\Users\juand\Documents\GitHub\BDI-Consultora-App\rendimientos-ar\.git`;
  - se inicializÃ³ Git en `C:\Users\juand\Documents\GitHub\BDI-Consultora-App`;
  - `git status` en la raÃ­z ahora muestra una sola unidad de trabajo con:
    - `AGENTS.md`
    - `LOG.md`
    - `README.md`
    - `Estilo visual BDI/`
    - `rendimientos-ar/`
  - `git remote -v` en la raÃ­z no devuelve remotos, lo que confirma independencia respecto del repo anterior.
- Problemas encontrados: ninguno durante la conversiÃ³n.
- Decisiones tomadas:
  - mantener la estructura fÃ­sica actual del proyecto sin mover carpetas;
  - unificar Git en la raÃ­z primero y posponer cualquier reestructuraciÃ³n adicional.
- Pendientes:
  - abrir la raÃ­z `BDI-Consultora-App` en GitHub Desktop;
  - opcionalmente crear un remoto nuevo de BDI y vincularlo;
  - continuar luego con Etapa 4 y la implementaciÃ³n.
- Siguiente paso sugerido:
  - explicarle al usuario cÃ³mo verificar visualmente el nuevo repo en GitHub Desktop y luego seguir con el plan tÃ©cnico de implementaciÃ³n.

## 2026-03-25 13:38:00 -03:00
- AcciÃ³n: confirmaciÃ³n de apertura del repo raÃ­z en GitHub Desktop.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: registrar el estado operativo luego de la conversiÃ³n a repo propio.
- Resultado:
  - el usuario confirmÃ³ que GitHub Desktop ya pudo abrir `BDI-Consultora-App`;
  - apareciÃ³ advertencia de seguridad esperable por ownership y fue aceptada;
  - GitHub Desktop mostrÃ³ mÃ¡s de 119 archivos para el primer commit, lo cual es consistente con un repo nuevo que incluye cÃ³digo, documentaciÃ³n y assets.
- Problemas encontrados: ninguno nuevo; comportamiento esperado.
- Decisiones tomadas:
  - considerar validada la nueva raÃ­z Git del proyecto desde el punto de vista operativo del usuario.
- Pendientes:
  - confirmar si el usuario creÃ³ ya el primer commit o solo aceptÃ³ la incorporaciÃ³n del repo;
  - seguir con Etapa 4 y luego implementaciÃ³n.
- Siguiente paso sugerido:
  - explicar al usuario por quÃ© ese volumen de archivos es normal y continuar con el plan tÃ©cnico de implementaciÃ³n.

## 2026-03-25 13:45:00 -03:00
- AcciÃ³n: elaboraciÃ³n de Etapa 4, plan tÃ©cnico de implementaciÃ³n.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: definir un orden de trabajo seguro antes de modificar cÃ³digo de la app BDI.
- Resultado:
  - se documentÃ³ un plan por bloques, desde branding base hasta refactor tÃ©cnico y deploy;
  - se identificaron archivos prioritarios, archivos nuevos recomendados y Ã¡reas a no tocar en la primera ola;
  - se registrÃ³ estrategia de testing manual y estrategia de despliegue.
- Problemas encontrados: ninguno nuevo.
- Decisiones tomadas:
  - separar rebranding visual de refactor profundo para reducir riesgo;
  - postergar trabajo fuerte sobre Supabase y portfolio hasta estabilizar el core pÃºblico.
- Pendientes:
  - entregar el plan al usuario de forma clara;
  - luego iniciar la implementaciÃ³n incremental.
- Siguiente paso sugerido:
  - comenzar con Bloque 1: identidad visual y branding base.

## 2026-03-25 14:05:00 -03:00
- AcciÃ³n: implementaciÃ³n inicial de Bloque 1, branding base BDI.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/public/manifest.json`
  - `rendimientos-ar/netlify/functions/auth-config.js`
  - `README.md`
  - `LOG.md`
- Motivo: iniciar la transformaciÃ³n visible del producto sin tocar todavÃ­a lÃ³gica financiera profunda.
- Resultado:
  - se reescribiÃ³ `index.html` con metadatos, header y textos base alineados a BDI;
  - se actualizaron colores, tipografÃ­as y estilos principales en `styles.css`;
  - se rebrandearon nombre y theme color del manifest;
  - se agregaron dominios BDI permitidos en `auth-config.js`.
- Problemas encontrados:
  - archivos con encoding inconsistente dificultaron parches quirÃºrgicos;
  - no hay `node` ni `npm` en esta sesiÃ³n, por lo que no se pudo levantar preview local desde el entorno del agente.
- Intentos fallidos:
  - parches parciales sobre archivos con texto roto por encoding, especialmente `index.html`, `manifest.json` y `app.js`.
- Decisiones tomadas:
  - reescribir archivos chicos y visibles cuando el encoding bloqueÃ³ reemplazos estables;
  - dejar `app.js` para una pasada posterior mÃ¡s controlada, sin forzar una reescritura riesgosa.
- Pendientes:
  - ajustar textos dinÃ¡micos y tÃ­tulos en `app.js`;
  - revisar preview visual en mÃ¡quina del usuario;
  - continuar con navegaciÃ³n BDI y home.
- Siguiente paso sugerido:
  - revisar este primer bloque en GitHub Desktop y luego avanzar con la segunda pasada de branding sobre `app.js`.

## 2026-03-25 14:20:00 -03:00
- AcciÃ³n: cierre parcial del Bloque 1 con overrides de copy y navegaciÃ³n.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/bdi-overrides.js`
  - `README.md`
  - `LOG.md`
- Motivo: evitar una reescritura riesgosa de `app.js` mientras se corrige branding visible y textos dinÃ¡micos.
- Resultado:
  - se agregÃ³ `bdi-overrides.js` cargado despuÃ©s de `app.js`;
  - el nuevo script sincroniza tÃ­tulos de hero y `document.title` segÃºn secciÃ³n/hash;
  - esto reduce el impacto de los problemas de encoding en `app.js` sin tocar la lÃ³gica financiera central.
- Problemas encontrados:
  - `app.js` continÃºa siendo frÃ¡gil para parches extensos por encoding inconsistente.
- Decisiones tomadas:
  - usar overrides progresivos en vez de forzar una reescritura temprana del archivo monolÃ­tico;
  - reservar una refactorizaciÃ³n mÃ¡s limpia de `app.js` para una etapa posterior.
- Pendientes:
  - validar visualmente el bloque completo cuando el usuario pueda levantar la app localmente;
  - continuar con home/navegaciÃ³n y luego modularizaciÃ³n.
- Siguiente paso sugerido:
  - explicar al usuario cÃ³mo funciona la app a nivel bÃ¡sico (`index.html`, `app.js`, servidor local) y despuÃ©s seguir con la siguiente mejora visual/estructural.

## 2026-03-25 14:32:00 -03:00
- AcciÃ³n: profundizaciÃ³n visual de la home BDI.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: hacer que la portada se sienta mÃ¡s consultiva e institucional sin introducir nuevas dependencias ni romper la lÃ³gica existente.
- Resultado:
  - se agregaron bloques de briefing editorial en la home;
  - se agregaron shortcuts hacia Liquidez, Renta fija ARS, CER, Soberanos y Corporativos;
  - se mejorÃ³ la jerarquÃ­a visual de tablas, cards, subnav y contenedores.
- Problemas encontrados: ninguno nuevo en esta pasada.
- Decisiones tomadas:
  - mantener la home como composiciÃ³n estÃ¡tica con enlaces hash, sin agregar lÃ³gica compleja;
  - seguir separando identidad visual de refactor tÃ©cnico profundo.
- Pendientes:
  - decidir si este bloque ya se toma como primer commit lÃ³gico;
  - luego pasar a una segunda ola de reorganizaciÃ³n de navegaciÃ³n y estructuras por secciÃ³n.
- Siguiente paso sugerido:
  - preparar indicaciones simples para que el usuario pueda levantar la app localmente y validar visualmente este primer hito.
## 2026-03-25 14:48:00 -03:00
- AcciÃƒÂ³n: refuerzo del override BDI y actualizacion de documentacion operativa.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-overrides.js`
  - `rendimientos-ar/public/index.html`
  - `README.md`
  - `LOG.md`
- Motivo: estabilizar rotulos BDI visibles sin tocar en exceso `app.js` y dejar la memoria del proyecto alineada con el estado real.
- Resultado:
  - `bdi-overrides.js` ahora reimpone nombres BDI de navegacion y subtabs;
  - se ajustaron textos visibles del inicio;
  - `README.md` quedo actualizado con el estado del repo propio y el avance real del Bloque 1.
- Problemas encontrados:
  - persisten restos de encoding inconsistente, sobre todo en `app.js`.
- Decisiones tomadas:
  - mantener la estrategia de overrides progresivos;
  - reservar la limpieza profunda de encoding y refactor de `app.js` para una etapa posterior.
- Pendientes:
  - decidir si este bloque ya se toma como primer commit;
  - preparar la guia simple para abrir la app localmente;
  - validar visualmente el resultado en navegador real.
- Siguiente paso sugerido:
  - dejar listo el primer commit logico y luego acompaÃƒÂ±ar al usuario en la apertura local de la app para testing manual.

## 2026-03-25 15:02:00 -03:00
- AcciÃƒÂ³n: documentacion de apertura local y testing manual inicial.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: dejar dentro del proyecto una guia simple para que el usuario pueda correr la app localmente sin depender del chat.
- Resultado:
  - se agrego al `README.md` una guia basica para verificar `node`, instalar dependencias, iniciar el servidor local y abrir `http://localhost:3000`;
  - se dejaron anotadas las limitaciones locales conocidas de `Mi cartera` y CER.
- Problemas encontrados:
  - no se pudo ejecutar la app desde esta sesion porque el entorno del agente no tiene `node` ni `npm`.
- Decisiones tomadas:
  - documentar primero el camino nominal de apertura local;
  - reservar para el siguiente paso el acompanamiento del usuario durante su primer intento real.
- Pendientes:
  - pedir al usuario que verifique si `node -v` y `npm -v` existen en su maquina;
  - luego acompaÃƒÂ±ar la primera apertura local y validar visualmente el hito.
- Siguiente paso sugerido:
  - guiar al usuario en la comprobacion de `node` y, si esta disponible, avanzar con `npm install` y `npm start`.

## 2026-03-25 15:12:00 -03:00
- AcciÃƒÂ³n: documentacion de incidencia local con PowerShell y `npm`.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: el usuario confirmo que `node` esta instalado, pero PowerShell bloquea `npm` por politica de ejecucion de scripts.
- Resultado:
  - se agrego al `README.md` la alternativa de usar `npm.cmd` en vez de `npm` dentro de PowerShell.
- Problemas encontrados:
  - `npm.ps1` esta siendo bloqueado por Windows PowerShell con `PSSecurityException`.
- Decisiones tomadas:
  - priorizar el camino menos invasivo para el usuario: usar `npm.cmd` sin cambiar politicas del sistema;
  - dejar para mas adelante, solo si hace falta, una solucion basada en ExecutionPolicy.
- Pendientes:
  - guiar al usuario en `npm.cmd install` y `npm.cmd start`;
  - confirmar si la app abre en `http://localhost:3000`.
- Siguiente paso sugerido:
  - hacer la primera ejecucion local con `npm.cmd`.

## 2026-03-25 15:22:00 -03:00
- AcciÃƒÂ³n: registro de primera prueba local exitosa de la app.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: dejar constancia del primer arranque real en la maquina del usuario y de los errores funcionales observados.
- Resultado:
  - la app abrio correctamente en `http://localhost:3000`;
  - `npm.cmd install` y `npm.cmd start` funcionaron;
  - se confirmo branding base visible en navegador real.
- Problemas encontrados:
  - CER falla con `ENOENT` porque falta `data_base/CER_serie.csv`;
  - el usuario reporto errores al entrar en Renta fija ARS y Corporativos/ONs;
  - por ahora el hito queda validado como base visual, no como estabilizacion funcional completa.
- Decisiones tomadas:
  - considerar este estado como buen corte para un commit de hito visual/documental, dejando claro que los arreglos funcionales van en el siguiente bloque;
  - usar el feedback del navegador real para priorizar la siguiente ronda tecnica.
- Pendientes:
  - decidir si se hace commit ahora;
  - auditar errores de CER, Renta fija ARS y Corporativos/ONs;
  - seguir con la estabilizacion funcional del producto BDI.
- Siguiente paso sugerido:
  - tomar un commit del hito actual y luego abrir el bloque de correcciones tecnicas.

## 2026-03-25 15:38:00 -03:00
- AcciÃƒÂ³n: rearmado del servidor local para estabilizacion funcional.
- Archivos afectados:
  - `rendimientos-ar/server.js`
  - `README.md`
  - `LOG.md`
- Motivo: la prueba local confirmo contratos rotos entre frontend y backend de desarrollo, especialmente en CER y ONs.
- Resultado:
  - se reemplazo `server.js` por una version mas consistente para desarrollo local;
  - se agrego fallback de CER via BCRA cuando falta `data_base/CER_serie.csv`;
  - se agrego `/api/ons` para el flujo local de Corporativos;
  - se amplio `/api/cer-precios` para incluir bonos y letras CER;
  - se sumaron rutas locales para `mundo` y `news`, alineando mejor el entorno local con el comportamiento esperado de la app.
- Problemas encontrados:
  - no se pudo correr `node --check` desde la sesion del agente porque `node` sigue sin estar disponible en este entorno, aunque si lo esta en la maquina del usuario.
- Decisiones tomadas:
  - priorizar una reescritura controlada de `server.js` en vez de seguir parchando un archivo incompleto y fragil;
  - pedir una nueva validacion manual del usuario antes de avanzar con mas cambios sobre frontend.
- Pendientes:
  - reiniciar el servidor local y reprobar CER, Renta fija ARS y Corporativos;
  - confirmar si persiste algun error en LECAPs;
  - ajustar luego el frontend si algun mensaje o render sigue fallando.
- Siguiente paso sugerido:
  - hacer una segunda prueba local focalizada sobre las secciones que fallaron en el primer test.

## 2026-03-25 15:47:00 -03:00
- AcciÃƒÂ³n: ajuste fino de frontend para navegacion y tolerancia a Chart.js.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-overrides.js`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario reporto labels duplicados en el header y errores visibles en Soberanos/Corporativos asociados al render de curvas.
- Resultado:
  - `bdi-overrides.js` ahora reescribe los tabs del header de forma deterministica, evitando duplicados de texto;
  - se agregaron guards `typeof Chart === 'undefined'` en curvas de Soberanos, CER y ONs para que la seccion no colapse si el grafico no puede renderizarse.
- Problemas encontrados:
  - aun falta validar en navegador real si el error de Soberanos desaparece y si Corporativos pasa de error a tabla.
- Decisiones tomadas:
  - seguir privilegiando tolerancia a fallos visibles por encima de refinamientos de UI en esta etapa.
- Pendientes:
  - nueva prueba manual focalizada en Soberanos y Corporativos;
  - luego retomar refinamiento visual/paleta en una etapa posterior, como acordado con el usuario.
- Siguiente paso sugerido:
  - reiniciar el servidor local y validar otra vez Soberanos y Corporativos.

## 2026-03-26 09:05:00 -03:00
- AcciÃƒÂ³n: registro de segunda validacion manual positiva.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: dejar constancia de que las secciones que fallaban ya cargan y definir el nuevo corte de trabajo.
- Resultado:
  - `Soberanos`, `Corporativos` y `Renta fija ARS` ya no presentan errores bloqueantes en la prueba manual del usuario;
  - la duplicacion de labels del header quedo resuelta;
  - el producto queda en estado apto para un commit de estabilizacion.
- Problemas encontrados:
  - no se muestran curvas/graficos de `TIR` vs `Duration` en Soberanos, Corporativos y Renta fija ARS.
- Decisiones tomadas:
  - tomar la recuperacion o rediseÃ±o de curvas como el siguiente bloque funcional;
  - no usar ese faltante como bloqueo para el commit actual.
- Pendientes:
  - definir e implementar la version BDI de las curvas de instrumentos;
  - luego retomar refinamiento visual de paleta y detalles de interfaz.
- Siguiente paso sugerido:
  - hacer commit del estado actual y abrir el siguiente bloque para graficos/curvas.

## 2026-03-26 09:18:00 -03:00
- AcciÃƒÂ³n: implementacion de curvas propias para instrumentos.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: recuperar la visualizacion de `Duration` vs `TIR` sin depender del comportamiento de `Chart.js`.
- Resultado:
  - se agrego una capa propia de graficos SVG para `Renta fija ARS`, `Soberanos`, `Bonos CER` y `Corporativos`;
  - `index.html` ahora carga `bdi-charts.js` despues de `app.js`;
  - `styles.css` suma estilos para los nuevos graficos institucionales.
- Decisiones tomadas:
  - priorizar una solucion controlada y estable sobre la dependencia a librerias externas;
  - dejar el refinamiento estetico de estos graficos para una pasada posterior.
- Pendientes:
  - validacion manual de las nuevas curvas en navegador real;
  - ajustar densidad, colores y rotulos segun feedback visual del usuario.
- Siguiente paso sugerido:
  - reiniciar el servidor local y revisar las curvas de `Renta fija ARS`, `Soberanos` y `Corporativos`.

## 2026-03-26 09:31:00 -03:00
- AcciÃƒÂ³n: refinamiento visual de curvas propias.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario reporto que los graficos se veian chicos, con una linea poco profesional y exceso de labels.
- Resultado:
  - se aumento la altura util de los graficos;
  - la linea de tendencia paso a una curva suavizada mas sobria;
  - se redujo la cantidad de labels visibles segun densidad;
  - se agregaron leyendas visuales en las secciones donde aportan lectura.
- Decisiones tomadas:
  - priorizar claridad editorial antes que mostrar absolutamente todos los labels en simultaneo;
  - mantener la curva como lectura de tendencia y no como interpolacion exacta punto por punto.
- Pendientes:
  - validacion visual del usuario sobre esta segunda version de curvas;
  - luego decidir si se hace commit de este bloque o si conviene una ultima pasada de detalle.
- Siguiente paso sugerido:
  - refrescar la app y comparar la nueva presentacion de `Renta fija ARS`, `Soberanos` y `Corporativos`.

## 2026-03-26 09:46:00 -03:00
- AcciÃƒÂ³n: correccion conceptual de curvas segun criterio financiero del usuario.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario indico que las curvas debian comportarse como guias crecientes/concavas o separadas por familia, y no como lineas quebradas afectadas por puntos atipicos.
- Resultado:
  - `bdi-charts.js` ahora construye curvas robustas a partir de anclas por mediana y restricciones de forma;
  - `Soberanos` pasa a mostrar dos curvas: ley local y ley NY;
  - las etiquetas visibles se reformulan a ticker + TIR actual.
- Decisiones tomadas:
  - privilegiar la logica de lectura financiera por sobre una interpolacion literal de todos los puntos;
  - aceptar que la curva es una guia visual y no un ajuste estadistico exacto.
- Pendientes:
  - nueva validacion visual del usuario comparando contra sus referencias;
  - decidir si este bloque ya queda listo para commit o si hace falta una ultima pasada fina.
- Siguiente paso sugerido:
  - refrescar la app y revisar otra vez `Renta fija ARS`, `Soberanos` y `Corporativos`.

## 2026-03-26 10:02:00 -03:00
- AcciÃƒÂ³n: rediseÃƒÂ±o de la trayectoria de curvas con forma controlada.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario indico que las curvas debian verse prolijas y profesionales, con una forma creciente/concava o equivalente, y no ondulada.
- Resultado:
  - las curvas ahora se construyen desde anclas robustas por mediana;
  - se impone una forma por familia (`increasing-concave-down`, `hump-soft`, etc.);
  - `Soberanos` conserva dos curvas separadas: ley local y ley NY.
- Decisiones tomadas:
  - tratar la curva como una guia financiera formal, no como una interpolacion libre;
  - mantener ticker + TIR sobre los puntos como criterio principal de rotulado.
- Pendientes:
  - validacion visual del usuario sobre esta nueva generacion de curvas;
  - decidir si hace falta una ultima pasada de detalle o si el bloque ya queda listo para commit.
- Siguiente paso sugerido:
  - refrescar la app y comparar otra vez con las referencias del usuario.

## 2026-03-26 10:16:00 -03:00
- AcciÃƒÂ³n: agrandado de graficos y cambio a interpolacion monotona por tramos.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio una curva mas grande y una trayectoria que una los puntos de forma natural, sin ondulaciones ni formas en U incorrectas.
- Resultado:
  - los graficos aumentaron de tamano;
  - la curva ahora usa un trazado monotono por tramos en vez del esquema previo;
  - para series como soberanos y corporativos se habilita una trayectoria de alza y eventual descenso suave cuando corresponde.
- Pendientes:
  - validar visualmente esta nueva iteracion contra las referencias del usuario.
- Siguiente paso sugerido:
  - refrescar la app y revisar otra vez las tres secciones de curvas.

## 2026-03-26 10:29:00 -03:00
- AcciÃƒÂ³n: ajuste de escala de graficos y depuracion de puntos para curvas.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio tomar la curva de ley NY como patron, reducir el cuadrante blanco y mejorar legibilidad general.
- Resultado:
  - el grafico ahora usa un area util mas grande y un contenedor mas ajustado;
  - las curvas se calculan sobre puntos limpios de outliers, sin ocultar los puntos reales del scatter;
  - `Corporativos` pasa a una version curada por anio para evitar saturacion.
- Pendientes:
  - nueva validacion visual del usuario sobre `Renta fija ARS`, `CER`, `Soberanos` y `Corporativos`;
  - decidir si hace falta una ultima iteracion o si ya queda listo para commit.
- Siguiente paso sugerido:
  - refrescar la app y comparar otra vez con especial foco en la curva local de soberanos y la curva de LECAPs.

## 2026-03-26 10:42:00 -03:00
- AcciÃƒÂ³n: segunda ampliacion de escala y separacion entre curva guia y puntos visibles.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario indico que el cuadrante blanco seguia grande, el grafico no ganaba suficiente presencia y algunas curvas todavia seguian mal resueltas.
- Resultado:
  - el grafico gana aun mas alto y ancho util;
  - el contenedor se achica en padding;
  - la curva se apoya en un conjunto mas limpio de puntos guia mientras los puntos reales siguen visibles;
  - `Corporativos` mantiene la curacion por anio para no colapsar.
- Pendientes:
  - nueva validacion visual del usuario para confirmar si el problema de LECAPs y ley local en soberanos quedo mejor encaminado.
- Siguiente paso sugerido:
  - refrescar la app y revisar de nuevo `Renta fija ARS`, `Soberanos`, `CER` y `Corporativos`.

## 2026-03-26 11:05:00 -03:00
- Accion: reescritura de la capa de curvas para imponer formas mas limpias y mayor presencia visual.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario indico que la unica referencia aceptable era la curva de ley NY y que el resto seguia con formas raras, graficos chicos y demasiado margen blanco.
- Resultado:
  - `bdi-charts.js` fue reescrito para abandonar la logica anterior de anclas/tangentes y pasar a curvas guia mas simples y controladas;
  - `LECAPs` ahora usa una curva creciente y concava;
  - `BONCAPs`, `Soberanos ley local`, `Soberanos ley NY` y `Corporativos` usan una trayectoria tipo loma suave con ascenso limpio y eventual caida controlada;
  - `Corporativos` reduce la seleccion visible a 2 ONs por anio segun TIR para evitar colapso visual;
  - `styles.css` agranda el area util del grafico, baja padding del contenedor y aumenta tamanos de leyenda, ejes, labels y trazos.
- Problemas encontrados:
  - esta sesion sigue sin `node`, por lo que no se pudo verificar visualmente el resultado final desde el entorno del agente.
- Decisiones tomadas:
  - priorizar una guia visual estable y legible antes que un ajuste demasiado sensible a cada punto;
  - usar la curva que el usuario aprobo como patron conceptual para el resto de las familias.
- Pendientes:
  - nueva validacion manual del usuario sobre `Renta fija ARS`, `CER`, `Soberanos` y `Corporativos`;
  - si todavia algun tramo queda raro, hacer una ultima pasada puntual sobre esa familia y no sobre todo el sistema.
- Siguiente paso sugerido:
  - refrescar la app con `Ctrl + F5`, revisar otra vez los graficos y comparar especificamente LECAPs, ley local de soberanos y corporativos.

## 2026-03-26 11:24:00 -03:00
- Accion: ajuste puntual de formas y copy de graficos segun feedback fino del usuario.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario marco con precision que:
  - `LECAPs` seguia ondulada;
  - `CER` necesitaba menos ondulacion inicial y una curva mas alta;
  - `Soberanos` habia empeorado al romper la forma prolija de ley NY;
  - `Corporativos` debia pasar a una lista puntual de ONs preferidas;
  - leyenda y descripcion debian quedar mucho mas cerca del grafico.
- Resultado:
  - `bdi-charts.js` ahora usa menos puntos guia para reducir ondulacion y serrucho;
  - `LECAPs` y `CER` quedan con guia creciente y concava mas simple;
  - `Soberanos` usa una loma mas contenida para ley local y ley NY;
  - `Corporativos` pasa a una curacion fija con tickers indicados por el usuario;
  - captions actualizados a los textos pedidos;
  - `styles.css` comprime aun mas el encuadre y pega leyenda/caption al grafico.
- Problemas encontrados:
  - sin validacion visual local desde esta sesion, todavia dependemos de la prueba manual del usuario para confirmar si la forma final ya quedo bien.
- Decisiones tomadas:
  - pasar de ajustes generales a cambios por familia de instrumentos;
  - respetar la seleccion exacta de ONs preferidas provista por el usuario.
- Pendientes:
  - validacion manual inmediata de las cuatro familias;
  - si algun tramo sigue mal, hacer correccion solo sobre esa curva y no sobre todo el sistema.
- Siguiente paso sugerido:
  - refrescar la app con `Ctrl + F5`, revisar otra vez `LECAPs`, `CER`, `Soberanos` y `Corporativos`, y comparar contra las nuevas referencias visuales.

## 2026-03-26 11:39:00 -03:00
- Accion: correccion de regresion visual en escala y deformacion de curvas.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario reporto que la iteracion anterior habia agrandado demasiado los graficos y roto varias curvas.
- Resultado:
  - se elimino el estiramiento del SVG;
  - el tamano general del bloque de grafico volvio a una escala mas razonable;
  - las curvas ahora parten de anclas superiores mas sanas para evitar que un outlier inicial deforme todo el trazado;
  - se mantuvieron captions y filtros recientes, pero se retiro la deformacion de escala que hacia ver todo raro.
- Problemas encontrados:
  - seguimos necesitando validacion visual del usuario para confirmar si esta correccion ya desactiva la regresion.
- Decisiones tomadas:
  - priorizar volver a una base estable antes de seguir refinando detalle fino;
  - corregir primero escala y anclaje de curvas, no sumar mas complejidad.
- Pendientes:
  - nueva validacion manual de `LECAPs`, `CER`, `Soberanos` y `Corporativos`.
- Siguiente paso sugerido:
  - refrescar la app con `Ctrl + F5` y verificar si la escala y la forma general quedaron otra vez en terreno util.

## 2026-03-26 11:52:00 -03:00
- Accion: cambio de estrategia para curvas con guias por instrumentos representativos y eje Y dedicado.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario confirmo que el tamano del grafico ya esta mejor, pero las curvas siguen sin quedar como necesita.
- Resultado:
  - cada familia ahora puede construir su guia con tickers representativos concretos;
  - se agrego `yDomain` por grafico para mejorar la lectura y evitar aplastamientos;
  - `LECAPs`, `CER`, `Soberanos` y `Corporativos` pasan a una logica donde la curva intenta pasar cerca de nombres relevantes y no forzar un ajuste global extraÃ±o.
- Decisiones tomadas:
  - dejar de insistir con una unica formula universal para todas las familias;
  - usar guias curadas por instrumentos relevantes, que es mas cercano a la referencia visual que busca el usuario.
- Pendientes:
  - nueva validacion visual del usuario para ver si este enfoque por instrumentos y eje Y propio finalmente ordena las curvas.
- Siguiente paso sugerido:
  - refrescar la app con `Ctrl + F5` y revisar otra vez las cuatro familias.

## 2026-03-26 12:18:00 -03:00
- Accion: reordenamiento del dashboard inicial de mercado.
- Archivos afectados:
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario marco que la portada del proyecto de referencia tiene mejor categorizacion y mejor lectura de monitor global.
- Resultado:
  - `server.js` amplia `MUNDO_SYMBOLS` con mas activos y les agrega categoria e icono corto;
  - `app.js` deja de renderizar una sola grilla plana y pasa a agrupar tarjetas por categoria;
  - `styles.css` incorpora paneles de categoria y una tarjeta de monitor mas ordenada para home;
  - la portada BDI gana un monitor inicial mas cercano a una terminal consultiva simplificada.
- Decisiones tomadas:
  - reutilizar la misma fuente `/api/mundo` en vez de introducir otra dependencia nueva;
  - priorizar categorias utiles para lectura diaria: indices, tasas, energia, metales, agro, crypto y FX.
- Pendientes:
  - validacion visual del nuevo dashboard inicial en navegador real;
  - decidir despues si conviene sumar filtros, orden interno o una capa de resumen ejecutivo arriba de cada categoria.
- Siguiente paso sugerido:
  - refrescar la home con `Ctrl + F5`, revisar el nuevo monitor inicial y evaluar si la jerarquia ya se acerca a la referencia funcional que busca el usuario.

## 2026-03-26 12:31:00 -03:00
- Accion: endurecimiento del monitor global del lado frontend.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario reporto que el dashboard seguia mostrando una sola categoria y que no se veian los mini graficos intradiarios.
- Resultado:
  - `app.js` ahora incluye un mapa local de categorias e iconos por `id`, para no depender solo de lo que devuelva `/api/mundo`;
  - las cards del monitor global usan esos metadatos como fallback;
  - `styles.css` hace mas visible el contenedor de sparkline y compacta la card para que el mini grafico no quede perdido.
- Decisiones tomadas:
  - blindar la categorizacion tambien en frontend para reducir acoplamiento con el backend;
  - priorizar visibilidad del mini grafico antes de seguir afinando detalle fino de la home.
- Pendientes:
  - nueva validacion manual del dashboard inicial;
  - si el backend sigue devolviendo un universo parcial, recordar reiniciar el server local para tomar cambios de `server.js`.
- Siguiente paso sugerido:
  - refrescar la app y, si no aparecen nuevas categorias, reiniciar `npm.cmd start` para asegurar que el server local este usando la version nueva de `server.js`.

## 2026-03-26 12:44:00 -03:00
- Accion: ajuste de unidad monetaria, layout de 3 columnas y blindaje de sparklines.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario pidio sumar moneda de referencia en cada cotizacion, alinear tres activos por fila y corregir la ausencia visual de mini graficos intradiarios.
- Resultado:
  - `app.js` ahora asigna unidad por activo (`USD`, `%`, `Par`) y la renderiza debajo del precio principal;
  - el mapa local de `mundoMeta` tambien define icono y unidad, reduciendo dependencia del backend para estos metadatos;
  - `drawSparkline` ahora espera mejor al layout real del canvas, limpia el contexto y elimina dots previos antes de redibujar;
  - `styles.css` pasa el monitor global a 3 columnas en desktop y mantiene 1 en mobile;
  - el contenedor principal vuelve mas ancho para permitir esa lectura horizontal.
- Pendientes:
  - validacion manual de que ya se vean las sparklines y que el layout de 3 activos por fila quede bien;
  - si siguieran sin verse las sparklines, revisar el contenido concreto de `item.sparkline` en el browser o reforzar el backend.
- Siguiente paso sugerido:
  - reiniciar servidor si hace falta, refrescar `#mundo` con `Ctrl + F5` y validar categorias, moneda y mini graficos.

## 2026-03-26 12:58:00 -03:00
- Accion: consolidacion de auditoria de fuentes de datos en documentacion persistente.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio un mapa claro de origen de precios y tasas para poder revisar confiabilidad y mantenimiento.
- Resultado:
  - `README.md` ahora incluye una tabla de auditoria de fuentes por seccion;
  - se distinguen flujos automaticos, manuales y mixtos;
  - queda explicitado que `data912` y `config.json` son puntos especialmente criticos para la renta fija.
- Decisiones tomadas:
  - dejar la auditoria dentro del proyecto para no depender del chat;
  - usar una tabla simple con endpoint, fuente real, tipo de dato, mantenimiento y riesgo.
- Pendientes:
  - seguir con el siguiente bloque visual/funcional de la pagina;
  - decidir luego si conviene exponer parte de esta informacion como â€œfuenteâ€ dentro de la propia UI.
- Siguiente paso sugerido:
  - continuar con home/dashboard y jerarquia de la portada BDI.

## 2026-03-26 13:09:00 -03:00
- Accion: exposicion de fuentes en la UI de secciones clave.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario pidio confirmar visualmente de donde salen precios y tasas para poder auditar confiabilidad.
- Resultado:
  - `Mundo`, `Plazo fijo`, `LECAPs`, `Soberanos`, `CER` y `ONs` ahora muestran texto de fuente en la propia interfaz;
  - el origen de datos queda visible sin necesidad de abrir el codigo.
- Pendientes:
  - validar visualmente estos textos en navegador real;
  - luego seguir con mejoras de jerarquia y home BDI.
- Siguiente paso sugerido:
  - refrescar la app y confirmar que las fuentes se vean bien debajo de cada bloque.

## 2026-03-26 13:22:00 -03:00
- Accion: incorporacion de tablero ejecutivo en la home.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: avanzar con una portada BDI mas consultiva y menos parecida a un listado plano de bloques.
- Resultado:
  - `index.html` suma un bloque `Tablero ejecutivo` arriba del monitor global;
  - `styles.css` agrega la presentacion de esa fila de referencias clave;
  - `app.js` conecta ese tablero con datos reales de `loadCotizaciones()` y `loadMundo()`;
  - la home ahora resume primero referencias de Argentina y benchmarks globales antes de bajar al monitor por categorias.
- Pendientes:
  - validacion visual del nuevo bloque ejecutivo en navegador real;
  - luego decidir si conviene reorganizar tambien `Hot Movers` o noticias.
- Siguiente paso sugerido:
  - refrescar `#mundo`, revisar el nuevo tablero ejecutivo y seguir luego con el pulido de portada.

## 2026-03-26 13:46:00 -03:00
- Accion: reorganizacion de la home para reducir redundancia y sumar contenido editorial.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario considero redundante el `Tablero ejecutivo` respecto de la tira superior de cotizaciones y pidio priorizar noticias financieras de mercado de capitales junto con una mejora de `Hot Movers`.
- Resultado:
  - la home conserva el monitor global como bloque principal;
  - `index.html` ya expone una nueva seccion `Noticias de mercado`;
  - `app.js` ahora dispara `loadNewsSection()` al cargar y al volver a `Mundo`;
  - `loadNewsSection()` filtra y prioriza notas vinculadas a finanzas, bonos, acciones, dolar, tasas y mercado;
  - `Hot Movers` queda limitado a una seleccion breve y con layout mas editorial;
  - se confirma la eliminacion del `Tablero ejecutivo` para evitar duplicar informacion.
- Problemas encontrados:
  - `app.js` sigue con encoding degradado, por lo que varios parches grandes fallan si se intenta editar con demasiado contexto.
- Decisiones tomadas:
  - avanzar con parches chicos y controlados en la logica viva;
  - priorizar una portada mas limpia antes de seguir afinando detalle fino de curvas.
- Pendientes:
  - validacion manual de la nueva seccion de noticias;
  - revisar si `Hot Movers` necesita una segunda pasada visual o de copy.
- Siguiente paso sugerido:
  - refrescar `#mundo` con `Ctrl + F5`, validar noticias + movers y luego decidir el siguiente bloque de producto.

## 2026-03-26 14:08:00 -03:00
- Accion: pulido de copy y jerarquia en secciones internas.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo: llevar el resto de la app a la misma altura editorial que la home, con textos mas consultivos y mejor ubicacion de fuentes.
- Resultado:
  - `Liquidez` gana una descripcion mas clara y una nota de fuente persistente;
  - se suman titulos y descripciones a `Renta fija ARS`, `Soberanos USD`, `Bonos CER` y `Corporativos en USD`;
  - cada bloque de curva ahora queda mejor contextualizado;
  - `Plazo fijo` pasa a usar `plazofijo-source`, evitando que la fuente se escriba por error en otra seccion.
- Decisiones tomadas:
  - priorizar mejoras de lectura y contexto antes de seguir tocando calculos o curvas;
  - avanzar con cambios de bajo riesgo sobre `index.html` y un ajuste puntual en `app.js`.
- Pendientes:
  - validacion manual de los nuevos encabezados y descripciones en navegador real;
  - decidir despues si conviene una segunda pasada de copy mas premium o pasar a tablas/badges.
- Siguiente paso sugerido:
  - refrescar la app, revisar las secciones internas y luego seguir con tablas y badges.

## 2026-03-26 14:28:00 -03:00
- Accion: nueva capa visual institucional inspirada en la landing de BDI.
- Archivos afectados:
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio acercar la app a la identidad visual de la landing oficial de BDI antes de pensar en publicarla y compartirla.
- Resultado:
  - la app gana un header oscuro mas alineado a marca;
  - la tira superior de cotizaciones adopta estetica institucional oscura;
  - el hero pasa a un panel negro/verde mas cercano a la landing;
  - panels, cards, wrappers y graficos usan superficies mas premium y redondeos mas consistentes;
  - la paleta pasa a sentirse mas claramente BDI y menos dashboard neutro.
- Decisiones tomadas:
  - mantener las tablas y datos legibles sobre fondos claros;
  - usar el negro institucional y el verde de marca en la capa estructural, no solo en detalles.
- Pendientes:
  - validacion manual de esta direccion visual en navegador real;
  - luego decidir si conviene una segunda pasada sobre botones, badges y tipografia.
- Siguiente paso sugerido:
  - refrescar la app y revisar la nueva identidad visual antes de preparar la guia de publicacion publica.

## 2026-03-26 14:41:00 -03:00
- Accion: ajuste fino de paleta y diferenciacion visual de bloques de home.
- Archivos afectados:
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario detecto exceso de blanco, poco contraste en la tira superior y poca separacion entre dashboard, `Hot Movers` y noticias.
- Resultado:
  - el fondo general pasa a una base `#EFEDEA`;
  - el verde principal migra a `#137247` y el turquesa a `#17BEBB`;
  - la tira superior mejora contraste para etiquetas y valores;
  - `Dashboard`, `Hot Movers` y `Noticias de mercado` ahora tienen superficies mas diferenciadas.
- Decisiones tomadas:
  - no usar el lima brillante como color estructural;
  - reservar el turquesa como acento tecnico y de separacion visual.
- Pendientes:
  - validacion manual de contraste en la barra superior;
  - decidir si el siguiente paso es otra pasada visual fina o preparar publicacion.
- Siguiente paso sugerido:
  - refrescar la home, revisar contraste y separacion de bloques, y luego avanzar con la guia de despliegue publico.

## 2026-03-26 14:55:00 -03:00
- Accion: preparacion de guia de publicacion publica y ajuste de auth para deploy.
- Archivos afectados:
  - `rendimientos-ar/netlify/functions/auth-config.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio avanzar hacia una publicacion real de la app, con link compartible y explicacion paso a paso.
- Resultado:
  - `auth-config.js` ahora tolera mejor origenes `localhost` y dominios `.netlify.app`, ademas de los dominios BDI;
  - `README.md` incorpora una guia simple de deploy con Netlify;
  - queda documentado que la opcion recomendada es publicar primero en Netlify y despues decidir dominio propio.
- Decisiones tomadas:
  - priorizar Netlify porque el proyecto ya trae `netlify.toml` y funciones serverless preparadas para ese flujo;
  - separar la publicacion publica del eventual trabajo posterior sobre dominio propio y Supabase.
- Pendientes:
  - crear repo GitHub propio si aun no existe;
  - hacer el primer deploy real en Netlify;
  - cargar variables de entorno si se quiere conservar `Mi cartera`.
- Siguiente paso sugerido:
  - explicarle al usuario como crear el repo en GitHub y conectar Netlify sin asumir conocimiento tecnico.

## 2026-03-26 15:04:00 -03:00
- Accion: reemplazo del icono de pestaÃ±a/app por isotipo BDI.
- Archivos afectados:
  - `rendimientos-ar/public/icons/icon-192.png`
  - `rendimientos-ar/public/icons/icon-512.png`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio dejar de usar el icono heredado de la app base y reemplazarlo por marca BDI visible en la pestaÃ±a del navegador y manifest.
- Resultado:
  - los iconos que consumen `index.html` y `manifest.json` ahora usan una version redimensionada del isotipo BDI;
  - no hizo falta cambiar rutas porque la app ya apuntaba a esos mismos archivos.
- Pendientes:
  - validar visualmente el nuevo icono en Chrome;
  - si el navegador sigue mostrando el anterior, limpiar cache o reabrir pestaÃ±a.
- Siguiente paso sugerido:
  - refrescar la app, comprobar el nuevo icono y luego avanzar con GitHub + Netlify paso a paso.

## 2026-03-26 15:11:00 -03:00
- Accion: ajuste del footer institucional y credito de autoria.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio explicitar `BDI Consultora, elaborado por TomÃ¡s RodrÃ­guez` antes de publicar la app.
- Resultado:
  - el footer ahora deja visible la autoria;
  - las fuentes quedan resumidas como `Fuentes consultadas`, manteniendo transparencia sobre el origen de los datos.
- Pendientes:
  - validacion visual del footer actualizado;
  - luego continuar con GitHub + Netlify.
- Siguiente paso sugerido:
  - refrescar la app, confirmar el nuevo footer y seguir con la publicacion del repo en GitHub.

## 2026-03-26 15:18:00 -03:00
- Accion: regeneracion del favicon con recorte mas cerrado.
- Archivos afectados:
  - `rendimientos-ar/public/icons/icon-192.png`
  - `rendimientos-ar/public/icons/icon-512.png`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario detecto que el isotipo BDI se veia demasiado chico en la pestaÃ±a del navegador.
- Resultado:
  - se recalcularon los limites utiles del PNG original;
  - los iconos fueron regenerados con menos margen transparente y mas presencia visual.
- Pendientes:
  - validar en Chrome si el icono ya se percibe mas grande;
  - si siguiera muy chico, considerar una version simplificada del isotipo solo para favicon.
- Siguiente paso sugerido:
  - cerrar y reabrir la pestaÃ±a o limpiar cache del icono, y luego continuar con GitHub + Netlify.
## 2026-04-01 13:56:58 -03:00
- Accion: integracion inicial del monitor BDI de obligaciones negociables dentro de la seccion `Corporativos`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-ons-data.js`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/index.html`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario agrego una app Python con logica propia para ONs y pidio readecuarla al stack actual de `rendimientos-ar`.
- Resultado:
  - se agrego una capa de datos propia en `public/bdi-ons-data.js` con el universo BDI de ONs aportado por el usuario;
  - la seccion `Corporativos` ahora consume precios live desde `/api/ons`, referencia MEP desde `/api/cotizaciones` y calcula precio USD, precio ARS, TC implicito, paridad, TIR USD, TIR ARS, duration, convexity y proximo pago;
  - la tabla principal fue reorientada a un monitor institucional BDI con resumen superior y fila clickeable;
  - el modal/calculadora de ONs ahora muestra ficha tecnica, ley, calificacion, lamina, descripcion del emisor y metricas nuevas;
  - `node --check` valido sin errores de sintaxis `rendimientos-ar/public/app.js` y `rendimientos-ar/public/bdi-ons-data.js`.
- Problemas encontrados:
  - el codigo Python original estaba hecho para `Streamlit`, por lo que no podia incrustarse directo en la web actual sin separar datos, calculos y presentacion;
  - no todos los tickers del universo heredado de `config.json` coinciden uno a uno con el subconjunto institucional aportado en `app.py`.
- Decisiones tomadas:
  - integrar la logica como capa BDI propia dentro del frontend existente en lugar de intentar embeder `Streamlit`;
  - usar el conjunto curado de ONs del usuario como monitor principal de `Corporativos`;
  - mantener como fuentes live `data912` y `cotizaciones` para no duplicar backends.
- Pendientes:
  - validar visualmente en navegador que `data912` entregue ambas puntas (`ARS` y `USD`) para todos los tickers curados;
  - revisar si conviene sumar filtros, orden por ley/calificacion o una segunda tabla con universo ampliado;
  - definir si esta misma capa debe migrarse luego a backend/serverless para reducir logica financiera en `public/app.js`.
- Siguiente paso sugerido:
  - levantar la app en local, abrir `Corporativos` y validar juntos que las metricas coincidan con la app Python original para los emisores clave.

## 2026-04-01 14:38:14 -03:00
- Accion: correccion de la seccion `Corporativos` tras validacion visual local del usuario.
- Archivos afectados:
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/ons.js`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario reporto que no aparecia el precio en pesos, que `Proximo pago` y `Vencimiento` se solapaban y que el grafico mostraba menos puntos de los esperados.
- Resultado:
  - `/api/ons` en local y en Netlify ahora devuelve tambien bonos con punta ARS, no solo tickers terminados en `D`;
  - la tabla de `Corporativos` paso a usar una envoltura propia y `table-layout: auto` para dejar espacio real a las nuevas columnas;
  - la columna de `Proximo pago` ahora puede wrappear sin pisar `Vencimiento`;
  - se mantuvo la curva tomando todos los items que entren por el monitor, por lo que al llegar mas puntas live deberian verse mas emisores en el grafico;
  - `node --check` valido sin errores `public/app.js` y `server.js`.
- Decisiones tomadas:
  - corregir primero la fuente de datos (`/api/ons`) antes de tocar mas la logica de calculo;
  - aislar los estilos de la tabla BDI de ONs para no romper otras tablas del proyecto.
- Pendientes:
  - reiniciar el servidor local para que tome el cambio de `server.js`;
  - volver a validar en navegador si ya aparecen precios ARS y mas puntos en la curva;
  - si aun faltaran emisores, revisar disponibilidad real de cotizaciones en `data912` para esos tickers.
- Siguiente paso sugerido:
  - reiniciar `npm.cmd start`, abrir `Corporativos` y confirmar si ya se destrabaron precio ARS, columnas y cantidad de puntos visibles.

## 2026-04-01 14:51:50 -03:00
- Accion: correccion del grafico de `Corporativos` para que use el mismo universo visible en la tabla.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo: el usuario confirmo que la tabla estaba bien, pero el grafico seguia mostrando menos puntos que los emisores visibles.
- Resultado:
  - se elimino la seleccion curada fija de ONs que estaba dejando afuera emisores;
  - la curva ahora toma todos los items con `duration` y `TIR` validos que entran a la tabla de `Corporativos`;
  - tambien se removio el `yDomain` fijo para evitar que algunos puntos quedaran fuera del area visible;
  - `node --check` valido sin errores `rendimientos-ar/public/bdi-charts.js`.
- Decisiones tomadas:
  - alinear explicitamente el grafico con la tabla como fuente de verdad;
  - mantener una guia de curva generica sobre el conjunto completo, en vez de una lista manual de emisores preferidos.
- Pendientes:
  - refrescar el navegador y confirmar que la cantidad de puntos visibles coincida con la cantidad de ONs listadas;
  - si hiciera falta, ajustar despues el etiquetado para mejorar legibilidad cuando haya muchos puntos.
- Siguiente paso sugerido:
  - recargar `http://localhost:3000`, ir a `Corporativos` y verificar si ahora ves todos los puntos esperados.

## 2026-04-01 14:55:44 -03:00
- Accion: ajuste fino de la curva de tendencia en `Corporativos`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo: con los puntos ya completos, la guia de tendencia seguia mostrando una forma poco fiel al conjunto real de ONs.
- Resultado:
  - se reemplazo la guia tipo `hump` para ONs por una tendencia suavizada construida sobre anclas de mediana del set real;
  - la curva ahora sigue mejor la distribucion visible de la tabla sin forzar una loma artificial;
  - `node --check` valido sin errores `rendimientos-ar/public/bdi-charts.js`.
- Decisiones tomadas:
  - priorizar una curva descriptiva y estable antes que una forma teorica prefijada;
  - mantener intactos los puntos reales y tocar solo la guia.
- Pendientes:
  - refrescar el navegador y validar visualmente si la curva ya acompana correctamente a los datos.
- Siguiente paso sugerido:
  - recargar `Corporativos` y cerrar el ajuste si la nueva tendencia ya te convence visualmente.

## 2026-04-01 14:58:24 -03:00
- Accion: correccion del punto de arranque y cierre de la curva de `Corporativos`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo: el usuario observo que la curva comenzaba en el segundo dato en vez de arrancar en el primero.
- Resultado:
  - la guia ahora se ancla explicitamente al primer punto real y al ultimo punto real del grafico;
  - se mantuvo el suavizado intermedio sobre anclas de mediana para evitar una forma quebrada;
  - `node --check` valido sin errores `rendimientos-ar/public/bdi-charts.js`.
- Pendientes:
  - refrescar el navegador y verificar si con este ajuste la curva ya resulta aceptable;
  - si no convence visualmente, la alternativa recomendada es quitar la curva y dejar solo los puntos reales.
- Siguiente paso sugerido:
  - recargar `Corporativos` y decidir si esta version ya sirve o si conviene eliminar la guia por completo.

## 2026-04-01 14:59:47 -03:00
- Accion: eliminacion de la curva guia en el grafico de `Corporativos`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo: el usuario indico explicitamente que la curva no estaba quedando bien y pidio quitarla.
- Resultado:
  - el grafico de `Corporativos` ahora deja solo los puntos reales de los emisores, sin linea de tendencia;
  - se ajusto el caption para reflejar que el grafico muestra solo los datos visibles de la tabla;
  - `node --check` valido sin errores `rendimientos-ar/public/bdi-charts.js`.
- Decisiones tomadas:
  - priorizar una visualizacion honesta y limpia por encima de una curva decorativa poco confiable.
- Pendientes:
  - refrescar el navegador y confirmar que el grafico ya se ve como esperaba el usuario.
- Siguiente paso sugerido:
  - recargar `Corporativos` y validar el resultado final sin curva.

## 2026-04-06 10:59:12 -03:00
- Accion: ampliacion de `Liquidez` con `Duration mod.` y agregado de selector de idioma `ES / EN`.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/bdi-overrides.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio sumar `Duration Modificada` en la parte de liquidez y una solapa para poner la pagina en ingles.
- Resultado:
  - se agrego un toggle `ES / EN` en el header que guarda preferencia en `localStorage` y recarga la interfaz en el idioma elegido;
  - se agregaron traducciones estaticas principales de navegacion, hero, secciones clave y footer mediante `bdi-overrides.js`;
  - `Liquidez` ahora intenta leer `Modified Duration` desde la ficha CAFCI de cada FCI y mostrarla en las tarjetas cuando ese dato esta disponible;
  - las tarjetas dinamicas de liquidez/especiales ahora adaptan etiquetas base (`TNA/APR`, `Limite/Limit`, `Patrimonio/AUM`, etc.) segun idioma;
  - `node --check` valido sin errores `rendimientos-ar/public/app.js` y `rendimientos-ar/public/bdi-overrides.js`.
- Problemas encontrados:
  - la estructura exacta del dato de `Modified Duration` en CAFCI no estaba documentada localmente, por lo que la extraccion se implemento con una busqueda robusta por claves y etiquetas relacionadas;
  - no toda la app completa queda traducida al 100% en este bloque, pero si la capa principal visible y la parte dinamica de liquidez solicitada.
- Decisiones tomadas:
  - resolver el cambio de idioma con recarga completa para simplificar consistencia entre textos estaticos y tarjetas dinamicas;
  - mostrar `Duration mod.` en FCIs solo cuando la ficha fuente realmente la exponga.
- Pendientes:
  - validar en navegador que algunos FCIs efectivamente muestren `Duration mod.` si CAFCI devuelve el dato;
  - revisar si queres extender la traduccion a mas modales, tablas o mensajes secundarios de la app.
- Siguiente paso sugerido:
  - refrescar la app, probar `ES / EN` en el header y revisar `Liquidez` para confirmar si la nueva metrica aparece en los fondos.

## 2026-04-06 11:09:02 -03:00
- Accion: agregado de columnas `Duration` y `Duration Mod.` en `Renta fija ARS` y `Bonos CER`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario aclaro que la `Duration Modificada` que queria sumar correspondia a las tablas de `Renta fija ARS` y `Bonos CER`, no a la parte de FCIs.
- Resultado:
  - `Renta fija ARS` ahora muestra `Duration` y `Duration Mod.` como columnas nuevas en la tabla;
  - `Bonos CER` ahora muestra `Duration Mod.` al lado de la columna `Duration` existente;
  - la formula aplicada fue `Duration Mod. = Duration / (1 + tasa)`, usando la `TIR` de cada instrumento como tasa de referencia;
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Decisiones tomadas:
  - para `Renta fija ARS`, la `Duration` se aproxima con tiempo al vencimiento en anios dado que la tabla actual trabaja con flujo final y TIR de instrumentos capitalizables;
  - en `CER`, se reutiliza la `Duration` Macaulay ya calculada y se deriva la `Duration Mod.` sobre esa base.
- Pendientes:
  - refrescar la app y validar visualmente que las nuevas columnas entren bien en desktop y mobile.
- Siguiente paso sugerido:
  - revisar `Renta fija ARS` y `Bonos CER` en navegador para confirmar que las nuevas columnas se lean bien y que el usuario este conforme con la convencion usada.

## 2026-04-06 11:20:00 -03:00
- Accion: ampliacion de la capa de idioma ingles para textos residuales y noticias.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/bdi-overrides.js`
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/news.js`
  - `LOG.md`
- Motivo: el usuario detecto varios textos que seguian apareciendo en espanol al activar `EN`, incluyendo descripciones, fuentes, secciones soberanas/corporativas y noticias.
- Resultado:
  - se agregaron traducciones adicionales en frontend para categorias de mercado (`Crypto`, descripcion de activos digitales, fuente Yahoo, textos de soberanos y caption corporativo);
  - la seccion de noticias ahora pide `/api/news?lang=en` cuando la interfaz esta en ingles;
  - el servidor local y la funcion de Netlify de noticias ahora seleccionan un feed de Google News en ingles cuando reciben `lang=en`;
  - se tradujeron textos visibles de soberanos USD y de la seccion/chart relacionados que aun quedaban hardcodeados en espanol.
- Problemas encontrados:
  - la terminal se volvio inusualmente lenta y no permitio cerrar la verificacion final de sintaxis en esta pasada.
- Decisiones tomadas:
  - priorizar la correccion funcional de la capa de idioma y del feed de noticias aunque la verificacion automatica final quedara pendiente por el entorno.
- Pendientes:
  - refrescar la app en `EN` y revisar especificamente los ejemplos reportados por el usuario;
  - si todavia quedan textos residuales, hacer una ultima pasada de limpieza sobre labels menores o mensajes de error secundarios.
- Siguiente paso sugerido:
  - abrir la app en ingles y recorrer `Mercado`, `Soberanos USD`, `Corporativos` y `Noticias` para confirmar que esta tanda ya corrige los casos reportados.

## 2026-04-06 11:55:00 -03:00
- Accion: segunda pasada de traduccion EN sobre textos estaticos y dinamicos residuales.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/bdi-overrides.js`
  - `LOG.md`
- Motivo: el usuario reporto que seguian visibles en espanol multiples titulos, descripciones, bullets, labels de cotizaciones, tablas de ARS/CER/Corporativos y textos del bloque `Mi cartera` al activar la interfaz en ingles.
- Resultado:
  - se ampliaron claves bilingues en `app.js` para heroes, cotizaciones, mensajes de carga/error, tabla de `Renta fija ARS`, `Bonos CER` y `Corporativos`;
  - se tradujeron labels del strip de cotizaciones (`Official dollar`, `MEP`, `country risk`) y varios mensajes de UI que seguian hardcodeados;
  - se cubrieron en `bdi-overrides.js` los textos estaticos de briefing, shortcuts, `Hot Movers`, `Market news`, `Renta fija ARS`, `CER`, `Soberanos`, `Corporativos` y `Mi cartera`;
  - se tradujeron tambien labels visibles del modulo de portfolio para tipos de activo.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`;
  - `node --check` valido sin errores `rendimientos-ar/public/bdi-overrides.js`.
- Decisiones tomadas:
  - mantener la traduccion de noticias via `/api/news?lang=en`; si el server local estaba levantado antes del cambio backend previo, va a requerir reinicio para que el feed en ingles impacte en navegador.
- Pendientes:
  - refrescar la app en `EN` y revisar si queda algun texto residual en espanol dentro de modales/calculadoras secundarias;
  - si las noticias siguen saliendo en espanol, reiniciar el server local para tomar la version nueva de `/api/news`.
- Siguiente paso sugerido:
  - hacer hard refresh en ingles y validar especialmente `Mercado`, `Renta fija ARS`, `Bonos CER`, `Soberanos USD`, `Corporativos` y `Mi cartera`.

## 2026-04-06 12:35:00 -03:00
- Accion: incorporacion de nueva solapa de optimizador de carteras.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/bdi-overrides.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario compartio un optimizador de carteras en Python y pidio integrarlo a la web existente como una nueva solapa.
- Resultado:
  - se agrego una nueva pestana principal `Optimizador` en la navegacion;
  - se incorporo una interfaz nueva con inputs para tickers, anios, tasa libre de riesgo, retorno objetivo y peso minimo;
  - se implemento un motor Markowitz adaptado a `JavaScript` que reutiliza `/api/mundo` para traer historicos diarios desde Yahoo Finance;
  - el modulo ahora renderiza:
    - espacio riesgo-retorno con portfolios aleatorios;
    - frontera eficiente aproximada;
    - portfolio de maximo Sharpe;
    - portfolio de minima volatilidad;
    - portfolio cercano a retorno objetivo si se informa;
    - tabla de pesos optimos;
    - series de rendimientos acumulados;
    - tabla de CAGR;
    - matriz de correlacion.
- Decisiones tomadas:
  - no se embebio el codigo Python directamente porque la arquitectura actual del sitio es `HTML/CSS/JS + Node/Netlify`;
  - la optimizacion se adapto a frontend con muestreo aleatorio sobre el simplex en lugar de depender de `scipy` en runtime.
- Pendientes:
  - validar visualmente la nueva solapa en navegador;
  - revisar performance con universos de tickers grandes y ajustar cantidad de portfolios aleatorios si hiciera falta;
  - eventualmente extender la traduccion EN completa de esta nueva solapa.
- Siguiente paso sugerido:
  - levantar la app, abrir `Optimizador`, correr una cartera chica de prueba y verificar que graficos, pesos y tablas carguen correctamente.

## 2026-04-06 12:50:00 -03:00
- Accion: ajuste de visibilidad y render del optimizador de carteras.
- Archivos afectados:
  - endimientos-ar/public/index.html`r
  - endimientos-ar/public/styles.css`r
  - endimientos-ar/public/app.js`r
  - LOG.md`r
- Motivo: el usuario reporto que los graficos del optimizador no se veian y que los contenedores quedaban visibles en blanco antes de ejecutar una corrida.
- Resultado:
  - las secciones de resultados del optimizador ahora nacen ocultas y solo se muestran despues de una corrida valida;
  - se agregaron alturas explicitas de canvas para los charts del optimizador;
  - el render de Chart.js se difiere al siguiente frame para asegurar que los contenedores ya esten visibles antes de dibujar.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js.
- Siguiente paso sugerido:
  - refrescar la pagina, correr el optimizador otra vez y validar que aparezcan el scatter de frontera y los dos graficos de rendimientos acumulados.

## 2026-04-06 13:05:00 -03:00
- Accion: segundo ajuste de render del optimizador de carteras.
- Archivos afectados:
  - endimientos-ar/public/app.js`r
  - endimientos-ar/public/styles.css`r
  - LOG.md`r
- Motivo: el usuario seguia sin ver las secciones Espacio de portfolios y Rendimientos acumulados luego de correr el optimizador.
- Resultado:
  - se fijo altura explicita para los charts del optimizador;
  - se agrego una espera corta antes de renderizar Chart.js para asegurar que los contenedores ya esten visibles;
  - se fuerza visibilidad de las secciones de frontera y performance al momento de dibujar;
  - se fija altura directa sobre los canvas antes de instanciar los charts.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js.
- Siguiente paso sugerido:
  - refrescar la pagina y volver a correr una optimizacion corta para validar que ya aparezcan tanto el scatter riesgo-retorno como los dos charts acumulados.

## 2026-04-06 13:15:00 -03:00
- Accion: tercer ajuste de visibilidad/render del optimizador.
- Archivos afectados:
  - endimientos-ar/public/app.js`r
  - LOG.md`r
- Motivo: el usuario seguia sin ver las secciones Espacio de portfolios y Rendimientos acumulados luego del ajuste anterior.
- Resultado:
  - se agrego una capa explicita para forzar display:block sobre las secciones del optimizador cuando hay resultados;
  - se agrego preparacion explicita de canvas con ancho/alto antes de instanciar los charts;
  - se fuerza tambien altura sobre el contenedor padre de cada canvas para evitar renders en cero.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js.
- Siguiente paso sugerido:
  - hacer hard refresh del navegador y volver a correr el optimizador; si aun no aparecen, el siguiente paso debe ser inspeccionar en vivo la consola del browser o dejar un fallback textual visible dentro de esas secciones para diagnosticar el punto exacto de falla.

## 2026-04-06 13:25:00 -03:00
- Accion: cambio de estrategia visual para las secciones de charts del optimizador.
- Archivos afectados:
  - endimientos-ar/public/index.html`r
  - endimientos-ar/public/styles.css`r
  - endimientos-ar/public/app.js`r
  - LOG.md`r
- Motivo: el usuario seguia sin ver Espacio de portfolios y Rendimientos acumulados, por lo que convenia evitar ocultar por completo esas secciones.
- Resultado:
  - las secciones de charts del optimizador quedan siempre visibles con titulo y descripcion;
  - antes de correr una optimizacion muestran un placeholder textual en lugar de un bloque blanco;
  - al ejecutar una corrida valida, el placeholder se oculta y aparece el contenedor real de charts.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js.
- Siguiente paso sugerido:
  - refrescar la pagina y validar primero que aparezcan ambas secciones con placeholder, y luego correr el optimizador para confirmar si el placeholder se reemplaza por los charts.

## 2026-04-06 13:40:00 -03:00
- Accion: reemplazo de charts del optimizador por render SVG directo.
- Archivos afectados:
  - endimientos-ar/public/index.html`r
  - endimientos-ar/public/styles.css`r
  - endimientos-ar/public/app.js`r
  - LOG.md`r
- Motivo: el usuario seguia viendo las secciones del optimizador pero sin graficos luego de correr una optimizacion.
- Resultado:
  - Espacio de portfolios ahora se renderiza como SVG scatter/line directo en DOM;
  - Rendimientos acumulados ahora se renderiza como dos line charts SVG directos en DOM;
  - se elimino la dependencia practica de canvas/Chart.js para estos bloques especificos del optimizador, reduciendo riesgo de fallas silenciosas de render.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js.
- Siguiente paso sugerido:
  - refrescar la pagina y volver a correr el optimizador para confirmar que ahora los tres graficos SVG aparezcan correctamente.

## 2026-04-06 13:55:00 -03:00
- Accion: mejora visual del optimizador de carteras.
- Archivos afectados:
  - endimientos-ar/public/app.js`r
  - endimientos-ar/public/styles.css`r
  - LOG.md`r
- Motivo: el usuario pidio sumar referencias explicitas (Frontera eficiente, Max Sharpe, Min Volatilidad, CML) y corregir el solapamiento entre la leyenda de empresas y la matriz de correlacion.
- Resultado:
  - el grafico principal del optimizador ahora dibuja y etiqueta tambien la CML;
  - se agrego una leyenda clara para portfolios aleatorios, frontera eficiente, CML, max Sharpe, min volatilidad y retorno objetivo;
  - los graficos de rendimientos acumulados ahora renderizan dentro de un shell con area de grafico y leyenda separadas, evitando que la leyenda desborde y se pise con la matriz.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js.
- Siguiente paso sugerido:
  - refrescar la pagina y correr el optimizador para validar lectura del grafico principal y verificar que ya no haya solapamientos en la seccion inferior.

## 2026-04-06 14:10:00 -03:00
- Accion: ajuste de proporciones y escalado del optimizador.
- Archivos afectados:
  - endimientos-ar/public/app.js`r
  - endimientos-ar/public/styles.css`r
  - LOG.md`r
- Motivo: el usuario reporto que los graficos del optimizador se veian raros, deformados y con un ajuste visual poco consistente dentro de la pagina.
- Resultado:
  - se removio el estiramiento forzado de contenedores del optimizador;
  - los SVG ahora usan preserveAspectRatio para conservar proporciones reales;
  - se fijaron viewBox y margenes mas estables para el scatter principal y los line charts;
  - se ajusto el layout para que las leyendas y el area del grafico respiren mejor y no deformen la lectura.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js.
- Siguiente paso sugerido:
  - refrescar la pagina y volver a correr el optimizador para evaluar si el grafico principal y los acumulados ahora se ven proporcionados y mas limpios.

## 2026-04-06 14:20:00 -03:00
- Accion: agregado de referencia visual de Sharpe Ratio en el grafico principal del optimizador.
- Archivos afectados:
  - endimientos-ar/public/app.js`r
  - LOG.md`r
- Motivo: el usuario indico que el Sharpe Ratio no aparecia en el primer grafico del optimizador.
- Resultado:
  - se agrego una escala visual de Sharpe Ratio dentro del SVG principal;
  - la referencia muestra gradiente de color y extremos minimo/maximo para interpretar el color de los portfolios aleatorios.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js.
- Siguiente paso sugerido:
  - refrescar la pagina y correr el optimizador para validar que la escala de Sharpe quede visible y no interfiera con el resto de la lectura del grafico.

## 2026-04-06 14:40:00 -03:00
- Accion: correccion del nucleo de optimizacion para frontera eficiente y CML.
- Archivos afectados:
  - endimientos-ar/public/app.js`r
  - LOG.md`r
- Motivo: el usuario detecto que la frontera eficiente no se estaba graficando correctamente y que la CML se veia inconsistente respecto del script original en Python.
- Resultado:
  - Max Sharpe, Min Vol, Retorno objetivo y Frontera eficiente dejaron de salir de una aproximacion sobre portfolios aleatorios;
  - se implemento una optimizacion numerica con proyeccion al simplex para pesos long-only y objetivo de retorno;
  - la frontera ahora se construye a partir de soluciones de minima varianza para una grilla de retornos objetivo;
  - la CML ahora se dibuja usando el portfolio de maximo Sharpe derivado de esa frontera y arranca en volatilidad cero.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js.
- Siguiente paso sugerido:
  - refrescar la pagina y comparar nuevamente el primer grafico con la referencia Python para validar forma de frontera y pendiente de la CML.

## 2026-04-06 14:55:00 -03:00
- Accion: redisenio visual de la seccion Rendimientos acumulados del optimizador.
- Archivos afectados:
  - endimientos-ar/public/app.js`r
  - endimientos-ar/public/styles.css`r
  - LOG.md`r
- Motivo: el usuario pidio mejorar esteticamente la lectura de Rendimientos acumulados, que se veia muy cargada y con poca jerarquia visual.
- Resultado:
  - Activos ahora resalta solo las series mas relevantes y deja el resto del universo en segundo plano;
  - Portfolios ahora prioriza la lectura con etiquetas al final de cada linea en lugar de una leyenda pesada debajo;
  - se agregaron subtitulos, chips de leyenda mas limpios y una caja grafica con mejor atmosfera visual;
  - se mejoro la jerarquia visual entre el chart y sus referencias para hacer la seccion mas institucional y menos ruidosa.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js.
- Siguiente paso sugerido:
  - refrescar la pagina y validar la nueva lectura de Activos y Portfolios, en especial si la simplificacion del chart izquierdo resulta mas util para el usuario.

## 2026-04-06 15:10:00 -03:00
- Accion: redisenio visual de la matriz de correlacion del optimizador.
- Archivos afectados:
  - endimientos-ar/public/app.js`r
  - endimientos-ar/public/styles.css`r
  - LOG.md`r
- Motivo: el usuario pidio que la matriz se vea mas cercana a una referencia estilo heatmap clasico, ya que la version anterior se percibia visualmente pobre.
- Resultado:
  - la matriz dejo de renderizarse como grilla de divs y ahora se dibuja como un heatmap SVG;
  - se agregaron labels de ejes mas limpios, valores centrados por celda y barra lateral de color;
  - la paleta se acerco a una escala roja clasica de correlacion positiva, similar a la referencia compartida por el usuario.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js.
- Siguiente paso sugerido:
  - refrescar la pagina y validar si la nueva matriz ya se percibe alineada con la referencia visual deseada.

## 2026-04-06 15:35:00 -03:00
- Accion: ajuste fuerte del primer grafico del optimizador para acercarlo a la referencia Python.
- Archivos afectados:
  - endimientos-ar/public/app.js`r
  - LOG.md`r
- Motivo: el usuario comparo el scatter de la web con la salida de Python y detecto diferencias marcadas en encuadre, densidad, CML y lectura general del grafico.
- Resultado:
  - se aumento significativamente la densidad de portfolios aleatorios;
  - se ajusto el encuadre usando percentiles del universo simulado para reducir espacio muerto y acercar la lectura a Python;
  - la frontera eficiente ahora se dibuja con una curva mas suave;
  - la CML se renderiza en rojo, recortada al rango util del grafico;
  - se incorporo colorbar vertical de Sharpe y leyenda interna estilo mas cercano al grafico de referencia.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js.
- Siguiente paso sugerido:
  - refrescar la pagina y comparar nuevamente el primer grafico con la referencia Python para evaluar si la diferencia ya se redujo de forma util.

## 2026-04-06 16:05:00 -03:00
- Accion: ajuste de CML y ampliacion de traducciones EN del optimizador.
- Archivos afectados:
  - endimientos-ar/public/app.js`r
  - endimientos-ar/public/bdi-overrides.js`r
  - LOG.md`r
- Motivo: el usuario indico que la recta CML se iba del grafico y que la nueva seccion del optimizador seguia mostrando muchos textos en espanol al activar ingles.
- Resultado:
  - la CML ahora se recorta al rango util del grafico en lugar de extenderse visualmente fuera de escala;
  - se agregaron claves bilingues para mensajes, metricas, ejes, labels y textos del optimizador;
  - se ampliaron los overrides estaticos para titulos y descripciones de la seccion del optimizador en EN.
- Verificacion:
  - 
ode --check valido sin errores endimientos-ar/public/app.js;
  - 
ode --check valido sin errores endimientos-ar/public/bdi-overrides.js.
- Siguiente paso sugerido:
  - refrescar la pagina, volver a correr el optimizador y validar tanto el recorte de CML como la interfaz en ingles dentro de toda la seccion.

## 2026-04-07 10:35:00 -03:00
- Accion: incorporacion de una nueva solapa de calculadora de interes compuesto.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/bdi-overrides.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio sumar una herramienta nueva para proyectar inversion inicial, aportes mensuales, plazo, tasa, rango de varianza y frecuencia de capitalizacion, con grafico comparativo entre trayectoria sin invertir e invertida.
- Resultado:
  - se agrego una nueva solapa principal de `Interes compuesto` en la navegacion superior;
  - se incorporo una interfaz por pasos para capital inicial, contribucion, plazo, tasa, varianza y frecuencia de capitalizacion;
  - se implemento una simulacion mensual con escenarios de tasa baja, base y alta;
  - se agrego un grafico SVG propio para comparar `sin invertir` versus `invertido`, incluyendo banda de sensibilidad por tasa;
  - se sumo una tabla de desglose final y una capa bilingue ES/EN para la nueva seccion.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`;
  - `node --check` valido sin errores `rendimientos-ar/public/bdi-overrides.js`.
- Siguiente paso sugerido:
  - refrescar la app, probar la nueva solapa con distintos supuestos y validar visualmente tanto el grafico como la traduccion al ingles.

## 2026-04-07 10:55:00 -03:00
- Accion: correccion del render del grafico de interes compuesto.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario reporto que la calculadora mostraba el resumen numerico pero no el grafico ni el desglose final.
- Resultado:
  - se corrigio el formato de puntos enviado al generador de paths SVG;
  - el grafico comparativo ahora puede renderizar correctamente las trayectorias `sin invertir`, `tasa baja`, `tasa base` y `tasa alta`;
  - al evitar la excepcion de render, tambien vuelve a aparecer el bloque de desglose final.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - hacer refresh completo del navegador y validar que aparezcan tanto el grafico como la tabla final de escenarios.

## 2026-04-07 11:10:00 -03:00
- Accion: mejora estetica del grafico de interes compuesto.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario pidio potenciar visualmente el chart, especialmente para evitar solapes en el eje Y y mejorar la lectura general.
- Resultado:
  - se amplio el margen izquierdo del SVG para dar mas aire al eje Y;
  - los labels monetarios del eje Y pasaron a formato compacto en `K/M`, reduciendo ruido y solapes;
  - se agregaron marcadores y etiquetas finales sobre las lineas principales para mejorar la jerarquia visual;
  - el chart queda mas limpio y con lectura mas institucional.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar la pagina y validar si el nuevo balance del eje Y y las etiquetas finales ya resultan comodos en desktop y mobile.

## 2026-04-07 11:22:00 -03:00
- Accion: ajuste de encuadre y leyenda del grafico de interes compuesto.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario pidio centrar los labels debajo del grafico y reducir el espacio blanco del fondo sin modificar el grafico en si.
- Resultado:
  - se redujo el margen interno del SVG para que el area util gane presencia;
  - se ajusto el marco visual del chart para que no quede tan ancho ni vacio;
  - la leyenda inferior quedo centrada justo debajo del grafico;
  - se mantuvo intacta la logica y la estructura principal de la visualizacion.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`;
  - `node --check` valido sin errores `rendimientos-ar/public/bdi-overrides.js`.
- Siguiente paso sugerido:
  - refrescar la pagina y validar si el nuevo encuadre ya se percibe mas compacto y equilibrado.

## 2026-04-07 11:34:00 -03:00
- Accion: ajuste de proporcion del marco del grafico y jerarquia visual de `Desglose final`.
- Archivos afectados:
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario pidio reducir el ancho visual del marco del chart y hacer que el bloque `Desglose final` no pase desapercibido debajo del grafico.
- Resultado:
  - se acoto el ancho util del bloque del grafico y se hizo menos panoramico para que el encuadre resulte mas proporcionado;
  - el chart ahora queda centrado dentro de un contenedor visualmente mas compacto;
  - `Desglose final` paso a tener un tratamiento de seccion destacada, con fondo propio, borde suave y un encabezado mas visible.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar la pagina y validar si el nuevo balance entre grafico y desglose ya se siente natural dentro de la seccion.

## 2026-04-07 12:05:00 -03:00
- Accion: incorporacion inicial de una nueva solapa `Heatmap USA` estilo Finviz.
- Archivos afectados:
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/bdi-overrides.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio sumar una visualizacion tipo Finviz usando datos de Yahoo Finance, avanzando de a poco con una primera version funcional.
- Resultado:
  - se agrego una nueva solapa principal `Heatmap USA`;
  - se incorporo un endpoint `/api/heatmap` para traer precio, variacion diaria y market cap desde Yahoo sobre un universo curado de large caps;
  - se agrego version serverless equivalente en Netlify;
  - se implemento un treemap SVG agrupado por sector, con tamaÃ±o por market cap y color por variacion diaria;
  - se sumaron traducciones base ES/EN y controles de refresh.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`;
  - `node --check` valido sin errores `rendimientos-ar/public/bdi-overrides.js`;
  - `node --check` valido sin errores `rendimientos-ar/server.js`;
  - `node --check` valido sin errores `rendimientos-ar/netlify/functions/heatmap.js`.
- Siguiente paso sugerido:
  - levantar la app, abrir `Heatmap USA` y validar esta primera version para luego mejorar densidad, industria y jerarquia visual.

## 2026-04-07 12:40:00 -03:00
- Accion: correccion operativa del endpoint `/api/heatmap`.
- Archivos afectados:
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `LOG.md`
- Motivo: el usuario reporto primero un `404` y luego se detecto que Yahoo devolvia `401` sobre el endpoint batch usado para quotes masivas.
- Resultado:
  - se confirmo que el `404` venia de un proceso `node` viejo que seguia escuchando en el puerto 3000;
  - se reemplazo ese proceso por una instancia fresca del server local;
  - se rehizo el backend del heatmap para dejar de depender del endpoint batch bloqueado por Yahoo;
  - ahora el heatmap usa cotizacion por ticker via endpoint `chart`, que responde correctamente, y combina eso con pesos curados de market cap para el treemap;
  - validacion final local: `curl http://localhost:3000/api/heatmap` devolvio `200 OK` con payload de datos.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/server.js`;
  - `node --check` valido sin errores `rendimientos-ar/netlify/functions/heatmap.js`;
  - prueba HTTP local exitosa sobre `/api/heatmap`.
- Siguiente paso sugerido:
  - refrescar la pagina y validar el treemap en la nueva solapa, para luego seguir con mejoras visuales hacia una lectura mas cercana a Finviz.

## 2026-04-07 12:58:00 -03:00
- Accion: mejora estetica fuerte del treemap `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario mostro que la primera composicion del heatmap se veia visualmente muy pobre, con columnas finitas, labels solapados y poca legibilidad general.
- Resultado:
  - se reemplazo la distribucion lineal simple por una composicion mas equilibrada en dos franjas de sectores;
  - dentro de cada sector ahora hay agrupacion por industria antes de dibujar tickers;
  - se agregaron umbrales de visibilidad para ticker, variacion e industria, evitando texto forzado en cajas diminutas;
  - la lectura general del mapa ahora prioriza proporcion y jerarquia visual antes que mostrar todos los labels sin filtro.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar la pagina y revisar esta segunda version del heatmap, para luego ajustar paleta, densidad y tamanos de fuente hacia un look todavia mas cercano a Finviz.

## 2026-04-07 13:18:00 -03:00
- Accion: segunda pasada estetica del `Heatmap USA` y aclaracion de fuente de datos.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario pidio seguir mejorando la estetica y consulto si los datos de Yahoo podian estar mal.
- Resultado:
  - se paso a una paleta mas sobria y cercana a terminal/Finviz, evitando verdes y rojos excesivamente chillones;
  - los sectores ahora se distribuyen en tres filas para reducir compresion lateral;
  - se mejoro el criterio de visibilidad de labels para ticker, variacion, industria y encabezados de sector;
  - se reforzo el marco visual oscuro del mapa y la leyenda para que todo el bloque se lea como una pieza unificada;
  - se aclaro en la fuente que precio y variacion diaria vienen de Yahoo, mientras que el tamaÃ±o relativo por market cap sigue siendo curado en esta primera version.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`;
  - `node --check` valido sin errores `rendimientos-ar/server.js`.
- Siguiente paso sugerido:
  - refrescar la pagina y validar esta nueva estetica para luego decidir si conviene avanzar hacia una tercera pasada aun mas cercana a Finviz, o empezar a afinar los pesos relativos del universo.

## 2026-04-08 00:24:00 -03:00
- Accion: preparacion de migracion del heatmap hacia proveedor de datos mas robusto.
- Archivos afectados:
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio preparar la migracion para que los datos del heatmap sean lo mas realistas posible antes de seguir refinando la estetica.
- Resultado:
  - se implemento arquitectura dual para el heatmap: `Polygon` si existe `POLYGON_API_KEY`, o fallback a Yahoo si no esta configurado;
  - se agrego cache en memoria para referencia corporativa del heatmap cuando se usa Polygon;
  - el frontend ahora muestra una fuente distinta segun el proveedor realmente usado;
  - se documento en README que hoy el fallback usa Yahoo + escala curada y que el salto a Polygon ya esta preparado.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/server.js`;
  - `node --check` valido sin errores `rendimientos-ar/netlify/functions/heatmap.js`;
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - validar sintaxis y reiniciar el server local para que el heatmap quede listo para detectar `POLYGON_API_KEY` cuando se configure.

## 2026-04-08 00:56:00 -03:00
- Accion: activacion real de la migracion del heatmap con proveedor hibrido.
- Archivos afectados:
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario compartio una nueva `POLYGON_API_KEY` y pidio que el heatmap use datos lo mas realistas posible.
- Resultado:
  - se verifico que la nueva key es valida para endpoints de referencia de Polygon, pero no tiene entitlement para snapshots de mercado en tiempo real;
  - se adapto el heatmap para usar un esquema hibrido: `Polygon` aporta market cap y metadata corporativa, mientras `Yahoo Finance` mantiene precio y variacion diaria;
  - el frontend ahora distingue correctamente la fuente `polygon-reference+yahoo` y la muestra de forma explicita en la seccion;
  - se corrigio la carga local de `.env` para que la key del proyecto sobreescriba variables de entorno viejas del sistema y no dispare falsos `401`;
  - con esta combinacion el peso relativo de los bloques queda mas realista sin romper el funcionamiento local ni el fallback existente.
- Verificacion:
  - queda pendiente reiniciar el server local y validar `/api/heatmap` en ejecucion con la configuracion actual.
- Siguiente paso sugerido:
  - reiniciar la app local, verificar que el endpoint devuelva `provider: polygon-reference+yahoo` y luego retomar el refinamiento estetico del mapa.

## 2026-04-08 01:18:00 -03:00
- Accion: tercera pasada estetica del `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario pidio seguir mejorando la estetica del heatmap mientras se pospone la validacion final de la migracion de datos.
- Resultado:
  - se ajusto la paleta para acercarla a un look mas sobrio tipo terminal/Finviz y reducir tonos demasiado brillantes;
  - se reforzaron headers de sector e industria con mas jerarquia, barras superiores mas limpias y share visual por sector;
  - los tiles ahora tienen mejor contraste, un highlight sutil y textos con mejor legibilidad sobre fondos intensos;
  - el contenedor general paso a una presentacion mas oscura y premium, con mejor profundidad visual y una leyenda mas integrada.
- Verificacion:
  - queda pendiente refresh visual en navegador para validar el resultado en pantalla.
- Siguiente paso sugerido:
  - revisar el heatmap en la pagina y decidir un ultimo ajuste fino sobre spacing, tipografia y densidad de labels.

## 2026-04-08 01:31:00 -03:00
- Accion: cuarta pasada estetica del `Heatmap USA` enfocada en densidad y composicion.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario pidio seguir mejorando el mapa al ver que todavia se sentia pesado y poco refinado.
- Resultado:
  - se redistribuyeron los sectores en cuatro filas para balancear mejor el mapa y evitar una franja superior excesivamente dominante;
  - se aumentaron los espacios entre sectores, industrias y tiles para que el heatmap respire mejor;
  - se endurecieron los umbrales de labels para esconder texto en bloques chicos y reducir ruido visual;
  - se suavizaron headers, shares de sector y leyenda para un look mas limpio y menos cargado.
- Verificacion:
  - queda pendiente validacion visual final en navegador luego de refrescar la pagina.
- Siguiente paso sugerido:
  - probar el heatmap y, si hace falta, ajustar solo microdetalles de paleta o proporciones.

## 2026-04-08 01:45:00 -03:00
- Accion: agregado de tooltip hover al `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario pidio poder pasar el mouse sobre el grafico para ver informacion detallada por activo.
- Resultado:
  - se agrego un tooltip flotante sobre los bloques del heatmap;
  - al hacer hover ahora se muestran ticker, nombre, precio, variacion diaria, sector, industria y market cap;
  - el tooltip sigue al mouse dentro del contenedor y no ensucia el mapa con labels permanentes extra.
- Verificacion:
  - queda pendiente refresh visual para confirmar el comportamiento en navegador.
- Siguiente paso sugerido:
  - probar el hover y, si hace falta, ajustar el contenido o la posicion del tooltip.

## 2026-04-08 01:57:00 -03:00
- Accion: refinamiento estetico fino del `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario compartio la vista actual y pidio seguir puliendo la presentacion visual del mapa.
- Resultado:
  - se suavizo la paleta para un look mas maduro y cercano a terminal institucional;
  - se aligeraron los headers de sector e industria para que no compitan tanto con los activos;
  - se mejoro el frame general y la leyenda para que el bloque se sienta mas premium;
  - se agrego un hover mas elegante sobre tiles para reforzar interactividad sin ensuciar el layout.
- Verificacion:
  - `node --check` queda como validacion pendiente inmediata sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar el heatmap y decidir si conviene un ultimo ajuste de tipografia o si ya pasamos a enriquecer datos del tooltip.

## 2026-04-08 02:09:00 -03:00
- Accion: cambio de layout interno del `Heatmap USA` para bloques mas cuadrados.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario pidio que dentro de cada sector los bloques mantengan proporciones mas cercanas a cuadrados y no se deformen tanto en rectangulos largos.
- Resultado:
  - se agrego una implementacion `squarified treemap` para el acomodo interno del mapa;
  - industrias y activos ahora se distribuyen con una logica que privilegia proporciones mas balanceadas;
  - esto reduce tiras largas y mejora la lectura visual dentro de cada sector.
- Verificacion:
  - queda pendiente `node --check` sobre `rendimientos-ar/public/app.js` y validacion visual en navegador.
- Siguiente paso sugerido:
  - refrescar el heatmap y evaluar si alcanza con este layout o si conviene ajustar tambien la distribucion de sectores.

## 2026-04-08 02:18:00 -03:00
- Accion: correccion del layout interno del `Heatmap USA` tras resultado visual deficiente.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el cambio anterior hacia `squarified treemap` genero franjas excesivamente largas y empeoro la lectura del mapa.
- Resultado:
  - se retiro la estrategia anterior;
  - se implemento un layout binario balanceado para industrias y activos, buscando recuperar proporciones mas razonables sin volver al comportamiento inicial;
  - el objetivo de este ajuste es mantener mejor la relacion visual entre tamanos y evitar tiras horizontales extremas.
- Verificacion:
  - queda pendiente `node --check` y refresh visual en navegador.
- Siguiente paso sugerido:
  - refrescar el heatmap y verificar si esta variante recupera una composicion mas natural.

## 2026-04-08 02:31:00 -03:00
- Accion: mejora de realismo del fallback Yahoo para `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio avanzar con la recomendacion de corto plazo para traer datos mas reales desde Yahoo Finance.
- Resultado:
  - se reemplazo el enfoque ticker por ticker basado solo en `chart` por un `batch quote` de Yahoo;
  - el heatmap ahora puede tomar desde Yahoo, en bloque, `market cap`, `price`, `change %` y `name`;
  - el fallback local y la funcion de Netlify quedaron alineados con esta mejora;
  - se reduce la dependencia de market caps curados y mejora la fidelidad general del mapa aun sin un plan premium de Polygon.
- Verificacion:
  - queda pendiente validar sintaxis y reiniciar el server local para confirmar la respuesta actualizada de `/api/heatmap`.
- Siguiente paso sugerido:
  - verificar el endpoint en vivo y luego decidir si conviene sumar tambien volumen u otros campos al tooltip.

## 2026-04-08 02:42:00 -03:00
- Accion: ampliacion del universo de acciones del `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio que el mapa incluya muchas mas acciones y no quede limitado al universo original.
- Resultado:
  - se amplio de forma relevante el universo del heatmap;
  - se sumaron mas large caps de tecnologia, consumo ciclico, comunicacion, consumo defensivo, healthcare, finanzas, industriales, energia, real estate y utilities;
  - esto aumenta densidad, cobertura sectorial y parecido con mapas de mercado mas completos.
- Verificacion:
  - queda pendiente reiniciar el server local para reflejar el nuevo universo en la pagina.
- Siguiente paso sugerido:
  - levantar la app de nuevo, revisar la nueva densidad del mapa y ajustar layout si hace falta por el mayor numero de tickers.

## 2026-04-08 12:49:00 -03:00
- Accion: correccion del `HTTP 502` del heatmap tras ampliar el universo.
- Archivos afectados:
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `LOG.md`
- Motivo: al probar la ampliacion del universo, Yahoo rechazo el endpoint `v7/finance/quote` con `401 Unauthorized` y el heatmap quedo devolviendo `502`.
- Resultado:
  - se dejo el intento de `batch quote` como mejora oportunista cuando Yahoo lo permita;
  - si ese endpoint falla, el sistema ahora degrada automaticamente al flujo que usa `chart` por ticker, que ya venia funcionando;
  - con esto el heatmap deja de romperse y mantiene compatibilidad con el universo ampliado.
- Verificacion:
  - queda pendiente reiniciar el server local y probar de nuevo `/api/heatmap`.
- Siguiente paso sugerido:
  - volver a levantar la app, confirmar que el heatmap responda otra vez y luego revisar el mapa con el nuevo universo.

## 2026-04-08 13:04:00 -03:00
- Accion: eliminacion de la seccion `Liquidez en pesos` del modulo ARS.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/bdi-overrides.js`
  - `LOG.md`
- Motivo: el usuario pidio sacar la seccion de liquidez en pesos dentro de la parte de liquidez.
- Resultado:
  - se elimino la subpestana y el panel de `Liquidez en pesos`;
  - la entrada `ARS` ahora abre de forma natural en `Plazo fijo`;
  - se limpiaron accesos y textos visibles para que la home no siga apuntando a una seccion removida.
- Verificacion:
  - queda pendiente refresh visual en navegador para confirmar la navegacion final.
- Siguiente paso sugerido:
  - refrescar la app y revisar la nueva entrada `ARS` para validar que quede clara y ordenada.

## 2026-04-08 13:21:00 -03:00
- Accion: agregado de temporalidad personalizada al `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio poder usar el heatmap con diferentes temporalidades, eligiendo fecha inicial y fecha final o comparando contra el momento actual.
- Resultado:
  - se agregaron controles de fecha en el frontend;
  - el backend ahora acepta `start` y `end` para calcular variacion del periodo;
  - si `end` queda vacio, el color se calcula desde la fecha inicial hasta ahora;
  - se mantuvo el comportamiento diario como fallback cuando no se informa una fecha de inicio.
- Verificacion:
  - queda pendiente reiniciar el server local para probar el flujo completo de frontend + backend.
- Siguiente paso sugerido:
  - levantar la app, probar un rango corto y otro abierto hasta hoy, y ajustar si hace falta la velocidad o el texto del estado.

## 2026-04-09 00:00:00 -03:00
- Accion: limpieza puntual de textos residuales del modulo ARS.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/bdi-overrides.js`
  - `LOG.md`
- Motivo: quedaban copys heredados de `Liquidez en pesos` aunque la seccion ya no existe como submodulo visible.
- Resultado:
  - se ajustaron titulos y descripciones del hero ARS para que hablen de `Liquidez` y alternativas de corto plazo, sin sugerir una seccion removida;
  - se limpiaron copys residuales del shortcut ARS en espanol e ingles;
  - no se modificaron navegacion, tabs ni comportamiento funcional.
- Verificacion:
  - el usuario ya habia confirmado que la UI no mostraba la seccion removida y que el heatmap funcionaba correctamente en local.
- Siguiente paso sugerido:
  - refrescar la pagina y confirmar que el modulo ARS conserve el mismo comportamiento visual, ahora con copys mas consistentes.

## 2026-04-09 00:10:00 -03:00
- Accion: actualizacion de credito autoral en el footer.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/bdi-overrides.js`
  - `LOG.md`
- Motivo: el usuario pidio sumar a Juan Di Maria junto a Tomas Rodriguez en la linea de autoria del footer.
- Resultado:
  - el footer base ahora muestra `BDI Consultora, elaborado por TomÃ¡s RodrÃ­guez y Juan Di Maria.`;
  - se alinearon las variantes de override en espanol e ingles para conservar consistencia visual y de idioma.
- Verificacion:
  - cambio de copy solamente, sin impacto en navegacion ni logica.
- Siguiente paso sugerido:
  - refrescar la pagina para validar el nuevo credito en el pie.

## 2026-04-09 00:35:00 -03:00
- Accion: adaptacion del optimizador de carteras para seguir mucho mas de cerca el flujo Python provisto por el usuario.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/bdi-overrides.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio que el optimizador web respete al pie de la letra la logica del script original en Python, evitando aproximaciones propias innecesarias.
- Resultado:
  - el motor ahora trabaja con un flujo mas fiel al script original:
    - retornos diarios y media/covarianza anualizadas;
    - optimizacion de Sharpe optimo;
    - optimizacion de minima volatilidad;
    - portfolio de retorno objetivo solo cuando la solucion pasa la tolerancia;
    - frontera eficiente sobre `100` objetivos de retorno;
    - generacion de `100000` portfolios aleatorios con filtro por peso minimo;
    - tabla de CAGR y grafico comparativo;
    - matriz de correlacion con gradiente celeste a rojo.
  - se ajustaron labels y descripciones visibles del modulo para reflejar mejor este comportamiento.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Problemas encontrados:
  - el archivo `app.js` tiene zonas con encoding mezclado, por lo que parte de la adaptacion tuvo que aplicarse en parches pequenos para no arriesgar el resto del archivo.
- Siguiente paso sugerido:
  - refrescar la pagina, correr 2 o 3 pruebas con tickers reales y comparar visualmente los resultados contra el script Python de referencia.

## 2026-04-09 00:50:00 -03:00
- Accion: refinamiento visual del grafico `Espacio de portfolios` del optimizador.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario reporto problemas visuales concretos respecto del grafico:
  - la CML se iba del area util;
  - el label del eje X se solapaba con los ticks;
  - los ticks del eje resultaban poco naturales;
  - la leyenda y el encuadre general necesitaban mas aire.
- Resultado:
  - la CML ahora se dibuja recortada al dominio visible del grafico;
  - los ejes usan `nice ticks` en lugar de marcas lineales poco racionales;
  - se ampliaron margenes del SVG para separar mejor ticks, labels y eje;
  - la leyenda se agrando y gano mejor encuadre dentro del area superior izquierda.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar la pagina y revisar de nuevo el frontier para decidir un ultimo ajuste fino de paleta, grosor de linea o posicion de la leyenda si todavia hiciera falta.

## 2026-04-09 01:05:00 -03:00
- Accion: reorganizacion del layout del optimizador para desktop.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio aprovechar mejor el ancho disponible en desktop y ubicar el grafico del frontier a la izquierda con `Pesos optimos` a la derecha, en proporcion `70/30`.
- Resultado:
  - `Espacio de portfolios` y `Pesos optimos` ahora comparten una grilla de resultados del optimizador;
  - en desktop ancho se renderizan en `70/30`;
  - en mobile y pantallas angostas vuelven a una sola columna para no comprometer legibilidad.
- Verificacion:
  - cambio estructural de layout solamente; la logica del optimizador no fue alterada en este paso.
- Siguiente paso sugerido:
  - refrescar la pagina y validar si el nuevo reparto de ancho ya le da al grafico la presencia que el modulo necesita.

## 2026-04-09 11:25:00 -03:00
- Accion: encapsulacion inicial del motor Python del optimizador y alineacion del fallback.
- Archivos afectados:
  - `rendimientos-ar/python/optimizer_runner.py`
  - `rendimientos-ar/python/requirements.txt`
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio llevar a la pagina el calculo del script Python original, priorizando fidelidad frente a la aproximacion JS, pero sin romper la app si Python no esta disponible.
- Resultado:
  - se consolido el endpoint local `POST /api/optimizer` para que `server.js` ejecute el runner Python dentro de `rendimientos-ar/python/`;
  - el runner ahora valida mejor fallos de optimizacion en `Sharpe optimo` y `minima volatilidad`, en lugar de seguir silenciosamente con soluciones no confiables;
  - se agrego `rendimientos-ar/python/requirements.txt` con `numpy`, `pandas`, `scipy` y `yfinance` para dejar instalacion y runtime mas trazables;
  - `server.js` suma `py` como candidato de runtime, mejorando compatibilidad en Windows;
  - el fallback JS del optimizador se alinea a `25000` portfolios aleatorios para no quedar desfasado respecto del objetivo de liviandad definido por el usuario;
  - `README.md` deja documentado que el frontend intenta primero el motor Python y recurre a JS solo como degradacion controlada.
- Verificacion:
  - queda pendiente correr `node --check` sobre `server.js` y `public/app.js`, y luego validar el endpoint con dependencias Python instaladas en la maquina del usuario.
- Siguiente paso sugerido:
  - instalar dependencias Python localmente, reiniciar el server y probar `POST /api/optimizer` desde la pagina para confirmar que ya responde el motor `Python/SciPy`.

## 2026-04-09 11:42:00 -03:00
- Accion: restitucion de `100000` portfolios aleatorios en el optimizador.
- Archivos afectados:
  - `rendimientos-ar/python/optimizer_runner.py`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio volver a `100000` portfolios para acercar el comportamiento del modulo web al script Python que ejecuta en Google Colab.
- Resultado:
  - el runner Python vuelve a aceptar y generar hasta `100000` portfolios aleatorios;
  - el frontend vuelve a solicitar `100000` al endpoint Python;
  - el fallback JS tambien vuelve a usar `100000`, para no producir una nube distinta cuando el motor Python no este disponible;
  - `README.md` queda alineado con ese volumen real.
- Verificacion:
  - cambio acotado a parametros de generacion de portfolios; queda pendiente prueba en navegador con el motor Python ya instalado.
- Siguiente paso sugerido:
  - reinstalar o verificar dependencias Python, reiniciar el server y comparar una corrida de la pagina contra la misma corrida en Colab usando exactamente los mismos tickers y periodo.

## 2026-04-09 11:58:00 -03:00
- Accion: correccion de la CML en el render web y robustecimiento del launcher Python en Windows.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/server.js`
  - `LOG.md`
- Motivo: el usuario detecto una discrepancia fuerte entre la CML mostrada en la pagina y la obtenida en Python/Colab, y ademas reporto que el backend devolvia `Python was not found`.
- Resultado:
  - la CML del frontier ahora vuelve a dibujarse desde volatilidad `0`, como en el script Python original, en lugar de arrancar desde el minimo visible del eje X;
  - el dominio del eje X del frontier vuelve a incluir `0`, para que la recta no quede visualmente corrida respecto del grafico de referencia;
  - `server.js` ahora intenta lanzar Python en Windows no solo con `python` y `python3`, sino tambien con `py -3`, que es una variante mucho mas comun cuando el alias `python` de Microsoft Store esta roto o no instalado;
  - con esto se reduce el riesgo de comparar el frontier Python de Colab contra el fallback JS de la pagina por un problema de launcher local.
- Verificacion:
  - queda pendiente reiniciar el server local y validar una corrida real del optimizador para confirmar que el estado ya no caiga en `Fallback JS`.
- Siguiente paso sugerido:
  - reiniciar el server, ejecutar una prueba del optimizador y verificar en pantalla que la fuente diga `Python engine` antes de comparar de nuevo contra Colab.

## 2026-04-09 12:12:00 -03:00
- Accion: fijacion explicita del binario Python local para el optimizador.
- Archivos afectados:
  - `rendimientos-ar/.env`
  - `LOG.md`
- Motivo: aunque Python 3.13 estaba instalado y `pip` funcionaba en PowerShell, el server seguia resolviendo el alias roto de Microsoft Store al invocar `python` para `/api/optimizer`.
- Resultado:
  - se creo `rendimientos-ar/.env` con `OPTIMIZER_PYTHON_BIN=C:\Users\juand\AppData\Local\Programs\Python\Python313\python.exe`;
  - a partir de este punto, `server.js` puede invocar el runner Python con ruta fija y deja de depender del PATH o de los aliases de Windows.
- Verificacion:
  - queda pendiente reiniciar el server local y repetir `POST /api/optimizer` para confirmar que la respuesta ya salga con el motor Python real.
- Siguiente paso sugerido:
  - reiniciar `npm start`, volver a llamar `/api/optimizer` y verificar que la pagina deje de caer en `Fallback JS`.

## 2026-04-09 13:05:00 -03:00
- Accion: ampliacion del modulo `Heatmap` para soportar acciones argentinas dentro del mismo mapa.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio mantener un unico modulo `HEATMAP` y empezar a cargar tambien universos de acciones argentinas usando `data912`.
- Resultado:
  - se agrego un selector de universo dentro del bloque `Heatmap` para alternar entre `USA`, `Argentina ARS` y `Argentina USD`;
  - `server.js` y la funcion de Netlify ahora aceptan `market` en `/api/heatmap`;
  - se confirmo e integro `https://data912.com/live/arg_stocks` como fuente para acciones argentinas;
  - se preparo un primer universo curado de tickers argentinos en pesos y sus variantes dolarizadas;
  - el mapa argentino usa `pct_change` de `data912` para color y `precio * volumen` como proxy visual de tamano en este primer boceto;
  - los heatmaps argentinos dejan ocultos los controles de rango historico, porque por ahora se apoyan en variacion diaria y no en series por fecha como el mapa USA;
  - tooltip, layout y fuente visible quedaron adaptados para convivir dentro del mismo modulo.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/server.js`;
  - `node --check` valido sin errores `rendimientos-ar/netlify/functions/heatmap.js`;
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - reiniciar el server local, probar los tres universos del selector y luego refinar manualmente la asignacion de sectores/industrias y el criterio de tamano relativo para Argentina.

## 2026-04-09 13:42:00 -03:00
- Accion: refinamiento estetico inicial del bloque `Heatmap` con foco en los universos argentinos.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el primer boceto funcional del heatmap argentino ya cargaba datos, pero la presentacion se veia cruda: toolbar desbalanceado, textos con encoding roto, estado poco prolijo y treemap demasiado achatado para el universo local.
- Resultado:
  - se mejoro la composicion visual del toolbar con una caja mas clara para controles y una tarjeta de estado mas legible;
  - se reforzo la jerarquia visual del bloque con hint y fuente mejor integrados;
  - se amplio el contenedor del heatmap y se le dio mas presencia al frame SVG;
  - el treemap argentino ahora usa una proporcion un poco mas favorable (`3` filas en vez de `4`) para ganar legibilidad;
  - se agrego una sanitizacion defensiva de copy para evitar que aparezcan textos rotos como `variaciÃƒÂ³n diaria` o `TamaÃƒÂ±o`.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`;
  - `node --check` valido sin errores `rendimientos-ar/server.js`.
- Siguiente paso sugerido:
  - reiniciar el server local, revisar visualmente `Argentina ARS` y `Argentina USD`, y luego hacer una segunda pasada fina sobre sectores, paleta y universo filtrado.

## 2026-04-13 18:05:00 -03:00
- Accion: ajuste fino del `Heatmap USA` para ganar ancho util y mejorar la lectura de sectores chicos e industrias.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario indico que la jerarquia general del heatmap USA ya le gustaba, pero seguian flojos los labels de sectores pequenos como `Utilities` y `Real Estate`, y algunas etiquetas de industria quedaban con cajas demasiado grandes o texto mal aprovechado.
- Resultado:
  - se amplio el ancho util del mapa USA y del contenedor general para aprovechar mejor el box disponible;
  - se recalibro el `viewBox` del heatmap USA para darle un poco mas de aire lateral;
  - los headers de sector ahora escalan mejor segun el ancho disponible, para favorecer la lectura en sectores chicos;
  - las etiquetas de industria ahora ajustan mas el ancho al texto real en lugar de dejar una pastilla demasiado larga;
  - se flexibilizo el umbral de render de headers de industria para no perder tanta informacion en cajas medianas.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar el heatmap USA y revisar visualmente `Utilities`, `Real Estate` y sectores angostos; si todavia quedan apretados, evaluar abreviaturas selectivas solo para headers secundarios.

## 2026-04-13 18:18:00 -03:00
- Accion: segunda pasada fina sobre labels del `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: tras el ajuste anterior, el usuario remarco que `Utilities` y `Real Estate` seguian viendose flojos, y que algunas pastillas de industria todavia no quedaban lo bastante ajustadas al texto.
- Resultado:
  - se amplio nuevamente el ancho util del mapa USA;
  - se agregaron abreviaturas selectivas para sectores angostos como `UTIL.` y `REAL EST.`;
  - las etiquetas de industria ahora usan un ancho minimo mucho mas contenido y calculado con una aproximacion mas cercana al ancho real del texto;
  - el porcentaje de composicion sectorial deja de mostrarse en cajas angostas para no competir con el label principal.
- Verificacion:
  - queda sugerido refresco visual del heatmap USA para comprobar lectura final de headers y pills.
- Siguiente paso sugerido:
  - si aun quedaran casos limite, hacer una ultima pasada de excepciones muy puntuales sobre 2 o 3 labels concretos del universo USA.

## 2026-04-13 18:28:00 -03:00
- Accion: rebalanceo visual suave del layout sectorial del `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario propuso reducir un poco el peso visual de `Financial` y `Consumer Defensive` para liberar espacio hacia `Utilities` y `Real Estate`, que seguian quedando cortos de ancho para leer bien sus labels.
- Resultado:
  - se agrego una ponderacion visual de layout solo para USA;
  - `Financial` y `Consumer Defensive` ocupan un poco menos en el treemap;
  - `Utilities` y `Real Estate` reciben algo mas de superficie para mejorar la legibilidad;
  - la composicion porcentual visible sigue calculandose con el peso real del sector, no con la ponderacion estetica.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar el heatmap USA y revisar si el nuevo balance ya resuelve los headers; si no alcanzara, aplicar una ultima capa de excepciones por sector.

## 2026-04-13 18:34:00 -03:00
- Accion: aumento leve del espaciado entre sectores del `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: con el rebalanceo visual ya resuelto, el usuario pidio un acabado mas prolijo para que las uniones entre cajas sectoriales no quedaran tan pegadas ni generaran una sensacion antiestetica.
- Resultado:
  - se incremento de forma leve el `outerGap` del heatmap USA;
  - el mapa gana separacion visual entre sectores sin alterar la jerarquia general ni la logica de tamanos.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar el heatmap USA y verificar si el nuevo aire entre sectores ya es suficiente o si conviene sumar un inset minimo interno por bloque.

## 2026-04-13 18:39:00 -03:00
- Accion: agregado de inset interno por bloque sectorial en el `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: aun con mayor `outerGap`, el usuario senalo que los boxes sectoriales seguian viendose pegados entre si, especialmente en sectores chicos del lateral derecho.
- Resultado:
  - cada sector ahora se dibuja con un inset interno pequeno respecto de su rectangulo base;
  - esto genera una separacion visual real entre bloques, sin depender solo del gap de particion;
  - el ajuste se aplico mas fuerte en USA y mas suave en Argentina para no castigar demasiado el mapa local.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar el heatmap USA y comprobar si el nuevo inset ya resuelve el efecto de cajas soldadas; si hiciera falta, reducir 1 o 2 px mas el ancho interno solo en sectores pequenos.

## 2026-04-13 18:46:00 -03:00
- Accion: redisenio del encabezado visual de cada sector en el `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario marco que el box del sector seguia viendose raro a nivel estetico, especialmente en capturas parciales donde la franja superior completa se sentia pesada y poco elegante.
- Resultado:
  - se elimino la franja sectorial corrida de lado a lado;
  - cada sector ahora usa una cabecera tipo chip, mas compacta y suave;
  - el nombre del sector queda mejor integrado al bloque;
  - el porcentaje sectorial se mantiene, pero mas liviano y menos invasivo.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar el heatmap USA y validar si esta nueva cabecera ya resuelve el ruido visual del box; si hiciera falta, bajar un punto mas el contraste del chip.

## 2026-04-13 18:52:00 -03:00
- Accion: agregado de linea divisoria bajo el encabezado sectorial del `Heatmap USA`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario propuso sumar una separacion explicita entre el titulo del sector y el contenido inferior para ordenar mejor el bloque sin volver a la barra pesada anterior.
- Resultado:
  - se agrego una linea sutil bajo el encabezado del sector;
  - el bloque ahora separa mejor la identidad del sector respecto de los tiles internos;
  - se mantiene la cabecera tipo chip, pero con una transicion visual mas clara hacia el contenido.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar el heatmap USA y decidir si la linea debe quedarse apenas visible o si conviene bajarle un poco mas la opacidad.

## 2026-04-13 19:02:00 -03:00
- Accion: ensanche del frame y del `viewBox` para los heatmaps de Argentina.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario senalo que el mapa argentino seguia sintiendose angosto y que varios sectores pequenos podian beneficiarse de un layout mas panoramico que aprovechara mejor todo el box disponible.
- Resultado:
  - el `viewBox` de Argentina paso a ser mas ancho y levemente menos alto;
  - el frame SVG del heatmap argentino ahora usa una relacion de aspecto mas panoramica;
  - el contenedor maximo de Argentina tambien se ensancho para usar mejor el ancho disponible;
  - se redujo un poco el gap externo argentino para recuperar superficie util dentro del mapa.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Argentina ARS` y `Argentina USD` para evaluar si el nuevo formato ya ordena mejor sectores chicos como `Utilities`, `Real Est.` y `Materials`.

## 2026-04-13 19:09:00 -03:00
- Accion: rebalanceo visual sectorial para los heatmaps de Argentina.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario detecto que `Consumer Staples/Defensive` seguia quedando chico frente al peso visual de `Energy` y `Financials`, aun despues de ensanchar el mapa.
- Resultado:
  - se redujo un poco el peso visual de `Energy` y `Financials` en el layout argentino;
  - se reforzo el espacio asignado a `Consumer Staples/Defensive`;
  - tambien se dio un pequeno impulso a `Real Estate`, `Materials` y `Utilities` para que no queden tan comprimidos.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Argentina ARS` y revisar si `Consumer Staples/Defensive` ya entra mejor; si todavia no alcanza, ajustar tambien el alto relativo de las filas argentinas.

## 2026-04-13 19:16:00 -03:00
- Accion: compresion visual suave de activos dominantes en el heatmap argentino.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: aun con rebalanceo sectorial, `YPFD` seguia dominando demasiado el layout argentino y desplazando visualmente al resto de sectores.
- Resultado:
  - se introdujo un `layoutValue` separado del valor economico real para el treemap argentino;
  - el layout ahora aplica una compresion suave a los montos grandes;
  - `YPFD` recibe una compresion adicional y algunos dominantes financieros una mas leve;
  - los datos visibles, tooltips y composiciones siguen basandose en el valor real, mientras que la compresion afecta solo la estetica del reparto espacial.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Argentina ARS` y evaluar si el mapa ya respira mejor; si aun quedara desbalanceado, tocar el reparto vertical de filas argentinas.

## 2026-04-13 19:24:00 -03:00
- Accion: compresion fuerte del layout argentino y aumento del numero de filas del treemap.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario confirmo que el mapa argentino seguia sin entrar bien y que ya no era prioritario respetar con tanta fidelidad el peso relativo tipo market cap, sino lograr que el conjunto se vea mejor y mas equilibrado.
- Resultado:
  - se reforzo la compresion de activos dominantes argentinos, especialmente `YPFD/YPFDD` y grandes financieros;
  - la ponderacion sectorial argentina ahora usa una compresion adicional y un piso visual para que los sectores chicos no desaparezcan;
  - el treemap argentino pasa a repartirse en 4 filas para mejorar la entrada de mas sectores dentro del mismo frame.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Argentina ARS` y `Argentina USD`; si todavia quedaran cajas desbalanceadas, revisar ya no el peso sino el universo filtrado de tickers por sector.

## 2026-04-13 19:32:00 -03:00
- Accion: correccion de textos visibles con `aÃ±os` en graficos y ejes.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo: el usuario reporto que en algunos graficos seguia apareciendo `anos` en vez de `aÃ±os`.
- Resultado:
  - se corrigieron labels de ejes `Duration (aÃ±os)` y `Duration aproximada (aÃ±os)` en la capa SVG de curvas;
  - se corrigieron tambien textos de la calculadora/axis usando escapes Unicode para evitar nuevas roturas de encoding.
- Verificacion:
  - `node --check` valido sin errores `rendimientos-ar/public/app.js`;
  - `node --check` valido sin errores `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar la app y revisar especialmente curvas de `Soberanos`, `CER`, `Corporativos` y la calculadora compuesta para confirmar que ya no queda ningun `anos` visible.

## 2026-04-13 19:38:00 -03:00
- Accion: actualizacion de calificaciones en el monitor local de ONs/corporativos.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-ons-data.js`
  - `LOG.md`
- Motivo: el usuario indico las nuevas calificaciones a mostrar para emisores corporativos puntuales.
- Resultado:
  - `Banco Macro` -> `AAA`
  - `Transportadora Gas` -> `AA-`
  - `Pampa Energia` -> `AAA`
  - `Vista Energy` -> `AAA`
  - `CGC` -> `AA-`
  - `IRSA` -> `AAA`
  - `Tecpetrol` -> `AAA`
- Verificacion:
  - se confirmo que `app.js` ya consume y muestra `rating` desde `bdi-ons-data.js`, por lo que no hizo falta cambiar la capa de render.
- Siguiente paso sugerido:
  - refrescar la seccion de `Corporativos en USD` y validar visualmente que la columna/ficha de `Calif.` ya refleje estas notas.

## 2026-04-14 10:08:00 -03:00
- Accion: alta de un nuevo bono corporativo `VSCX` para `Vista Energy` en el monitor local de ONs.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-ons-data.js`
  - `LOG.md`
- Motivo: el usuario envio el flujo de fondos de `VSCX` y pidio incorporarlo al universo de corporativos.
- Resultado:
  - se agrego `VSCX` con:
    - compania `Vista Energy`
    - `rating: AAA`
    - `lotSize: 1000`
    - `couponAnnual: 7.88`
    - cashflows tecnicos desde `2026-04-08` hasta `2038-04-08`
  - se asumio mapeo local `arsTicker: VSCXO` y `usdTicker: VSCXD`, siguiendo la convencion ya usada en el archivo para otros emisores.
- Verificacion:
  - el render de corporativos ya consume automaticamente nuevas entradas de `window.BDI_ON_MONITOR`, por lo que no hizo falta tocar `app.js`.
- Siguiente paso sugerido:
  - refrescar `Corporativos en USD` y confirmar si el ticker aparece con el mapeo esperado; si la plaza local usa otra nomenclatura, ajustar solo `arsTicker` / `usdTicker`.

## 2026-04-14 10:16:00 -03:00
- Accion: correccion de emisores y laminas minimas en corporativos locales.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-ons-data.js`
  - `LOG.md`
- Motivo: el usuario informo que algunas fichas del monitor local estaban asignadas al emisor equivocado o con lamina minima incorrecta.
- Resultado:
  - `TSC4` paso a `Transportadora de Gas del Sur S.A.` con `lotSize: 10000`
  - `MGCO` paso a `Pampa Energia S.A.` con `lotSize: 10000` y `law: NY`
  - `PLC5` paso a `Pluspetrol S.A.` con `lotSize: 1000`
  - `TTCD` paso a `Tecpetrol S.A.` con `lotSize: 1000`
  - se ajustaron tambien las descripciones para que queden alineadas con cada emisor.
- Verificacion:
  - el monitor de corporativos consume directamente estos metadatos, por lo que el cambio impacta en tabla y ficha sin tocar la capa de render.
- Siguiente paso sugerido:
  - refrescar `Corporativos en USD` y revisar que emisor, lamina y rating coincidan con tu referencia para cada ticker.

## 2026-04-14 10:22:00 -03:00
- Accion: alta de `PN43` para `Pan American Energy S.L.` en el monitor local de ONs.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-ons-data.js`
  - `LOG.md`
- Motivo: el usuario envio un nuevo flujo de fondos para sumar otra ON corporativa al universo visible.
- Resultado:
  - se agrego `PN43` con:
    - compania `Pan American Energy`
    - `lotSize: 1000`
    - `law: NY`
    - `couponAnnual: 7.76`
    - flujo tecnico desde `2026-01-15` hasta `2037-01-15`
    - descripcion indicando pagos en cable
  - como el usuario no informo una calificacion, se dejo `rating: '-'` de forma provisoria.
- Verificacion:
  - el monitor consume nuevas entradas de `window.BDI_ON_MONITOR` sin cambios adicionales en `app.js`.
- Siguiente paso sugerido:
  - refrescar `Corporativos en USD` y validar si `PN43` aparece con el ticker/mapeo esperado; si tenes la calificacion, la sumamos en la siguiente pasada.

## 2026-04-14 10:34:00 -03:00
- Accion: alta de cinco nuevas ONs corporativas en el monitor local.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-ons-data.js`
  - `LOG.md`
- Motivo: el usuario envio nuevos flujos de fondos para seguir ampliando el universo de corporativos en USD.
- Resultado:
  - se agregaron:
    - `TLCT` -> `Telecom Argentina S.A.` | `lotSize: 100` | `law: NY`
    - `RC1C` -> `ARCOR S.A.I.C.` | `lotSize: 1000` | `law: NY`
    - `YM34` -> `YPF Sociedad Anonima` | `lotSize: 1000` | `law: NY`
    - `DNC7` -> `Empresa Distribuidora y Comercializadora Norte S.A.` | `lotSize: 1` | `law: NY`
    - `RUCD` -> `MSU Energy S.A.` | `lotSize: 1` | `law: NY`
  - cada ticker quedo cargado con su flujo tecnico completo;
  - como el usuario no envio calificaciones para estas ONs, se dejaron provisoriamente en `rating: '-'`.
- Verificacion:
  - el monitor local de ONs consume automaticamente nuevas entradas de `window.BDI_ON_MONITOR`.
- Siguiente paso sugerido:
  - refrescar `Corporativos en USD` y validar aparicion, ticker y laminas; si tenes las calificaciones de estas nuevas ONs, las sumamos en la proxima pasada.

## 2026-04-14 10:41:00 -03:00
- Accion: carga de calificaciones para nuevas ONs incorporadas al monitor local.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-ons-data.js`
  - `LOG.md`
- Motivo: el usuario envio las calificaciones faltantes para las nuevas ONs agregadas en la pasada anterior.
- Resultado:
  - `RUCD / MSU Energy` -> `AA-`
  - `DNC7 / Edenor` -> `A+`
  - `TLCT / Telecom Argentina` -> `AA+`
  - `PN43 / Pan American Energy` -> `AAA`
  - `YM34 / YPF` -> `AAA`
  - `RC1C / ARCOR` -> `AAA`
- Verificacion:
  - `app.js` ya toma `rating` desde `bdi-ons-data.js`, por lo que la actualizacion impacta directo en la UI.
- Siguiente paso sugerido:
  - refrescar `Corporativos en USD` y validar que columna/ficha `Calif.` ya muestre correctamente estas nuevas notas.

## 2026-04-14 11:46:39 -03:00
- Accion: ajuste de tablas y graficos de monitoreo en renta fija local.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/bdi-charts.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio sumar `TEM` en `Renta fija ARS` y `Bonos CER`, quitar las lineas que unian puntos en todos los graficos de monitoreo de activos y corregir el eje Y de `Soberanos` para que no queden datos fuera del grafico.
- Resultado:
  - se agrego helper `calcTEM()` en frontend;
  - `LECAPs / BONCAPs` ahora muestran columna `TEM` junto a `TNA`, `TIR`, `Duration` y `Duration Mod.`;
  - `Bonos CER` ahora muestran columna `TEM` junto a `TIR real`, `Duration` y `Duration Mod.`;
  - los charts SVG de `Renta fija ARS`, `CER`, `Soberanos` y `Corporativos` dejan de renderizar curvas/lineas guia y quedan solo con puntos y etiquetas;
  - `Soberanos` pasa de un `yDomain` fijo a uno dinamico con padding, evitando que un bono quede por fuera del grafico.
- Verificacion:
  - pendiente correr validacion visual local en la maquina del usuario tras refrescar la pagina;
  - se ejecutara chequeo de sintaxis sobre `app.js` y `bdi-charts.js`.
- Siguiente paso sugerido:
  - revisar visualmente `Renta fija ARS`, `CER`, `Soberanos` y `Corporativos`; si la columna `TEM` queda muy ancha en mobile, compactar headers o esconderla en pantallas chicas.

## 2026-04-14 11:53:39 -03:00
- Accion: extension del eje Y dinamico al resto de los monitores de renta fija y reacomodo visual de `TEM` en `Renta fija ARS`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio replicar la dinamica de escala de `Soberanos` en `Renta fija ARS`, `Bonos CER` y `Corporativos`, y ademas acomodar la tabla ARS para que `TEM` no empuje el scroll horizontal.
- Resultado:
  - se agrego helper comun `getDynamicYDomain()` para charts SVG de monitoreo;
  - `Renta fija ARS`, `CER`, `Soberanos` y `Corporativos` usan ahora eje Y dinamico con padding;
  - en `Renta fija ARS`, `TEM` se reubico junto a `TNA` y `TIR`;
  - se recalibraron anchos de columnas en `.lecap-table` para achicar `Ticker` y evitar que la tabla se vaya innecesariamente hacia la derecha.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/app.js` y `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar la pagina y revisar si `Renta fija ARS` entra mejor en desktop; si aun queda justo, la siguiente mejora seria compactar `Pago final` o abreviar `Duration Mod.` a `Dur. Mod.`.

## 2026-04-14 11:58:22 -03:00
- Accion: ajuste fino de tabla y grafico en `Renta fija ARS`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario pidio achicar un poco mas la columna de nombre/ticker y mejorar la lectura general del grafico de renta fija argentina.
- Resultado:
  - la columna `Ticker` de `.lecap-table` se redujo de `16%` a `14%`;
  - el grafico `Renta fija ARS` ahora usa `xDomain` explicito arrancando en `0`, con menos ticks y offsets mas inteligentes para etiquetas en tramos cortos y largos;
  - se elimino el arranque negativo del eje X que se veia poco natural para duration.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/bdi-charts.js`;
  - se intento correr `node --check` sobre `styles.css`, pero Node no valida CSS y devolvio `ERR_UNKNOWN_FILE_EXTENSION`, por lo que la comprobacion visual queda pendiente en navegador.
- Siguiente paso sugerido:
  - refrescar `Renta fija ARS` y validar si la nueva lectura del eje X y las etiquetas ya se siente mas limpia; si aun hiciera falta, el siguiente ajuste seria compactar `Pago final` o acortar labels a una sola linea en algunos puntos.

## 2026-04-14 12:03:28 -03:00
- Accion: segunda pasada de prolijidad sobre tabla y grafico de `Renta fija ARS`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo: el usuario reporto que el grafico seguia viendose raro y que la tabla aun quedaba justa en la cabecera de duration modificada.
- Resultado:
  - se abrevio el header de `Duration Mod.` a `Dur. Mod.`;
  - la columna `Ticker` se redujo a `11%`, y se compactaron tambien `Pago final` y `Vencimiento`;
  - en el grafico ARS se refinaron offsets de etiquetas por ticker para ordenar mejor el tramo corto y la parte larga de la curva;
  - se habilito `text-anchor` configurable en labels SVG para que algunas anotaciones queden alineadas a izquierda o derecha y no se amontonen.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/bdi-charts.js` y `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Renta fija ARS`; si la tabla ya entra pero el grafico todavia no convence, el siguiente salto de calidad seria pasar a etiquetas compactas en una sola linea (`Ticker Â· TIR`) o tooltip al hover para despejar la zona izquierda.
## 2026-04-14 12:14:56 -03:00
- Accion: reemplazo del etiquetado manual por un sistema automatico comun para todos los graficos de renta fija.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio eliminar cualquier logica manual por ticker para evitar tener que recalibrar curvas a medida que cambian precios y composicion.
- Resultado:
  - se eliminaron offsets manuales de `Renta fija ARS`;
  - se agrego `buildAutoLabelPlacements()` para distribuir etiquetas segun colisiones reales en pixeles;
  - el algoritmo prueba multiples posiciones alrededor de cada punto y penaliza superposiciones y salidas del area de ploteo;
  - `Renta fija ARS`, `CER`, `Soberanos` y `Corporativos` pasan a usar este mismo esquema automatico;
  - tambien se unifico el arranque del eje X en `0` para los graficos de duration positiva mediante `getPositiveXDomain()`.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar `Renta fija ARS`, `CER`, `Soberanos` y `Corporativos`; si la lectura aun se siente cargada, el siguiente paso robusto seria compactar el label visible a una sola linea y dejar el porcentaje completo en hover.

## 2026-04-14 12:19:49 -03:00
- Accion: compactacion automatica de labels en clusters densos y nuevo ajuste de ancho en tabla ARS.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario mostro que `CER` y `Renta fija ARS` todavia tenian ruido visual en zonas densas.
- Resultado:
  - se agrego conteo automatico de vecinos por punto en coordenadas de pantalla;
  - cuando un cluster esta cargado, el label pasa a modo `compact`;
  - cuando esta muy cargado, pasa a `ultra-compact` y oculta el porcentaje visible, dejandolo en `title/hover`;
  - `Ticker` en la tabla ARS se redujo a `9%` para darle mas aire a headers largos.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar `CER` y `Renta fija ARS`; si aun hubiera ruido, el paso siguiente seria sumar una linea guia corta entre punto y label solo en casos compactos, sin volver a lineas de curva.

## 2026-04-14 12:24:49 -03:00
- Accion: tratamiento visual especifico para el cluster denso de `Bonos CER`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario indico que la curva CER seguia demasiado cargada aun despues del compactado general.
- Resultado:
  - `CER` ahora usa umbrales mas agresivos de compactacion (`compactThreshold: 1`, `ultraCompactThreshold: 2`);
  - en zonas densas se muestra solo el ticker y el porcentaje queda en hover;
  - los puntos CER usan radio levemente menor;
  - se agregaron lineas guia cortas (`callout`) para relacionar mejor etiqueta y punto cuando el label queda desplazado;
  - se sumo clase visual `cer-label` para bajar apenas tamaÃ±o y peso del texto en ese grafico.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar `Bonos CER`; si aun quedara saturado, el siguiente paso seria separar automaticamente el tramo corto en una mini zona inset o usar tooltip persistente al hover y dejar solo tickers visibles.

## 2026-04-14 12:28:07 -03:00
- Accion: aumento de referencias visuales en eje Y y refuerzo del anti-solapamiento en `Bonos CER`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo: el usuario pidio mas ticks en el eje Y y remarco que algunas etiquetas todavia caian encima de otros puntos.
- Resultado:
  - `CER` paso a `yTickCount: 6` para dar mejor lectura del rango real;
  - el algoritmo automatico de placements ahora penaliza que un label pise cualquier punto cercano, no solo su propio circulo;
  - tambien se ampliaron las posiciones candidatas de label para que tenga mas chances de escapar lateralmente o hacia abajo.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar `Bonos CER`; si quedaran 1 o 2 casos molestos, el siguiente paso seria un `inset` automatico para el cluster corto de duration, manteniendo el mismo motor de datos.

## 2026-04-14 12:31:17 -03:00
- Accion: acercamiento visual de `Bonos CER` a la referencia enviada por el usuario.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario compartio una referencia donde la curva CER se lee con una linea guia suave y labels mas compactos en una sola linea.
- Resultado:
  - `CER` vuelve a mostrar una curva guia suave, pero solo para ese grafico;
  - los labels CER pasan a modo inline (`Ticker; 4,53%`) para ocupar menos alto visual;
  - se ajusto el estilo de la curva y del texto inline para acercarlo al lenguaje visual de la referencia sin copiarla literalmente.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar `Bonos CER`; si aun quedara demasiado ruido en el tramo corto, el siguiente paso mas potente seria un inset automatico para durations cortas dentro del mismo SVG.

## 2026-04-14 12:35:44 -03:00
- Accion: retiro de la linea guia en `Bonos CER`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo: el usuario indico que la linea de referencia no quedaba bien y pidio quitarla.
- Resultado:
  - `Bonos CER` vuelve a quedar solo con puntos, labels inline y callouts;
  - se preservan los demas ajustes automaticos de compactacion y anti-solapamiento.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar `Bonos CER`; si todavia hiciera falta mas limpieza, el siguiente paso seria un inset automatico para el cluster de durations cortas.

## 2026-04-14 12:37:14 -03:00
- Accion: retiro de la regla fija que forzaba el inicio del eje X en `0` en los graficos de renta fija.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio que los graficos no arranquen todos en `0` y que el eje X se acomode automaticamente segun los datos.
- Resultado:
  - `getPositiveXDomain()` fue reemplazado por `getDynamicXDomain()`;
  - `Renta fija ARS`, `CER`, `Soberanos` y `Corporativos` ahora ajustan el eje X con min/max reales mas padding;
  - se preserva un piso no negativo, pero ya no se fuerza artificialmente el arranque en `0` salvo que el rango real lo justifique.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar los cuatro graficos de renta fija y validar si la lectura horizontal quedo mas natural en cada familia.

## 2026-04-15 14:57:09 -03:00
- Accion: mejora estetica del bloque de controles del `Heatmap` (universo y fechas).
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario pidio mejorar el visualizador del selector de universo (`USA / Argentina ARS / Argentina USD`) y de los controles de fecha porque se veian poco prolijos.
- Resultado:
  - se agruparon visualmente las acciones en un bloque `heatmap-actions`;
  - el selector y los date pickers ahora usan una estetica mas premium con gradiente suave, mejor borde, mejor foco y flecha custom en `select`;
  - los botones `Hasta hoy` y `Aplicar` ganaron una jerarquia visual mas clara;
  - se ajusto responsive para que en mobile los botones se apilen/mejoren su ocupacion.
- Verificacion:
  - se intento usar `node --check` sobre `index.html`, pero Node no valida `.html` y devolvio `ERR_UNKNOWN_FILE_EXTENSION`;
  - la validacion real de este cambio queda sujeta a refresco visual en navegador.
- Siguiente paso sugerido:
  - refrescar `Heatmap` y validar visual en desktop y mobile; si queres, la siguiente pasada puede ser sobre la barra superior del modulo para integrarla mejor con el status y la fuente de datos.

## 2026-04-15 15:04:02 -03:00
- Accion: reemplazo del calendario nativo del navegador por un date picker propio en el `Heatmap`.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario mostro que el popup nativo de fechas seguia viendose feo y no era suficientemente estilizable.
- Resultado:
  - los inputs de fecha del heatmap pasaron de `type=\"date\"` a un control custom readonly;
  - se agrego un calendario propio con navegacion mensual, seleccion de dia, acciones `Limpiar/Hoy` y posicionamiento flotante;
  - la logica del heatmap sigue consumiendo fechas ISO internamente mediante `data-iso-value`, sin cambiar el endpoint;
  - el selector de universo y las fechas ahora quedan visualmente alineados dentro del mismo lenguaje de la app.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Heatmap USA` y probar apertura, navegacion y seleccion de ambas fechas; si queres, la siguiente pasada puede agregar presets rapidos (`1M`, `3M`, `YTD`, `1Y`).

## 2026-04-15 15:08:11 -03:00
- Accion: reemplazo del selector nativo de universo por un control propio y correccion de navegacion mensual en el date picker del `Heatmap`.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio que el selector de universo tenga la misma estetica que el date picker y reporto que no podia cambiar de mes en el calendario.
- Resultado:
  - el `select` nativo de universo quedo oculto y sincronizado con un dropdown propio (`heatmap-market-trigger` + `heatmap-select-popover`);
  - el popup de fechas ahora previene `mousedown/focus` indeseados y mantiene estable la navegacion mensual;
  - universo y fechas quedan ahora dentro del mismo lenguaje visual del modulo heatmap.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Heatmap` y validar apertura/cierre de ambos popovers; si queres, la siguiente pasada puede sumar iconos o presets rapidos para rango de fechas.

## 2026-04-15 15:22:00 -03:00
- Accion: mejora de navegacion rapida del date picker del `Heatmap` y ajuste visual para alinearlo con el selector custom de universo.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio que al tocar el titulo del calendario se abra una grilla de meses y que las flechas permitan cambiar el anio de forma rapida, manteniendo la misma estetica del selector de universo.
- Resultado:
  - el calendario custom del `Heatmap` ahora abre una vista de meses al hacer click en el titulo (`abril 2026`, etc.);
  - las flechas laterales ahora desplazan el anio, no el mes, para acelerar la navegacion temporal;
  - al elegir un mes, el date picker vuelve automaticamente a la vista de dias del mes seleccionado;
  - el encabezado del calendario y la grilla mensual quedaron reforzados visualmente para que compartan lenguaje con el selector custom de universo.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Heatmap USA`, abrir el calendario y validar flujo completo `titulo -> meses -> cambio de anio -> seleccion de fecha`; si queres, despues podemos sumar presets rapidos como `1M`, `3M`, `YTD` y `1Y`.

## 2026-04-15 15:29:00 -03:00
- Accion: correccion del comportamiento de flechas en el date picker custom del `Heatmap`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo: el usuario aclaro que la navegacion debe ser dual:
  - en vista de dias, las flechas cambian el mes;
  - en vista de meses, las flechas cambian el anio.
- Resultado:
  - el calendario ahora cambia `mes` cuando esta mostrando dias;
  - el calendario cambia `anio` solo cuando se abre la grilla de meses desde el titulo;
  - el rerender del popover quedo migrado a la version nueva (`renderHeatmapDatePickerV3`) para mantener consistente esa logica.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Heatmap USA` y probar ambos flujos por separado para validar que la navegacion se sienta natural.

## 2026-04-16 10:42:00 -03:00
- Accion: mejora de presentacion publica del modulo `Heatmap` y carga por defecto de rueda diaria reciente.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio que `USA` abra mostrando automaticamente la variacion diaria reciente, limpiar copys demasiado tecnicos o con referencias externas visibles y reubicar el resumen de estado para que no quede incrustado en la parte alta del bloque.
- Resultado:
  - `Heatmap USA` ahora inicializa por defecto con el rango `ayer -> hoy`;
  - el copy principal y el texto de fuente del mapa quedaron mas neutrales y mas aptos para publicacion;
  - el hint de fechas ahora explica que la vista inicial corresponde a la ultima rueda diaria;
  - el resumen de estado (`cantidad de activos`, `rango`, `actualizacion`) se muestra debajo del grafico con una presentacion mas limpia;
  - los triggers del modulo quedaron redirigidos a una nueva rutina de carga (`loadHeatmapV2`) para aislar el armado del estado visible.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Heatmap USA` y validar que abra con `ayer/hoy`, que el resumen debajo del grafico se vea mas limpio y que el texto de fuente/cabecera ya suene listo para salida publica.

## 2026-04-16 11:04:00 -03:00
- Accion: ajuste fino de composicion del bloque superior del `Heatmap`.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio centrar visualmente el selector de universo/fechas dentro de su box y reemplazar el copy especifico de `USA` por una descripcion generica de que es un heatmap, valida para cualquier universo.
- Resultado:
  - la banda de controles del `Heatmap` ahora queda centrada dentro del contenedor superior;
  - el texto explicativo inferior del titulo paso a ser generico y deja de referenciar `USA`;
  - el hint operativo de fechas queda integrado dentro del mismo bloque de controles;
  - el hint legacy exterior quedo neutralizado para que no vuelva a mostrarse duplicado;
  - la caja de meta debajo del grafico mantiene juntos `estado + fuente`.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Heatmap` y validar visualmente el centrado del toolbar y el nuevo copy generico del modulo.

## 2026-04-16 11:12:00 -03:00
- Accion: compactacion del selector de `Universo` y activacion del hint interno del bloque de controles del `Heatmap`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario indico que el hint operativo debia vivir dentro del mismo box de controles y que el selector de `Universo` seguia dejando demasiado espacio visual sin uso.
- Resultado:
  - el hint visible ahora es el que queda dentro del bloque de controles;
  - el hint exterior queda oculto para evitar duplicacion visual;
  - el selector de `Universo` y los campos vecinos quedaron mas compactos y mejor centrados dentro del contenedor.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Heatmap` y validar si el ancho de `Universo` ya quedo en un punto comodo o si queres una compresion visual todavia mayor.

## 2026-04-16 11:20:00 -03:00
- Accion: correccion de textos heredados del `Heatmap` en la capa de overrides.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-overrides.js`
  - `LOG.md`
- Motivo: el usuario seguia viendo `Heatmap USA` y el copy viejo con referencia a `Finviz` al entrar por primera vez; la causa real era una sobreescritura posterior desde `bdi-overrides.js`.
- Resultado:
  - la capa de overrides ya no fuerza `Heatmap USA` ni el subtitulo viejo;
  - el titulo queda en `Heatmap`;
  - la descripcion asociada pasa a ser una explicacion generica de que es un heatmap y para que sirve.
- Verificacion:
  - `node --check` paso correctamente sobre `rendimientos-ar/public/bdi-overrides.js`.
- Siguiente paso sugerido:
  - refrescar la pagina con `Ctrl + F5` para asegurar que el navegador descargue la version nueva del override y confirmar que el texto viejo no reaparezca.

## 2026-04-16 11:28:00 -03:00
- Accion: refinamiento visual del hint inferior dentro del bloque de controles del `Heatmap`.
- Archivos afectados:
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario compartio una captura donde la aclaracion inferior quedaba demasiado abierta y desbalanceaba el box de controles.
- Resultado:
  - la nota inferior ahora queda centrada;
  - su ancho maximo se acota para que funcione como aclaracion breve;
  - el texto gana una presencia mas discreta y deja de competir con la fila principal de controles.
- Verificacion:
  - ajuste visual en CSS, sin cambios de logica.
- Siguiente paso sugerido:
  - refrescar `Heatmap` y validar si el hint ya acompaÃ±a bien al bloque o si conviene atenuarlo aun mas.

## 2026-04-16 11:34:00 -03:00
- Accion: nuevo ajuste de proporciones del box superior del `Heatmap`.
- Archivos afectados:
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario remarco que el box seguia demasiado grande y que la linea inferior no se percibia centrada.
- Resultado:
  - el contenedor de controles ahora usa ancho `fit-content` con maximo responsivo para no ocupar mas espacio del necesario;
  - el hint inferior se centra mediante un wrapper de ancho completo y contenido acotado, mejorando su alineacion visual;
  - el padding general del box se redujo levemente para que la composicion quede mas compacta.
- Verificacion:
  - ajuste visual en CSS, sin cambios de logica.
- Siguiente paso sugerido:
  - refrescar `Heatmap` y validar si el tamano del box ya quedo natural o si queres una compresion visual todavia un poco mayor.

## 2026-04-16 11:40:00 -03:00
- Accion: correccion del ancho excesivo del box superior del `Heatmap` en desktop.
- Archivos afectados:
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo: el usuario marco que, al abrir `USA`, el contenedor de `Universo + fechas + acciones` seguia usando mas ancho del necesario y se sentia estirado a casi toda la pagina.
- Resultado:
  - el bloque superior paso a una grilla auto-ajustada en desktop para que el ancho siga al contenido real;
  - el campo `Universo` quedo un poco mas compacto;
  - el hint inferior sigue centrado y ocupando toda la fila, pero sin forzar el ancho total del contenedor;
  - en mobile se preserva el comportamiento flexible anterior.
- Verificacion:
  - ajuste visual en CSS, sin cambios de logica.
- Siguiente paso sugerido:
  - refrescar `Heatmap USA` y validar si el box ya acompaÃ±a mejor al contenido o si queres compactar tambien un poco `Inicio` y `Fin`.

## 2026-04-16 12:35:00 -03:00
- Accion: habilitacion de rango historico para `Heatmap` de acciones argentinas, preservando el mismo criterio visual de tamano.
- Archivos afectados:
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - el usuario pidio replicar para Argentina el comportamiento de rango historico que ya existia en `USA`, pero manteniendo en Argentina el mismo proxy de tamano usado en la vista diaria para no desestabilizar el mapa.
- Resultado:
  - `Argentina ARS` ahora calcula la variacion por rango usando `data912/historical/stocks/{ticker}`;
  - `Argentina USD` tambien acepta rango historico y, cuando el ticker dolarizado no tiene serie propia en `data912`, usa el ticker base equivalente solo para el calculo de variacion;
  - el tamano del bloque argentino sigue viniendo del feed live (`precio x volumen`), por lo que la jerarquia visual no cambia al pasar de diario a historico;
  - el frontend ya envia `start/end` tambien para Argentina y deja visibles los selectores de fecha en los tres universos;
  - se actualizaron los copys de fuente para que reflejen mejor que Argentina ya puede trabajar con precios y variaciones por rango.
- Verificacion:
  - `node --check` OK sobre `rendimientos-ar/server.js`;
  - `node --check` OK sobre `rendimientos-ar/netlify/functions/heatmap.js`;
  - `node --check` OK sobre `rendimientos-ar/public/app.js`;
  - prueba local del handler Netlify con `market=argentina-ars&start=2026-04-01&end=2026-04-15`: `26` activos devueltos;
  - prueba local del handler Netlify con `market=argentina-usd&start=2026-04-01&end=2026-04-15`: `21` activos devueltos;
  - prueba local del handler Netlify sin fechas en `argentina-ars`: mantiene la variacion diaria actual.
- Decisiones:
  - se agrego cache en memoria del historico argentino para que el selector de fechas no castigue tanto la experiencia;
  - se priorizo consistencia visual sobre fidelidad estricta del sizing historico, tal como pidio el usuario.
- Siguiente paso sugerido:
  - reiniciar el server local y validar visualmente `Argentina ARS` y `Argentina USD` con un rango historico corto y otro mas largo para revisar tiempos de carga, labels y lectura del color.
## 2026-04-16 12:52:00 -03:00
- Accion: ajuste de alcance para `Argentina USD` en `Heatmap`, dejandolo solo con variacion diaria.
- Archivos afectados:
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - el usuario prefirio no insinuar un historico en `Argentina USD` si la fuente no lo soporta de forma confiable para los tickers dolarizados.
- Resultado:
  - `Argentina USD` vuelve a ignorar `start/end` en backend y serverless;
  - en frontend se ocultan nuevamente los controles de fecha para ese universo;
  - el estado visible del modulo vuelve a decir `variacion diaria` para `Argentina USD`;
  - la fuente visible ahora aclara explicitamente que en ese universo solo se muestra la variacion diaria.
- Verificacion:
  - pendiente de validacion visual luego de reiniciar el server local.
- Siguiente paso sugerido:
  - refrescar `Heatmap`, probar `Argentina USD` y confirmar que ya no aparezcan fechas ni mensajes ambiguos de rango historico.
## 2026-04-16 13:08:00 -03:00
- Accion: mejora visual del grafico y de la tabla final en la calculadora de interes compuesto.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario marco que el eje Y del grafico arrancaba en negativos sin sentido visual, que el label del eje se mezclaba con los ticks y que la tabla final tenia columnas y jerarquia poco prolijas.
- Resultado:
  - el grafico ahora arranca el eje Y en `0` cuando todos los escenarios son positivos;
  - se amplio el margen izquierdo del SVG para separar mejor ticks y label vertical;
  - se aumento la cantidad de ticks del eje Y para mejorar lectura sin ensuciar el grafico;
  - la tabla final gano filas con mas jerarquia visual, zebra suave, mejor peso en columnas monetarias y una fila base destacada;
  - tambien se forzo un ancho minimo de tabla para evitar compresiones feas en desktop.
- Verificacion:
  - `node --check` OK sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar la calculadora de interes compuesto y validar si el grafico ya respira mejor o si queres una segunda pasada sobre tipografia/escala del eje Y.
## 2026-04-16 13:20:00 -03:00
- Accion: mejora visual del selector de capitalizacion en interes compuesto y limpieza del bloque `Desglose final`.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario pidio que el selector de frecuencia de capitalizacion use la misma estetica del selector de universo del heatmap y que el bloque `Desglose final` se vea mas sobrio.
- Resultado:
  - la frecuencia de capitalizacion ahora usa un selector custom con trigger y popover del mismo lenguaje visual que el `Universo` del heatmap;
  - el texto `Frecuencia de capitalizacion: Mensual` quedo corrido un poco a la derecha para alinearse mejor con la tabla;
  - se saco la barra verde vertical del titulo `Desglose final`, dejando el encabezado mas limpio.
- Verificacion:
  - `node --check` OK sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar la calculadora y validar si el selector y el bloque final ya quedaron alineados con el resto de la interfaz.
## 2026-04-16 13:27:00 -03:00
- Accion: ajuste fino de alineacion en el bloque `Desglose final` de interes compuesto.
- Archivos afectados:
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario pidio que `Desglose final` arranque a la misma altura visual que la linea `Frecuencia de capitalizacion: Mensual`, y que ambos queden un poco mas a la izquierda.
- Resultado:
  - se unifico un pequeno indent para el titulo y la descripcion del bloque final;
  - la nota inferior de frecuencia ahora arranca con el mismo desplazamiento horizontal y quedo un poco mas a la izquierda que antes.
- Verificacion:
  - ajuste visual en CSS, sin cambios de logica.
- Siguiente paso sugerido:
  - refrescar la calculadora y validar si el arranque visual ya quedo parejo entre encabezado y nota inferior.
## 2026-04-17 11:35:00 -03:00
- Accion: exclusion automatica de instrumentos vencidos o con vencimiento sobre liquidacion T+1 en `Renta fija ARS`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - el usuario reporto que `S17A6` vencio hoy y seguia apareciendo en la curva con una TIR artificial, distorsionando tabla y grafico.
- Resultado:
  - `loadLecaps()` ahora descarta letras e instrumentos capitalizables cuyo vencimiento ya paso o cae en la fecha de liquidacion T+1;
  - se evita forzar `dias = 1`, por lo que ya no se calculan TIR irreales para instrumentos vencidos;
  - la tabla y el grafico de `Renta fija ARS` solo muestran instrumentos efectivamente comparables.
- Verificacion:
  - `node --check` OK sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Renta fija ARS` y validar que `S17A6` ya no aparezca en lista ni grafico y que futuros vencimientos diarios se filtren solos.
## 2026-04-20 10:05:00 -03:00
- Accion: implementacion provisoria de ajuste Nelson-Siegel en la curva de `Renta fija ARS`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo:
  - el usuario pidio probar una curva de referencia mas formal sobre `TIR vs duration` en pesos, primero en `JavaScript`, y ver debajo del grafico los parametros del ajuste para evaluar si el resultado visual tiene sentido.
- Resultado:
  - la curva de `Renta fija ARS` ahora calibra un modelo Nelson-Siegel en JS sobre los instrumentos vigentes del grafico;
  - se dibuja una guia unica de color naranja sobre los puntos `LECAP` y `BONCAP`;
  - se agrego debajo del SVG un bloque provisional con `beta0`, `beta1`, `beta2` y `tau` para inspeccion rapida;
  - la leyenda incorpora el ajuste sin tocar el resto de las familias de renta fija.
- Verificacion:
  - `node --check` OK sobre `rendimientos-ar/public/bdi-charts.js`.
  - `node --check` OK sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar `Renta fija ARS` y evaluar si la forma de la curva Nelson-Siegel es razonable; si queda forzada o poco estable, mover la calibracion a Python o limitarla a una familia puntual.
## 2026-04-20 10:22:00 -03:00
- Accion: conexion del flujo de carga de renta fija con los renderers extendidos de `bdi-charts.js`.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `LOG.md`
- Motivo:
  - el usuario reporto que la curva nueva no aparecia; se detecto que `app.js` seguia llamando a los renderers locales legacy, por lo que el Nelson-Siegel agregado en `bdi-charts.js` nunca se ejecutaba.
- Resultado:
  - `Renta fija ARS`, `Soberanos`, `CER` y `Corporativos` ahora priorizan los renderers expuestos en `window` por `bdi-charts.js`, manteniendo el fallback local si esa capa no esta disponible;
  - la curva Nelson-Siegel de `Renta fija ARS` y sus parametros ya pueden verse en pantalla.
- Verificacion:
  - `node --check` OK sobre `rendimientos-ar/public/app.js`.
- Siguiente paso sugerido:
  - refrescar la pagina y confirmar visualmente que la curva y el bloque de parametros aparezcan; si la forma no convence, revisar calibracion o mover el ajuste a Python.
## 2026-04-20 10:34:00 -03:00
- Accion: cambio de la guia visible de `Renta fija ARS` a regresion polinomica en `JavaScript`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - el usuario pidio probar una alternativa estetica a Nelson-Siegel sobre la misma curva de renta fija en pesos, sin eliminar la implementacion previa.
- Resultado:
  - la curva visible de `Renta fija ARS` ahora usa una regresion polinomica de grado 2;
  - debajo del grafico se muestran provisoriamente los coeficientes `a0`, `a1` y `a2`, junto con la indicacion del grado del modelo;
  - la logica Nelson-Siegel permanece preservada en `bdi-charts.js` para poder retomarla o compararla despues.
- Verificacion:
  - `node --check` OK sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar `Renta fija ARS` y comparar visualmente si la curva polinomica acompana mejor la nube; si sigue quedando artificial, pasar a una calibracion Python o probar por subfamilias.
## 2026-04-20 10:41:00 -03:00
- Accion: agregado de explicacion visual para los parametros de la regresion polinomica en `Renta fija ARS`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario pidio que, ademas de mostrar `a0`, `a1` y `a2`, la interfaz explique en lenguaje simple que representa cada parametro del ajuste.
- Resultado:
  - debajo del bloque de coeficientes ahora aparece una aclaracion breve sobre:
    - `a0` como nivel base de la curva;
    - `a1` como pendiente inicial;
    - `a2` como curvatura;
  - el bloque quedo estilizado como nota explicativa integrada al chart.
- Verificacion:
  - `node --check` OK sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar `Renta fija ARS` y validar si el texto resulta claro o si conviene volverlo aun mas practico para publico no tecnico.
## 2026-04-20 10:48:00 -03:00
- Accion: redisenio visual del bloque de parametros del ajuste polinomico en `Renta fija ARS`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario marco que el bloque `a0 / a1 / a2` habia quedado feo y demasiado tecnico en crudo.
- Resultado:
  - el bloque ahora usa una cabecera compacta con nombre de modelo y grado;
  - los coeficientes quedaron en tres cards parejas, sin una cuarta celda vacia o forzada;
  - la explicacion paso a notas breves, una por parametro, evitando parrafos largos y densos.
- Verificacion:
  - `node --check` OK sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar `Renta fija ARS` y validar si el bloque ya acompana mejor al grafico o si conviene hacerlo todavia mas minimalista.
## 2026-04-20 10:55:00 -03:00
- Accion: cambio del lenguaje del bloque interpretativo del ajuste polinomico en `Renta fija ARS`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo:
  - el usuario pidio sacar referencias explicitas a `a0`, `a1` y `a2` y reemplazarlas por una lectura mas natural de lo que se observa en la curva.
- Resultado:
  - las cards superiores ahora muestran titulos interpretativos (`Nivel base estimado`, `Pendiente inicial`, `Curvatura`) en vez de nombres de coeficientes;
  - las notas inferiores se reescribieron como lectura narrativa de la curva, con frases mas cercanas a analisis de mercado que a salida matematica cruda.
- Verificacion:
  - `node --check` OK sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar `Renta fija ARS` y validar si el bloque ya comunica mejor la idea general; si sigue cargado, condensarlo a una unica conclusion breve.
## 2026-04-20 11:02:00 -03:00
- Accion: recuperacion de altura visual del grafico en `Renta fija ARS`.
- Archivos afectados:
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario indico que no queria reducir el tamano del grafico y que, con el bloque interpretativo nuevo, la curva habia perdido protagonismo visual.
- Resultado:
  - `#lecaps-chart-section .scatter-plot` ahora usa una altura mayor que el resto de los bloques para devolverle aire al SVG;
  - tambien se dejo una altura especifica mas generosa para pantallas medianas y mobile, evitando que el chart vuelva a verse comprimido.
- Verificacion:
  - ajuste visual en CSS, sin cambios de logica.
- Siguiente paso sugerido:
  - refrescar `Renta fija ARS` y confirmar si el balance entre grafico y bloque interpretativo ya quedo mejor.
## 2026-04-20 11:07:00 -03:00
- Accion: aplicacion del mismo aumento de altura visual a la curva de `Bonos CER`.
- Archivos afectados:
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario pidio replicar en `Bonos CER` la recuperacion de altura hecha en `Renta fija ARS`, para que el grafico vuelva a ser protagonista.
- Resultado:
  - `#cer-chart-section .scatter-plot` ahora usa la misma altura ampliada que `#lecaps-chart-section` en desktop y una version mas generosa en pantallas mas chicas.
- Verificacion:
  - ajuste visual en CSS, sin cambios de logica.
- Siguiente paso sugerido:
  - refrescar `Bonos CER` y validar si el grafico ya respira mejor o si conviene afinar tambien margins internos del SVG.
## 2026-04-20 11:15:00 -03:00
- Accion: reactivacion de la curva visible en `Bonos CER` dentro del renderer SVG.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo:
  - el usuario reporto que no se veia ninguna curva en `Bonos CER`; se detecto que el renderer tenia `guideBuilder`, pero la opcion `showCurve` no estaba activada en esa vista.
- Resultado:
  - la guia de `Bonos CER` vuelve a dibujarse sobre el scatter;
  - se aplica la clase visual `cer-curve` para conservar el estilo mas fino de esa familia.
- Verificacion:
  - `node --check` OK sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar `Bonos CER` y confirmar si la curva ya aparece con la visibilidad esperada.
## 2026-04-20 11:24:00 -03:00
- Accion: unificacion de la guia visible a regresion polinomica en todos los graficos de activos a cotizacion actual.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - el usuario pidio que el mismo criterio de `polinomio ajustado` aparezca no solo en `Renta fija ARS`, sino tambien en `Bonos CER`, `Soberanos` y `Corporativos`.
- Resultado:
  - `Bonos CER` ahora dibuja una curva polinomica ajustada sobre su nube de puntos;
  - `Soberanos` muestra un ajuste polinomico separado para `Ley local` y `Ley NY`;
  - `Corporativos` suma tambien su ajuste polinomico sobre los puntos vigentes;
  - se mantiene el renderer SVG nuevo y la logica Nelson-Siegel sigue preservada en codigo para `Renta fija ARS`.
- Verificacion:
  - `node --check` OK sobre `rendimientos-ar/public/bdi-charts.js`.
- Siguiente paso sugerido:
  - refrescar las cuatro curvas y comparar si la lectura visual gana consistencia o si alguna familia necesita un tratamiento distinto.
## 2026-04-21 10:12:00 -03:00
- Accion: integracion formal del bloque `Engineering / Compound` como estandar tecnico para el desarrollo de BDI.
- Archivos afectados:
  - `AGENTS.md`
  - `README.md`
  - `LOG.md`
- Motivo:
  - el usuario indico que no quiere limpiar ese bloque, sino adoptarlo como referencia tecnica para `Optimizador de carteras` y los modulos de `Renta fija`, manteniendo el sistema de trazabilidad propio de BDI.
- Resultado:
  - `AGENTS.md` ahora explicita que las instrucciones `Engineering / Compound` pasan a ser parte del estandar tecnico aplicable a `Optimizador`, `Renta fija ARS`, `Bonos CER`, `Soberanos` y `Corporativos`;
  - `README.md` incorpora la misma decision para que quede visible tambien a nivel operativo;
  - se deja explicitado que `LOG.md` sigue siendo el registro cronologico obligatorio del proyecto.
- Verificacion:
  - actualizacion documental sin cambios de logica.
- Siguiente paso sugerido:
  - aplicar este criterio tecnico en las proximas iteraciones de optimizador y renta fija, especialmente para separacion de responsabilidades y reglas explicitas en los calculos/renderizados.
## 2026-04-21 10:36:00 -03:00
- Accion: primera fase de refactorizacion segura del `Heatmap`, extrayendo metadata compartida para backend local y Netlify.
- Archivos afectados:
  - `rendimientos-ar/shared/heatmap-config.js`
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - el usuario pidio empezar una refactorizacion tecnica del modulo `Heatmap` con foco en no romper el proyecto y poder volver atras facilmente si algo no convence.
- Resultado:
  - se creo `rendimientos-ar/shared/heatmap-config.js` como fuente comun para:
    - universo `USA`;
    - universo `Argentina ARS`;
    - universo `Argentina USD`;
    - reglas base por mercado (`rangeEnabled`, `dailyOnly`, `sizeMetric`);
  - `server.js` y `netlify/functions/heatmap.js` dejaron de mantener copias separadas de esa metadata y ahora consumen el mismo modulo compartido;
  - no se cambio el payload del endpoint, ni el renderer, ni la UI del heatmap en esta fase.
- Verificacion:
  - `node --check` OK sobre:
    - `rendimientos-ar/server.js`
    - `rendimientos-ar/netlify/functions/heatmap.js`
    - `rendimientos-ar/shared/heatmap-config.js`
- Decisiones:
  - se avanzo primero por la extraccion de metadata, que es el paso mas reversible y de menor riesgo;
  - se postergo la conexion del frontend a reglas/config compartidas para una segunda fase, una vez confirmada esta base.
- Pendientes:
  - centralizar reglas de mercado tambien del lado frontend;
  - separar calculo de variacion/tamano de la obtencion de datos;
  - seguir limpiando la orquestacion del endpoint `/api/heatmap`.
- Siguiente paso sugerido:
  - probar visualmente `USA`, `Argentina ARS` y `Argentina USD` sin cambiar nada mas; si todo sigue estable, avanzar con la segunda fase de configuracion compartida y helpers de reglas.
## 2026-04-21 10:52:00 -03:00
- Accion: segunda fase segura del `Heatmap`, conectando el frontend a reglas explicitas por mercado.
- Archivos afectados:
  - `rendimientos-ar/public/heatmap-config.js`
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - despues de estabilizar la metadata compartida en backend, hacia falta reducir condicionales dispersos en `app.js` para que `USA`, `Argentina ARS` y `Argentina USD` usen una configuracion consistente y facil de mantener.
- Resultado:
  - se creo `rendimientos-ar/public/heatmap-config.js` con reglas explicitas por mercado:
    - `rangeEnabled`;
    - `dailyOnly`;
    - `defaultProvider`;
  - `index.html` ahora carga esa config antes de `app.js`;
  - `app.js` paso a leer esa config para:
    - resolver el provider base por universo;
    - definir si un mercado admite rango historico o solo variacion diaria;
    - mantener el comportamiento de `Argentina USD` como daily-only sin depender de condicionales repetidos.
- Verificacion:
  - `node --check` OK sobre:
    - `rendimientos-ar/public/app.js`
    - `rendimientos-ar/public/heatmap-config.js`
- Decisiones:
  - se mantuvo una config frontend separada y minima para no mezclar runtime de navegador con modulos Node;
  - no se cambio la UI ni el renderer en esta fase, solo el cableado interno de reglas.
- Pendientes:
  - unificar helpers de calculo y normalizacion del heatmap;
  - seguir limpiando el endpoint para dejarlo mas cerca de un orquestador;
  - evaluar si conviene exponer mas config comun sin acoplar frontend y backend de forma fragil.
- Siguiente paso sugerido:
  - probar visualmente el cambio entre `USA`, `Argentina ARS` y `Argentina USD`; si todo sigue estable, avanzar con la extraccion de helpers de calculo/normalizacion.
## 2026-04-21 11:07:00 -03:00
- Accion: tercera fase segura del `Heatmap`, extrayendo helpers puros compartidos para historicos y rango.
- Archivos afectados:
  - `rendimientos-ar/shared/heatmap-helpers.js`
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - hacia falta seguir limpiando la logica del modulo sin tocar la salida visible, separando funciones puras de parseo, normalizacion y calculo para dejar backend local y serverless menos monoliticos.
- Resultado:
  - se creo `rendimientos-ar/shared/heatmap-helpers.js` con helpers reutilizables para:
    - `parseHeatmapDate`;
    - `getArgentinaHeatmapHistorySymbol`;
    - `normalizeArgentinaHistoricalRow`;
    - `computeArgentinaRangeChange`;
    - helpers internos de busqueda temporal sobre series;
  - `server.js` y `netlify/functions/heatmap.js` dejaron de duplicar esa logica y ahora consumen el mismo modulo compartido;
  - no se cambio la UI, el renderer ni el contrato visible del endpoint.
- Verificacion:
  - `node --check` OK sobre:
    - `rendimientos-ar/server.js`
    - `rendimientos-ar/netlify/functions/heatmap.js`
    - `rendimientos-ar/shared/heatmap-helpers.js`
- Decisiones:
  - se extrajeron primero helpers puros y no funciones de fetch, porque es la fase de menor riesgo y mas reversible;
  - se mantuvo separado el runtime de navegador del runtime Node para no introducir acoplamientos innecesarios.
- Pendientes:
  - evaluar extraccion de helpers de fetch/normalizacion por provider;
  - limpiar mas la orquestacion de `/api/heatmap`;
  - definir si conviene formalizar un contrato unico de tile tambien del lado frontend.
- Siguiente paso sugerido:
  - probar visualmente los tres universos y, si todo sigue estable, avanzar con adaptadores por provider (`Yahoo` / `data912`) para seguir desacoplando fetch, normalizacion y respuesta.
## 2026-04-21 11:22:00 -03:00
- Accion: cuarta fase segura del `Heatmap`, incorporando adaptadores compartidos por provider.
- Archivos afectados:
  - `rendimientos-ar/shared/heatmap-provider-data912.js`
  - `rendimientos-ar/shared/heatmap-provider-yahoo.js`
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - el siguiente paso tecnico natural era dejar de mezclar `fetch` y construccion de tiles en una misma funcion, separando responsabilidades por provider para que el endpoint quede mas mantenible.
- Resultado:
  - se creo un adapter compartido para `data912` con construccion de:
    - tiles live de `Argentina ARS/USD`;
    - tiles por rango historico para `Argentina ARS`;
  - se creo un adapter compartido para `Yahoo` con construccion de:
    - `quoteMap`;
    - tiles diarios del universo USA;
    - tiles por rango historico del universo USA;
  - `server.js` y `netlify/functions/heatmap.js` ahora siguen haciendo `fetch`, pero delegan la normalizacion y construccion final de tiles a esos adaptadores;
  - no hubo cambios visibles en UI ni en el contrato publico del endpoint.
- Verificacion:
  - `node --check` OK sobre:
    - `rendimientos-ar/server.js`
    - `rendimientos-ar/netlify/functions/heatmap.js`
    - `rendimientos-ar/shared/heatmap-provider-data912.js`
    - `rendimientos-ar/shared/heatmap-provider-yahoo.js`
- Decisiones:
  - se mantuvo el `fetch` dentro de cada runtime para no acoplar demasiado las diferencias entre `fetchImpl` y `fetchJSON`;
  - los adaptadores quedaron enfocados en transformar datos y no en resolver transporte/red.
- Pendientes:
  - seguir limpiando la orquestacion de `/api/heatmap` para que quede mas declarativa;
  - evaluar un contrato unico de tile documentado tambien para frontend;
  - decidir si la proxima fase conviene enfocarla en endpoint orchestration o en tests/helpers de validacion.
- Siguiente paso sugerido:
  - hacer una pasada de consolidacion del endpoint `/api/heatmap`, centralizando seleccion de provider por mercado y bajando todavia mas la complejidad de `server.js` y `netlify/functions/heatmap.js`.
## 2026-04-21 11:34:00 -03:00
- Accion: quinta fase segura del `Heatmap`, consolidando la orquestacion del endpoint por mercado/provider.
- Archivos afectados:
  - `rendimientos-ar/shared/heatmap-orchestration.js`
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - despues de separar metadata, helpers y adaptadores, faltaba bajar la complejidad de los `if` principales del endpoint para que la seleccion de flujo por mercado quede mas explicita y mantenible.
- Resultado:
  - se creo `rendimientos-ar/shared/heatmap-orchestration.js` con reglas puras para:
    - detectar mercados argentinos;
    - decidir si corresponde rama historica de Argentina;
    - decidir si vale intentar `Polygon` para USA;
    - resolver el provider que informa la respuesta;
  - `server.js` y `netlify/functions/heatmap.js` ahora usan esa orquestacion comun en vez de repetir condicionantes de mercado/provider inline;
  - no se modifico la UI ni el contrato visible del endpoint.
- Verificacion:
  - `node --check` OK sobre:
    - `rendimientos-ar/server.js`
    - `rendimientos-ar/netlify/functions/heatmap.js`
    - `rendimientos-ar/shared/heatmap-orchestration.js`
- Decisiones:
  - la orquestacion se dejo como modulo puro y pequeno, para que siga siendo facil de revisar o revertir;
  - no se forzo todavia una abstraccion mayor del endpoint para evitar una refactorizacion demasiado grande en un solo paso.
- Pendientes:
  - definir si la siguiente fase debe formalizar un contrato unico de tile;
  - evaluar helpers de validacion/sanitizacion para respuestas del heatmap;
  - eventualmente sumar pruebas automatizadas sobre estas reglas compartidas.
- Siguiente paso sugerido:
  - hacer una pasada de estabilizacion y prueba visual de `USA`, `Argentina ARS` y `Argentina USD`; si todo sigue estable, la proxima mejora tecnica razonable es formalizar el contrato unico de tile y documentarlo.
## 2026-04-21 11:52:00 -03:00
- Accion: sexta fase segura del `Heatmap`, formalizando un contrato unico de tile entre backend y frontend.
- Archivos afectados:
  - `rendimientos-ar/shared/heatmap-tile-contract.js`
  - `rendimientos-ar/shared/heatmap-provider-data912.js`
  - `rendimientos-ar/shared/heatmap-provider-yahoo.js`
  - `rendimientos-ar/public/heatmap-tile-contract.js`
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - hacia falta explicitar el shape que consume el renderer del heatmap para no depender de objetos armados de forma diferente segun provider o mercado, y asi reducir fragilidad futura sin cambiar la UI.
- Resultado:
  - se creo `rendimientos-ar/shared/heatmap-tile-contract.js` con un constructor/normalizador comun para tiles del backend;
  - los adaptadores `Yahoo` y `data912` ahora devuelven tiles pasando por ese contrato;
  - se creo `rendimientos-ar/public/heatmap-tile-contract.js` como espejo liviano del lado navegador;
  - `index.html` carga ese contrato antes de `app.js`;
  - `loadHeatmap()` y `loadHeatmapV2()` normalizan `payload.data` antes del render;
  - no se cambio el renderer ni la UI del `Heatmap`.
- Verificacion:
  - `node --check` OK sobre:
    - `rendimientos-ar/shared/heatmap-tile-contract.js`
    - `rendimientos-ar/shared/heatmap-provider-data912.js`
    - `rendimientos-ar/shared/heatmap-provider-yahoo.js`
    - `rendimientos-ar/public/heatmap-tile-contract.js`
    - `rendimientos-ar/public/app.js`
- Decisiones:
  - se opto por un contrato espejo y minimo en frontend, en lugar de intentar compartir modulos Node en navegador;
  - el saneo se aplico antes del render para que cualquier provider futuro herede el mismo shape estable.
- Problemas:
  - un primer parche sobre `app.js` no encontro el bloque exacto y hubo que reaplicarlo de forma mas puntual para evitar tocar otras secciones.
- Pendientes:
  - probar visualmente `USA`, `Argentina ARS` y `Argentina USD`;
  - evaluar si la proxima fase suma validaciones mas fuertes o si conviene ya frenar la refactorizacion y consolidar.
- Siguiente paso sugerido:
  - validar sintaxis y hacer una pasada de estabilizacion visual del `Heatmap`; si sigue todo bien, la siguiente mejora tecnica seria instrumentar validaciones/logs de contrato por provider.
## 2026-04-21 12:04:00 -03:00
- Accion: pasada de consolidacion y chequeo operativo del `Heatmap` sobre los tres universos.
- Archivos afectados:
  - `LOG.md`
- Motivo:
  - despues de formalizar el contrato unico de tile, hacia falta confirmar que el endpoint local siguiera entregando datos consistentes para `USA`, `Argentina ARS` y `Argentina USD` sin romper el renderer.
- Resultado:
  - `http://localhost:3000/api/config` respondio `200`;
  - `USA` con rango `2026-04-14 -> 2026-04-15` respondio `101` activos con provider `yahoo-fallback`;
  - `Argentina ARS` con rango `2026-04-01 -> 2026-04-15` respondio `26` activos con provider `data912-argentina-ars`;
  - `Argentina USD` respondio `21` activos con provider `data912-argentina-usd`;
  - se corrio un chequeo de integridad minimo y los tres universos devolvieron `0` tiles invalidos segun los campos clave (`ticker`, `price`, `change`, `sizeValue/marketCap`).
- Problemas:
  - un primer comando de verificacion uso el operador `??`, no soportado por esta version de PowerShell; se rehizo con sintaxis compatible sin afectar el proyecto.
- Decisiones:
  - se considero cerrada la fase de consolidacion tecnica inicial del `Heatmap`;
  - se prioriza ahora no seguir refactorizando a ciegas y pasar a mejoras de validacion/logging o estabilizacion visual segun necesidad.
- Pendientes:
  - chequeo visual manual en la UI de `USA`, `Argentina ARS` y `Argentina USD`;
  - decidir si conviene avanzar con validaciones mas fuertes por provider o pausar la refactorizacion.
- Siguiente paso sugerido:
  - si el comportamiento visual sigue estable, avanzar con una capa de validacion/logs de contrato por provider; si no, congelar aca y usar esta base ya mas ordenada como punto de mantenimiento.
## 2026-04-21 12:18:00 -03:00
- Accion: septima fase segura del `Heatmap`, combinando validacion/logging por provider y consolidacion final del endpoint.
- Archivos afectados:
  - `rendimientos-ar/shared/heatmap-orchestration.js`
  - `rendimientos-ar/shared/heatmap-observability.js`
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - hacia falta cerrar la refactorizacion tecnica inicial del `Heatmap` con dos mejoras de bajo riesgo:
    - observabilidad minima para detectar payloads raros por provider;
    - endpoint mas declarativo y menos repetitivo.
- Resultado:
  - se agrego `rendimientos-ar/shared/heatmap-observability.js` para:
    - normalizar el dataset final antes de responder;
    - resumir cuantas filas crudas entran y cuantas sobreviven al contrato;
    - emitir `warn` si algun provider devuelve tiles descartados por contrato;
  - se amplio `rendimientos-ar/shared/heatmap-orchestration.js` con `getHeatmapExecutionPlan()` para resolver en un solo paso:
    - rama `USA` vs `Argentina`;
    - modo `range` vs `daily`;
    - provider base esperado;
    - uso potencial de `Polygon`;
  - `server.js` y `netlify/functions/heatmap.js` ahora:
    - usan ese plan declarativo;
    - finalizan la respuesta del `Heatmap` pasando por la capa de observabilidad;
    - normalizan tambien la rama `Polygon` con el contrato de tile;
  - no se modifico la UI ni el contrato visible del endpoint.
- Verificacion:
  - `node --check` OK sobre:
    - `rendimientos-ar/shared/heatmap-orchestration.js`
    - `rendimientos-ar/shared/heatmap-observability.js`
    - `rendimientos-ar/server.js`
    - `rendimientos-ar/netlify/functions/heatmap.js`
  - chequeo operativo local OK:
    - `USA` con rango `2026-04-14 -> 2026-04-15`: `101` activos;
    - `Argentina ARS` con rango `2026-04-01 -> 2026-04-15`: `26` activos;
    - `Argentina USD` daily-only: `21` activos.
- Decisiones:
  - se eligio logging minimalista solo cuando el contrato filtra tiles, para no llenar la consola con ruido;
  - se mantuvo el payload publico igual para no introducir riesgo innecesario en frontend.
- Pendientes:
  - chequeo visual manual en la UI;
  - decidir si se considera el modulo `Heatmap` tecnicamente consolidado o si conviene sumar tests automatizados.
- Siguiente paso sugerido:
  - si la UI sigue estable, frenar la refactorizacion aqui y tomar esta base como version consolidada; el paso siguiente de mayor valor ya seria testing automatizado o nuevas mejoras funcionales, no mas reordenamiento interno.
## 2026-04-21 12:31:00 -03:00
- Accion: correccion funcional del `Heatmap` para primera carga, rueda diaria por defecto y rango inicial de Argentina.
- Archivos afectados:
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - el usuario reporto tres problemas concretos:
    - primera carga de `USA` con valores raros hasta apretar `Aplicar`;
    - `Argentina ARS` mostrando `0%` en variacion diaria al entrar por defecto;
    - los lunes el rango por defecto tomaba domingo en vez de la rueda previa real.
- Resultado:
  - `switchToHeatmap()` ahora fuerza `loadHeatmapV2()` cada vez que se entra a la seccion, en vez de depender de si el contenedor ya tenia hijos;
  - la helper del rango por defecto dejo de usar literalmente `ayer -> hoy` y ahora calcula:
    - ultima rueda valida;
    - rueda previa habil;
  - el boton `Hasta hoy` vuelve a setear ambos extremos del rango con esa misma logica;
  - se actualizaron los textos de hint para reflejar `ultima rueda disponible vs rueda previa`.
- Decisiones:
  - se privilegio consistencia de carga por encima de ahorrar un fetch al reabrir la pestaÃ±a;
  - no se intento resolver feriados de mercado en esta fase, solo fines de semana y lunes, que eran el problema reportado.
- Problemas:
  - ninguno en codigo; la hipotesis principal fue que el `0%` de `Argentina ARS` estaba vinculado a fechas no habiles usadas como rango por defecto.
- Pendientes:
  - validar visualmente en la UI que:
    - `USA` no muestre la primera carga rara;
    - `Argentina ARS` deje de abrir en `0%` cuando el rango por defecto cae en fin de semana/lunes;
    - el hint visible coincida con el comportamiento real.
- Siguiente paso sugerido:
  - hacer una prueba visual manual del `Heatmap` en `USA` y `Argentina ARS`; si sigue estable, tomar este modulo como consolidado y movernos a otro frente del producto.
## 2026-04-21 12:43:00 -03:00
- Accion: ajuste adicional del `Heatmap` para evitar `0%` artificiales en la rueda actual y mejorar el uso de precio live en rangos con fecha final `hoy`.
- Archivos afectados:
  - `rendimientos-ar/shared/heatmap-helpers.js`
  - `rendimientos-ar/shared/heatmap-provider-data912.js`
  - `rendimientos-ar/server.js`
  - `rendimientos-ar/netlify/functions/heatmap.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - al revisar el caso reportado de `Argentina ARS`, aparecio una segunda causa posible: cuando el historico diario todavia no incorpora la rueda actual, el rango puede colapsar y devolver `0%` aunque el feed live tenga variacion disponible.
- Resultado:
  - `computeArgentinaRangeChange()` ahora puede usar precio live cuando la fecha final supera la ultima fecha historica disponible;
  - el provider de `Argentina ARS` suma un fallback a `pct_change` live cuando el historico colapsa el rango actual a un mismo dia;
  - `fetchYahooRangeChange()` en backend local y Netlify ahora tambien puede usar `regularMarketPrice` cuando el historico diario todavia no refleja la fecha final pedida y eso ayudaba a fotos raras en `USA`.
- Verificacion:
  - `node --check` OK sobre:
    - `rendimientos-ar/public/app.js`
    - `rendimientos-ar/shared/heatmap-helpers.js`
    - `rendimientos-ar/shared/heatmap-provider-data912.js`
    - `rendimientos-ar/server.js`
    - `rendimientos-ar/netlify/functions/heatmap.js`
- Problemas:
  - la prueba via `localhost:3000` siguio pegando contra el server ya levantado antes del cambio, asi que para validar el comportamiento final hace falta reiniciar el proceso local;
  - consultas directas a `data912` desde PowerShell no resultaron confiables en este entorno.
- Decisiones:
  - se dejo el fix backend igualmente aplicado porque apunta al caso correcto y no altera el contrato visible del endpoint;
  - se registro explicitamente que la validacion final depende de reiniciar el server local.
- Pendientes:
  - reiniciar el server local y validar visualmente:
    - primera carga de `USA`;
    - apertura de `Argentina ARS` sin `0%` artificial;
    - rango por defecto en lunes y fines de semana.
- Siguiente paso sugerido:
  - reiniciar la app local y revisar `Heatmap` en `USA` y `Argentina ARS`; con eso deberiamos poder cerrar esta tanda de fixes del modulo.
## 2026-04-23 00:00:00 -03:00
- Accion: ajuste visual de las curvas polinomicas en graficos de renta fija.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario reporto que la curva polinomica visible en los graficos se veia con oscilaciones/serrucho, especialmente en soberanos.
- Resultado:
  - se agrego un trazado especifico para curvas polinomicas que usa segmentos lineales densos sobre los puntos ya calculados del ajuste;
  - se evita la interpolacion cubica entre muestras del polinomio, que podia generar micro-ripples visuales;
  - se agrego `shape-rendering: geometricPrecision` y `vector-effect: non-scaling-stroke` al stroke de curva para mejorar nitidez.
- Pendientes:
  - validar visualmente en `Renta fija ARS`, `Bonos CER`, `Soberanos` y `Corporativos`.
- Siguiente paso sugerido:
  - refrescar la pagina con `Ctrl + F5` y revisar que la curva se vea continua, sin ondulaciones artificiales.
## 2026-04-23 00:00:00 -03:00
- Accion: aumento de altura y correccion de dominio para la `Curva CER`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario reporto que el grafico CER no tenia suficiente espacio vertical y que la curva polinomica podia salir por arriba del grafico.
- Resultado:
  - `renderScatter()` ahora acepta altura configurable por grafico;
  - `Curva CER` usa un SVG interno mas alto;
  - el dominio Y de CER ahora se calcula incluyendo tambien los puntos de la curva polinomica, no solo los bonos;
  - el contenedor CSS de CER subio a `900px` en desktop y `760px` en pantallas chicas.
- Pendientes:
  - validar visualmente que la curva ya no se corte y que el grafico respire mejor.
- Siguiente paso sugerido:
  - refrescar con `Ctrl + F5` y revisar `Bonos CER`.
## 2026-04-23 10:47:37 -03:00
- Accion: ajuste del alto visual del contenedor de la `Curva CER`.
- Archivos afectados:
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario reporto que el grafico CER habia quedado mas alto, pero el box contenedor crecio demasiado y dejaba aire visual innecesario.
- Resultado:
  - se redujo el alto desktop del contenedor CER de `900px` a `800px`;
  - se redujo el alto responsive de `760px` a `700px`;
  - se mantuvo intacto el calculo, el dominio Y y el SVG interno de la curva.
- Pendientes:
  - validar visualmente que el box acompaÃ±e mejor al grafico y que la curva siga sin cortarse.
- Siguiente paso sugerido:
  - refrescar con `Ctrl + F5` y revisar `Bonos CER`.
## 2026-04-23 10:54:19 -03:00
- Accion: automatizacion del alto del box de graficos de renta fija.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario pidio evitar reconfiguraciones manuales separadas entre el tamaÃƒÂ±o del grafico y el tamaÃƒÂ±o del box contenedor.
- Resultado:
  - `renderScatter()` ahora publica el alto real del SVG en la variable CSS `--bdi-chart-height`;
  - `.scatter-plot` dejo de tener alto fijo y pasa a ajustarse automaticamente al contenido renderizado;
  - se eliminaron reglas especificas de alto para `LECAPS` y `CER` que podian desincronizarse;
  - `Renta fija ARS` conserva su alto amplio desde la configuracion del render, no desde CSS externo.
- Verificacion:
  - `node --check rendimientos-ar/public/bdi-charts.js` OK.
- Pendientes:
  - validar visualmente `Renta fija ARS`, `Bonos CER`, `Soberanos` y `Corporativos` para confirmar que el box acompaÃƒÂ±a al grafico sin aire sobrante.
- Siguiente paso sugerido:
  - refrescar con `Ctrl + F5` y revisar primero `Bonos CER`; si queda bien, revisar las otras curvas.
## 2026-04-23 11:02:43 -03:00
- Accion: mejora visual de labels, ticks y referencias en la `Curva CER`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario aprobo mejorar la estetica del grafico CER, con foco especial en la legibilidad de labels y manteniendo posibilidad de volver atras si no convence.
- Resultado:
  - se agregaron ticks Y redondeados cada `5%` para que la escala sea mas facil de leer;
  - se agrego una linea horizontal suave en `0%` de TIR real;
  - se incorporo una estrategia especifica de ubicacion de labels CER con mas candidatos de posicion por tramo de duration;
  - se amplio la separacion contra puntos para reducir solapamientos;
  - la curva naranja paso a segundo plano con menor grosor y menor opacidad;
  - el caption inferior se cambio por una explicacion mas clara de la lectura del grafico.
- Verificacion:
  - `node --check rendimientos-ar/public/bdi-charts.js` OK.
- Pendientes:
  - validar visualmente si los labels del tramo corto quedaron suficientemente claros o si conviene reforzar mas callouts.
- Siguiente paso sugerido:
  - refrescar con `Ctrl + F5`, revisar `Bonos CER` y decidir si mantenemos esta version o revertimos el bloque visual.
## 2026-04-23 11:09:17 -03:00
- Accion: segunda mejora de labels en la `Curva CER`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `rendimientos-ar/public/styles.css`
  - `LOG.md`
- Motivo:
  - el usuario reporto que algunos nombres quedaban demasiado lejos del punto y se podia confundir a que bono correspondian.
- Resultado:
  - el algoritmo de labels ahora penaliza la distancia, priorizando posiciones cercanas al punto;
  - los candidatos especificos para labels CER se redujeron en distancia maxima;
  - se mantuvieron alternativas arriba/abajo/izquierda/derecha para evitar solapamientos sin perder asociacion visual;
  - las lineas guia CER se hicieron un poco mas visibles para los casos donde el label deba separarse.
- Verificacion:
  - `node --check rendimientos-ar/public/bdi-charts.js` OK.
- Pendientes:
  - validar visualmente con captura si el tramo corto ya queda claro o si conviene pasar a un modo de labels con fondo/pill para mejorar todavia mas.
- Siguiente paso sugerido:
  - refrescar con `Ctrl + F5` y revisar especialmente los bonos de duration corta en `Curva CER`.
## 2026-04-23 11:13:39 -03:00
- Accion: ajuste de estimacion de cajas de labels en la `Curva CER`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo:
  - el usuario detecto que labels como `X31L6` quedaban demasiado lejos del punto; la causa era que el algoritmo podia estimar cajas de texto mas anchas que el label final visible.
- Resultado:
  - `estimateLabelBox()` ahora permite estimar labels inline sin asumir siempre que se muestra tambien el valor de TIR;
  - `Curva CER` usa esa estimacion mas compacta para ubicar nombres cerca del punto;
  - se bajo levemente el radio de repelencia de puntos en CER para evitar desplazamientos excesivos.
- Verificacion:
  - `node --check rendimientos-ar/public/bdi-charts.js` OK.
- Pendientes:
  - validar visualmente si `X31L6` y el cluster corto quedan mas cerca sin volver a solaparse.
- Siguiente paso sugerido:
  - refrescar con `Ctrl + F5` y revisar nuevamente la zona izquierda de la `Curva CER`.
## 2026-04-23 11:23:53 -03:00
- Accion: cambio de prioridad de ubicacion de labels en la `Curva CER`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo:
  - el usuario pidio que, cuando no haya problema de espacio, el nombre quede prioritariamente a la derecha del punto; izquierda ante congestion y diagonales solo cuando haya demasiados puntos.
- Resultado:
  - la lista de candidatos de labels CER ahora prioriza derecha horizontal;
  - luego prueba derecha levemente arriba/abajo;
  - despues prueba izquierda;
  - por ultimo usa diagonales y posiciones verticales si el cluster esta muy cargado;
  - se mantiene la penalizacion por distancia y solapamiento para no forzar posiciones ilegibles.
- Verificacion:
  - `node --check rendimientos-ar/public/bdi-charts.js` OK.
- Pendientes:
  - validar visualmente que los labels sin conflicto queden a la derecha y que el cluster corto siga legible.
- Siguiente paso sugerido:
  - refrescar con `Ctrl + F5` y revisar la distribucion de labels en `Curva CER`.
## 2026-04-23 11:29:10 -03:00
- Accion: exclusion visual provisoria de `PARP` en la `Curva CER`.
- Archivos afectados:
  - `rendimientos-ar/public/bdi-charts.js`
  - `LOG.md`
- Motivo:
  - el usuario pidio sacar `PARP` del grafico para evaluar como queda la curva sin ese ticker de duration larga.
- Resultado:
  - `PARP` se filtra solo en el render del grafico CER;
  - no se elimina de la fuente de datos ni de la tabla;
  - el ajuste polinomico y dominio del grafico pasan a calcularse sobre los puntos visibles sin `PARP`.
- Verificacion:
  - `node --check rendimientos-ar/public/bdi-charts.js` OK.
- Pendientes:
  - validar visualmente si la curva CER queda mas clara sin `PARP`.
- Siguiente paso sugerido:
  - refrescar con `Ctrl + F5` y revisar `Curva CER`.
## 2026-04-23 11:40:42 -03:00
- Accion: primer paso de separacion tecnica para la calculadora de `Interes compuesto`.
- Archivos afectados:
  - `rendimientos-ar/public/compound-core.js`
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - el usuario pidio empezar a separar la seccion de `Interes compuesto` del resto de secciones, siguiendo una refactorizacion chica, reversible y de bajo riesgo.
- Resultado:
  - se creo `rendimientos-ar/public/compound-core.js` con la logica financiera pura de la calculadora;
  - `app.js` dejo de alojar `getEffectiveMonthlyRate()` y `runCompoundScenario()`;
  - `runCompoundCalculator()` ahora consume `window.BDICompoundCore.buildCompoundResults()` e `isValidCompoundInputSet()`;
  - `index.html` carga el nuevo modulo antes de `app.js`;
  - no se modifico todavia el render visual ni la estructura HTML de la seccion.
- Verificacion:
  - `node --check rendimientos-ar/public/app.js` OK.
  - `node --check rendimientos-ar/public/compound-core.js` OK.
- Decisiones:
  - se priorizo separar primero calculo vs UI, porque es el bloque mas seguro para mover sin romper la experiencia.
- Pendientes:
  - mover en un segundo paso la lectura de inputs y el armado de resultados intermedios a helpers propios de la seccion;
  - dejar para una etapa posterior la separacion del render SVG/tabla/resumen.
- Siguiente paso sugerido:
  - hacer un segundo paso chico sobre la seccion para desacoplar `runCompoundCalculator()` del DOM y dejar a `app.js` solo como orquestador liviano.
## 2026-04-23 11:44:53 -03:00
- Accion: segundo paso de separacion tecnica para la calculadora de `Interes compuesto`.
- Archivos afectados:
  - `rendimientos-ar/public/compound-ui.js`
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - continuar la separacion incremental de la seccion, reduciendo la dependencia directa de `runCompoundCalculator()` respecto del DOM y del texto inline de status.
- Resultado:
  - se creo `rendimientos-ar/public/compound-ui.js`;
  - la lectura de inputs del formulario ahora vive en `readCompoundCalculatorInputs()`;
  - el mensaje de estado posterior al calculo ahora se compone con `buildCompoundStatusMessage()`;
  - `index.html` carga el nuevo modulo antes de `app.js`;
  - `runCompoundCalculator()` quedo mas cerca de un orquestador que conecta `UI -> core -> render`.
- Verificacion:
  - `node --check rendimientos-ar/public/app.js` OK.
  - `node --check rendimientos-ar/public/compound-ui.js` OK.
- Decisiones:
  - se mantuvo un fallback defensivo dentro de `app.js` por si el helper no carga, para no romper la calculadora.
- Pendientes:
  - separar en un proximo paso el render del grafico/resumen/tabla fuera de `app.js` o, al menos, centralizar el armado de view-models de la seccion.
- Siguiente paso sugerido:
  - hacer un tercer paso chico para mover la preparacion de datos del grafico y del breakdown a helpers propios de `Interes compuesto`.
## 2026-04-23 11:49:12 -03:00
- Accion: tercer paso de separacion tecnica para la calculadora de `Interes compuesto`.
- Archivos afectados:
  - `rendimientos-ar/public/compound-view-models.js`
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - continuar la modularizacion de la seccion, dejando fuera de `app.js` la preparacion de datos para el resumen, el breakdown y el grafico.
- Resultado:
  - se creo `rendimientos-ar/public/compound-view-models.js`;
  - `renderCompoundSummary()` ahora consume un summary model;
  - `renderCompoundBreakdown()` ahora consume un breakdown model;
  - `renderCompoundChart()` ahora consume un chart model;
  - `app.js` conserva el render SVG/HTML, pero deja de calcular internamente buena parte de la estructura previa a la vista.
- Verificacion:
  - `node --check rendimientos-ar/public/app.js` OK.
  - `node --check rendimientos-ar/public/compound-view-models.js` OK.
- Decisiones:
  - se mantuvo el render dentro de `app.js` para no abrir un frente grande de riesgo en esta etapa.
- Pendientes:
  - mover en un paso posterior el render SVG/HTML de la calculadora a un modulo propio;
  - revisar si conviene crear un namespace `BDICompound` que agrupe `core`, `ui` y `view-models`.
- Siguiente paso sugerido:
  - hacer un cuarto paso chico para separar el render del chart y/o de las tarjetas, manteniendo el comportamiento actual.
## 2026-04-23 12:03:43 -03:00
- Accion: cuarto y quinto paso juntos para la separacion tecnica de la calculadora de `Interes compuesto`.
- Archivos afectados:
  - `rendimientos-ar/public/compound-renderers.js`
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - completar la separacion de la capa visual de la seccion, moviendo el render del resumen, la tabla final y el grafico a un modulo propio, sin abrir un refactor riesgoso.
- Resultado:
  - se creo `rendimientos-ar/public/compound-renderers.js`;
  - el render de tarjetas, breakdown y grafico ahora vive fuera de `app.js`;
  - `index.html` carga el nuevo bundle antes de `app.js`;
  - `app.js` quedo como orquestador y delega el render en `window.BDICompoundRenderers`;
  - se agrego una validacion defensiva para abortar con mensaje claro si la capa de render no estuviera disponible.
- Verificacion:
  - pendiente de validacion sintactica final sobre `app.js` y `compound-renderers.js`.
- Decisiones:
  - se mantuvo una transicion conservadora dentro de `app.js`, priorizando bajo riesgo y reversibilidad por sobre limpieza agresiva en un solo paso.
- Pendientes:
  - correr la validacion sintactica final;
  - evaluar en una etapa posterior si conviene remover el render legacy ya eclipsado dentro de `app.js`.
- Siguiente paso sugerido:
  - revisar visualmente la calculadora y, si todo sigue estable, avanzar con una limpieza controlada del codigo legado que ya no participa del flujo activo.
## 2026-04-23 12:06:37 -03:00
- Accion: documentacion del pendiente de limpieza legacy en la seccion de `Interes compuesto`.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo:
  - dejar explicitado que todavia existe codigo legacy eclipsado dentro de `app.js`, aunque no bloquea la arquitectura actual ni requiere accion inmediata.
- Resultado:
  - se agrego en `README.md` la nota de pendiente sobre una futura limpieza controlada del codigo legacy de la calculadora.
- Decisiones:
  - no avanzar por ahora con la remocion del codigo legado para mantener bajo riesgo y evitar cambios innecesarios.
- Pendientes:
  - solo abordar esa limpieza si mas adelante aporta claridad real o simplifica mantenimiento.
## 2026-04-23 12:17:06 -03:00
- Accion: limpieza de menciones documentales heredadas del nombre `Cocos`.
- Archivos afectados:
  - `AGENTS.md`
  - `README.md`
  - `LOG.md`
  - `rendimientos-ar/public/app.js`
- Motivo:
  - erradicar referencias documentales y metadatos no funcionales asociadas al broker original, manteniendo intacto el comportamiento de la pagina.
- Resultado:
  - se reemplazo el naming documental `BDI App Cocos / BDI-App-Cocos` por `BDI Consultora App / BDI-Consultora-App`;
  - se actualizaron rutas documentales para reflejar el workspace actual;
  - se removio una referencia textual no funcional en un comentario de `app.js`;
  - se verifico que las unicas menciones remanentes a `Cocos` estan en `config.json` y en el matching funcional de logos/datos dentro de `app.js`.
- Decisiones:
  - no se tocaron `rendimientos-ar/public/config.json` ni las claves/matches funcionales de `rendimientos-ar/public/app.js` para no alterar datos, logos ni comportamiento visible de la pagina.
- Pendientes:
  - si en una etapa posterior se quiere eliminar por completo la presencia del broker tambien a nivel funcional/visible, habra que definir un reemplazo de datos y branding que no rompa la UX ni el contenido financiero.
## 2026-04-23 12:50:33 -03:00
- Accion: primer paso de ordenamiento de metadata manual de `Renta fija` en una capa propia BDI.
- Archivos afectados:
  - `rendimientos-ar/public/fixed-income/shared/schemas.js`
  - `rendimientos-ar/public/fixed-income/shared/dates.js`
  - `rendimientos-ar/public/fixed-income/shared/cashflows.js`
  - `rendimientos-ar/public/fixed-income/shared/labels.js`
  - `rendimientos-ar/public/fixed-income/corporativos/instruments.js`
  - `rendimientos-ar/public/fixed-income/corporativos/issuers.js`
  - `rendimientos-ar/public/fixed-income/corporativos/catalog.js`
  - `rendimientos-ar/public/fixed-income/corporativos/adapters.js`
  - `rendimientos-ar/public/fixed-income/lecaps/instruments.js`
  - `rendimientos-ar/public/fixed-income/lecaps/catalog.js`
  - `rendimientos-ar/public/fixed-income/lecaps/adapters.js`
  - `rendimientos-ar/public/fixed-income/cer/instruments.js`
  - `rendimientos-ar/public/fixed-income/cer/catalog.js`
  - `rendimientos-ar/public/fixed-income/cer/adapters.js`
  - `rendimientos-ar/public/fixed-income/soberanos/instruments.js`
  - `rendimientos-ar/public/fixed-income/soberanos/catalog.js`
  - `rendimientos-ar/public/fixed-income/soberanos/adapters.js`
  - `rendimientos-ar/public/fixed-income/index.js`
  - `rendimientos-ar/public/bdi-ons-data.js`
  - `rendimientos-ar/public/index.html`
  - `README.md`
  - `LOG.md`
- Motivo:
  - comenzar la migracion de metadata manual hacia una estructura mas prolija, mantenible y propia de BDI, empezando por `corporativos`.
- Resultado:
  - se creo la carpeta `fixed-income/` con estructura por familia y helpers compartidos;
  - se migraron los datos manuales de `corporativos` desde el antiguo `bdi-ons-data.js` a una separacion `instrumentos + emisores + catalogo + adapters`;
  - se mantuvo `bdi-ons-data.js` como shim de compatibilidad para que la app siga leyendo `window.BDI_ON_MONITOR` sin cambios visibles;
  - `index.html` ahora carga la nueva capa antes del shim.
- Verificacion:
  - `node --check` OK en `schemas.js`, `catalog.js`, `adapters.js`, `fixed-income/index.js` y `bdi-ons-data.js`;
  - el shim de compatibilidad sigue exponiendo `15` instrumentos en `window.BDI_ON_MONITOR`.
- Problemas:
  - durante el cambio se reemplazo momentaneamente `bdi-ons-data.js`; se recompuso inmediatamente como archivo de compatibilidad para respetar la restriccion de no borrar archivos y conservar bajo riesgo.
- Decisiones:
  - no migrar todavia `lecaps`, `cer` ni `soberanos` para mantener el paso acotado;
  - dejar creados los directorios y stubs del resto de familias para fijar desde ahora la arquitectura objetivo.
- Pendientes:
  - migrar `soberanos`, `cer` y `lecaps` a la nueva capa `fixed-income/`;
  - cuando la migracion este completa, evaluar una limpieza controlada de referencias legacy en `config.json` y otros archivos puente.
## 2026-04-23 12:58:58 -03:00
- Accion: migracion de la metadata manual de `Soberanos` a la capa `fixed-income/`.
- Archivos afectados:
  - `rendimientos-ar/public/fixed-income/soberanos/instruments.js`
  - `rendimientos-ar/public/fixed-income/soberanos/catalog.js`
  - `rendimientos-ar/public/fixed-income/soberanos/adapters.js`
  - `rendimientos-ar/public/fixed-income/index.js`
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo:
  - continuar el ordenamiento de la renta fija manual en una estructura mas clara y consistente, manteniendo compatibilidad con la app actual.
- Resultado:
  - se genero `fixed-income/soberanos/instruments.js` a partir de la metadata actual de `config.json`;
  - se agregaron `catalog.js` y `adapters.js` para exponer la familia de forma ordenada;
  - `index.html` ahora carga la familia `soberanos` dentro de la nueva capa;
  - `app.js` ya consulta primero `BDIFixedIncomeData.soberanos` y solo usa `config.soberanos` como fallback transitorio;
  - esto impacta tanto en la seccion de `Soberanos` como en la lectura de holdings del portfolio.
- Verificacion:
  - `node --check` OK en `soberanos/instruments.js`, `soberanos/catalog.js`, `soberanos/adapters.js` y `app.js`;
  - el catalogo nuevo expone la misma cantidad de bonos que `config.soberanos`: `13:13`.
- Decisiones:
  - no se removio todavia `config.soberanos` para mantener rollback simple y riesgo bajo;
  - se reutilizo exactamente la metadata vigente para asegurar equivalencia funcional.

## 2026-04-23 19:08:00 -03:00
- Accion: migracion de la metadata manual de `CER` a la capa `fixed-income/`.
- Archivos afectados:
  - `rendimientos-ar/public/fixed-income/cer/instruments.js`
  - `rendimientos-ar/public/fixed-income/cer/catalog.js`
  - `rendimientos-ar/public/fixed-income/cer/adapters.js`
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo: continuar la separacion prolija de metadata manual de renta fija fuera de `config.json` y consolidar la familia `CER` en la arquitectura BDI `fixed-income/*`.
- Resultado:
  - se genero `fixed-income/cer/instruments.js` a partir de la metadata vigente de `config.json`;
  - `catalog.js` y `adapters.js` ahora exponen la familia CER de forma consistente con `corporativos` y `soberanos`;
  - `index.html` carga la nueva familia antes de `fixed-income/index.js`;
  - `app.js` ya consulta primero `BDIFixedIncomeData.cer` y mantiene `config.bonos_cer` como fallback transitorio;
  - esto impacta tanto en `Bonos CER` como en la lectura de holdings CER dentro de `Mi cartera`.
- Problemas encontrados:
  - un parche grande inicial no enganchó completo y se reaplicó en bloques más chicos para mantener bajo riesgo.
- Decisiones tomadas:
  - preservar por ahora el fallback hacia `config.json` para sostener una reversión simple;
  - no limpiar todavía `config.bonos_cer` hasta terminar la migración de `LECAPs/BONCAPs`.
- Pendientes:
  - validar la paridad exacta de instrumentos CER contra `config.json`;
  - migrar `LECAPs/BONCAPs` a la misma estructura.
- Siguiente paso sugerido:
  - completar `LECAPs/BONCAPs` y luego evaluar una limpieza controlada de metadata legacy en `config.json`.

## 2026-04-23 19:23:00 -03:00
- Accion: migracion de la metadata manual de `LECAPs/BONCAPs` a la capa `fixed-income/`.
- Archivos afectados:
  - `rendimientos-ar/public/fixed-income/lecaps/instruments.js`
  - `rendimientos-ar/public/fixed-income/lecaps/catalog.js`
  - `rendimientos-ar/public/fixed-income/lecaps/adapters.js`
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/app.js`
  - `README.md`
  - `LOG.md`
- Motivo: completar la migracion de la renta fija ARS manual a la arquitectura BDI `fixed-income/*`, preservando fuente, fecha de actualizacion y universo de instrumentos.
- Resultado:
  - se genero `fixed-income/lecaps/instruments.js` a partir de la metadata vigente de `config.json`;
  - `catalog.js` y `adapters.js` ahora exponen la familia con `fuente`, `actualizado`, lista de letras y lookup por ticker;
  - `index.html` carga la nueva familia antes de `fixed-income/index.js`;
  - `app.js` ya consulta primero `BDIFixedIncomeData.lecaps` tanto en la seccion principal como en el flujo de `Mi cartera`, manteniendo `config.lecaps` como fallback transitorio.
- Decisiones tomadas:
  - modelar `LECAPs/BONCAPs` con una estructura levemente mas rica que otras familias para preservar `fuente` y `actualizado`;
  - mantener la nomenclatura y reglas de calculo actuales, sin tocar presentacion ni formulas.
- Pendientes:
  - validar paridad exacta entre la capa nueva y `config.json`;
  - evaluar, en una siguiente etapa, la limpieza controlada de metadata legacy ya duplicada en `config.json`.
- Siguiente paso sugerido:
  - validar paridad y, si da bien, pasar a revisar si ya conviene planificar la limpieza gradual de `config.json`.

## 2026-04-23 19:41:00 -03:00
- Accion: limpieza controlada de metadata legacy duplicada en `config.json`.
- Archivos afectados:
  - `rendimientos-ar/public/config.json`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario valido visualmente que la app ya funciona correctamente leyendo la nueva capa `public/fixed-income/`, por lo que la metadata duplicada en `config.json` podia reducirse sin perder funcionamiento visible.
- Resultado:
  - `lecaps` se redujo a un placeholder minimo con `fuente`, `actualizado` y `letras: []`;
  - `soberanos` se redujo a `{}`;
  - `bonos_cer` se redujo a `{}`;
  - `config.json` sigue siendo JSON valido y la app mantiene fallback tecnico basico, pero la fuente real de metadata manual ya es `public/fixed-income/`.
- Problemas encontrados:
  - durante la limpieza manual quedo un remanente del bloque viejo de `soberanos` y el JSON se invalido temporalmente;
  - se reconstruyo el archivo por bloques de texto y se valido de nuevo antes de cerrar la tarea.
- Decisiones tomadas:
  - no eliminar por completo las claves del JSON para conservar forma de esquema y fallback basico;
  - concentrar la metadata operativa de renta fija en la nueva capa BDI y dejar `config.json` liviano.
- Verificacion:
  - `JSON.parse` OK sobre `rendimientos-ar/public/config.json`;
  - `node --check` OK sobre `rendimientos-ar/public/app.js`;
  - `config.json` muestra placeholders limpios en `lecaps`, `soberanos` y `bonos_cer`.
- Pendientes:
  - evaluar en una etapa posterior si conviene quitar tambien los fallbacks legacy de `app.js` una vez que la nueva capa quede considerada definitiva.
- Siguiente paso sugerido:
  - hacer una ultima prueba visual rapida de `Renta fija ARS`, `Bonos CER`, `Soberanos` y `Mi cartera`, y si sigue todo bien, dar por cerrada la migracion de metadata manual de renta fija.

## 2026-04-23 20:02:00 -03:00
- Accion: correccion de routing del endpoint `Heatmap` para despliegue en Netlify.
- Archivos afectados:
  - `rendimientos-ar/netlify.toml`
  - `LOG.md`
- Motivo: el usuario reporto `Error al cargar heatmap: HTTP 404` en todos los universos; la investigacion mostro que `/api/heatmap` existia en `server.js` y en `netlify/functions/heatmap.js`, pero faltaba el redirect correspondiente en Netlify.
- Resultado:
  - se agrego el redirect `from = "/api/heatmap"` hacia `/.netlify/functions/heatmap`;
  - esto alinea el deploy de Netlify con el comportamiento local de `server.js`.
- Decisiones tomadas:
  - corregir solo la capa de routing, sin tocar la logica del provider ni el frontend del heatmap.
- Pendientes:
  - redeploy en Netlify o reinicio del entorno que use `netlify.toml` para que tome la nueva regla.
- Siguiente paso sugerido:
  - disparar un nuevo deploy y probar otra vez `USA`, `Argentina ARS` y `Argentina USD`.
- Pendientes:
  - migrar `cer` y `lecaps` a la misma capa;
  - cuando todas las familias esten migradas, evaluar una limpieza controlada de `config.json`.

