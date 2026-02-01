// World History Timeline Application

class TimelineApp {
    constructor() {
        this.currentFilter = 'all';
        this.useExperienceScale = true;
        this.zoomLevel = 1;
        this.minYear = -300000;  // Full human history
        this.maxYear = 2026;
        this.selectedEvent = null;
        this.timelineWidth = 2500;
        this.searchQuery = '';
        this.wasDragging = false;
        this.draggedEvent = null;
        this.dragStartY = 0;

        this.init();
    }

    async init() {
        console.log('Initializing timeline...');
        await loadData();
        console.log('Data loaded. Events:', timelineData.events.length);
        this.bindEvents();
        this.render();
        console.log('Render complete');

        // Show server mode indicator
        if (isServerMode) {
            this.showToast('Connected - changes auto-save');
        }
    }

    bindEvents() {
        // View tabs
        document.querySelectorAll('.view-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.handleTabSwitch(e));
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });

        // Scale toggle
        document.getElementById('experienceScale').addEventListener('change', (e) => {
            this.useExperienceScale = e.target.checked;
            this.render();
        });

        // Zoom controls
        document.getElementById('zoomIn').addEventListener('click', () => this.zoom(1.5));
        document.getElementById('zoomOut').addEventListener('click', () => this.zoom(0.67));
        document.getElementById('zoomReset').addEventListener('click', () => this.resetZoom());

        // Zoom slider
        document.getElementById('zoomSlider').addEventListener('input', (e) => {
            this.zoomLevel = parseFloat(e.target.value);
            this.render();
        });

        // Panel close
        document.getElementById('closePanel').addEventListener('click', () => this.closeDetailPanel());

        // Add event modal
        document.getElementById('addEventBtn').addEventListener('click', () => this.openAddEventModal());
        document.getElementById('cancelAddEvent').addEventListener('click', () => this.closeAddEventModal());
        document.getElementById('addEventForm').addEventListener('submit', (e) => this.handleAddEvent(e));

        // Add reference modal
        document.getElementById('addReference').addEventListener('click', () => this.openAddReferenceModal());
        document.getElementById('cancelAddReference').addEventListener('click', () => this.closeAddReferenceModal());
        document.getElementById('addReferenceForm').addEventListener('submit', (e) => this.handleAddReference(e));

        // Save notes
        document.getElementById('saveNotes').addEventListener('click', () => this.saveNotes());

        // Category selector
        document.getElementById('eventCategorySelect').addEventListener('change', (e) => {
            this.updateCategoryColorPreview(e.target.value);
        });
        document.getElementById('saveCategoryBtn').addEventListener('click', () => this.saveEventCategory());

        // Delete event
        document.getElementById('deleteEventBtn').addEventListener('click', () => this.deleteEvent());

        // Export/Import/Reset
        document.getElementById('exportData').addEventListener('click', () => this.exportData());
        document.getElementById('importData').addEventListener('click', () => document.getElementById('importFile').click());
        document.getElementById('importFile').addEventListener('change', (e) => this.importData(e));
        document.getElementById('resetData').addEventListener('click', () => this.resetData());
        document.getElementById('resetLayout').addEventListener('click', () => this.resetLayout());

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.render();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
            if (e.key === 'Escape') {
                this.closeDetailPanel();
                this.closeAddEventModal();
                this.closeAddReferenceModal();
            }
        });

        // Click outside modals to close
        document.getElementById('addEventModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeAddEventModal();
        });
        document.getElementById('addReferenceModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeAddReferenceModal();
        });

        // Setup drag scroll
        this.setupDragScroll();
    }

    setupDragScroll() {
        const container = document.querySelector('.timeline-container');
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('timeline-event')) return;
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
        });

        container.style.cursor = 'grab';

        // Mouse wheel zoom
        container.addEventListener('wheel', (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
                this.zoom(zoomFactor);
            }
        }, { passive: false });
    }

    handleTabSwitch(e) {
        const view = e.target.dataset.view;

        // Update tab buttons
        document.querySelectorAll('.view-tab').forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');

        // Update view content
        document.querySelectorAll('.view-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${view}View`).classList.add('active');

        // Initialize map if switching to map view
        if (view === 'map') {
            initMap();
        }
    }

    handleFilterClick(e) {
        const category = e.target.dataset.category;

        if (category === 'all') {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            this.currentFilter = 'all';
        } else {
            document.querySelector('.filter-btn[data-category="all"]').classList.remove('active');
            e.target.classList.toggle('active');

            const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
                .map(btn => btn.dataset.category)
                .filter(cat => cat !== 'all');

            if (activeFilters.length === 0) {
                document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
                this.currentFilter = 'all';
            } else {
                this.currentFilter = activeFilters;
            }
        }

        this.render();
    }

    zoom(factor) {
        this.zoomLevel *= factor;
        this.zoomLevel = Math.max(0.5, Math.min(10, this.zoomLevel));
        document.getElementById('zoomSlider').value = this.zoomLevel;
        this.render();
    }

    resetZoom() {
        this.zoomLevel = 1;
        document.getElementById('zoomSlider').value = 1;
        this.render();
    }

    yearToPosition(year) {
        const width = this.timelineWidth * this.zoomLevel;

        if (this.useExperienceScale) {
            const markers = timelineData.experienceScale.markers;
            let lower = markers[0];
            let upper = markers[markers.length - 1];

            for (let i = 0; i < markers.length - 1; i++) {
                if (year >= markers[i].year && year <= markers[i + 1].year) {
                    lower = markers[i];
                    upper = markers[i + 1];
                    break;
                }
            }

            if (year < markers[0].year) return 0;
            if (year > markers[markers.length - 1].year) return width;

            const yearProgress = (year - lower.year) / (upper.year - lower.year);
            const experienceProgress = lower.experience + yearProgress * (upper.experience - lower.experience);
            const minExp = markers[0].experience;
            const maxExp = markers[markers.length - 1].experience;
            return ((experienceProgress - minExp) / (maxExp - minExp)) * width;
        } else {
            const range = this.maxYear - this.minYear;
            return ((year - this.minYear) / range) * width;
        }
    }

    getFilteredEvents() {
        let events = timelineData.events;

        // Apply search filter
        if (this.searchQuery) {
            events = events.filter(e => {
                const searchText = `${e.title} ${e.description || ''} ${e.category} ${e.subcategory || ''} ${e.region || ''}`.toLowerCase();
                return searchText.includes(this.searchQuery);
            });
        }

        if (this.currentFilter !== 'all') {
            const filters = Array.isArray(this.currentFilter) ? this.currentFilter : [this.currentFilter];
            events = events.filter(e => {
                return filters.some(f => {
                    if (f === 'people') {
                        return e.category === 'people';
                    }
                    if (f === 'political') {
                        return e.category === 'political';
                    }
                    if (f === 'technology') {
                        return e.category === 'technology';
                    }
                    if (f === 'civilizations') {
                        return e.category === 'civilizations' ||
                               e.category === 'era-european' ||
                               e.category === 'era-chinese';
                    }
                    if (f === 'religion') {
                        return e.category === 'religion' || e.subcategory === 'religious';
                    }
                    if (f === 'science') {
                        return e.category === 'science' || e.subcategory === 'science';
                    }
                    if (f === 'books') {
                        return e.category === 'books';
                    }
                    return e.category === f;
                });
            });
        }

        // Filter to visible year range
        events = events.filter(e => {
            const endYear = e.endYear || e.year;
            return endYear >= this.minYear && e.year <= this.maxYear;
        });

        return events;
    }

    render() {
        this.renderScaleMarkers();
        this.renderRegionTimeline();
        this.updateStats();
    }

    updateStats() {
        const events = this.getFilteredEvents();
        const countEl = document.getElementById('eventCount');
        const rangeEl = document.getElementById('timeRange');

        countEl.textContent = `${events.length} event${events.length !== 1 ? 's' : ''}`;

        if (events.length > 0) {
            const years = events.map(e => e.year);
            const endYears = events.map(e => e.endYear || e.year);
            const minYear = Math.max(this.minYear, Math.min(...years));
            const maxYear = Math.min(this.maxYear, Math.max(...endYears));
            rangeEl.textContent = `${this.formatYear(minYear)} to ${this.formatYear(maxYear)}`;
        } else {
            rangeEl.textContent = '';
        }
    }

    renderScaleMarkers() {
        const container = document.querySelector('.scale-markers');
        container.innerHTML = '';

        const width = this.timelineWidth * this.zoomLevel;
        container.style.width = `${width}px`;

        // Key milestone years to always show (when they fit)
        const milestoneYears = [
            { year: -300000, label: '300,000 BCE', major: true },
            { year: -100000, label: '100,000 BCE', major: true },
            { year: -50000, label: '50,000 BCE', major: false },
            { year: -10000, label: '10,000 BCE', major: true },
            { year: -6000, label: '6000 BCE', major: false },
            { year: -3000, label: '3000 BCE', major: true },
            { year: -2000, label: '2000 BCE', major: false },
            { year: -1000, label: '1000 BCE', major: true },
            { year: -500, label: '500 BCE', major: false },
            { year: 0, label: '1 CE', major: true },
            { year: 500, label: '500', major: false },
            { year: 1000, label: '1000', major: true },
            { year: 1300, label: '1300', major: true },
            { year: 1500, label: '1500', major: false },
            { year: 1700, label: '1700', major: false },
            { year: 1800, label: '1800', major: false },
            { year: 1900, label: '1900', major: true },
            { year: 2000, label: '2000', major: true },
        ];

        // Add more detailed markers when zoomed in
        if (this.zoomLevel > 2) {
            for (let year = -500; year <= 2000; year += 100) {
                if (!milestoneYears.find(m => m.year === year)) {
                    milestoneYears.push({ year, label: year < 0 ? `${Math.abs(year)} BCE` : `${year}`, major: false });
                }
            }
        }
        if (this.zoomLevel > 5) {
            for (let year = -500; year <= 2000; year += 50) {
                if (!milestoneYears.find(m => m.year === year)) {
                    milestoneYears.push({ year, label: year < 0 ? `${Math.abs(year)} BCE` : `${year}`, major: false });
                }
            }
        }

        // Sort by year
        milestoneYears.sort((a, b) => a.year - b.year);

        // Filter to visible range and prevent bunching
        const minPixelGap = 60; // Minimum pixels between labels
        let lastPixelPos = -Infinity;

        milestoneYears.forEach(marker => {
            if (marker.year >= this.minYear && marker.year <= this.maxYear) {
                const pixelPos = this.yearToPosition(marker.year);

                // Only show if enough space from last marker
                if (pixelPos - lastPixelPos >= minPixelGap) {
                    const div = document.createElement('div');
                    div.className = `scale-marker ${marker.major ? 'major' : ''}`;
                    div.style.left = `${pixelPos}px`;
                    div.innerHTML = `<span>${marker.label}</span>`;
                    container.appendChild(div);
                    lastPixelPos = pixelPos;
                }
            }
        });
    }

    renderRegionTimeline() {
        const container = document.getElementById('timelineContent');
        container.innerHTML = '';

        const width = this.timelineWidth * this.zoomLevel;
        container.style.width = `${width}px`;

        const events = this.getFilteredEvents();
        console.log('Filtered events:', events.length, 'Year range:', this.minYear, 'to', this.maxYear);

        // Render each region
        REGIONS.forEach((region, regionIndex) => {
            const regionDiv = document.createElement('div');
            regionDiv.className = 'region-section';
            regionDiv.dataset.region = region.id;

            // Region label
            const labelDiv = document.createElement('div');
            labelDiv.className = 'region-label';
            labelDiv.textContent = region.name;
            regionDiv.appendChild(labelDiv);

            // Region timeline area
            const timelineArea = document.createElement('div');
            timelineArea.className = 'region-timeline';
            timelineArea.style.width = `${width}px`;
            timelineArea.dataset.region = region.id;

            // Add drop zone functionality
            timelineArea.addEventListener('dragover', (e) => this.handleDragOver(e, region.id));
            timelineArea.addEventListener('drop', (e) => this.handleDrop(e, region.id));

            // Get events for this region
            const regionEvents = events.filter(e => e.region === region.id);
            console.log(`Region ${region.name}: ${regionEvents.length} events`);

            // Layout events in rows within the region
            const rows = this.layoutEventsInRegion(regionEvents);

            // Set minimum height based on number of rows
            const regionHeight = Math.max(100, rows.length * 35 + 20);
            timelineArea.style.minHeight = `${regionHeight}px`;

            rows.forEach((rowEvents, rowIndex) => {
                rowEvents.forEach(event => {
                    const eventDiv = this.createEventElement(event, rowIndex);
                    timelineArea.appendChild(eventDiv);
                });
            });

            regionDiv.appendChild(timelineArea);
            container.appendChild(regionDiv);
        });
    }

    layoutEventsInRegion(events) {
        const rows = [];
        const rowAssignments = timelineData.rowAssignments || {};

        // Category order (top to bottom):
        // 1. Civilizations/Eras, 2. Religion, 3. Science, 4. Technology, 5. Political, 6. People, 7. Books
        const categoryOrder = {
            'era-european': 0,
            'era-chinese': 1,
            'civilizations': 2,
            'religion': 3,
            'science': 4,
            'technology': 5,
            'political': 6,
            'people': 7,
            'books': 8
        };

        const getCategoryOrder = (event) => {
            // Check subcategory first for people with religious/science subcategories
            if (event.subcategory === 'religious') return categoryOrder['religion'];
            if (event.subcategory === 'science') return categoryOrder['science'];
            return categoryOrder[event.category] ?? 99;
        };

        // Sort events by category order, then by year
        const sortedEvents = [...events].sort((a, b) => {
            const orderA = getCategoryOrder(a);
            const orderB = getCategoryOrder(b);
            if (orderA !== orderB) return orderA - orderB;
            return a.year - b.year;
        });

        // Group events by their category group for layout
        const categoryGroups = {};
        sortedEvents.forEach(event => {
            const order = getCategoryOrder(event);
            if (!categoryGroups[order]) {
                categoryGroups[order] = [];
            }
            categoryGroups[order].push(event);
        });

        // Layout each category group separately, then combine
        const sortedOrders = Object.keys(categoryGroups).map(Number).sort((a, b) => a - b);

        sortedOrders.forEach(order => {
            const groupEvents = categoryGroups[order];
            const groupStartRow = rows.length;

            // Separate manual and auto events within this group
            const manualEvents = [];
            const autoEvents = [];

            groupEvents.forEach(event => {
                const key = `${event.region}-${event.id}`;
                if (rowAssignments[key] !== undefined) {
                    manualEvents.push({ event, row: rowAssignments[key] });
                } else {
                    autoEvents.push(event);
                }
            });

            // Place manually assigned events first
            manualEvents.forEach(({ event, row }) => {
                while (rows.length <= row) {
                    rows.push([]);
                }
                rows[row].push(event);
            });

            // Auto-layout the rest within this category group
            autoEvents.forEach(event => {
                const startPos = this.yearToPosition(event.year);
                const endPos = event.endYear ? this.yearToPosition(event.endYear) : startPos + 60;
                const width = Math.max(endPos - startPos, 20);

                let placed = false;

                // Try to fit in existing rows for this category group
                for (let i = groupStartRow; i < rows.length; i++) {
                    const rowEvents = rows[i];
                    const canFit = rowEvents.every(existing => {
                        const existingStart = this.yearToPosition(existing.year);
                        const existingEnd = existing.endYear ? this.yearToPosition(existing.endYear) : existingStart + 60;
                        const existingWidth = Math.max(existingEnd - existingStart, 20);

                        return startPos >= existingStart + existingWidth + 5 ||
                               startPos + width + 5 <= existingStart;
                    });

                    if (canFit) {
                        rows[i].push(event);
                        placed = true;
                        break;
                    }
                }

                if (!placed) {
                    rows.push([event]);
                }
            });
        });

        // Remove empty rows
        return rows.filter(row => row.length > 0);
    }

    createEventElement(event, rowIndex) {
        const div = document.createElement('div');
        const isPeriod = event.endYear && (event.endYear - event.year) > 30;
        const isEra = event.category.startsWith('era-');

        let categoryClass = event.category;
        if (isEra) {
            categoryClass = event.category;
        }

        div.className = `timeline-event ${categoryClass} ${isPeriod ? 'period' : ''} ${isEra ? 'era' : ''}`;
        div.draggable = true;
        div.dataset.eventId = event.id;
        div.dataset.region = event.region;

        const startPos = this.yearToPosition(event.year);
        const endPos = event.endYear ? this.yearToPosition(event.endYear) : startPos;
        const eventWidth = Math.max(endPos - startPos, isPeriod ? 40 : 20);

        div.style.left = `${startPos}px`;
        div.style.width = `${eventWidth}px`;
        div.style.top = `${rowIndex * 32 + 5}px`;

        // Create inner content with smart label
        const labelSpan = document.createElement('span');
        labelSpan.className = 'event-label';
        labelSpan.textContent = event.title;
        div.appendChild(labelSpan);

        // Tooltip with full info
        div.title = `${event.title}\n${this.formatYear(event.year)}${event.endYear ? ' - ' + this.formatYear(event.endYear) : ''}\n${event.description || ''}\n\nDrag to reorder rows`;

        // Drag events for reordering
        div.addEventListener('dragstart', (e) => this.handleDragStart(e, event));
        div.addEventListener('dragend', (e) => this.handleDragEnd(e));

        div.addEventListener('click', (e) => {
            if (!this.wasDragging) {
                this.showEventDetail(event);
            }
        });

        return div;
    }

    handleDragStart(e, event) {
        this.draggedEvent = event;
        this.wasDragging = false;
        e.target.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';

        // Store initial Y position to detect actual dragging
        this.dragStartY = e.clientY;
    }

    handleDragEnd(e) {
        e.target.style.opacity = '1';
        this.draggedEvent = null;

        // Reset wasDragging after a short delay to allow click event to fire first
        setTimeout(() => {
            this.wasDragging = false;
        }, 100);

        // Clean up all drop indicators and highlights
        document.querySelectorAll('.drop-indicator').forEach(el => el.remove());
        document.querySelectorAll('.region-timeline.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
    }

    handleDragOver(e, regionId) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        // Detect if actually dragging (moved more than 5px)
        if (Math.abs(e.clientY - this.dragStartY) > 5) {
            this.wasDragging = true;
        }

        // Highlight the target row
        const regionTimeline = e.currentTarget;
        regionTimeline.classList.add('drag-over');

        // Show row indicator
        const rect = regionTimeline.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        const targetRow = Math.floor(relativeY / 32);

        // Remove existing indicator
        const existing = regionTimeline.querySelector('.drop-indicator');
        if (existing) existing.remove();

        // Add new indicator
        const indicator = document.createElement('div');
        indicator.className = 'drop-indicator';
        indicator.style.cssText = `
            position: absolute;
            left: 0;
            right: 0;
            top: ${targetRow * 32}px;
            height: 32px;
            background: rgba(233, 69, 96, 0.15);
            border: 2px dashed var(--primary-color);
            pointer-events: none;
            z-index: 50;
        `;
        regionTimeline.appendChild(indicator);
    }

    handleDrop(e, regionId) {
        e.preventDefault();

        // Clean up indicators
        document.querySelectorAll('.drop-indicator').forEach(el => el.remove());
        document.querySelectorAll('.region-timeline.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });

        if (!this.draggedEvent || !this.wasDragging) return;

        // Calculate which row was dropped on based on Y position
        const regionTimeline = e.currentTarget;
        const rect = regionTimeline.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        const targetRow = Math.max(0, Math.floor(relativeY / 32));

        // Save the row assignment for this event
        if (!timelineData.rowAssignments) {
            timelineData.rowAssignments = {};
        }

        const key = `${this.draggedEvent.region}-${this.draggedEvent.id}`;
        timelineData.rowAssignments[key] = targetRow;

        // Save to localStorage
        this.saveRowAssignments();

        // Re-render
        this.render();
        this.showToast(`Moved "${this.draggedEvent.title}" to row ${targetRow + 1}`);
    }

    saveRowAssignments() {
        // Now uses the unified saveData function
        debouncedSave();
    }

    formatYear(year) {
        if (year < 0) {
            return `${Math.abs(year)} BCE`;
        } else if (year === 0) {
            return '1 CE';
        }
        return `${year} CE`;
    }

    showEventDetail(event) {
        this.selectedEvent = event;

        document.getElementById('eventTitle').textContent = event.title;
        document.getElementById('eventDate').textContent = event.endYear
            ? `${this.formatYear(event.year)} - ${this.formatYear(event.endYear)}`
            : this.formatYear(event.year);

        // Set category dropdown and color preview
        const categorySelect = document.getElementById('eventCategorySelect');
        categorySelect.value = event.category || 'civilizations';
        this.updateCategoryColorPreview(event.category || 'civilizations');

        // Set region display
        const regionName = REGIONS.find(r => r.id === event.region)?.name || event.region || 'Unknown';
        document.getElementById('eventRegion').textContent = regionName;

        document.getElementById('eventDescription').textContent = event.description || 'No description available.';

        document.getElementById('notesInput').value = timelineData.notes[event.id] || '';
        this.renderReferences(event.id);

        document.getElementById('eventDetailPanel').classList.add('open');
    }

    updateCategoryColorPreview(category) {
        const colorMap = {
            'people': 'var(--people-color)',
            'political': 'var(--political-color)',
            'technology': 'var(--technology-color)',
            'civilizations': 'var(--civilizations-color)',
            'era-european': 'var(--era-european-color)',
            'era-chinese': 'var(--era-chinese-color)',
            'religion': 'var(--religion-color)',
            'science': 'var(--science-color)',
            'books': 'var(--books-color)'
        };
        const preview = document.getElementById('categoryColorPreview');
        preview.style.background = colorMap[category] || 'var(--civilizations-color)';
    }

    saveEventCategory() {
        if (!this.selectedEvent) return;

        const newCategory = document.getElementById('eventCategorySelect').value;
        this.selectedEvent.category = newCategory;

        // Mark as user-modified if not already
        if (!this.selectedEvent.userAdded) {
            this.selectedEvent.userAdded = true;
        }

        saveData();
        this.render();
        this.updateCategoryColorPreview(newCategory);
        this.showToast('Category updated!');
    }

    deleteEvent() {
        if (!this.selectedEvent) return;

        const eventTitle = this.selectedEvent.title;
        if (!confirm(`Are you sure you want to delete "${eventTitle}"? This cannot be undone.`)) {
            return;
        }

        // Remove from events array
        const index = timelineData.events.findIndex(e => e.id === this.selectedEvent.id);
        if (index > -1) {
            timelineData.events.splice(index, 1);
        }

        // Remove any notes for this event
        delete timelineData.notes[this.selectedEvent.id];

        // Remove any row assignments for this event
        if (timelineData.rowAssignments) {
            const key = `${this.selectedEvent.region}-${this.selectedEvent.id}`;
            delete timelineData.rowAssignments[key];
        }

        saveData();
        this.closeDetailPanel();
        this.render();
        this.showToast(`"${eventTitle}" deleted`);
    }

    renderReferences(eventId) {
        const list = document.getElementById('referencesList');
        list.innerHTML = '';

        const refs = timelineData.references.filter(r => r.eventId === eventId);

        refs.forEach(ref => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="ref-info">
                    ${ref.url ? `<a href="${ref.url}" target="_blank" class="ref-title">${ref.title}</a>` : `<span class="ref-title">${ref.title}</span>`}
                    <div class="ref-type">${ref.type}${ref.author ? ' by ' + ref.author : ''}</div>
                </div>
                <span class="ref-status ${ref.status}">${ref.status.replace('-', ' ')}</span>
            `;
            list.appendChild(li);
        });

        if (refs.length === 0) {
            list.innerHTML = '<li style="color: var(--text-muted); text-align: center;">No references yet</li>';
        }
    }

    closeDetailPanel() {
        document.getElementById('eventDetailPanel').classList.remove('open');
        this.selectedEvent = null;
    }

    saveNotes() {
        if (this.selectedEvent) {
            timelineData.notes[this.selectedEvent.id] = document.getElementById('notesInput').value;
            saveData();
            this.showToast('Notes saved!');
        }
    }

    openAddEventModal() {
        document.getElementById('addEventModal').classList.add('open');
    }

    closeAddEventModal() {
        document.getElementById('addEventModal').classList.remove('open');
        document.getElementById('addEventForm').reset();
    }

    handleAddEvent(e) {
        e.preventDefault();

        const newEvent = {
            id: getNextEventId(),
            title: document.getElementById('newEventTitle').value,
            year: parseInt(document.getElementById('newEventYear').value),
            category: document.getElementById('newEventCategory').value,
            region: document.getElementById('newEventRegion').value,
            description: document.getElementById('newEventDescription').value,
            userAdded: true
        };

        const endYear = document.getElementById('newEventEndYear').value;
        if (endYear) {
            newEvent.endYear = parseInt(endYear);
        }

        const subcategory = document.getElementById('newEventSubcategory').value;
        if (subcategory) {
            newEvent.subcategory = subcategory;
        }

        timelineData.events.push(newEvent);
        saveData();

        this.closeAddEventModal();
        this.render();
        this.showToast('Event added!');
    }

    openAddReferenceModal() {
        document.getElementById('addReferenceModal').classList.add('open');
    }

    closeAddReferenceModal() {
        document.getElementById('addReferenceModal').classList.remove('open');
        document.getElementById('addReferenceForm').reset();
    }

    handleAddReference(e) {
        e.preventDefault();

        if (!this.selectedEvent) return;

        const newRef = {
            id: getNextReferenceId(),
            eventId: this.selectedEvent.id,
            title: document.getElementById('refTitle').value,
            type: document.getElementById('refType').value,
            url: document.getElementById('refUrl').value,
            status: document.getElementById('refStatus').value,
            userAdded: true
        };

        timelineData.references.push(newRef);
        saveData();

        this.closeAddReferenceModal();
        this.renderReferences(this.selectedEvent.id);
        this.showToast('Reference added!');
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: var(--primary-color);
            color: white;
            padding: 12px 24px;
            border-radius: 5px;
            z-index: 3000;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    resetLayout() {
        if (confirm('This will reset all row arrangements to auto-layout. Continue?')) {
            timelineData.rowAssignments = {};
            saveData();
            this.render();
            this.showToast('Layout reset to auto-arrange');
        }
    }

    resetData() {
        if (confirm('This will reset all data to defaults. Your notes and custom events will be lost. Continue?')) {
            clearSavedData();
        }
    }

    exportData() {
        const data = {
            events: timelineData.events,
            references: timelineData.references,
            notes: timelineData.notes,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `world-history-timeline-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('Data exported!');
    }

    importData(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);

                if (data.events) {
                    const existingIds = new Set(timelineData.events.map(e => e.id));
                    data.events.forEach(event => {
                        if (!existingIds.has(event.id)) {
                            timelineData.events.push(event);
                        }
                    });
                }

                if (data.references) {
                    const existingRefIds = new Set(timelineData.references.map(r => r.id));
                    data.references.forEach(ref => {
                        if (!existingRefIds.has(ref.id)) {
                            timelineData.references.push(ref);
                        }
                    });
                }

                if (data.notes) {
                    Object.assign(timelineData.notes, data.notes);
                }

                saveData();
                this.render();
                this.showToast('Data imported successfully!');
            } catch (err) {
                this.showToast('Error importing data: invalid format');
                console.error(err);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TimelineApp();
});
