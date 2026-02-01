// World History Timeline Data
// Prepopulated from Excel file and expandable by user

// Geographic regions for vertical layout
const REGIONS = [
    { id: 'subsaharan-africa', name: 'Subsaharan Africa' },
    { id: 'europe-middle-east', name: 'Europe & Middle East' },
    { id: 'asia', name: 'Asia' },
    { id: 'americas', name: 'The Americas' },
    { id: 'pacific', name: 'Pacific' }
];

const timelineData = {
    // Experience-based scaling: proportion of all human experience by year
    // Based on "people-years" concept - 1300 CE is the halfway point
    // Experience-based scaling from blog post:
    // - Prehistory to ~6000 BCE: ~10% of human experience
    // - Christian Era (from year 1): ~75% of cumulative experience
    // - 1300 CE: halfway point (50%)
    // - Post-Industrial (from 1760): ~1/3 of experience
    // - Recent 25 years: ~10% of experience
    experienceScale: {
        markers: [
            { year: -300000, experience: 0.00 },
            { year: -100000, experience: 0.03 },
            { year: -50000, experience: 0.05 },
            { year: -10000, experience: 0.08 },
            { year: -6000, experience: 0.10 },   // End of prehistory ~10%
            { year: -3000, experience: 0.15 },
            { year: -1000, experience: 0.20 },
            { year: 0, experience: 0.25 },       // Start of Christian era ~25%
            { year: 500, experience: 0.35 },
            { year: 1000, experience: 0.45 },
            { year: 1300, experience: 0.50 },    // Halfway point
            { year: 1500, experience: 0.55 },
            { year: 1700, experience: 0.62 },
            { year: 1760, experience: 0.67 },    // Industrial Revolution, post-industrial = ~1/3
            { year: 1850, experience: 0.75 },
            { year: 1900, experience: 0.80 },
            { year: 1950, experience: 0.85 },
            { year: 2000, experience: 0.90 },    // Recent 25 years = 10%
            { year: 2026, experience: 1.00 }
        ]
    },

    // Timeline events - organized by category with regions
    events: [
        // === PREHISTORIC ERAS ===
        { id: 200, title: "Homo sapiens emerge", year: -300000, endYear: -200000, category: "civilizations", region: "subsaharan-africa", description: "Anatomically modern humans first appear in Africa" },
        { id: 201, title: "Out of Africa migration", year: -70000, endYear: -50000, category: "civilizations", region: "subsaharan-africa", description: "Humans migrate out of Africa to populate the world" },
        { id: 202, title: "Upper Paleolithic", year: -50000, endYear: -10000, category: "civilizations", region: "europe-middle-east", description: "Development of art, more sophisticated tools, and cultural complexity" },
        { id: 203, title: "Last Ice Age peak", year: -26000, endYear: -19000, category: "civilizations", region: "europe-middle-east", description: "Last Glacial Maximum - ice sheets at their greatest extent" },
        { id: 204, title: "Agriculture begins", year: -10000, endYear: -8000, category: "technology", region: "europe-middle-east", description: "Neolithic Revolution - transition from hunting/gathering to farming" },
        { id: 205, title: "Domestication of animals", year: -10000, endYear: -7000, category: "technology", region: "asia", description: "Dogs, sheep, goats, and cattle domesticated" },
        { id: 206, title: "First cities emerge", year: -6000, endYear: -4000, category: "civilizations", region: "europe-middle-east", description: "Çatalhöyük, Jericho, and other early urban settlements" },
        { id: 207, title: "Writing invented", year: -3400, endYear: -3200, category: "technology", region: "asia", description: "Cuneiform in Mesopotamia and hieroglyphics in Egypt" },
        { id: 208, title: "Bronze Age begins", year: -3300, category: "technology", region: "europe-middle-east", description: "Widespread use of bronze for tools and weapons" },

        // === EUROPEAN ERAS (all grouped together) ===
        { id: 209, title: "Mesolithic", year: -10000, endYear: -5000, category: "era-european", region: "europe-middle-east", description: "Middle Stone Age - transition from hunting to early farming, microlithic tools" },
        { id: 210, title: "Neolithic", year: -5000, endYear: -3000, category: "era-european", region: "europe-middle-east", description: "New Stone Age - agricultural revolution, permanent settlements, pottery" },
        { id: 211, title: "Chalcolithic", year: -3500, endYear: -2300, category: "era-european", region: "europe-middle-east", description: "Copper Age - first metal tools alongside stone, early metallurgy" },
        { id: 212, title: "Bronze Age", year: -2300, endYear: -1200, category: "era-european", region: "europe-middle-east", description: "Widespread bronze tools and weapons, rise of complex societies and trade networks" },
        { id: 213, title: "Iron Age", year: -1200, endYear: -800, category: "era-european", region: "europe-middle-east", description: "Iron replaces bronze, spread of ironworking technology across Europe" },
        { id: 50, title: "Classical Antiquity", year: -800, endYear: 500, category: "era-european", region: "europe-middle-east", description: "Rise of ancient Greece and Rome, foundations of Western civilization" },
        { id: 95, title: "Early Middle Ages", year: 500, endYear: 1000, category: "era-european", region: "europe-middle-east", description: "Also known as the Dark Ages, period following the fall of Rome" },
        { id: 96, title: "High Middle Ages", year: 1000, endYear: 1300, category: "era-european", region: "europe-middle-east", description: "Period of population growth, urbanization, and cultural achievements" },
        { id: 61, title: "Renaissance", year: 1300, endYear: 1600, category: "era-european", region: "europe-middle-east", description: "Cultural rebirth in Europe, bridging Middle Ages and Modern era" },
        { id: 62, title: "Enlightenment", year: 1650, endYear: 1800, category: "era-european", region: "europe-middle-east", description: "Age of Reason emphasizing science and rational thought" },

        // === CHINESE ERAS (all grouped together) ===
        { id: 56, title: "Tang Dynasty", year: 618, endYear: 907, category: "era-chinese", region: "asia", description: "Golden age of Chinese civilization" },
        { id: 57, title: "Song Dynasty", year: 960, endYear: 1279, category: "era-chinese", region: "asia", description: "Era of significant economic and cultural development" },
        { id: 58, title: "Yuan Dynasty", year: 1271, endYear: 1368, category: "era-chinese", region: "asia", description: "Mongol-led dynasty founded by Kublai Khan" },
        { id: 59, title: "Ming Dynasty", year: 1368, endYear: 1644, category: "era-chinese", region: "asia", description: "Era known for trade expansion and iconic architecture" },
        { id: 60, title: "Qing Dynasty", year: 1644, endYear: 1912, category: "era-chinese", region: "asia", description: "Last imperial dynasty of China" },
        { id: 97, title: "Republic of China", year: 1912, endYear: 1949, category: "era-chinese", region: "asia", description: "Period of republican government in mainland China" },
        { id: 99, title: "People's Republic", year: 1949, endYear: 2026, category: "era-chinese", region: "asia", description: "Communist government established by Mao Zedong" },

        // === PEOPLE - Religious (all in people category now) ===
        { id: 2, title: "Jesus Christ", year: -4, endYear: 33, category: "people", subcategory: "religious", region: "europe-middle-east", description: "Central figure of Christianity" },
        { id: 3, title: "Mani", year: 216, endYear: 274, category: "people", subcategory: "religious", region: "europe-middle-east", description: "Founder of Manichaeism" },
        { id: 4, title: "St. Augustine", year: 354, endYear: 430, category: "people", subcategory: "religious", region: "europe-middle-east", description: "Early Christian theologian and philosopher" },
        { id: 5, title: "Mohammed", year: 570, endYear: 632, category: "people", subcategory: "religious", region: "europe-middle-east", description: "Founder of Islam" },
        { id: 6, title: "Thomas Aquinas", year: 1225, endYear: 1274, category: "people", subcategory: "religious", region: "europe-middle-east", description: "Catholic philosopher and theologian" },
        { id: 7, title: "Bahá'u'lláh", year: 1817, endYear: 1892, category: "people", subcategory: "religious", region: "europe-middle-east", description: "Founder of the Bahá'í Faith" },

        // === PEOPLE - Political leaders (moved to people category) ===
        { id: 8, title: "Genghis Khan", year: 1162, endYear: 1227, category: "people", subcategory: "political", region: "asia", description: "Founder of the Mongol Empire, the largest contiguous land empire in history" },
        { id: 17, title: "Alexander the Great", year: -356, endYear: -323, category: "people", subcategory: "political", region: "europe-middle-east", description: "King of Macedon who created one of the largest empires in ancient history" },

        // === PEOPLE - Philosophers and Scientists ===
        { id: 12, title: "Pythagoras", year: -570, endYear: -495, category: "people", subcategory: "science", region: "europe-middle-east", description: "Greek philosopher and mathematician known for the Pythagorean theorem" },
        { id: 13, title: "Confucius", year: -551, endYear: -479, category: "people", subcategory: "science", region: "asia", description: "Chinese philosopher whose teachings shaped East Asian culture" },
        { id: 15, title: "Plato", year: -428, endYear: -348, category: "people", subcategory: "science", region: "europe-middle-east", description: "Greek philosopher, student of Socrates, founder of the Academy" },
        { id: 16, title: "Buddha", year: -563, endYear: -483, category: "people", subcategory: "religious", region: "asia", description: "Siddhartha Gautama, founder of Buddhism" },
        { id: 18, title: "Marcus Aurelius", year: 121, endYear: 180, category: "people", subcategory: "science", region: "europe-middle-east", description: "Roman Emperor and Stoic philosopher, author of Meditations" },
        { id: 11, title: "Thales of Miletus", year: -624, endYear: -546, category: "people", subcategory: "science", region: "europe-middle-east", description: "Pre-Socratic philosopher, predicted a solar eclipse in 585 BCE" },
        { id: 14, title: "Herodotus", year: -484, endYear: -425, category: "people", subcategory: "science", region: "europe-middle-east", description: "Father of History, wrote the first great narrative history" },

        // === SCIENCE & PHILOSOPHY EVENTS ===
        { id: 10, title: "Iliad & Odyssey written", year: -750, category: "science", region: "europe-middle-east", description: "Homer's epic poems first recorded in writing" },
        { id: 19, title: "Copernicus: heliocentric model", year: 1543, category: "science", region: "europe-middle-east", description: "Published theory that Earth revolves around the Sun" },
        { id: 20, title: "Kepler: elliptical orbits", year: 1609, category: "science", region: "europe-middle-east", description: "Discovered that planets move in ellipses, not perfect circles" },
        { id: 21, title: "Galileo condemned", year: 1633, category: "science", region: "europe-middle-east", description: "Forced to recant support for heliocentrism by Inquisition" },
        { id: 22, title: "Royal Society founded", year: 1660, category: "science", region: "europe-middle-east", description: "World's oldest national scientific institution" },
        { id: 23, title: "Newton's Principia", year: 1687, category: "science", region: "europe-middle-east", description: "Isaac Newton publishes laws of motion and universal gravitation" },
        { id: 90, title: "Darwin's Origin of Species", year: 1859, category: "science", region: "europe-middle-east", description: "Charles Darwin publishes theory of evolution by natural selection" },

        // === TECHNOLOGY ===
        { id: 31, title: "Rice paddies & canals", year: -1000, category: "technology", region: "asia", description: "Development of sophisticated irrigation for rice farming" },
        { id: 32, title: "Rice mechanization", year: 1850, category: "technology", region: "asia", description: "Industrial mechanization of rice farming" },
        { id: 33, title: "Rice Green Revolution", year: 1960, category: "technology", region: "asia", description: "High-yield rice varieties dramatically increase production" },

        // === CIVILIZATIONS / EMPIRES ===
        // Ancient Mesopotamia
        { id: 40, title: "Sumerian City-States", year: -3500, endYear: -2300, category: "civilizations", region: "asia", description: "First known civilization, developed writing (cuneiform), cities, and complex society" },
        { id: 41, title: "Akkadian Empire", year: -2334, endYear: -2154, category: "civilizations", region: "asia", description: "First ancient empire of Mesopotamia, founded by Sargon of Akkad" },
        { id: 42, title: "Old Babylonian Empire", year: -1900, endYear: -1600, category: "civilizations", region: "asia", description: "Mesopotamian empire known for Hammurabi's Code" },
        { id: 43, title: "Neo-Assyrian Empire", year: -911, endYear: -609, category: "civilizations", region: "asia", description: "Powerful Mesopotamian empire known for military prowess" },

        // Persian Empires
        { id: 44, title: "Achaemenid Empire", year: -550, endYear: -330, category: "civilizations", region: "europe-middle-east", description: "First Persian Empire, founded by Cyrus the Great" },
        { id: 45, title: "Seleucid Empire", year: -312, endYear: -63, category: "civilizations", region: "europe-middle-east", description: "Hellenistic empire founded after Alexander's death" },
        { id: 46, title: "Parthian Empire", year: -247, endYear: 224, category: "civilizations", region: "europe-middle-east", description: "Iranian empire and rival of Rome" },
        { id: 47, title: "Sasanian Empire", year: 224, endYear: 651, category: "civilizations", region: "europe-middle-east", description: "Last pre-Islamic Persian Empire" },

        // Roman
        { id: 48, title: "Roman Republic", year: -509, endYear: -27, category: "civilizations", region: "europe-middle-east", description: "Roman state before the emperors" },
        { id: 49, title: "Roman Empire", year: -27, endYear: 476, category: "civilizations", region: "europe-middle-east", description: "One of the largest empires in ancient history" },
        { id: 120, title: "Byzantine Empire", year: 330, endYear: 1453, category: "civilizations", region: "europe-middle-east", description: "Eastern Roman Empire, preserved Roman and Greek culture" },

        // Islamic Caliphates
        { id: 121, title: "Rashidun Caliphate", year: 632, endYear: 661, category: "civilizations", region: "europe-middle-east", description: "First caliphate after Muhammad, led by the 'Rightly Guided' caliphs" },
        { id: 122, title: "Umayyad Caliphate", year: 661, endYear: 750, category: "civilizations", region: "europe-middle-east", description: "Second caliphate, expanded Islam from Spain to India" },
        { id: 123, title: "Abbasid Caliphate", year: 750, endYear: 1258, category: "civilizations", region: "europe-middle-east", description: "Islamic Golden Age, center of learning in Baghdad" },
        { id: 124, title: "Fatimid Caliphate", year: 909, endYear: 1171, category: "civilizations", region: "europe-middle-east", description: "Shia caliphate based in Egypt, founded Cairo" },
        { id: 125, title: "Mamluk Sultanate", year: 1250, endYear: 1517, category: "civilizations", region: "europe-middle-east", description: "Slave-soldier dynasty that ruled Egypt and Syria" },
        { id: 126, title: "Ottoman Empire", year: 1299, endYear: 1922, category: "civilizations", region: "europe-middle-east", description: "Major empire spanning Southeast Europe, Western Asia, and North Africa" },

        // === POLITICAL EVENTS ===
        { id: 70, title: "English Civil War", year: 1642, endYear: 1651, category: "political", region: "europe-middle-east", description: "Series of civil wars between Parliamentarians and Royalists" },
        { id: 72, title: "Great Plague of London", year: 1665, category: "political", region: "europe-middle-east", description: "Major bubonic plague epidemic killing approximately 100,000 people" },
        { id: 73, title: "Great Fire of London", year: 1666, category: "political", region: "europe-middle-east", description: "Devastating fire that destroyed much of central London" },
        { id: 82, title: "Glorious Revolution", year: 1688, category: "political", region: "europe-middle-east", description: "Overthrow of James II and establishment of constitutional monarchy" },
        { id: 83, title: "French Revolution", year: 1789, category: "political", region: "europe-middle-east", description: "Beginning of revolutionary period that transformed France and Europe" },
        { id: 84, title: "Napoleonic Wars", year: 1803, endYear: 1815, category: "political", region: "europe-middle-east", description: "Series of major conflicts involving Napoleon's French Empire" },
        { id: 91, title: "Seven Years' War", year: 1756, endYear: 1763, category: "political", region: "europe-middle-east", description: "Global conflict involving most European powers" },

        // === BOOKS I'VE READ ===
        { id: 100, title: "A History of Western Philosophy", year: -300, category: "books", region: "europe-middle-east", description: "Bertrand Russell's comprehensive survey of Western philosophy" },
        { id: 101, title: "Meditations", year: 170, category: "books", region: "europe-middle-east", description: "Personal writings of Marcus Aurelius on Stoic philosophy" },
        { id: 102, title: "Confessions", year: 400, category: "books", region: "europe-middle-east", description: "St. Augustine's autobiographical work" },
        { id: 103, title: "The Royal Society", year: 1660, category: "books", region: "europe-middle-east", description: "Book about the founding and history of the Royal Society of London" },

        // === RELIGION EVENTS ===
        { id: 110, title: "Buddhism spreads to China", year: 100, category: "religion", region: "asia", description: "Buddhism begins to spread along the Silk Road into China" },
        { id: 111, title: "Council of Nicaea", year: 325, category: "religion", region: "europe-middle-east", description: "First ecumenical council of the Christian Church" },
        { id: 112, title: "Islam spreads to Asia", year: 700, category: "religion", region: "asia", description: "Islamic traders and missionaries spread religion across Asia" }
    ],

    // User's personal references
    references: [
        { id: 1, eventId: null, globalRef: true, title: "A History of Western Philosophy", type: "book", url: "", status: "completed", year: -300 },
        { id: 2, eventId: 18, title: "Meditations", type: "book", author: "Marcus Aurelius", url: "", status: "completed" },
        { id: 3, eventId: 4, title: "Confessions", type: "book", author: "St. Augustine", url: "", status: "completed" },
        { id: 4, eventId: 22, title: "The Royal Society", type: "book", url: "", status: "completed" }
    ],

    // User notes storage (eventId -> notes)
    notes: {}
};

// Get next available ID for events
function getNextEventId() {
    return Math.max(...timelineData.events.map(e => e.id)) + 1;
}

// Get next available ID for references
function getNextReferenceId() {
    return Math.max(...timelineData.references.map(r => r.id)) + 1;
}

// Check if running on server (vs file://)
const isServerMode = window.location.protocol !== 'file:';

// Debounce helper for auto-save
let saveTimeout = null;
function debouncedSave() {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => saveData(), 500);
}

// Save data - to server if available, otherwise localStorage
async function saveData() {
    const userData = {
        events: timelineData.events.filter(e => e.userAdded),
        references: timelineData.references.filter(r => r.userAdded),
        notes: timelineData.notes,
        rowAssignments: timelineData.rowAssignments || {}
    };

    if (isServerMode) {
        try {
            const response = await fetch('/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                console.log('Data saved to server');
            }
        } catch (err) {
            console.error('Failed to save to server, falling back to localStorage:', err);
            localStorage.setItem('worldHistoryTimeline', JSON.stringify(userData));
        }
    } else {
        localStorage.setItem('worldHistoryTimeline', JSON.stringify(userData));
    }
}

// Load data from server or localStorage
async function loadData() {
    let userData = null;

    if (isServerMode) {
        try {
            const response = await fetch('/api/data');
            if (response.ok) {
                userData = await response.json();
                console.log('Data loaded from server');
            }
        } catch (err) {
            console.error('Failed to load from server, trying localStorage:', err);
        }
    }

    // Fallback to localStorage
    if (!userData) {
        const saved = localStorage.getItem('worldHistoryTimeline');
        if (saved) {
            try {
                userData = JSON.parse(saved);
            } catch (e) {
                console.error('Error parsing localStorage data:', e);
            }
        }
    }

    // Merge user data with defaults
    if (userData) {
        if (userData.notes) timelineData.notes = userData.notes;
        if (userData.rowAssignments) timelineData.rowAssignments = userData.rowAssignments;

        // Add user events
        if (userData.events) {
            userData.events.forEach(e => {
                e.userAdded = true;
                if (!timelineData.events.find(existing => existing.id === e.id)) {
                    timelineData.events.push(e);
                }
            });
        }

        // Add user references
        if (userData.references) {
            userData.references.forEach(r => {
                r.userAdded = true;
                if (!timelineData.references.find(existing => existing.id === r.id)) {
                    timelineData.references.push(r);
                }
            });
        }
    }
}

// Clear saved data (for debugging)
function clearSavedData() {
    if (isServerMode) {
        fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ events: [], references: [], notes: {}, rowAssignments: {} })
        }).then(() => location.reload());
    } else {
        localStorage.removeItem('worldHistoryTimeline');
        location.reload();
    }
}
