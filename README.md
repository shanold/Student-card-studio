# Student Card Studio v0.1.0

A standalone, privacy-friendly spinoff of Clever Badge Maker for creating attractive student desk cards, binder cards, pencil-box labels, nameplates, and info cards.

## Highlights
- Premade physical sizes plus custom inch dimensions.
- Blank, modern, stars/bubbles, and notebook starting templates.
- Paste names, arbitrary-column CSV rosters, Clever badge PDFs, and batch student photos.
- Up to 50 configurable design elements: text, dynamic fields, images, student photos, Clever QR crops, shapes, and lines.
- Drag/resize, rotation, opacity, layers, lock/hide/duplicate, center snapping, print-safe guide, undo/redo.
- Fancy text controls under **More Features**: curve, outline/bubble styling, shadow/glow, and precise positioning.
- Solid, gradient, pattern, or uploaded-image backgrounds.
- IndexedDB recovery with the latest three snapshots and a clear recovered-job warning.
- Durable Project JSON export/import and student-free Template export/import.
- 300-DPI PNG, ZIP-of-PNGs, and printable PDF output. PDF pages place the same rendered card images rather than redrawing the design.
- Client-side only: no roster, photo, QR, or project data is uploaded to a backend.

## Run locally
```bash
npm install
npm run dev
```
Then open the Vite URL shown in the terminal.

## Docker
```bash
docker compose up -d --build
```
Default host port: **8090**.

## Production build
```bash
npm install
npm test
npm run build
```
The static site is written to `dist/`.

## GitHub Pages
The included workflow and Vite base-path configuration support project Pages deployments. Push the repository to GitHub, enable GitHub Pages with **GitHub Actions** as the source, and the workflow will build/deploy the static app.

## Saving and recovery
Autosave is intentionally an emergency recovery mechanism, not a durable save. Use **Export Project** to keep a portable job. **Export Template** removes student records/photos/QRs so a design can be reused or shared safely.

## Clever importer
The Clever PDF importer adapts the badge-grid QR detection/cropping approach from Clever Badge Maker, but imported students become ordinary Student Card Studio records. The rest of the designer has no Clever-specific assumptions.
