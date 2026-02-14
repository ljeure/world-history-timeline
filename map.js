// World History Map Module
// Interactive map showing real historical borders from GeoJSON basemaps

// Experience-based scale markers (matching timeline page)
const experienceScaleMarkers = [
    { year: -300000, experience: 0.00 },
    { year: -100000, experience: 0.03 },
    { year: -50000, experience: 0.05 },
    { year: -10000, experience: 0.08 },
    { year: -6000, experience: 0.10 },
    { year: -3000, experience: 0.15 },
    { year: -1000, experience: 0.20 },
    { year: 0, experience: 0.25 },
    { year: 500, experience: 0.35 },
    { year: 1000, experience: 0.45 },
    { year: 1300, experience: 0.50 },
    { year: 1500, experience: 0.55 },
    { year: 1700, experience: 0.62 },
    { year: 1760, experience: 0.67 },
    { year: 1850, experience: 0.75 },
    { year: 1900, experience: 0.80 },
    { year: 1950, experience: 0.85 },
    { year: 2000, experience: 0.90 },
    { year: 2024, experience: 1.00 }
];

// Convert slider position (0-1) to year based on experience scale
function sliderPositionToYear(position, useExperienceScale) {
    const minYear = -300000;
    const maxYear = 2024;

    if (!useExperienceScale) {
        return Math.round(minYear + position * (maxYear - minYear));
    }

    for (let i = 0; i < experienceScaleMarkers.length - 1; i++) {
        const current = experienceScaleMarkers[i];
        const next = experienceScaleMarkers[i + 1];

        if (position >= current.experience && position <= next.experience) {
            const segmentProgress = (position - current.experience) / (next.experience - current.experience);
            return Math.round(current.year + segmentProgress * (next.year - current.year));
        }
    }

    return position < 0.5 ? minYear : maxYear;
}

// Convert year to slider position (0-1) based on experience scale
function yearToSliderPosition(year, useExperienceScale) {
    const minYear = -300000;
    const maxYear = 2024;

    if (!useExperienceScale) {
        return (year - minYear) / (maxYear - minYear);
    }

    for (let i = 0; i < experienceScaleMarkers.length - 1; i++) {
        const current = experienceScaleMarkers[i];
        const next = experienceScaleMarkers[i + 1];

        if (year >= current.year && year <= next.year) {
            const segmentProgress = (year - current.year) / (next.year - current.year);
            return current.experience + segmentProgress * (next.experience - current.experience);
        }
    }

    return year < 0 ? 0 : 1;
}

class HistoryMap {
    constructor() {
        this.map = null;
        this.empireLayers = {};
        this.currentYear = 0;
        this.minYear = -300000;
        this.maxYear = 2024;
        this.isPlaying = false;
        this.playInterval = null;
        this.selectedEmpire = null;
        this.linkedTimelineEvent = null;
        this.useExperienceScale = false;

        // New: async GeoJSON loading state
        this.geoJsonCache = new Map();
        this.basemapLayer = null;
        this.curatedLayer = null;
        this.showCurated = false;
        this.debounceTimer = null;
        this.currentSnapshotYear = null;
        this.selectedGeometry = null;
        this.fetchController = null;
    }

    init() {
        this.map = L.map('mapContainer', {
            center: [30, 40],
            zoom: 3,
            minZoom: 2,
            maxZoom: 8,
            worldCopyJump: true
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(this.map);

        // Initialize layer groups
        this.empireLayerGroup = L.layerGroup().addTo(this.map);
        this.curatedLayerGroup = L.layerGroup(); // Not added by default

        this.bindEvents();

        const initialPosition = 500 / 1000;
        const initialYear = sliderPositionToYear(initialPosition, this.useExperienceScale);
        this.setYear(initialYear);
    }

    bindEvents() {
        const yearSlider = document.getElementById('mapYearSlider');
        yearSlider.addEventListener('input', (e) => {
            const position = parseInt(e.target.value) / 1000;
            const year = sliderPositionToYear(position, this.useExperienceScale);

            // Update year display immediately
            document.getElementById('mapYearDisplay').textContent = this.formatYear(year);
            this.currentYear = year;

            // Debounce the actual fetch
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => this.setYear(year, false), 150);
        });

        document.getElementById('mapPlayBtn').addEventListener('click', () => this.togglePlay());

        document.getElementById('mapSpeed').addEventListener('change', (e) => {
            if (this.isPlaying) {
                this.stopPlay();
                this.startPlay();
            }
        });

        document.getElementById('mapPrevEra').addEventListener('click', () => this.jumpToEra(-1));
        document.getElementById('mapNextEra').addEventListener('click', () => this.jumpToEra(1));

        const scaleToggle = document.getElementById('mapExperienceScale');
        if (scaleToggle) {
            scaleToggle.addEventListener('change', (e) => {
                this.useExperienceScale = e.target.checked;
                this.updateSliderPosition();
            });
        }

        // Curated empires toggle
        const curatedToggle = document.getElementById('mapCuratedToggle');
        if (curatedToggle) {
            curatedToggle.addEventListener('change', (e) => {
                this.showCurated = e.target.checked;
                if (this.showCurated) {
                    this.curatedLayerGroup.addTo(this.map);
                } else {
                    this.curatedLayerGroup.remove();
                }
                this.renderCuratedEmpires();
            });
        }

        document.getElementById('closeEmpirePanel').addEventListener('click', () => this.closeEmpirePanel());
        document.getElementById('addEmpireToTimeline').addEventListener('click', () => this.addSelectedToTimeline());
        document.getElementById('saveEmpireEdits').addEventListener('click', () => this.saveTimelineEdits());

        // Create State Entity button
        const createEntityBtn = document.getElementById('createStateEntity');
        if (createEntityBtn) {
            createEntityBtn.addEventListener('click', () => this.createStateEntity());
        }

        document.getElementById('empireDetailModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeEmpirePanel();
        });
    }

    updateSliderPosition() {
        const position = yearToSliderPosition(this.currentYear, this.useExperienceScale);
        document.getElementById('mapYearSlider').value = Math.round(position * 1000);
    }

    setYear(year, updateSlider = true) {
        this.currentYear = year;
        document.getElementById('mapYearDisplay').textContent = this.formatYear(year);

        if (updateSlider) {
            this.updateSliderPosition();
        }

        this.renderEmpires();
    }

    showLoading(show) {
        const el = document.getElementById('mapLoading');
        if (el) el.style.display = show ? 'flex' : 'none';
    }

    async renderEmpires() {
        const year = this.currentYear;

        // Check if we already have this exact snapshot year cached
        if (this.geoJsonCache.has(year)) {
            this.renderGeoJsonData(this.geoJsonCache.get(year), year);
            return;
        }

        // Cancel any in-flight fetch (the user moved the slider again)
        if (this.fetchController) {
            this.fetchController.abort();
        }
        this.fetchController = new AbortController();
        this.showLoading(true);

        try {
            const response = await fetch(`/api/map/${year}`, {
                signal: this.fetchController.signal
            });
            if (!response.ok) {
                this.empireLayerGroup.clearLayers();
                this.updateEmpiresList([]);
                return;
            }

            const snapshotYear = parseInt(response.headers.get('X-Snapshot-Year')) || year;
            const data = await response.json();

            // Cache by snapshot year AND by the requested year (so nearby years hit cache)
            this.geoJsonCache.set(snapshotYear, data);
            if (snapshotYear !== year) {
                this.geoJsonCache.set(year, data);
            }
            this.currentSnapshotYear = snapshotYear;

            // Only render if this is still the year we want (user may have moved slider)
            if (this.currentYear === year) {
                this.renderGeoJsonData(data, year);
            }
        } catch (err) {
            if (err.name === 'AbortError') return; // Fetch was cancelled, ignore
            console.error('Failed to fetch map data:', err);
            this.empireLayerGroup.clearLayers();
            this.updateEmpiresList([]);
        } finally {
            this.showLoading(false);
        }
    }

    // Compute bounding box area (in square degrees) for a GeoJSON geometry
    computeBboxArea(geometry) {
        if (!geometry || !geometry.coordinates) return 0;
        let minLon = Infinity, maxLon = -Infinity;
        let minLat = Infinity, maxLat = -Infinity;
        const walk = (arr) => {
            if (typeof arr[0] === 'number') {
                if (arr[0] < minLon) minLon = arr[0];
                if (arr[0] > maxLon) maxLon = arr[0];
                if (arr[1] < minLat) minLat = arr[1];
                if (arr[1] > maxLat) maxLat = arr[1];
                return;
            }
            for (const child of arr) walk(child);
        };
        walk(geometry.coordinates);
        if (!isFinite(minLon)) return 0;
        return (maxLon - minLon) * (maxLat - minLat);
    }

    renderGeoJsonData(data, year) {
        this.empireLayerGroup.clearLayers();

        // Pre-compute areas and metadata for all named features
        const candidates = [];
        data.features.forEach(feature => {
            const name = feature.properties.NAME;
            if (!name) return;
            const area = this.computeBboxArea(feature.geometry);
            const entityMatch = findEntityForName(name, year);
            const isKnown = NAME_TO_ENTITY.hasOwnProperty(name);
            candidates.push({ feature, name, area, entityMatch, isKnown });
        });

        // Dynamic area threshold: if too many features, keep top N by area
        const MAX_FEATURES = 120;
        let minArea = 0;
        if (candidates.length > MAX_FEATURES) {
            // Sort unknown features by area to find cutoff
            const unknownAreas = candidates
                .filter(c => !c.entityMatch && !c.isKnown)
                .map(c => c.area)
                .sort((a, b) => b - a);
            const knownCount = candidates.filter(c => c.entityMatch || c.isKnown).length;
            const remainingSlots = Math.max(20, MAX_FEATURES - knownCount);
            if (unknownAreas.length > remainingSlots) {
                minArea = unknownAreas[remainingSlots - 1];
            }
        }

        const namedFeatures = [];
        candidates.forEach(({ feature, name, area, entityMatch, isKnown }) => {
            // Filter: keep if known entity, in dictionary, or large enough
            if (!entityMatch && !isKnown && area < minArea) return;

            const subjecto = feature.properties.SUBJECTO;
            const colorKey = subjecto || name;
            const color = nameToColor(colorKey);

            const layer = L.geoJSON(feature, {
                style: {
                    fillColor: color,
                    fillOpacity: 0.5,
                    color: color,
                    weight: 1.5,
                    opacity: 0.8
                },
                onEachFeature: (feat, lyr) => {
                    lyr.bindTooltip(name, {
                        permanent: false,
                        direction: 'center',
                        className: 'empire-tooltip'
                    });

                    lyr.on('click', () => this.showCountryDetail(feat.properties, entityMatch, feat.geometry));

                    lyr.on('mouseover', (e) => {
                        e.target.setStyle({ fillOpacity: 0.7, weight: 2.5 });
                    });
                    lyr.on('mouseout', (e) => {
                        e.target.setStyle({ fillOpacity: 0.5, weight: 1.5 });
                    });
                }
            });

            this.empireLayerGroup.addLayer(layer);
            namedFeatures.push({ name, color, properties: feature.properties, entityMatch, geometry: feature.geometry });
        });

        // Deduplicate for sidebar (group by SUBJECTO or NAME)
        const seen = new Set();
        const uniqueFeatures = namedFeatures.filter(f => {
            const key = f.properties.SUBJECTO || f.name;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });

        this.updateEmpiresList(uniqueFeatures);

        // Also render curated empires if toggled on
        if (this.showCurated) {
            this.renderCuratedEmpires();
        }
    }

    renderCuratedEmpires() {
        this.curatedLayerGroup.clearLayers();
        if (!this.showCurated) return;

        const empiresGeoJSON = getEmpiresGeoJSON(this.currentYear);
        empiresGeoJSON.features.forEach(feature => {
            const layer = L.geoJSON(feature, {
                style: {
                    fillColor: feature.properties.color,
                    fillOpacity: 0.3,
                    color: feature.properties.color,
                    weight: 3,
                    opacity: 0.9,
                    dashArray: '5, 5'
                },
                onEachFeature: (feature, layer) => {
                    layer.bindTooltip(feature.properties.name + ' (curated)', {
                        permanent: false,
                        direction: 'center',
                        className: 'empire-tooltip'
                    });
                    layer.on('click', () => this.showEmpireDetail(feature.properties));
                }
            });
            this.curatedLayerGroup.addLayer(layer);
        });
    }

    updateEmpiresList(features) {
        const listEl = document.getElementById('activeEmpiresList');
        listEl.innerHTML = '';

        if (features.length === 0) {
            listEl.innerHTML = '<div class="no-empires">No named territories in this period</div>';
            return;
        }

        // Sort by name
        features.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        features.forEach(feature => {
            const item = document.createElement('div');
            item.className = 'empire-list-item';
            const linked = feature.entityMatch ? ' linked' : '';
            item.innerHTML = `
                <span class="empire-color" style="background: ${feature.color}"></span>
                <span class="empire-name${linked}">${feature.name}</span>
            `;
            item.addEventListener('click', () => this.showCountryDetail(feature.properties, feature.entityMatch, feature.geometry));
            listEl.appendChild(item);
        });
    }

    // Show detail for a basemap country (new GeoJSON data)
    showCountryDetail(props, entityMatch, geometry) {
        this.selectedEmpire = props;
        this.selectedGeometry = geometry || null;

        const addBtn = document.getElementById('addEmpireToTimeline');
        const saveBtn = document.getElementById('saveEmpireEdits');
        const editSection = document.getElementById('empireEditSection');
        const infoSection = document.getElementById('empireInfoSection');
        const createBtn = document.getElementById('createStateEntity');
        const geoInfoSection = document.getElementById('geoInfoSection');

        // Check if linked to a timeline event
        this.linkedTimelineEvent = null;
        if (entityMatch) {
            this.linkedTimelineEvent = timelineData.events.find(e =>
                e.entityIds && e.entityIds.includes(entityMatch.id)
            ) || null;
        }

        if (!this.linkedTimelineEvent && props.NAME) {
            // Also check by title match
            this.linkedTimelineEvent = timelineData.events.find(e =>
                e.title.toLowerCase() === props.NAME.toLowerCase() ||
                (e.fromMap && e.mapId === props.NAME)
            );
        }

        if (this.linkedTimelineEvent) {
            // LINKED: Show edit form with current timeline data
            addBtn.style.display = 'none';
            saveBtn.style.display = 'block';
            editSection.style.display = 'block';
            infoSection.style.display = 'none';
            if (createBtn) createBtn.style.display = 'none';
            if (geoInfoSection) geoInfoSection.style.display = 'none';

            document.getElementById('editEmpireTitle').value = this.linkedTimelineEvent.title;
            document.getElementById('editEmpireStartYear').value = this.linkedTimelineEvent.year;
            document.getElementById('editEmpireEndYear').value = this.linkedTimelineEvent.endYear || '';
            document.getElementById('editEmpireCategory').value = this.linkedTimelineEvent.category || 'state';
            document.getElementById('editEmpireRegion').value = this.linkedTimelineEvent.region || 'europe-middle-east';
            document.getElementById('editEmpireDescription').value = this.linkedTimelineEvent.description || '';

            document.getElementById('empireTitle').textContent = this.linkedTimelineEvent.title + ' (In Timeline)';
            document.getElementById('empireDates').textContent =
                `${this.formatYear(this.linkedTimelineEvent.year)} - ${this.formatYear(this.linkedTimelineEvent.endYear || this.linkedTimelineEvent.year)}`;

        } else if (entityMatch) {
            // Entity found but not yet in timeline as event
            addBtn.style.display = 'block';
            addBtn.textContent = 'Add to Timeline';
            addBtn.disabled = false;
            saveBtn.style.display = 'none';
            editSection.style.display = 'none';
            infoSection.style.display = 'block';
            if (createBtn) createBtn.style.display = 'none';
            if (geoInfoSection) geoInfoSection.style.display = 'none';

            document.getElementById('empireTitle').textContent = entityMatch.name;
            document.getElementById('empireDates').textContent =
                `${this.formatYear(entityMatch.year)} - ${this.formatYear(entityMatch.endYear)}`;
            document.getElementById('empireDescription').textContent = entityMatch.description;

            // Store entity info for adding
            this.selectedEmpire = {
                ...props,
                id: entityMatch.id,
                name: entityMatch.name,
                startYear: entityMatch.year,
                endYear: entityMatch.endYear,
                description: entityMatch.description,
                region: entityMatch.region,
                category: entityMatch.type === 'state' ? 'civilizations' : entityMatch.type
            };

        } else {
            // UNLINKED: Show GeoJSON info + Create button
            addBtn.style.display = 'none';
            saveBtn.style.display = 'none';
            editSection.style.display = 'none';
            infoSection.style.display = 'block';
            if (createBtn) createBtn.style.display = 'block';

            const name = props.NAME || 'Unknown';
            document.getElementById('empireTitle').textContent = name;
            document.getElementById('empireDates').textContent = `Snapshot: ${this.formatYear(this.currentYear)}`;

            const descParts = [];
            if (props.SUBJECTO && props.SUBJECTO !== name) descParts.push(`Sovereign: ${props.SUBJECTO}`);
            if (props.PARTOF && props.PARTOF !== name) descParts.push(`Part of: ${props.PARTOF}`);
            if (props.BORDERPRECISION) descParts.push(`Border precision: ${props.BORDERPRECISION}`);
            document.getElementById('empireDescription').textContent = descParts.join('\n') || 'No additional information available';

            // Show GeoJSON-specific info
            if (geoInfoSection) {
                geoInfoSection.style.display = 'block';
                geoInfoSection.innerHTML = '';
                if (props.SUBJECTO) geoInfoSection.innerHTML += `<div class="geo-info-item"><span class="geo-label">Sovereign:</span> ${props.SUBJECTO}</div>`;
                if (props.PARTOF && props.PARTOF !== props.SUBJECTO) geoInfoSection.innerHTML += `<div class="geo-info-item"><span class="geo-label">Part of:</span> ${props.PARTOF}</div>`;
            }
        }

        document.getElementById('empireDetailModal').classList.add('open');
    }

    // Legacy: show detail for curated empire data
    showEmpireDetail(props) {
        this.selectedEmpire = props;

        this.linkedTimelineEvent = timelineData.events.find(e =>
            e.title.toLowerCase() === props.name.toLowerCase() ||
            (e.fromMap && e.mapId === props.id)
        );

        const addBtn = document.getElementById('addEmpireToTimeline');
        const saveBtn = document.getElementById('saveEmpireEdits');
        const editSection = document.getElementById('empireEditSection');
        const infoSection = document.getElementById('empireInfoSection');
        const createBtn = document.getElementById('createStateEntity');
        const geoInfoSection = document.getElementById('geoInfoSection');

        if (createBtn) createBtn.style.display = 'none';
        if (geoInfoSection) geoInfoSection.style.display = 'none';

        if (this.linkedTimelineEvent) {
            addBtn.style.display = 'none';
            saveBtn.style.display = 'block';
            editSection.style.display = 'block';
            infoSection.style.display = 'none';

            document.getElementById('editEmpireTitle').value = this.linkedTimelineEvent.title;
            document.getElementById('editEmpireStartYear').value = this.linkedTimelineEvent.year;
            document.getElementById('editEmpireEndYear').value = this.linkedTimelineEvent.endYear || '';
            document.getElementById('editEmpireCategory').value = this.linkedTimelineEvent.category || 'civilizations';
            document.getElementById('editEmpireRegion').value = this.linkedTimelineEvent.region || 'europe-middle-east';
            document.getElementById('editEmpireDescription').value = this.linkedTimelineEvent.description || '';

            document.getElementById('empireTitle').textContent = this.linkedTimelineEvent.title + ' (In Timeline)';
            document.getElementById('empireDates').textContent =
                `${this.formatYear(this.linkedTimelineEvent.year)} - ${this.formatYear(this.linkedTimelineEvent.endYear || this.linkedTimelineEvent.year)}`;
        } else {
            addBtn.style.display = 'block';
            addBtn.textContent = 'Add to Timeline';
            addBtn.disabled = false;
            saveBtn.style.display = 'none';
            editSection.style.display = 'none';
            infoSection.style.display = 'block';

            document.getElementById('empireTitle').textContent = props.name;
            document.getElementById('empireDates').textContent =
                `${this.formatYear(props.startYear)} - ${this.formatYear(props.endYear)}`;
            document.getElementById('empireDescription').textContent = props.description;
        }

        document.getElementById('empireDetailModal').classList.add('open');
    }

    closeEmpirePanel() {
        document.getElementById('empireDetailModal').classList.remove('open');
        this.selectedEmpire = null;
        this.linkedTimelineEvent = null;
    }

    addSelectedToTimeline() {
        if (!this.selectedEmpire) return;

        const props = this.selectedEmpire;

        const newEvent = {
            id: getNextEventId(),
            title: props.name || props.NAME,
            year: props.startYear || this.currentYear,
            endYear: props.endYear || this.currentYear,
            category: props.category || 'state',
            region: props.region || 'europe-middle-east',
            description: props.description || '',
            userAdded: true,
            fromMap: true,
            mapId: props.id || props.NAME
        };

        timelineData.events.push(newEvent);
        saveData();

        this.showToast(`"${newEvent.title}" added to timeline!`);

        const addBtn = document.getElementById('addEmpireToTimeline');
        addBtn.textContent = 'Added to Timeline!';
        addBtn.disabled = true;

        if (window.app) {
            window.app.render();
        }

        setTimeout(() => {
            this.closeEmpirePanel();
        }, 500);
    }

    createStateEntity() {
        if (!this.selectedEmpire) return;

        const props = this.selectedEmpire;
        const name = props.NAME || props.name || 'Unknown';
        const id = slugify(name);

        // Check if entity already exists
        if (getEntityById(id)) {
            this.showToast(`Entity "${name}" already exists`);
            return;
        }

        // Create new entity
        const region = guessRegionFromCoords(this.selectedGeometry?.coordinates);
        const newEntity = {
            id: id,
            name: name,
            type: 'state',
            year: this.currentYear,
            endYear: this.currentYear,
            region: region,
            description: '',
            userAdded: true
        };

        timelineData.entities.push(newEntity);

        // Also create a timeline event for it (use entity-${id} format to match initializeTimelineData)
        const newEvent = {
            id: `entity-${id}`,
            title: name,
            year: this.currentYear,
            endYear: this.currentYear,
            entityIds: [id],
            category: 'state',
            entityType: 'state',
            region: region,
            description: '',
            isEntity: true,
            userAdded: true,
            fromMap: true,
            mapId: name
        };

        timelineData.events.push(newEvent);
        saveData();

        this.showToast(`Created entity "${name}" and added to timeline!`);

        if (window.app) {
            window.app.render();
        }

        setTimeout(() => {
            this.closeEmpirePanel();
        }, 500);
    }

    saveTimelineEdits() {
        if (!this.linkedTimelineEvent) return;

        this.linkedTimelineEvent.title = document.getElementById('editEmpireTitle').value;
        this.linkedTimelineEvent.year = parseInt(document.getElementById('editEmpireStartYear').value);

        const endYear = document.getElementById('editEmpireEndYear').value;
        this.linkedTimelineEvent.endYear = endYear ? parseInt(endYear) : null;

        this.linkedTimelineEvent.category = document.getElementById('editEmpireCategory').value;
        this.linkedTimelineEvent.region = document.getElementById('editEmpireRegion').value;
        this.linkedTimelineEvent.description = document.getElementById('editEmpireDescription').value;
        this.linkedTimelineEvent.userAdded = true;

        saveData();

        this.showToast('Timeline event updated!');

        if (window.app) {
            window.app.render();
        }

        this.closeEmpirePanel();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.stopPlay();
        } else {
            this.startPlay();
        }
    }

    startPlay() {
        this.isPlaying = true;
        document.getElementById('mapPlayBtn').textContent = 'Pause';

        const speed = parseInt(document.getElementById('mapSpeed').value);

        const getYearStep = () => {
            if (this.currentYear < -10000) {
                return speed === 1 ? 5000 : speed === 2 ? 10000 : 20000;
            } else if (this.currentYear < -3000) {
                return speed === 1 ? 500 : speed === 2 ? 1000 : 2000;
            } else {
                return speed === 1 ? 10 : speed === 2 ? 25 : 50;
            }
        };

        const interval = speed === 1 ? 200 : speed === 2 ? 150 : 100;

        this.playInterval = setInterval(() => {
            let newYear = this.currentYear + getYearStep();
            if (newYear > this.maxYear) {
                newYear = this.minYear;
            }
            this.setYear(newYear);
        }, interval);
    }

    stopPlay() {
        this.isPlaying = false;
        document.getElementById('mapPlayBtn').textContent = 'Play';
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
    }

    jumpToEra(direction) {
        const eras = [-300000, -100000, -50000, -10000, -3000, -2000, -1000, -500, 0, 500, 1000, 1500, 1800, 1900, 2000];
        const currentIndex = eras.findIndex(e => e >= this.currentYear);

        let newIndex;
        if (direction > 0) {
            newIndex = currentIndex >= 0 ? Math.min(currentIndex + 1, eras.length - 1) : 0;
        } else {
            newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        }

        this.setYear(eras[newIndex]);
    }

    formatYear(year) {
        if (year < 0) {
            const absYear = Math.abs(year);
            if (absYear >= 1000) {
                return `${(absYear / 1000).toFixed(absYear >= 10000 ? 0 : 1)}k BCE`;
            }
            return `${absYear} BCE`;
        } else if (year === 0) {
            return '1 CE';
        }
        return `${year} CE`;
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'map-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
}

// Initialize when switching to map view
let historyMap = null;

function initMap() {
    if (!historyMap) {
        historyMap = new HistoryMap();
        historyMap.init();
    } else {
        setTimeout(() => historyMap.map.invalidateSize(), 100);
    }
}
