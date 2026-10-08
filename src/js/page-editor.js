/* Visual Page Editor — Inline PDF editing using editable.json */
(() => {
    let doc = null;
    let currentPage = 0;
    let editedElements = {};     // { elementId: { ...overrides } }
    let selectedElement = null;
    let undoStack = [];
    let redoStack = [];
    let isDirty = false;
    let editorContainer = null;
    let reportId = null;
    let onClose = null;

    const FONTS = {};

    async function loadDocument() {
        if (doc) return doc;
        const response = await fetch('assets/report-template/editable.json');
        if (!response.ok) throw new Error('Could not load editable report.');
        doc = await response.json();
        // Register extracted fonts
        for (const [name, info] of Object.entries(doc.fonts)) {
            const face = new FontFace(info.family, `url(${info.file})`);
            await face.load();
            document.fonts.add(face);
            FONTS[info.family] = face;
        }
        return doc;
    }

    function getElement(id) {
        return editedElements[id] ? { ...getOriginalElement(id), ...editedElements[id] } : getOriginalElement(id);
    }

    function getOriginalElement(id) {
        for (const page of doc.pages) {
            const el = page.elements.find(e => e.id === id);
            if (el) return el;
        }
        return null;
    }

    function pushUndo() {
        undoStack.push(JSON.stringify(editedElements));
        redoStack = [];
        isDirty = true;
        updateToolbarState();
    }

    function undo() {
        if (!undoStack.length) return;
        redoStack.push(JSON.stringify(editedElements));
        editedElements = JSON.parse(undoStack.pop());
        isDirty = undoStack.length > 0;
        renderCurrentPage();
        updateToolbarState();
    }

    function redo() {
        if (!redoStack.length) return;
        undoStack.push(JSON.stringify(editedElements));
        editedElements = JSON.parse(redoStack.pop());
        isDirty = true;
        renderCurrentPage();
        updateToolbarState();
    }

    function updateToolbarState() {
        const undoBtn = document.getElementById('pe-undo');
        const redoBtn = document.getElementById('pe-redo');
        const saveBtn = document.getElementById('pe-save');
        if (undoBtn) undoBtn.disabled = !undoStack.length;
        if (redoBtn) redoBtn.disabled = !redoStack.length;
        if (saveBtn) saveBtn.textContent = isDirty ? 'Save changes' : 'Saved';
        const pageLabel = document.getElementById('pe-page-label');
        if (pageLabel) pageLabel.textContent = `Page ${currentPage + 1} of ${doc.pages.length}`;
        const prevBtn = document.getElementById('pe-prev');
        const nextBtn = document.getElementById('pe-next');
        if (prevBtn) prevBtn.disabled = currentPage === 0;
        if (nextBtn) nextBtn.disabled = currentPage === doc.pages.length - 1;
    }

    // ── Render a single page ──
    function renderCurrentPage() {
        const canvas = document.getElementById('pe-canvas');
        if (!canvas || !doc) return;
        const page = doc.pages[currentPage];
        canvas.innerHTML = '';

        // 1. Background color
        canvas.style.background = page.background || '#f6f6f2';

        // 2. Background/texture images (rendered first, behind everything)
        const bgImages = page.elements.filter(e => e.type === 'image' && e.background);
        bgImages.forEach(raw => {
            const el = getElement(raw.id);
            const img = document.createElement('img');
            img.src = el.src;
            img.className = 'pe-bg-image';
            img.draggable = false;
            img.alt = el.label || '';
            img.style.cssText = `left:${pct(el.x, doc.width)};top:${pct(el.y, doc.height)};width:${pct(el.width, doc.width)};height:${pct(el.height, doc.height)};object-fit:${el.fit || 'cover'};`;
            canvas.appendChild(img);
        });

        // 3. Content photos (non-background images)
        const photos = page.elements.filter(e => e.type === 'image' && !e.background);
        photos.forEach(raw => {
            const el = getElement(raw.id);
            const wrapper = document.createElement('div');
            wrapper.className = 'pe-element pe-image';
            wrapper.dataset.id = el.id;
            wrapper.style.cssText = `left:${pct(el.x, doc.width)};top:${pct(el.y, doc.height)};width:${pct(el.width, doc.width)};height:${pct(el.height, doc.height)};`;
            const img = document.createElement('img');
            img.src = el.src;
            img.draggable = false;
            img.alt = el.label || '';
            img.style.objectFit = el.fit || 'cover';
            wrapper.appendChild(img);
            wrapper.addEventListener('click', (e) => { e.stopPropagation(); selectElement(el.id); });
            canvas.appendChild(wrapper);
        });

        // 4. Decoration artwork overlay
        if (page.artwork) {
            const art = document.createElement('img');
            art.src = page.artwork;
            art.className = 'pe-artwork';
            art.draggable = false;
            art.alt = '';
            canvas.appendChild(art);
        }

        // 5. Text elements
        const texts = page.elements.filter(e => e.type === 'text');
        texts.forEach(raw => {
            const el = getElement(raw.id);
            const div = document.createElement('div');
            div.className = 'pe-element pe-text';
            div.dataset.id = el.id;
            div.style.cssText = `left:${pct(el.x, doc.width)};top:${pct(el.y, doc.height)};width:${pct(el.width, doc.width)};min-height:${pct(el.height, doc.height)};font-family:${el.font},sans-serif;font-size:${scaledSize(el.fontSize)};color:${el.color};text-align:${el.align || 'left'};line-height:${el.lineHeight || 1.25};${el.bold ? 'font-weight:bold;' : ''}${el.italic ? 'font-style:italic;' : ''}`;
            
            // Use original glyph positioning for unedited elements, plain text for edited
            if (editedElements[el.id] && editedElements[el.id].text !== undefined) {
                div.textContent = el.text;
            } else if (el.glyphs && el.glyphs.length) {
                // Render with original glyph coordinates for pixel-perfect match
                div.textContent = el.text;
            } else {
                div.textContent = el.text;
            }

            div.addEventListener('click', (e) => { e.stopPropagation(); selectElement(el.id); });
            div.addEventListener('dblclick', (e) => { e.stopPropagation(); startEditing(el.id); });
            canvas.appendChild(div);
        });

        // Deselect on canvas click
        canvas.addEventListener('click', () => deselectAll());

        // Highlight selected
        if (selectedElement) {
            const sel = canvas.querySelector(`[data-id="${selectedElement}"]`);
            if (sel) sel.classList.add('pe-selected');
        }

        updateToolbarState();
    }

    function pct(value, total) {
        return ((value / total) * 100).toFixed(4) + '%';
    }

    function scaledSize(ptSize) {
        // Font sizes in the document are in PDF points. Scale relative to the A4 width.
        return ((ptSize / doc.width) * 100).toFixed(4) + 'cqi';
    }

    function selectElement(id) {
        deselectAll();
        selectedElement = id;
        const el = document.querySelector(`[data-id="${id}"]`);
        if (el) el.classList.add('pe-selected');
        showElementToolbar(id);
    }

    function deselectAll() {
        selectedElement = null;
        document.querySelectorAll('.pe-selected').forEach(e => e.classList.remove('pe-selected'));
        document.querySelectorAll('.pe-editing').forEach(e => {
            e.contentEditable = 'false';
            e.classList.remove('pe-editing');
        });
        hideElementToolbar();
    }

    function startEditing(id) {
        const el = getElement(id);
        if (!el) return;
        
        if (el.type === 'image') {
            // Open image picker for photos
            const wrapper = document.querySelector(`[data-id="${id}"]`);
            if (!wrapper) return;
            const picker = window.MatwImagePicker;
            const currentSrc = el.src;
            picker.bind(wrapper, currentSrc, (newSrc) => {
                pushUndo();
                editedElements[id] = { ...editedElements[id], src: newSrc };
                renderCurrentPage();
            }, el.label || 'photo');
            wrapper.click(); // trigger the picker
            return;
        }

        if (el.type === 'text') {
            const div = document.querySelector(`[data-id="${id}"]`);
            if (!div) return;
            div.classList.add('pe-editing');
            div.contentEditable = 'true';
            div.focus();

            // Select all text on entering edit mode
            const range = document.createRange();
            range.selectNodeContents(div);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);

            const commitEdit = () => {
                const newText = div.textContent;
                if (newText !== el.text) {
                    pushUndo();
                    editedElements[id] = { ...editedElements[id], text: newText };
                }
                div.contentEditable = 'false';
                div.classList.remove('pe-editing');
            };

            div.addEventListener('blur', commitEdit, { once: true });
            div.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') { div.blur(); }
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); div.blur(); }
            });
        }
    }

    function showElementToolbar(id) {
        const el = getElement(id);
        if (!el) return;
        const bar = document.getElementById('pe-element-bar');
        if (!bar) return;
        bar.style.display = 'flex';
        
        if (el.type === 'text') {
            bar.innerHTML = `
                <span class="pe-bar-label">${el.id}</span>
                <button class="pe-bar-btn" id="pe-el-edit" title="Edit text"><i class="fa-solid fa-pen"></i></button>
                <span class="pe-bar-sep"></span>
                <span class="pe-bar-label" style="font-size:0.75rem;color:var(--text-secondary);">${el.fontSize.toFixed(1)}pt · ${el.font}</span>
            `;
            document.getElementById('pe-el-edit')?.addEventListener('click', () => startEditing(id));
        } else if (el.type === 'image') {
            bar.innerHTML = `
                <span class="pe-bar-label">${el.label || el.id}</span>
                <button class="pe-bar-btn" id="pe-el-replace" title="Replace image"><i class="fa-solid fa-image"></i> Replace</button>
            `;
            document.getElementById('pe-el-replace')?.addEventListener('click', () => startEditing(id));
        }
    }

    function hideElementToolbar() {
        const bar = document.getElementById('pe-element-bar');
        if (bar) { bar.style.display = 'none'; bar.innerHTML = ''; }
    }

    // ── Navigation ──
    function goToPage(index) {
        if (index < 0 || index >= doc.pages.length) return;
        deselectAll();
        currentPage = index;
        renderCurrentPage();
    }

    // ── Save ──
    function saveEdits() {
        if (!reportId) return;
        const reports = JSON.parse(localStorage.getItem('matw_reports') || '[]');
        const report = reports.find(r => r.id === reportId);
        if (report) {
            report.editedElements = editedElements;
            localStorage.setItem('matw_reports', JSON.stringify(reports));
            isDirty = false;
            updateToolbarState();
            if (window.showToast) window.showToast('Changes saved.', 'success');
        }
    }

    // ── Open Editor ──
    async function open(rptId, container, closeFn) {
        reportId = rptId;
        editorContainer = container;
        onClose = closeFn;
        currentPage = 0;
        selectedElement = null;
        undoStack = [];
        redoStack = [];
        isDirty = false;

        await loadDocument();

        // Load previously saved edits
        const reports = JSON.parse(localStorage.getItem('matw_reports') || '[]');
        const report = reports.find(r => r.id === rptId);
        editedElements = (report && report.editedElements) ? JSON.parse(JSON.stringify(report.editedElements)) : {};

        container.innerHTML = `
            <div class="pe-root">
                <div class="pe-toolbar">
                    <div class="pe-toolbar-left">
                        <button class="btn-text" id="pe-close" title="Close editor">
                            <i class="fa-solid fa-arrow-left"></i> Back
                        </button>
                    </div>
                    <div class="pe-toolbar-center">
                        <button class="pe-nav-btn" id="pe-prev" title="Previous page" disabled>
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <span class="pe-page-label" id="pe-page-label">Page 1 of 17</span>
                        <button class="pe-nav-btn" id="pe-next" title="Next page">
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                    <div class="pe-toolbar-right">
                        <button class="pe-bar-btn" id="pe-undo" title="Undo (Ctrl+Z)" disabled>
                            <i class="fa-solid fa-rotate-left"></i>
                        </button>
                        <button class="pe-bar-btn" id="pe-redo" title="Redo (Ctrl+Shift+Z)" disabled>
                            <i class="fa-solid fa-rotate-right"></i>
                        </button>
                        <button class="btn btn-primary btn-sm" id="pe-save">Saved</button>
                    </div>
                </div>
                <div class="pe-element-bar" id="pe-element-bar" style="display:none;"></div>
                <div class="pe-viewport">
                    <div class="pe-canvas-wrapper">
                        <div class="pe-canvas" id="pe-canvas" style="aspect-ratio: ${doc.width} / ${doc.height}; container-type: inline-size;"></div>
                    </div>
                </div>
            </div>
        `;

        // Wire toolbar
        document.getElementById('pe-close').addEventListener('click', () => close());
        document.getElementById('pe-prev').addEventListener('click', () => goToPage(currentPage - 1));
        document.getElementById('pe-next').addEventListener('click', () => goToPage(currentPage + 1));
        document.getElementById('pe-undo').addEventListener('click', () => undo());
        document.getElementById('pe-redo').addEventListener('click', () => redo());
        document.getElementById('pe-save').addEventListener('click', () => saveEdits());

        // Keyboard shortcuts
        const keyHandler = (e) => {
            if (!editorContainer?.isConnected) { document.removeEventListener('keydown', keyHandler); return; }
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); }
            if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveEdits(); }
            if (e.key === 'ArrowLeft' && !isEditing()) { e.preventDefault(); goToPage(currentPage - 1); }
            if (e.key === 'ArrowRight' && !isEditing()) { e.preventDefault(); goToPage(currentPage + 1); }
            if (e.key === 'Escape' && selectedElement && !isEditing()) { deselectAll(); }
        };
        document.addEventListener('keydown', keyHandler);

        renderCurrentPage();
    }

    function isEditing() {
        return !!document.querySelector('.pe-editing');
    }

    function close() {
        if (isDirty) {
            if (!confirm('You have unsaved changes. Discard them?')) return;
        }
        deselectAll();
        if (onClose) onClose();
    }

    window.MatwPageEditor = { open };
})();
