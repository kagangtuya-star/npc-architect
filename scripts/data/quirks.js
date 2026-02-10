// scripts/data/quirks.js
export const quirkData = [
    { 
        text: "None", 
        weight: 50, 
        description: "The NPC has no notable physical or mental quirks." 
    },
    { 
        text: "Physical", 
        weight: 15, 
        subclass: [
            { text: "Distinctive Scar", weight: 1, description: "A jagged mark from a past battle or accident that is hard to miss." },
            { text: "Missing Finger", weight: 1, description: "A common injury among laborers or veteran soldiers." },
            { text: "Heterochromia", weight: 1, description: "Eyes of two different colors, often viewed with superstition in the Flanaess." },
            { text: "Limp", weight: 1, description: "Favors one leg, perhaps due to an old wound that never quite healed." },
            { text: "Strong Body Odor", weight: 1, description: "Smells strongly of cheap ale, wet dog, or expensive perfume." },
            { text: "Coughing Fit", weight: 1, description: "A persistent, dry hack that interrupts their speech periodically." },
            { text: "Intricate Tattoos", weight: 1, description: "Markings that denote a criminal past, military service, or tribal affiliation." },
            { text: "Golden Tooth", weight: 1, description: "A flashy bit of dental work that glints whenever they smile." },
            { text: "Trembling Hands", weight: 1, description: "Constant shaking that makes delicate tasks difficult." },
            { text: "Birthmark", weight: 1, description: "A large or uniquely shaped mark on a visible part of their body." }
        ] 
    },
    { 
        text: "Mental", 
        weight: 15, 
        subclass: [
            { text: "Absent-Minded", weight: 1, description: "Frequently forgets names or why they walked into a room." },
            { text: "Superstitious", weight: 1, description: "Spits over their shoulder or touches wood whenever magic is mentioned." },
            { text: "Gullible", weight: 1, description: "Easily believes even the most outrageous lies or rumors." },
            { text: "Obsessive Collector", weight: 1, description: "Has a strange fascination with spoons, buttons, or smooth stones." },
            { text: "Overly Formal", weight: 1, description: "Refuses to use contractions and insists on using full titles for everyone." },
            { text: "Paranoid", weight: 1, description: "Convinced that 'the spies of Iuz' or 'the Guild' are watching their every move." },
            { text: "Compulsive Liar", weight: 1, description: "Tells lies even when the truth would be more beneficial." },
            { text: "Fear of Animals", weight: 1, description: "Becomes visibly distressed and keeps their distance from familiars or pets." },
            { text: "Arrogant", weight: 1, description: "Deeply believes they are the smartest or most important person in any conversation." },
            { text: "Soft Spot", weight: 1, description: "Becomes uncharacteristically kind or generous toward children or the elderly." }
        ] 
    }
];