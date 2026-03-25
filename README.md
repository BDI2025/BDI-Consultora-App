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
- Etapa activa: `Etapa 2 - Propuesta de producto BDI`
- Documentación operativa inicial: creada.
- Auditoría del repositorio fuente: en curso, ahora sobre el clon local `rendimientos-ar` y complementada con la app publicada `https://rendimientos.co/`.
- Implementación local sobre el código fuente: no iniciada.

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
