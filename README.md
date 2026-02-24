## NPC Architect (PF2e)

**NPC Architect** is a high-performance creation suite for Foundry VTT (PF2e) that leverages AI to bridge the gap between imagination and mechanical execution. It features native support for the World of Greyhawk.

⚔️ **Core Capabilities**
**Universal Stat Block Generation**: Create a complete, mechanically sound PF2e NPC or Monster from a simple description (e.g., "A mutated displacer beast from the Barrier Peaks").

**Cross-System Conversion:** Paste a stat block from any TTRPG system (5e, AD&D, etc.) and instantly translate it into a fully functional PF2e Actor.

**Greyhawk Integration**: Native support for Greyhawk-specific ancestries and social backgrounds, ensuring your NPCs are setting-accurate.

**AI Drafting**: Refine personality, quirks, and mannerisms using the "Draft" feature before final creation.

🔑 Setup & API Key
This module supports both native Gemini and OpenAI-compatible APIs.

1. Configure Foundry: Open Configure Settings -> Module Settings in Foundry.
2. Set `Architect: AI Provider` to either:
   - `Google Gemini (Native)`
   - `OpenAI Compatible (Chat Completions)`
3. Fill the matching credentials:
   - Gemini: `Architect: Gemini API Key` + `Architect: Gemini Model`
   - OpenAI compatible: `Architect: OpenAI Compatible API Key` + `Architect: OpenAI Compatible Base URL` + `Architect: OpenAI Compatible Model`
4. Optional manual override:
   - `Architect: Gemini Custom Model (Optional)`
   - `Architect: OpenAI Custom Model (Optional)`
   - If custom value is set, it overrides dropdown model selection.
5. Output language:
   - Set `Architect: Output Language` to control AI textual output language.
   - `Auto` follows Foundry's current language (`game.i18n.lang`).
   - `Architect: Output Language Custom (Optional)` overrides the dropdown value when set.
6. Connectivity test:
   - Open `Architect: AI Connection Test` and click `Test Connection`.
   - The test uses your current provider, key, base URL, and resolved model.

Examples of OpenAI-compatible base URLs:
- `https://api.openai.com/v1`
- Your self-hosted / proxy OpenAI-compatible endpoint

Compendium search notes:
- Inventory and spell imports now attempt localized + canonical name matching.
- Matching is compatible with Babele-translated entries (including `flags.babele.originalName` fallback).


🛠️ **Installation**
Paste this Manifest URL into the Install Module dialog:

https://github.com/triocks/npc-architect/releases/latest/download/module.json

📖 Usage
1. Open the Actors Tab and click the Architect button.
2. Do your thing.  Submit (Architect NPC) and await confirmation.
3. Check the NPC Architect folder.

**Feel free to reach out on discord (pbaiani) or log an issue here if you have one.  These are tools (and I have many more I will eventually submit) that I have been building and using in my own foundry sessions for some time.**

## Support the Project
If this tool saves you prep time, consider supporting the continued development!

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/triock)

 ⚖️ License
This project is licensed under the MIT License.
