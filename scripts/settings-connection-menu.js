export class NPCArchitectConnectionMenu extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "npc-architect-connection-menu",
      title: "NPC Architect | AI Connection Tester",
      template: "modules/npc-architect/templates/connection-test.hbs",
      width: 520,
      height: "auto",
      closeOnSubmit: false,
      submitOnChange: false,
      submitOnClose: false
    });
  }

  getData() {
    const provider = game.settings.get("npc-architect", "aiProvider")?.trim() || "gemini";
    const geminiSelected = game.settings.get("npc-architect", "geminiModel")?.trim() || "gemini-2.5-flash";
    const geminiCustom = game.settings.get("npc-architect", "geminiModelCustom")?.trim() || "";
    const openaiSelected = game.settings.get("npc-architect", "openaiModel")?.trim() || "gpt-4o-mini";
    const openaiCustom = game.settings.get("npc-architect", "openaiModelCustom")?.trim() || "";
    const openaiBaseUrl = game.settings.get("npc-architect", "openaiBaseUrl")?.trim() || "https://api.openai.com/v1";

    const resolvedModel = provider === "openai"
      ? (openaiCustom || openaiSelected)
      : (geminiCustom || geminiSelected);

    return {
      provider,
      resolvedModel,
      openaiBaseUrl
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find("#architect-test-connection-btn").on("click", async ev => {
      ev.preventDefault();
      await this._testCurrentProvider();
      this.render(false);
    });
  }

  async _updateObject(_event, _formData) {
    // No persistent form fields in this utility window.
  }

  _extractOpenAIContent(payload) {
    const content = payload?.choices?.[0]?.message?.content;
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content
        .map(part => {
          if (typeof part === "string") return part;
          if (typeof part?.text === "string") return part.text;
          if (typeof part?.output_text === "string") return part.output_text;
          return "";
        })
        .join("\n")
        .trim();
    }
    if (typeof payload?.choices?.[0]?.text === "string") return payload.choices[0].text;
    return "";
  }

  _extractJsonObjectFromText(text) {
    const raw = `${text ?? ""}`.trim();
    if (!raw) throw new Error("Model returned empty content.");

    let cleaned = raw;
    if (cleaned.startsWith("```")) {
      cleaned = cleaned
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();
    }

    try {
      return JSON.parse(cleaned);
    } catch (_ignored) {
      const start = raw.indexOf("{");
      const end = raw.lastIndexOf("}");
      if (start !== -1 && end > start) {
        return JSON.parse(raw.slice(start, end + 1));
      }
      throw new Error("Response did not contain valid JSON.");
    }
  }

  async _testGemini({ apiKey, model }) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Return ONLY this JSON: {"ok":true}' }] }],
        generationConfig: { response_mime_type: "application/json" }
      })
    });

    let payload = {};
    try {
      payload = await response.json();
    } catch (_ignored) {
      payload = {};
    }

    if (!response.ok || payload?.error) {
      const message = payload?.error?.message || `Gemini test failed with HTTP ${response.status}.`;
      throw new Error(message);
    }

    const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = this._extractJsonObjectFromText(text);
    if (!parsed?.ok) throw new Error("Gemini test completed but JSON result was unexpected.");
  }

  async _testOpenAI({ apiKey, baseUrl, model }) {
    const normalizedBaseUrl = `${baseUrl ?? ""}`.trim().replace(/\/+$/, "");
    const url = `${normalizedBaseUrl || "https://api.openai.com/v1"}/chat/completions`;
    const authorization = apiKey.toLowerCase().startsWith("bearer ")
      ? apiKey
      : `Bearer ${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization
      },
      body: JSON.stringify({
        model,
        temperature: 0,
        messages: [{ role: "user", content: 'Return ONLY this JSON: {"ok":true}' }]
      })
    });

    let payload = {};
    try {
      payload = await response.json();
    } catch (_ignored) {
      payload = {};
    }

    if (!response.ok) {
      const message = payload?.error?.message || `OpenAI-compatible test failed with HTTP ${response.status}.`;
      throw new Error(message);
    }

    const text = this._extractOpenAIContent(payload);
    const parsed = this._extractJsonObjectFromText(text);
    if (!parsed?.ok) throw new Error("OpenAI-compatible test completed but JSON result was unexpected.");
  }

  async _testCurrentProvider() {
    const configuredProviderRaw = game.settings.get("npc-architect", "aiProvider")?.trim() || "gemini";
    let provider = configuredProviderRaw.toLowerCase().includes("openai") ? "openai" : "gemini";
    const geminiApiKey = game.settings.get("npc-architect", "geminiApiKey")?.trim() || "";
    const openaiApiKey = game.settings.get("npc-architect", "openaiApiKey")?.trim() || "";

    try {
      if (provider === "gemini" && !geminiApiKey && openaiApiKey) {
        provider = "openai";
        ui.notifications.warn("NPC Architect: Gemini key is missing, auto-falling back to OpenAI-compatible provider.");
      } else if (provider === "openai" && !openaiApiKey && geminiApiKey) {
        provider = "gemini";
        ui.notifications.warn("NPC Architect: OpenAI-compatible key is missing, auto-falling back to Gemini provider.");
      }

      if (!geminiApiKey && !openaiApiKey) {
        return ui.notifications.error("NPC Architect: No API Key found. Configure Gemini or OpenAI-compatible key in Module Settings.");
      }

      if (provider === "openai") {
        const apiKey = openaiApiKey;
        if (!apiKey) {
          return ui.notifications.error("NPC Architect: Missing OpenAI-compatible API Key.");
        }

        const selected = game.settings.get("npc-architect", "openaiModel")?.trim() || "gpt-4o-mini";
        const custom = game.settings.get("npc-architect", "openaiModelCustom")?.trim() || "";
        const model = custom || selected;
        const baseUrl = game.settings.get("npc-architect", "openaiBaseUrl")?.trim() || "https://api.openai.com/v1";

        ui.notifications.info(`Testing OpenAI-compatible connection (${model})...`);
        await this._testOpenAI({ apiKey, baseUrl, model });
        return ui.notifications.info(`OpenAI-compatible connection test passed (${model}).`);
      }

      const apiKey = geminiApiKey;
      if (!apiKey) {
        return ui.notifications.error("NPC Architect: Missing Gemini API Key.");
      }

      const selected = game.settings.get("npc-architect", "geminiModel")?.trim() || "gemini-2.5-flash";
      const custom = game.settings.get("npc-architect", "geminiModelCustom")?.trim() || "";
      const model = custom || selected;

      ui.notifications.info(`Testing Gemini connection (${model})...`);
      await this._testGemini({ apiKey, model });
      return ui.notifications.info(`Gemini connection test passed (${model}).`);
    } catch (err) {
      console.error("Architect | Connection test failed:", err);
      return ui.notifications.error(`Connection test failed: ${err.message || err}`);
    }
  }
}
