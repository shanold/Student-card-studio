# Student Info Card Designer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone browser-only student info-card designer spinoff with flexible rosters, reusable templates, rich element editing, recovery, and consistent raster-based exports.

**Architecture:** Keep Vite/static hosting but replace Clever-specific editor state with a versioned project model. A DOM/SVG-based card renderer drives both interactive preview and high-resolution rasterization; PDF only places rendered card PNGs. Browser storage uses IndexedDB snapshots, while durable saves are versioned JSON project/template files.

**Tech Stack:** Vite, vanilla ES modules, pdfjs-dist + @zxing/browser for Clever import, pdf-lib for raster PDF assembly, browser Canvas/SVG, IndexedDB, Node built-in tests.

**Spec:** `docs/superpowers/specs/2026-09-15-student-info-card-designer-design.md`

## Global Constraints
- Standalone spinoff; original Clever Badge Maker remains unchanged.
- Browser-first/client-side; no student data sent to a server.
- `MAX_TEMPLATE_ELEMENTS = 50` in one configuration location.
- Use “More Features”, never “Advanced”, in the primary UI.
- Card renderer is the single visual source of truth for preview/raster exports.
- Autosave is recovery only; exported project files are durable saves.
- Static Docker and GitHub Pages deployment remain supported.

---

### Task 1: Project model, presets, roster parsers, and serialization
**Files:** Create `src/config.js`, `src/model.js`, `src/importers.js`, `test/model.test.js`; modify `package.json`.
**Interfaces:** Produces `createProject`, `createElement`, `serializeProject`, `parseProjectFile`, `parseNameList`, `parseCsvRoster`, preset/template constants.
- [ ] Write Node tests for defaults, 50-element enforcement, arbitrary CSV fields, name lists, and project/template round trips.
- [ ] Run tests and verify failure before modules exist.
- [ ] Implement minimal model/import modules.
- [ ] Run tests and verify pass.

### Task 2: Rebuild application shell and editor
**Files:** Replace `index.html`, `src/style.css`, `src/main.js`; create `src/renderer.js`, `src/history.js`.
**Interfaces:** Consumes project model; produces three-panel editor, wizard, student switcher, element tools, property editor, layers, guides, undo/redo.
- [ ] Add tests for history semantics and dynamic field resolution.
- [ ] Verify tests fail.
- [ ] Implement renderer/history and UI integration.
- [ ] Verify tests pass and Vite build succeeds.

### Task 3: Importers, images, and Clever compatibility
**Files:** Create `src/clever-import.js`, `src/assets.js`; modify `src/main.js`.
**Interfaces:** Produces local image normalization, roster/photo import, and Clever PDF student records with QR assets.
- [ ] Add tests for filename normalization/matching helpers.
- [ ] Verify failure.
- [ ] Implement helpers and wire browser import flows.
- [ ] Verify tests/build.

### Task 4: Recovery and durable project/template files
**Files:** Create `src/storage.js`; modify `src/main.js`.
**Interfaces:** Produces debounced three-snapshot IndexedDB recovery and project/template import/export.
- [ ] Add tests for recovery snapshot ordering/fallback helpers and template stripping.
- [ ] Verify failure.
- [ ] Implement storage and UI recovery banner/actions.
- [ ] Verify tests/build.

### Task 5: Unified raster, PNG/ZIP/PDF print export
**Files:** Create `src/export.js`, `src/zip.js`; modify `src/main.js`.
**Interfaces:** Consumes renderer SVG/DOM representation and emits 300-DPI PNG, ZIP, and Letter PDF assembled from PNGs.
- [ ] Add tests for print layout calculations and ZIP primitives.
- [ ] Verify failure.
- [ ] Implement high-resolution raster and output assembly.
- [ ] Verify tests/build.

### Task 6: Final integration and packaging
**Files:** Modify README/deployment metadata as needed.
- [ ] Run all tests.
- [ ] Run production build.
- [ ] Inspect generated app structure and smoke-test core flows statically.
- [ ] Package source ZIP excluding dependencies/build artifacts.
