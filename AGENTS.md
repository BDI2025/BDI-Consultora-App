# AGENTS.md

## Alcance De Trabajo Permitido
- Trabajar exclusivamente dentro de `C:\Users\Tomas\Documents\GitHub\BDI-App-Cocos`.
- Inspeccionar, documentar, auditar, planificar, refactorizar e implementar cambios dentro del scope autorizado por el usuario.
- Crear y actualizar documentación operativa y técnica del proyecto.
- Analizar material de marca BDI existente dentro de la carpeta seleccionada.
- Preparar la futura transformación del proyecto base en un producto propio de BDI Consultora.

## Tareas Que Sí Puedo Hacer
- Revisar estructura local del proyecto.
- Auditar el repositorio fuente y la app publicada.
- Crear y actualizar `README.md`, `AGENTS.md` y `LOG.md`.
- Documentar hallazgos técnicos, riesgos, decisiones y pendientes.
- Proponer arquitectura, migración, rebranding y mejoras de UX/UI.
- Implementar cambios incrementales cuando el trabajo entre en esa etapa.
- Crear archivos nuevos dentro de esta carpeta si son necesarios y están justificados.

## Tareas Que No Puedo Hacer
- No borrar archivos.
- No mover archivos.
- No renombrar archivos.
- No salir de la carpeta seleccionada.
- No trabajar en carpetas externas o vecinas.
- No modificar nada fuera del scope explícitamente indicado.
- No asumir permisos no otorgados.
- No hacer cambios destructivos.
- No reestructurar el proyecto por cuenta propia.
- No sobrescribir documentación previa sin preservar contexto relevante.

## Restricciones Sobre Archivos Y Carpetas
- Cualquier edición debe hacerse sólo dentro del workspace activo.
- Los assets existentes en `Estilo visual BDI/` deben preservarse.
- Si en el futuro se autoriza clonar el repo base, deberá hacerse dentro de esta carpeta y quedar documentado.
- No se permite borrar, mover o renombrar archivos salvo instrucción explícita y directa del usuario.

## Política De Actualización De Documentación
- Actualizar `README.md` siempre que cambie:
  - el objetivo,
  - la estructura del proyecto,
  - el alcance,
  - los permisos,
  - las restricciones operativas,
  - el estado del proyecto.
- Actualizar `AGENTS.md` siempre que cambien reglas, permisos o restricciones.
- Actualizar `LOG.md` después de cada acción relevante, incluyendo intentos fallidos y decisiones.

## Criterios De Seguridad Antes De Editar
- Revisar primero el contexto local y la documentación existente.
- Confirmar que el cambio respeta las restricciones activas.
- Evitar cambios estructurales sin documentar antes su motivo y alcance.
- No exponer credenciales, claves o datos sensibles si aparecen más adelante.
- Señalar explícitamente dependencias externas frágiles, APIs de terceros y acoplamientos de despliegue.

## Forma De Registrar Cambios Y Pendientes
- Registrar cronológicamente en `LOG.md`:
  - fecha/hora,
  - acción,
  - archivos afectados,
  - motivo,
  - resultado,
  - problemas,
  - intentos fallidos,
  - decisiones,
  - pendientes,
  - siguiente paso sugerido.

## TO DO
- trabajar únicamente dentro de la carpeta/proyecto seleccionado
- inspeccionar antes de modificar
- documentar cada cambio relevante
- actualizar SIEMPRE README.md y AGENTS.md cuando cambie el alcance, las reglas, los permisos o la estructura del proyecto
- dejar registro claro de pasos ejecutados, resultados y pendientes
- verificar que los cambios sean consistentes con las restricciones activas
- mantener memoria operativa del proyecto mediante logs acumulativos

## NOT DO
- no borrar archivos
- no mover archivos
- no renombrar archivos
- no salir de la carpeta seleccionada
- no trabajar en carpetas externas o vecinas
- no modificar nada fuera del scope explícitamente indicado
- no asumir permisos que no te fueron dados
- no hacer cambios destructivos
- no reestructurar el proyecto por cuenta propia
- no sobrescribir documentación previa sin preservar contexto relevante

## Excepción
- Solo se podrá borrar, mover, renombrar archivos o salir de la carpeta seleccionada si el usuario lo pide de forma explícita y directa.
- Si eso ocurre, debe quedar asentado en `AGENTS.md`, `README.md` y `LOG.md` antes o inmediatamente después de la acción.

## Autorización Explícita Registrada
- El usuario expresó que prefiere avanzar hacia una estructura con independencia real y repo propio de BDI, en lugar de seguir trabajando sobre el repo ajeno clonado.
- Cualquier acción concreta para materializar esa independencia que implique borrar o reemplazar metadatos Git del clon actual deberá ejecutarse con cuidado y quedar registrada en la documentación y el log.
- Conversión ejecutada:
  - se eliminó `.git` dentro de `rendimientos-ar` por pedido explícito del usuario;
  - se inicializó Git en la raíz `BDI-App-Cocos`;
  - desde este punto, la carpeta raíz es la única unidad Git del proyecto.
