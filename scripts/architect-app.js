import { ARCHITECT_DATA } from './data-vault.js'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export class NPCArchitect extends HandlebarsApplicationMixin(ApplicationV2) {
  constructor (options = {}) {
    super(options)
    this.npcData = { level: 1 }
    this.rawTrace = ''
  }

static DEFAULT_OPTIONS = {
    id: 'npc-architect-dashboard',
    tag: 'form',
    window: {
      title: 'Architect v12 | NPC Construction Hub',
      icon: 'fas fa-drafting-compass',
      resizable: true
    },
    position: {
      width: 600,   
      height: 700   
    }
  }

   
  static PARTS = {
    form: {
      template: 'modules/npc-architect/templates/dashboard.hbs'
    }
  }

  async _prepareContext (options) {
    return {
      npcData: this.npcData,
      rawTrace: this.rawTrace,
      jsonOutput: JSON.stringify(this.npcData, null, 2),
      levels: Array.from({ length: 21 }, (_, i) => i)
    }
  }

  _onRender (context, options) {
    const html = $(this.element)

    // Listener for the "Roll" button
    html.find('#reroll-btn').on('click', ev => {
      ev.preventDefault()
      this.generate()
    })

    html.find('#npc-level-input').on('change', ev => {
        this.npcData.level = parseInt(ev.target.value);
        console.log(`Level updated to: ${this.npcData.level}`);
    });

    // Listener for the Level change
    html.find('#create-npc-btn').on('change', ev => {
      this.npcData.level = parseInt(ev.target.value);
    })

html.find('#create-npc-btn').on('click', async ev => {
    ev.preventDefault();
    
    // Ensure we have a level, default to 1 if not set
    const level = this.npcData.level || 1;
    
    ui.notifications.info(`Consulting the archives for a level ${level} NPC...`);

    // Call the generation function (using the logic we perfected)
   await this.generateNPC(this.npcData);
});
  


}

  /**
   * Helper to roll on our ARCHITECT_DATA arrays based on weights
   */
  async _weightedRoll (dataArray) {
    if (!dataArray || dataArray.length === 0) return null
    const totalWeight = dataArray.reduce(
      (acc, item) => acc + (item.weight || 1),
      0
    )
    let roll = Math.random() * totalWeight

    for (const item of dataArray) {
      if (roll < (item.weight || 1)) return item
      roll -= item.weight || 1
    }
    return dataArray[0]
  }

  async generate () {
   // ui.notifications.info('Architect is calculating character DNA...')
    this.rawTrace = ''

    this.npcData = {
      ...this.npcData,
      race: '',
      ethnicity: '',
      nameScript: '',
      class: '',
      subclass: '',
      socialClass: '',
      socialSubclass: '',
      attitude: '',
      attitudeSubclass: '',
      personality: '',
      personalityTrait: '',
      mannerisms: '',
      mannerismSubclass: '',
      quirks: '',
      quirkSubclass: '',
      interests: '',
      interestSubclass: ''
    }

    // Initialize/Clear the DNA object
    this.npcData = {
      ...this.npcData, // Keep the selected level
      race: '',
      age: 0,
      ethnicity: '',
      name: 'New NPC',
      class: '',
      socialClass: '',
      attitude: '',
      mannerisms: '',
      quirks: '',
      interests: '',
      personality: ''
    }

    // 1. Race & Age (From Vault)
    const raceObj = await this._weightedRoll(ARCHITECT_DATA.races)
    this.npcData.race = raceObj?.text ?? 'Unknown Race'

// Ancestry/Ethnicity Logic - FIXED
    if (raceObj?.ancestries && raceObj.ancestries.length > 0) {
      const ancestryObj = await this._weightedRoll(raceObj.ancestries)
      this.npcData.ethnicity = ancestryObj?.text ?? ''
      
      // Look at the sub-race first, then the main race, then default to germanic
      this.npcData.nameScript = ancestryObj?.nameScript || raceObj?.nameScript || 'germanic'
    } else {
      this.npcData.ethnicity = ''
      // No sub-race exists, so use the main race script or default
      this.npcData.nameScript = raceObj?.nameScript || 'germanic'
    }

    const min = raceObj?.minAge ?? 18
    const max = raceObj?.maxAge ?? 80
    const ageRange = Math.max(1, max - min)

    const ageRoll = await new Roll(`1d${ageRange} + ${min}`).evaluate()
    this.npcData.age = ageRoll.total

    const ethTrace = this.npcData.ethnicity
      ? ` [${this.npcData.ethnicity}]`
      : ''
    this.rawTrace += `RACE: ${this.npcData.race}${ethTrace} (${this.npcData.age} yrs)\n`





    // 2. Class Data
    const classObj = await this._weightedRoll(ARCHITECT_DATA.classes)
    this.npcData.class = classObj?.text ?? 'Commoner'

    // --- NEW: Subclass (Instinct, Doctrine, etc.) Logic ---
    if (classObj?.subclass && classObj.subclass.length > 0) {
      const subObj = await this._weightedRoll(classObj.subclass)
      this.npcData.subclass = subObj?.text ?? ''
    } else {
      this.npcData.subclass = ''
    }

    const subTrace = this.npcData.subclass ? ` (${this.npcData.subclass})` : ''
    this.rawTrace += `CLASS: ${this.npcData.class}${subTrace}\n`

    // 3. Social Class
    const socialObj = await this._weightedRoll(ARCHITECT_DATA.socialClasses)
    this.npcData.socialClass = socialObj?.text ?? 'Lower Class'

    // --- NEW: Social Subclass (Profession/Standing) Logic ---
    if (socialObj?.subclass && socialObj.subclass.length > 0) {
      const socialSub = await this._weightedRoll(socialObj.subclass)
      this.npcData.socialSubclass = socialSub?.text ?? ''
    } else {
      this.npcData.socialSubclass = ''
    }

    const socialTrace = this.npcData.socialSubclass
      ? ` (${this.npcData.socialSubclass})`
      : ''
    this.rawTrace += `SOCIAL: ${this.npcData.socialClass}${socialTrace}\n`

    // 4. Personal Details

    // 4.1 Personal Details - Attitude
    const attObj = await this._weightedRoll(ARCHITECT_DATA.attitudes)
    this.npcData.attitude = attObj?.text ?? 'Neutral'

    // --- NEW: Attitude Subclass (Specific Disposition) ---
    if (attObj?.subclass && attObj.subclass.length > 0) {
      const attSub = await this._weightedRoll(attObj.subclass)
      this.npcData.attitudeSubclass = attSub?.text ?? ''
    } else {
      this.npcData.attitudeSubclass = ''
    }

    const attTrace = this.npcData.attitudeSubclass
      ? ` (${this.npcData.attitudeSubclass})`
      : ''
    this.rawTrace += `ATTITUDE: ${this.npcData.attitude}${attTrace}\n`

    // 4.2 Personal Details - Personality
    const perCatObj = await this._weightedRoll(ARCHITECT_DATA.personalities)

    // CHANGE: Use .category because that is what is in your personality.js
    this.npcData.personality = perCatObj?.category ?? 'Average'

    if (perCatObj?.traits && perCatObj.traits.length > 0) {
      const traitObj = await this._weightedRoll(perCatObj.traits)
      this.npcData.personalityTrait = traitObj?.text ?? ''
    } else {
      this.npcData.personalityTrait = ''
    }

    const perTrace = this.npcData.personalityTrait
      ? ` (${this.npcData.personalityTrait})`
      : ''
    this.rawTrace += `PERSONALITY: ${this.npcData.personality}${perTrace}\n`

    // 4.3 Mannerisms
    const manObj = await this._weightedRoll(ARCHITECT_DATA.mannerisms)
    this.npcData.mannerisms = manObj?.text ?? 'None'

    // Handle the nested subclass for Mannerisms
    if (manObj?.subclass && manObj.subclass.length > 0) {
      const manSub = await this._weightedRoll(manObj.subclass)
      this.npcData.mannerismSubclass = manSub?.text ?? ''
    } else {
      this.npcData.mannerismSubclass = ''
    }

    // Update the trace log
    const manTrace = this.npcData.mannerismSubclass
      ? ` (${this.npcData.mannerismSubclass})`
      : ''
    this.rawTrace += `MANNERISM: ${this.npcData.mannerisms}${manTrace}\n`

    // 4.4 Quirks
    const qrkObj = await this._weightedRoll(ARCHITECT_DATA.quirks)
    this.npcData.quirks = qrkObj?.text ?? 'None'

    // Handle the nested subclass for Quirks
    if (qrkObj?.subclass && qrkObj.subclass.length > 0) {
      const qrkSub = await this._weightedRoll(qrkObj.subclass)
      this.npcData.quirkSubclass = qrkSub?.text ?? ''
    } else {
      this.npcData.quirkSubclass = ''
    }

    // Update the trace log
    const qrkTrace = this.npcData.quirkSubclass
      ? ` (${this.npcData.quirkSubclass})`
      : ''
    this.rawTrace += `QUIRK: ${this.npcData.quirks}${qrkTrace}\n`

    // 4.5 Interests
    const intObj = await this._weightedRoll(ARCHITECT_DATA.interests)
    this.npcData.interests = intObj?.text ?? 'None'

    // Handle the nested subclass for Interests
    if (intObj?.subclass && intObj.subclass.length > 0) {
      const intSub = await this._weightedRoll(intObj.subclass)
      this.npcData.interestSubclass = intSub?.text ?? ''
    } else {
      this.npcData.interestSubclass = ''
    }

    // Update the trace log
    const intTrace = this.npcData.interestSubclass
      ? ` (${this.npcData.interestSubclass})`
      : ''
    this.rawTrace += `INTEREST: ${this.npcData.interests}${intTrace}\n`

    this.npcData.attitude = attObj?.text ?? 'Neutral'
    this.npcData.interests = intObj?.text ?? 'None'

    // --- NEW: Generate the name using the script we just found ---
        this.npcData.name = await this._generateName( this.npcData);

    this.render({ force: true })
  }






async _generateName(data) {

    const script = data.nameScript;

    try {
        const module = await import(`../assets/names/${script}.js`);
        const pool = module[`${script}Names`];
        if (!pool) return "Unnamed Traveler";

        let fullName = "Unnamed";

        // 1. DWARVES
        if (script === "dwarf") {
            const isFemale = data.gender === "Female";
            const roll = (arr) => arr[Math.floor(Math.random() * arr.length)];
            let first = isFemale 
                ? roll(pool.f1) + roll(pool.f2) + roll(pool.f3)
                : roll(pool.m1) + roll(pool.m2) + roll(pool.m3);
            const last = roll(pool.s1) + roll(pool.s2);
            fullName = `${first} ${last}`;
        } 
        // 2. ELVES
        else if (script === "elf") {
            const isFemale = data.gender === "Female";
            const roll = (arr) => arr[Math.floor(Math.random() * arr.length)];
            let first = isFemale 
                ? roll(pool.femalePrefix) + roll(pool.femaleSuffix)
                : roll(pool.malePrefix) + roll(pool.maleSuffix);
            let last = Math.random() > 0.5 
                ? roll(pool.s12) + roll(pool.s13)
                : roll(pool.s5) + roll(pool.s6) + roll(pool.s7) + roll(pool.s10) + roll(pool.s11);
            fullName = `${first.charAt(0).toUpperCase() + first.slice(1)} ${last.charAt(0).toUpperCase() + last.slice(1)}`;
              
        } 

        else if (script === "gnome") {
            const isFemale = data.gender === "Female";
            const roll = (arr) => arr[Math.floor(Math.random() * arr.length)];
            const v = pool.vowels;
            const bridge = pool.c12;
            
            let name = "";
            const typeRoll = Math.random(); // To simulate the i < 5, i < 7 logic

            if (isFemale) {
                if (typeRoll < 0.5) { // Short
                    name = roll(pool.f5) + roll(v) + roll(pool.f6) + roll(v) + roll(pool.f7);
                } else { // Long
                    name = roll(pool.f5) + roll(v) + roll(bridge) + roll(v) + roll(pool.f6) + roll(v) + roll(pool.f7);
                }
            } else {
                if (typeRoll < 0.5) { // Short
                    name = roll(pool.m1) + roll(v) + roll(pool.m3) + roll(v) + roll(pool.m4);
                } else { // Long
                    name = roll(pool.m1) + roll(v) + roll(pool.m11) + roll(v) + roll(pool.m3) + roll(v) + roll(pool.m4);
                }
            }
            fullName = name.charAt(0).toUpperCase() + name.slice(1);
        }

        else if (script === "orc") {
            const isFemale = data.gender === "Female";
            const targetList = isFemale ? pool.female : pool.male;
            
            // Just grab a random name from the flat list
            const name = targetList[Math.floor(Math.random() * targetList.length)];
            fullName = name; // Orks in this list don't use surnames
        }

        else if (script === "halfling") {
            const isFemale = data.gender === "Female";
            const roll = (arr) => arr[Math.floor(Math.random() * arr.length)];
            
            // First Name
            let first = isFemale 
                ? roll(pool.f1) + roll(pool.f2)
                : roll(pool.m1) + roll(pool.m2);
                
            // Compound Surname
            let sPart1 = roll(pool.s1);
            let sPart2 = roll(pool.s2);
            
            // Safety check to prevent "Hillhill"
            while (sPart1 === sPart2) {
                sPart2 = roll(pool.s2);
            }
            
            fullName = `${first.charAt(0).toUpperCase() + first.slice(1)} ${sPart1.charAt(0).toUpperCase() + sPart1.slice(1)}${sPart2}`;
        }


        // 3. STANDARD (Arabic, Latin, Native American, etc.)
        else {
            const isFemale = data.gender === "Female" || Math.random() > 0.5;
            const targetList = isFemale ? pool.female : pool.male;
            const firstRoll = await this._weightedRoll(targetList);
            fullName = firstRoll?.text ?? "Unnamed";

            if (pool.surnames && pool.surnames.length > 0) {
                const lastRoll = await this._weightedRoll(pool.surnames);
                fullName += ` ${lastRoll.text}`;
            }
        }

        return fullName;

    } catch (err) {
        console.error(`Architect | Dynamic load failed:`, err);
        return `Unnamed ${data.ethnicity || "NPC"}`;
    }
}

async _copyDNAToClipboard(button) {
    const data = this.npcData;
    
    // Construct the string for the AI to read
    const copyString = `
Pathfinder 2e NPC DNA Profile:
Name: ${data.name}
Level: ${data.level}
Race: ${data.ethnicity} ${data.race}
Age: ${data.age}
Class: ${data.class} ${data.subclass ? `(${data.subclass})` : ''}
Social: ${data.socialClass} ${data.socialSubclass ? `(${data.socialSubclass})` : ''}
Attitude: ${data.attitude} ${data.attitudeSubclass ? `(${data.attitudeSubclass})` : ''}
Personality: ${data.personality} ${data.personalityTrait ? `(${data.personalityTrait})` : ''}
Mannerisms: ${data.mannerisms} ${data.mannerismSubclass ? `(${data.mannerismSubclass})` : ''}
Quirks: ${data.quirks} ${data.quirkSubclass ? `(${data.quirkSubclass})` : ''}
Interests: ${data.interests} ${data.interestSubclass ? `(${data.interestSubclass})` : ''}
    `.trim();

    try {
      await navigator.clipboard.writeText(copyString);
      ui.notifications.info(`DNA for ${data.name} copied to clipboard!`);
      
      // Visual feedback on the button
      const $btn = $(button);
      const originalText = $btn.html();
      $btn.html('<i class="fas fa-check"></i> Copied!');
      setTimeout(() => $btn.html(originalText), 2000);
    } catch (err) {
      ui.notifications.error("Failed to copy to clipboard.");
      console.error(err);
    }
  }


async generateNPC(npcData) {
    // 1. Get the Key from Settings
    const API_KEY = game.settings.get("npc-architect", "geminiApiKey")?.trim();

    if (!API_KEY) {
        return ui.notifications.error("NPC Architect: No API Key found!");
    }

    // Pull the model from settings, fallback to the preview if for some reason the setting is empty
    const MODEL = game.settings.get("npc-architect", "geminiModel")?.trim() || "gemini-3-flash-preview";

    // Using the key in the URL for better stability as we discussed
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;


    const html = $(this.element);
    const instructionText = html.find('#npc-input-editor').val();
    const targetLevel = parseInt(html.find('#npc-level-input').val()) || 1;

    if (!instructionText) {
        return ui.notifications.warn("The drafting table is empty! Roll DNA or type instructions first.");
    }

    // 2. Build the Request (Your specialized logic remains untouched)
    const npcRequest = `
        COMMAND: Create a Level ${targetLevel} Pathfinder 2e NPC.
        
        ANALYSIS STEP (How to interpret the SOURCE TEXT):
        1. If you see "Mannerisms", "Quirks", or "Interests", these are Persona DNA traits.
        2. If you see "AC", "HP", "Str 14 (+2)", or "HD", this is a Statblock Conversion from another game.
        3. If the text is a simple sentence, it is a General Generation request.

        DIRECTIONS:
        - Prioritize user data over data you create.
        - If converting a statblock, ignore the original system's math and use PF2e math using the NPC's Level.
        - Provide full stats, spells and the proper spell tradition for the class, and real equipment (no kits).
        - In the 'blurb', use: Ethnicity Race Class (Subclass)
        - Ensure the NPC returned makes sense thematically.
        - If the NPC has a valid PF2E class, create level appropriate abilities similar to the PF2E class possesses.
        """
        ${instructionText}
        """

        Return ONLY the JSON object.
    `;

    const systemInstruction = `You are an expert Pathfinder 2e NPC Creator. Return ONLY a JSON object. 
    IMPORTANT: Do NOT include "Kits" (like Adventurer's Pack). Use individual items.
    Only add senses if the specific race/ancestry possesses them.

    Schema: { 
      "name": "String", "level": ${targetLevel}, "traits": ["humanoid", "human"], "hp": Number, "ac": Number, "perception": Number, "speed": 25,
      "description": "HTML String for DNA Profile",
      "saves": { "fort": Number, "ref": Number, "will": Number },
      "attributes": { "str": Number, "dex": Number, "con": Number, "int": Number, "wis": Number, "cha": Number },
      "skills": { "skill_key": Number },
      "senses": ["String"],
      "immunities": ["String"], "weaknesses": [{"type": "String", "value": Number}], "resistances": [{"type": "String", "value": Number}],
      "attacks": [{"name": "String", "bonus": Number, "damage": "String", "damageType": "String", "traits": ["String"], "type": "melee"}],
      "inventoryNames": ["String"],
      "spellNames": ["String"],
      "blurb": "Ethnicity Race Class (Subclass)",
      "spellAbility": "cha", "spellTradition": "occult",
      "abilities": [{"name": "String", "actionType": "action, passive, or reaction", "text": "Full description"}]
    }
    IMPORTANT: For attack damageType, use ONLY 'bludgeoning', 'piercing', 'slashing', 'fire', 'cold', 'electricity', 'acid', 'sonic', 'force', 'mental', 'poison', 'spirit', 'vitality', or 'void'.`;

    try {
        ui.notifications.info(`Architecting level ${targetLevel} NPC...`);

        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: systemInstruction }] },
                contents: [{ parts: [{ text: npcRequest }] }],
                generationConfig: { 
                    response_mime_type: "application/json",
                    // THE FIX: Nesting the thinking_config correctly
                    thinking_config: {
                        thinking_level: "MINIMAL"
                    }
                }
            })
        });

        const data = await response.json();
        
        // Safety check for the "Expired" or "Invalid" errors
        if (data.error) {
            console.error("Gemini API Error:", data.error);
            return ui.notifications.error(`API Error: ${data.error.message}`);
        }

        const npc = JSON.parse(data.candidates[0].content.parts[0].text);

        // --- FOLDER LOGIC ---
        let folder = game.folders.find(f => f.name === "NPC Architect" && f.type === "Actor");
        if (!folder) {
            folder = await Folder.create({
                name: "NPC Architect",
                type: "Actor",
                color: "#4a148c"
            });
        }

        // --- SKILL PROCESSING ---
        const coreSkillNames = ["acrobatics", "arcana", "athletics", "crafting", "deception", "diplomacy", "intimidation", "medicine", "nature", "occultism", "performance", "religion", "society", "stealth", "survival", "thievery"];
        let skillData = {};
        let finalItems = [];

        Object.entries(npc.skills).forEach(([s, v]) => {
            const lowName = s.toLowerCase();
            if (coreSkillNames.includes(lowName)) {
                skillData[lowName] = { base: v };
            } else {
                const loreName = s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
                finalItems.push({ name: loreName, type: "lore", system: { mod: { value: v } } });
            }
        });

        // 1. Create Actor
        const actor = await Actor.create({
            name: npc.name,
            type: "npc",
            folder: folder.id, 
            system: {
                details: { level: { value: npc.level }, publicNotes: npc.description, blurb: npc.blurb },
                traits: { value: npc.traits },
                perception: { 
                    mod: npc.perception, 
                    senses: npc.senses ? npc.senses.map(s => ({ type: s.toLowerCase().replace(/\s+/g, ''), label: s })) : [] 
                },
                skills: skillData, 
                attributes: { 
                    hp: { value: npc.hp, max: npc.hp }, 
                    ac: { value: npc.ac },
                    immunities: npc.immunities,
                    weaknesses: npc.weaknesses,
                    resistances: npc.resistances
                },
                saves: { fortitude: { value: npc.saves.fort }, reflex: { value: npc.saves.ref }, will: { value: npc.saves.will } },
                abilities: { 
                    str: { mod: npc.attributes.str }, dex: { mod: npc.attributes.dex }, con: { mod: npc.attributes.con }, 
                    int: { mod: npc.attributes.int }, wis: { mod: npc.attributes.wis }, cha: { mod: npc.attributes.cha } 
                }
            }
        });

        // 2. GEAR SEARCH
        const gearPacks = ["pf2e.equipment-srd", "pf2e.weapons-srd", "pf2e.armor-srd"];
        for (const pName of gearPacks) {
            const pack = game.packs.get(pName);
            if (!pack) continue;
            const index = await pack.getIndex({fields: ["name", "type"]});
            for (const itemName of npc.inventoryNames) {
                const found = index.find(i => i.name.toLowerCase() === itemName.toLowerCase());
                if (found && found.type !== "kit") { 
                    const doc = await pack.getDocument(found._id);
                    const itemData = doc.toObject();
                    if (itemData.type === "armor" || itemData.type === "weapon") itemData.system.equipped = { value: true };
                    finalItems.push(itemData);
                }
            }
        }

        // 3. SPELLS
        if (npc.spellNames?.length > 0) {
            const spellcastingEntry = {
                name: `${npc.spellTradition.charAt(0).toUpperCase() + npc.spellTradition.slice(1)} Spontaneous`,
                type: "spellcastingEntry",
                system: {
                    ability: { value: npc.spellAbility },
                    tradition: { value: npc.spellTradition },
                    prepared: { value: "spontaneous" },
                    slots: { slot1: { value: 3, max: 3 }, slot2: { value: 3, max: 3 } }
                }
            };
            const [createdEntry] = await actor.createEmbeddedDocuments("Item", [spellcastingEntry]);
            const spellPack = game.packs.get("pf2e.spells-srd");
            if (spellPack) {
                const spellIndex = await spellPack.getIndex({fields: ["name"]});
                for (const sName of npc.spellNames) {
                    const found = spellIndex.find(s => s.name.toLowerCase() === sName.toLowerCase());
                    if (found) {
                        const spell = await spellPack.getDocument(found._id);
                        const spellData = spell.toObject();
                        spellData.system.location.value = createdEntry.id;
                        finalItems.push(spellData);
                    }
                }
            }
        }

        // 4. ATTACKS & ABILITIES
        npc.attacks.forEach(a => {
            let safeType = a.damageType.toLowerCase() === 'precision' ? 'piercing' : a.damageType;
            finalItems.push({ 
                name: a.name, type: "melee", 
                system: { bonus: { value: a.bonus }, damageRolls: { "0": { damage: a.damage, damageType: safeType } }, weaponTraits: { value: a.traits } } 
            });
        });

        if (npc.abilities) {
            npc.abilities.forEach(ab => finalItems.push({ 
                name: ab.name, type: "action", system: { actionType: { value: ab.actionType }, description: { value: ab.text } } 
            }));
        }

        await actor.createEmbeddedDocuments("Item", finalItems);
        ui.notifications.info(`Architect successfully created ${npc.name} in the NPC Architect folder.`);

    } catch (e) {
        ui.notifications.error("NPC Architecture failed. See console.");
        console.error(e);
    }
}


}
