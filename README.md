# BDI App Cocos

## Objetivo General
Transformar la aplicación base `rendimientos-ar` en un producto propio de BDI Consultora, preservando las funcionalidades valiosas y redefiniendo identidad visual, experiencia, arquitectura de presentación, organización de la información, textos y branding.

## Objetivos Específicos
- Auditar técnicamente el proyecto base antes de modificarlo.
- Identificar dependencias, fuentes de datos, endpoints y riesgos de mantenimiento.
- Definir una propuesta de producto y sistema visual alineados con BDI Consultora.
- Implementar una migración progresiva, con bajo riesgo y documentación persistente.
- Mantener compatibilidad funcional mientras se refactoriza.

## Estado Actual Del Workspace
- Carpeta de trabajo activa: `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos`
- Estado de Git/worktree:
  - la carpeta raíz `BDI-App-Cocos` ahora es el repositorio Git principal del proyecto;
  - estado actual: `No commits yet on master`;
  - no hay remoto configurado todavía;
  - `rendimientos-ar` ya no contiene `.git` propio y quedó integrado como carpeta de código dentro del proyecto BDI.
- Contenido detectado al inicio:
  - `Estilo visual BDI/Manual de marca.pdf`
  - `Estilo visual BDI/Marca_02 Isotipo 6.png`
- Estado del código fuente de la app:
  - el repositorio base ya fue clonado localmente;
  - la auditoría ya puede hacerse sobre archivos reales del proyecto.

## Estructura Actual Del Proyecto
```text
BDI-App-Cocos/
├─ Estilo visual BDI/
│  ├─ Manual de marca.pdf
│  └─ Marca_02 Isotipo 6.png
├─ rendimientos-ar/
│  ├─ netlify/functions/
│  ├─ public/
│  ├─ supabase/
│  ├─ test/
│  ├─ server.js
│  ├─ netlify.toml
│  └─ package.json
├─ README.md
├─ AGENTS.md
└─ LOG.md
```

## Estructura Objetivo Tentativa
Pendiente de confirmar luego de la auditoría técnica del repositorio base. La estructura final deberá separar claramente:
- frontend público,
- configuración,
- funciones serverless o adapters,
- documentación de despliegue,
- assets de marca BDI.

## Reglas De Organización
- Trabajar únicamente dentro de `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos`.
- No borrar, mover ni renombrar archivos sin instrucción explícita del usuario.
- Inspeccionar siempre antes de modificar.
- Documentar cada cambio relevante en `README.md`, `AGENTS.md` y `LOG.md` cuando corresponda.
- Mantener diferenciados: hallazgo técnico, propuesta de mejora, cambio obligatorio y mejora opcional.

## Estado Actual Del Proyecto
- Etapa activa: `Etapa 4 - Plan técnico de implementación`
- Documentación operativa inicial: creada.
- Auditoría del repositorio fuente: en curso, ahora sobre el clon local `rendimientos-ar` y complementada con la app publicada `https://rendimientos.co/`.
- Implementación local sobre el código fuente: iniciada en `Bloque 1 - identidad visual y branding base`.

## Propuesta Inicial De Producto BDI

### Objetivo De Producto
Convertir la app actual desde un comparador financiero amplio hacia una herramienta de lectura de mercado y seguimiento de instrumentos con enfoque consultivo, institucional y claro para usuarios argentinos.

### Cambio De Enfoque Recomendado
- De: comparador general con navegación por tipo técnico de producto.
- A: terminal liviana / dashboard consultivo de BDI con navegación por objetivo, moneda y lectura de mercado.

### Qué Conservar
- Monitor global.
- Cotizaciones y noticias.
- Billeteras / liquidez.
- FCIs de liquidez.
- Plazo fijo.
- LECAPs / BONCAPs.
- Bonos CER.
- Soberanos USD.
- ONs corporativas.

### Qué Reordenar
- La navegación principal.
- El naming de secciones.
- La jerarquía entre home, secciones locales y renta fija.
- La lógica de presentación de tablas, badges y resúmenes.

### Qué Dejar En Revisión
- Portfolio:
  - aporta valor, pero agrega complejidad por depender de Supabase, login Google, permisos y persistencia;
  - conviene mantenerlo como módulo secundario hasta estabilizar el core público BDI.

### Navegación BDI Propuesta
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
  - instrumentos a tasa fija en pesos.
- `Bonos CER`
  - bonos ajustados por inflación;
  - lectura de duration, TIR real y sensibilidad.
- `Renta fija USD`
  - soberanos hard dollar;
  - curva y métricas clave.
- `Corporativos`
  - ONs en USD;
  - comparador institucional con filtros por emisor, duration y rendimiento.
- `Mi cartera` o `Portfolio`
  - sólo si se decide preservar el módulo autenticado en la primera versión BDI.

### Criterio De Renombre
- `Mundo` → `Inicio` o `Mercado`
- `ARS` → desagregar en `Liquidez`, `Renta fija ARS` y `Bonos CER`
- `Bonos` → `Renta fija USD`
- `ONs` → `Corporativos`
- `Portfolio` → `Mi cartera` o `Mi portfolio BDI`

### Priorización Recomendada
1. Inicio / Resumen ejecutivo
2. Liquidez
3. Renta fija ARS
4. Bonos CER
5. Renta fija USD
6. Corporativos
7. Portfolio

### Tono Y Copy Recomendados
- Profesional, claro y directo.
- Menos comparador informal, más lectura de mercado.
- Evitar tono fintech o trading especulativo.
- Usar lenguaje como:
  - `Rendimiento estimado`
  - `Tasa nominal anual`
  - `Duración`
  - `Perfil conservador / moderado`
  - `Fuente y actualización`
  - `Lectura rápida`

### Home BDI Propuesta
- Encabezado con resumen del día:
  - tasas clave;
  - dólar oficial / MEP / CCL;
  - riesgo país;
  - equity y commodities globales.
- Bloque de “Lectura BDI”:
  - breve interpretación del contexto.
- Bloques de acceso rápido:
  - Liquidez;
  - Pesos a tasa fija;
  - CER;
  - USD;
  - Corporativos.
- Noticias en formato más sobrio y menos “ticker invasivo”.

### Principios De UX Recomendados
- Menos tabs horizontales técnicas.
- Más jerarquía editorial.
- Tablas con filtros claros y badges útiles.
- Priorizar mobile como lectura guiada, no como réplica comprimida del desktop.
- Mostrar fuente y fecha de actualización en cada módulo crítico.

## Insumos De Marca Disponibles
- Carpeta de marca:
  - `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\Estilo visual BDI`
- Archivos detectados:
  - `Manual de marca.pdf`
  - `Marca_02 Isotipo 6.png`

## Nota Sobre La Etapa Visual
- El isotipo pudo inspeccionarse visualmente de forma local.
- El manual PDF está disponible y debe considerarse fuente de verdad de la marca.
- Limitación actual del entorno:
  - no fue posible extraer texto legible del PDF con las herramientas disponibles en esta sesión;
  - por eso, la propuesta visual se apoya en señales verificables del isotipo y en una traducción prudente a sistema de interfaz, sin afirmar reglas exactas del manual que no pudieron leerse automáticamente.

## Confirmaciones Visuales Aportadas Por El Usuario
- Aplicación preferente de marca:
  - usar la marca en color institucional negro con isotipo color siempre que se pueda;
  - en fondos complejos o fotográficos, usar variantes monocromáticas según necesidad.
- Paleta confirmada desde capturas del manual:
  - Negro: `#232323`
  - Verde oscuro: `#157347`
  - Verde: `#46B179`
  - Turquesa: `#4CBDC2`
  - Gris: `#EEEEEF`
  - Blanco: `#FFFFFF`

## Observación Operativa Sobre Git/GitHub Desktop
- La carpeta raíz `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos` ahora sí es el repositorio Git principal.
- `rendimientos-ar` dejó de ser un repo independiente y pasó a ser parte del proyecto BDI.
- Para ver el proyecto correctamente en GitHub Desktop debe abrirse la carpeta raíz `BDI-App-Cocos`, no la subcarpeta `rendimientos-ar`.

## Decisión De Estructura Tomada
- Objetivo elegido por el usuario:
  - pasar a un repo propio de BDI con independencia real;
  - conservar la estructura de trabajo y el contenido base que hoy está dentro de `rendimientos-ar`.
- Implicancia técnica:
  - el clon original no alcanzaba para ser “propio” solo por existir en la máquina local;
  - esa dependencia quedó cortada al eliminar `.git` dentro de `rendimientos-ar` y crear `.git` en la raíz del proyecto.
- Estrategia objetivo:
  - `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos` ya es el repo principal del producto BDI;
  - el código fuente quedó incorporado como parte del proyecto propio;
  - código, documentación y branding ya comparten una sola raíz versionada.

## Próximo Paso Operativo En Git
1. Abrir `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos` en GitHub Desktop.
2. Verificar que aparezcan como cambios:
   - `AGENTS.md`
   - `LOG.md`
   - `README.md`
   - `Estilo visual BDI/`
   - `rendimientos-ar/`
3. Crear luego un repositorio nuevo de BDI en GitHub y agregarlo como remoto cuando el usuario lo decida.

## Estado Git Actual
- La carpeta raíz ya fue agregada a GitHub Desktop como repositorio local confiable.
- Es normal que el primer estado muestre una gran cantidad de archivos para commit:
  - incluye documentación raíz;
  - incluye assets de marca;
  - incluye todo el código fuente dentro de `rendimientos-ar/`.
- Esto corresponde al primer versionado del proyecto BDI como repositorio independiente.

## Avance De Implementación

### Bloque 1 En Curso
- Branding base aplicado en:
  - `rendimientos-ar/public/index.html`
  - `rendimientos-ar/public/styles.css`
  - `rendimientos-ar/public/manifest.json`
  - `rendimientos-ar/netlify/functions/auth-config.js`
  - `rendimientos-ar/public/bdi-overrides.js`
- Cambios introducidos:
  - títulos y metadatos BDI;
  - header y navegación con naming inicial BDI;
  - tipografía base migrada a `IBM Plex Sans` / `IBM Plex Mono`;
  - paleta base alineada con colores confirmados de marca;
  - visual principal movida desde terminal oscura a interfaz clara institucional;
  - CORS preparado para `bdiconsultora.com`.
  - script de overrides para alinear títulos y copy visibles sin reescribir por completo la lógica central de `app.js`.
  - home reforzada con briefing editorial y shortcuts a bloques principales.

### Limitación De Verificación Actual
- En esta sesión no hay `node` ni `npm`, por lo que no fue posible levantar la app localmente desde el entorno del agente.
- El testing visual/manual de este bloque deberá hacerse en la máquina del usuario cuando lo indique el flujo.

## Plan Técnico De Implementación

### Objetivo Del Plan
Aplicar la transformación a producto BDI en bloques de bajo riesgo, preservando compatibilidad funcional mientras se desacopla branding, navegación y lógica.

### Orden Recomendado De Trabajo
1. `Bloque 0 - Base y seguridad operativa`
   - corregir documentación del proyecto propio;
   - revisar `.gitignore` y variables de entorno;
   - confirmar estructura final de trabajo.
2. `Bloque 1 - Identidad visual y branding base`
   - reemplazar nombre, metadatos, favicon, colores y tipografía;
   - actualizar header, footer y textos de marca;
   - corregir problemas de encoding visibles.
3. `Bloque 2 - Reorganización de navegación`
   - transformar la jerarquía actual de tabs hacia la navegación BDI;
   - sin alterar todavía cálculos financieros ni endpoints.
4. `Bloque 3 - Rediseño de home e información clave`
   - convertir `Mundo` en `Inicio`/`Resumen ejecutivo`;
   - reformular ticker, cotizaciones y noticias a formato más consultivo.
5. `Bloque 4 - Reordenamiento por secciones`
   - Liquidez;
   - Renta fija ARS;
   - Bonos CER;
   - Renta fija USD;
   - Corporativos.
6. `Bloque 5 - Refactor técnico interno`
   - modularizar `app.js`;
   - separar fetch, transformación y render;
   - aislar config y utilidades.
7. `Bloque 6 - Portfolio`
   - decidir continuidad;
   - si se conserva, rebrandear y auditar auth/Supabase con cuidado.
8. `Bloque 7 - Deploy y endurecimiento`
   - actualizar README técnico;
   - documentar variables de entorno;
   - preparar remoto y despliegue propio.

### Archivos A Modificar Primero
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\public\index.html`
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\public\styles.css`
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\public\app.js`
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\public\manifest.json`
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\public\config.json`
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\server.js`
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\netlify.toml`
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\netlify\functions\auth-config.js`
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\README.md`

### Archivos Nuevos Recomendados
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\docs\migration-plan.md`
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\docs\deploy.md`
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\docs\data-sources.md`
- `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar\public\icons\...` actualizados a marca BDI
- archivos modulares futuros para reemplazar partes de `app.js`, por ejemplo:
  - `public/js/navigation.js`
  - `public/js/market-home.js`
  - `public/js/liquidity.js`
  - `public/js/fixed-income.js`

### Archivos A No Tocar En La Primera Ola
- `supabase/rls_policies.sql` salvo necesidad puntual.
- lógica de cálculos financieros profundos mientras se reordena branding y UX.
- funciones serverless de datos, excepto branding/cors/documentación mínima.

### Riesgos De Compatibilidad
- cambiar nombres de secciones sin mapear bien los IDs y hashes puede romper navegación.
- mover demasiado rápido lógica desde `app.js` puede romper render, eventos y cálculos.
- tocar `config.json` sin disciplina puede romper portfolio, bonos y cashflows.
- tocar Netlify o auth demasiado temprano puede romper entorno productivo y login.
- cambiar branding sin revisar manifest, metadata social y favicon deja inconsistencias de producto.

### Estrategia De Testing Manual
- revisar desktop y mobile en cada bloque.
- validar navegación hash/tab por tab.
- validar que cada sección cargue datos o falle de forma controlada.
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

## Auditoría Remota Inicial Del Repositorio Base

### Stack Detectado
- Frontend web estático en `HTML + CSS + JavaScript` sin framework SPA moderno visible.
- Backend liviano para desarrollo local con `Node.js + Express`.
- Serverless functions en `Netlify Functions`.
- Configuración de despliegue en `netlify.toml`.
- PWA con `manifest.json` y `service worker`.
- Integración real con `Supabase` para autenticación Google, portfolio y tracking de page views.

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
- `public/app.js`: lógica central del frontend y renderizado de secciones.
- `public/config.json`: configuración estática y hardcodeada de instrumentos/flujos.
- `public/styles.css`: estilos y dark mode.
- `server.js`: servidor Express para desarrollo local.
- `netlify/functions/*.js`: adapters/proxies para fuentes externas.

### Variables De Entorno Detectadas
- `.env.example` expone solo:
  - `PORT=3000`
  - `NODE_ENV=development`
- Observación:
  - el servidor local expone `/api/auth-config`, que espera:
    - `SUPABASE_URL`
    - `SUPABASE_ANON_KEY`
  - estas variables no están documentadas en `.env.example`, por lo que la configuración actual está incompleta.

### Endpoints Públicos Documentados
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
- BCRA: índice CER y último CER.
- Config estática en `config.json`: billeteras y flujos hardcodeados.

### Dependencias Críticas
- `express` y `node-fetch` como dependencias declaradas en `package.json`.
- Netlify como capa de routing serverless en producción.
- Terceros de mercado y scraping/proxy para precios.
- Configuración manual en `config.json` para instrumentos y cashflows.
- Supabase para auth, persistencia del portfolio y page views.

### Riesgos Iniciales
- Fuerte dependencia de terceros sin contrato estable: Yahoo Finance, Google News RSS, data912, BCRA, ArgentinaDatos, CAFCI.
- La lógica de negocio está muy concentrada en `public/app.js` (aprox. 182 KB), lo que sugiere acoplamiento alto entre fetch, transformación, cálculos financieros y UI.
- `config.json` concentra datos manuales sensibles al mantenimiento.
- Entorno local incompleto respecto de producción: el proyecto usa redirects y funciones Netlify que no quedan totalmente replicadas con `server.js`.
- La configuración de Supabase no aparece claramente documentada en `.env.example`.
- `server.js` intenta leer `data_base/CER_serie.csv`, pero esa carpeta no existe en el clon local; esto puede romper la parte CER en entorno local.
- Se observan problemas de encoding de texto (`Ã`, `â`) en varios archivos, lo que indica inconsistencias de codificación a corregir en la migración.

### Observación Legal/Licencia
- En `package.json` figura `"license": "ISC"`, pero no se detectó archivo `LICENSE` visible en la raíz del repositorio base durante la inspección remota.
- Hasta validar la licencia efectiva y el alcance de reutilización comercial, **no conviene asumir libre explotación comercial del repo tal como está**.
- Recomendación: antes de desplegar una versión comercial BDI derivada, confirmar licencia del repo y, si hace falta, solicitar autorización explícita o reconstruir componentes sensibles con implementación propia.

## Hallazgos Iniciales Importantes
- La carpeta local seleccionada todavía no contiene el código fuente de la aplicación objetivo.
- Existe material de marca BDI disponible para informar el futuro rebranding.
- Antes de cualquier refactor o rebranding, será necesario decidir si:
  - se clona el repositorio base dentro de esta carpeta y se trabaja allí, o
  - se recrea una base propia tomando el repo sólo como referencia técnica.

## Supuestos Importantes
- El usuario quiere preservar la compatibilidad funcional del producto actual mientras se lo transforma.
- La nueva app será una evolución del proyecto original, no una copia superficial.
- La marca BDI requiere una estética institucional, sobria y clara.
- La documentación del proyecto debe poder reconstruir el contexto aunque se pierda la conversación.

## Restricciones Relevantes
- No borrar archivos.
- No mover archivos.
- No renombrar archivos.
- No salir de la carpeta seleccionada salvo instrucción explícita del usuario.
- No modificar carpetas externas o vecinas.
- No hacer cambios destructivos ni reestructuraciones no autorizadas.
- No dejar documentación desactualizada respecto del estado real del proyecto.

## Próximos Pasos Sugeridos
1. Completar la auditoría local del clon `rendimientos-ar`.
2. Explicar arquitectura y conceptos base en lenguaje no técnico para acompañar la decisión de producto.
3. Evaluar legalidad/licencia de reutilización comercial.
4. Proponer estrategia de migración BDI sobre el repo local sin romper endpoints.
5. Definir estructura objetivo y fases de implementación antes de editar la app.
## Actualizacion De Estado 2026-03-25

### Repo Y Worktree
- La raiz `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos` ya es el repo Git principal del proyecto BDI.
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
  - recuperar o rediseñar las curvas de TIR vs Duration en `Renta fija ARS`, `Soberanos` y `Corporativos`.
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
- Revisar si conviene mantener el esquema anterior de scatter plot o rediseñar los graficos con una presentacion mas consultiva e institucional.

### Proximos Pasos Actualizados
1. Cerrar este primer hito de branding base y tomarlo como commit logico inicial.
2. Explicar al usuario, en lenguaje simple, como abrir la app localmente para testing manual.
3. Validar visualmente el Bloque 1 en navegador real.
4. Avanzar luego con reorganizacion de secciones y navegacion manteniendo compatibilidad actual.

## Como Abrir La App Localmente

### Que significa "levantar la app"
- No es abrir un archivo suelto.
- Es encender un pequeño servidor local para que la app funcione como sitio web en tu computadora.
- Este proyecto usa `node` para eso.

### Paso 1 - Ver si ya tenes Node instalado
En Windows, abri:
- `PowerShell`, o
- `Terminal`, o
- `Símbolo del sistema`

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

`C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar`

### Paso 3 - Instalar dependencias
Solo la primera vez:

```powershell
cd "C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos\rendimientos-ar"
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
