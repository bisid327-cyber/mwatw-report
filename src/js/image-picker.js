/* Shared image picker for report backgrounds, logos and section icons. */
(() => {
    const modal = document.getElementById('image-upload-modal');
    const input = document.getElementById('modal-file-input');
    const preview = document.getElementById('image-preview-stage');
    const previewImage = document.getElementById('image-preview-img');
    const apply = document.getElementById('btn-apply-image-modal');
    const status = document.createElement('p');
    status.className = 'image-picker-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    preview.before(status);
    let target = null;
    let selected = '';
    let revision = 0;

    function message(text, error = false) {
        status.textContent = text;
        status.classList.toggle('is-error', error);
    }

    function showPreview(source) {
        selected = source;
        preview.style.display = source ? 'block' : 'none';
        if (source) previewImage.src = source;
        else previewImage.removeAttribute('src');
    }

    function switchTab(name) {
        modal.querySelectorAll('.image-modal-tab').forEach(button => {
            const active = button.dataset.tab === name;
            button.classList.toggle('active', active);
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', String(active));
            button.setAttribute('aria-controls', `tab-content-${button.dataset.tab}`);
            button.tabIndex = active ? 0 : -1;
        });
        modal.querySelectorAll('.image-tab-content').forEach(panel => {
            panel.style.display = panel.id === `tab-content-${name}` ? 'block' : 'none';
            panel.setAttribute('role', 'tabpanel');
        });
    }

    function close() {
        revision++;
        modal.style.display = 'none';
        const trigger = target?.element;
        target = null;
        input.value = '';
        trigger?.focus({ preventScroll: true });
    }

    function open(binding) {
        revision++;
        target = binding;
        input.value = '';
        document.getElementById('image-url-input').value = '';
        showPreview(binding.value);
        apply.disabled = true;
        message('Choose an image, then select Apply Image.');
        switchTab('upload');
        modal.style.display = 'flex';
        document.getElementById('image-modal-close').focus();
    }

    function decode(source, remote = false) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            if (remote) image.crossOrigin = 'anonymous';
            const timer = setTimeout(() => reject(new Error('The image took too long to load. Try uploading the file instead.')), 15000);
            image.onload = () => {
                clearTimeout(timer);
                if (!image.naturalWidth || !image.naturalHeight) reject(new Error('This image has no readable dimensions.'));
                else resolve(image);
            };
            image.onerror = () => {
                clearTimeout(timer);
                reject(new Error('This image could not be loaded. For web images, the host must allow access; otherwise upload the file.'));
            };
            image.src = source;
        });
    }

    function optimize(image, jpeg) {
        const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        // Rasterize SVGs and retain transparency in logos and icons.
        return canvas.toDataURL(jpeg ? 'image/jpeg' : 'image/png', 0.85);
    }

    async function load(producer) {
        const request = ++revision;
        apply.disabled = true;
        message('Loading image…');
        try {
            const source = await producer();
            if (request !== revision || !target) return;
            showPreview(source);
            apply.disabled = false;
            message('Image ready. Select Apply Image to use it.');
        } catch (error) {
            if (request !== revision || !target) return;
            message(error.message || 'Unable to read this image.', true);
        }
    }

    function loadFile(file) {
        return load(async () => {
            if (!file || !['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'].includes(file.type)) {
                throw new Error('Choose a PNG, JPG, WEBP or SVG image.');
            }
            if (file.size > 10 * 1024 * 1024) throw new Error('This file is too large. Choose an image smaller than 10 MB.');
            const source = URL.createObjectURL(file);
            try { return optimize(await decode(source), file.type === 'image/jpeg'); }
            finally { URL.revokeObjectURL(source); }
        });
    }

    function wireDrop(element, callback) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(name => {
            element.addEventListener(name, event => {
                event.preventDefault();
                event.stopPropagation();
                element.classList.toggle('drag-over', name === 'dragenter' || name === 'dragover');
                if (name === 'drop') callback(event.dataTransfer?.files?.[0]);
            });
        });
    }

    function bind(element, value, onApply, label) {
        const binding = { element, value, onApply };
        element.tabIndex = 0;
        element.setAttribute('role', 'button');
        element.setAttribute('aria-label', `Choose ${label}`);
        element.setAttribute('aria-haspopup', 'dialog');
        const paint = () => {
            element.style.backgroundImage = binding.value ? `url(${JSON.stringify(binding.value)})` : '';
            element.replaceChildren();
            const hint = document.createElement('span');
            hint.className = 'drop-zone-text';
            hint.textContent = element.id.startsWith('drop-sec-') ? '+' : binding.value ? 'Change image' : 'Choose image or drop a file';
            element.append(hint);
        };
        binding.commit = source => {
            binding.value = source;
            onApply(source);
            paint();
        };
        paint();
        element.addEventListener('click', () => open(binding));
        element.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(binding); }
        });
        wireDrop(element, file => { open(binding); loadFile(file); });
    }

    modal.querySelectorAll('.image-modal-tab').forEach((button, index, tabs) => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
        button.addEventListener('keydown', event => {
            if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
            event.preventDefault();
            const next = tabs[(index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
            switchTab(next.dataset.tab);
            next.focus();
        });
    });
    const drop = document.getElementById('modal-drop-zone');
    drop.addEventListener('click', event => { if (event.target !== input) input.click(); });
    drop.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); input.click(); }
    });
    wireDrop(drop, loadFile);
    input.addEventListener('change', () => { if (input.files[0]) loadFile(input.files[0]); input.value = ''; });
    document.getElementById('btn-preview-url').addEventListener('click', () => load(async () => {
        const url = new URL(document.getElementById('image-url-input').value.trim());
        if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Enter a direct HTTP or HTTPS image link.');
        return optimize(await decode(url.href, true), false);
    }));
    const presets = [
        ['MATW logo', 'assets/matw_logo.png'],
        ['Relief image 1', 'assets/charity_1.jpg'],
        ['Relief image 2', 'assets/charity_2.jpg'],
        ['Relief image 3', 'assets/charity_3.jpg'],
        ['Relief image 4', 'assets/charity_4.jpg'],
        ['Gaza background', 'assets/gaza_impact_child_background.jpg']
    ];
    presets.forEach(([name, source]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'image-preset';
        const image = document.createElement('img');
        image.src = source;
        image.alt = '';
        const caption = document.createElement('span');
        caption.textContent = name;
        button.append(image, caption);
        button.addEventListener('click', () => load(async () => { await decode(source); return source; }));
        document.getElementById('image-presets-grid').append(button);
    });
    document.getElementById('btn-clear-preview').addEventListener('click', () => {
        revision++;
        showPreview('');
        apply.disabled = false;
        message('Select Apply Image to remove the current image.');
    });
    apply.addEventListener('click', () => { if (!apply.disabled && target) { target.commit(selected); close(); } });
    document.getElementById('image-modal-close').addEventListener('click', close);
    document.getElementById('btn-cancel-image-modal').addEventListener('click', close);
    modal.addEventListener('click', event => { if (event.target === modal) close(); });
    modal.addEventListener('keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); close(); }
        if (event.key !== 'Tab') return;
        const controls = [...modal.querySelectorAll('button:not(:disabled), input, [tabindex="0"]')].filter(el => el.getClientRects().length && el.tabIndex >= 0);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    window.MatwImagePicker = { bind };
})();
