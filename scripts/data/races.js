// scripts/data/races.js
export const raceData = [
    { 
        text: "Human", 
        weight: 85, 
        ageFormula: "1d50+20", 
        nameScript: "human",
        ancestries: [
            { text: "Suloise", weight: 12, nameScript: "germanic", description: "Pale skin (albinism common), violet/pale blue eyes, fair kinky hair." },
            { text: "Flannae", weight: 6, nameScript: "native_american", description: "Bronze complexion, dark eyes, wavy/curly black hair, angular features." },
            { text: "Oeridian", weight: 12, nameScript: "latin", description: "Tan to olive skin, athletic build, prototypical human appearance." },
            { text: "Rhennee", weight: 6, nameScript: "romani", description: "Tan/olive skin, blue/gray/hazel eyes, curly black or dark brown hair." },
            { text: "Baklunish", weight: 6, nameScript: "arabic", description: "Golden skin, dark hair, green or hazel eyes (jade-green is prized)." }
        ]
    },
    { 
        text: "Dwarf", 
        weight: 5, 
        ageFormula: "1d211+39", 
        nameScript: "dwarf",
        ancestries: [
            { text: "Hill Dwarf", weight: 75,  description: "Deep tan to light brown skin, ruddy cheeks. Brown, black, or gray hair. Stocky and muscular." },
            { text: "Mountain Dwarf", weight: 21, description: "Paler skin than hill dwarves. Tall for their race, very sturdy. Hair is often lighter browns or reds." },
            { text: "Duergar", weight: 4,  description: "Dull gray skin and hair. Pale, oversized eyes. Reclusive and grim dwellers of the deep Underdark." }
        ]
    },
    { 
        text: "Elf", 
        weight: 8, 
        ageFormula: "1d241+109", 
        nameScript: "elf",
        ancestries: [
            { text: "Gray Elf", weight: 50, description: "Silver hair and amber eyes, or gold hair and violet eyes. Very pale skin. Most reclusive and scholarly." },
            { text: "High Elf", weight: 25,  description: "Dark hair (usually black or brown) and green eyes. Pale skin with a slight copper hue." },
            { text: "Wild Elf", weight: 10,  description: "Coppery-brown skin with a greenish tinge. Dark brown or light hazel eyes. Hair ranges from black to light brown." },
            { text: "Wood Elf", weight: 14,  description: "Yellow to coppery-red skin. Hair is often yellow, copper-red, or even light brown. Green or hazel eyes." },
            { text: "Drow", weight: 1,  description: "Obsidian-black skin. White or pale yellow hair. Pale red, lavender, or white eyes. Dwellers of the deep Underdark." }
        ]
    },
    { 
        text: "Gnome", 
        weight: 5, 
        ageFormula: "1d100+40", 
        nameScript: "gnome",
        ancestries: [
            { text: "Surface Gnome", weight: 95, description: "Wood-brown to grayish-brown skin. Hair is often white or gray. Large, bright eyes (often blue or hazel). Short, slight, and animated." },
            { text: "Svirfneblin", weight: 5, description: "Medium-gray to brownish-gray skin. Large, pale, pupilless eyes. Naturally bald. Reclusive and stoic deep-dwellers." }
        ]
    },
    { 
        text: "Half-Elf", 
        weight: 8, 
        ageFormula: "1d100+30", 
        nameScript: "elf", 
        ancestries: [
            { text: "Half-Elf", weight: 1, nameScript: "elf", description: "Slightly taller than humans but with elven grace. Ears are pointed. Eyes are often striking emerald or violet." }
        ] 
    },
    { 
        text: "Half-Orc", 
        weight: 6, 
        ageFormula: "1d50+20", 
        nameScript: "orc", 
        ancestries: [
            { text: "Pomarj-Born", weight: 5, description: "Deep olive skin with heavy scarring. Stocky, powerful build. Often found as mercenaries." },
            { text: "Iuzite-Caste", weight: 3, description: "Dull grey skin and yellowish eyes. Taller and leaner. Often bear ritual brands or tattoos." },
            { text: "Highlands Half-Orc", weight: 2, description: "Skin closer to a tanned human tone. Smaller tusks, easily passing for human in dim light." }
        ] 
    },
    { 
        text: "Halfling", 
        weight: 5, 
        ageFormula: "1d81+19", 
        nameScript: "halfling",
        ancestries: [
            { text: "Lightfoot", weight: 3, nameScript: "halfling", description: "Ruddy complexion. Hair is usually dark brown and curly. Athletic, small, and prone to wanderlust." },
            { text: "Tallfellow", weight: 1, nameScript: "halfling", description: "Fairer skin and hair than Lightfoots. Taller and slimmer; often mistaken for young elves at a distance." }
        ]
    }
];