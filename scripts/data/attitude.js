// scripts/data/attitude.js
export const attitudeData = [
    { 
        text: "Hostile", 
        weight: 2, 
        subclass: [
            { text: "Angry", weight: 1, description: "Actively aggressive and prone to verbal or physical outbursts." },
            { text: "Hostile", weight: 1, description: "Deeply antagonistic; seeks to oppose the party's goals." }
        ] 
    },
    { 
        text: "Unfriendly", 
        weight: 4, 
        subclass: [
            { text: "Insulting", weight: 1, description: "Mocks the party or uses sharp-tongued barbs to keep them at a distance." },
            { text: "Suspicious", weight: 1, description: "Wary of the party’s motives; expects a trick or betrayal." },
            { text: "Unfriendly", weight: 1, description: "Cold and dismissive; wants the interaction to end quickly." },
            { text: "Sarcastic", weight: 1, description: "Meets every statement with a biting or cynical remark." }
        ] 
    },
    { 
        text: "Indifferent", 
        weight: 8, 
        subclass: [
            { text: "Cautious", weight: 1, description: "Carefully weighing their words; unwilling to commit to a stance." },
            { text: "Content", weight: 1, description: "Satisfied with their current lot and largely unmoved by outside events." },
            { text: "Curious", weight: 1, description: "Interested in the party as a novelty, but not necessarily helpful." },
            { text: "Disinterested", weight: 1, description: "Bored or preoccupied; views the party as a minor distraction." },
            { text: "Distracted", weight: 1, description: "Mind is elsewhere; may require a check just to keep their attention." },
            { text: "Distraught", weight: 1, description: "Overcome by personal grief or stress; hard to engage rationally." },
            { text: "Indifferent", weight: 1, description: "The baseline neutral stance; no strong feelings either way." },
            { text: "Overwhelmed", weight: 1, description: "So busy or stressed that they can barely process the party's presence." }
        ] 
    },
    { 
        text: "Friendly", 
        weight: 4, 
        subclass: [
            { text: "Cheerful", weight: 1, description: "In high spirits; welcomes the party with a genuine smile." },
            { text: "Eager", weight: 1, description: "Visibly excited to talk or assist; may get ahead of themselves." },
            { text: "Friendly", weight: 1, description: "Kind and welcoming; predisposed to think well of the party." },
            { text: "Talkative", weight: 1, description: "Enjoys conversation and may offer up more information than requested." }
        ] 
    },
    { 
        text: "Helpful", 
        weight: 2, 
        subclass: [
            { text: "Gruff", weight: 1, description: "Rough around the edges but ultimately has the party's best interests at heart." },
            { text: "Helpful", weight: 1, description: "Actively looks for ways to assist or provide meaningful resources." }
        ] 
    }
];