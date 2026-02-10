// scripts/data/classes.js
export const classData = [
    { 
        text: "Alchemist", 
        weight: 1, 
        subclass: [
            { text: "Bomber", weight: 1, description: "Specializes in volatile alchemical explosives." },
            { text: "Chirurgeon", weight: 1, description: "Uses alchemy to mend wounds and treat maladies." },
            { text: "Mutagenist", weight: 1, description: "Transmutes their own body through potent mutagens." },
            { text: "Toxicologist", weight: 1, description: "An expert in venoms and debilitating toxins." }
        ] 
    },
    { 
        text: "Animist", 
        weight: 1, 
        subclass: [
            { text: "Liturgist", weight: 1, description: "A ritualistic medium who uses dance and performance to sustain the presence of their apparitions." },
            { text: "Medium", weight: 1, description: "A vessel who allows spirits to fully possess them, gaining martial prowess at the cost of control." },
            { text: "Shaman", weight: 1, description: "Maintains a permanent bond with a spiritual familiar that acts as a bridge to the spirit world." },
            { text: "Seer", weight: 1, description: "A specialized mystic focused on uncovering hidden spirits and warding against malevolent haunts." }
        ] 
    },
    { 
        text: "Barbarian", 
        weight: 4, 
        subclass: [
            { text: "Animal Instinct", weight: 1, description: "Channels the fury of a specific beast." },
            { text: "Dragon Instinct", weight: 1, description: "Draws power from a draconic scion." },
            { text: "Fury Instinct", weight: 1, description: "A pure, unfocused rage." },
            { text: "Giant Instinct", weight: 1, description: "Wields massive weapons far too large for a human." },
            { text: "Spirit Instinct", weight: 1, description: "Guided by ancestral spirits." },
            { text: "Superstition Instinct", weight: 1, description: "A deep-seated distrust of magic." }
        ] 
    },
    { 
        text: "Bard", 
        weight: 4, 
        subclass: [
            { text: "Enigma", weight: 1, description: "Inspired by mystery and hidden knowledge." },
            { text: "Maestro", weight: 1, description: "A master of pure performance and art." },
            { text: "Polymath", weight: 1, description: "Versatile and clever, mastering a wide array of talents." },
            { text: "Warrior", weight: 1, description: "Inspired by the clash of steel; a martial performer." }
        ] 
    },
    { 
        text: "Champion", 
        weight: 2, 
        subclass: [
            { text: "Paladin", weight: 1, description: "A holy defender of Law and Good; punishes those who strike their allies." },
            { text: "Redeemer", weight: 1, description: "A merciful guardian of Neutral Good; seeks to peacefully dissuade enemies." },
            { text: "Liberator", weight: 1, description: "A chaotic champion of freedom; protects others from being restrained." },
            { text: "Tyrant", weight: 1, description: "An enforcer of Lawful Evil; demands absolute obedience." },
            { text: "Desecrator", weight: 1, description: "A champion of Neutral Evil; focuses on self-preservation." },
            { text: "Anti-Paladin", weight: 1, description: "A destructive force of Chaotic Evil; seeks only to cause pain." }
        ] 
    },
    { 
        text: "Cleric", 
        weight: 4, 
        subclass: [
            { text: "War Priest", weight: 1, description: "A battle-hardened servant of the divine, clad in armor and wielding their deity's favored weapon." },
            { text: "Cloistered Cleric", weight: 1, description: "A scholar of the divine who focuses on the casting of powerful spells and sacred lore." }
        ],
        requiresDeity: true 
    },
    { 
        text: "Druid", 
        weight: 2, 
        subclass: [
            { text: "Animal Order", weight: 1, description: "Travels with a loyal animal companion." },
            { text: "Leaf Order", weight: 1, description: "Accompanied by a helpful leshy familiar." },
            { text: "Storm Order", weight: 1, description: "Channels the raw fury of the sky." },
            { text: "Wild Order", weight: 1, description: "A shapeshifter who masters the art of Wild Shape." }
        ] 
    },
    { 
        text: "Fighter", 
        weight: 5, 
        subclass: [
            { text: "Shield Specialist", weight: 1, description: "A defensive bulwark who excels at using a shield to protect themselves and their allies." },
            { text: "Two-Handed Mauler", weight: 1, description: "A powerhouse who wields massive weapons to deal devastating blows and shatter enemy lines." },
            { text: "Duelist", weight: 1, description: "A precise combatant who keeps one hand free for parrying and tactical maneuvers." },
            { text: "Dual-Wielding Dervish", weight: 1, description: "A flurry of steel that uses two weapons simultaneously to overwhelm their opponent’s defenses." },
            { text: "Archer", weight: 1, description: "A master of ranged combat, able to rain arrows down with unmatched speed and accuracy." },
            { text: "Reach Specialist", weight: 1, description: "Wields polearms or spears to control the battlefield and strike enemies before they can close in." }
        ] 
    },
    { 
        text: "Gunslinger", 
        weight: 1, 
        subclass: [
            { text: "Way of the Drifter", weight: 1, description: "Balances a firearm with a melee weapon." },
            { text: "Way of the Pistolero", weight: 1, description: "A flamboyant duelist with one-handed firearms." },
            { text: "Way of the Sniper", weight: 1, description: "A patient killer who remains hidden." },
            { text: "Way of the Vanguard", weight: 1, description: "A front-line brawler who uses heavy firearms." }
        ] 
    },
    { 
        text: "Inventor", 
        weight: 1, 
        subclass: [
            { text: "Armor Innovation", weight: 1, description: "Wears a suit of experimental powered armor, providing enhanced protection or advanced stealth capabilities." },
            { text: "Construct Innovation", weight: 1, description: "Accompanied by a loyal mechanical companion—a customizable robot that fights and evolves alongside its creator." },
            { text: "Weapon Innovation", weight: 1, description: "Wields a singular, heavily modified weapon that can transform or unleash elemental energy in ways no mundane blade could." }
        ] 
    },
    { 
        text: "Investigator", 
        weight: 2, 
        subclass: [
            { text: "Alchemical Sciences", weight: 1, description: "Maintains a collection of quick-brew alchemical tinctures." },
            { text: "Empiricism", weight: 1, description: "A master of pure logic and observation." },
            { text: "Forensic Medicine", weight: 1, description: "Specializes in the study of bodies and wounds." },
            { text: "Interrogation", weight: 1, description: "Excels at breaking down suspects." }
        ] 
    },
    { 
        text: "Kineticist", 
        weight: 1, 
        subclass: [
            { text: "Air Gate", weight: 1, description: "Commands the winds for unmatched mobility, invisibility, and lightning strikes." },
            { text: "Earth Gate", weight: 1, description: "A sturdy defender who creates walls of stone and crushes foes with tectonic force." },
            { text: "Fire Gate", weight: 1, description: "A pure offensive blaster who wreathes the battlefield in consuming flames." },
            { text: "Metal Gate", weight: 1, description: "Manipulates rust and razor-sharp steel to shred armor and cut through defenses." },
            { text: "Water Gate", weight: 1, description: "Controls the flow of tides to push enemies back and provide vital healing to allies." },
            { text: "Wood Gate", weight: 1, description: "Grows defensive thickets and uses life energy to protect and sustain the party." }
        ] 
    },
    { 
        text: "Magus", 
        weight: 1, 
        subclass: [
            { text: "Inexorable Iron", weight: 1, description: "Wields massive two-handed weapons, using magic to become an immovable force on the battlefield." },
            { text: "Laughing Shadow", weight: 1, description: "A deceptive, unarmored combatant who uses speed and teleportation to strike from the peripheral." },
            { text: "Sparkling Targe", weight: 1, description: "A defensive master who infuses their shield with magic to block both steel and spells." },
            { text: "Starlit Span", weight: 1, description: "A rare specialist who can deliver devastating spellstrikes through bows and other ranged weapons." },
            { text: "Twisting Tree", weight: 1, description: "Masters the staff, using magic to extend its reach and transform it into a versatile weapon." }
        ] 
    },
    { 
        text: "Oracle", 
        weight: 1, 
        subclass: [
            { text: "Ancestors Mystery", weight: 1, description: "Voices of the past whisper constantly." },
            { text: "Battle Mystery", weight: 1, description: "An avatar of conflict whose body thrives in battle." },
            { text: "Bones Mystery", weight: 1, description: "Connected to the transition between life and death." },
            { text: "Cosmos Mystery", weight: 1, description: "Filled with the vast, light-bending power of the stars." },
            { text: "Flames Mystery", weight: 1, description: "A conduit for dancing fire." },
            { text: "Life Mystery", weight: 1, description: "A font of healing energy so potent it spills out." },
            { text: "Lore Mystery", weight: 1, description: "Obsessed with all knowledge." },
            { text: "Tempest Mystery", weight: 1, description: "Surrounded by a localized storm of wind and rain." }
        ] 
    },
    { 
        text: "Psychic", 
        weight: 1, 
        subclass: [
            { text: "The Distant Gaze", weight: 1, description: "A master of clairvoyance and telekinesis who can perceive from afar and move objects with thought." },
            { text: "The Infinite Eye", weight: 1, description: "Possesses supernatural foresight and awareness, focusing on guiding allies and predicting enemy movements." },
            { text: "The Oscillating Wave", weight: 1, description: "Manipulates the fundamental energies of heat and cold, shifting rapidly between freezing ice and searing fire." },
            { text: "The Silent Whisper", weight: 1, description: "A telepathic specialist who communicates through direct mental contact and shatters enemy minds with psychic screams." },
            { text: "The Tangible Dream", weight: 1, description: "Converts raw imagination into physical reality, creating shimmering barriers and weapons out of solid thought." },
            { text: "The Unbound Step", weight: 1, description: "Manipulates the distance between things, allowing for rapid movement, teleportation, and spatial distortion." }
        ] 
    },
    { 
        text: "Ranger", 
        weight: 4, 
        subclass: [
            { text: "Flurry Edge", weight: 1, description: "A master of rapid strikes who can attack their hunted prey multiple times with speed and minimal penalty." },
            { text: "Precision Edge", weight: 1, description: "Focuses on a single, devastating opening, dealing extra damage on the first hit each turn." },
            { text: "Outwit Edge", weight: 1, description: "A tactical hunter who uses social pressure and defensive awareness to gain an advantage." }
        ] 
    },
    { 
        text: "Rogue", 
        weight: 5, 
        subclass: [
            { text: "Eldritch Trickster", weight: 1, description: "A thief with a touch of magic." },
            { text: "Mastermind", weight: 3, description: "Uses superior intellect and recall to identify enemy weaknesses." },
            { text: "Ruffian", weight: 6, description: "A heavy-hitting thug who uses brute force." },
            { text: "Scoundrel", weight: 4, description: "A charismatic trickster who uses feints." },
            { text: "Thief", weight: 6, description: "Relies on agility to land precise, deadly strikes." }
        ] 
    },
    { 
        text: "Sorcerer", 
        weight: 2, 
        subclass: [
            { text: "Aberrant", weight: 1, description: "Touched by the Far Realm; specializes in occult magic." },
            { text: "Angelic", weight: 1, description: "Celestial grace grants divine magic." },
            { text: "Demonic", weight: 1, description: "Divine magic focused on destruction and sin." },
            { text: "Diabolic", weight: 1, description: "Divine magic focused on command and hellfire." },
            { text: "Draconic", weight: 1, description: "Arcane magic with elemental breath and scales." },
            { text: "Elemental", weight: 1, description: "Primal magic focused on the elements." },
            { text: "Fey", weight: 1, description: "Primal magic focused on trickery and illusions." },
            { text: "Genie", weight: 1, description: "Arcane magic with diverse elemental traits." },
            { text: "Hag", weight: 1, description: "Occult magic focused on spite and misfortune." },
            { text: "Imperial", weight: 1, description: "Arcane magic focused on pure tradition." },
            { text: "Nymph", weight: 1, description: "Primal magic focused on charm and inspiration." },
            { text: "Psychopomp", weight: 1, description: "Divine magic focused on the cycle of life and death." },
            { text: "Shadow", weight: 1, description: "Occult magic focused on darkness and stealth." },
            { text: "Undead", weight: 1, description: "Divine magic focused on necromancy and decay." }
        ] 
    },
    { 
        text: "Summoner", 
        weight: 2, 
        subclass: [
            { text: "Angelic / Demonic / Diabolic Eidolon", weight: 1, description: "A manifestation of the outer planes; grants access to the Divine spell tradition." },
            { text: "Beast / Plant Eidolon", weight: 1, description: "A primal spirit of the natural world; grants access to the Primal spell tradition." },
            { text: "Construct Eidolon", weight: 1, description: "A mechanical or soul-bound creation; grants access to the Arcane spell tradition." },
            { text: "Dragon Eidolon", weight: 1, description: "A powerful, scaly partner of elemental fury; grants access to the Arcane spell tradition." },
            { text: "Elemental Eidolon", weight: 1, description: "A being of pure air, earth, fire, or water; grants access to the Primal spell tradition." },
            { text: "Fey Eidolon", weight: 1, description: "A trickster spirit from the First World; grants access to the Primal spell tradition." },
            { text: "Phantom Eidolon", weight: 1, description: "The lingering spirit of a deceased or emotional entity; grants access to the Occult spell tradition." }
        ] 
    },
    { 
        text: "Swashbuckler", 
        weight: 3, 
        subclass: [
            { text: "Battledancer", weight: 1, description: "Gains panache by performing captivating dances." },
            { text: "Braggart", weight: 1, description: "Gains panache by demoralizing foes." },
            { text: "Fencer", weight: 1, description: "Gains panache through masterful feints." },
            { text: "Gymnast", weight: 1, description: "Gains panache by using impressive maneuvers." },
            { text: "Wit", weight: 1, description: "Gains panache by using sharp-tongued barbs." }
        ] 
    },
    { 
        text: "Thaumaturge", 
        weight: 1, 
        subclass: [
            { text: "Amulet", weight: 1, description: "A protective charm that creates a proactive barrier against a foe's strikes." },
            { text: "Bell", weight: 1, description: "Uses resonant, supernatural sounds to disrupt enemy actions and weaken their resolve." },
            { text: "Chalice", weight: 1, description: "A vessel of restorative power that can heal wounds or grant temporary vitality." },
            { text: "Lantern", weight: 1, description: "Reveals the unseen, illuminating invisible foes and uncovering hidden secrets." },
            { text: "Mirror", weight: 1, description: "Allows the user to exist in two places at once, blurring the line between reflection and reality." },
            { text: "Regalia", weight: 1, description: "An object of authority that bolsters the morale of allies and commands respect from foes." },
            { text: "Talisman", weight: 1, description: "A versatile tool that can be used to perform diverse utility tasks and ward off harm." },
            { text: "Wand", weight: 1, description: "Channels raw, destructive elemental energy into focused blasts of power." },
            { text: "Weapon", weight: 1, description: "An empowered implement of war that strikes with the weight of symbolic significance." }
        ] 
    },
    { 
        text: "Witch", 
        weight: 1, 
        subclass: [
            { text: "Curse Witch", weight: 1, description: "Serves a patron of spite and misfortune." },
            { text: "Fate Witch", weight: 1, description: "Uses occult magic to weave and unravel the future." },
            { text: "Fervor Witch", weight: 1, description: "Grants access to divine magic." },
            { text: "Night Witch", weight: 1, description: "Utilizes occult magic to haunt the minds of others." },
            { text: "Rune Witch", weight: 1, description: "Masters the arcane tradition through ancient sigils." },
            { text: "Wild Witch", weight: 1, description: "Channels primal magic through their familiar." },
            { text: "Winter Witch", weight: 1, description: "Focuses on ice, snow, and frozen spirits." }
        ] 
    },
    { 
        text: "Wizard", 
        weight: 3, 
        subclass: [
            { text: "School of Ars Grammatica", weight: 1, description: "Focuses on the fundamental building blocks of magic: runes, symbols, and grammar." },
            { text: "School of Battle Magic", weight: 1, description: "A curriculum designed for combat, emphasizing force, protection, and offensive spells." },
            { text: "School of the Boundary", weight: 1, description: "Specializes in the liminal spaces between worlds, conjuration of spirits, and teleportation." },
            { text: "School of Civic Wizardry", weight: 1, description: "Focuses on magic used to build and maintain civilization and architecture." },
            { text: "School of Mentalism", weight: 1, description: "Masters the art of the mind, specializing in illusions and enchantments." },
            { text: "School of Protean Form", weight: 1, description: "Dedicated to the magic of change, focusing on transmutation and shifting matter." }
        ] 
    }
];