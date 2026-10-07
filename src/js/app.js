// Main Application Logic — V2 Report Studio
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Fetch Report Data (default metrics template)
    let reportData = null;
    try {
        const response = await fetch('../src/data/reportData.json');
        if(!response.ok) throw new Error("Could not fetch data");
        reportData = await response.json();
    } catch (e) {
        console.error("Using fallback data due to fetch error", e);
        reportData = {
            "keyMetrics": [
                {
                    "id": "meals", "title": "Hot Meals Distributed", "icon": "fa-solid fa-bowl-food",
                    "value": "244,263", "description": "Nutritious hot meals provided to families in crisis zones.",
                    "pageData": { "title": "Emergency Food Relief", "details": "MATW teams are on the ground daily cooking and distributing massive quantities of hot, nutritious meals to internally displaced families.",
                        "metrics": [
                            { "label": "Family Hot Meals", "value": "244,263" },
                            { "label": "Iftar Meals", "value": "43,500" },
                            { "label": "Food Packs", "value": "12,480" },
                            { "label": "Flour Bags", "value": "7,800" },
                            { "label": "Baby Milk Tins", "value": "2,940" },
                            { "label": "Vegetable Boxes", "value": "5,320" }
                        ]
                    }
                },
                {
                    "id": "water", "title": "Clean Water Supplied", "icon": "fa-solid fa-droplet",
                    "value": "1,284,000 L", "description": "Safe drinking water trucked to emergency shelters.",
                    "pageData": { "title": "Water & Sanitation", "details": "With infrastructure destroyed, MATW is trucking in millions of liters of clean drinking water to prevent the spread of disease.",
                        "metrics": [
                            { "label": "Liters Delivered", "value": "1,284,000" },
                            { "label": "Water Wells Built", "value": "18" },
                            { "label": "Hygiene Kits", "value": "80,000" }
                        ]
                    }
                },
                {
                    "id": "medical", "title": "Medical & Mobility", "icon": "fa-solid fa-kit-medical",
                    "value": "1,860 Kits", "description": "Patients treated, mobility aids and medical kits delivered.",
                    "pageData": { "title": "Healthcare & Mobility Support", "details": "MATW is supplying overwhelmed hospitals with emergency medical kits, trauma supplies, wheelchairs, and prosthetic limbs.",
                        "metrics": [
                            { "label": "Medical Kits", "value": "1,860" },
                            { "label": "Baby Diapers", "value": "4,920 packs" },
                            { "label": "Wheelchairs", "value": "86" },
                            { "label": "Prosthetic Limbs", "value": "12" },
                            { "label": "Crutches", "value": "240 pairs" },
                            { "label": "Hospital Rebuild", "value": "1 project" }
                        ]
                    }
                },
                {
                    "id": "shelter", "title": "Shelter & Winter Aid", "icon": "fa-solid fa-tent",
                    "value": "14,800+", "description": "Clothing, winter kits, blankets and tents for displaced families.",
                    "pageData": { "title": "Shelter, Clothing & Winter Aid", "details": "Warmth, shelter and household essentials for families facing the winter.",
                        "metrics": [
                            { "label": "Clothing Items", "value": "14,800" },
                            { "label": "Winter Kits (Children)", "value": "3,820" },
                            { "label": "Winter Blankets", "value": "6,750" },
                            { "label": "Mattresses", "value": "2,180" },
                            { "label": "Tents", "value": "280" },
                            { "label": "Tarpaulins", "value": "1,640" }
                        ]
                    }
                },
                {
                    "id": "orphans", "title": "Orphan & Child Welfare", "icon": "fa-solid fa-children",
                    "value": "420", "description": "Direct financial and psychological support for orphaned children.",
                    "pageData": { "title": "Orphan Support", "details": "Ongoing care and practical support for children without parental care.",
                        "metrics": [
                            { "label": "Children Supported", "value": "420" },
                            { "label": "Family Care Grants", "value": "185" },
                            { "label": "Gifts for Children", "value": "3,840" },
                            { "label": "School Kits", "value": "1,260" }
                        ]
                    }
                }
            ]
        };
    }

    // 2. LocalStorage & Cloud Report Management
    let currentUser = null;
    let authHeader = '';

    function getReports() {
        try { return JSON.parse(localStorage.getItem('matw_reports') || '[]'); } catch { return []; }
    }
    
    function saveReports(reports) {
        // Always save locally
        localStorage.setItem('matw_reports', JSON.stringify(reports));
        
        // Sync to cloud if authenticated
        if (currentUser && authHeader) {
            fetch('/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                },
                body: JSON.stringify({ reports: reports })
            })
            .then(res => res.json())
            .then(data => console.log("Cloud sync:", data))
            .catch(err => console.error("Cloud sync error:", err));
        }
    }
    function genId() { return 'rpt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7); }

    // 3. DOM References
    const viewContainer = document.getElementById('view-container');
    const navItems = document.querySelectorAll('.nav-item');
    let sliderInterval = null;

    // ──────────────────────────────────
    // VIEW 1: Action Overview (Bento Grid)
    // ──────────────────────────────────
    function renderOverview() {
        if(document.getElementById('global-footer')) document.getElementById('global-footer').style.display = 'flex';
        if (sliderInterval) clearInterval(sliderInterval);
        let gridHtml = `
            <div class="bento-grid">
                <div class="bento-card slider-card" style="cursor: default;">
                    <div class="image-slide active" style="background-image: url('../assets/charity_1.jpg');"></div>
                    <div class="image-slide" style="background-image: url('../assets/charity_2.jpg');"></div>
                    <div class="image-slide" style="background-image: url('../assets/charity_3.jpg');"></div>
                    <div class="image-slide" style="background-image: url('../assets/charity_4.jpg');"></div>
                    <div class="slider-overlay">
                        <h3>MATW Emergency Appeal</h3>
                        <p>Providing critical relief on the ground.</p>
                    </div>
                </div>
        `;
        reportData.keyMetrics.forEach(metric => {
            gridHtml += `
                <div class="bento-card" data-id="${metric.id}">
                    <div class="bento-card-header">
                        <i class="${metric.icon}"></i>
                        <h3>${metric.title}</h3>
                    </div>
                    <div class="bento-value">${metric.value}</div>
                    <div class="bento-desc">${metric.description}</div>
                </div>
            `;
        });
        gridHtml += '</div>';
        viewContainer.innerHTML = gridHtml;

        // Image Slider
        const slides = document.querySelectorAll('.image-slide');
        let currentSlide = 0;
        if (slides.length > 0) {
            sliderInterval = setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 4000);
        }

        gsap.from(".bento-card", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" });

        document.querySelectorAll('.bento-card[data-id]').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                renderDetail(id);
                updateNav(id);
            });
        });
    }

    // ──────────────────────────────────
    // VIEW 2: Metric Detail View
    // ──────────────────────────────────
    function renderDetail(id) {
        if(document.getElementById('global-footer')) document.getElementById('global-footer').style.display = 'flex';
        if (sliderInterval) clearInterval(sliderInterval);
        const metric = reportData.keyMetrics.find(m => m.id === id);
        if (!metric) return;
        let metricsHtml = metric.pageData.metrics.map(m => `
            <div class="metric-item">
                <div class="metric-label">${m.label}</div>
                <div class="metric-value">${m.value}</div>
            </div>
        `).join('');
        viewContainer.innerHTML = `
            <div class="detail-view">
                <h3><i class="${metric.icon}"></i> ${metric.pageData.title}</h3>
                <p>${metric.pageData.details}</p>
                <div class="metrics-list">${metricsHtml}</div>
                <button class="btn btn-secondary" style="margin-top: 2rem;" onclick="document.querySelector('[data-view=\\'overview\\']').click()">
                    <i class="fa-solid fa-arrow-left"></i> Back to Overview
                </button>
            </div>
        `;
    }

    // ──────────────────────────────────
    // VIEW 3: Report Studio — 3 Sub-Views
    // ──────────────────────────────────

    // 3A. Report List
    function renderReportList() {
        if(document.getElementById('global-footer')) document.getElementById('global-footer').style.display = 'flex';
        if (sliderInterval) clearInterval(sliderInterval);
        const reports = getReports();

        let cardsHtml = '';
        if (reports.length === 0) {
            cardsHtml = `
                <div class="studio-empty">
                    <i class="fa-solid fa-folder-open"></i>
                    <h4>No reports yet</h4>
                    <p>Create your first impact report to get started.</p>
                </div>
            `;
        } else {
            cardsHtml = reports.map(r => `
                <div class="report-card" data-rpt-id="${r.id}">
                    <div class="report-card-top">
                        <span class="report-status ${r.status === 'Published' ? 'published' : 'draft'}">${r.status}</span>
                        <button class="report-delete-btn" data-del-id="${r.id}" title="Delete">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    <h4>${r.title}</h4>
                    <p class="report-card-sub">${r.subtitle || ''}</p>
                    <div class="report-card-meta">
                        <span><i class="fa-solid fa-calendar"></i> ${r.startDate || '—'} → ${r.endDate || '—'}</span>
                    </div>
                    <div class="report-card-actions">
                        <button class="btn btn-primary btn-sm" data-view-id="${r.id}">
                            <i class="fa-solid fa-eye"></i> View
                        </button>
                        <button class="btn btn-secondary btn-sm" data-edit-id="${r.id}">
                            <i class="fa-solid fa-pen"></i> Edit
                        </button>
                    </div>
                </div>
            `).join('');
        }

        viewContainer.innerHTML = `
            <div class="studio-header">
                <div>
                    <h3><i class="fa-solid fa-file-lines"></i> Impact Reports</h3>
                    <p>Create, manage and export polished impact reports.</p>
                </div>
                <button class="btn btn-primary" id="btn-new-report">
                    <i class="fa-solid fa-plus"></i> New Report
                </button>
            </div>
            
            <div style="margin-bottom: var(--space-8);">
                <div class="bento-card" style="display: flex; flex-wrap: wrap; gap: var(--space-4); align-items: center; background: linear-gradient(135deg, rgba(0, 180, 182, 0.1) 0%, rgba(255, 0, 102, 0.05) 100%); border-left: 4px solid var(--matw-cyan);">
                    <div style="font-size: 3rem; color: var(--matw-cyan); padding: 0 var(--space-2);">
                        <i class="fa-solid fa-file-pdf"></i>
                    </div>
                    <div style="flex-grow: 1; min-width: 250px;">
                        <span class="report-status published" style="margin-bottom: 8px; display: inline-block;">Official Publication</span>
                        <h4 style="font-size: var(--text-xl); font-family: 'Montserrat', sans-serif; margin-bottom: 4px;">Palestine Impact Report 2026</h4>
                        <p style="color: var(--text-secondary); font-size: var(--text-sm);">The comprehensive 17-page official impact summary document detailing the ongoing efforts and allocations in Gaza.</p>
                    </div>
                    <div>
                        <a href="assets/Palestine_Impact_Report_2026.pdf" target="_blank" class="btn btn-primary" style="text-decoration: none;">
                            <i class="fa-solid fa-download"></i> Download Full PDF
                        </a>
                    </div>
                </div>
            </div>

            <h4 style="font-family: 'Montserrat', sans-serif; font-size: var(--text-lg); margin-bottom: var(--space-4); padding-bottom: var(--space-2); border-bottom: 1px solid var(--border-color); color: var(--text-primary);">Your Custom Reports</h4>
            <div class="report-cards-grid">${cardsHtml}</div>
        `;

        // Event Listeners
        document.getElementById('btn-new-report').addEventListener('click', () => renderReportBuilder(null));

        document.querySelectorAll('[data-view-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                renderReportViewer(e.currentTarget.dataset.viewId);
            });
        });
        document.querySelectorAll('[data-edit-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                renderReportBuilder(e.currentTarget.dataset.editId);
            });
        });
        document.querySelectorAll('[data-del-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = e.currentTarget.dataset.delId;
                if (confirm('Delete this report permanently?')) {
                    saveReports(getReports().filter(r => r.id !== id));
                    renderReportList();
                }
            });
        });

        gsap.from(".report-card, .studio-empty", { y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" });
    }

    // 3B. Report Builder (Create / Edit)
    function renderReportBuilder(editId) {
        if (sliderInterval) clearInterval(sliderInterval);
        const existing = editId ? getReports().find(r => r.id === editId) : null;

        const title = existing ? existing.title : 'Gaza Impact Report';
        const subtitle = existing ? existing.subtitle : '20 days of focused support';
        const startDate = existing ? existing.startDate : '2026-09-01';
        const endDate = existing ? existing.endDate : '2026-09-20';
        const intro = existing ? existing.introduction : 'Together with our local partners, we are helping families access food, clean water, medical support and a safer place to call home.';
        const font = existing ? existing.font : 'Montserrat';
        const status = existing ? existing.status : 'Draft';
        let bgImage = existing && existing.bgImage ? existing.bgImage : '';
        let logoImage = existing && existing.logoImage ? existing.logoImage : '';

        // Build section editors
        const sections = existing ? existing.sections : reportData.keyMetrics.map((m, i) => ({
            id: m.id,
            title: m.pageData.title,
            visible: true,
            metrics: m.pageData.metrics.map(met => ({ ...met, visible: true }))
        }));

        let sectionsHtml = sections.map((sec, si) => {
            let metricsRows = sec.metrics.map((met, mi) => `
                <div class="builder-metric-row">
                    <input type="text" class="builder-input builder-input-sm" value="${met.label}" data-sec="${si}" data-met="${mi}" data-field="label">
                    <input type="text" class="builder-input builder-input-sm" value="${met.value}" data-sec="${si}" data-met="${mi}" data-field="value">
                </div>
            `).join('');
            return `
                <div class="builder-section">
                    <div class="builder-section-header" style="align-items: center; gap: 12px;">
                        <div id="drop-sec-icon-${si}" class="drop-zone" style="flex-shrink: 0; width: 44px; height: 44px; min-height: 44px; padding: 0; ${sec.iconImage ? `background-image:url(${sec.iconImage}); background-size:contain; background-repeat:no-repeat;` : ''}">
                            ${sec.iconImage ? '' : '<i class="fa-solid fa-image" style="font-size:14px; color:var(--text-secondary);"></i>'}
                        </div>
                        <input type="text" class="builder-input" style="flex: 1;" value="${sec.title}" data-sec="${si}" data-field="sec-title">
                        <label class="toggle-label" style="margin-bottom: 0;">
                            <input type="checkbox" ${sec.visible ? 'checked' : ''} data-sec="${si}" data-field="sec-visible">
                            <span>Visible</span>
                        </label>
                    </div>
                    <div class="builder-metrics">${metricsRows}</div>
                </div>
            `;
        }).join('');

        viewContainer.innerHTML = `
            <div class="detail-view" style="max-width: 100%;">
                <div class="studio-header" style="margin-bottom: var(--space-6);">
                    <h3><i class="fa-solid fa-pen-ruler"></i> ${existing ? 'Edit Report' : 'Create New Report'}</h3>
                    <button class="btn btn-secondary btn-sm" id="btn-back-list">
                        <i class="fa-solid fa-arrow-left"></i> Back to List
                    </button>
                </div>

                <!-- Step 1: Details -->
                <div class="builder-step">
                    <h4><span class="step-badge">1</span> Report Details</h4>
                    <div class="builder-row">
                        <div class="builder-field">
                            <label>Report Title</label>
                            <input type="text" id="b-title" class="builder-input" value="${title}">
                        </div>
                        <div class="builder-field">
                            <label>Subtitle</label>
                            <input type="text" id="b-subtitle" class="builder-input" value="${subtitle}">
                        </div>
                    </div>
                    <div class="builder-row">
                        <div class="builder-field">
                            <label>Start Date</label>
                            <input type="date" id="b-start" class="builder-input" value="${startDate}">
                        </div>
                        <div class="builder-field">
                            <label>End Date</label>
                            <input type="date" id="b-end" class="builder-input" value="${endDate}">
                        </div>
                    </div>
                    <div class="builder-field">
                        <label>Introduction</label>
                        <textarea id="b-intro" class="builder-input" rows="3">${intro}</textarea>
                    </div>
                </div>

                <!-- Step 2: Sections & Metrics -->
                <div class="builder-step">
                    <h4><span class="step-badge">2</span> Sections & Metrics</h4>
                    <div id="builder-sections">${sectionsHtml}</div>
                </div>

                <!-- Step 3: Branding -->
                <div class="builder-step">
                    <h4><span class="step-badge">3</span> Branding</h4>
                    <div class="builder-row">
                        <div class="builder-field">
                            <label>Typography</label>
                            <select id="b-font" class="builder-input">
                                <option value="Montserrat" ${font === 'Montserrat' ? 'selected' : ''}>Brand (Montserrat)</option>
                                <option value="Poppins" ${font === 'Poppins' ? 'selected' : ''}>Modern (Poppins)</option>
                                <option value="Georgia, serif" ${font.includes('serif') ? 'selected' : ''}>Classic (Serif)</option>
                            </select>
                        </div>
                        <div class="builder-field">
                            <label>Status</label>
                            <select id="b-status" class="builder-input">
                                <option value="Draft" ${status === 'Draft' ? 'selected' : ''}>Draft</option>
                                <option value="Published" ${status === 'Published' ? 'selected' : ''}>Published</option>
                            </select>
                        </div>
                    </div>
                    <div class="builder-row" style="margin-top:var(--space-4);">
                        <div class="builder-field">
                            <label>Background Image</label>
                            <div id="drop-bg" class="drop-zone" style="${bgImage ? `background-image:url(${bgImage})` : ''}">
                                ${bgImage ? '' : '<span class="drop-zone-text">Drag & Drop Background Image</span>'}
                            </div>
                        </div>
                        <div class="builder-field">
                            <label>Logo Image</label>
                            <div id="drop-logo" class="drop-zone" style="${logoImage ? `background-image:url(${logoImage}); background-size:contain; background-repeat:no-repeat;` : ''}">
                                ${logoImage ? '' : '<span class="drop-zone-text">Drag & Drop Custom Logo</span>'}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="builder-actions">
                    <button class="btn btn-primary" id="btn-save-report" style="flex:1;">
                        <i class="fa-solid fa-floppy-disk"></i> ${existing ? 'Update Report' : 'Save Report'}
                    </button>
                    <button class="btn btn-secondary" id="btn-save-preview" style="flex:1;">
                        <i class="fa-solid fa-eye"></i> Save & Preview
                    </button>
                </div>
            </div>
        `;

        // Setup Drag and Drop
        function setupDropZone(elId, onFile) {
            const el = document.getElementById(elId);
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => {
                el.addEventListener(evt, e => {
                    e.preventDefault();
                    e.stopPropagation();
                });
            });
            el.addEventListener('dragover', () => el.classList.add('drag-over'));
            el.addEventListener('dragleave', () => el.classList.remove('drag-over'));
            el.addEventListener('drop', (e) => {
                el.classList.remove('drag-over');
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    const file = e.dataTransfer.files[0];
                    if (!file.type.startsWith('image/')) return;
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        const b64 = evt.target.result;
                        onFile(b64);
                        el.style.backgroundImage = `url(${b64})`;
                        if (elId === 'drop-logo') {
                            el.style.backgroundSize = 'contain';
                            el.style.backgroundRepeat = 'no-repeat';
                        }
                        el.innerHTML = '';
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        setupDropZone('drop-bg', (b64) => { bgImage = b64; });
        setupDropZone('drop-logo', (b64) => { logoImage = b64; });
        sections.forEach((sec, si) => {
            setupDropZone(`drop-sec-icon-${si}`, (b64) => { sec.iconImage = b64; });
        });

        // Collect form data
        function collectFormData() {
            const sectionEls = document.querySelectorAll('.builder-section');
            const collectedSections = [];
            sectionEls.forEach((secEl, si) => {
                const secTitle = secEl.querySelector('[data-field="sec-title"]').value;
                const secVisible = secEl.querySelector('[data-field="sec-visible"]').checked;
                const metricEls = secEl.querySelectorAll('.builder-metric-row');
                const mets = [];
                metricEls.forEach((metEl, mi) => {
                    mets.push({
                        label: metEl.querySelector('[data-field="label"]').value,
                        value: metEl.querySelector('[data-field="value"]').value,
                        visible: true
                    });
                });
                collectedSections.push({ 
                    id: sections[si]?.id || 'sec_' + si, 
                    title: secTitle, 
                    iconImage: sections[si]?.iconImage || '',
                    visible: secVisible, 
                    metrics: mets 
                });
            });

            return {
                id: existing ? existing.id : genId(),
                title: document.getElementById('b-title').value,
                subtitle: document.getElementById('b-subtitle').value,
                startDate: document.getElementById('b-start').value,
                endDate: document.getElementById('b-end').value,
                introduction: document.getElementById('b-intro').value,
                font: document.getElementById('b-font').value,
                status: document.getElementById('b-status').value,
                bgImage: bgImage,
                logoImage: logoImage,
                sections: collectedSections,
                createdAt: existing ? existing.createdAt : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        }

        function saveReport() {
            const data = collectFormData();
            let reports = getReports();
            const idx = reports.findIndex(r => r.id === data.id);
            if (idx >= 0) reports[idx] = data; else reports.unshift(data);
            saveReports(reports);
            return data;
        }

        document.getElementById('btn-back-list').addEventListener('click', () => renderReportList());
        document.getElementById('btn-save-report').addEventListener('click', () => {
            saveReport();
            renderReportList();
        });
        document.getElementById('btn-save-preview').addEventListener('click', () => {
            const data = saveReport();
            renderReportViewer(data.id);
        });
    }

    // 3C. Report Viewer — Premium Executive Report
    function renderReportViewer(reportId) {
        if(document.getElementById('global-footer')) document.getElementById('global-footer').style.display = 'none';
        if (sliderInterval) clearInterval(sliderInterval);
        const report = getReports().find(r => r.id === reportId);
        if (!report) { renderReportList(); return; }

        const visibleSections = report.sections.filter(s => s.visible);

        // Calculate total metrics for the hero strip
        let totalItems = 0;
        let totalSections = visibleSections.length;
        visibleSections.forEach(sec => {
            sec.metrics.forEach(m => {
                const num = parseInt(String(m.value).replace(/[^0-9]/g, ''));
                if (!isNaN(num)) totalItems += num;
            });
        });

        // Build hero KPI strip from first metric of each section
        let heroKpis = visibleSections.slice(0, 4).map((sec, i) => {
            const leadMetric = sec.metrics[0];
            const colors = ['#0097D0', '#0373B3', '#074B96', '#e91e63'];
            const icons = ['fa-chart-line', 'fa-arrow-trend-up', 'fa-chart-bar', 'fa-chart-pie'];
            const accent = colors[i % 4];
            return `
                <div class="exec-kpi" style="--kpi-accent: ${accent};">
                    <div class="exec-kpi-accent"></div>
                    <div class="exec-kpi-body">
                        <div class="exec-kpi-top">
                            <span class="exec-kpi-label">${leadMetric ? leadMetric.label : sec.title}</span>
                            <span class="exec-kpi-icon"><i class="fa-solid ${icons[i % 4]}"></i></span>
                        </div>
                        <div class="exec-kpi-value">${leadMetric ? leadMetric.value : '—'}</div>
                        <div class="exec-kpi-footer">
                            <span class="exec-kpi-section">${sec.title}</span>
                            <span class="exec-kpi-trend">
                                <i class="fa-solid fa-arrow-up"></i> ${sec.metrics.length} metrics
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Build detailed section blocks
        let sectionsHtml = visibleSections.map((sec, si) => {
            let tableRows = sec.metrics.filter(m => m.visible !== false).map((m, mi) => `
                <tr class="exec-table-row" style="--index: ${mi};">
                    <td class="exec-td-label">
                        <span class="exec-row-dot"></span>
                        ${m.label}
                    </td>
                    <td class="exec-td-value">${m.value}</td>
                </tr>
            `).join('');

            return `
                <div class="exec-section" style="--index: ${si};">
                    <div class="exec-section-header">
                        ${sec.iconImage ? 
                            `<div class="exec-section-icon"><img src="${sec.iconImage}" style="width:100%; height:100%; object-fit:contain;"></div>` : 
                            `<div class="exec-section-num">${String(si + 1).padStart(2, '0')}</div>`
                        }
                        <div>
                            <h4 class="exec-section-title">${sec.title}</h4>
                            <p class="exec-section-count">${sec.metrics.length} metrics tracked</p>
                        </div>
                    </div>
                    <table class="exec-table">
                        <thead>
                            <tr>
                                <th class="exec-th-label">Metric</th>
                                <th class="exec-th-value">Value</th>
                            </tr>
                        </thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                </div>
            `;
        }).join('');

        // Summary footer stats
        const totalMetricCount = visibleSections.reduce((a, s) => a + s.metrics.length, 0);


        viewContainer.innerHTML = `
            <div class="exec-report" id="report-printable" style="font-family: '${report.font}', sans-serif;">
                <!-- Branded Header Banner -->
                <div class="exec-hero-banner">
                    <div class="exec-hero-top">
                        <img src="${report.logoImage ? report.logoImage : 'assets/matw_logo.png'}" alt="MATW Project" class="exec-hero-logo">
                        <span class="report-status ${report.status === 'Published' ? 'published' : 'draft'}">${report.status}</span>
                    </div>
                    <h1 class="exec-hero-title">${report.title}</h1>
                    <p class="exec-hero-subtitle">${report.subtitle || ''}</p>
                    <div class="exec-hero-meta">
                        <span><i class="fa-solid fa-calendar-days"></i> ${report.startDate || '—'} → ${report.endDate || '—'}</span>
                        <span><i class="fa-solid fa-layer-group"></i> ${totalSections} Sections · ${totalMetricCount} Metrics</span>
                    </div>
                </div>

                <!-- Introduction -->
                ${report.introduction ? `
                    <div class="exec-intro-block">
                        <div class="exec-intro-icon"><i class="fa-solid fa-quote-left"></i></div>
                        <p class="exec-intro-text">${report.introduction}</p>
                    </div>
                ` : ''}

                <!-- Hero KPI Strip -->
                <div class="exec-kpi-strip">${heroKpis}</div>

                <!-- Section Divider -->
                <div class="exec-divider">
                    <span class="exec-divider-label">Detailed Breakdown</span>
                </div>

                <!-- Detailed Sections -->
                <div class="exec-sections">${sectionsHtml}</div>

                <!-- Branded Footer Banner -->
                <div class="exec-footer-banner">
                    <div>
                        <div class="exec-footer-tagline">ONE TEAM. ONE MISSION.</div>
                        <div class="exec-footer-headline">Making a real difference, together.</div>
                    </div>
                    <div class="exec-footer-right">
                        <span class="exec-footer-gen">Generated ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <a href="https://matwproject.org/gaza-emergency" target="_blank" class="exec-footer-cta">
                            Support Gaza <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Sticky Action Bar -->
            <div class="viewer-action-bar">
                <button class="btn btn-secondary btn-sm" id="vw-back">
                    <i class="fa-solid fa-arrow-left"></i> Back
                </button>
                <div style="display:flex; gap: var(--space-2); flex-wrap: wrap;">
                    <button class="btn btn-primary btn-sm" id="vw-pdf">
                        <i class="fa-solid fa-file-pdf"></i> Export PDF
                    </button>
                    <button class="btn btn-secondary btn-sm" id="vw-csv">
                        <i class="fa-solid fa-file-csv"></i> CSV
                    </button>
                    <button class="btn btn-secondary btn-sm" id="vw-share">
                        <i class="fa-solid fa-link"></i> Share
                    </button>
                    <button class="btn btn-secondary btn-sm" id="vw-edit">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                </div>
            </div>
        `;

        // Staggered entrance animations
        gsap.from(".exec-kpi", { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)" });
        gsap.from(".exec-section", { y: 20, opacity: 0, duration: 0.5, stagger: 0.12, delay: 0.3, ease: "power2.out" });

        // Export PDF
        document.getElementById('vw-pdf').addEventListener('click', () => {
            const el = document.getElementById('report-printable');
            html2pdf().set({
                margin: 0.5,
                filename: report.title.replace(/[^a-z0-9]/gi, '_') + '.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, backgroundColor: '#0a0a0a' },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            }).from(el).save();
        });

        // Export CSV
        document.getElementById('vw-csv').addEventListener('click', () => {
            let csv = "Section,Metric,Value\n";
            report.sections.filter(s => s.visible).forEach(sec => {
                sec.metrics.forEach(m => {
                    csv += `"${sec.title}","${m.label}","${m.value}"\n`;
                });
            });
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = report.title.replace(/[^a-z0-9]/gi, '_') + '.csv';
            link.click();
        });

        // Share Link
        document.getElementById('vw-share').addEventListener('click', (e) => {
            navigator.clipboard.writeText(window.location.href);
            const btn = e.currentTarget;
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => btn.innerHTML = orig, 2000);
        });

        document.getElementById('vw-back').addEventListener('click', () => renderReportList());
        document.getElementById('vw-edit').addEventListener('click', () => renderReportBuilder(reportId));
    }


    // ──────────────────────────────────
    // Legal Pages
    // ──────────────────────────────────
    function renderLegal(type) {
        if (sliderInterval) clearInterval(sliderInterval);
        
        let title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
        let content = type === 'privacy' ? 
            `<p>At MATW Project, we take your privacy seriously. This dashboard ("MATW Impact Dashboard") collects limited local data when used in Guest Mode. All reports generated in Guest Mode are saved strictly to your browser's local storage.</p>
             <p>When you create an account to use our Cloud Sync features, we collect your name and email address securely. We do not share your data with third parties. Your generated reports are stored on our secure servers to allow cross-device access.</p>
             <p>If you have any questions regarding your data, please contact our support team.</p>` :
            `<p>By accessing the MATW Impact Dashboard, you agree to abide by these Terms of Service. The information provided in this dashboard is for transparent reporting of humanitarian aid and must not be misrepresented.</p>
             <p><strong>Guest Mode:</strong> You are free to generate PDF reports locally without an account. We are not responsible for data loss of locally stored reports.</p>
             <p><strong>Cloud Sync:</strong> By registering an account, you agree to use our cloud services responsibly. We reserve the right to terminate accounts that violate our usage policies.</p>`;

        viewContainer.innerHTML = `
            <div class="legal-content">
                <h3><i class="fa-solid ${type === 'privacy' ? 'fa-shield-halved' : 'fa-file-contract'}"></i> ${title}</h3>
                ${content}
            </div>
        `;
    }

    // ──────────────────────────────────
    // Auth View Logic
    // ──────────────────────────────────
    function renderAuthView(isLogin = true) {
        if(document.getElementById('global-footer')) document.getElementById('global-footer').style.display = 'flex';
        if (sliderInterval) clearInterval(sliderInterval);
        
        viewContainer.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; min-height: 70vh;">
                <div class="auth-modal-content" style="position: relative; box-shadow: none; border: 1px solid var(--border-color); background: var(--surface-color);">
                    <div style="text-align: center; margin-bottom: var(--space-6);">
                        <h3 style="font-family:'Montserrat', sans-serif; font-size:var(--text-2xl); color:var(--matw-cyan);">
                            <i class="fa-solid fa-user-circle"></i> MATW Account
                        </h3>
                        <p style="color: var(--text-secondary); font-size: var(--text-sm); margin-top: var(--space-2);">Sign in to sync your reports to the cloud.</p>
                    </div>
                    
                    <div class="auth-tabs">
                        <button class="auth-tab ${isLogin ? 'active' : ''}" id="tab-login">Sign In</button>
                        <button class="auth-tab ${!isLogin ? 'active' : ''}" id="tab-signup">Create Account</button>
                    </div>
                    
                    <div class="auth-form" id="form-login" style="display: ${isLogin ? 'flex' : 'none'};">
                        <div id="login-error" style="color:var(--matw-pink); font-size:var(--text-sm); display:none;"></div>
                        <div>
                            <label style="display:block; margin-bottom:4px; font-size:var(--text-sm); color:var(--text-secondary);">Email Address</label>
                            <input type="email" id="login-email" class="builder-input" style="width:100%;" placeholder="you@example.com">
                        </div>
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:end; margin-bottom:4px;">
                                <label style="display:block; font-size:var(--text-sm); color:var(--text-secondary);">Password</label>
                                <a href="#" id="link-forgot-password" style="font-size:0.75rem; color:var(--matw-cyan); text-decoration:none;">Forgot Password?</a>
                            </div>
                            <input type="password" id="login-password" class="builder-input" style="width:100%;" placeholder="••••••••">
                        </div>
                        <button id="btn-submit-login" class="btn btn-brand-pink" style="margin-top:var(--space-2); width:100%; justify-content:center;">
                            Sign In
                        </button>
                    </div>

                    <div class="auth-form" id="form-signup" style="display: ${!isLogin ? 'flex' : 'none'};">
                        <div id="signup-error" style="color:var(--matw-pink); font-size:var(--text-sm); display:none;"></div>
                        <div>
                            <label style="display:block; margin-bottom:4px; font-size:var(--text-sm); color:var(--text-secondary);">Full Name</label>
                            <input type="text" id="signup-name" class="builder-input" style="width:100%;" placeholder="John Doe">
                        </div>
                        <div>
                            <label style="display:block; margin-bottom:4px; font-size:var(--text-sm); color:var(--text-secondary);">Email Address</label>
                            <input type="email" id="signup-email" class="builder-input" style="width:100%;" placeholder="you@example.com">
                        </div>
                        <div>
                            <label style="display:block; margin-bottom:4px; font-size:var(--text-sm); color:var(--text-secondary);">Password</label>
                            <input type="password" id="signup-password" class="builder-input" style="width:100%;" placeholder="••••••••">
                        </div>
                        <label style="font-size: 0.75rem; color: var(--text-secondary); display:flex; align-items:start; gap: 8px;">
                            <input type="checkbox" id="signup-agree" style="margin-top:3px;">
                            <span>I agree to the <a href="#" class="auth-legal-link" data-type="terms" style="color:var(--matw-cyan);">Terms of Service</a> and <a href="#" class="auth-legal-link" data-type="privacy" style="color:var(--matw-cyan);">Privacy Policy</a>.</span>
                        </label>
                        <button id="btn-submit-signup" class="btn btn-brand-pink" style="margin-top:var(--space-2); width:100%; justify-content:center;">
                            Create Account
                        </button>
                    </div>
                    
                    <div style="margin-top: var(--space-6); text-align: center; border-top: 1px solid var(--border-color); padding-top: var(--space-4);">
                        <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; justify-content: center; gap: var(--space-4);">
                            <a href="#" class="auth-legal-link" data-type="privacy" style="color: var(--text-secondary); text-decoration: none;"><i class="fa-solid fa-shield-halved"></i> Privacy Policy</a>
                            <a href="#" class="auth-legal-link" data-type="terms" style="color: var(--text-secondary); text-decoration: none;"><i class="fa-solid fa-file-contract"></i> Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('tab-login').addEventListener('click', () => renderAuthView(true));
        document.getElementById('tab-signup').addEventListener('click', () => renderAuthView(false));

        document.querySelectorAll('.auth-legal-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                renderLegal(e.currentTarget.dataset.type);
            });
        });

        // Setup API Calls
        if (isLogin) {
            document.getElementById('btn-submit-login').addEventListener('click', async () => {
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                try {
                    const res = await fetch('/api/login', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({email, password})
                    });
                    const data = await res.json();
                    if (res.ok) {
                        handleLoginSuccess(data.user, data.token);
                    } else {
                        document.getElementById('login-error').innerText = data.error;
                        document.getElementById('login-error').style.display = 'block';
                    }
                } catch(e) {
                    console.error(e);
                }
            });
        } else {
            document.getElementById('btn-submit-signup').addEventListener('click', async () => {
                const name = document.getElementById('signup-name').value;
                const email = document.getElementById('signup-email').value;
                const password = document.getElementById('signup-password').value;
                const agree = document.getElementById('signup-agree').checked;
                if (!agree) return alert("Please agree to the Terms of Service.");
                
                try {
                    const res = await fetch('/api/signup', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({name, email, password})
                    });
                    const data = await res.json();
                    if (res.ok) {
                        // Switch back to login
                        alert("Account created! Please sign in.");
                        renderAuthView(true);
                    } else {
                        document.getElementById('signup-error').innerText = data.error;
                        document.getElementById('signup-error').style.display = 'block';
                    }
                } catch(e) {
                    console.error(e);
                }
            });
        }
    }

    async function handleLoginSuccess(user, token) {
        currentUser = user;
        authHeader = `Bearer ${token}`;
        
        // Fetch cloud reports and merge
        try {
            const res = await fetch('/api/reports', {
                headers: { 'Authorization': authHeader }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.reports) {
                    // Merge logic: prefer cloud if IDs match, else append
                    let localReports = getReports();
                    let localMap = new Map(localReports.map(r => [r.id, r]));
                    data.reports.forEach(cr => {
                        localMap.set(cr.id, cr);
                    });
                    saveReports(Array.from(localMap.values())); // Save back combined list locally and cloud
                }
            }
        } catch(e) {
            console.error("Failed to sync reports", e);
        }

        updateAuthUI();
        renderOverview(); // Return to dashboard
    }

    function updateAuthUI() {
        const btnAuth = document.getElementById('btn-open-auth');
        const userProfileMenu = document.getElementById('user-profile-menu');
        
        if (currentUser) {
            btnAuth.style.display = 'none';
            userProfileMenu.style.display = 'flex';
            document.getElementById('user-name').innerText = currentUser.name;
            const initials = currentUser.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
            document.querySelector('.user-avatar').innerText = initials;
        } else {
            btnAuth.style.display = 'flex';
            userProfileMenu.style.display = 'none';
        }
    }

    document.getElementById('btn-open-auth').addEventListener('click', () => {
        updateNav(null);
        renderAuthView(true);
    });

    document.getElementById('btn-signout').addEventListener('click', () => {
        currentUser = null;
        authHeader = '';
        updateAuthUI();
        renderOverview();
    });

    // ──────────────────────────────────
    // Navigation Logic
    // ──────────────────────────────────
    function updateNav(viewId) {
        navItems.forEach(nav => {
            nav.classList.remove('active');
            if (viewId && nav.getAttribute('data-view') === viewId) nav.classList.add('active');
        });
    }

    navItems.forEach(nav => {
        nav.addEventListener('click', (e) => {
            const viewId = e.currentTarget.getAttribute('data-view');
            updateNav(viewId);
            if (viewId === 'overview') renderOverview();
            else if (viewId === 'export-studio') renderReportList();
            else renderDetail(viewId);
            
            // Close mobile menu on navigate
            closeMobileMenu();
        });
    });

    // Mobile Menu Toggles
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menuClose = document.getElementById('mobile-menu-close');

    function openMobileMenu() {
        sidebar.classList.add('mobile-open');
        backdrop.classList.add('show');
    }

    function closeMobileMenu() {
        sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('show');
    }

    if(menuToggle) menuToggle.addEventListener('click', openMobileMenu);
    if(menuClose) menuClose.addEventListener('click', closeMobileMenu);
    if(backdrop) backdrop.addEventListener('click', closeMobileMenu);

    // Initial Render
    renderOverview();
});
