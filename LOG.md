# LOG.md

## 2026-03-25 12:28:35 -03:00
- Acción: inspección inicial del workspace seleccionado.
- Archivos afectados: ninguno.
- Motivo: verificar el estado real del proyecto antes de cualquier cambio.
- Resultado:
  - la carpeta raíz `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos` no contiene todavía un repositorio Git del producto;
  - se detectó únicamente la carpeta `Estilo visual BDI/`;
  - dentro de esa carpeta hay un manual de marca en PDF y un isotipo PNG.
- Problemas encontrados:
  - el código fuente de la app a transformar no está presente en el workspace local;
  - `git status` en la raíz falló porque no existe repo inicializado;
  - `rg --files` no pudo ejecutarse por acceso denegado en este entorno, por lo que la inspección local se hizo con `Get-ChildItem`.
- Intentos fallidos:
  - `rg --files` en la raíz del workspace.
  - `git status --short --branch` en la raíz y en `Estilo visual BDI/`.
- Decisiones tomadas:
  - crear documentación operativa base antes de avanzar;
  - dejar explícito que la auditoría del repo fuente se está haciendo de forma remota mientras no exista un clon local.
- Pendientes:
  - completar auditoría técnica del repositorio `rendimientos-ar`;
  - documentar arquitectura, endpoints, dependencias y riesgos;
  - definir estrategia de incorporación del código fuente al workspace.
- Siguiente paso sugerido:
  - cerrar la auditoría inicial y luego decidir si conviene clonar el repo base dentro de esta carpeta o construir una base propia inspirada en él.

## 2026-03-25 12:28:35 -03:00
- Acción: creación de documentación persistente inicial.
- Archivos afectados:
  - `README.md`
  - `AGENTS.md`
  - `LOG.md`
- Motivo: cumplir la disciplina documental obligatoria del proyecto y dejar memoria operativa persistente.
- Resultado:
  - se creó `README.md` con objetivo, estado del workspace, restricciones, estructura actual y próximos pasos;
  - se creó `AGENTS.md` con reglas operativas, alcance, TO DO y NOT DO;
  - se creó `LOG.md` como registro cronológico del proyecto.
- Problemas encontrados: ninguno durante la creación de estos archivos.
- Decisiones tomadas:
  - mantener el nombre operativo del proyecto como `BDI App Cocos` hasta definir branding definitivo del producto;
  - registrar explícitamente que la carpeta raíz no es aún un repositorio Git.
- Pendientes:
  - actualizar estos archivos al finalizar la auditoría inicial con hallazgos más precisos;
  - incorporar la estructura real del código fuente cuando exista en local.
- Siguiente paso sugerido:
  - terminar el diagnóstico técnico del proyecto base y convertirlo en una propuesta de migración BDI sin alterar todavía el funcionamiento.

## 2026-03-25 12:28:35 -03:00
- Acción: auditoría remota inicial del repositorio fuente `arisbdar/rendimientos-ar` y de la app publicada `rendimientos.co`.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: documentar la arquitectura actual del producto base antes de cualquier clonación o implementación local.
- Resultado:
  - se identificó stack basado en frontend estático + Express local + Netlify Functions;
  - se relevaron endpoints públicos, fuentes de datos y estructura principal del repo;
  - se detectó presencia de `supabase/` y endpoint `/api/auth-config`, lo que sugiere dependencia de auth/portfolio no documentada del todo;
  - se confirmó que producción depende de redirects y funciones de Netlify;
  - se dejó asentada advertencia legal por ausencia visible de archivo `LICENSE`, aunque `package.json` declara `ISC`.
- Problemas encontrados:
  - el código fuente no está aún en el workspace local;
  - la inspección remota permite ver estructura y documentación, pero no reemplaza una revisión de código local completa;
  - no fue posible validar todavía el detalle interno de todas las Netlify functions ni de `server.js`.
- Intentos fallidos:
  - apertura parcial de algunos archivos remotos vía raw/click que devolvieron cache miss.
- Decisiones tomadas:
  - basar esta primera auditoría en señales consistentes del README remoto, `package.json`, `netlify.toml` y la app publicada;
  - no asumir compatibilidad comercial automática por la licencia hasta revisarla mejor.
- Pendientes:
  - decidir si se clona el repo base dentro del workspace para una auditoría local completa;
  - revisar material de marca BDI para alimentar sistema visual;
  - pasar a propuesta de producto BDI y plan técnico de migración.
- Siguiente paso sugerido:
  - definir estrategia de incorporación del código fuente al workspace y luego avanzar con la propuesta de producto/navegación BDI sobre una base auditada.

## 2026-03-25 12:43:00 -03:00
- Acción: verificación del clon local del repositorio fuente dentro del workspace.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: confirmar que el proyecto base ya está disponible localmente y actualizar el contexto operativo.
- Resultado:
  - se detectó la carpeta `rendimientos-ar/` dentro de `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos`;
  - el repo contiene `.git`, `public/`, `netlify/`, `supabase/`, `test/`, `server.js`, `netlify.toml` y `package.json`;
  - `git status --short --branch` dentro del clon devolvió `## main...origin/main`, sin cambios locales.
- Problemas encontrados: ninguno en la verificación del clon.
- Decisiones tomadas:
  - pasar de auditoría remota a auditoría local real;
  - mantener la documentación raíz como fuente de contexto del proyecto contenedor.
- Pendientes:
  - mapear arquitectura funcional local;
  - explicar dependencias y flujo de datos en lenguaje simple.
- Siguiente paso sugerido:
  - revisar archivos clave del clon: `server.js`, `public/index.html`, `public/app.js`, `netlify/functions/*`, `supabase/*`.

## 2026-03-25 12:43:00 -03:00
- Acción: auditoría local inicial de archivos clave del repo clonado.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: identificar funcionamiento real, dependencias efectivas y riesgos de mantenimiento sobre código local.
- Resultado:
  - se confirmó uso de `express` y `node-fetch`;
  - se confirmó integración real con `Supabase` para login Google, tabla `holdings` y tracking `page_views`;
  - se identificó que `public/app.js` centraliza gran parte de la lógica del producto;
  - se verificó la existencia de 12 Netlify Functions;
  - se detectó un posible error local: `server.js` intenta leer `data_base/CER_serie.csv`, pero la carpeta `data_base` no existe;
  - se detectaron problemas de codificación de caracteres en varios archivos (`Ã`, `â`), probablemente por encoding inconsistente.
- Problemas encontrados:
  - entorno local posiblemente incompleto para CER;
  - variables de entorno Supabase ausentes en `.env.example`.
- Intentos fallidos:
  - inspección de `data_base/` devolvió ruta inexistente.
- Decisiones tomadas:
  - marcar como riesgo obligatorio la rotura potencial de CER en local;
  - explicar al usuario términos base como HTML y PWA en lenguaje simple.
- Pendientes:
  - cerrar el mapa detallado de flujo de datos;
  - pasar luego a la propuesta BDI de producto y navegación.
- Siguiente paso sugerido:
  - documentar por sección qué endpoint alimenta cada bloque de la app y qué conviene conservar, aislar o refactorizar primero.

## 2026-03-25 12:50:00 -03:00
- Acción: verificación adicional de consistencia entre código, funciones y documentación; intento de ejecución de tests.
- Archivos afectados:
  - `LOG.md`
- Motivo: detectar desfasajes entre README y código real, y validar el estado básico del proyecto sin editarlo.
- Resultado:
  - se confirmó que `README.md` del repo original quedó parcialmente desfasado respecto del código;
  - el README menciona `visits.js` y `/api/visits`, pero esa función no existe en `netlify/functions/`;
  - `public/app.js` busca un botón `theme-toggle`, pero `public/index.html` no lo incluye;
  - `public/manifest.json` todavía menciona CEDEARs, aunque esa sección no está implementada en la interfaz principal;
  - `netlify/functions/auth-config.js` restringe CORS a dominios productivos del proyecto original, lo que es relevante para el futuro rebranding/despliegue BDI;
  - el intento de correr tests con `npm test` falló porque `npm` no está disponible en el entorno actual.
- Problemas encontrados:
  - documentación original inconsistente con el estado real del código;
  - imposibilidad de ejecutar tests automáticos en este entorno por falta de `npm`.
- Intentos fallidos:
  - `npm test`.
- Decisiones tomadas:
  - considerar el README original como fuente útil pero no autoritativa;
  - marcar los desfasajes detectados como deuda técnica/documental a corregir en la migración.
- Pendientes:
  - cerrar el mapa explicativo de arquitectura para el usuario;
  - proponer luego la estructura BDI de producto.
- Siguiente paso sugerido:
  - entregar una auditoría técnica explicada paso a paso, separando hallazgos confirmados, riesgos y consecuencias para la migración.

## 2026-03-25 12:56:00 -03:00
- Acción: inicio de Etapa 2, propuesta de producto BDI basada en la auditoría técnica local.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: traducir el diagnóstico técnico en una propuesta concreta de navegación, jerarquía de secciones y enfoque de producto.
- Resultado:
  - se dejó documentado un cambio de enfoque desde comparador generalista hacia dashboard consultivo institucional;
  - se propuso una nueva navegación BDI: Inicio, Liquidez, Renta fija ARS, Bonos CER, Renta fija USD, Corporativos y Portfolio en revisión;
  - se diferenciaron módulos a conservar, reordenar y revisar;
  - se documentó una propuesta inicial de tono, jerarquía editorial y home BDI.
- Problemas encontrados: ninguno nuevo en esta etapa de propuesta.
- Decisiones tomadas:
  - no proponer nuevas features complejas no justificadas;
  - mantener Portfolio como módulo opcional o secundario hasta validar su prioridad real en el producto BDI.
- Pendientes:
  - entregar al usuario la Etapa 2 explicada en lenguaje simple;
  - pasar luego a Etapa 3 con sistema visual BDI.
- Siguiente paso sugerido:
  - definir identidad visual, paleta, tipografía, componentes y responsive design antes de tocar la UI existente.

## 2026-03-25 13:05:00 -03:00
- Acción: relevamiento de insumos de marca BDI para la Etapa 3.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: basar la propuesta visual en la marca real disponible dentro del proyecto.
- Resultado:
  - se verificó la existencia de `Manual de marca.pdf` y `Marca_02 Isotipo 6.png` en `Estilo visual BDI/`;
  - se inspeccionó visualmente el isotipo, que muestra una dirección de marca sobria con blanco, verde y degradado;
  - no fue posible extraer texto utilizable del PDF con las herramientas disponibles en este entorno;
  - se documentó explícitamente esta limitación para no atribuir al manual reglas no confirmadas.
- Problemas encontrados:
  - `python`, `py` y utilidades comunes de extracción PDF no están disponibles en la sesión;
  - el PDF parece comprimido y no devuelve texto legible con inspección simple.
- Intentos fallidos:
  - `python --version`
  - `py --version`
  - búsqueda de utilidades como `pdftotext`, `mutool`, `pdfinfo`, `magick`
  - extracción simple de cadenas desde el PDF.
- Decisiones tomadas:
  - apoyar la Etapa 3 en el isotipo validado visualmente y en criterios prudentes de diseño institucional;
  - no presentar como oficiales detalles del manual que no pudieron leerse automáticamente.
- Pendientes:
  - entregar propuesta visual completa BDI;
  - cuando el entorno lo permita, contrastar implementación final con el PDF manual.
- Siguiente paso sugerido:
  - proponer sistema visual BDI para la app: color, tipografía, componentes, navegación y responsive design.

## 2026-03-25 13:18:00 -03:00
- Acción: incorporación de confirmaciones visuales del manual de marca aportadas por el usuario y verificación del estado Git local.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: afinar la Etapa 3 con colores confirmados y explicar por qué GitHub Desktop no muestra los archivos documentales.
- Resultado:
  - se confirmaron colores de marca a partir de capturas del manual:
    - `#232323`
    - `#157347`
    - `#46B179`
    - `#4CBDC2`
    - `#EEEEEF`
    - `#FFFFFF`
  - se verificó que `BDI-App-Cocos` no es repo Git;
  - se verificó que `rendimientos-ar` sí es repo Git, con remoto `origin` apuntando a `https://github.com/arisbdar/rendimientos-ar.git`;
  - se documentó que los archivos creados en la raíz no aparecen en GitHub Desktop porque están fuera del repo abierto.
- Problemas encontrados:
  - la estructura actual separa documentación raíz y repo clonado, lo que genera confusión operativa en GitHub Desktop.
- Decisiones tomadas:
  - explicarle al usuario la causa exacta sin mover ni renombrar archivos;
  - usar la paleta confirmada por capturas como base más confiable para la Etapa 3.
- Pendientes:
  - redefinir la propuesta visual final con la paleta confirmada;
  - definir con el usuario cómo quiere estructurar el repo propio antes de implementar.
- Siguiente paso sugerido:
  - proponer opciones concretas para pasar de repo ajeno clonado a repo propio de BDI sin perder trazabilidad ni romper el trabajo.

## 2026-03-25 13:24:00 -03:00
- Acción: registro de decisión de avanzar hacia repo propio de BDI con independencia real.
- Archivos afectados:
  - `README.md`
  - `AGENTS.md`
  - `LOG.md`
- Motivo: dejar asentada la dirección elegida por el usuario antes de ejecutar cambios estructurales sobre Git.
- Resultado:
  - se documentó que el objetivo ya no es trabajar indefinidamente sobre el clon de `arisbdar/rendimientos-ar`;
  - se dejó asentado que la meta es convertir `BDI-App-Cocos` en la raíz principal del proyecto versionado;
  - se registró que una independencia real requerirá actuar sobre los metadatos Git del clon interno o redefinir la estructura del proyecto.
- Problemas encontrados:
  - la estructura actual tiene documentación en la raíz y código dentro de un repo anidado;
  - eso impide una experiencia clara en GitHub Desktop.
- Decisiones tomadas:
  - no ejecutar aún una modificación destructiva de metadatos Git sin explicar primero la consecuencia al usuario;
  - preparar una explicación simple del paso técnico necesario.
- Pendientes:
  - obtener confirmación final para cortar el vínculo Git del clon interno y convertir la raíz en repo propio;
  - luego unificar estado Git y continuar implementación.
- Siguiente paso sugerido:
  - explicar claramente al usuario qué significa “hacerlo propio” a nivel Git y pedir confirmación para el cambio estructural mínimo necesario.

## 2026-03-25 13:32:00 -03:00
- Acción: conversión del proyecto a repo propio de BDI.
- Archivos afectados:
  - metadatos Git del proyecto
  - `README.md`
  - `AGENTS.md`
  - `LOG.md`
- Motivo: materializar la independencia real del proyecto respecto del repo original clonado.
- Resultado:
  - se eliminó `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\.git`;
  - se inicializó Git en `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos`;
  - `git status` en la raíz ahora muestra una sola unidad de trabajo con:
    - `AGENTS.md`
    - `LOG.md`
    - `README.md`
    - `Estilo visual BDI/`
    - `rendimientos-ar/`
  - `git remote -v` en la raíz no devuelve remotos, lo que confirma independencia respecto del repo anterior.
- Problemas encontrados: ninguno durante la conversión.
- Decisiones tomadas:
  - mantener la estructura física actual del proyecto sin mover carpetas;
  - unificar Git en la raíz primero y posponer cualquier reestructuración adicional.
- Pendientes:
  - abrir la raíz `BDI-App-Cocos` en GitHub Desktop;
  - opcionalmente crear un remoto nuevo de BDI y vincularlo;
  - continuar luego con Etapa 4 y la implementación.
- Siguiente paso sugerido:
  - explicarle al usuario cómo verificar visualmente el nuevo repo en GitHub Desktop y luego seguir con el plan técnico de implementación.

## 2026-03-25 13:38:00 -03:00
- Acción: confirmación de apertura del repo raíz en GitHub Desktop.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: registrar el estado operativo luego de la conversión a repo propio.
- Resultado:
  - el usuario confirmó que GitHub Desktop ya pudo abrir `BDI-App-Cocos`;
  - apareció advertencia de seguridad esperable por ownership y fue aceptada;
  - GitHub Desktop mostró más de 119 archivos para el primer commit, lo cual es consistente con un repo nuevo que incluye código, documentación y assets.
- Problemas encontrados: ninguno nuevo; comportamiento esperado.
- Decisiones tomadas:
  - considerar validada la nueva raíz Git del proyecto desde el punto de vista operativo del usuario.
- Pendientes:
  - confirmar si el usuario creó ya el primer commit o solo aceptó la incorporación del repo;
  - seguir con Etapa 4 y luego implementación.
- Siguiente paso sugerido:
  - explicar al usuario por qué ese volumen de archivos es normal y continuar con el plan técnico de implementación.

## 2026-03-25 13:45:00 -03:00
- Acción: elaboración de Etapa 4, plan técnico de implementación.
- Archivos afectados:
  - `README.md`
  - `LOG.md`
- Motivo: definir un orden de trabajo seguro antes de modificar código de la app BDI.
- Resultado:
  - se documentó un plan por bloques, desde branding base hasta refactor técnico y deploy;
  - se identificaron archivos prioritarios, archivos nuevos recomendados y áreas a no tocar en la primera ola;
  - se registró estrategia de testing manual y estrategia de despliegue.
- Problemas encontrados: ninguno nuevo.
- Decisiones tomadas:
  - separar rebranding visual de refactor profundo para reducir riesgo;
  - postergar trabajo fuerte sobre Supabase y portfolio hasta estabilizar el core público.
- Pendientes:
  - entregar el plan al usuario de forma clara;
  - luego iniciar la implementación incremental.
- Siguiente paso sugerido:
  - comenzar con Bloque 1: identidad visual y branding base.

## 2026-03-25 14:05:00 -03:00
- Acción: implementación inicial de Bloque 1, branding base BDI.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/public/manifest.json`
  - `rendimientos-ar/netlify/functions/auth-config.js`
  - `README.md`
  - `LOG.md`
- Motivo: iniciar la transformación visible del producto sin tocar todavía lógica financiera profunda.
- Resultado:
  - se reescribió `index.html` con metadatos, header y textos base alineados a BDI;
  - se actualizaron colores, tipografías y estilos principales en `styles.css`;
  - se rebrandearon nombre y theme color del manifest;
  - se agregaron dominios BDI permitidos en `auth-config.js`.
- Problemas encontrados:
  - archivos con encoding inconsistente dificultaron parches quirúrgicos;
  - no hay `node` ni `npm` en esta sesión, por lo que no se pudo levantar preview local desde el entorno del agente.
- Intentos fallidos:
  - parches parciales sobre archivos con texto roto por encoding, especialmente `index.html`, `manifest.json` y `app.js`.
- Decisiones tomadas:
  - reescribir archivos chicos y visibles cuando el encoding bloqueó reemplazos estables;
  - dejar `app.js` para una pasada posterior más controlada, sin forzar una reescritura riesgosa.
- Pendientes:
  - ajustar textos dinámicos y títulos en `app.js`;
  - revisar preview visual en máquina del usuario;
  - continuar con navegación BDI y home.
- Siguiente paso sugerido:
  - revisar este primer bloque en GitHub Desktop y luego avanzar con la segunda pasada de branding sobre `app.js`.

## 2026-03-25 14:20:00 -03:00
- Acción: cierre parcial del Bloque 1 con overrides de copy y navegación.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/bdi-overrides.js`
  - `README.md`
  - `LOG.md`
- Motivo: evitar una reescritura riesgosa de `app.js` mientras se corrige branding visible y textos dinámicos.
- Resultado:
  - se agregó `bdi-overrides.js` cargado después de `app.js`;
  - el nuevo script sincroniza títulos de hero y `document.title` según sección/hash;
  - esto reduce el impacto de los problemas de encoding en `app.js` sin tocar la lógica financiera central.
- Problemas encontrados:
  - `app.js` continúa siendo frágil para parches extensos por encoding inconsistente.
- Decisiones tomadas:
  - usar overrides progresivos en vez de forzar una reescritura temprana del archivo monolítico;
  - reservar una refactorización más limpia de `app.js` para una etapa posterior.
- Pendientes:
  - validar visualmente el bloque completo cuando el usuario pueda levantar la app localmente;
  - continuar con home/navegación y luego modularización.
- Siguiente paso sugerido:
  - explicar al usuario cómo funciona la app a nivel básico (`index.html`, `app.js`, servidor local) y después seguir con la siguiente mejora visual/estructural.

## 2026-03-25 14:32:00 -03:00
- Acción: profundización visual de la home BDI.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `README.md`
  - `LOG.md`
- Motivo: hacer que la portada se sienta más consultiva e institucional sin introducir nuevas dependencias ni romper la lógica existente.
- Resultado:
  - se agregaron bloques de briefing editorial en la home;
  - se agregaron shortcuts hacia Liquidez, Renta fija ARS, CER, Soberanos y Corporativos;
  - se mejoró la jerarquía visual de tablas, cards, subnav y contenedores.
- Problemas encontrados: ninguno nuevo en esta pasada.
- Decisiones tomadas:
  - mantener la home como composición estática con enlaces hash, sin agregar lógica compleja;
  - seguir separando identidad visual de refactor técnico profundo.
- Pendientes:
  - decidir si este bloque ya se toma como primer commit lógico;
  - luego pasar a una segunda ola de reorganización de navegación y estructuras por sección.
- Siguiente paso sugerido:
  - preparar indicaciones simples para que el usuario pueda levantar la app localmente y validar visualmente este primer hito.
## 2026-03-25 14:48:00 -03:00
- AcciÃ³n: refuerzo del override BDI y actualizacion de documentacion operativa.
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
  - dejar listo el primer commit logico y luego acompaÃ±ar al usuario en la apertura local de la app para testing manual.

## 2026-03-25 15:02:00 -03:00
- AcciÃ³n: documentacion de apertura local y testing manual inicial.
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
  - luego acompaÃ±ar la primera apertura local y validar visualmente el hito.
- Siguiente paso sugerido:
  - guiar al usuario en la comprobacion de `node` y, si esta disponible, avanzar con `npm install` y `npm start`.

## 2026-03-25 15:12:00 -03:00
- AcciÃ³n: documentacion de incidencia local con PowerShell y `npm`.
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
- AcciÃ³n: registro de primera prueba local exitosa de la app.
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
- AcciÃ³n: rearmado del servidor local para estabilizacion funcional.
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
- AcciÃ³n: ajuste fino de frontend para navegacion y tolerancia a Chart.js.
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
- AcciÃ³n: registro de segunda validacion manual positiva.
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
  - tomar la recuperacion o rediseño de curvas como el siguiente bloque funcional;
  - no usar ese faltante como bloqueo para el commit actual.
- Pendientes:
  - definir e implementar la version BDI de las curvas de instrumentos;
  - luego retomar refinamiento visual de paleta y detalles de interfaz.
- Siguiente paso sugerido:
  - hacer commit del estado actual y abrir el siguiente bloque para graficos/curvas.

## 2026-03-26 09:18:00 -03:00
- AcciÃ³n: implementacion de curvas propias para instrumentos.
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
- AcciÃ³n: refinamiento visual de curvas propias.
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
- AcciÃ³n: correccion conceptual de curvas segun criterio financiero del usuario.
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
- AcciÃ³n: rediseÃ±o de la trayectoria de curvas con forma controlada.
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
- AcciÃ³n: agrandado de graficos y cambio a interpolacion monotona por tramos.
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
- AcciÃ³n: ajuste de escala de graficos y depuracion de puntos para curvas.
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
- AcciÃ³n: segunda ampliacion de escala y separacion entre curva guia y puntos visibles.
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
  - `LECAPs`, `CER`, `Soberanos` y `Corporativos` pasan a una logica donde la curva intenta pasar cerca de nombres relevantes y no forzar un ajuste global extraño.
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
  - decidir luego si conviene exponer parte de esta informacion como “fuente” dentro de la propia UI.
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
- Accion: reemplazo del icono de pestaña/app por isotipo BDI.
- Archivos afectados:
  - `rendimientos-ar/public/icons/icon-192.png`
  - `rendimientos-ar/public/icons/icon-512.png`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio dejar de usar el icono heredado de la app base y reemplazarlo por marca BDI visible en la pestaña del navegador y manifest.
- Resultado:
  - los iconos que consumen `index.html` y `manifest.json` ahora usan una version redimensionada del isotipo BDI;
  - no hizo falta cambiar rutas porque la app ya apuntaba a esos mismos archivos.
- Pendientes:
  - validar visualmente el nuevo icono en Chrome;
  - si el navegador sigue mostrando el anterior, limpiar cache o reabrir pestaña.
- Siguiente paso sugerido:
  - refrescar la app, comprobar el nuevo icono y luego avanzar con GitHub + Netlify paso a paso.

## 2026-03-26 15:11:00 -03:00
- Accion: ajuste del footer institucional y credito de autoria.
- Archivos afectados:
  - `rendimientos-ar/public/index.html`
  - `README.md`
  - `LOG.md`
- Motivo: el usuario pidio explicitar `BDI Consultora, elaborado por Tomás Rodríguez` antes de publicar la app.
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
- Motivo: el usuario detecto que el isotipo BDI se veia demasiado chico en la pestaña del navegador.
- Resultado:
  - se recalcularon los limites utiles del PNG original;
  - los iconos fueron regenerados con menos margen transparente y mas presencia visual.
- Pendientes:
  - validar en Chrome si el icono ya se percibe mas grande;
  - si siguiera muy chico, considerar una version simplificada del isotipo solo para favicon.
- Siguiente paso sugerido:
  - cerrar y reabrir la pestaña o limpiar cache del icono, y luego continuar con GitHub + Netlify.
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
  - se implemento un treemap SVG agrupado por sector, con tamaño por market cap y color por variacion diaria;
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
  - se aclaro en la fuente que precio y variacion diaria vienen de Yahoo, mientras que el tamaño relativo por market cap sigue siendo curado en esta primera version.
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
