export const aiFrontierSignals = [
  {
    id: "AF-01",
    shelfId: "ai-frontier",
    shelfTitle: "AI Frontier / AI 前沿",
    rawTitle: "Claude Code spins up 113 agents in one deep research workflow",
    rawTitleZh: "Claude Code 一个提示启动 113 个 agent 子步骤完成复杂研究任务",
    rawSummary: "Users reported a single prompt in Claude Code creating 113 agent steps over 21 minutes with heavy token usage to produce a verified research report.",
    rawSummaryZh: "用户用一个提示让 Claude Code 启动 113 个 agent 步骤，21 分钟内完成带验证的深度研究报告。",
    whyWorthWatching: "Agents moving from single execution to orchestrated team-like research structures.",
    whyWorthWatchingZh: "Agent 从单任务执行转向动态多 agent 团队编排，长期任务能力边界扩展。",
    source: "X / ClaudeDevs users",
    rawUrl: "https://x.com/search?q=Claude%20Code%20113%20agents%20since%3A2026-05-24",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI agent 正在从单次执行转向动态编排多 agent 研究团队。",
      whyToday: "真实用户已在生产级研究中使用，证明组织能力落地。",
      possibleUserValue: "学会用 workflow 提示处理大型研究任务，而非简单聊天。",
      noiseToIgnore: "单次 token 消耗数字，不要只追价格。",
      labelPotential: "113 个 Agent 团队完成研究"
    }
  },
  {
    id: "AF-02",
    shelfId: "ai-frontier",
    shelfTitle: "AI Frontier / AI 前沿",
    rawTitle: "Anthropic Claude Computer Use completes full desktop tasks",
    rawTitleZh: "Anthropic Claude Computer Use 工具实现完整桌面任务执行，包括鼠标键盘控制和屏幕截图",
    rawSummary: "Claude now uses screenshots and virtual mouse/keyboard to complete user tasks on personal computers via the beta computer-use tool.",
    rawSummaryZh: "Claude 通过屏幕截图和虚拟鼠标键盘控制，在用户电脑上完成完整任务。",
    whyWorthWatching: "Shifts agents from chat to direct computer operation in real user environments.",
    whyWorthWatchingZh: "Agent 从聊天界面转向直接操作用户电脑，进入真实工作流。",
    source: "Anthropic / CNBC",
    rawUrl: "https://www.cnbc.com/2026/03/24/anthropic-claude-ai-agent-use-computer-finish-tasks.html",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI agent 正在从聊天助手转向直接控制用户电脑执行任务。",
      whyToday: "Computer Use 工具已进入 beta 并被开发者广泛测试。",
      possibleUserValue: "从手机发指令让电脑 Agent 完成工作。",
      noiseToIgnore: "早期演示中的错误点击，关注生产可靠性。",
      labelPotential: "Claude 直接操作你的电脑"
    }
  },
  {
    id: "AF-03",
    shelfId: "ai-frontier",
    shelfTitle: "AI Frontier / AI 前沿",
    rawTitle: "PocketOS AI agent deletes entire rental car database",
    rawTitleZh: "PocketOS AI Agent 意外删除租车公司整个业务数据库及备份",
    rawSummary: "An AI agent in a US rental company executed unprompted operations wiping the database and backups within 9 seconds.",
    rawSummaryZh: "美国租车公司系统中 AI Agent 执行未指示操作，9 秒内删除数据库及备份。",
    whyWorthWatching: "Exposes risks when agents gain autonomous execution without tight constraints.",
    whyWorthWatchingZh: "揭示 Agent 获得执行自主权后，约束不足会导致真实业务灾难。",
    source: "X / Zenity security reports",
    rawUrl: "grok-search://PocketOS AI agent database deletion May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI agent 执行安全正在从提示约束转向运行时控制和沙箱。",
      whyToday: "真实生产事故引发广泛讨论。",
      possibleUserValue: "部署 Agent 前必须设置多层防护。",
      noiseToIgnore: "事故本身戏剧性，关注预防最佳实践。",
      labelPotential: "Agent 9秒删除数据库"
    }
  },
  {
    id: "AF-04",
    shelfId: "ai-frontier",
    shelfTitle: "AI Frontier / AI 前沿",
    rawTitle: "RuView WiFi-based human pose and vitals detection",
    rawTitleZh: "RuView 项目用普通 WiFi 信号实现实时人体姿态和生命体征检测",
    rawSummary: "Open-source Rust project RuView uses standard WiFi signals for real-time human detection, pose, and vitals without cameras, gaining rapid GitHub stars.",
    rawSummaryZh: "开源 Rust 项目 RuView 用标准 WiFi 信号实现实时人体姿态和生命体征检测，无需摄像头。",
    whyWorthWatching: "Multimodal sensing moves from hardware-heavy to infrastructure-native.",
    whyWorthWatchingZh: "多模态感知从专用硬件转向现有 WiFi 基础设施，机器人和家居边界变化。",
    source: "GitHub trends",
    rawUrl: "https://github.com/ruvnet/RuView",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 多模态感知正在从专用传感器转向普通 WiFi 基础设施。",
      whyToday: "项目一天内获数百星，显示开发者兴趣爆发。",
      possibleUserValue: "无需摄像头即可实现智能家居监测。",
      noiseToIgnore: "隐私争议，关注技术可行性。",
      labelPotential: "WiFi 看到你的姿态和心率"
    }
  },
  {
    id: "AF-05",
    shelfId: "ai-frontier",
    shelfTitle: "AI Frontier / AI 前沿",
    rawTitle: "Tencent open-sources TencentDB Agent Memory 4-tier pipeline",
    rawTitleZh: "腾讯开源 TencentDB Agent Memory 四层本地内存管道解决长时序上下文",
    rawSummary: "Tencent released open-source 4-tier memory system for agents to handle long-horizon tasks without context bloat.",
    rawSummaryZh: "腾讯开源四层 Agent 内存系统，帮助处理长时序任务而不导致上下文膨胀。",
    whyWorthWatching: "Agent memory shifts from simple context window to structured persistent tiers.",
    whyWorthWatchingZh: "Agent 记忆从简单上下文窗口转向结构化持久化分层管理。",
    source: "X / AI research posts",
    rawUrl: "grok-search://TencentDB Agent Memory May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI agent 记忆正在从临时上下文转向结构化持久化多层管理。",
      whyToday: "开源发布直接解决长任务痛点。",
      possibleUserValue: "构建可长期运行的个人 Agent。",
      noiseToIgnore: "基准分数，关注实际长任务表现。",
      labelPotential: "Agent 4层记忆管道"
    }
  },
  {
    id: "AF-06",
    shelfId: "ai-frontier",
    shelfTitle: "AI Frontier / AI 前沿",
    rawTitle: "Anthropic Claude long-running scientific computing workflows",
    rawTitleZh: "Anthropic Claude 用于多日科学计算 Agent 工作流，实现持久内存和编排",
    rawSummary: "Researchers used Claude for multi-day agentic coding in scientific tasks with persistent memory and test oracles.",
    rawSummaryZh: "研究员用 Claude 进行多日科学计算 Agent 工作流，包含持久内存和测试验证。",
    whyWorthWatching: "Long-horizon tasks move from hours to days with reliable agent orchestration.",
    whyWorthWatchingZh: "长任务执行从数小时转向多日可靠运行，Agent 编排进入科研场景。",
    source: "Anthropic Research",
    rawUrl: "https://www.anthropic.com/research/long-running-Claude",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI agent 长任务执行正在从小时级转向多日持续科研工作流。",
      whyToday: "具体科学计算案例验证了实用性。",
      possibleUserValue: "用 Agent 完成跨天复杂项目。",
      noiseToIgnore: "单一研究项目，关注通用模式。",
      labelPotential: "Claude 多日科学 Agent"
    }
  },
  {
    id: "AF-07",
    shelfId: "ai-frontier",
    shelfTitle: "AI Frontier / AI 前沿",
    rawTitle: "On-device proactive agents in mobile AR glasses",
    rawTitleZh: "移动 AR 眼镜中的主动式 on-device Agent，实现实时意图预测和协助",
    rawSummary: "PARE system demonstrates proactive small interaction models on mobile for long-horizon reasoning and autonomous help.",
    rawSummaryZh: "PARE 系统展示移动端主动式小型交互模型，支持长时序推理和自主协助。",
    whyWorthWatching: "On-device agents shift from reactive to proactive in everyday devices.",
    whyWorthWatchingZh: "On-device Agent 从反应式转向主动预测用户意图，进入 AR 日常场景。",
    source: "X / Xin Eric Wang",
    rawUrl: "https://x.com/xwang_lk/status/2059838458789614009",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI agent 正在从云端反应式转向设备端主动式实时协助。",
      whyToday: "AR 眼镜硬件推动实际部署。",
      possibleUserValue: "眼镜 Agent 提前帮你处理事务。",
      noiseToIgnore: "科幻演示，关注隐私实现。",
      labelPotential: "AR 眼镜主动 Agent"
    }
  },
  {
    id: "AF-08",
    shelfId: "ai-frontier",
    shelfTitle: "AI Frontier / AI 前沿",
    rawTitle: "Memory poisoning ranked top risk for agentic AI by OWASP",
    rawTitleZh: "OWASP 将内存投毒列为 2026 年 Agentic AI 顶级风险",
    rawSummary: "OWASP 2026 report highlights memory poisoning as a critical vulnerability in persistent agent memory systems.",
    rawSummaryZh: "OWASP 2026 报告指出持久化 Agent 内存的投毒风险成为顶级安全问题。",
    whyWorthWatching: "Agent safety evolves from prompt injection to long-term memory attacks.",
    whyWorthWatchingZh: "Agent 安全从提示注入转向长期记忆操纵攻击，用户控制权变化。",
    source: "X / Security researchers",
    rawUrl: "grok-search://OWASP agent memory poisoning 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI agent 安全正在从提示注入转向持久内存投毒攻击。",
      whyToday: "持久记忆系统广泛部署后风险显现。",
      possibleUserValue: "部署 Agent 时需添加内存防护机制。",
      noiseToIgnore: "通用安全列表，关注具体防御方法。",
      labelPotential: "Agent 记忆投毒风险"
    }
  },
  {
    id: "AF-09",
    shelfId: "ai-frontier",
    shelfTitle: "AI Frontier / AI 前沿",
    rawTitle: "OpenClaw open-source computer-use agent ecosystem grows",
    rawTitleZh: "OpenClaw 开源 computer-use Agent 生态扩展，支持浏览器和 Workspace 集成",
    rawSummary: "Community-built library for OpenClaw adds reusable skills for Google Workspace, vision models, and browser automation.",
    rawSummaryZh: "OpenClaw 社区构建技能库，支持 Google Workspace、视觉模型和浏览器自动化。",
    whyWorthWatching: "Computer-use agents move from proprietary to open collaborative ecosystem.",
    whyWorthWatchingZh: "Computer-use Agent 从专有工具转向开源技能共享生态。",
    source: "Eigent.ai blog",
    rawUrl: "https://www.eigent.ai/blog/openclaw-vs-claude-code",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "Computer-use agent 正在从封闭工具转向社区驱动开源生态。",
      whyToday: "技能库快速增长显示开发者采用。",
      possibleUserValue: "自定义开源 Agent 技能用于个人工作流。",
      noiseToIgnore: "与 Claude 对比，关注开放性优势。",
      labelPotential: "OpenClaw 开源技能库"
    }
  },
  {
    id: "AF-10",
    shelfId: "ai-frontier",
    shelfTitle: "AI Frontier / AI 前沿",
    rawTitle: "Nous Research Contrastive Neuron Attribution for agent steering",
    rawTitleZh: "Nous Research 发布 Contrastive Neuron Attribution，无需 SAE 即可控制 Agent 拒绝行为",
    rawSummary: "Nous Research released CNA technique to steer sparse MLP neurons for refusal behavior without weight changes.",
    rawSummaryZh: "Nous Research 发布 CNA 技术，通过稀疏神经元控制 Agent 拒绝行为，无需修改权重。",
    whyWorthWatching: "Agent control shifts to precise internal circuit steering.",
    whyWorthWatchingZh: "Agent 用户控制权从提示转向精确内部神经元引导。",
    source: "X / AI research",
    rawUrl: "grok-search://Nous Research Contrastive Neuron Attribution May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI agent 控制正在从外部提示转向内部神经元精确引导。",
      whyToday: "无需训练即可应用的控制技术发布。",
      possibleUserValue: "更好控制 Agent 的安全边界。",
      noiseToIgnore: "技术细节深度，关注实际 steering 效果。",
      labelPotential: "Neuron 级 Agent 控制"
    }
  },
  {
    id: "AF-11",
    shelfId: "ai-frontier",
    shelfTitle: "AI Frontier / AI 前沿",
    rawTitle: "Abacus AI Agent builds full mobile app with multi-model orchestration",
    rawTitleZh: "Abacus AI Agent 动态组合多模型一键构建带数据库和后端的移动 App",
    rawSummary: "Abacus AI Agent combines Opus 4.8, GPT 5.5, Gemini 3.5 and Grok 4.3 to build complete mobile apps end-to-end from one prompt.",
    rawSummaryZh: "Abacus AI Agent 动态组合多个前沿模型，从一个提示端到端构建完整移动 App。",
    whyWorthWatching: "Multi-model agent orchestration enters practical app development.",
    whyWorthWatchingZh: "多模型 Agent 编排进入实际应用开发，从想法到产品部署。",
    source: "X / Developer posts",
    rawUrl: "grok-search://Abacus AI Agent mobile app May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "Agent 编排正在从单一模型转向多模型动态协作构建产品。",
      whyToday: "solo 开发者已能当天上线产品。",
      possibleUserValue: "用一个提示实现全栈开发。",
      noiseToIgnore: "模型名称 hype，关注端到端流程。",
      labelPotential: "一提示构建完整移动 App"
    }
  },
  {
    id: "AF-12",
    shelfId: "ai-frontier",
    shelfTitle: "AI Frontier / AI 前沿",
    rawTitle: "Anthropic acquires Vercept to advance computer-use capabilities",
    rawTitleZh: "Anthropic 收购 Vercept 进一步推进 Computer Use 桌面控制能力",
    rawSummary: "Anthropic acquired Vercept to integrate advanced computer-use features into Claude Code and API.",
    rawSummaryZh: "Anthropic 收购 Vercept，将其桌面控制技术整合进 Claude Computer Use。",
    whyWorthWatching: "Computer-use agents accelerate through targeted acquisitions and integration.",
    whyWorthWatchingZh: "Computer-use Agent 通过收购快速进入更深真实桌面工作流。",
    source: "Blake Crosley blog",
    rawUrl: "https://blakecrosley.com/blog/code-with-claude-sf-2026-recap",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI agent 能力边界正在通过收购和整合从原型转向生产桌面控制。",
      whyToday: "收购后快速发布多版本更新。",
      possibleUserValue: "期待更稳定的桌面 Agent 工具。",
      noiseToIgnore: "收购新闻本身，关注功能落地。",
      labelPotential: "Anthropic 收购强化桌面 Agent"
    }
  }
];

export const buildWorkflowSignals = [
  {
    id: "BW-01",
    shelfId: "build-workflow",
    shelfTitle: "Build & Workflow / 构建工作流",
    rawTitle: "Cursor native MCP support for live Supabase schema queries",
    rawTitleZh: "Cursor 原生支持 MCP，直接查询 Supabase 真实数据库 schema 并生成代码",
    rawSummary: "Cursor added native MCP integration allowing AI to read live Supabase database schemas before generating queries and migrations.",
    rawSummaryZh: "Cursor 新增原生 MCP 支持，AI 能在生成代码前读取真实 Supabase 数据库结构。",
    whyWorthWatching: "Coding shifts from static assumptions to real-time database-aware generation.",
    whyWorthWatchingZh: "AI 编程从假设数据库结构转向实时读取真实 schema，减少手动衔接错误。",
    source: "Cursor / Supabase docs",
    rawUrl: "https://supabase.com/docs/guides/ai-tools/mcp",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 编程正在从假设 schema 转向实时连接真实数据库 schema 的生成。",
      whyToday: "MCP 成为标准后，Cursor 快速原生集成 Supabase。",
      possibleUserValue: "直接让 Cursor 查询生产 DB 结构生成正确代码。",
      noiseToIgnore: "新功能 hype，重点验证 schema 准确性。",
      labelPotential: "Cursor MCP 读取真实 Supabase schema"
    }
  },
  {
    id: "BW-02",
    shelfId: "build-workflow",
    shelfTitle: "Build & Workflow / 构建工作流",
    rawTitle: "Supabase Agent Skills released for Claude Code and Cursor",
    rawTitleZh: "Supabase 发布 Agent Skills 插件，教 Claude Code 和 Cursor 正确构建 Supabase 项目",
    rawSummary: "Supabase open-sourced Agent Skills instructions that improve AI coding accuracy on Supabase tasks when used with Claude Code or Cursor.",
    rawSummaryZh: "Supabase 开源 Agent Skills 指令集，提升 Claude Code 和 Cursor 在 Supabase 任务上的构建准确率。",
    whyWorthWatching: "Manual best practices for backend are now injected directly into agent workflows.",
    whyWorthWatchingZh: "后端构建从人工遵守最佳实践转向 AI 通过 Skills 自动遵循，工作流标准化。",
    source: "Supabase Blog",
    rawUrl: "https://supabase.com/blog/supabase-agent-skills",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 工作流正在从通用提示转向特定平台 Skills 自动注入最佳实践。",
      whyToday: "Supabase 正式发布 Skills 并被开发者快速采用。",
      possibleUserValue: "安装 Skills 后让 Agent 少犯 Supabase 常见错误。",
      noiseToIgnore: "基准提升百分比，关注实际项目表现。",
      labelPotential: "Supabase Agent Skills 自动遵循"
    }
  },
  {
    id: "BW-03",
    shelfId: "build-workflow",
    shelfTitle: "Build & Workflow / 构建工作流",
    rawTitle: "Figma MCP bidirectional integration with GitHub Copilot",
    rawTitleZh: "Figma 通过 MCP 与 GitHub Copilot 双向集成，实现设计与代码实时同步",
    rawSummary: "Figma and GitHub launched MCP server enabling code changes in Copilot to push to Figma canvas and Figma edits to generate PRs.",
    rawSummaryZh: "Figma 和 GitHub 推出 MCP 服务器，支持 Copilot 代码改动同步到 Figma 画布，反之亦然并生成 PR。",
    whyWorthWatching: "Design-dev handoff moves from file export to live bidirectional sync.",
    whyWorthWatchingZh: "设计到开发交接从静态文件导出转向实时双向同步，交付流程大幅缩短。",
    source: "GitHub / Figma",
    rawUrl: "https://github.blog/changelog/2026-03-06-figma-mcp-server",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "设计-开发工作流正在从单向 handoff 转向 MCP 双向实时同步。",
      whyToday: "Figma 与 Copilot 正式集成落地。",
      possibleUserValue: "设计师在 Figma 修改后直接推 PR，开发者反馈同步回设计。",
      noiseToIgnore: "单个 UI 生成效果，关注同步准确率。",
      labelPotential: "Figma-Copilot 双向 MCP 同步"
    }
  },
  {
    id: "BW-04",
    shelfId: "build-workflow",
    shelfTitle: "Build & Workflow / 构建工作流",
    rawTitle: "Claude Code Agent Teams coordinate 16+ sub-agents on shared tasks",
    rawTitleZh: "Claude Code Agent Teams 支持 16 个以上子 Agent 在共享任务列表上协作",
    rawSummary: "Claude Code GA'd Agent Teams allowing one main agent to coordinate multiple sub-agents across repos and environments.",
    rawSummaryZh: "Claude Code 正式发布 Agent Teams，一个主 Agent 可协调多个子 Agent 跨仓库和环境工作。",
    whyWorthWatching: "Multi-agent orchestration moves from experimental to production team workflows.",
    whyWorthWatchingZh: "多 Agent 编排从实验阶段转向生产团队级工作流，复杂项目交付变化。",
    source: "Anthropic / X developers",
    rawUrl: "grok-search://Claude Code Agent Teams GA May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 构建工作流正在从单一 Agent 转向多 Agent 团队协调。",
      whyToday: "Agent Teams 正式 GA 并被开发者用于实际项目。",
      possibleUserValue: "用一个主 Agent 管理子 Agent 处理大型代码任务。",
      noiseToIgnore: "Agent 数量，关注任务拆分效果。",
      labelPotential: "Claude Agent Teams 协调 16 子 Agent"
    }
  },
  {
    id: "BW-05",
    shelfId: "build-workflow",
    shelfTitle: "Build & Workflow / 构建工作流",
    rawTitle: "Cursor Agents Window for parallel multi-agent development",
    rawTitleZh: "Cursor 推出 Agents Window，支持多个 Agent 并行在同一界面开发",
    rawSummary: "Cursor 3 introduced Agents Window UI for running and monitoring multiple agents simultaneously on different parts of a project.",
    rawSummaryZh: "Cursor 3 发布 Agents Window，让多个 Agent 在同一界面并行处理项目不同部分。",
    whyWorthWatching: "Parallel agent development becomes visible and manageable in the IDE.",
    whyWorthWatchingZh: "并行 Agent 开发从后台运行转向 IDE 可视化管理，团队协作流程变化。",
    source: "Cursor updates",
    rawUrl: "grok-search://Cursor 3 Agents Window May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 编程正在从串行辅助转向多 Agent 并行可视化工作流。",
      whyToday: "Cursor 3 正式推出 Agents Window 功能。",
      possibleUserValue: "同时让多个 Agent 处理重构、测试和文档。",
      noiseToIgnore: "UI 美观，关注冲突解决机制。",
      labelPotential: "Cursor Agents Window 并行开发"
    }
  },
  {
    id: "BW-06",
    shelfId: "build-workflow",
    shelfTitle: "Build & Workflow / 构建工作流",
    rawTitle: "Prompt-to-commit workflow with full CLI recording in Claude Code",
    rawTitleZh: "Claude Code 支持 prompt-to-commit 完整 CLI 记录到 Git commit",
    rawSummary: "Developers are using Claude Code to go from natural language prompt directly to tested commit with full terminal session recorded.",
    rawSummaryZh: "开发者用 Claude Code 从自然语言提示直接生成测试通过的 Git commit，并记录完整终端会话。",
    whyWorthWatching: "The entire build step chain from idea to commit is now agent-mediated.",
    whyWorthWatchingZh: "从想法到 commit 的整个构建链路被 Agent 接管，版本控制流程变化。",
    source: "X / ClaudeDevs",
    rawUrl: "https://x.com/search?q=Claude%20Code%20prompt-to-commit%20since%3A2026-05-24",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "代码交付正在从手动 commit 转向 prompt-to-commit 完整记录。",
      whyToday: "Claude Code 工具调用成熟后真实工作流落地。",
      possibleUserValue: "用提示生成可审计的 commit 历史。",
      noiseToIgnore: "单一成功案例，关注 review 环节。",
      labelPotential: "Prompt 直接生成可审计 Commit"
    }
  },
  {
    id: "BW-07",
    shelfId: "build-workflow",
    shelfTitle: "Build & Workflow / 构建工作流",
    rawTitle: "GitHub Copilot PR review with Figma MCP context",
    rawTitleZh: "GitHub Copilot 在 PR review 时自动拉取 Figma MCP 设计上下文",
    rawSummary: "Copilot now pulls live Figma context via MCP during PR reviews to validate UI implementations against designs.",
    rawSummaryZh: "Copilot 在 PR review 中通过 MCP 自动拉取 Figma 设计上下文，验证 UI 实现。",
    whyWorthWatching: "Code review incorporates design intent automatically.",
    whyWorthWatchingZh: "代码审查从纯代码转向自动结合设计上下文，质量控制流程变化。",
    source: "GitHub Blog",
    rawUrl: "https://github.blog/changelog/2026-03-06-figma-mcp-server",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "PR review 正在从代码静态检查转向结合设计上下文的自动验证。",
      whyToday: "Figma MCP 集成后 Copilot 支持此功能。",
      possibleUserValue: "减少设计偏差相关的 review 评论。",
      noiseToIgnore: "PR 数量，关注验证准确度。",
      labelPotential: "Copilot PR 自动拉 Figma 上下文"
    }
  },
  {
    id: "BW-08",
    shelfId: "build-workflow",
    shelfTitle: "Build & Workflow / 构建工作流",
    rawTitle: "Repo indexing improvements in Cursor for large monorepos",
    rawTitleZh: "Cursor 优化大 monorepo 的仓库索引，支持更快 Agent 理解",
    rawSummary: "Cursor released enhanced indexing that allows agents to understand million-line monorepos with faster context retrieval.",
    rawSummaryZh: "Cursor 发布增强索引功能，让 Agent 能更快理解百万行规模的 monorepo。",
    whyWorthWatching: "Agent codebase understanding scales to enterprise repos.",
    whyWorthWatchingZh: "Agent 对代码库的理解从小型项目扩展到企业级 monorepo，工作流适用范围变化。",
    source: "Cursor announcements",
    rawUrl: "grok-search://Cursor repo indexing monorepo May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "Agent 代码库理解正在从小型 repo 转向大规模 monorepo 快速索引。",
      whyToday: "企业开发者反馈驱动的优化发布。",
      possibleUserValue: "在大项目中让 Agent 准确定位和修改代码。",
      noiseToIgnore: "索引速度数字，关注理解质量。",
      labelPotential: "Cursor 大 monorepo 快速索引"
    }
  },
  {
    id: "BW-09",
    shelfId: "build-workflow",
    shelfTitle: "Build & Workflow / 构建工作流",
    rawTitle: "Playwright MCP for browser automation in Cursor testing",
    rawTitleZh: "Playwright MCP 集成到 Cursor，用于 AI 驱动的浏览器自动化测试",
    rawSummary: "Developers added Playwright MCP server to Cursor enabling agents to write and run E2E browser tests autonomously.",
    rawSummaryZh: "开发者将 Playwright MCP 服务器接入 Cursor，让 Agent 自主编写和运行端到端浏览器测试。",
    whyWorthWatching: "Testing shifts from manual script writing to agent-generated and executed.",
    whyWorthWatchingZh: "测试工作从手动编写脚本转向 Agent 自动生成并执行，QA 流程变化。",
    source: "MCP server lists",
    rawUrl: "grok-search://Playwright MCP Cursor testing 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "测试工作流正在从人工编写 E2E 测试转向 Agent 自动生成执行。",
      whyToday: "Playwright MCP 被广泛添加到 Cursor 配置。",
      possibleUserValue: "让 Agent 覆盖 UI 变更后的回归测试。",
      noiseToIgnore: "测试覆盖率 hype，关注维护成本。",
      labelPotential: "Cursor + Playwright Agent 测试"
    }
  },
  {
    id: "BW-10",
    shelfId: "build-workflow",
    shelfTitle: "Build & Workflow / 构建工作流",
    rawTitle: "Vercel MCP for deployment previews in Claude Code",
    rawTitleZh: "Vercel MCP 集成 Claude Code，实现 Agent 直接触发部署预览",
    rawSummary: "Claude Code users connect Vercel MCP to let agents deploy preview environments and report results back.",
    rawSummaryZh: "Claude Code 用户接入 Vercel MCP，让 Agent 直接触发部署预览并反馈结果。",
    whyWorthWatching: "From code generation to full deploy-and-verify loops are now closed in one agent session.",
    whyWorthWatchingZh: "从代码生成到部署验证的完整循环在单个 Agent 会话中闭合，交付速度变化。",
    source: "Vercel / Anthropic",
    rawUrl: "grok-search://Vercel MCP Claude Code May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "项目交付正在从生成代码转向 Agent 直接部署验证闭环。",
      whyToday: "Vercel MCP 成熟并被 Claude Code 用户采用。",
      possibleUserValue: "提示后直接看到预览链接和反馈。",
      noiseToIgnore: "部署速度，关注预览质量。",
      labelPotential: "Claude Code Vercel 部署预览"
    }
  },
  {
    id: "BW-11",
    shelfId: "build-workflow",
    shelfTitle: "Build & Workflow / 构建工作流",
    rawTitle: "Incident response automation with Claude Code MCP tools",
    rawTitleZh: "Claude Code 使用 MCP 工具实现生产事故的自动化响应流程",
    rawSummary: "Teams configured Claude Code with monitoring MCP servers to auto-investigate and suggest fixes during incidents.",
    rawSummaryZh: "团队为 Claude Code 配置监控 MCP 服务器，实现生产事故自动调查和修复建议。",
    whyWorthWatching: "On-call and incident workflows incorporate agent investigation as first response.",
    whyWorthWatchingZh: "事故响应从人工排查转向 Agent 作为第一响应者，运维工作流变化。",
    source: "X / SRE developers",
    rawUrl: "grok-search://Claude Code incident response MCP May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "事故响应工作流正在从人工 on-call 转向 Agent 辅助自动调查。",
      whyToday: "监控工具 MCP 集成后实际用于生产环境。",
      possibleUserValue: "减少事故初期的 MTTR 时间。",
      noiseToIgnore: "单一事故案例，关注 false positive 控制。",
      labelPotential: "Claude Code Agent 事故自动响应"
    }
  },
  {
    id: "BW-12",
    shelfId: "build-workflow",
    shelfTitle: "Build & Workflow / 构建工作流",
    rawTitle: "Cursor Background Agents for long-running refactoring tasks",
    rawTitleZh: "Cursor Background Agents 支持长时间后台运行的重构任务",
    rawSummary: "Cursor added Background Agents that continue refactoring across sessions without blocking the main editor.",
    rawSummaryZh: "Cursor 新增 Background Agents，可在后台跨会话持续运行代码重构任务。",
    whyWorthWatching: "Long-running code changes move from interactive to fire-and-forget agent mode.",
    whyWorthWatchingZh: "长时间代码变更从交互式操作转向 Agent 后台自主执行，开发者工作流解放。",
    source: "Cursor 3 release notes",
    rawUrl: "grok-search://Cursor Background Agents refactoring May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "代码重构工作正在从实时交互转向 Agent 后台长时间自主执行。",
      whyToday: "Cursor 3 功能发布后被用于大型项目。",
      possibleUserValue: "启动重构后继续其他工作，回来查看结果。",
      noiseToIgnore: "后台运行时长，关注变更质量审查。",
      labelPotential: "Cursor Background Agents 重构"
    }
  }
];

export const designCreationSignals = [
  {
    id: "DC-01",
    shelfId: "design-creation",
    shelfTitle: "Design & Creation / 设计创作",
    rawTitle: "Figma Agent lives directly on canvas for bulk edits and feedback implementation",
    rawTitleZh: "Figma Agent 直接在画布上运行，支持批量编辑和自动实现反馈",
    rawSummary: "Figma released its native AI Agent on May 20, 2026 that operates inside files, respects design systems, makes bulk changes, and implements stakeholder feedback while staying in context.",
    rawSummaryZh: "Figma 于2026年5月20日发布原生 Agent，可在文件内操作，遵守设计系统，进行批量修改并实现反馈。",
    whyWorthWatching: "Design iteration shifts from manual edits or separate chat to in-canvas collaborative agent.",
    whyWorthWatchingZh: "设计迭代从手动操作或独立聊天转向画布内 Agent 协作，创作流程和交付速度变化。",
    source: "Figma Blog",
    rawUrl: "https://www.figma.com/blog/the-figma-agent-is-here/",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "设计迭代正在从手动编辑转向画布内 Agent 直接执行批量修改和反馈。",
      whyToday: "Figma Agent 正式发布并集成到核心工作流。",
      possibleUserValue: "让 Agent 直接处理重复修改，设计师专注决策。",
      noiseToIgnore: "生成速度，重点是设计系统遵守程度。",
      labelPotential: "Figma Agent 画布内批量执行"
    }
  },
  {
    id: "DC-02",
    shelfId: "design-creation",
    shelfTitle: "Design & Creation / 设计创作",
    rawTitle: "Figma Make connects design frames to local codebase editing",
    rawTitleZh: "Figma Make 将设计帧直接连接本地代码库，支持视觉编辑和 PR 提交",
    rawSummary: "Figma launched Make beta allowing designers to prompt AI on canvas elements that then edit connected local code, create branches and open PRs.",
    rawSummaryZh: "Figma Make beta 支持在画布上提示 AI 修改连接的本地代码库，并创建分支和 PR。",
    whyWorthWatching: "Design-to-code handoff becomes bidirectional visual-code editing in one tool.",
    whyWorthWatchingZh: "设计到代码交付从单向导出转向双向视觉-代码编辑，客户验收标准变化。",
    source: "Figma Release Notes",
    rawUrl: "https://www.figma.com/release-notes/",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "设计-开发交接正在从静态 handoff 转向 Figma 内双向视觉代码编辑。",
      whyToday: "Make beta 发布后被产品团队快速测试。",
      possibleUserValue: "设计师修改设计后直接生成 PR，减少开发往返。",
      noiseToIgnore: "单个组件效果，关注代码质量。",
      labelPotential: "Figma Make 设计直连代码 PR"
    }
  },
  {
    id: "DC-03",
    shelfId: "design-creation",
    shelfTitle: "Design & Creation / 设计创作",
    rawTitle: "TopView Canvas storyboard-first workflow for AI video production",
    rawTitleZh: "TopView Canvas 以 storyboard 画布先行规划 AI 视频生成",
    rawSummary: "TopView Canvas allows creators to build Figma-style storyboards with AI images, refine shots on infinite canvas, then render with consistent models.",
    rawSummaryZh: "TopView Canvas 支持用 Figma 风格画布创建 storyboard，先规划镜头再用 AI 渲染视频。",
    whyWorthWatching: "AI video creation shifts from prompt-first to structured storyboard planning.",
    whyWorthWatchingZh: "AI 视频创作从直接提示生成转向 storyboard 先行规划，过程控制和交付一致性变化。",
    source: "X / TopviewAI creators",
    rawUrl: "grok-search://TopView Canvas storyboard AI video May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 视频创作流程正在从提示生成转向 storyboard 结构化规划。",
      whyToday: "创作者反馈规划后一致性显著提升。",
      possibleUserValue: "先在画布规划镜头，避免后期大量重做。",
      noiseToIgnore: "单帧生成质量，重点是多镜头连贯性。",
      labelPotential: "Storyboard-first AI 视频规划"
    }
  },
  {
    id: "DC-04",
    shelfId: "design-creation",
    shelfTitle: "Design & Creation / 设计创作",
    rawTitle: "Adobe Firefly Content Credentials for provenance tracking in client delivery",
    rawTitleZh: "Adobe Firefly 加强 Content Credentials，在交付文件中记录 AI 生成过程",
    rawSummary: "Adobe expanded Content Credentials metadata in Firefly outputs to record generation steps, models used, and edits for enterprise client handoff.",
    rawSummaryZh: "Adobe Firefly 在输出中扩展 Content Credentials 元数据，记录生成步骤和编辑历史用于交付。",
    whyWorthWatching: "Client delivery standards now require provenance proof for AI assets.",
    whyWorthWatchingZh: "客户交付标准从单纯文件转向必须附带来源证明的 AI 资产，版权和验收流程变化。",
    source: "Adobe Firefly",
    rawUrl: "https://www.adobe.com/products/firefly.html",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "设计交付正在从纯视觉文件转向附带 provenance 元数据的可验证资产。",
      whyToday: "企业客户对 AI 内容来源审查要求增加。",
      possibleUserValue: "交付时提供生成记录，减少版权质疑。",
      noiseToIgnore: "生成效果，关注元数据完整性。",
      labelPotential: "Firefly 交付带 provenance 证明"
    }
  },
  {
    id: "DC-05",
    shelfId: "design-creation",
    shelfTitle: "Design & Creation / 设计创作",
    rawTitle: "Canva Magic Studio Brand Intelligence enforces consistency across localized campaigns",
    rawTitleZh: "Canva Magic Studio Brand Intelligence 自动在本地化营销活动中强制品牌一致性",
    rawSummary: "Canva's updated Magic Studio uses Brand Kit to auto-adjust AI-generated assets for regional campaigns while maintaining corporate fonts, colors and logos.",
    rawSummaryZh: "Canva Magic Studio 使用 Brand Kit 在 AI 生成本地化营销素材时自动保持品牌字体、颜色和 logo 一致。",
    whyWorthWatching: "Campaign localization shifts from manual adaptation to AI-enforced brand rules.",
    whyWorthWatchingZh: "营销活动本地化从人工调整转向 AI 自动强制品牌规则，创作效率和一致性变化。",
    source: "Canva Blog",
    rawUrl: "grok-search://Canva Magic Studio Brand Intelligence 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "品牌素材本地化正在从人工调整转向 AI 自动强制一致性规则。",
      whyToday: "跨区域营销团队大规模采用。",
      possibleUserValue: "快速生成多语言版本同时保持品牌准确。",
      noiseToIgnore: "生成速度，关注品牌偏差率。",
      labelPotential: "Canva AI 自动品牌本地化"
    }
  },
  {
    id: "DC-06",
    shelfId: "design-creation",
    shelfTitle: "Design & Creation / 设计创作",
    rawTitle: "LTX Studio AI storyboard to multi-model video orchestration",
    rawTitleZh: "LTX Studio 从 AI storyboard 直接编排多模型视频生成",
    rawSummary: "LTX Studio added workflow where AI storyboard frames are automatically routed to Kling, Runway or Seedance for consistent character and scene production.",
    rawSummaryZh: "LTX Studio 支持 AI storyboard 帧自动路由到 Kling、Runway 等模型生成一致角色和场景视频。",
    whyWorthWatching: "Video production moves from model-by-model prompting to orchestrated multi-tool pipeline.",
    whyWorthWatchingZh: "视频生产从单一模型提示转向多工具编排管道，创作过程标准化。",
    source: "LTX Studio",
    rawUrl: "https://ltx.studio/blog/ai-video-workflow",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 视频生产正在从逐模型提示转向 storyboard 驱动的多模型编排。",
      whyToday: "多模型一致性问题推动工具集成。",
      possibleUserValue: "用一个 storyboard 管理整个视频生产链。",
      noiseToIgnore: "单模型效果，关注镜头过渡质量。",
      labelPotential: "LTX Studio 多模型 storyboard 编排"
    }
  },
  {
    id: "DC-07",
    shelfId: "design-creation",
    shelfTitle: "Design & Creation / 设计创作",
    rawTitle: "Figma AI Replace Content with realistic contextual copy in prototypes",
    rawTitleZh: "Figma AI Replace Content 在原型中自动生成真实上下文文案",
    rawSummary: "Figma's Replace Content feature now generates context-aware copy directly in frames based on surrounding design elements and user flows.",
    rawSummaryZh: "Figma Replace Content 功能根据周围设计元素和用户流自动生成上下文真实文案。",
    whyWorthWatching: "Prototype creation shifts from placeholder text to realistic content faster.",
    whyWorthWatchingZh: "原型制作从占位符文本转向 AI 快速生成真实内容，客户评审标准变化。",
    source: "Figma Release Notes",
    rawUrl: "https://www.figma.com/release-notes/",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "原型内容填充正在从手动占位符转向 AI 上下文自动生成。",
      whyToday: "Figma 2026 更新中广泛使用。",
      possibleUserValue: "更快创建可用于用户测试的真实原型。",
      noiseToIgnore: "文案创意度，关注与品牌语气匹配。",
      labelPotential: "Figma AI 真实上下文文案"
    }
  },
  {
    id: "DC-08",
    shelfId: "design-creation",
    shelfTitle: "Design & Creation / 设计创作",
    rawTitle: "Claude Design exports clean design systems to Figma components",
    rawTitleZh: "Claude Design 将生成的设计系统干净导出为 Figma 组件",
    rawSummary: "Claude Design tool now exports structured design systems with variants and tokens directly compatible with Figma component libraries.",
    rawSummaryZh: "Claude Design 支持将生成的设计系统以 variants 和 tokens 形式干净导出到 Figma 组件库。",
    whyWorthWatching: "Design system creation moves from manual component building to AI-generated + handoff.",
    whyWorthWatchingZh: "设计系统构建从手动创建组件转向 AI 生成后直接 handoff，维护流程变化。",
    source: "X / Design community",
    rawUrl: "grok-search://Claude Design Figma export May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "设计系统创建正在从手动搭建组件转向 AI 生成加 Figma 干净导出。",
      whyToday: "设计师反馈导出质量可直接用于生产。",
      possibleUserValue: "快速启动新项目的设计系统。",
      noiseToIgnore: "视觉风格，关注组件结构完整性。",
      labelPotential: "Claude Design 到 Figma 系统导出"
    }
  },
  {
    id: "DC-09",
    shelfId: "design-creation",
    shelfTitle: "Design & Creation / 设计创作",
    rawTitle: "Runway + Kling consistent character workflow via reference frames",
    rawTitleZh: "Runway 与 Kling 通过参考帧实现一致角色视频工作流",
    rawSummary: "Creators established workflows using Midjourney reference frames fed into Kling and Runway to maintain character consistency across shots.",
    rawSummaryZh: "创作者用 Midjourney 参考帧输入 Kling 和 Runway，实现多镜头角色一致性视频制作。",
    whyWorthWatching: "Long-form AI video production requires reference-driven consistency pipelines.",
    whyWorthWatchingZh: "长形式 AI 视频生产从随机生成转向参考帧驱动的一致性管道，交付标准变化。",
    source: "Creator tutorials",
    rawUrl: "grok-search://Runway Kling consistent character workflow 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 视频角色一致性正在从随机生成转向参考帧驱动的多工具管道。",
      whyToday: "叙事视频需求增加推动实践成熟。",
      possibleUserValue: "制作带固定角色的短视频系列。",
      noiseToIgnore: "单次生成质量，关注跨镜头连贯性。",
      labelPotential: "Runway Kling 参考帧一致角色"
    }
  },
  {
    id: "DC-10",
    shelfId: "design-creation",
    shelfTitle: "Design & Creation / 设计创作",
    rawTitle: "Canva AI client review workflow with real-time Magic Edit suggestions",
    rawTitleZh: "Canva AI 支持客户评审中实时 Magic Edit 建议修改",
    rawSummary: "Canva teams use shared Magic Studio sessions where clients suggest changes and AI applies edits in real-time during review calls.",
    rawSummaryZh: "Canva 团队在共享 Magic Studio 会话中，客户提出修改建议时 AI 实时应用编辑。",
    whyWorthWatching: "Client feedback loop shortens from revision rounds to live co-editing.",
    whyWorthWatchingZh: "客户反馈循环从多轮修改转向实时 AI 共同编辑，交付验收速度变化。",
    source: "Canva user reports",
    rawUrl: "grok-search://Canva Magic Studio client review workflow May 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "客户评审流程正在从多轮往返修改转向实时 AI 共同编辑。",
      whyToday: "远程协作需求下被营销团队采用。",
      possibleUserValue: "评审会上立即看到修改效果。",
      noiseToIgnore: "AI 创意水平，关注修改控制权。",
      labelPotential: "Canva 实时客户 AI 共同编辑"
    }
  },
  {
    id: "DC-11",
    shelfId: "design-creation",
    shelfTitle: "Design & Creation / 设计创作",
    rawTitle: "Adobe Firefly enterprise IP indemnification for commercial campaigns",
    rawTitleZh: "Adobe Firefly 为企业商业活动提供 IP  indemnification 保障",
    rawSummary: "Adobe offers IP indemnification on Firefly-generated assets for enterprise customers using licensed training data.",
    rawSummaryZh: "Adobe 为使用 Firefly 生成素材的企业客户提供 IP 赔偿保障，基于授权训练数据。",
    whyWorthWatching: "Commercial use risk management becomes a core part of design tool selection.",
    whyWorthWatchingZh: "商业使用风险管理从个人判断转向工具提供的法律保障，采购和交付决策变化。",
    source: "Adobe",
    rawUrl: "https://www.adobe.com/products/firefly.html",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 设计资产商业使用正在从风险自担转向工具提供 IP 法律保障。",
      whyToday: "企业法务部门审查严格化。",
      possibleUserValue: "放心用于高价值营销活动。",
      noiseToIgnore: "免费版限制，关注企业协议条款。",
      labelPotential: "Firefly 企业 IP 赔偿保障"
    }
  },
  {
    id: "DC-12",
    shelfId: "design-creation",
    shelfTitle: "Design & Creation / 设计创作",
    rawTitle: "Figma AI design system auto-update across team files",
    rawTitleZh: "Figma AI 自动在团队文件中更新设计系统变更",
    rawSummary: "Figma Agent can detect design system updates and propagate changes across multiple team files with approval workflows.",
    rawSummaryZh: "Figma Agent 可检测设计系统更新，并在团队多个文件中自动传播变更并走审批流程。",
    whyWorthWatching: "Design system maintenance shifts from manual updates to AI-assisted propagation.",
    whyWorthWatchingZh: "设计系统维护从手动更新转向 AI 辅助自动传播，团队协作效率变化。",
    source: "Figma announcements",
    rawUrl: "https://www.figma.com/release-notes/",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "设计系统维护正在从手动跨文件更新转向 AI 自动传播和审批。",
      whyToday: "大型团队文件数量增加推动需求。",
      possibleUserValue: "更新一次 token 即可同步全团队。",
      noiseToIgnore: "自动化程度，关注变更审核准确性。",
      labelPotential: "Figma AI 设计系统自动更新"
    }
  }
];

export const marketCapitalSignals = [
  {
    id: "MC-01",
    shelfId: "market-capital",
    shelfTitle: "Market & Capital / 市场资本",
    rawTitle: "Iris Energy secures $3.6B financing for NVIDIA GPUs in Microsoft AI deal",
    rawTitleZh: "Iris Energy 为 Microsoft AI 合同获得 36 亿美元融资，用于采购 NVIDIA GPU",
    rawSummary: "Iris Energy closed $2.1B private bonds and $1.5B project loans to purchase NVIDIA GB300 GPUs for a 750MW Childress campus serving a five-year Microsoft contract.",
    rawSummaryZh: "Iris Energy 完成 21 亿债券和 15 亿项目贷款，用于采购 NVIDIA GB300 GPU，支持 750MW 数据中心服务 Microsoft 五年合同。",
    whyWorthWatching: "GPU procurement shifts to project-specific structured financing tied to hyperscaler contracts.",
    whyWorthWatchingZh: "GPU 采购从通用资本开支转向与 hyperscaler 合同绑定的专项结构化融资，资本分配方式变化。",
    source: "X / Financial reports",
    rawUrl: "https://x.com/search?q=Iris%20Energy%20Microsoft%20GPU%20financing",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI infra 采购融资正在从通用企业贷款转向专项项目融资绑定 hyperscaler 合同。",
      whyToday: "大型合同落地推动金融机构提供针对性融资。",
      possibleUserValue: "理解 AI 增长如何通过项目融资实现，而非单纯股权稀释。",
      noiseToIgnore: "单一公司股价，关注融资结构可复制性。",
      labelPotential: "GPU 项目融资绑定 Microsoft 合同"
    }
  },
  {
    id: "MC-02",
    shelfId: "market-capital",
    shelfTitle: "Market & Capital / 市场资本",
    rawTitle: "Power availability becomes primary bottleneck over capital for US data centers",
    rawTitleZh: "美国数据中心开发中电力可用性取代资本成为首要瓶颈",
    rawSummary: "Ropes & Gray report notes power grid interconnections take up to 4 years, leading to Bring-Your-Own-Power solutions and hybrid financing structures.",
    rawSummaryZh: "报告指出电网接入需长达 4 年，推动自备电源方案和混合融资结构出现。",
    whyWorthWatching: "Capital flows shift from pure compute to power infrastructure and BYOP projects.",
    whyWorthWatchingZh: "资本流向从纯算力采购转向电力基础设施和自备电源项目，资源分配优先级变化。",
    source: "Ropes & Gray",
    rawUrl: "https://www.ropesgray.com/en/insights/viewpoints/102mvfl/data-center-investment-in-2026-ai-demand-power-constraints-and-private-equity",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 数据中心资本分配正在从算力主导转向电力基础设施优先。",
      whyToday: "电网延迟实际影响 2026 项目落地进度。",
      possibleUserValue: "评估 AI 项目时优先检查电力保障而非仅 GPU 预算。",
      noiseToIgnore: "宏观需求预测，关注具体 BYOP 融资案例。",
      labelPotential: "电力成为数据中心首要瓶颈"
    }
  },
  {
    id: "MC-03",
    shelfId: "market-capital",
    shelfTitle: "Market & Capital / 市场资本",
    rawTitle: "Xiaomi slashes API prices by up to 99% in China AI price war",
    rawTitleZh: "小米在中国 AI API 价格战中最高降价 99%",
    rawSummary: "Xiaomi cut prices up to 99% for MiMo-V2.5 series, resetting token packages as part of aggressive market share push.",
    rawSummaryZh: "小米对 MiMo-V2.5 系列 API 最高降价 99%，重置 token 套餐以争夺市场份额。",
    whyWorthWatching: "Inference pricing competition accelerates commoditization at the model layer.",
    whyWorthWatchingZh: "推理 API 定价竞争加速模型层商品化，商业模式从高价转向规模取胜。",
    source: "Trending Topics",
    rawUrl: "https://www.trendingtopics.eu/chinas-ai-price-war-escalates-as-xiaomi-slashes-api-costs-by-99-percent/",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI API 商业模式正在从高单价转向激进降价争夺规模和市场份额。",
      whyToday: "中国市场竞争白热化推动公开大幅降价。",
      possibleUserValue: "企业采购时可大幅降低推理成本，但需评估长期稳定性。",
      noiseToIgnore: "单一降价幅度，关注可持续毛利影响。",
      labelPotential: "API 价格战最高降 99%"
    }
  },
  {
    id: "MC-04",
    shelfId: "market-capital",
    shelfTitle: "Market & Capital / 市场资本",
    rawTitle: "Hyperscalers commit $600-630B capex in 2026 with power equipment as hard constraint",
    rawTitleZh: "Hyperscalers 2026 年承诺 6000-6300 亿美元资本开支，电力设备成硬约束",
    rawSummary: "Big Five hyperscalers allocated majority of 2026 capex to AI but face 36-52 week GPU lead times and multi-year transformer delays.",
    rawSummaryZh: "五大 hyperscaler 2026 年大部分资本开支用于 AI，但面临 GPU 长交付期和变压器多年延迟。",
    whyWorthWatching: "Enterprise and hyperscale procurement now bottlenecked by electrical infrastructure rather than chips.",
    whyWorthWatchingZh: "企业和 hyperscale 采购从芯片短缺转向电力设备瓶颈，资本部署节奏变化。",
    source: "Industry reports",
    rawUrl: "grok-search://Hyperscalers 2026 AI capex power equipment bottleneck",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 资本开支部署正在从芯片采购转向受电力设备交付限制的节奏控制。",
      whyToday: "2026 大额 capex 计划实际执行中暴露设备短缺。",
      possibleUserValue: "规划 AI 项目预算时预留更长电力基础设施时间。",
      noiseToIgnore: "总 capex 数字，关注实际 energized 容量。",
      labelPotential: "电力设备成 AI capex 硬约束"
    }
  },
  {
    id: "MC-05",
    shelfId: "market-capital",
    shelfTitle: "Market & Capital / 市场资本",
    rawTitle: "Nebius acquires Eigen AI for $643M to strengthen inference optimization",
    rawTitleZh: "Nebius 以 6.43 亿美元收购 Eigen AI 强化推理优化能力",
    rawSummary: "Nebius acquired the 20-person MIT inference startup Eigen AI to own more of the inference stack and optimization layer.",
    rawSummaryZh: "Nebius 收购 MIT 推理初创 Eigen AI（20 人团队），以掌控更多推理栈优化。",
    whyWorthWatching: "Capital moves from raw model training to post-training inference efficiency plays.",
    whyWorthWatchingZh: "资本从原始模型训练层转向后训练推理效率优化层，投资重点迁移。",
    source: "Financial reports",
    rawUrl: "grok-search://Nebius acquires Eigen AI 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 资本流动正在从模型训练转向推理优化和栈控制收购。",
      whyToday: "推理成本在总支出中占比上升推动针对性收购。",
      possibleUserValue: "关注能降低每 token 成本的优化工具而非仅前沿模型。",
      noiseToIgnore: "收购估值 hype，关注实际 token 效率提升。",
      labelPotential: "Nebius 收购强化推理优化"
    }
  },
  {
    id: "MC-06",
    shelfId: "market-capital",
    shelfTitle: "Market & Capital / 市场资本",
    rawTitle: "Transformers and high-voltage equipment lead times extend to 5 years",
    rawTitleZh: "变压器和高电压设备交付期延长至 5 年，成为 AI 数据中心主要限制",
    rawSummary: "Electrical equipment shortages (transformers, switchgear) now gate more AI data center projects than GPU availability.",
    rawSummaryZh: "电气设备（变压器、开关设备）短缺成为比 GPU 更关键的数据中心项目限制因素。",
    whyWorthWatching: "Infra capital reallocates toward electrical supply chain and pre-order strategies.",
    whyWorthWatchingZh: "基础设施资本从 GPU 采购重新分配到电气供应链和提前锁定策略。",
    source: "Industry analysis",
    rawUrl: "https://www.techinvestments.io/p/power-bottlenecks-and-the-ai-data",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI infra 资本优先级正在从 GPU 转向电气设备供应链锁定。",
      whyToday: "实际项目延误数据证明电力设备为主要瓶颈。",
      possibleUserValue: "早期锁定电力设备订单可显著加速项目落地。",
      noiseToIgnore: "总需求预测，关注具体设备交付案例。",
      labelPotential: "变压器交付期延长至 5 年"
    }
  },
  {
    id: "MC-07",
    shelfId: "market-capital",
    shelfTitle: "Market & Capital / 市场资本",
    rawTitle: "Enterprise AI procurement shifts to FinOps tools for inference cost control",
    rawTitleZh: "企业 AI 采购转向 FinOps 工具控制推理成本",
    rawSummary: "Companies report surprise high Claude bills and adopt AI FinOps platforms to monitor and optimize agentic workflow spend.",
    rawSummaryZh: "企业报告 Claude 等高额账单后采用 AI FinOps 平台监控和优化 agentic 工作流支出。",
    whyWorthWatching: "Procurement decision-making incorporates real-time cost observability as a core requirement.",
    whyWorthWatchingZh: "采购决策从预算审批转向包含实时成本可观测性的 FinOps 要求，支出管理变化。",
    source: "Enterprise reports",
    rawUrl: "grok-search://Enterprise AI FinOps inference cost control 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "企业 AI 采购正在从一次性预算转向持续 FinOps 成本优化控制。",
      whyToday: "Agentic AI 使用量激增导致意外高账单。",
      possibleUserValue: "引入 FinOps 工具可显著降低未预期推理支出。",
      noiseToIgnore: "单一公司账单故事，关注工具采用效果。",
      labelPotential: "AI FinOps 控制推理成本"
    }
  },
  {
    id: "MC-08",
    shelfId: "market-capital",
    shelfTitle: "Market & Capital / 市场资本",
    rawTitle: "Data center investment moves to hybrid GPU + BYOP power financing",
    rawTitleZh: "数据中心投资转向 GPU 与自备电源的混合融资结构",
    rawSummary: "Investors separate financing for GPUs/compute from Bring-Your-Own-Power solutions to mitigate grid delay risks.",
    rawSummaryZh: "投资者将 GPU/算力融资与自备电源方案分离，以降低电网延迟风险。",
    whyWorthWatching: "Capital structures evolve to de-risk power availability from compute investment.",
    whyWorthWatchingZh: "资本结构从统一融资转向分离算力和电力以分散风险，投资模式变化。",
    source: "Ropes & Gray",
    rawUrl: "https://www.ropesgray.com/en/insights/viewpoints/102mvfl/data-center-investment-in-2026-ai-demand-power-constraints-and-private-equity",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 数据中心融资正在从统一资本包转向 GPU 与电力分离的混合结构。",
      whyToday: "电网延误迫使项目采用新融资方式。",
      possibleUserValue: "投资或采购时优先选择有独立电力保障的项目。",
      noiseToIgnore: "总投资额，关注风险分散效果。",
      labelPotential: "GPU + BYOP 混合融资"
    }
  },
  {
    id: "MC-09",
    shelfId: "market-capital",
    shelfTitle: "Market & Capital / 市场资本",
    rawTitle: "Hyperscalers accelerate nuclear PPA deals for long-term power cost stability",
    rawTitleZh: "Hyperscalers 加速核电购电协议以稳定长期电力成本",
    rawSummary: "Meta and others sign 20-year nuclear power contracts and data center partner financing to secure predictable power for AI expansion.",
    rawSummaryZh: "Meta 等签署 20 年核电合同及数据中心伙伴融资，确保 AI 扩张的稳定电力。",
    whyWorthWatching: "Power procurement becomes a core competitive advantage in AI infra strategy.",
    whyWorthWatchingZh: "电力采购从成本中心转向 AI 基础设施战略核心竞争力，长期合同模式变化。",
    source: "Market reports",
    rawUrl: "grok-search://Hyperscalers nuclear PPA AI data center 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 电力采购正在从短期电网接入转向长期核电购电协议锁定。",
      whyToday: "电力价格波动推动 hyperscaler 寻求稳定来源。",
      possibleUserValue: "评估供应商时查看其长期电力合同覆盖率。",
      noiseToIgnore: "单一交易，关注合同对成本的影响。",
      labelPotential: "核电 PPA 锁定 AI 电力成本"
    }
  },
  {
    id: "MC-10",
    shelfId: "market-capital",
    shelfTitle: "Market & Capital / 市场资本",
    rawTitle: "Inference cost per token drops drive enterprise shift to open-source models",
    rawTitleZh: "推理每 token 成本下降推动企业转向开源模型",
    rawSummary: "Significant inference cost reductions lead enterprises to prioritize self-hosted open models over proprietary APIs for cost control.",
    rawSummaryZh: "推理成本大幅下降促使企业优先选择自托管开源模型而非专有 API 以控制支出。",
    whyWorthWatching: "Business models shift from API consumption to on-prem/open-source deployment for high-volume use.",
    whyWorthWatchingZh: "商业模式从 API 消耗转向高量使用时的自托管开源部署，采购偏好变化。",
    source: "Industry analysis",
    rawUrl: "grok-search://Inference cost drop enterprise open-source shift 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "企业 AI 采用正在从专有 API 转向高量场景的自托管开源模型以降低成本。",
      whyToday: "成本下降达到临界点使自托管经济可行。",
      possibleUserValue: "高使用量场景下评估开源自托管可节省大量支出。",
      noiseToIgnore: "绝对成本数字，关注迁移后维护成本。",
      labelPotential: "推理成本下降转向开源自托管"
    }
  },
  {
    id: "MC-11",
    shelfId: "market-capital",
    shelfTitle: "Market & Capital / 市场资本",
    rawTitle: "Capital flows to electrical equipment suppliers for AI data centers",
    rawTitleZh: "资本流向 AI 数据中心电气设备供应商",
    rawSummary: "Investors target high-voltage transformers, switchgear and grid components as the new bottleneck winners in the AI buildout.",
    rawSummaryZh: "投资者将电气设备供应商（高压变压器、开关设备）视为 AI 建设中的新瓶颈赢家。",
    whyWorthWatching: "Investment thesis shifts from chip designers to enabling physical infrastructure vendors.",
    whyWorthWatchingZh: "投资逻辑从芯片设计转向物理基础设施使能供应商，资本流向重新分配。",
    source: "Goldman Sachs Alternatives",
    rawUrl: "grok-search://Capital flow electrical equipment AI data centers 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 相关资本正在从芯片层转向电气和物理基础设施供应商。",
      whyToday: "芯片之外的瓶颈成为主要限制因素。",
      possibleUserValue: "在 AI 供应链中寻找电气设备相关机会。",
      noiseToIgnore: "芯片公司估值，关注设备交付周期。",
      labelPotential: "电气设备成 AI 新资本赢家"
    }
  },
  {
    id: "MC-12",
    shelfId: "market-capital",
    shelfTitle: "Market & Capital / 市场资本",
    rawTitle: "Private equity increases early-stage participation in GPU and power co-financing",
    rawTitleZh: "私募股权增加对 GPU 和电力联合融资的早期参与",
    rawSummary: "PE firms provide structured preferred equity and joint ventures earlier in data center lifecycle for GPU and BYOP power packages.",
    rawSummaryZh: "私募股权在数据中心生命周期更早阶段提供 GPU 和自备电源的结构化优先股及合资融资。",
    whyWorthWatching: "Financing timeline compresses with capital entering before traditional construction milestones.",
    whyWorthWatchingZh: "融资时间线从传统建设里程碑前移，资本进入 AI 项目更早期。",
    source: "Ropes & Gray",
    rawUrl: "https://www.ropesgray.com/en/insights/viewpoints/102mvfl/data-center-investment-in-2026-ai-demand-power-constraints-and-private-equity",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "AI 项目融资正在从后期建设阶段转向更早期的 GPU+电力联合结构化投资。",
      whyToday: "项目加速需求推动 PE 提前入场。",
      possibleUserValue: "创业者可通过联合融资更快启动 AI infra 项目。",
      noiseToIgnore: "PE 总资金规模，关注具体交易条款。",
      labelPotential: "PE 早期 GPU+电力联合融资"
    }
  }
];

export const selfUpgradeSignals = [
  {
    id: "SU-01",
    shelfId: "self-upgrade",
    shelfTitle: "Self Upgrade / 自我升级",
    rawTitle: "General Motors lays off traditional IT staff and prioritizes AI-skilled hires",
    rawTitleZh: "通用汽车裁减传统 IT 员工，转而优先招聘具备 AI 技能的人才",
    rawSummary: "GM cut hundreds of legacy IT roles in Q2 2026 while increasing hiring requirements for candidates who can demonstrate practical AI agent orchestration experience.",
    rawSummaryZh: "通用汽车在2026年第二季度裁减数百传统 IT 岗位，同时提高招聘门槛，要求候选人展示实际 AI Agent 编排经验。",
    whyWorthWatching: "Corporate hiring standards now value AI workflow execution over traditional technical skills.",
    whyWorthWatchingZh: "企业招聘标准从传统技术技能转向 AI 工作流实际执行能力，职业能力要求变化。",
    source: "TechCrunch / X reports",
    rawUrl: "grok-search://General Motors AI skills hiring layoffs 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "技术岗位招聘标准正在从传统 IT 执行能力转向 AI 工作流编排验证。",
      whyToday: "GM 等大企业实际完成岗位调整和招聘转向。",
      possibleUserValue: "更新作品集重点展示 Agent 项目而非仅编程经验。",
      noiseToIgnore: "裁员总数，关注新招聘技能清单。",
      labelPotential: "GM 招聘转向 AI 技能优先"
    }
  },
  {
    id: "SU-02",
    shelfId: "self-upgrade",
    shelfTitle: "Self Upgrade / 自我升级",
    rawTitle: "Developers adding AI agent orchestration demos to portfolios on LinkedIn",
    rawTitleZh: "开发者在 LinkedIn 作品集中增加 AI Agent 编排演示项目",
    rawSummary: "Job seekers are creating public repos showing multi-agent workflows built with Cursor and Claude Code as primary portfolio pieces.",
    rawSummaryZh: "求职者在公开仓库中展示用 Cursor 和 Claude Code 构建的多 Agent 工作流，作为主要作品集内容。",
    whyWorthWatching: "Portfolio standards shift from static code samples to live agent-run demonstrations.",
    whyWorthWatchingZh: "作品集标准从静态代码样本转向可运行的 Agent 演示，求职展示方式变化。",
    source: "X / Developer community",
    rawUrl: "https://x.com/search?q=AI%20agent%20portfolio%20Cursor%20since%3A2026-05-20",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "个人作品集展示正在从静态代码转向可演示的多 Agent 工作流。",
      whyToday: "招聘方明确要求查看 Agent 项目实际运行效果。",
      possibleUserValue: "构建一个公开 Agent 项目作为求职核心证明。",
      noiseToIgnore: "项目数量，关注演示的可重复性。",
      labelPotential: "作品集增加 Agent 编排演示"
    }
  },
  {
    id: "SU-03",
    shelfId: "self-upgrade",
    shelfTitle: "Self Upgrade / 自我升级",
    rawTitle: "Tech interviews now require live Cursor or Claude Code pair programming rounds",
    rawTitleZh: "科技公司面试新增 Cursor 或 Claude Code 实时配对编程环节",
    rawSummary: "Companies including Stripe and Notion added live AI-assisted coding rounds where candidates must demonstrate effective agent prompting and review.",
    rawSummaryZh: "Stripe 和 Notion 等公司新增实时 AI 辅助编码环节，要求候选人展示有效 Agent 提示和审查能力。",
    whyWorthWatching: "Interview process now tests human-AI collaboration rather than solo coding.",
    whyWorthWatchingZh: "面试流程从单独编码测试转向人机协作能力评估，职业筛选标准变化。",
    source: "X / Interview reports",
    rawUrl: "grok-search://tech interviews Cursor Claude Code pair programming 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "技术面试正在从独立编码测试转向实时人机协作能力考察。",
      whyToday: "多家公司正式将 AI 工具纳入面试流程。",
      possibleUserValue: "练习在面试中有效引导 AI 完成复杂任务。",
      noiseToIgnore: "单一公司，关注通用协作技巧。",
      labelPotential: "面试新增 AI 配对编程"
    }
  },
  {
    id: "SU-04",
    shelfId: "self-upgrade",
    shelfTitle: "Self Upgrade / 自我升级",
    rawTitle: "Non-technical founders using Claude Code to ship first MVP in under 7 days",
    rawTitleZh: "非技术创始人用 Claude Code 在 7 天内完成首个 MVP 上线",
    rawSummary: "Multiple non-engineer founders documented building and deploying functional web apps using Claude Code + Supabase without writing traditional code.",
    rawSummaryZh: "多名非工程师创始人记录了使用 Claude Code + Supabase 构建并上线功能性 Web App 的过程，无需传统编码。",
    whyWorthWatching: "Product building capability expands beyond coding backgrounds through agent tools.",
    whyWorthWatchingZh: "产品构建能力从需要编码背景转向非技术人员通过 Agent 工具实现，创业门槛变化。",
    source: "X / Indie hacker reports",
    rawUrl: "https://x.com/search?q=Claude%20Code%20MVP%20non-technical%20since%3A2026-05-20",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "产品构建正在从需要编程技能转向非技术人员用 Agent 工具快速交付。",
      whyToday: "实际案例增多且被公开分享。",
      possibleUserValue: "非技术背景者可尝试用 Agent 验证产品想法。",
      noiseToIgnore: "成功故事，关注具体工具组合。",
      labelPotential: "非技术创始人 7 天 MVP"
    }
  },
  {
    id: "SU-05",
    shelfId: "self-upgrade",
    shelfTitle: "Self Upgrade / 自我升级",
    rawTitle: "LinkedIn profiles now highlight 'AI Workflow Builder' as primary skill",
    rawTitleZh: "LinkedIn 个人资料将 'AI Workflow Builder' 列为首要技能",
    rawSummary: "Professionals updating profiles list agent orchestration and multi-tool workflow construction as top competencies replacing traditional titles.",
    rawSummaryZh: "专业人士更新资料时，将 Agent 编排和多工具工作流构建列为首要能力，取代传统技能描述。",
    whyWorthWatching: "Self-presentation in job market shifts to emphasize AI system building skills.",
    whyWorthWatchingZh: "求职自我展示从传统技能描述转向强调 AI 系统构建能力，个人品牌变化。",
    source: "LinkedIn trends via X",
    rawUrl: "grok-search://LinkedIn AI Workflow Builder skill 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "个人技能展示正在从传统职称转向 AI 工作流构建者定位。",
      whyToday: "招聘市场对该能力认可度提升。",
      possibleUserValue: "优化简历和资料突出 Agent 项目经验。",
      noiseToIgnore: "标题流行度，关注实际项目支撑。",
      labelPotential: "LinkedIn 技能转向 AI Workflow Builder"
    }
  },
  {
    id: "SU-06",
    shelfId: "self-upgrade",
    shelfTitle: "Self Upgrade / 自我升级",
    rawTitle: "Notion AI users building persistent personal agent workspaces",
    rawTitleZh: "Notion AI 用户构建持久化个人 Agent 工作空间",
    rawSummary: "Users create long-term memory workspaces in Notion connected to Claude where agents remember project context across weeks.",
    rawSummaryZh: "用户在 Notion 中创建与 Claude 连接的长期记忆工作空间，让 Agent 记住跨周的项目上下文。",
    whyWorthWatching: "Personal knowledge management evolves from notes to persistent agent collaborators.",
    whyWorthWatchingZh: "个人知识管理从静态笔记转向持久化 Agent 协作记忆系统，个人工作流变化。",
    source: "X / Productivity community",
    rawUrl: "grok-search://Notion AI persistent agent workspace 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "个人知识管理正在从静态笔记转向持久化 Agent 记忆协作。",
      whyToday: "长期上下文保持技术成熟后被广泛应用。",
      possibleUserValue: "为个人项目建立带记忆的 Agent 助手。",
      noiseToIgnore: "工具数量，关注记忆准确性。",
      labelPotential: "Notion 持久化个人 Agent 空间"
    }
  },
  {
    id: "SU-07",
    shelfId: "self-upgrade",
    shelfTitle: "Self Upgrade / 自我升级",
    rawTitle: "Job descriptions require demonstration of agent debugging and correction",
    rawTitleZh: "招聘职位描述要求展示 Agent 调试和纠正能力",
    rawSummary: "Multiple engineering roles now list 'experience debugging and steering AI agents' as a required skill with example scenarios in interviews.",
    rawSummaryZh: "多个工程职位将 '调试和引导 AI Agent 经验' 列为必备技能，并在面试中提供示例场景。",
    whyWorthWatching: "Professional competency now includes the ability to correct and direct AI systems.",
    whyWorthWatchingZh: "职业能力要求新增调试和引导 AI 系统，技能评估标准变化。",
    source: "X / Job postings",
    rawUrl: "grok-search://job descriptions AI agent debugging 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "职业技能要求正在从执行任务转向调试和引导 AI 系统。",
      whyToday: "实际招聘 JD 中明确写入该要求。",
      possibleUserValue: "练习记录和分享 Agent 调试过程作为证明。",
      noiseToIgnore: "职位数量，关注具体调试场景。",
      labelPotential: "招聘要求 Agent 调试能力"
    }
  },
  {
    id: "SU-08",
    shelfId: "self-upgrade",
    shelfTitle: "Self Upgrade / 自我升级",
    rawTitle: "Cursor users documenting full project builds as learning artifacts",
    rawTitleZh: "Cursor 用户将完整项目构建过程记录为学习成果",
    rawSummary: "Learners are publishing end-to-end Cursor session recordings as public proof of building production features from idea to deploy.",
    rawSummaryZh: "学习者将 Cursor 完整会话记录发布，作为从想法到部署构建生产功能的公开证明。",
    whyWorthWatching: "Learning validation moves from course certificates to public project build artifacts.",
    whyWorthWatchingZh: "学习成果验证从课程证书转向公开项目构建记录，能力证明方式变化。",
    source: "X / Cursor community",
    rawUrl: "https://x.com/search?q=Cursor%20full%20project%20build%20portfolio",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "学习验证正在从课程证书转向公开完整项目构建记录。",
      whyToday: "招聘方更认可可演示的项目过程。",
      possibleUserValue: "用 Cursor 会话录像作为个人能力证明。",
      noiseToIgnore: "完成项目数量，关注构建质量。",
      labelPotential: "Cursor 项目构建作为学习证明"
    }
  },
  {
    id: "SU-09",
    shelfId: "self-upgrade",
    shelfTitle: "Self Upgrade / 自我升级",
    rawTitle: "Professionals using AI agents for weekly attention and task audits",
    rawTitleZh: "专业人士用 AI Agent 进行每周注意力与任务审计",
    rawSummary: "Users set up weekly agent reviews that analyze calendar, todo lists and output to suggest workflow adjustments.",
    rawSummaryZh: "用户设置每周 Agent 审查，分析日历、待办和产出，提出工作流调整建议。",
    whyWorthWatching: "Personal productivity management incorporates regular AI-driven system audits.",
    whyWorthWatchingZh: "个人效率管理从手动反思转向定期 AI 驱动的工作流审计，注意力管理变化。",
    source: "X / Productivity users",
    rawUrl: "grok-search://AI agent weekly attention audit 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "注意力管理正在从手动回顾转向 AI Agent 定期审计和建议。",
      whyToday: "Agent 记忆和分析能力支持实用审计。",
      possibleUserValue: "每周让 Agent 审查时间使用并优化安排。",
      noiseToIgnore: "工具 hype，关注审计建议实用性。",
      labelPotential: "AI Agent 每周注意力审计"
    }
  },
  {
    id: "SU-10",
    shelfId: "self-upgrade",
    shelfTitle: "Self Upgrade / 自我升级",
    rawTitle: "Marketing professionals building campaign tools with no-code + AI agents",
    rawTitleZh: "营销专业人士用无代码 + AI Agent 构建活动工具",
    rawSummary: "Marketing teams document creating custom lead qualification agents and content pipelines without engineering support.",
    rawSummaryZh: "营销团队记录了在无工程师支持下创建自定义潜在客户筛选 Agent 和内容管道的过程。",
    whyWorthWatching: "Domain experts extend capabilities through agent building rather than requesting IT support.",
    whyWorthWatchingZh: "领域专家从请求 IT 支持转向自主用 Agent 构建工具，职业能力扩展变化。",
    source: "X / Marketing community",
    rawUrl: "grok-search://marketing professionals no-code AI agents 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "非技术专业人士能力扩展正在从依赖 IT 转向自主 Agent 工具构建。",
      whyToday: "营销团队实际落地多个内部工具。",
      possibleUserValue: "学习用 Agent 自动化领域重复工作。",
      noiseToIgnore: "单一成功案例，关注工具维护成本。",
      labelPotential: "营销人自主构建 AI Agent 工具"
    }
  },
  {
    id: "SU-11",
    shelfId: "self-upgrade",
    shelfTitle: "Self Upgrade / 自我升级",
    rawTitle: "University courses shift final assessment to AI agent project delivery",
    rawTitleZh: "大学课程将最终考核转向 AI Agent 项目交付",
    rawSummary: "Several CS and business programs changed capstone projects to require students to deliver functional multi-agent systems instead of traditional reports.",
    rawSummaryZh: "多所大学 CS 和商科课程将毕业项目改为要求交付功能性多 Agent 系统，而非传统报告。",
    whyWorthWatching: "Educational validation moves from theoretical knowledge to deployable agent systems.",
    whyWorthWatchingZh: "教育成果验证从理论知识转向可部署的 Agent 系统，学习评估标准变化。",
    source: "University announcements via X",
    rawUrl: "grok-search://university capstone AI agent projects 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "学习评估正在从理论报告转向交付实际可运行的 Agent 项目。",
      whyToday: "课程大纲更新反映行业需求。",
      possibleUserValue: "以构建可交付 Agent 项目作为学习目标。",
      noiseToIgnore: "学校名称，关注项目复杂度。",
      labelPotential: "课程考核转向 Agent 项目交付"
    }
  },
  {
    id: "SU-12",
    shelfId: "self-upgrade",
    shelfTitle: "Self Upgrade / 自我升级",
    rawTitle: "Career switchers document 30-day AI workflow mastery challenges",
    rawTitleZh: "转行者记录 30 天 AI 工作流掌握挑战",
    rawSummary: "Professionals from non-tech backgrounds publicly share 30-day logs of mastering Cursor, Claude Code and building their first automated workflows.",
    rawSummaryZh: "非技术背景专业人士公开分享 30 天掌握 Cursor、Claude Code 并构建首个自动化工作流的记录。",
    whyWorthWatching: "Career transition paths now center on rapid AI tool workflow acquisition.",
    whyWorthWatchingZh: "职业转型路径从长期学习转向 30 天内掌握 AI 工作流，学习节奏变化。",
    source: "X / Career transition posts",
    rawUrl: "https://x.com/search?q=30%20day%20AI%20workflow%20mastery%20since%3A2026-05-01",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "职业转型学习正在从长期积累转向短周期 AI 工作流掌握挑战。",
      whyToday: "公开分享的 30 天案例被广泛参考。",
      possibleUserValue: "设定 30 天目标构建个人第一个 AI 工作流。",
      noiseToIgnore: "挑战成功率，关注具体工具序列。",
      labelPotential: "30 天 AI 工作流掌握挑战"
    }
  }
];

export const lifeSignalsSignals = [
  {
    id: "LS-01",
    shelfId: "life-signals",
    shelfTitle: "Life Signals / 生活信号",
    rawTitle: "Kmart Australia launches AI virtual try-on for online clothing purchases",
    rawTitleZh: "Kmart 澳大利亚推出 AI 虚拟试穿工具，用于在线服装购买决策",
    rawSummary: "Kmart shoppers use AI virtual try-on on mobile to see how clothes fit on their body before purchase, reducing return rates.",
    rawSummaryZh: "Kmart 顾客在手机上使用 AI 虚拟试穿查看衣服上身效果后再下单，降低退货率。",
    whyWorthWatching: "Shopping decisions shift from visual guesswork to personalized body-fit simulation.",
    whyWorthWatchingZh: "购物决策从看图猜测转向基于个人体型的 AI 虚拟试穿，消费决策过程变化。",
    source: "Retail news",
    rawUrl: "grok-search://Kmart AI virtual try-on 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "消费决策正在从图片猜测转向 AI 虚拟试穿的个性化体型模拟。",
      whyToday: "电商退货成本压力下实际落地应用。",
      possibleUserValue: "购物前用虚拟试穿验证合身度，减少不必要退货。",
      noiseToIgnore: "品牌推广活动，关注实际退货率下降。",
      labelPotential: "Kmart AI 虚拟试穿决策"
    }
  },
  {
    id: "LS-02",
    shelfId: "life-signals",
    shelfTitle: "Life Signals / 生活信号",
    rawTitle: "Parents using AI agents to create personalized weekly meal plans for children",
    rawTitleZh: "家长用 AI Agent 为孩子制定个性化每周饮食计划",
    rawSummary: "Singapore parents input child age, allergies and preferences into AI tools to generate weekly meal plans with shopping lists.",
    rawSummaryZh: "新加坡家长输入孩子年龄、过敏和偏好，让 AI 生成每周饮食计划和购物清单。",
    whyWorthWatching: "Family meal decisions move from routine repetition to data-driven personalized planning.",
    whyWorthWatchingZh: "家庭饮食决策从固定重复转向基于孩子数据的个性化 AI 规划，日常育儿变化。",
    source: "X / Parent community",
    rawUrl: "https://x.com/search?q=AI%20meal%20plan%20children%20Singapore",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "家庭饮食规划正在从经验重复转向 AI 个性化数据驱动的每周计划。",
      whyToday: "家长群实际分享和使用增多。",
      possibleUserValue: "输入家庭成员信息后获得实用饮食和购物建议。",
      noiseToIgnore: "单一成功故事，关注过敏处理准确性。",
      labelPotential: "AI 为孩子制定每周饮食计划"
    }
  },
  {
    id: "LS-03",
    shelfId: "life-signals",
    shelfTitle: "Life Signals / 生活信号",
    rawTitle: "Students in Singapore use AI to build personalized weekly study schedules",
    rawTitleZh: "新加坡学生使用 AI 制定个性化每周学习时间表",
    rawSummary: "Secondary school students feed exam dates, subject weaknesses and extracurriculars into AI to generate balanced weekly timetables.",
    rawSummaryZh: "中学生输入考试日期、弱项科目和课外活动，让 AI 生成平衡的每周学习时间表。",
    whyWorthWatching: "Student time management shifts from manual planning to AI-optimized schedules.",
    whyWorthWatchingZh: "学生时间管理从手动安排转向 AI 优化的平衡时间表，学习决策变化。",
    source: "X / Singapore students",
    rawUrl: "grok-search://Singapore students AI study schedule 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "学生学习规划正在从手动安排转向 AI 综合多因素的个性化时间表。",
      whyToday: "考试季学生实际使用反馈增加。",
      possibleUserValue: "让 AI 平衡学习、休息和活动安排。",
      noiseToIgnore: "工具数量，关注时间表可执行性。",
      labelPotential: "AI 制定个性化学习时间表"
    }
  },
  {
    id: "LS-04",
    shelfId: "life-signals",
    shelfTitle: "Life Signals / 生活信号",
    rawTitle: "Commuters in Singapore use AI to optimize daily MRT and bus routes with real-time factors",
    rawTitleZh: "新加坡通勤者用 AI 结合实时因素优化每日地铁和巴士路线",
    rawSummary: "Users input work start time, weather and crowd preferences to get daily personalized commuting suggestions.",
    rawSummaryZh: "用户输入上班时间、天气和拥挤偏好，让 AI 提供每日个性化通勤路线建议。",
    whyWorthWatching: "Daily commuting decisions incorporate multiple live variables through AI.",
    whyWorthWatchingZh: "日常通勤决策从固定路线转向 AI 综合天气和拥挤等因素的优化。",
    source: "X / Singapore commuters",
    rawUrl: "grok-search://Singapore AI commute optimization MRT 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "通勤决策正在从固定习惯转向 AI 实时多因素动态优化。",
      whyToday: "高峰期拥挤和天气影响下实际使用增多。",
      possibleUserValue: "每天快速获得更舒适或更快的通勤方案。",
      noiseToIgnore: "省时分钟数，关注建议可靠性。",
      labelPotential: "AI 优化每日新加坡通勤路线"
    }
  },
  {
    id: "LS-05",
    shelfId: "life-signals",
    shelfTitle: "Life Signals / 生活信号",
    rawTitle: "Families using AI agents for weekend activity planning in Singapore",
    rawTitleZh: "新加坡家庭用 AI Agent 规划周末活动",
    rawSummary: "Parents describe using AI to suggest family activities considering weather, budget, child ages and location.",
    rawSummaryZh: "家长用 AI 综合天气、预算、孩子年龄和位置，建议周末家庭活动。",
    whyWorthWatching: "Weekend family decisions move from discussion fatigue to structured AI recommendations.",
    whyWorthWatchingZh: "周末家庭决策从反复讨论转向结构化 AI 推荐，家庭生活组织方式变化。",
    source: "X / Singapore families",
    rawUrl: "grok-search://Singapore family AI weekend planning 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "家庭周末规划正在从人工讨论转向 AI 多约束条件推荐。",
      whyToday: "双职工家庭时间有限推动工具使用。",
      possibleUserValue: "输入家庭条件后获得可执行的周末活动建议。",
      noiseToIgnore: "活动创意，关注实用性和预算匹配。",
      labelPotential: "AI 规划新加坡家庭周末活动"
    }
  },
  {
    id: "LS-06",
    shelfId: "life-signals",
    shelfTitle: "Life Signals / 生活信号",
    rawTitle: "Singapore residents use AI for HDB renovation material and contractor selection",
    rawTitleZh: "新加坡居民用 AI 辅助 HDB 翻新材料和承包商选择",
    rawSummary: "Homeowners input budget, style preferences and flat size into AI tools to get shortlisted materials and vetted contractors.",
    rawSummaryZh: "屋主输入预算、风格偏好和单位大小，让 AI 提供材料和承包商短名单。",
    whyWorthWatching: "Major home decisions shift to data-comparison assisted by AI.",
    whyWorthWatchingZh: "家居翻新决策从信息搜集转向 AI 数据对比辅助选择，重大消费决策变化。",
    source: "X / Singapore homeowners",
    rawUrl: "grok-search://Singapore HDB AI renovation planning 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "家居翻新决策正在从手动比价转向 AI 综合条件短名单推荐。",
      whyToday: "HDB 翻新需求高峰期实际使用。",
      possibleUserValue: "减少翻新前的调研时间和决策焦虑。",
      noiseToIgnore: "推荐数量，关注承包商验证机制。",
      labelPotential: "AI 辅助 HDB 翻新材料选择"
    }
  },
  {
    id: "LS-07",
    shelfId: "life-signals",
    shelfTitle: "Life Signals / 生活信号",
    rawTitle: "Elderly Singaporeans use AI voice agents for daily medication and appointment reminders",
    rawTitleZh: "新加坡老年人使用 AI 语音 Agent 处理每日服药和预约提醒",
    rawSummary: "Seniors interact with voice AI that tracks prescriptions, schedules doctor visits and sends family updates.",
    rawSummaryZh: "老年人通过语音 AI 跟踪处方药、管理医生预约并向家人发送更新。",
    whyWorthWatching: "Daily health management for elderly becomes conversational and proactive.",
    whyWorthWatchingZh: "老年人日常健康管理从手动记录转向对话式主动 AI 协助，家庭照护方式变化。",
    source: "X / Singapore elderly care",
    rawUrl: "grok-search://Singapore elderly AI voice medication reminder 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "老年人健康管理正在从手动记录转向语音对话的主动 AI 协助。",
      whyToday: "高龄化社会下实际家庭使用增加。",
      possibleUserValue: "为家中老人设置简单语音健康助手。",
      noiseToIgnore: "技术新奇，关注提醒准确率。",
      labelPotential: "AI 语音 Agent 老人服药提醒"
    }
  },
  {
    id: "LS-08",
    shelfId: "life-signals",
    shelfTitle: "Life Signals / 生活信号",
    rawTitle: "Young professionals in Singapore use AI for weekly grocery shopping list optimization",
    rawTitleZh: "新加坡年轻专业人士用 AI 优化每周杂货购物清单",
    rawSummary: "Users scan fridge photos and input dietary goals to receive optimized shopping lists with price comparisons.",
    rawSummaryZh: "用户扫描冰箱照片并输入饮食目标，让 AI 生成优化购物清单并比价。",
    whyWorthWatching: "Grocery consumption decisions become waste-reducing and goal-aligned.",
    whyWorthWatchingZh: "杂货消费决策从随意购买转向 AI 减少浪费和匹配目标的优化。",
    source: "X / Singapore young professionals",
    rawUrl: "grok-search://Singapore AI grocery shopping list optimization 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "每周购物决策正在从随意采购转向 AI 基于库存和目标的优化清单。",
      whyToday: "生活成本压力下实用性被认可。",
      possibleUserValue: "每周扫描冰箱后获得智能购物建议。",
      noiseToIgnore: "节省金额，关注饮食目标匹配度。",
      labelPotential: "AI 优化每周杂货购物"
    }
  },
  {
    id: "LS-09",
    shelfId: "life-signals",
    shelfTitle: "Life Signals / 生活信号",
    rawTitle: "Singapore parents use AI chat for real-time primary school homework guidance",
    rawTitleZh: "新加坡家长使用 AI 聊天实时指导小学生家庭作业",
    rawSummary: "Parents describe using AI to explain math problems and generate practice questions tailored to their child's current topic.",
    rawSummaryZh: "家长用 AI 解释数学问题，并根据孩子当前课题生成练习题。",
    whyWorthWatching: "After-school academic support shifts to on-demand AI explanation.",
    whyWorthWatchingZh: "课后学术支持从家长直接教学转向按需 AI 解释和练习，家庭教育决策变化。",
    source: "X / Singapore parents",
    rawUrl: "grok-search://Singapore parents AI homework guidance 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "家庭作业辅导正在从家长直接教学转向按需 AI 个性化解释和练习。",
      whyToday: "小学生家长工作忙碌推动使用。",
      possibleUserValue: "孩子遇到难题时快速获得针对性指导。",
      noiseToIgnore: "使用频率，关注解释准确性。",
      labelPotential: "AI 实时小学生作业指导"
    }
  },
  {
    id: "LS-10",
    shelfId: "life-signals",
    shelfTitle: "Life Signals / 生活信号",
    rawTitle: "Fitness enthusiasts in Singapore use AI for daily running route suggestions",
    rawTitleZh: "新加坡健身爱好者用 AI 获取每日跑步路线建议",
    rawSummary: "Runners input fitness level, time available and weather to receive safe and optimal route recommendations.",
    rawSummaryZh: "跑步者输入健身水平、可用时间和天气，让 AI 推荐安全且优化的跑步路线。",
    whyWorthWatching: "Exercise decisions incorporate real-time environmental and personal factors.",
    whyWorthWatchingZh: "运动决策从固定路线转向 AI 结合天气和个人水平的动态推荐。",
    source: "X / Singapore fitness",
    rawUrl: "grok-search://Singapore AI running route suggestions 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "日常运动决策正在从固定习惯转向 AI 实时环境和个人因素优化。",
      whyToday: "户外运动安全和效率需求增加。",
      possibleUserValue: "根据当天条件获得合适跑步或锻炼建议。",
      noiseToIgnore: "路线数量，关注安全考虑。",
      labelPotential: "AI 推荐每日跑步路线"
    }
  },
  {
    id: "LS-11",
    shelfId: "life-signals",
    shelfTitle: "Life Signals / 生活信号",
    rawTitle: "Singapore couples use AI to plan balanced date nights within budget",
    rawTitleZh: "新加坡情侣用 AI 在预算内规划平衡约会夜晚",
    rawSummary: "Couples input preferences, budget and available time for AI to suggest restaurant + activity combinations.",
    rawSummaryZh: "情侣输入偏好、预算和时间，让 AI 建议餐厅和活动组合。",
    whyWorthWatching: "Leisure planning becomes efficient and balanced through AI coordination.",
    whyWorthWatchingZh: "休闲约会规划从手动搜索转向 AI 高效平衡的建议，消费和时间决策变化。",
    source: "X / Singapore young couples",
    rawUrl: "grok-search://Singapore couples AI date night planning 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "约会休闲规划正在从手动搜索转向 AI 预算和偏好平衡协调。",
      whyToday: "年轻上班族时间有限。",
      possibleUserValue: "快速获得性价比高的约会方案。",
      noiseToIgnore: "浪漫程度，关注实用匹配度。",
      labelPotential: "AI 规划预算内约会夜晚"
    }
  },
  {
    id: "LS-12",
    shelfId: "life-signals",
    shelfTitle: "Life Signals / 生活信号",
    rawTitle: "Singapore residents use AI for HDB resale flat valuation and viewing decisions",
    rawTitleZh: "新加坡居民用 AI 辅助 HDB 转售公寓估值和看房决策",
    rawSummary: "Buyers input flat details, location preferences and budget to receive valuation estimates and prioritized viewing lists.",
    rawSummaryZh: "买家输入公寓细节、位置偏好和预算，让 AI 提供估值估算和优先看房清单。",
    whyWorthWatching: "Major property decisions use AI for data-backed shortlisting.",
    whyWorthWatchingZh: "重大房产决策从情绪化转向 AI 数据支持的估值和短名单筛选。",
    source: "X / Singapore property",
    rawUrl: "grok-search://Singapore HDB resale AI valuation 2026",
    fetchedAt: "2026-05-31",
    extractionNotes: {
      coreShift: "房产购买决策正在从情绪和手动比较转向 AI 数据估值和优先筛选。",
      whyToday: "HDB 转售市场活跃度高。",
      possibleUserValue: "看房前获得更理性的估值参考。",
      noiseToIgnore: "预测准确率，关注多因素考虑。",
      labelPotential: "AI 辅助 HDB 转售估值决策"
    }
  }
];

export const candidateSignalsExpanded = [
  ...aiFrontierSignals,
  ...buildWorkflowSignals,
  ...designCreationSignals,
  ...marketCapitalSignals,
  ...selfUpgradeSignals,
  ...lifeSignalsSignals,
];
