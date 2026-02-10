Hooks.once("init", () => {
      const isGM = game.data.users.find(u => u._id === game.data.userId)?.role >= 4;

    // API Key Setting
    game.settings.register("npc-architect", "geminiApiKey", {
        name: "Architect: Gemini API Key",
        hint: "Enter your Google Gemini API key. This is stored locally on your client.",
        scope: "client",
        config: isGM, // Only shows in the menu for GMs
        type: String,
        default: "",
        password: false 
    });

    // Model Name Setting
    game.settings.register("npc-architect", "geminiModel", {
        name: "Architect: Gemini Model Name",
        hint: "The model ID to use (e.g., gemini-3-flash-preview).",
        scope: "world",
        config: isGM, // Only shows in the menu for GMs
        type: String,
        default: "gemini-3-flash-preview"
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