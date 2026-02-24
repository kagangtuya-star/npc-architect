import { NPCArchitectConnectionMenu } from './settings-connection-menu.js';
Hooks.once("init", () => {
    const isGM = game.data.users.find(u => u._id === game.data.userId)?.role >= 4;

    game.settings.registerMenu("npc-architect", "connectionTestMenu", {
        name: "Architect: AI Connection Test",
        label: "Open Tester",
        hint: "Open a small utility window to test current AI provider configuration.",
        icon: "fas fa-plug",
        type: NPCArchitectConnectionMenu,
        restricted: true
    });

    game.settings.register("npc-architect", "aiProvider", {
        name: "Architect: AI Provider",
        hint: "Choose which protocol to use for NPC generation.",
        scope: "world",
        config: isGM, // Only shows in the menu for GMs
        type: String,
        default: "gemini",
        choices: {
            gemini: "Google Gemini (Native)",
            openai: "OpenAI Compatible (Chat Completions)"
        }
    });

    game.settings.register("npc-architect", "outputLanguage", {
        name: "Architect: Output Language",
        hint: "Language for AI-generated textual fields. 'Auto' follows Foundry's current language.",
        scope: "world",
        config: isGM, // Only shows in the menu for GMs
        type: String,
        default: "auto",
        choices: {
            auto: "Auto (Use Foundry Language)",
            en: "English",
            zhHans: "Chinese (Simplified)",
            zhHant: "Chinese (Traditional)",
            ja: "Japanese",
            ko: "Korean",
            es: "Spanish",
            fr: "French",
            de: "German",
            it: "Italian",
            pt: "Portuguese",
            ru: "Russian"
        }
    });

    game.settings.register("npc-architect", "outputLanguageCustom", {
        name: "Architect: Output Language Custom (Optional)",
        hint: "If set, this custom language value overrides the output language dropdown.",
        scope: "world",
        config: isGM, // Only shows in the menu for GMs
        type: String,
        default: ""
    });

    game.settings.register("npc-architect", "geminiApiKey", {
        name: "Architect: Gemini API Key",
        hint: "Enter your Google Gemini API key. This is stored locally on your client.",
        scope: "client",
        config: isGM, // Only shows in the menu for GMs
        type: String,
        default: "",
        password: true
    });

    game.settings.register("npc-architect", "geminiModel", {
        name: "Architect: Gemini Model",
        hint: "Select the Gemini model used when provider is set to Gemini.",
        scope: "world",
        config: isGM, // Only shows in the menu for GMs
        type: String,
        default: "gemini-2.5-flash",
        choices: {
            "gemini-2.5-flash": "gemini-2.5-flash",
            "gemini-2.5-pro": "gemini-2.5-pro",
            "gemini-2.0-flash": "gemini-2.0-flash",
            "gemini-1.5-pro": "gemini-1.5-pro"
        }
    });

    game.settings.register("npc-architect", "geminiModelCustom", {
        name: "Architect: Gemini Custom Model (Optional)",
        hint: "If set, this manual model name overrides the Gemini dropdown selection.",
        scope: "world",
        config: isGM, // Only shows in the menu for GMs
        type: String,
        default: ""
    });

    game.settings.register("npc-architect", "openaiApiKey", {
        name: "Architect: OpenAI Compatible API Key",
        hint: "Used when provider is OpenAI Compatible. Stored locally on your client.",
        scope: "client",
        config: isGM, // Only shows in the menu for GMs
        type: String,
        default: "",
        password: true
    });

    game.settings.register("npc-architect", "openaiBaseUrl", {
        name: "Architect: OpenAI Compatible Base URL",
        hint: "Base URL for OpenAI-compatible APIs (for example: https://api.openai.com/v1).",
        scope: "world",
        config: isGM, // Only shows in the menu for GMs
        type: String,
        default: "https://api.openai.com/v1"
    });

    game.settings.register("npc-architect", "openaiModel", {
        name: "Architect: OpenAI Compatible Model",
        hint: "Select the model used when provider is OpenAI Compatible.",
        scope: "world",
        config: isGM, // Only shows in the menu for GMs
        type: String,
        default: "gpt-4o-mini",
        choices: {
            "gpt-4o-mini": "gpt-4o-mini",
            "gpt-4o": "gpt-4o",
            "gpt-4.1-mini": "gpt-4.1-mini",
            "gpt-4.1": "gpt-4.1"
        }
    });

    game.settings.register("npc-architect", "openaiModelCustom", {
        name: "Architect: OpenAI Custom Model (Optional)",
        hint: "If set, this manual model name overrides the OpenAI-compatible dropdown selection.",
        scope: "world",
        config: isGM, // Only shows in the menu for GMs
        type: String,
        default: ""
    });
});



import { NPCArchitect } from './architect-app.js'; 

console.log("Architect | main.js has been LOADED by Foundry.");

Hooks.once('init', () => {
    console.log("Architect | Initializing the NPC Architect for Greyhawk...");
});


Hooks.on("renderActorDirectory", (app, html) => {
    if (!game.user.isGM) return;

       const header = html.querySelector(".header-actions");
    if (!header) return;

   
    if (header.querySelector(".architect-btn")) return;

        const architectBtn = document.createElement("button");
    architectBtn.type = "button";
    architectBtn.classList.add("architect-btn");
    architectBtn.style.flex = "0"; 
    architectBtn.style.whiteSpace = "nowrap";
    architectBtn.style.marginLeft = "4px";
    architectBtn.innerHTML = `<i class="fas fa-drafting-compass"></i> Architect`;

       architectBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        new NPCArchitect().render({force: true});
    });

  
    header.appendChild(architectBtn);
});
