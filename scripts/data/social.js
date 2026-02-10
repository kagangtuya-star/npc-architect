// scripts/data/socialClass.js
export const socialClassData = [
    { 
        text: "Lower Class", 
        weight: 31, 
        subclass: [
            { text: "Destitute", weight: 1, description: "The invisible poor; beggars, refugees, and the long-term unemployed." },
            { text: "Laborer", weight: 2, description: "Unskilled workers, porters, and farmhands who live hand-to-mouth." },
            { text: "Apprentice / Serf", weight: 2, description: "Those bound by contract or law to a master or a piece of land." }
        ] 
    },
    { 
        text: "Middle Class", 
        weight: 49, 
        subclass: [
            { text: "Tradesperson", weight: 3, description: "Skilled artisans, smiths, and shopkeepers who own their own tools." },
            { text: "Professional", weight: 2, description: "Scribes, lower clergy, and successful merchants with some local influence." },
            { text: "Guildmaster / Burgher", weight: 1, description: "Wealthy citizens who manage trade or hold significant civic positions." }
        ] 
    },
    { 
        text: "Upper Class", 
        weight: 20, 
        subclass: [
            { text: "Gentry", weight: 3, description: "Landowners and minor knights who live comfortably off rents and service." },
            { text: "Noble", weight: 2, description: "Titled aristocracy such as Barons or Viscounts with hereditary power." },
            { text: "High Nobility", weight: 1, description: "The ruling elite; Dukes, Princes, and those who advise the throne directly." }
        ] 
    }
];