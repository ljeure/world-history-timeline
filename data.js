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
const ENTITY_TYPES = ['religion', 'state', 'culture'];

// Sub-tags for finer categorization of events
const SUB_TAGS = [
    { id: 'war', name: 'War & Conflict', icon: 'W' },
    { id: 'art', name: 'Art & Architecture', icon: 'A' },
    { id: 'science', name: 'Science & Technology', icon: 'S' },
    { id: 'politics', name: 'Politics & Law', icon: 'P' },
    { id: 'trade', name: 'Trade & Economics', icon: 'T' },
    { id: 'religion', name: 'Religion & Philosophy', icon: 'R' },
    { id: 'exploration', name: 'Exploration', icon: 'X' },
    { id: 'disaster', name: 'Disaster & Disease', icon: 'D' }
];

// Region mapping for periods (CSV uses different names)
const PERIOD_REGION_MAP = {
    'Asia': 'asia',
    'Europe & Mediterranean': 'europe-middle-east',
    'Sub-Saharan Africa': 'subsaharan-africa',
    'Pacific': 'pacific',
    'Americas': 'americas'
};

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
        { id: 'christianity', name: 'Christianity', type: 'religion', year: 30, endYear: 2026, region: 'europe-middle-east', description: 'Abrahamic religion based on the teachings of Jesus Christ' },
        { id: 'islam', name: 'Islam', type: 'religion', year: 622, endYear: 2026, region: 'europe-middle-east', description: 'Abrahamic religion founded by Prophet Muhammad' },
        { id: 'buddhism', name: 'Buddhism', type: 'religion', year: -500, endYear: 2026, region: 'asia', description: 'Religion and philosophy based on teachings of Siddhartha Gautama' },
        { id: 'manichaeism', name: 'Manichaeism', type: 'religion', year: 240, endYear: 1400, region: 'europe-middle-east', description: 'Gnostic religion founded by Mani, once widespread from Rome to China' },
        { id: 'bahai', name: "Bahá'í Faith", type: 'religion', year: 1863, endYear: 2026, region: 'europe-middle-east', description: "Religion founded by Bahá'u'lláh emphasizing unity of humanity" },
        { id: 'confucianism', name: 'Confucianism', type: 'religion', year: -500, endYear: 2026, region: 'asia', description: 'Chinese philosophical and ethical system founded by Confucius' },

        // === STATES (political entities - empires, kingdoms, nations) ===
        // Prehistoric
        { id: 'early-humans', name: 'Early Humans', type: 'culture', year: -300000, endYear: -10000, region: 'subsaharan-africa', description: 'Homo sapiens emergence and migration out of Africa' },

        // Ancient Mesopotamia
        { id: 'sumer', name: 'Sumerian City-States', type: 'state', year: -3500, endYear: -2300, region: 'asia', description: 'First known civilization with writing, cities, and complex society' },
        { id: 'akkad', name: 'Akkadian Empire', type: 'state', year: -2334, endYear: -2154, region: 'asia', description: 'First ancient empire of Mesopotamia, founded by Sargon' },
        { id: 'babylon', name: 'Babylonian Empire', type: 'state', year: -1900, endYear: -1600, region: 'asia', description: 'Mesopotamian empire known for Hammurabi\'s Code' },
        { id: 'assyria', name: 'Neo-Assyrian Empire', type: 'state', year: -911, endYear: -609, region: 'asia', description: 'Powerful Mesopotamian empire known for military prowess' },

        // Persian Empires
        { id: 'achaemenid', name: 'Achaemenid Empire', type: 'state', year: -550, endYear: -330, region: 'europe-middle-east', description: 'First Persian Empire, founded by Cyrus the Great' },
        { id: 'seleucid', name: 'Seleucid Empire', type: 'state', year: -312, endYear: -63, region: 'europe-middle-east', description: 'Hellenistic empire founded after Alexander\'s death' },
        { id: 'parthia', name: 'Parthian Empire', type: 'state', year: -247, endYear: 224, region: 'europe-middle-east', description: 'Iranian empire and rival of Rome' },
        { id: 'sasanian', name: 'Sasanian Empire', type: 'state', year: 224, endYear: 651, region: 'europe-middle-east', description: 'Last pre-Islamic Persian Empire' },

        // Greek & Roman
        { id: 'ancient-greece', name: 'Ancient Greece', type: 'state', year: -800, endYear: -146, region: 'europe-middle-east', description: 'Greek city-states and classical civilization' },
        { id: 'macedon', name: 'Macedonian Empire', type: 'state', year: -336, endYear: -323, region: 'europe-middle-east', description: 'Empire of Alexander the Great' },
        { id: 'roman-republic', name: 'Roman Republic', type: 'state', year: -509, endYear: -27, region: 'europe-middle-east', description: 'Roman state before the emperors' },
        { id: 'roman-empire', name: 'Roman Empire', type: 'state', year: -27, endYear: 476, region: 'europe-middle-east', description: 'One of the largest empires in ancient history' },
        { id: 'byzantine', name: 'Byzantine Empire', type: 'state', year: 330, endYear: 1453, region: 'europe-middle-east', description: 'Eastern Roman Empire, preserved Roman and Greek culture' },

        // Islamic Caliphates
        { id: 'rashidun', name: 'Rashidun Caliphate', type: 'state', year: 632, endYear: 661, region: 'europe-middle-east', description: 'First caliphate led by the Rightly Guided caliphs' },
        { id: 'umayyad', name: 'Umayyad Caliphate', type: 'state', year: 661, endYear: 750, region: 'europe-middle-east', description: 'Second caliphate, expanded Islam from Spain to India' },
        { id: 'abbasid', name: 'Abbasid Caliphate', type: 'state', year: 750, endYear: 1258, region: 'europe-middle-east', description: 'Islamic Golden Age, center of learning in Baghdad' },
        { id: 'fatimid', name: 'Fatimid Caliphate', type: 'state', year: 909, endYear: 1171, region: 'europe-middle-east', description: 'Shia caliphate based in Egypt, founded Cairo' },
        { id: 'mamluk', name: 'Mamluk Sultanate', type: 'state', year: 1250, endYear: 1517, region: 'europe-middle-east', description: 'Slave-soldier dynasty that ruled Egypt and Syria' },
        { id: 'ottoman', name: 'Ottoman Empire', type: 'state', year: 1299, endYear: 1922, region: 'europe-middle-east', description: 'Major empire spanning Southeast Europe, Western Asia, and North Africa' },

        // Chinese Dynasties
        { id: 'tang', name: 'Tang Dynasty', type: 'state', year: 618, endYear: 907, region: 'asia', description: 'Golden age of Chinese civilization' },
        { id: 'song', name: 'Song Dynasty', type: 'state', year: 960, endYear: 1279, region: 'asia', description: 'Era of significant economic and cultural development' },
        { id: 'yuan', name: 'Yuan Dynasty', type: 'state', year: 1271, endYear: 1368, region: 'asia', description: 'Mongol-led dynasty founded by Kublai Khan' },
        { id: 'ming', name: 'Ming Dynasty', type: 'state', year: 1368, endYear: 1644, region: 'asia', description: 'Era known for trade expansion and iconic architecture' },
        { id: 'qing', name: 'Qing Dynasty', type: 'state', year: 1644, endYear: 1912, region: 'asia', description: 'Last imperial dynasty of China' },
        { id: 'roc', name: 'Republic of China', type: 'state', year: 1912, endYear: 1949, region: 'asia', description: 'Period of republican government in mainland China' },
        { id: 'prc', name: "People's Republic of China", type: 'state', year: 1949, endYear: 2026, region: 'asia', description: 'Communist government established by Mao Zedong' },

        // Mongol
        { id: 'mongol', name: 'Mongol Empire', type: 'state', year: 1206, endYear: 1368, region: 'asia', description: 'Largest contiguous land empire in history' },

        // African States
        { id: 'egypt-old', name: 'Egyptian Old Kingdom', type: 'state', year: -2686, endYear: -2181, region: 'subsaharan-africa', description: 'Age of the pyramids, centralized pharaonic rule' },
        { id: 'egypt-middle', name: 'Egyptian Middle Kingdom', type: 'state', year: -2055, endYear: -1650, region: 'subsaharan-africa', description: 'Reunification and cultural flourishing of Egypt' },
        { id: 'egypt-new', name: 'Egyptian New Kingdom', type: 'state', year: -1550, endYear: -1070, region: 'subsaharan-africa', description: 'Egypt at its most powerful, era of Ramesses and Tutankhamun' },
        { id: 'aksum', name: 'Kingdom of Aksum', type: 'state', year: 100, endYear: 940, region: 'subsaharan-africa', description: 'Major trading empire in modern-day Ethiopia and Eritrea' },
        { id: 'zimbabwe', name: 'Kingdom of Zimbabwe', type: 'state', year: 1220, endYear: 1450, region: 'subsaharan-africa', description: 'Medieval kingdom known for Great Zimbabwe stone ruins' },
        { id: 'kongo', name: 'Kingdom of Kongo', type: 'state', year: 1390, endYear: 1914, region: 'subsaharan-africa', description: 'Major kingdom in west-central Africa, early contact with Portugal' },
        { id: 'zulu', name: 'Zulu Kingdom', type: 'state', year: 1816, endYear: 1897, region: 'subsaharan-africa', description: 'Southern African kingdom founded by Shaka Zulu' },

        // Omani Empire
        { id: 'oman', name: 'Omani Empire', type: 'state', year: 1696, endYear: 1856, region: 'subsaharan-africa', description: 'Maritime empire controlling East African coast and Indian Ocean trade' },

        // European Nations (for later events)
        { id: 'england', name: 'England/Britain', type: 'state', year: 927, endYear: 2026, region: 'europe-middle-east', description: 'Kingdom of England, later Great Britain and UK' },
        { id: 'france', name: 'France', type: 'state', year: 843, endYear: 2026, region: 'europe-middle-east', description: 'French nation from Carolingian division' },

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
    // PERIODS - Historical eras that span regions
    // Background context for the timeline
    // ===========================================
    periods: [
        // Asia
        { id: 'asia-stone-age', name: 'Stone Age', year: -300000, endYear: -10000, region: 'asia', description: 'Prehistoric period before agriculture' },
        { id: 'asia-neolithic', name: 'Neolithic', year: -10000, endYear: -3000, region: 'asia', description: 'Agricultural revolution and early settlements' },
        { id: 'asia-bronze-age', name: 'Bronze Age', year: -3000, endYear: -1200, region: 'asia', description: 'Development of bronze tools and early civilizations' },
        { id: 'asia-classical', name: 'Classical Era', year: -1200, endYear: 220, region: 'asia', description: 'Rise of major philosophical and religious traditions' },
        { id: 'asia-post-classical', name: 'Post-Classical', year: 220, endYear: 600, region: 'asia', description: 'Period of fragmentation and transition' },
        { id: 'asia-imperial', name: 'Imperial Era', year: 600, endYear: 1800, region: 'asia', description: 'Great empires and cultural flowering' },
        { id: 'asia-modern', name: 'Modern Era', year: 1800, endYear: 2025, region: 'asia', description: 'Colonialism, independence, and modernization' },

        // Europe & Mediterranean
        { id: 'europe-stone-age', name: 'Stone Age', year: -300000, endYear: -10000, region: 'europe-middle-east', description: 'Prehistoric hunter-gatherer societies' },
        { id: 'europe-neolithic', name: 'Neolithic', year: -10000, endYear: -3200, region: 'europe-middle-east', description: 'Agricultural revolution spreads to Europe' },
        { id: 'europe-bronze-age', name: 'Bronze Age', year: -3200, endYear: -800, region: 'europe-middle-east', description: 'Bronze metallurgy and early Mediterranean civilizations' },
        { id: 'europe-antiquity', name: 'Antiquity', year: -800, endYear: 476, region: 'europe-middle-east', description: 'Classical Greece and Rome' },
        { id: 'europe-middle-ages', name: 'Middle Ages', year: 476, endYear: 1450, region: 'europe-middle-east', description: 'Medieval period after fall of Rome' },
        { id: 'europe-early-modern', name: 'Early Modern', year: 1450, endYear: 1789, region: 'europe-middle-east', description: 'Renaissance, Reformation, and Enlightenment' },
        { id: 'europe-modern', name: 'Modern Era', year: 1789, endYear: 2025, region: 'europe-middle-east', description: 'Industrial revolution to present' },

        // Sub-Saharan Africa
        { id: 'africa-stone-age', name: 'Stone Age', year: -300000, endYear: -10000, region: 'subsaharan-africa', description: 'Origin of humanity and early development' },
        { id: 'africa-neolithic', name: 'Neolithic', year: -10000, endYear: -2000, region: 'subsaharan-africa', description: 'Development of agriculture and pastoralism' },
        { id: 'africa-iron-age', name: 'Iron Age', year: -2000, endYear: 1500, region: 'subsaharan-africa', description: 'Bantu expansion and African kingdoms' },
        { id: 'africa-early-global', name: 'Early Global', year: 1500, endYear: 1800, region: 'subsaharan-africa', description: 'Trans-Atlantic trade and early European contact' },
        { id: 'africa-colonial', name: 'Colonial Era', year: 1800, endYear: 1960, region: 'subsaharan-africa', description: 'European colonization of Africa' },
        { id: 'africa-modern', name: 'Modern Era', year: 1960, endYear: 2025, region: 'subsaharan-africa', description: 'Independence movements and modern states' },

        // Pacific
        { id: 'pacific-pre-human', name: 'Pre-Human', year: -300000, endYear: -70000, region: 'pacific', description: 'Before human settlement' },
        { id: 'pacific-early-settlement', name: 'Early Settlement', year: -70000, endYear: -1500, region: 'pacific', description: 'Initial human migration to Australia and Near Oceania' },
        { id: 'pacific-traditional', name: 'Traditional Societies', year: -1500, endYear: 1600, region: 'pacific', description: 'Polynesian expansion and traditional cultures' },
        { id: 'pacific-colonial', name: 'Colonial Era', year: 1600, endYear: 1945, region: 'pacific', description: 'European exploration and colonization' },
        { id: 'pacific-modern', name: 'Modern Era', year: 1945, endYear: 2025, region: 'pacific', description: 'Decolonization and independence' },

        // Americas
        { id: 'americas-pre-human', name: 'Pre-Human', year: -300000, endYear: -20000, region: 'americas', description: 'Before human arrival' },
        { id: 'americas-early-settlement', name: 'Early Settlement', year: -20000, endYear: -8000, region: 'americas', description: 'Initial human migration from Asia' },
        { id: 'americas-neolithic', name: 'Neolithic', year: -8000, endYear: -2000, region: 'americas', description: 'Development of agriculture' },
        { id: 'americas-classical', name: 'Classical Civilizations', year: -2000, endYear: 1492, region: 'americas', description: 'Maya, Aztec, Inca and other civilizations' },
        { id: 'americas-colonial', name: 'Colonial Era', year: 1492, endYear: 1800, region: 'americas', description: 'European colonization' },
        { id: 'americas-modern', name: 'Modern Era', year: 1800, endYear: 2025, region: 'americas', description: 'Independence and modern nations' },
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

        // === PEOPLE - Religious figures (one event per person: most prominent achievement) ===
        { id: 160, title: "Buddha achieves enlightenment", year: -528, entityIds: ['buddhism'], region: "asia", description: "Siddhartha Gautama attains nirvana under the Bodhi tree" },
        { id: 20, title: "Jesus crucified", year: 33, entityIds: ['christianity', 'roman-empire'], region: "europe-middle-east", description: "Crucifixion and resurrection, founding event of Christianity" },
        { id: 30, title: "Mani executed", year: 274, entityIds: ['manichaeism', 'sasanian'], region: "europe-middle-east", description: "Mani executed by Sasanian authorities" },
        { id: 40, title: "Augustine writes Confessions", year: 400, entityIds: ['christianity'], region: "europe-middle-east", description: "Augustine completes his autobiographical work" },
        { id: 51, title: "Hijra to Medina", year: 622, entityIds: ['islam'], region: "europe-middle-east", description: "Muhammad's migration to Medina, start of Islamic calendar" },
        { id: 60, title: "Aquinas writes Summa Theologica", year: 1265, endYear: 1274, entityIds: ['christianity', 'high-middle-ages'], region: "europe-middle-east", description: "Aquinas composes his masterwork of systematic theology" },
        { id: 70, title: "Bahá'u'lláh declares mission", year: 1863, entityIds: ['bahai'], region: "europe-middle-east", description: "Bahá'u'lláh declares himself the Promised One" },

        // === PEOPLE - Political leaders ===
        { id: 170, title: "Alexander conquers Persian Empire", year: -330, entityIds: ['macedon', 'achaemenid'], region: "europe-middle-east", description: "Alexander defeats Darius III, ending Achaemenid Empire" },
        { id: 80, title: "Mongol Empire founded", year: 1206, entityIds: ['mongol'], region: "asia", description: "Temüjin proclaimed Genghis Khan, unifying Mongol tribes" },

        // === PEOPLE - Philosophers and Scientists ===
        { id: 110, title: "Thales predicts solar eclipse", year: -585, entityIds: ['greek-philosophy', 'ancient-greece'], region: "europe-middle-east", description: "Thales allegedly predicts eclipse, demonstrating natural philosophy" },
        { id: 12, title: "Pythagoras born", year: -570, entityIds: ['greek-philosophy', 'ancient-greece'], region: "europe-middle-east", description: "Birth of mathematician and philosopher" },
        { id: 13, title: "Confucius born", year: -551, entityIds: ['confucianism'], region: "asia", description: "Birth of Chinese philosopher" },
        { id: 140, title: "Herodotus writes Histories", year: -440, entityIds: ['ancient-greece', 'classical-antiquity'], region: "europe-middle-east", description: "Herodotus composes first great narrative history" },
        { id: 150, title: "Plato founds the Academy", year: -387, entityIds: ['greek-philosophy', 'ancient-greece'], region: "europe-middle-east", description: "Plato establishes school in Athens" },
        { id: 180, title: "Marcus Aurelius writes Meditations", year: 170, endYear: 180, entityIds: ['stoicism', 'roman-empire'], region: "europe-middle-east", description: "Marcus Aurelius composes personal philosophical writings" },

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

        // === AFRICAN EVENTS ===
        { id: 92, title: "Foundation of Lamu", year: 1370, entityIds: [], region: "subsaharan-africa", description: "Founding of Lamu, major Swahili trading port on the Kenyan coast" },

        // === MORE EUROPEAN EVENTS ===
        { id: 93, title: "Thirty Years' War", year: 1618, endYear: 1648, entityIds: [], region: "europe-middle-east", description: "Devastating religious and political conflict across Central Europe" },
        { id: 94, title: "Treaty of Westphalia", year: 1648, entityIds: [], region: "europe-middle-east", description: "Peace treaties ending Thirty Years' War, established modern state sovereignty" },
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
        { id: 5, title: "Medieval Technology and Social Change", type: "book", author: "Lynn Townsend White Jr.", entityIds: ['early-middle-ages', 'high-middle-ages'], year: 1962, status: "completed", description: "How stirrup, plow, and other inventions transformed medieval society" },
        { id: 6, title: "Two Paths to Prosperity", type: "book", author: "Avner Greif", entityIds: ['song', 'enlightenment'], year: 2025, status: "completed", description: "Comparative institutional analysis of Europe and China, 1000-2000" },
        { id: 7, title: "The Iliad", type: "book", author: "Homer", entityIds: ['ancient-greece', 'classical-antiquity'], year: -800, status: "completed", description: "Ancient Greek epic poem of the Trojan War" },
        { id: 8, title: "The Odyssey", type: "book", author: "Homer", entityIds: ['ancient-greece', 'classical-antiquity'], year: -800, status: "completed", description: "Ancient Greek epic of Odysseus's journey home from Troy" },
        { id: 9, title: "Civilization: The West and the Rest", type: "book", author: "Niall Ferguson", entityIds: ['enlightenment', 'scientific-revolution'], year: 2011, status: "completed", description: "How Western civilization came to dominate the world" },
        { id: 10, title: "The Knowledge Machine", type: "book", author: "Michael Strevens", entityIds: ['scientific-revolution'], year: 2020, status: "completed", description: "How the iron rule of explanation created modern science" },
        { id: 11, title: "Genghis Khan and the Making of the Modern World", type: "book", author: "Jack Weatherford", entityIds: ['mongol'], year: 2004, status: "completed", description: "Revisionist history of the Mongol Empire's global impact" },
        { id: 12, title: "Cro-Magnon", type: "book", author: "Brian M. Fagan", entityIds: ['paleolithic', 'early-humans'], year: 2010, status: "completed", description: "How the Ice Age gave birth to the first modern humans" },
        { id: 13, title: "Unfabling the East", type: "book", author: "Jürgen Osterhammel", entityIds: ['enlightenment'], year: 1998, status: "completed", description: "The Enlightenment's encounter with Asia" },
        { id: 14, title: "Economic And Social History of Medieval Europe", type: "book", author: "Henri Pirenne", entityIds: ['early-middle-ages', 'high-middle-ages'], year: 1933, status: "completed", description: "Classic economic history of medieval Europe" },
        { id: 15, title: "Napoleon: A Concise Biography", type: "book", author: "David A. Bell", entityIds: ['france'], year: 2015, status: "completed", description: "Concise overview of Napoleon's life and legacy" },
        { id: 16, title: "The Rise and Fall of the EAST", type: "book", author: "Yasheng Huang", entityIds: ['song', 'qing', 'prc', 'confucianism'], year: 2023, status: "completed", description: "How exams, autocracy, stability, and technology shaped China" },
        { id: 17, title: "War and Peace", type: "book", author: "Leo Tolstoy", entityIds: ['france'], year: 1869, status: "completed", description: "Epic novel of Russian society during the Napoleonic Wars" },
        { id: 18, title: "Mao: The Unknown Story", type: "book", author: "Jung Chang", entityIds: ['prc'], year: 2002, status: "completed", description: "Controversial biography of Mao Zedong" },
        { id: 19, title: "The Cold War: A World History", type: "book", author: "Odd Arne Westad", entityIds: ['prc'], year: 2017, status: "completed", description: "Comprehensive global history of the Cold War" },
        { id: 20, title: "The Cultural Revolution", type: "book", author: "Frank Dikötter", entityIds: ['prc'], year: 2016, status: "completed", description: "People's history of China's Cultural Revolution, 1962-1976" },
        { id: 21, title: "Mao's Great Famine", type: "book", author: "Frank Dikötter", entityIds: ['prc'], year: 2010, status: "completed", description: "History of China's most devastating catastrophe, 1958-62" },
        { id: 22, title: "Factory Girls", type: "book", author: "Leslie T. Chang", entityIds: ['prc'], year: 2008, status: "completed", description: "Lives of migrant factory workers in Dongguan, China" },
        { id: 23, title: "The Silk Road: A New History", type: "book", author: "Valerie Hansen", entityIds: ['tang', 'buddhism'], year: 2012, status: "completed", description: "Life and trade along the ancient Silk Road" },
        { id: 24, title: "Osman's Dream", type: "book", author: "Caroline Finkel", entityIds: ['ottoman'], year: 2005, status: "completed", description: "Comprehensive history of the Ottoman Empire" },
        { id: 25, title: "The Ottoman Age of Exploration", type: "book", author: "Giancarlo Casale", entityIds: ['ottoman'], year: 2010, status: "completed", description: "Ottoman maritime empire and competition with Portugal" },
        { id: 26, title: "Aristotle's Children", type: "book", author: "Richard E. Rubenstein", entityIds: ['islam', 'christianity', 'greek-philosophy', 'high-middle-ages'], year: 2003, status: "completed", description: "How Christians, Muslims, and Jews rediscovered ancient wisdom" },
        { id: 27, title: "No God but God", type: "book", author: "Reza Aslan", entityIds: ['islam'], year: 2005, status: "completed", description: "Origins, evolution and future of Islam" },
        { id: 28, title: "The House of Wisdom", type: "book", author: "Jim Al-Khalili", entityIds: ['abbasid', 'islam', 'ancient-greece'], year: 2010, status: "completed", description: "How Arabic science saved ancient knowledge and fueled the Renaissance" },
        { id: 29, title: "The Alchemy of Happiness", type: "book", author: "Abu Hamid al-Ghazali", entityIds: ['islam', 'abbasid'], year: 1105, status: "completed", description: "Classic Sufi text on the soul's relationship with God" },
        { id: 30, title: "Seeing Like a State", type: "book", author: "James C. Scott", entityIds: ['enlightenment'], year: 1998, status: "completed", description: "How state simplification schemes have failed" },
        { id: 31, title: "Against the Grain", type: "book", author: "James C. Scott", entityIds: ['sumer', 'neolithic'], year: 2017, status: "completed", description: "Deep history of the earliest states" },
        { id: 32, title: "Conquerors", type: "book", author: "Roger Crowley", entityIds: ['kongo'], year: 2015, status: "completed", description: "How Portugal forged the first global empire" },
        { id: 33, title: "Merchant Kings", type: "book", author: "Stephen R. Bown", entityIds: ['england', 'france'], year: 2009, status: "completed", description: "When trading companies ruled the world, 1600-1900" },
        { id: 34, title: "Owning the Earth", type: "book", author: "Andro Linklater", entityIds: ['enlightenment'], year: 2013, status: "completed", description: "Transforming history of land ownership" },
        { id: 35, title: "Empire of Cotton", type: "book", author: "Sven Beckert", entityIds: ['england'], year: 2014, status: "completed", description: "Global history of cotton and capitalism" },
        { id: 36, title: "A History of the Bible", type: "book", author: "John Barton", entityIds: ['christianity'], year: 2019, status: "completed", description: "Story of the world's most influential book" },
        { id: 37, title: "Mengzi", type: "book", author: "Mencius", entityIds: ['confucianism'], year: -300, status: "completed", description: "Classic Confucian text with traditional commentaries" },
        { id: 38, title: "The Prince", type: "book", author: "Niccolò Machiavelli", entityIds: ['renaissance'], year: 1532, status: "completed", description: "Foundational work of modern political philosophy" },
        { id: 39, title: "On Liberty", type: "book", author: "John Stuart Mill", entityIds: ['enlightenment'], year: 1859, status: "completed", description: "Classic defense of individual freedom and free speech" },
        { id: 40, title: "Voices from the Chinese Century", type: "book", author: "Timothy Cheek", entityIds: ['prc'], year: 2019, status: "completed", description: "Public intellectual debate from contemporary China" },
        { id: 41, title: "Age of Ambition", type: "book", author: "Evan Osnos", entityIds: ['prc'], year: 2014, status: "completed", description: "Chasing fortune, truth, and faith in the new China" },
        { id: 42, title: "The China Dream", type: "book", author: "Joe Studwell", entityIds: ['prc'], year: 2001, status: "completed", description: "The elusive quest for China's greatest untapped market" },
        { id: 43, title: "The Great Transformation", type: "book", author: "Odd Arne Westad", entityIds: ['prc'], year: 2024, status: "completed", description: "China's road from revolution to reform" },
        { id: 44, title: "Chip War", type: "book", author: "Chris Miller", entityIds: ['prc'], year: 2022, status: "completed", description: "The fight for the world's most critical technology" },
        { id: 45, title: "The Subjection of Women", type: "book", author: "John Stuart Mill", entityIds: ['enlightenment'], year: 1869, status: "completed", description: "Argument for gender equality" },
        { id: 46, title: "Apology", type: "book", author: "Plato", entityIds: ['greek-philosophy'], year: -399, status: "completed", description: "Socrates's defense speech at his trial" },
        { id: 47, title: "To Live", type: "book", author: "Yu Hua", entityIds: ['prc'], year: 1992, status: "completed", description: "Novel spanning decades of modern Chinese history" },
        { id: 48, title: "The Selected Poems of Li Po", type: "book", author: "Li Po", entityIds: ['tang'], year: 762, status: "completed", description: "Poetry from China's Tang Dynasty golden age" },
        { id: 49, title: "The Horse, the Wheel, and Language", type: "book", author: "David W. Anthony", entityIds: ['bronze-age'], year: 2007, status: "completed", description: "How Bronze-Age riders from the Eurasian steppes shaped the modern world" },
        { id: 50, title: "Silence", type: "book", author: "Shūsaku Endō", entityIds: ['christianity'], year: 1966, status: "completed", description: "Novel of Jesuit missionaries in 17th-century Japan" },
        { id: 51, title: "The Way of Zen", type: "book", author: "Alan W. Watts", entityIds: ['buddhism'], year: 1957, status: "completed", description: "Introduction to Zen Buddhism's history and practice" },
        { id: 52, title: "Utopia", type: "book", author: "Thomas More", entityIds: ['renaissance', 'england'], year: 1516, status: "completed", description: "Foundational work imagining an ideal society" },
        { id: 53, title: "Laozi's Dao De Jing", type: "book", author: "Lao Tzu", entityIds: ['confucianism'], year: -350, status: "completed", description: "Classic Daoist text on the Way and its power" },
        { id: 54, title: "The Worldly Philosophers", type: "book", author: "Robert L. Heilbroner", entityIds: ['enlightenment'], year: 1953, status: "completed", description: "Lives, times, and ideas of great economic thinkers" },
        { id: 55, title: "Language Families of the World", type: "book", author: "John McWhorter", entityIds: ['early-humans'], year: 2019, status: "completed", description: "Comparing and contrasting all the world's language families" },
        { id: 56, title: "Ancient Writing and the History of the Alphabet", type: "book", author: "John McWhorter", entityIds: ['sumer'], year: 2023, status: "completed", description: "History of writing systems from cuneiform to modern alphabets" },
        { id: 57, title: "How Asia Works", type: "book", author: "Joe Studwell", entityIds: ['prc', 'song'], year: 2013, status: "completed", description: "Success and failure in the world's most dynamic region" },
        { id: 58, title: "The Ottoman Empire (Great Courses)", type: "book", author: "Kenneth W. Harl", entityIds: ['ottoman'], year: 2017, status: "completed", description: "General history of the Ottoman Empire" },
        { id: 59, title: "Turkey: What Everyone Needs to Know", type: "book", author: "Andrew Finkel", entityIds: ['ottoman'], year: 2012, status: "completed", description: "Concise overview of Turkish politics and history" },
        { id: 60, title: "The Silk Roads: A New History of the World", type: "book", author: "Peter Frankopan", entityIds: ['tang', 'mongol', 'ottoman'], year: 2015, status: "completed", description: "World history centered on the Silk Roads" },
        { id: 61, title: "Half a Lifelong Romance", type: "book", author: "Eileen Chang", entityIds: ['roc'], year: 1948, status: "completed", description: "Novel of love and loss in 1930s-40s China" },
        { id: 62, title: "Love in a Fallen City", type: "book", author: "Eileen Chang", entityIds: ['roc'], year: 1943, status: "completed", description: "Short stories of Shanghai and Hong Kong in the 1940s" },
        { id: 63, title: "The Arc of a Covenant", type: "book", author: "Walter Russell Mead", entityIds: ['christianity'], year: 2022, status: "completed", description: "The United States, Israel, and the fate of the Jewish people" },
        { id: 64, title: "The Bourgeois Catholicism vs Capitalism in 18th Century France", type: "book", author: "Bernard Groethuysen", entityIds: ['christianity', 'france', 'enlightenment'], year: 1927, status: "completed", description: "Religion and capitalism in 18th century France" },
    ],

    // ===========================================
    // INSIGHTS - Your synthesis and takeaways
    // Notes that link to societal entities
    // ===========================================
    insights: [],

    // User notes storage (eventId -> notes) - legacy support
    notes: {},

    // Row assignments for custom layout
    rowAssignments: {},

    // User takeaways
    takeaways: [],

    // Quiz history
    quizHistory: []
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
    const numericIds = timelineData.events.map(e => e.id).filter(id => typeof id === 'number' && !isNaN(id));
    return numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
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

// Multi-user display name
function getUsername() {
    return localStorage.getItem('sps-username') || null;
}

function setUsername(name) {
    localStorage.setItem('sps-username', name);
}

function promptForUsername() {
    let name = getUsername();
    if (!name) {
        name = prompt('Welcome to World History Timeline! Enter your display name:');
        if (name && name.trim()) {
            setUsername(name.trim());
        } else {
            setUsername('Anonymous');
        }
    }
    return getUsername();
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
        rowAssignments: timelineData.rowAssignments || {},
        deletedIds: timelineData.deletedIds || [],
        takeaways: timelineData.takeaways || [],
        quizHistory: timelineData.quizHistory || []
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

        // Restore deleted IDs and remove those items from defaults
        if (userData.deletedIds && userData.deletedIds.length > 0) {
            timelineData.deletedIds = userData.deletedIds;
            timelineData.events = timelineData.events.filter(e => !userData.deletedIds.includes(e.id));
            timelineData.entities = timelineData.entities.filter(e => !userData.deletedIds.includes(e.id));
        }

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
                if (e.id == null || !timelineData.events.find(existing => existing.id === e.id)) {
                    if (e.id == null) e.id = getNextEventId();
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

        // Restore takeaways
        if (userData.takeaways) {
            timelineData.takeaways = userData.takeaways;
        }

        // Restore quiz history
        if (userData.quizHistory) {
            timelineData.quizHistory = userData.quizHistory;
        }
    }
}

// Clear saved data (for debugging)
function clearSavedData() {
    if (isServerMode) {
        fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ events: [], entities: [], references: [], insights: [], notes: {}, rowAssignments: {}, deletedIds: [], takeaways: [], quizHistory: [] })
        }).then(() => location.reload());
    } else {
        localStorage.removeItem('worldHistoryTimeline');
        location.reload();
    }
}

// ===========================================
// KNOWLEDGE MAP CATEGORY SYSTEM
// Categories: state, religion, culture, period, event
// ===========================================

// Convert all entities to timeline events and add category to existing events
function initializeTimelineData() {
    // Add all entities (states, religions, cultures) as timeline events
    timelineData.entities.forEach(entity => {
        const entityEvent = {
            id: `entity-${entity.id}`,
            title: entity.name,
            year: entity.year,
            endYear: entity.endYear,
            entityIds: [entity.id],
            category: entity.type, // 'state', 'religion', or 'culture'
            entityType: entity.type,
            region: entity.region,
            description: entity.description,
            isEntity: true
        };

        // Only add if not already present and not deleted by user
        const deleted = timelineData.deletedIds || [];
        if (!timelineData.events.find(e => e.id === entityEvent.id) && !deleted.includes(entityEvent.id)) {
            timelineData.events.push(entityEvent);
        }
    });

    // Add all periods as timeline events
    const deleted = timelineData.deletedIds || [];
    timelineData.periods.forEach(period => {
        const periodEvent = {
            id: `period-${period.id}`,
            title: period.name,
            year: period.year,
            endYear: period.endYear,
            entityIds: [],
            category: 'period',
            entityType: 'period',
            region: period.region,
            description: period.description,
            isPeriod: true
        };

        // Only add if not already present and not deleted by user
        if (!timelineData.events.find(e => e.id === periodEvent.id) && !deleted.includes(periodEvent.id)) {
            timelineData.events.push(periodEvent);
        }
    });

    // All regular events (non-entity, non-period) get category 'event'
    timelineData.events.forEach(event => {
        if (!event.category) {
            event.category = 'event';
        }
    });
}

// initializeTimelineData() is called by app.js after loadData() completes
