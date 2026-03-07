// ==========================================
// ФАЙЛ З КОНСТАНТАМИ ТА ДАНИМИ
// ==========================================

// --- 1. СПИСОК СЛІВ ТА КООРДИНАТИ (СЛАЙД 2) ---
const pairedProblemsList = [
    ["esclavage", "Sklaverei"], ["violence reproductive", "reproduktive Gewalt"],
    ["dépendance énergétique", "Energieabhängigkeit"], ["guerre", "Krieg"],
    ["désinformation", "Desinformation"], ["propagande", "Propaganda"],
    ["autoritarisme", "Autoritarismus"], ["environnement toxique", "toxische Umgebung"],
    ["pénurie de ressources", "Ressourcenknappheit"], ["surveillance numérique", "digitale Überwachung"],
    ["artificialité", "Künstlichkeit"], ["isolement", "Isolation"],
    ["inflation", "Inflation"], ["crise de la foi", "Glaubenskrise"]
];

const coords = [
    [50, 10], [20, 16], [26, 35], [7, 48], [65, 23], [86, 14], [82, 40],
    [50, 50], [24, 65], [30, 85], [72, 62], [92, 58], [55, 76], [80, 85]
];

// --- 2. ДАНІ ДЛЯ АНІМАЦІЇ ANGST (СЛАЙДИ 6-7) ---
const angstData = [
    { x: 100, y: 50.5, size: 10.3, transform: "" }, { x: 31.4, y: 77.5, size: 12.3, transform: "" },
    { x: 6.7, y: 96.4, size: 8.8, transform: "scale(1.49, 1)" }, { x: 26.7, y: 6.8, size: 3.8, transform: "scale(2.46, 1)" },
    { x: 17.2, y: 32.1, size: 6.3, transform: "" }, { x: 2.9, y: 33.3, size: 6.4, transform: "rotate(-24.1deg)" },
    { x: -4.1, y: 50.5, size: 10.3, transform: "" }, { x: -2.8, y: 9.2, size: 8.9, transform: "" },
    { x: 57.9, y: 39.7, size: 15.2, transform: "" }, { x: 74.1, y: 54.3, size: 8.4, transform: "" },
    { x: 79.9, y: 96.8, size: 5.8, transform: "" }, { x: 84.5, y: 84.0, size: 21.4, transform: "" },
    { x: 51.0, y: 92.4, size: 9.1, transform: "" }, { x: 71.3, y: 76.1, size: 11.3, transform: "scale(0.38, 1)" },
    { x: 28.0, y: 22.2, size: 9.7, transform: "" }, { x: 9.6, y: 62.6, size: 5.6, transform: "" },
    { x: 2.0, y: 78.6, size: 8.5, transform: "" }, { x: 93.4, y: 2.9, size: 10.7, transform: "rotate(-180deg)" },
    { x: 38.3, y: 36.8, size: 5.5, transform: "" }
];

// --- 3. БАЗА ДАНИХ: ЗДОБУТІ СТРАХИ ТА ХВОРОБИ (Erworbene) ---

// Об'єкт, який пов'язує ID кожної локації з тим, що вона додає гравцю
const acquiredData = {
    // Регіони
    'slide-9': { // Ewiger Winter
        fears: ["Angst vor Kälte"],
        gebrechen: ["Haltungsschäden (Kyphose)", "Vasomotorische Rhinitis"]
    },
    'slide-10': { // Ewiger Herbst
        fears: ["Angst vor Fremden", "Angst vor Isolation"],
        gebrechen: ["Neurodermitis (stressbedingte Ekzeme)", "Reizdarmsyndrom"]
    },
    'slide-11': { // Ewiger Sommer
        fears: ["Angst vor der Sonne"],
        gebrechen: ["Osteomalazie (Vitamin-D-Mangel)"]
    },
    'slide-12': { // Ewiger Frühling
        fears: [], // За твоїм списком тут пусто
        gebrechen: []
    },
    'slide-13': { // Halbautonome Zone
        fears: ["Angst vor Geheimdiensten"],
        gebrechen: ["Gardner-Diamond Syndrom"]
    },

    // Підлокації
    'slide-zentrum': { 
        fears: ["Angst vor Überwachung", "Angst vor Autorität"],
        gebrechen: ["Zwangsstörungen", "Insomnie", "Chronischer Spannungskopfschmerz"]
    },
    'slide-delta': { 
        fears: ["Angst vor Verdinglichung", "Angst vor Ärzten"],
        gebrechen: ["Iatrophobie-bedingte Verschleppung", "Somatoforme Autonome Funktionsstörung"]
    },
    'slide-arkateion': { 
        fears: ["Angst vor Obsoleszenz", "Angst vor sich selbst"],
        gebrechen: ["Nebennierenschöpfung", "Spannungsbedingter Haarausfall (Alopecia areata)", "Hashimoto-Thyreoiditis"]
    },
    'slide-quartier': { 
        fears: ["Angst vor Dunkelheit", "Angst vor dem Hunger"],
        gebrechen: ["Myopie (Kurzsichtigkeit)", "Dysbiose (Mikrobiom-Verarmung)"]
    },
    'slide-summer-hauptstadt': { 
        fears: ["Angst vor dem Krieg", "Angst vor lauten Geräuschen"],
        gebrechen: ["Bruxismus", "Stressinduziertes Ulkus (Magengeschwür)"]
    },
    'slide-summer-generalstab': { 
        fears: ["Angst vor der Wahrheit"],
        gebrechen: ["Gallensteine"]
    },
    'slide-kurilen': { 
        fears: ["Angst vor Vertreibung", "Angst vor dem Tod"],
        gebrechen: ["Parodontitis"]
    },
    'slide-volkerkreuzer': { 
        fears: ["Angst vor Höhe", "Angst vor künstliche Intelligenz"],
        gebrechen: ["Karpaltunnelsyndrom", "Depersonalisationssyndrom"]
    },
    'slide-autonom-waffenfabrik': { 
        fears: ["Angst vor Versklavung", "Angst vor Unfällen"],
        gebrechen: ["Psychogener Tremor", "Asthma"]
    }
};

// Змінна (Set), яка буде запам'ятовувати, які локації вже відвідав гравець. 
// Set гарантує, що кожна локація запишеться лише один раз.
let visitedLocations = new Set();