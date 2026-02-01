// World History Map Module
// Interactive map showing empires/civilizations over time

// Experience-based scale markers (matching timeline page)
// Based on cumulative human experience - 1300 CE is the halfway point (50%)
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
    { year: 1300, experience: 0.50 },  // Halfway point
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
        // Linear scale
        return Math.round(minYear + position * (maxYear - minYear));
    }

    // Experience scale: find the year that corresponds to this experience position
    for (let i = 0; i < experienceScaleMarkers.length - 1; i++) {
        const current = experienceScaleMarkers[i];
        const next = experienceScaleMarkers[i + 1];

        if (position >= current.experience && position <= next.experience) {
            // Interpolate year within this segment
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
        // Linear scale
        return (year - minYear) / (maxYear - minYear);
    }

    // Experience scale: find the experience position for this year
    for (let i = 0; i < experienceScaleMarkers.length - 1; i++) {
        const current = experienceScaleMarkers[i];
        const next = experienceScaleMarkers[i + 1];

        if (year >= current.year && year <= next.year) {
            // Interpolate experience within this segment
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
    }

    init() {
        // Initialize Leaflet map
        this.map = L.map('mapContainer', {
            center: [30, 40],
            zoom: 3,
            minZoom: 2,
            maxZoom: 8,
            worldCopyJump: true
        });

        // Add base tile layer (using a neutral historical-style map)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(this.map);

        // Initialize empire layer group
        this.empireLayerGroup = L.layerGroup().addTo(this.map);

        // Bind events
        this.bindEvents();

        // Set initial year based on slider position (500 = middle = year 0 in linear, 1300 in experience)
        const initialPosition = 500 / 1000;
        const initialYear = sliderPositionToYear(initialPosition, this.useExperienceScale);
        this.setYear(initialYear);
    }

    bindEvents() {
        // Year slider - uses 0-1000 range, converted to year based on scale mode
        const yearSlider = document.getElementById('mapYearSlider');
        yearSlider.addEventListener('input', (e) => {
            const position = parseInt(e.target.value) / 1000; // Convert to 0-1
            const year = sliderPositionToYear(position, this.useExperienceScale);
            this.setYear(year, false); // Don't update slider position (we're dragging it)
        });

        // Play/Pause button
        document.getElementById('mapPlayBtn').addEventListener('click', () => this.togglePlay());

        // Speed control
        document.getElementById('mapSpeed').addEventListener('change', (e) => {
            if (this.isPlaying) {
                this.stopPlay();
                this.startPlay();
            }
        });

        // Jump buttons
        document.getElementById('mapPrevEra').addEventListener('click', () => this.jumpToEra(-1));
        document.getElementById('mapNextEra').addEventListener('click', () => this.jumpToEra(1));

        // Experience scale toggle
        const scaleToggle = document.getElementById('mapExperienceScale');
        if (scaleToggle) {
            scaleToggle.addEventListener('change', (e) => {
                this.useExperienceScale = e.target.checked;
                // Update slider position for current year with new scale
                this.updateSliderPosition();
            });
        }

        // Close empire detail panel
        document.getElementById('closeEmpirePanel').addEventListener('click', () => this.closeEmpirePanel());

        // Add to timeline button
        document.getElementById('addEmpireToTimeline').addEventListener('click', () => this.addSelectedToTimeline());

        // Save edits button
        document.getElementById('saveEmpireEdits').addEventListener('click', () => this.saveTimelineEdits());

        // Close modal on background click
        document.getElementById('empireDetailModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeEmpirePanel();
        });
    }

    updateSliderPosition() {
        // Update slider position based on current year and scale mode
        const position = yearToSliderPosition(this.currentYear, this.useExperienceScale);
        document.getElementById('mapYearSlider').value = Math.round(position * 1000);
    }

    setYear(year, updateSlider = true) {
        this.currentYear = year;

        // Update display
        document.getElementById('mapYearDisplay').textContent = this.formatYear(year);

        // Update slider position if requested
        if (updateSlider) {
            this.updateSliderPosition();
        }

        // Update map layers
        this.renderEmpires();
    }

    renderEmpires() {
        // Clear existing layers
        this.empireLayerGroup.clearLayers();

        // Get empires for current year
        const empiresGeoJSON = getEmpiresGeoJSON(this.currentYear);

        // Add each empire as a polygon layer
        empiresGeoJSON.features.forEach(feature => {
            const layer = L.geoJSON(feature, {
                style: {
                    fillColor: feature.properties.color,
                    fillOpacity: 0.5,
                    color: feature.properties.color,
                    weight: 2,
                    opacity: 0.8
                },
                onEachFeature: (feature, layer) => {
                    // Tooltip on hover
                    layer.bindTooltip(feature.properties.name, {
                        permanent: false,
                        direction: 'center',
                        className: 'empire-tooltip'
                    });

                    // Click to show details
                    layer.on('click', () => this.showEmpireDetail(feature.properties));

                    // Hover effects
                    layer.on('mouseover', (e) => {
                        e.target.setStyle({
                            fillOpacity: 0.7,
                            weight: 3
                        });
                    });

                    layer.on('mouseout', (e) => {
                        e.target.setStyle({
                            fillOpacity: 0.5,
                            weight: 2
                        });
                    });
                }
            });

            this.empireLayerGroup.addLayer(layer);
        });

        // Update active empires list
        this.updateEmpiresList(empiresGeoJSON.features);
    }

    updateEmpiresList(features) {
        const listEl = document.getElementById('activeEmpiresList');
        listEl.innerHTML = '';

        if (features.length === 0) {
            listEl.innerHTML = '<div class="no-empires">No empires in this period</div>';
            return;
        }

        features.forEach(feature => {
            const props = feature.properties;
            const item = document.createElement('div');
            item.className = 'empire-list-item';
            item.innerHTML = `
                <span class="empire-color" style="background: ${props.color}"></span>
                <span class="empire-name">${props.name}</span>
            `;
            item.addEventListener('click', () => this.showEmpireDetail(props));
            listEl.appendChild(item);
        });
    }

    showEmpireDetail(props) {
        this.selectedEmpire = props;

        // Check if this empire is already in the timeline
        this.linkedTimelineEvent = timelineData.events.find(e =>
            e.title.toLowerCase() === props.name.toLowerCase() ||
            (e.fromMap && e.mapId === props.id)
        );

        const addBtn = document.getElementById('addEmpireToTimeline');
        const saveBtn = document.getElementById('saveEmpireEdits');
        const editSection = document.getElementById('empireEditSection');
        const infoSection = document.getElementById('empireInfoSection');

        if (this.linkedTimelineEvent) {
            // Show edit form with current timeline data
            addBtn.style.display = 'none';
            saveBtn.style.display = 'block';
            editSection.style.display = 'block';
            infoSection.style.display = 'none';

            // Populate edit fields with timeline event data
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
            // Show add button and info
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

        // Create new timeline event
        const newEvent = {
            id: getNextEventId(),
            title: props.name,
            year: props.startYear,
            endYear: props.endYear,
            category: props.category || 'civilizations',
            region: props.region || 'europe-middle-east',
            description: props.description,
            userAdded: true,
            fromMap: true,
            mapId: props.id
        };

        timelineData.events.push(newEvent);
        saveData();

        // Show confirmation
        this.showToast(`"${props.name}" added to timeline!`);

        // Update button state
        const addBtn = document.getElementById('addEmpireToTimeline');
        addBtn.textContent = 'Added to Timeline!';
        addBtn.disabled = true;

        // Refresh timeline if visible
        if (window.app) {
            window.app.render();
        }

        // Close and reopen to show edit form
        setTimeout(() => {
            this.closeEmpirePanel();
            this.showEmpireDetail(props);
        }, 500);
    }

    saveTimelineEdits() {
        if (!this.linkedTimelineEvent) return;

        // Update the timeline event with form values
        this.linkedTimelineEvent.title = document.getElementById('editEmpireTitle').value;
        this.linkedTimelineEvent.year = parseInt(document.getElementById('editEmpireStartYear').value);

        const endYear = document.getElementById('editEmpireEndYear').value;
        this.linkedTimelineEvent.endYear = endYear ? parseInt(endYear) : null;

        this.linkedTimelineEvent.category = document.getElementById('editEmpireCategory').value;
        this.linkedTimelineEvent.region = document.getElementById('editEmpireRegion').value;
        this.linkedTimelineEvent.description = document.getElementById('editEmpireDescription').value;

        // Mark as user-modified if it wasn't already
        this.linkedTimelineEvent.userAdded = true;

        saveData();

        // Show confirmation
        this.showToast('Timeline event updated!');

        // Refresh timeline if visible
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

        // Adjust step size based on current era (bigger steps for prehistoric times)
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
        // Key historical eras to jump to (extended for full human history)
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
        // Refresh map size if already initialized (needed after tab switch)
        setTimeout(() => historyMap.map.invalidateSize(), 100);
    }
}
