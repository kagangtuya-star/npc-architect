# NPC Architect 完整工作流程文档

本文档基于当前代码实现，描述模块从加载到创建 NPC 的完整链路。

## 1. 模块入口与加载

1. Foundry 读取 `module.json`。
2. 加载 ES Module 入口 `scripts/main.js`。
3. 在 `Hooks.once("init")` 中注册模块设置与测试菜单。
4. 在 `Hooks.on("renderActorDirectory")` 中向 Actors 目录头部注入 `Architect` 按钮（仅 GM）。

关键文件：
- `module.json`
- `scripts/main.js`

## 2. 配置初始化（Module Settings）

初始化时注册以下配置项：

1. Provider 与测试菜单
- `aiProvider`: `gemini` / `openai`
- `connectionTestMenu`: 打开连接测试窗口

2. 输出语言
- `outputLanguage`（world，下拉，支持 Auto 跟随 Foundry 语言）
- `outputLanguageCustom`（world，手动覆盖，可选）

3. Gemini 配置
- `geminiApiKey`（client）
- `geminiModel`（world，下拉）
- `geminiModelCustom`（world，手动覆盖，可选）

4. OpenAI Compatible 配置
- `openaiApiKey`（client）
- `openaiBaseUrl`（world）
- `openaiModel`（world，下拉）
- `openaiModelCustom`（world，手动覆盖，可选）

模型优先级规则：
1. `*ModelCustom` 非空则优先使用。
2. 否则使用 `*Model` 下拉值。

关键文件：
- `scripts/main.js`

## 3. UI 打开与交互入口

1. GM 点击 Actors 页顶部 `Architect` 按钮。
2. 创建并渲染 `new NPCArchitect().render({ force: true })`。
3. `NPCArchitect` 使用 `ApplicationV2 + HandlebarsApplicationMixin`。
4. 模板为 `templates/dashboard.hbs`，主要控件：
- `#npc-level-input`: 目标等级
- `#npc-input-editor`: 可编辑草稿文本
- `#reroll-btn`: 重新生成 DNA
- `#create-npc-btn`: 提交 AI 生成并创建 Actor

关键文件：
- `scripts/main.js`
- `scripts/architect-app.js`
- `templates/dashboard.hbs`

## 4. 上下文准备与事件绑定

`NPCArchitect` 关键生命周期：

1. `_prepareContext()`
- 返回 `npcData`、`rawTrace`、等级列表 `0..20`。

2. `_onRender()`
- 点击 `#reroll-btn` -> 调用 `generate()`。
- 修改 `#npc-level-input` -> 更新 `npcData.level`。
- 点击 `#create-npc-btn` -> 调用 `generateNPC()`。

关键文件：
- `scripts/architect-app.js`

## 5. DNA 生成流程（本地随机，不调用 AI）

`generate()` 负责构造 NPC DNA 草稿：

1. 清空并初始化 `npcData` 字段。
2. 从 `ARCHITECT_DATA` 做加权随机：
- 种族/族裔/命名脚本
- 年龄
- 职业与子类
- 社会阶层与子类
- 态度/人格/举止/怪癖/兴趣及其子类
3. 通过 `_generateName()` 根据 `nameScript` 动态加载 `assets/names/*.js` 生成姓名。
4. 刷新界面，将结果写入草稿编辑器模板内容。

数据源：
- `scripts/data-vault.js`
- `scripts/data/*.js`
- `assets/names/*.js`

关键文件：
- `scripts/architect-app.js`

## 6. NPC 生成主流程（AI 请求与解析）

`generateNPC()` 的主步骤如下：

1. 读取草稿文本与目标等级。
2. 构造：
- `npcRequest`（用户输入 + 规则约束）
- `systemInstruction`（JSON Schema + PF2e 约束）
 - 输出语言约束（来自 `outputLanguage/outputLanguageCustom`）
3. 选择 Provider：
- 读取 `aiProvider`
- 归一化到 `gemini` 或 `openai`
4. 自动回退策略：
- 若当前 provider 缺 key，且另一 provider 有 key，则自动切换并提示 warning。
- 若两边都无 key，直接报错终止。
5. 按 provider 发请求：
- Gemini：`_requestGeminiCompletion()`
  - Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key=...`
- OpenAI Compatible：`_requestOpenAICompletion()`
  - Endpoint: `{openaiBaseUrl}/chat/completions`
  - Header: `Authorization: Bearer ...`
6. 解析文本：
- `_extractOpenAIContent()` 提取聊天内容
- `_extractJsonObjectFromText()` 做 JSON 清洗与解析（支持 fenced code block）
7. 得到最终 `npc` JSON 对象。

关键文件：
- `scripts/architect-app.js`

## 7. Actor 与 Item 落库流程

AI 返回 JSON 后，执行 PF2e Actor 构建：

1. 确保存在 `NPC Architect` Actor 文件夹，不存在则创建。
2. 处理技能：
- 核心技能写入 `system.skills`
- 非核心技能转为 `lore` Item
3. 创建 NPC Actor：
- 写入等级、描述、traits、perception、saves、abilities、HP/AC、免疫/抗性/弱点等。
4. 装备导入：
- 搜索 compendium：`pf2e.equipment-srd` / `pf2e.weapons-srd` / `pf2e.armor-srd`
- 多别名匹配（本地化名称、slug、Babele 原始名等）并排除 `kit`
5. 法术导入：
- 创建 `spellcastingEntry`
- 从 `pf2e.spells-srd` 做多别名匹配（含 Babele 兼容）并挂到施法条目
6. 攻击与能力：
- `attacks` 转 `melee` Item
- `abilities` 转 `action` Item
7. `actor.createEmbeddedDocuments("Item", finalItems)` 一次性写入。
8. 弹出成功通知。

关键文件：
- `scripts/architect-app.js`

## 8. 连接测试流程（独立菜单）

入口：
- 模块设置菜单 `Architect: AI Connection Test`。

实现：
1. 打开 `NPCArchitectConnectionMenu`（`FormApplication`）。
2. 展示当前 provider、解析后 model（OpenAI 时展示 base URL）。
3. 点击 `Test Connection`：
- 执行 `_testCurrentProvider()`。
- 使用与主流程一致的 provider 判定和自动回退。
- Gemini 测试：调用 generateContent，要求返回 `{"ok":true}`。
- OpenAI 测试：调用 chat/completions，要求返回 `{"ok":true}`。
4. JSON 解析成功且 `ok=true` 视为连通通过。
5. 失败时显示错误通知并打印控制台日志。

关键文件：
- `scripts/settings-connection-menu.js`
- `templates/connection-test.hbs`

## 9. 错误处理与可观测性

当前实现的错误反馈方式：

1. 缺少输入文本：
- `The drafting table is empty! ...`
2. 缺少 API Key：
- provider 定向报错或“无任何 key”报错
3. API 请求失败：
- 读取响应体 `error.message` 优先展示
4. 解析失败：
- JSON 提取失败会抛异常并进入统一 catch
5. 统一兜底：
- `NPC Architecture failed. See console.`

通知与日志：
- 通过 `ui.notifications` 给用户即时反馈
- 通过 `console.error` 输出调试细节

## 10. 端到端时序（简版）

1. Foundry 启动 -> 载入模块 -> 注册 settings/menu。
2. GM 打开 Actors -> 点击 `Architect` -> 打开 Dashboard。
3. 点击 `Roll DNA`（可选）-> 本地随机生成草稿。
4. 点击 `Architect NPC` -> 构建提示词 -> 选择 provider/model。
5. 发送 AI 请求 -> 解析 JSON -> 构建 Actor/Items。
6. 在 `NPC Architect` 文件夹中生成最终 NPC。

## 11. 当前代码结构总览

- `scripts/main.js`: 模块初始化、设置注册、Actors 按钮注入
- `scripts/architect-app.js`: 主应用、DNA生成、AI调用、Actor创建
- `scripts/settings-connection-menu.js`: 连接测试窗口与测试逻辑
- `scripts/data-vault.js` + `scripts/data/*.js`: DNA 数据源
- `assets/names/*.js`: 姓名生成数据
- `templates/dashboard.hbs`: 主界面模板
- `templates/connection-test.hbs`: 连接测试模板
- `styles/npc-architect.css`: UI 样式
