# Student Info Card Designer — Design Specification

## Purpose
Create a standalone spinoff of Clever Badge Maker for designing attractive, printable student information cards for desks, binders, pencil boxes, nameplates, and similar school uses. The original Clever Badge Maker remains separate and unchanged. Reuse proven import/parsing ideas where useful, but build the new app around a general-purpose card designer.

## Product Principles
- Browser-first, privacy-friendly, and client-side; no student data sent to a server.
- Easy starting workflow for teachers, with deeper controls behind clearly labeled **More Features** sections rather than an "Advanced" mode.
- What the editor shows is what exports: one rendering engine is the visual source of truth.
- Project export is the durable save mechanism; autosave/recovery is emergency protection.
- Premade designs are editable starting points, never locked templates.

## New Project Flow
1. Choose **Premade Size** or **Custom Size**.
2. For Premade Size, choose a card type such as Desk Nameplate, Binder Card, Pencil Box Label, Index Card, Name Badge, or Student Info Card.
3. Choose **Blank** or a template designed for that card size.
4. Custom Size accepts physical width and height (inches and millimeters) and initially starts blank.

Built-in templates may use colors, shapes, patterns, decorative artwork, and example dynamic fields. Users can edit or remove every template element.

## Student Import
The student list is independent from the card designer and can be populated in several ways:

### Paste Names
One student per line. This is the simplest roster workflow.

### CSV Roster
CSV headers are arbitrary user-defined fields. Example:

```csv
Name,Grade,Teacher,Bus
John Smith,3,Jones,42
Sarah Jones,3,Jones,18
```

Every imported column becomes a dynamic field available to the designer. The importer previews detected fields and rows before accepting them.

### Clever Badge PDF
Reuse/adapt the proven Clever Badge Maker PDF import logic to extract student names and QR codes. Clever is one importer, not the core data model.

### Student Photos
Student photos are dynamic student data, not design-element assets. Users may batch import JPG/PNG/WebP images. Filename matching attempts to associate images with roster names and unresolved matches can be assigned manually.

## Card Data Model
A project contains:
- Project metadata/version
- Card physical dimensions and orientation
- Background definition
- Master template elements
- Student records with arbitrary fields
- Optional per-student photo and Clever QR data
- Print/export settings
- Template/preset origin metadata where useful

Dynamic elements reference student fields by stable field keys rather than embedding a particular student's value.

## Design Elements
The master card supports a configurable maximum number of design elements, initially **50**. The limit is defined once in configuration so it can be changed easily after performance testing.

Element types:
- Static text
- Dynamic student-field text
- Decorative/user image
- Student photo placeholder
- Clever QR placeholder
- Shapes
- Lines

The background does not count against the element limit. A dynamic placeholder counts once regardless of the number of students.

Common element behavior:
- Drag and resize
- Rotation
- Layer ordering: front/back/forward/backward
- Lock/unlock
- Hide/show
- Duplicate
- Delete
- Opacity
- Alignment/snapping guides
- Horizontal/vertical centering guides
- Precise positioning under More Features

The UI displays the current element count, e.g. `17 / 50`.

## Images
Decorative image imports support PNG, JPEG, and WebP. Images are normalized to sensible internal dimensions/quality to avoid excessive browser memory use while retaining enough resolution for print output.

Image features include:
- Crop/fit/position
- Rounded corners
- Masks such as circle and rounded rectangle; decorative masks such as star/heart may be added
- Border
- Shadow/glow
- Flip horizontal/vertical
- Opacity

Student photos use the same visual styling controls but obtain their source image from the currently previewed student.

## Text and Fancy Text
Both static and dynamic text use the same styling engine.

Core controls:
- Curated bundled font library
- Font size
- Bold/italic/underline where supported
- Fill color
- Alignment
- Letter spacing
- Line spacing
- Rotation
- Opacity

More Features:
- Curved/arched text with adjustable curvature/direction
- Bubble/outlined text with fill, stroke color, and stroke thickness
- Shadow
- Glow
- Additional display effects that can be implemented by the unified renderer

The browser preview and exported image must use the same fonts and text rendering implementation.

## Backgrounds
Backgrounds are separate from foreground element count and may be:
- Solid color
- Gradient
- Built-in pattern/texture
- Uploaded image

Background image controls include crop/fit/position and opacity where appropriate. Built-in examples may include notebook paper, graph paper, chalkboard, stars, school-themed patterns, and colorful gradients.

## Editor UI
Desktop-first three-panel layout:
- **Left:** add elements/tools
- **Center:** card canvas and student preview
- **Right:** properties for the selected element

A student switcher below the canvas lets the teacher preview different records while editing. The app should detect obvious dynamic-text overflow and warn the user when a student's content no longer fits its text area.

Common controls are visible immediately. Less frequently needed styling/precision controls are grouped under an obvious **More Features** disclosure. Do not label this area "Advanced."

Undo/redo is built into the editor from the beginning.

## Print Safety Guides
The canvas has optional non-exported guides for:
- Card boundary
- Printer-safe area/cutoff area
- Center lines/alignment snapping

Important content may still be positioned outside the safe area; the guide is informational rather than restrictive.

## Rendering and Export Architecture
Do not independently recreate the design in a PDF renderer.

The card renderer is the single visual source of truth:

`Project + Student -> Card Renderer -> High-resolution raster -> outputs`

For print output, render each finished card at a print-oriented resolution (target 300 DPI at physical dimensions) and place those rendered images onto printable pages. This ensures curved text, shadows, masks, gradients, rotations, and other effects match the editor.

Exports:
- Individual PNG
- ZIP containing PNGs for all students
- Printable PDF assembled from rendered card images

PDF text does not need to remain selectable/vector text; appearance consistency is more important for this print-focused application.

## Print Layout
Print/export settings include:
- Letter paper initially
- Portrait/landscape
- Margins
- Spacing/gutters
- Optional cut lines
- Automatic cards-per-page layout based on physical dimensions
- Copies per student: presets such as 1/2/3 plus custom count

The print preview should be based on the same rendered card images used for final export.

## Project and Template Files
### Export Project
Portable durable save containing the design, roster, student mappings/photos, project settings, and assets necessary to reopen the job.

### Export Template
Reusable/shareable design without student roster, student photos, or other student-specific records. Templates can later be imported and applied to another roster.

Project/template formats are versioned so migrations can be added later.

## Autosave and Recovery
Use IndexedDB rather than localStorage because projects may contain many image blobs.

Meaningful changes are debounced and autosaved locally. Maintain a small rolling recovery history, initially the latest three valid snapshots.

On startup, if recoverable work exists, restore the latest valid snapshot and display a prominent message similar to:

> **Your previous project was recovered.** This is an automatic recovery copy and is not a permanent save. Please **Export Project** to keep your work.

The message provides **Export Project** and **Start New Project** actions. Starting a new project requires confirmation before replacing recovery data.

The interface must make clear that autosave/recovery is not equivalent to an exported permanent project file.

## Deployment
Maintain the privacy-friendly static-client architecture where possible so the app can run through:
- Docker/self-hosted static web hosting
- GitHub Pages/static hosting

No backend account system or database is required for the initial application.

## Reuse from Clever Badge Maker
Reuse or adapt, rather than blindly copy:
- Clever PDF import/name/QR extraction behavior
- Proven browser-local processing approach
- Relevant alignment/drag interaction concepts
- GitHub Pages/Vite deployment setup
- Docker static deployment setup
- Useful layout import/export lessons

Do not preserve Clever Badge Maker's card-specific internal assumptions or separate PDF drawing implementation.

## Initial Performance Guardrails
- `MAX_TEMPLATE_ELEMENTS = 50` in one configuration location.
- Normalize large imported decorative images for browser memory safety.
- Dynamic student images do not multiply template element count.
- Avoid rerendering every student at full print resolution during normal editing; render the active preview interactively and perform high-resolution batch rendering during export.

## Initial Testing Priorities
- Project/template serialization round trips without losing assets or dynamic field bindings.
- Recovery survives refresh/reopen and rejects corrupt newest snapshots by falling back to an older valid snapshot.
- CSV arbitrary fields bind correctly to dynamic elements.
- Clever imports create equivalent student records without coupling the editor to Clever.
- Preview and exported PNG pixel output use the same renderer.
- PDF page assembly preserves the raster card appearance and physical dimensions.
- Element transforms, layering, undo/redo, locking, and duplication behave consistently.
- Long student names/fields trigger overflow warnings.
- GitHub Pages build works without a backend.
