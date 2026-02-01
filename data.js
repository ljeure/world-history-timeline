// World History Timeline Data
// Knowledge Map Approach: Societal entities are central, with events, references, and insights linking to them

// Geographic regions for vertical layout (5 regions as per knowledge map)
const REGIONS = [
    { id: 'subsaharan-africa', name: 'Subsaharan Africa' },
    { id: 'europe-middle-east', name: 'Europe & Middle East' },
    { id: 'asia', name: 'Asia' },
    { id: 'americas', name: 'The Americas' },
    { id: 'pacific', name: 'Pacific' }
];

// Entity types for societal entities
const ENTITY_TYPES = ['religion', 'country', 'culture'];

const timelineData = {
    // Experience-based scaling: proportion of all human experience by year
    experienceScale: {
        markers: [
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
            { year: 2026, experience: 1.00 }
        ]
    },

    // ===========================================
    // SOCIETAL ENTITIES - Central concept
    // Things that persist across time and space, that knowledge attaches to
    // Types: religion, country, culture
    // ===========================================
    entities: [
        // === RELIGIONS ===
        { id: 'christianity', name: 'Christianity', type: 'religion', year: 30, endYear: null, region: 'europe-middle-east', description: 'Abrahamic religion based on the teachings of Jesus Christ' },
        { id: 'islam', name: 'Islam', type: 'religion', year: 622, endYear: null, region: 'europe-middle-east', description: 'Abrahamic religion founded by Prophet Muhammad' },
        { id: 'buddhism', name: 'Buddhism', type: 'religion', year: -500, endYear: null, region: 'asia', description: 'Religion and philosophy based on teachings of Siddhartha Gautama' },
        { id: 'manichaeism', name: 'Manichaeism', type: 'religion', year: 240, endYear: 1400, region: 'europe-middle-east', description: 'Gnostic religion founded by Mani, once widespread from Rome to China' },
        { id: 'bahai', name: "Bahá'í Faith", type: 'religion', year: 1863, endYear: null, region: 'europe-middle-east', description: "Religion founded by Bahá'u'lláh emphasizing unity of humanity" },
        { id: 'confucianism', name: 'Confucianism', type: 'religion', year: -500, endYear: null, region: 'asia', description: 'Chinese philosophical and ethical system founded by Confucius' },

        // === COUNTRIES/EMPIRES (political entities) ===
        // Prehistoric
        { id: 'early-humans', name: 'Early Humans', type: 'culture', year: -300000, endYear: -10000, region: 'subsaharan-africa', description: 'Homo sapiens emergence and migration out of Africa' },

        // Ancient Mesopotamia
        { id: 'sumer', name: 'Sumerian City-States', type: 'country', year: -3500, endYear: -2300, region: 'asia', description: 'First known civilization with writing, cities, and complex society' },
        { id: 'akkad', name: 'Akkadian Empire', type: 'country', year: -2334, endYear: -2154, region: 'asia', description: 'First ancient empire of Mesopotamia, founded by Sargon' },
        { id: 'babylon', name: 'Babylonian Empire', type: 'country', year: -1900, endYear: -1600, region: 'asia', description: 'Mesopotamian empire known for Hammurabi\'s Code' },
        { id: 'assyria', name: 'Neo-Assyrian Empire', type: 'country', year: -911, endYear: -609, region: 'asia', description: 'Powerful Mesopotamian empire known for military prowess' },

        // Persian Empires
        { id: 'achaemenid', name: 'Achaemenid Empire', type: 'country', year: -550, endYear: -330, region: 'europe-middle-east', description: 'First Persian Empire, founded by Cyrus the Great' },
        { id: 'seleucid', name: 'Seleucid Empire', type: 'country', year: -312, endYear: -63, region: 'europe-middle-east', description: 'Hellenistic empire founded after Alexander\'s death' },
        { id: 'parthia', name: 'Parthian Empire', type: 'country', year: -247, endYear: 224, region: 'europe-middle-east', description: 'Iranian empire and rival of Rome' },
        { id: 'sasanian', name: 'Sasanian Empire', type: 'country', year: 224, endYear: 651, region: 'europe-middle-east', description: 'Last pre-Islamic Persian Empire' },

        // Greek & Roman
        { id: 'ancient-greece', name: 'Ancient Greece', type: 'country', year: -800, endYear: -146, region: 'europe-middle-east', description: 'Greek city-states and classical civilization' },
        { id: 'macedon', name: 'Macedonian Empire', type: 'country', year: -336, endYear: -323, region: 'europe-middle-east', description: 'Empire of Alexander the Great' },
        { id: 'roman-republic', name: 'Roman Republic', type: 'country', year: -509, endYear: -27, region: 'europe-middle-east', description: 'Roman state before the emperors' },
        { id: 'roman-empire', name: 'Roman Empire', type: 'country', year: -27, endYear: 476, region: 'europe-middle-east', description: 'One of the largest empires in ancient history' },
        { id: 'byzantine', name: 'Byzantine Empire', type: 'country', year: 330, endYear: 1453, region: 'europe-middle-east', description: 'Eastern Roman Empire, preserved Roman and Greek culture' },

        // Islamic Caliphates
        { id: 'rashidun', name: 'Rashidun Caliphate', type: 'country', year: 632, endYear: 661, region: 'europe-middle-east', description: 'First caliphate led by the Rightly Guided caliphs' },
        { id: 'umayyad', name: 'Umayyad Caliphate', type: 'country', year: 661, endYear: 750, region: 'europe-middle-east', description: 'Second caliphate, expanded Islam from Spain to India' },
        { id: 'abbasid', name: 'Abbasid Caliphate', type: 'country', year: 750, endYear: 1258, region: 'europe-middle-east', description: 'Islamic Golden Age, center of learning in Baghdad' },
        { id: 'fatimid', name: 'Fatimid Caliphate', type: 'country', year: 909, endYear: 1171, region: 'europe-middle-east', description: 'Shia caliphate based in Egypt, founded Cairo' },
        { id: 'mamluk', name: 'Mamluk Sultanate', type: 'country', year: 1250, endYear: 1517, region: 'europe-middle-east', description: 'Slave-soldier dynasty that ruled Egypt and Syria' },
        { id: 'ottoman', name: 'Ottoman Empire', type: 'country', year: 1299, endYear: 1922, region: 'europe-middle-east', description: 'Major empire spanning Southeast Europe, Western Asia, and North Africa' },

        // Chinese Dynasties
        { id: 'tang', name: 'Tang Dynasty', type: 'country', year: 618, endYear: 907, region: 'asia', description: 'Golden age of Chinese civilization' },
        { id: 'song', name: 'Song Dynasty', type: 'country', year: 960, endYear: 1279, region: 'asia', description: 'Era of significant economic and cultural development' },
        { id: 'yuan', name: 'Yuan Dynasty', type: 'country', year: 1271, endYear: 1368, region: 'asia', description: 'Mongol-led dynasty founded by Kublai Khan' },
        { id: 'ming', name: 'Ming Dynasty', type: 'country', year: 1368, endYear: 1644, region: 'asia', description: 'Era known for trade expansion and iconic architecture' },
        { id: 'qing', name: 'Qing Dynasty', type: 'country', year: 1644, endYear: 1912, region: 'asia', description: 'Last imperial dynasty of China' },
        { id: 'roc', name: 'Republic of China', type: 'country', year: 1912, endYear: 1949, region: 'asia', description: 'Period of republican government in mainland China' },
        { id: 'prc', name: "People's Republic of China", type: 'country', year: 1949, endYear: null, region: 'asia', description: 'Communist government established by Mao Zedong' },

        // Mongol
        { id: 'mongol', name: 'Mongol Empire', type: 'country', year: 1206, endYear: 1368, region: 'asia', description: 'Largest contiguous land empire in history' },

        // European Nations (for later events)
        { id: 'england', name: 'England/Britain', type: 'country', year: 927, endYear: null, region: 'europe-middle-east', description: 'Kingdom of England, later Great Britain and UK' },
        { id: 'france', name: 'France', type: 'country', year: 843, endYear: null, region: 'europe-middle-east', description: 'French nation from Carolingian division' },

        // === CULTURES/ERAS (intellectual and artistic movements) ===
        // European Eras
        { id: 'paleolithic', name: 'Upper Paleolithic', type: 'culture', year: -50000, endYear: -10000, region: 'europe-middle-east', description: 'Development of art, sophisticated tools, and cultural complexity' },
        { id: 'mesolithic', name: 'Mesolithic', type: 'culture', year: -10000, endYear: -5000, region: 'europe-middle-east', description: 'Middle Stone Age - transition from hunting to early farming' },
        { id: 'neolithic', name: 'Neolithic', type: 'culture', year: -5000, endYear: -3000, region: 'europe-middle-east', description: 'New Stone Age - agricultural revolution, permanent settlements' },
        { id: 'chalcolithic', name: 'Chalcolithic', type: 'culture', year: -3500, endYear: -2300, region: 'europe-middle-east', description: 'Copper Age - first metal tools alongside stone' },
        { id: 'bronze-age', name: 'Bronze Age', type: 'culture', year: -2300, endYear: -1200, region: 'europe-middle-east', description: 'Widespread bronze tools, rise of complex societies' },
        { id: 'iron-age', name: 'Iron Age', type: 'culture', year: -1200, endYear: -800, region: 'europe-middle-east', description: 'Iron replaces bronze, spread of ironworking' },
        { id: 'classical-antiquity', name: 'Classical Antiquity', type: 'culture', year: -800, endYear: 500, region: 'europe-middle-east', description: 'Rise of ancient Greece and Rome, foundations of Western civilization' },
        { id: 'early-middle-ages', name: 'Early Middle Ages', type: 'culture', year: 500, endYear: 1000, region: 'europe-middle-east', description: 'Period following the fall of Rome' },
        { id: 'high-middle-ages', name: 'High Middle Ages', type: 'culture', year: 1000, endYear: 1300, region: 'europe-middle-east', description: 'Period of population growth, urbanization, cultural achievements' },
        { id: 'renaissance', name: 'Renaissance', type: 'culture', year: 1300, endYear: 1600, region: 'europe-middle-east', description: 'Cultural rebirth in Europe, bridging Middle Ages and Modern era' },
        { id: 'enlightenment', name: 'Enlightenment', type: 'culture', year: 1650, endYear: 1800, region: 'europe-middle-east', description: 'Age of Reason emphasizing science and rational thought' },
        { id: 'scientific-revolution', name: 'Scientific Revolution', type: 'culture', year: 1543, endYear: 1700, region: 'europe-middle-east', description: 'Emergence of modern science from new methodology and discoveries' },

        // Philosophy traditions
        { id: 'stoicism', name: 'Stoicism', type: 'culture', year: -300, endYear: 300, region: 'europe-middle-east', description: 'Hellenistic philosophy emphasizing virtue and reason' },
        { id: 'greek-philosophy', name: 'Greek Philosophy', type: 'culture', year: -600, endYear: -300, region: 'europe-middle-east', description: 'Pre-Socratic through Classical Greek philosophical traditions' },
    ],

    // ===========================================
    // EVENTS - Facts in time that link to societal entities
    // People appear as events (births, deaths, achievements)
    // ===========================================
    events: [
        // === PREHISTORIC EVENTS ===
        { id: 200, title: "Homo sapiens emerge", year: -300000, endYear: -200000, entityIds: ['early-humans'], region: "subsaharan-africa", description: "Anatomically modern humans first appear in Africa" },
        { id: 201, title: "Out of Africa migration", year: -70000, endYear: -50000, entityIds: ['early-humans'], region: "subsaharan-africa", description: "Humans migrate out of Africa to populate the world" },
        { id: 203, title: "Last Ice Age peak", year: -26000, endYear: -19000, entityIds: ['paleolithic'], region: "europe-middle-east", description: "Last Glacial Maximum - ice sheets at their greatest extent" },

        // === TECHNOLOGY EVENTS ===
        { id: 204, title: "Agriculture begins", year: -10000, endYear: -8000, entityIds: ['neolithic'], region: "europe-middle-east", description: "Neolithic Revolution - transition from hunting/gathering to farming" },
        { id: 205, title: "Domestication of animals", year: -10000, endYear: -7000, entityIds: ['neolithic'], region: "asia", description: "Dogs, sheep, goats, and cattle domesticated" },
        { id: 206, title: "First cities emerge", year: -6000, endYear: -4000, entityIds: ['neolithic'], region: "europe-middle-east", description: "Çatalhöyük, Jericho, and other early urban settlements" },
        { id: 207, title: "Writing invented", year: -3400, endYear: -3200, entityIds: ['sumer'], region: "asia", description: "Cuneiform in Mesopotamia and hieroglyphics in Egypt" },
        { id: 208, title: "Bronze Age begins", year: -3300, entityIds: ['bronze-age'], region: "europe-middle-east", description: "Widespread use of bronze for tools and weapons" },
        { id: 31, title: "Rice paddies & canals", year: -1000, entityIds: [], region: "asia", description: "Development of sophisticated irrigation for rice farming" },
        { id: 32, title: "Rice mechanization", year: 1850, entityIds: [], region: "asia", description: "Industrial mechanization of rice farming" },
        { id: 33, title: "Rice Green Revolution", year: 1960, entityIds: [], region: "asia", description: "High-yield rice varieties dramatically increase production" },

        // === PEOPLE - Religious figures (as events) ===
        { id: 16, title: "Buddha born", year: -563, entityIds: ['buddhism'], region: "asia", description: "Birth of Siddhartha Gautama, founder of Buddhism" },
        { id: 160, title: "Buddha achieves enlightenment", year: -528, entityIds: ['buddhism'], region: "asia", description: "Siddhartha Gautama attains nirvana under the Bodhi tree" },
        { id: 161, title: "Buddha dies (parinirvana)", year: -483, entityIds: ['buddhism'], region: "asia", description: "Death of Buddha, entering final nirvana" },
        { id: 2, title: "Jesus born", year: -4, entityIds: ['christianity'], region: "europe-middle-east", description: "Birth of Jesus of Nazareth" },
        { id: 20, title: "Jesus crucified", year: 33, entityIds: ['christianity', 'roman-empire'], region: "europe-middle-east", description: "Crucifixion and resurrection, founding event of Christianity" },
        { id: 3, title: "Mani born", year: 216, entityIds: ['manichaeism', 'sasanian'], region: "europe-middle-east", description: "Birth of the founder of Manichaeism" },
        { id: 30, title: "Mani executed", year: 274, entityIds: ['manichaeism', 'sasanian'], region: "europe-middle-east", description: "Mani executed by Sasanian authorities" },
        { id: 4, title: "St. Augustine born", year: 354, entityIds: ['christianity', 'roman-empire'], region: "europe-middle-east", description: "Birth of influential Christian theologian" },
        { id: 40, title: "Augustine writes Confessions", year: 400, entityIds: ['christianity'], region: "europe-middle-east", description: "Augustine completes his autobiographical work" },
        { id: 41, title: "Augustine writes City of God", year: 426, entityIds: ['christianity'], region: "europe-middle-east", description: "Augustine completes major theological work" },
        { id: 42, title: "St. Augustine dies", year: 430, entityIds: ['christianity'], region: "europe-middle-east", description: "Death of St. Augustine during Vandal siege" },
        { id: 5, title: "Muhammad born", year: 570, entityIds: ['islam'], region: "europe-middle-east", description: "Birth of the Prophet Muhammad" },
        { id: 50, title: "Muhammad receives first revelation", year: 610, entityIds: ['islam'], region: "europe-middle-east", description: "First Quranic revelation in Cave of Hira" },
        { id: 51, title: "Hijra to Medina", year: 622, entityIds: ['islam'], region: "europe-middle-east", description: "Muhammad's migration to Medina, start of Islamic calendar" },
        { id: 52, title: "Muhammad dies", year: 632, entityIds: ['islam', 'rashidun'], region: "europe-middle-east", description: "Death of Prophet Muhammad" },
        { id: 6, title: "Thomas Aquinas born", year: 1225, entityIds: ['christianity', 'high-middle-ages'], region: "europe-middle-east", description: "Birth of Catholic philosopher and theologian" },
        { id: 60, title: "Aquinas writes Summa Theologica", year: 1265, endYear: 1274, entityIds: ['christianity', 'high-middle-ages'], region: "europe-middle-east", description: "Aquinas composes his masterwork of systematic theology" },
        { id: 61, title: "Thomas Aquinas dies", year: 1274, entityIds: ['christianity'], region: "europe-middle-east", description: "Death of Thomas Aquinas" },
        { id: 7, title: "Bahá'u'lláh born", year: 1817, entityIds: ['bahai'], region: "europe-middle-east", description: "Birth of the founder of the Bahá'í Faith" },
        { id: 70, title: "Bahá'u'lláh declares mission", year: 1863, entityIds: ['bahai'], region: "europe-middle-east", description: "Bahá'u'lláh declares himself the Promised One" },
        { id: 71, title: "Bahá'u'lláh dies", year: 1892, entityIds: ['bahai'], region: "europe-middle-east", description: "Death of Bahá'u'lláh" },

        // === PEOPLE - Political leaders ===
        { id: 17, title: "Alexander the Great born", year: -356, entityIds: ['macedon', 'ancient-greece'], region: "europe-middle-east", description: "Birth of the Macedonian king" },
        { id: 170, title: "Alexander conquers Persian Empire", year: -330, entityIds: ['macedon', 'achaemenid'], region: "europe-middle-east", description: "Alexander defeats Darius III, ending Achaemenid Empire" },
        { id: 171, title: "Alexander dies", year: -323, entityIds: ['macedon'], region: "europe-middle-east", description: "Death of Alexander in Babylon, empire fragments" },
        { id: 8, title: "Genghis Khan born", year: 1162, entityIds: ['mongol'], region: "asia", description: "Birth of Temüjin, future Mongol ruler" },
        { id: 80, title: "Mongol Empire founded", year: 1206, entityIds: ['mongol'], region: "asia", description: "Temüjin proclaimed Genghis Khan, unifying Mongol tribes" },
        { id: 81, title: "Genghis Khan dies", year: 1227, entityIds: ['mongol'], region: "asia", description: "Death of Genghis Khan" },

        // === PEOPLE - Philosophers and Scientists ===
        { id: 11, title: "Thales of Miletus born", year: -624, entityIds: ['greek-philosophy', 'ancient-greece'], region: "europe-middle-east", description: "Birth of first Greek philosopher" },
        { id: 110, title: "Thales predicts solar eclipse", year: -585, entityIds: ['greek-philosophy', 'ancient-greece'], region: "europe-middle-east", description: "Thales allegedly predicts eclipse, demonstrating natural philosophy" },
        { id: 12, title: "Pythagoras born", year: -570, entityIds: ['greek-philosophy', 'ancient-greece'], region: "europe-middle-east", description: "Birth of mathematician and philosopher" },
        { id: 13, title: "Confucius born", year: -551, entityIds: ['confucianism'], region: "asia", description: "Birth of Chinese philosopher" },
        { id: 130, title: "Confucius dies", year: -479, entityIds: ['confucianism'], region: "asia", description: "Death of Confucius" },
        { id: 14, title: "Herodotus born", year: -484, entityIds: ['ancient-greece', 'classical-antiquity'], region: "europe-middle-east", description: "Birth of the Father of History" },
        { id: 140, title: "Herodotus writes Histories", year: -440, entityIds: ['ancient-greece', 'classical-antiquity'], region: "europe-middle-east", description: "Herodotus composes first great narrative history" },
        { id: 15, title: "Plato born", year: -428, entityIds: ['greek-philosophy', 'ancient-greece'], region: "europe-middle-east", description: "Birth of Greek philosopher" },
        { id: 150, title: "Plato founds the Academy", year: -387, entityIds: ['greek-philosophy', 'ancient-greece'], region: "europe-middle-east", description: "Plato establishes school in Athens" },
        { id: 151, title: "Plato dies", year: -348, entityIds: ['greek-philosophy'], region: "europe-middle-east", description: "Death of Plato" },
        { id: 18, title: "Marcus Aurelius born", year: 121, entityIds: ['stoicism', 'roman-empire'], region: "europe-middle-east", description: "Birth of Roman Emperor and Stoic philosopher" },
        { id: 180, title: "Marcus Aurelius writes Meditations", year: 170, endYear: 180, entityIds: ['stoicism', 'roman-empire'], region: "europe-middle-east", description: "Marcus Aurelius composes personal philosophical writings" },
        { id: 181, title: "Marcus Aurelius dies", year: 180, entityIds: ['stoicism', 'roman-empire'], region: "europe-middle-east", description: "Death of the philosopher emperor" },

        // === SCIENCE & PHILOSOPHY EVENTS ===
        { id: 10, title: "Iliad & Odyssey composed", year: -750, entityIds: ['ancient-greece', 'classical-antiquity'], region: "europe-middle-east", description: "Homer's epic poems first recorded" },
        { id: 19, title: "Copernicus publishes heliocentric model", year: 1543, entityIds: ['scientific-revolution', 'renaissance'], region: "europe-middle-east", description: "Published theory that Earth revolves around the Sun" },
        { id: 21, title: "Kepler publishes laws of planetary motion", year: 1609, entityIds: ['scientific-revolution'], region: "europe-middle-east", description: "Discovered that planets move in ellipses" },
        { id: 22, title: "Galileo condemned by Inquisition", year: 1633, entityIds: ['scientific-revolution', 'christianity'], region: "europe-middle-east", description: "Forced to recant support for heliocentrism" },
        { id: 23, title: "Royal Society founded", year: 1660, entityIds: ['scientific-revolution', 'england'], region: "europe-middle-east", description: "World's oldest national scientific institution established" },
        { id: 24, title: "Newton publishes Principia", year: 1687, entityIds: ['scientific-revolution', 'england'], region: "europe-middle-east", description: "Laws of motion and universal gravitation published" },
        { id: 90, title: "Darwin publishes Origin of Species", year: 1859, entityIds: ['england'], region: "europe-middle-east", description: "Theory of evolution by natural selection published" },

        // === RELIGIOUS/CULTURAL EVENTS ===
        { id: 111, title: "Buddhism spreads to China", year: 100, entityIds: ['buddhism'], region: "asia", description: "Buddhism begins to spread along the Silk Road into China" },
        { id: 112, title: "Council of Nicaea", year: 325, entityIds: ['christianity', 'roman-empire'], region: "europe-middle-east", description: "First ecumenical council of the Christian Church" },
        { id: 113, title: "Islam spreads to Southeast Asia", year: 700, entityIds: ['islam'], region: "asia", description: "Islamic traders and missionaries spread religion across Asia" },

        // === POLITICAL EVENTS ===
        { id: 72, title: "English Civil War begins", year: 1642, entityIds: ['england'], region: "europe-middle-east", description: "War between Parliamentarians and Royalists begins" },
        { id: 73, title: "English Civil War ends", year: 1651, entityIds: ['england'], region: "europe-middle-east", description: "Parliamentary victory, Charles I executed" },
        { id: 74, title: "Great Plague of London", year: 1665, entityIds: ['england'], region: "europe-middle-east", description: "Major bubonic plague epidemic killing ~100,000 people" },
        { id: 75, title: "Great Fire of London", year: 1666, entityIds: ['england'], region: "europe-middle-east", description: "Devastating fire destroys much of central London" },
        { id: 82, title: "Glorious Revolution", year: 1688, entityIds: ['england'], region: "europe-middle-east", description: "Overthrow of James II, constitutional monarchy established" },
        { id: 83, title: "French Revolution begins", year: 1789, entityIds: ['france', 'enlightenment'], region: "europe-middle-east", description: "Revolutionary period transforms France and Europe" },
        { id: 84, title: "Napoleonic Wars", year: 1803, endYear: 1815, entityIds: ['france'], region: "europe-middle-east", description: "Major conflicts involving Napoleon's French Empire" },
        { id: 91, title: "Seven Years' War", year: 1756, endYear: 1763, entityIds: ['england', 'france'], region: "europe-middle-east", description: "Global conflict involving most European powers" },
    ],

    // ===========================================
    // REFERENCES - What you read/watch/listen to
    // Links to societal entities they cover
    // ===========================================
    references: [
        { id: 1, title: "A History of Western Philosophy", type: "book", author: "Bertrand Russell", entityIds: ['greek-philosophy', 'stoicism', 'christianity', 'enlightenment'], year: 1945, status: "completed", description: "Comprehensive survey of Western philosophy from pre-Socratics to early 20th century" },
        { id: 2, title: "Meditations", type: "book", author: "Marcus Aurelius", entityIds: ['stoicism', 'roman-empire'], year: 180, status: "completed", description: "Personal writings on Stoic philosophy" },
        { id: 3, title: "Confessions", type: "book", author: "St. Augustine", entityIds: ['christianity', 'roman-empire'], year: 400, status: "completed", description: "Augustine's autobiographical and theological work" },
        { id: 4, title: "The Royal Society (study)", type: "book", entityIds: ['scientific-revolution', 'england'], year: 1660, status: "completed", description: "Study of the founding and history of the Royal Society of London" },
    ],

    // ===========================================
    // INSIGHTS - Your synthesis and takeaways
    // Notes that link to societal entities
    // ===========================================
    insights: [],

    // User notes storage (eventId -> notes) - legacy support
    notes: {},

    // Row assignments for custom layout
    rowAssignments: {}
};

// Helper: Get entity by ID
function getEntityById(id) {
    return timelineData.entities.find(e => e.id === id);
}

// Helper: Get all entities for an event
function getEntitiesForEvent(event) {
    if (!event.entityIds) return [];
    return event.entityIds.map(id => getEntityById(id)).filter(Boolean);
}

// Helper: Get all events for an entity
function getEventsForEntity(entityId) {
    return timelineData.events.filter(e => e.entityIds && e.entityIds.includes(entityId));
}

// Helper: Get all references for an entity
function getReferencesForEntity(entityId) {
    return timelineData.references.filter(r => r.entityIds && r.entityIds.includes(entityId));
}

// Get next available ID for events
function getNextEventId() {
    return Math.max(...timelineData.events.map(e => e.id)) + 1;
}

// Get next available ID for references
function getNextReferenceId() {
    return Math.max(...timelineData.references.map(r => r.id)) + 1;
}

// Get next available ID for insights
function getNextInsightId() {
    if (timelineData.insights.length === 0) return 1;
    return Math.max(...timelineData.insights.map(i => i.id)) + 1;
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
        entities: timelineData.entities.filter(e => e.userAdded),
        references: timelineData.references.filter(r => r.userAdded),
        insights: timelineData.insights.filter(i => i.userAdded),
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

        // Add user entities
        if (userData.entities) {
            userData.entities.forEach(e => {
                e.userAdded = true;
                if (!timelineData.entities.find(existing => existing.id === e.id)) {
                    timelineData.entities.push(e);
                }
            });
        }

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

        // Add user insights
        if (userData.insights) {
            userData.insights.forEach(i => {
                i.userAdded = true;
                if (!timelineData.insights.find(existing => existing.id === i.id)) {
                    timelineData.insights.push(i);
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
            body: JSON.stringify({ events: [], entities: [], references: [], insights: [], notes: {}, rowAssignments: {} })
        }).then(() => location.reload());
    } else {
        localStorage.removeItem('worldHistoryTimeline');
        location.reload();
    }
}

// ===========================================
// BACKWARDS COMPATIBILITY LAYER
// Derives display category from entityIds for UI filtering/coloring
// ===========================================

// Entity type to display category mapping
const ENTITY_TYPE_TO_CATEGORY = {
    'religion': 'religion',
    'country': 'civilizations',
    'culture': 'civilizations'
};

// Specific entity ID to category overrides
const ENTITY_TO_CATEGORY_OVERRIDES = {
    // European cultural eras
    'paleolithic': 'era-european',
    'mesolithic': 'era-european',
    'neolithic': 'era-european',
    'chalcolithic': 'era-european',
    'bronze-age': 'era-european',
    'iron-age': 'era-european',
    'classical-antiquity': 'era-european',
    'early-middle-ages': 'era-european',
    'high-middle-ages': 'era-european',
    'renaissance': 'era-european',
    'enlightenment': 'era-european',
    'scientific-revolution': 'science',
    // Chinese dynasties
    'tang': 'era-chinese',
    'song': 'era-chinese',
    'yuan': 'era-chinese',
    'ming': 'era-chinese',
    'qing': 'era-chinese',
    'roc': 'era-chinese',
    'prc': 'era-chinese',
    // Philosophy
    'stoicism': 'science',
    'greek-philosophy': 'science',
    'confucianism': 'science',
};

// Derive display category from entityIds for backwards compatibility
function getCategoryFromEntityIds(entityIds) {
    if (!entityIds || entityIds.length === 0) return 'political';

    // Check each entity for a category
    for (const entityId of entityIds) {
        // Check overrides first
        if (ENTITY_TO_CATEGORY_OVERRIDES[entityId]) {
            return ENTITY_TO_CATEGORY_OVERRIDES[entityId];
        }

        // Look up entity and get type
        const entity = getEntityById(entityId);
        if (entity) {
            // Religion entities get 'religion' category
            if (entity.type === 'religion') {
                return 'religion';
            }
            // Country entities get 'civilizations' by default
            // but could be overridden above
        }
    }

    // Default based on first entity's type
    const firstEntity = getEntityById(entityIds[0]);
    if (firstEntity) {
        return ENTITY_TYPE_TO_CATEGORY[firstEntity.type] || 'political';
    }

    return 'political';
}

// Add category property to all events for backwards compat
// This runs once after data is loaded
function ensureEventCategories() {
    timelineData.events.forEach(event => {
        if (!event.category && event.entityIds) {
            event.category = getCategoryFromEntityIds(event.entityIds);
        }
    });
}

// Ensure entities are rendered on the timeline as duration events
function getEntitiesAsEvents() {
    return timelineData.entities
        .filter(e => e.type === 'country')
        .map(entity => ({
            id: `entity-${entity.id}`,
            title: entity.name,
            year: entity.year,
            endYear: entity.endYear || entity.year + 100,
            entityIds: [entity.id],
            category: ENTITY_TO_CATEGORY_OVERRIDES[entity.id] ||
                (entity.type === 'religion' ? 'religion' : 'civilizations'),
            region: entity.region,
            description: entity.description,
            isEntity: true
        }));
}

// Call this after loadData to ensure categories are set
document.addEventListener('DOMContentLoaded', () => {
    // Will be called after loadData completes
    setTimeout(ensureEventCategories, 100);
});
