// Historical Empire/Civilization Data with simplified GeoJSON boundaries
// Each empire links to a societal entity via entityId

// ===========================================
// NAME_TO_ENTITY: Maps GeoJSON NAME values to data.js entity IDs
// Used to link basemap countries to timeline entities
// ===========================================
const NAME_TO_ENTITY = {
    // Roman / Byzantine
    'Roman Empire': 'roman-empire',
    'Rome': 'roman-republic',
    'Roman Republic': 'roman-republic',
    'Byzantine Empire': 'byzantine',
    'Byzantium': 'byzantine',

    // Persian Empires
    'Achaemenid Empire': 'achaemenid',
    'Parthian Empire': 'parthia',
    'Sasanian Empire': 'sasanian',
    'Sassanid Empire': 'sasanian',

    // Greek / Macedonian
    'Greek city-states': 'ancient-greece',
    'Macedon': 'macedon',
    'Macedonian Empire': 'macedon',
    'Seleucid Empire': 'seleucid',

    // Islamic Caliphates
    'Rashidun Caliphate': 'rashidun',
    'Umayyad Caliphate': 'umayyad',
    'Emirate of Córdoba': 'umayyad',
    'Abbasid Caliphate': 'abbasid',
    'Ottoman Empire': 'ottoman',
    'Fatimid Caliphate': 'fatimid',
    'Mamluke Sultanate': 'mamluk',
    'Mamluk Sultanate': 'mamluk',

    // Mongol
    'Mongol Empire': 'mongol',
    'Golden Horde': 'mongol',
    'Chagatai Khanate': 'mongol',

    // Chinese Dynasties
    'Han': 'prc',
    'Tang': 'tang',
    'Tang Empire': 'tang',
    'Song': 'song',
    'Song Empire': 'song',
    'Yuan': 'yuan',
    'Yuan Empire': 'yuan',
    'Ming Empire': 'ming',
    'Ming': 'ming',
    'Qing Empire': 'qing',
    'Qing': 'qing',
    'China': 'prc',

    // European Nations
    'France': 'france',
    'England': 'england',
    'Britain': 'england',
    'United Kingdom': 'england',
    'Scottland': 'england',
    'Scottalnd': 'england',

    // African
    'Egypt': 'egypt-old',
    'Axum': 'aksum',
    'Aksum': 'aksum',
    'Ethiopia': 'aksum',
    'Mwenemutapa': 'zimbabwe',
    'Congo': 'kongo',

    // Mesopotamian
    'Assyria': 'assyria',
    'Babylonia': 'babylon',

    // Indian
    'Sultanate of Delhi': 'mongol',
    'British Raj': 'england',
    'Vijayanagara': null,

    // Others
    'Carolingian Empire': 'france',
    'Holy Roman Empire': null,
    'Portugal': null,
    'Castille': null,
    'Aragón': null,
    'Denmark': null,
    'Denmark-Norway': null,
    'Sweden': null,
    'Poland-Lithuania': null,
    'Korea': null,
    'Japan': null,
    'Tibet': null,
    'Nepal': null,
    'Cambodia': null,
    'Đại Việt': null,

    // Additional important states (small in area but historically significant)
    'Netherlands': null,
    'Venice': null,
    'Genoa': null,
    'Naples': null,
    'Sicily': null,
    'Papal States': null,
    'Swiss Confederation': null,
    'Scotland': null,
    'Ireland': null,
    'Norway': null,
    'Muscovy': null,
    'Russia': null,
    'Russian Empire': null,
    'Prussia': null,
    'Austria': null,
    'Austria-Hungary': null,
    'Hungary': null,
    'Bohemia': null,
    'Serbia': null,
    'Poland': null,
    'Lithuania': null,
    'Teutonic Order': null,
    'Safavid Empire': null,
    'Mughal Empire': null,
    'Maratha Empire': null,
    'Siam': null,
    'Burma': null,
    'Khmer Empire': null,
    'Majapahit': null,
    'Srivijaya': null,
    'Songhai': null,
    'Mali': null,
    'Ghana': null,
    'Benin': null,
    'Aztec Empire': null,
    'Inca Empire': null,
    'Maya': null,
    'United States': null,
    'Brazil': null,
    'Mexico': null,
    'Spain': null,
    'Italy': null,
    'Germany': null,
    'Belgium': null,
    'Greece': null,
    'Romania': null,
    'Bulgaria': null,
    'Persia': null,
    'Iran': null,
    'Iraq': null,
    'Saudi Arabia': null,
    'Israel': null,
    'India': null,
    'Pakistan': null,
    'Indonesia': null,
    'Philippines': null,
    'Australia': null,
    'New Zealand': null,
    'Canada': null,
    'Argentina': null,
    'Colombia': null,
    'Peru': null,
    'Chile': null,
    'South Africa': null,
    'Nigeria': null,
    'Kenya': null,
    'Tanzania': null,
    'Soviet Union': null,
    'USSR': null,
};

// Find the matching entity for a GeoJSON NAME, validating year range
function findEntityForName(name, year) {
    if (!name) return null;

    const entityId = NAME_TO_ENTITY[name];
    if (!entityId) return null;

    const entity = getEntityById(entityId);
    if (!entity) return null;

    // Validate year range — allow some slack (50 years) for border imprecision
    const slack = 50;
    if (year < entity.year - slack || year > entity.endYear + slack) {
        return null;
    }

    return entity;
}

// Guess region from centroid coordinates
function guessRegionFromCoords(coords) {
    if (!coords || !coords[0]) return 'europe-middle-east';
    // Get centroid of first polygon ring
    const ring = Array.isArray(coords[0][0]) ? coords[0] : coords;
    let lon = 0, lat = 0, count = 0;
    for (const pt of ring) {
        if (Array.isArray(pt) && pt.length >= 2) {
            lon += pt[0]; lat += pt[1]; count++;
        }
    }
    if (count === 0) return 'europe-middle-east';
    lon /= count; lat /= count;

    // Simple region heuristic based on centroid
    if (lon < -30) return 'americas';
    if (lat < 0 && lon > 90) return 'pacific';
    if (lat < 0 && lon < 90 && lon > 20) return 'subsaharan-africa';
    if (lon > 60) return 'asia';
    if (lat < 15 && lon > 0 && lon < 55) return 'subsaharan-africa';
    return 'europe-middle-east';
}

// Slugify a name for use as entity ID
function slugify(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 60);
}

// Deterministic color from name string
function nameToColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 55%, 50%)`;
}

// ===========================================
// CURATED EMPIRES - Original rectangle data
// Kept for "Show curated empires" overlay
// ===========================================
const historicalEmpires = [
    // Ancient Near East
    {
        id: 'akkadian',
        name: 'Akkadian Empire',
        startYear: -2334,
        endYear: -2154,
        color: '#8B4513',
        entityId: 'akkad',
        region: 'europe-middle-east',
        description: 'First ancient empire of Mesopotamia, founded by Sargon of Akkad',
        coordinates: [
            [[44, 30], [48, 30], [48, 37], [44, 37], [44, 30]]
        ]
    },
    {
        id: 'babylon',
        name: 'Babylonian Empire',
        startYear: -1894,
        endYear: -1595,
        color: '#DAA520',
        entityId: 'babylon',
        region: 'europe-middle-east',
        description: 'Ancient Mesopotamian empire, known for Hammurabi\'s Code',
        coordinates: [
            [[43, 29], [49, 29], [49, 36], [43, 36], [43, 29]]
        ]
    },
    {
        id: 'neo-babylonian',
        name: 'Neo-Babylonian Empire',
        startYear: -626,
        endYear: -539,
        color: '#B8860B',
        entityId: 'babylon',
        region: 'europe-middle-east',
        description: 'Chaldean dynasty, built the Hanging Gardens',
        coordinates: [
            [[34, 29], [50, 29], [50, 38], [34, 38], [34, 29]]
        ]
    },
    {
        id: 'assyria',
        name: 'Neo-Assyrian Empire',
        startYear: -911,
        endYear: -609,
        color: '#800000',
        entityId: 'assyria',
        region: 'europe-middle-east',
        description: 'Powerful Mesopotamian empire known for military prowess',
        coordinates: [
            [[34, 30], [50, 30], [50, 42], [34, 42], [34, 30]]
        ]
    },

    // Egyptian
    {
        id: 'egypt-old',
        name: 'Ancient Egypt (Old Kingdom)',
        startYear: -2686,
        endYear: -2181,
        color: '#FFD700',
        entityId: null,
        region: 'subsaharan-africa',
        description: 'Age of the pyramids, powerful pharaonic rule',
        coordinates: [
            [[29, 22], [35, 22], [35, 31], [29, 31], [29, 22]]
        ]
    },
    {
        id: 'egypt-new',
        name: 'Ancient Egypt (New Kingdom)',
        startYear: -1550,
        endYear: -1077,
        color: '#FFA500',
        entityId: null,
        region: 'subsaharan-africa',
        description: 'Height of Egyptian power, Tutankhamun and Ramesses II',
        coordinates: [
            [[29, 20], [40, 20], [40, 32], [29, 32], [29, 20]]
        ]
    },

    // Persian Empires
    {
        id: 'achaemenid',
        name: 'Achaemenid Persian Empire',
        startYear: -550,
        endYear: -330,
        color: '#4169E1',
        entityId: 'achaemenid',
        region: 'europe-middle-east',
        description: 'First Persian Empire, founded by Cyrus the Great. Largest empire of ancient history.',
        coordinates: [
            [[26, 23], [75, 23], [75, 42], [26, 42], [26, 23]]
        ]
    },
    {
        id: 'parthian',
        name: 'Parthian Empire',
        startYear: -247,
        endYear: 224,
        color: '#6A5ACD',
        entityId: 'parthia',
        region: 'europe-middle-east',
        description: 'Iranian empire and major rival of Rome',
        coordinates: [
            [[44, 25], [70, 25], [70, 40], [44, 40], [44, 25]]
        ]
    },
    {
        id: 'sasanian',
        name: 'Sasanian Empire',
        startYear: 224,
        endYear: 651,
        color: '#483D8B',
        entityId: 'sasanian',
        region: 'europe-middle-east',
        description: 'Last pre-Islamic Persian Empire, rival to Rome and Byzantium',
        coordinates: [
            [[40, 24], [72, 24], [72, 42], [40, 42], [40, 24]]
        ]
    },

    // Greek/Macedonian
    {
        id: 'macedon',
        name: 'Macedonian Empire (Alexander)',
        startYear: -336,
        endYear: -323,
        color: '#9932CC',
        entityId: 'macedon',
        region: 'europe-middle-east',
        description: 'Empire of Alexander the Great, from Greece to India',
        coordinates: [
            [[20, 25], [75, 25], [75, 42], [20, 42], [20, 25]]
        ]
    },
    {
        id: 'seleucid',
        name: 'Seleucid Empire',
        startYear: -312,
        endYear: -63,
        color: '#BA55D3',
        entityId: 'seleucid',
        region: 'europe-middle-east',
        description: 'Hellenistic successor state, controlled Persia and Near East',
        coordinates: [
            [[35, 28], [72, 28], [72, 42], [35, 42], [35, 28]]
        ]
    },

    // Roman
    {
        id: 'roman-republic',
        name: 'Roman Republic',
        startYear: -509,
        endYear: -27,
        color: '#DC143C',
        entityId: 'roman-republic',
        region: 'europe-middle-east',
        description: 'Roman state governed by elected officials',
        coordinates: [
            [[-10, 35], [35, 35], [35, 48], [-10, 48], [-10, 35]]
        ]
    },
    {
        id: 'roman-empire',
        name: 'Roman Empire',
        startYear: -27,
        endYear: 476,
        color: '#B22222',
        entityId: 'roman-empire',
        region: 'europe-middle-east',
        description: 'One of the largest empires in ancient history at its peak',
        coordinates: [
            [[-10, 25], [45, 25], [45, 55], [-10, 55], [-10, 25]]
        ]
    },
    {
        id: 'byzantine',
        name: 'Byzantine Empire',
        startYear: 330,
        endYear: 1453,
        color: '#800080',
        entityId: 'byzantine',
        region: 'europe-middle-east',
        description: 'Eastern Roman Empire, preserved Roman and Greek culture',
        coordinates: [
            [[20, 32], [42, 32], [42, 45], [20, 45], [20, 32]]
        ]
    },

    // Islamic Caliphates
    {
        id: 'rashidun',
        name: 'Rashidun Caliphate',
        startYear: 632,
        endYear: 661,
        color: '#228B22',
        entityId: 'rashidun',
        region: 'europe-middle-east',
        description: 'First caliphate after Muhammad, rapid expansion',
        coordinates: [
            [[25, 20], [65, 20], [65, 42], [25, 42], [25, 20]]
        ]
    },
    {
        id: 'umayyad',
        name: 'Umayyad Caliphate',
        startYear: 661,
        endYear: 750,
        color: '#006400',
        entityId: 'umayyad',
        region: 'europe-middle-east',
        description: 'Second caliphate, expanded Islam from Spain to India',
        coordinates: [
            [[-10, 20], [75, 20], [75, 45], [-10, 45], [-10, 20]]
        ]
    },
    {
        id: 'abbasid',
        name: 'Abbasid Caliphate',
        startYear: 750,
        endYear: 1258,
        color: '#2E8B57',
        entityId: 'abbasid',
        region: 'europe-middle-east',
        description: 'Islamic Golden Age, center of learning in Baghdad',
        coordinates: [
            [[25, 22], [70, 22], [70, 42], [25, 42], [25, 22]]
        ]
    },
    {
        id: 'ottoman',
        name: 'Ottoman Empire',
        startYear: 1299,
        endYear: 1922,
        color: '#FF4500',
        entityId: 'ottoman',
        region: 'europe-middle-east',
        description: 'Major empire spanning Southeast Europe, Western Asia, and North Africa',
        coordinates: [
            [[15, 25], [50, 25], [50, 48], [15, 48], [15, 25]]
        ]
    },

    // Mongol
    {
        id: 'mongol',
        name: 'Mongol Empire',
        startYear: 1206,
        endYear: 1368,
        color: '#8B0000',
        entityId: 'mongol',
        region: 'asia',
        description: 'Largest contiguous land empire in history, founded by Genghis Khan',
        coordinates: [
            [[30, 25], [140, 25], [140, 55], [30, 55], [30, 25]]
        ]
    },

    // Chinese Dynasties
    {
        id: 'han',
        name: 'Han Dynasty',
        startYear: -206,
        endYear: 220,
        color: '#FF6347',
        entityId: null,
        region: 'asia',
        description: 'Golden age of Chinese civilization, Silk Road trade',
        coordinates: [
            [[95, 22], [125, 22], [125, 42], [95, 42], [95, 22]]
        ]
    },
    {
        id: 'tang',
        name: 'Tang Dynasty',
        startYear: 618,
        endYear: 907,
        color: '#FF7F50',
        entityId: 'tang',
        region: 'asia',
        description: 'Golden age of Chinese civilization, poetry and art',
        coordinates: [
            [[90, 20], [130, 20], [130, 45], [90, 45], [90, 20]]
        ]
    },
    {
        id: 'song',
        name: 'Song Dynasty',
        startYear: 960,
        endYear: 1279,
        color: '#E9967A',
        entityId: 'song',
        region: 'asia',
        description: 'Era of economic and technological advancement',
        coordinates: [
            [[100, 22], [125, 22], [125, 40], [100, 40], [100, 22]]
        ]
    },
    {
        id: 'yuan',
        name: 'Yuan Dynasty',
        startYear: 1271,
        endYear: 1368,
        color: '#CD5C5C',
        entityId: 'yuan',
        region: 'asia',
        description: 'Mongol-led dynasty founded by Kublai Khan',
        coordinates: [
            [[85, 20], [135, 20], [135, 50], [85, 50], [85, 20]]
        ]
    },
    {
        id: 'ming',
        name: 'Ming Dynasty',
        startYear: 1368,
        endYear: 1644,
        color: '#F08080',
        entityId: 'ming',
        region: 'asia',
        description: 'Era known for trade expansion and iconic architecture',
        coordinates: [
            [[95, 18], [130, 18], [130, 45], [95, 45], [95, 18]]
        ]
    },
    {
        id: 'qing',
        name: 'Qing Dynasty',
        startYear: 1644,
        endYear: 1912,
        color: '#FA8072',
        entityId: 'qing',
        region: 'asia',
        description: 'Last imperial dynasty of China, largest Qing territory',
        coordinates: [
            [[75, 18], [135, 18], [135, 55], [75, 55], [75, 18]]
        ]
    },

    // Indian
    {
        id: 'maurya',
        name: 'Maurya Empire',
        startYear: -322,
        endYear: -185,
        color: '#20B2AA',
        entityId: null,
        region: 'asia',
        description: 'First empire to unify most of India, founded by Chandragupta',
        coordinates: [
            [[68, 8], [92, 8], [92, 32], [68, 32], [68, 8]]
        ]
    },
    {
        id: 'gupta',
        name: 'Gupta Empire',
        startYear: 320,
        endYear: 550,
        color: '#48D1CC',
        entityId: null,
        region: 'asia',
        description: 'Golden Age of India, advances in science and art',
        coordinates: [
            [[70, 15], [92, 15], [92, 30], [70, 30], [70, 15]]
        ]
    },
    {
        id: 'mughal',
        name: 'Mughal Empire',
        startYear: 1526,
        endYear: 1857,
        color: '#40E0D0',
        entityId: null,
        region: 'asia',
        description: 'Islamic empire in Indian subcontinent, built Taj Mahal',
        coordinates: [
            [[65, 10], [95, 10], [95, 35], [65, 35], [65, 10]]
        ]
    },

    // European Medieval/Early Modern
    {
        id: 'frankish',
        name: 'Frankish Empire (Carolingian)',
        startYear: 768,
        endYear: 843,
        color: '#4682B4',
        entityId: null,
        region: 'europe-middle-east',
        description: 'Empire of Charlemagne, predecessor to France and Germany',
        coordinates: [
            [[-5, 42], [15, 42], [15, 54], [-5, 54], [-5, 42]]
        ]
    },
    {
        id: 'hre',
        name: 'Holy Roman Empire',
        startYear: 962,
        endYear: 1806,
        color: '#5F9EA0',
        entityId: null,
        region: 'europe-middle-east',
        description: 'Multi-ethnic complex of territories in Central Europe',
        coordinates: [
            [[5, 45], [20, 45], [20, 55], [5, 55], [5, 45]]
        ]
    },
    {
        id: 'spanish',
        name: 'Spanish Empire',
        startYear: 1492,
        endYear: 1898,
        color: '#FFD700',
        entityId: null,
        region: 'europe-middle-east',
        description: 'Global colonial empire, first to be called "empire on which the sun never sets"',
        coordinates: [
            [[-10, 36], [5, 36], [5, 44], [-10, 44], [-10, 36]]
        ]
    },
    {
        id: 'british',
        name: 'British Empire',
        startYear: 1583,
        endYear: 1997,
        color: '#DC143C',
        entityId: 'england',
        region: 'europe-middle-east',
        description: 'Largest empire in history by land area',
        coordinates: [
            [[-8, 50], [2, 50], [2, 59], [-8, 59], [-8, 50]]
        ]
    },

    // Americas
    {
        id: 'maya',
        name: 'Maya Civilization',
        startYear: -2000,
        endYear: 1500,
        color: '#32CD32',
        entityId: null,
        region: 'americas',
        description: 'Mesoamerican civilization known for writing, astronomy, and pyramids',
        coordinates: [
            [[-92, 14], [-86, 14], [-86, 22], [-92, 22], [-92, 14]]
        ]
    },
    {
        id: 'aztec',
        name: 'Aztec Empire',
        startYear: 1428,
        endYear: 1521,
        color: '#228B22',
        entityId: null,
        region: 'americas',
        description: 'Mesoamerican empire centered at Tenochtitlan',
        coordinates: [
            [[-105, 15], [-95, 15], [-95, 22], [-105, 22], [-105, 15]]
        ]
    },
    {
        id: 'inca',
        name: 'Inca Empire',
        startYear: 1438,
        endYear: 1533,
        color: '#FFD700',
        entityId: null,
        region: 'americas',
        description: 'Largest empire in pre-Columbian America',
        coordinates: [
            [[-80, -20], [-65, -20], [-65, 2], [-80, 2], [-80, -20]]
        ]
    }
];

// Convert empire data to GeoJSON format for a specific year
function getEmpiresForYear(year) {
    return historicalEmpires.filter(empire =>
        year >= empire.startYear && year <= empire.endYear
    );
}

// Convert coordinates to GeoJSON polygon
function empireToGeoJSON(empire) {
    // Get entity if available for additional data
    const entity = empire.entityId ? getEntityById(empire.entityId) : null;

    return {
        type: 'Feature',
        properties: {
            id: empire.id,
            name: empire.name,
            startYear: empire.startYear,
            endYear: empire.endYear,
            color: empire.color,
            entityId: empire.entityId,
            category: entity ? (entity.type === 'state' ? 'civilizations' : entity.type) : 'civilizations',
            region: empire.region,
            description: empire.description
        },
        geometry: {
            type: 'Polygon',
            coordinates: empire.coordinates
        }
    };
}

// Get all empires as GeoJSON FeatureCollection for a given year
function getEmpiresGeoJSON(year) {
    const empires = getEmpiresForYear(year);
    return {
        type: 'FeatureCollection',
        features: empires.map(empireToGeoJSON)
    };
}

// Helper: Get entity by ID (references function from data.js)
// This is a fallback if getEntityById is not available
if (typeof getEntityById === 'undefined') {
    function getEntityById(id) {
        if (typeof timelineData !== 'undefined' && timelineData.entities) {
            return timelineData.entities.find(e => e.id === id);
        }
        return null;
    }
}
