// scripts/data/personality.js
export const personalityData = [
    { 
        category: "Social Standing",
        traits: [
            { text: "Arrogant", weight: 1, description: "Believes themselves superior to others in every way." },
            { text: "Modest", weight: 1, description: "Downplays their own achievements and importance." }
        ]
    },
    { 
        category: "Social Interaction",
        traits: [
            { text: "Tactless", weight: 1, description: "Blunt to a fault; often offends others without meaning to." },
            { text: "Diplomatic", weight: 1, description: "Careful with words; seeks to maintain harmony in conversation." },
            { text: "Introverted", weight: 1, description: "Quiet and reserved; finds social interaction draining." },
            { text: "Outgoing", weight: 1, description: "Energetic and friendly; loves being the center of attention." }
        ]
    },
    { 
        category: "Morality & Ethics",
        traits: [
            { text: "Honorable", weight: 1, description: "Follows a strict personal code of conduct and keeps their word." },
            { text: "Deceitful", weight: 1, description: "Willing to lie and manipulate to get what they want." },
            { text: "Compassionate", weight: 1, description: "Deeply feels the suffering of others and seeks to help." },
            { text: "Indifferent", weight: 1, description: "Unmoved by the plight of others; strictly neutral." },
            { text: "Cruel", weight: 1, description: "Finds satisfaction in the misfortune or pain of others." }, // NEW
            { text: "Kind", weight: 1, description: "Naturally helpful and warm-hearted toward strangers." } // NEW
        ]
    },
    { 
        category: "Disposition",
        traits: [
            { text: "Brave", weight: 1, description: "Willing to face danger head-on despite the risks." },
            { text: "Cowardly", weight: 1, description: "Avoids conflict and danger at all costs; easily intimidated." },
            { text: "Optimist", weight: 1, description: "Always looks for the silver lining in every situation." },
            { text: "Pessimist", weight: 1, description: "Expects the worst and focuses on what could go wrong." },
            { text: "Calm", weight: 1, description: "Unshakable and level-headed, even in a crisis." },
            { text: "Nervous", weight: 1, description: "Anxious and jumpy; easily startled by unexpected events." },
            { text: "Stoic", weight: 1, description: "Hides all emotion behind a mask of indifference." }, // NEW
            { text: "Emotional", weight: 1, description: "Wears their heart on their sleeve; reacts purely on feeling." } // NEW
        ]
    },
    { 
        category: "Outlook & Motivation",
        traits: [
            { text: "Driven", weight: 1, description: "Possesses a singular goal that they pursue with intensity." },
            { text: "Lazy", weight: 1, description: "Does the absolute bare minimum required to get by." },
            { text: "Trusting", weight: 1, description: "Assumes the best of people until proven otherwise." },
            { text: "Suspicious", weight: 1, description: "Wary of everyone; assumes everyone has an ulterior motive." }
        ]
    },
    { 
        category: "Lifestyle",
        traits: [
            { text: "Aesthetic", weight: 1, description: "Values beauty and art above practical or material concerns." },
            { text: "Materialistic", weight: 1, description: "Focuses on wealth, status, and physical possessions." },
            { text: "Cheap", weight: 1, description: "Frugal to a fault; hates spending a single copper." },
            { text: "Wastrel", weight: 1, description: "Spends money as soon as they get it; lives for the moment." },
            { text: "Tidy", weight: 1, description: "Keeps their appearance and surroundings immaculately clean." },
            { text: "Messy", weight: 1, description: "Disorganized and disheveled; pays no mind to order." }
        ]
    },
    { 
        category: "Faith",
        traits: [
            { text: "Pious", weight: 1, description: "Devoutly religious; follows the tenets of their faith closely." },
            { text: "Irreligious", weight: 1, description: "Skeptical or indifferent toward the gods and organized religion." }
        ]
    }
];