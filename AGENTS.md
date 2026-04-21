# AGENTS.md
# Contexto BDI Consultora
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

## Estándar Técnico Para BDI
- Las instrucciones `Engineering / Compound` incluidas más abajo en este archivo quedan adoptadas como estándar técnico de desarrollo para BDI.
- Este estándar se aplica especialmente al trabajo sobre:
  - `Optimizador de carteras`
  - `Renta fija ARS`
  - `Bonos CER`
  - `Soberanos`
  - `Corporativos`
- Para esos módulos se debe priorizar:
  - arquitectura explícita y mantenible;
  - separación clara de responsabilidades;
  - mapeos y reglas explícitas en lugar de lógica implícita;
  - estructuras de datos claras y consistentes dentro del stack actual;
  - desacople razonable entre cálculo, transformación y render;
  - cambios incrementales con validación y bajo riesgo.
- Esta adopción no reemplaza el sistema de documentación operativo de BDI:
  - `LOG.md` sigue siendo el registro cronológico obligatorio de acciones, resultados, problemas y decisiones;
  - `README.md` debe seguir actualizándose cuando cambie comportamiento, alcance o estructura relevante;
  - `AGENTS.md` debe seguir actualizándose cuando cambien reglas, permisos o restricciones.

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
# Skills de Ingeniería (Plugin Every/Compound)

This repository primarily houses the `compound-engineering` coding-agent plugin and the Claude Code marketplace/catalog metadata used to distribute it.

It also contains:
- the Bun/TypeScript CLI that converts Claude Code plugins into other agent platform formats
- additional plugins under `plugins/`, such as `coding-tutor`
- shared release and metadata infrastructure for the CLI, marketplace, and plugins

`AGENTS.md` is the canonical repo instruction file. Root `CLAUDE.md` exists only as a compatibility shim for tools and conversions that still look for it.

## Quick Start

```bash
bun install
bun test                  # full test suite
bun run release:validate  # check plugin/marketplace consistency
```

## Working Agreement

- **Branching:** Create a feature branch for any non-trivial change. If already on the correct branch for the task, keep using it; do not create additional branches or worktrees unless explicitly requested.
- **Safety:** Do not delete or overwrite user data. Avoid destructive commands.
- **Testing:** Run `bun test` after changes that affect parsing, conversion, or output.
- **Release versioning:** Releases are prepared by release automation, not normal feature PRs. The repo now has multiple release components (`cli`, `compound-engineering`, `coding-tutor`, `marketplace`). GitHub release PRs and GitHub Releases are the canonical release-notes surface for new releases; root `CHANGELOG.md` is only a pointer to that history. Use conventional titles such as `feat:` and `fix:` so release automation can classify change intent, but do not hand-bump release-owned versions or hand-author release notes in routine PRs.
- **Linked versions (cli + compound-engineering):** The `linked-versions` release-please plugin keeps `cli` and `compound-engineering` at the same version. This is intentional -- it simplifies version tracking across the CLI and the plugin it ships. A consequence is that a release with only plugin changes will still bump the CLI version (and vice versa). The CLI changelog may also include commits that `exclude-paths` would normally filter, because `linked-versions` overrides exclusion logic when forcing a synced bump. This is a known upstream release-please limitation, not a misconfiguration. Do not flag linked-version bumps as unnecessary.
- **Output Paths:** Keep OpenCode output at `opencode.json` and `.opencode/{agents,skills,plugins}`. For OpenCode, command go to `~/.config/opencode/commands/<name>.md`; `opencode.json` is deep-merged (never overwritten wholesale).
- **Scratch Space:** Default to OS temp. Use `.context/` only when explicitly justified by the rules below.
  - **Default: OS temp** — covers most scratch, including per-run throwaway AND cross-invocation reusable, regardless of whether a repo is present or whether other skills may read the files. A stable OS-temp prefix handles cross-skill and cross-invocation coordination equally well as an in-repo path; repo-adjacency is rarely the relevant property.
    - **Per-run throwaway**: `mktemp -d -t <prefix>-XXXXXX` (OS handles cleanup). Use for files consumed once and discarded — captured screenshots, stitched GIFs, intermediate build outputs, recordings, delegation prompts/results, single-run checkpoints.
    - **Cross-invocation reusable**: stable path like `"${TMPDIR:-/tmp}/compound-engineering/<skill-name>/<run-id>/"` — **not** `mktemp -d` — so later invocations of the same skill can discover sibling run-ids. Use for caches keyed by session, checkpoints meant to survive context compaction within a loose session, or any state where later runs of the same skill need to locate prior outputs.
  - **Exception: `.context/`** — use only when the artifact is genuinely bound to the CWD repo AND meets at least one of:
    - (a) **User-curated**: the user is expected to inspect, manipulate, or manually curate the artifact outside the skill (e.g., a per-repo TODO database, a per-spec optimization log that survives across sessions on the same checkout).
    - (b) **Repo+branch-inseparable**: the artifact's meaning is inseparable from this specific repo or branch (e.g., branch-specific resume state that a user expects to pick up again in the same checkout).
    - (c) **Path is core UX**: surfacing the artifact path back to the user is a core part of the skill's output and that path is easier to communicate as a repo-relative location than an OS-temp one.
    Namespace under `.context/compound-engineering/<workflow-or-skill-name>/`, add a per-run subdirectory when concurrent runs are plausible, and decide cleanup behavior per the artifact's lifecycle (per-run scratch clears on success; user-curated state persists). "Shared between skills" is not by itself sufficient — OS temp handles that equally well.
  - **Durable outputs** (plans, specs, learnings, docs, final deliverables) belong in `docs/` or another repo-tracked location, not in either scratch tier.
  - **Cross-platform note:** `"${TMPDIR:-/tmp}"` is the portable prefix — `$TMPDIR` resolves on macOS (per-user path in `/var/folders/`) and may be set on Linux; the `/tmp` fallback covers unset cases. `mktemp -d -t <prefix>-XXXXXX` works on macOS, Linux, and WSL. Skills authored here assume Unix-like shells; native Windows is not a current target.
- **Character encoding:**
  - **Identifiers** (file names, agent names, command names): ASCII only -- converters and regex patterns depend on it.
  - **Markdown tables:** Use pipe-delimited (`| col | col |`), never box-drawing characters.
  - **Prose and skill content:** Unicode is fine (emoji, punctuation, etc.). Prefer ASCII arrows (`->`, `<-`) over Unicode arrows in code blocks and terminal examples.

## Directory Layout

```
src/              CLI entry point, parsers, converters, target writers
plugins/          Plugin workspaces (compound-engineering, coding-tutor)
.claude-plugin/   Claude marketplace catalog metadata
tests/            Converter, writer, and CLI tests + fixtures
docs/             Requirements, plans, solutions, and target specs
```

## Repo Surfaces

Changes in this repo may affect one or more of these surfaces:

- `compound-engineering` under `plugins/compound-engineering/`
- the Claude marketplace catalog under `.claude-plugin/`
- the converter/install CLI in `src/` and `package.json`
- secondary plugins such as `plugins/coding-tutor/`

Do not assume a repo change is "just CLI" or "just plugin" without checking which surface owns the affected files.

## Plugin Maintenance

When changing `plugins/compound-engineering/` content:

- Update substantive docs like `plugins/compound-engineering/README.md` when the plugin behavior, inventory, or usage changes.
- Do not hand-bump release-owned versions in plugin or marketplace manifests.
- Do not hand-add release entries to `CHANGELOG.md` or treat it as the canonical source for new releases.
- Run `bun run release:validate` if agents, commands, skills, MCP servers, or release-owned descriptions/counts may have changed.

Useful validation commands:

```bash
bun run release:validate
cat .claude-plugin/marketplace.json | jq .
cat plugins/compound-engineering/.claude-plugin/plugin.json | jq .
```

## Coding Conventions

- Prefer explicit mappings over implicit magic when converting between platforms.
- Keep target-specific behavior in dedicated converters/writers instead of scattering conditionals across unrelated files.
- Preserve stable output paths and merge semantics for installed targets; do not casually change generated file locations.
- When adding or changing a target, update fixtures/tests alongside implementation rather than treating docs or examples as sufficient proof.

## Commit Conventions

- **Prefix is based on intent, not file type.** Use conventional prefixes (`feat:`, `fix:`, `docs:`, `refactor:`, etc.) but classify by what the change does, not the file extension. Files under `plugins/*/skills/`, `plugins/*/agents/`, and `.claude-plugin/` are product code even though they are Markdown or JSON. Reserve `docs:` for files whose sole purpose is documentation (`README.md`, `docs/`, `CHANGELOG.md`).
- **Include a component scope.** The scope appears verbatim in the changelog. Pick the narrowest useful label: skill/agent name (`document-review`, `learnings-researcher`), plugin or CLI area (`coding-tutor`, `cli`), or shared area when cross-cutting (`review`, `research`, `converters`). Never use `compound-engineering` — it's the entire plugin and tells the reader nothing. Omit scope only when no single label adds clarity.
- Breaking changes must be explicit with `!` or a breaking-change footer so release automation can classify them correctly.

## Adding a New Target Provider

Only add a provider when the target format is stable, documented, and has a clear mapping for tools/permissions/hooks. Use this checklist:

1. **Define the target entry**
   - Add a new handler in `src/targets/index.ts` with `implemented: false` until complete.
   - Use a dedicated writer module (e.g., `src/targets/codex.ts`).

2. **Define types and mapping**
   - Add provider-specific types under `src/types/`.
   - Implement conversion logic in `src/converters/` (from Claude → provider).
   - Keep mappings explicit: tools, permissions, hooks/events, model naming.

3. **Wire the CLI**
   - Ensure `convert` and `install` support `--to <provider>` and `--also`.
   - Keep behavior consistent with OpenCode (write to a clean provider root).

4. **Tests (required)**
   - Extend fixtures in `tests/fixtures/sample-plugin`.
   - Add spec coverage for mappings in `tests/converter.test.ts`.
   - Add a writer test for the new provider output tree.
   - Add a CLI test for the provider (similar to `tests/cli.test.ts`).

5. **Docs**
   - Update README with the new `--to` option and output locations.

## Agent References in Skills

When referencing agents from within skill SKILL.md files (e.g., via the `Agent` or `Task` tool), use the bare `ce-<agent-name>` form. The `ce-` prefix identifies the agent as a compound-engineering component and is sufficient for uniqueness across plugins.

Example:
- `ce-learnings-researcher` (correct)
- `learnings-researcher` (wrong — the `ce-` prefix is required; it's what prevents collisions with agents from other plugins that might share a short name)

## File References in Skills

Each skill directory is a self-contained unit. A SKILL.md file must only reference files within its own directory tree (e.g., `references/`, `assets/`, `scripts/`) using relative paths from the skill root. Never reference files outside the skill directory — whether by relative traversal or absolute path.

Broken patterns:

- `../other-skill/references/schema.yaml` — relative traversal into a sibling skill
- `/home/user/plugins/compound-engineering/skills/other-skill/file.md` — absolute path to another skill
- `~/.claude/plugins/cache/marketplace/compound-engineering/1.0.0/skills/other-skill/file.md` — absolute path to an installed plugin location

Why this matters:

- **Runtime resolution:** Skills execute from the user's working directory, not the skill directory. Cross-directory paths and absolute paths will not resolve as expected.
- **Unpredictable install paths:** Plugins installed from the marketplace are cached at versioned paths. Absolute paths that worked in the source repo will not match the installed layout, and the version segment changes on every release.
- **Converter portability:** The CLI copies each skill directory as an isolated unit when converting to other agent platforms. Cross-directory references break because sibling directories are not included in the copy.

If two skills need the same supporting file, duplicate it into each skill's directory. Prefer small, self-contained reference files over shared dependencies.

> **Note (March 2026):** This constraint reflects current Claude Code skill resolution behavior and known path-resolution bugs ([#11011](https://github.com/anthropics/claude-code/issues/11011), [#17741](https://github.com/anthropics/claude-code/issues/17741), [#12541](https://github.com/anthropics/claude-code/issues/12541)). If Anthropic introduces a shared-files mechanism or cross-skill imports in the future, this guidance should be revisited with supporting documentation.

## Platform-Specific Variables in Skills

This plugin is authored once and converted for multiple agent platforms (Claude Code, Codex, Gemini CLI, etc.). Do not use platform-specific environment variables or string substitutions (e.g., `${CLAUDE_PLUGIN_ROOT}`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_SESSION_ID}`, `CODEX_SANDBOX`, `CODEX_SESSION_ID`) in skill content without a graceful fallback that works when the variable is unavailable or unresolved.

**Preferred approach — relative paths:** Reference co-located scripts and files using relative paths from the skill directory (e.g., `bash scripts/my-script.sh ARG`). All major platforms resolve these relative to the skill's directory. No variable prefix needed.

**When a platform variable is unavoidable:** Use the pre-resolution pattern (`!` backtick syntax) and include explicit fallback instructions in the skill content, so the agent knows what to do if the value is empty, literal, or an error:

```
**Plugin version (pre-resolved):** !`jq -r .version "${CLAUDE_PLUGIN_ROOT}/.claude-plugin/plugin.json"`

If the line above resolved to a semantic version (e.g., `2.42.0`), use it.
Otherwise (empty, a literal command string, or an error), use the versionless fallback.
Do not attempt to resolve the version at runtime.
```

This applies equally to any platform's variables — a skill converted from Codex, Gemini, or any other platform will have the same problem if it assumes platform-only variables exist without a fallback.

## Repository Docs Convention

- **Requirements** live in `docs/brainstorms/` — requirements exploration and ideation.
- **Plans** live in `docs/plans/` — implementation plans and progress tracking.
- **Solutions** live in `docs/solutions/` — documented decisions and patterns.
- **Specs** live in `docs/specs/` — target platform format specifications.

### Solution categories (`docs/solutions/`)

This repo builds a plugin *for* developers. Categorize solutions from the perspective of the end user (a developer using the plugin), not a contributor to this repo.

- **`developer-experience/`** — Issues with contributing to *this repo*: local dev setup, shell aliases, test ergonomics, CI friction. If the fix only matters to someone with a checkout of this repo, it belongs here.
- **`integrations/`** — Issues where plugin output doesn't work correctly on a target platform or OS. Cross-platform bugs, target writer output problems, and converter compatibility issues go here.
- **`workflow/`**, **`skill-design/`** — Plugin skill and agent design patterns, workflow improvements.

When in doubt: if the bug affects someone running `bun install compound-engineering` or `bun convert`, it's an integration or product issue, not developer-experience.
