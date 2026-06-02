# Candidate Signal Audit

Audit target: `data/candidate-signals-expanded.js`

Audit date: 2026-06-02

Scope: 72 candidate signals, 6 shelves, 12 signals per shelf.

This audit does not modify the candidate data. It only evaluates whether each signal is ready to enter the formal signal bank.

## Summary

| Decision | Count |
|---|---:|
| 保留 | 55 |
| 删除 | 2 |
| 换 shelf | 2 |
| 需要重写 | 13 |
| Total | 72 |

Weakest shelves:

1. Life Signals / 生活信号
2. Self Upgrade / 自我升级

Market & Capital is more relevant than the earlier demo concern, but it is too concentrated on AI infra, power, GPU financing, and capex. It still lacks enough enterprise procurement, revenue quality, public market, customer contract, and business model signals.

Life Signals has several useful daily decision areas, but too many entries read like generic “users ask AI to plan something” cases. It needs stronger sources, real adoption context, and higher-stakes everyday decisions.

## Scoring Legend

Scores are 1-5:

- 真实性: concrete event, subject, and source feel.
- 货架相关性: fit with current shelf.
- 专业度: professional depth expected by the shelf.
- 可提炼性: ability to extract a structural Time Slice.
- 标签潜力: ability to become a strong 50×70 label title.

Decision types:

- 保留: strong enough for formal bank.
- 删除: too light or too generic.
- 换 shelf: useful, but current shelf is wrong.
- 需要重写: information direction is useful, but title/source/framing needs work.

## Full Audit Table

| id | rawTitleZh | 当前 shelf | 真实性 | 货架相关性 | 专业度 | 可提炼性 | 标签潜力 | 总体判断 | 简短原因 |
|---|---|---|---:|---:|---:|---:|---:|---|---|
| AF-01 | Claude Code 一个提示启动 113 个 agent 子步骤完成复杂研究任务 | AI Frontier | 4 | 5 | 5 | 5 | 5 | 保留 | 多 agent 编排能力边界清楚，标签也有记忆点。 |
| AF-02 | Anthropic Claude Computer Use 工具实现完整桌面任务执行，包括鼠标键盘控制和屏幕截图 | AI Frontier | 5 | 5 | 5 | 5 | 5 | 保留 | computer use 是明确能力边界变化。 |
| AF-03 | PocketOS AI Agent 意外删除租车公司整个业务数据库及备份 | AI Frontier | 4 | 5 | 5 | 5 | 5 | 保留 | 真实执行风险强，能提炼出 Agent 安全边界。 |
| AF-04 | RuView 项目用普通 WiFi 信号实现实时人体姿态和生命体征检测 | AI Frontier | 4 | 5 | 4 | 5 | 5 | 保留 | 多模态感知从专用硬件转向 WiFi，边界变化明确。 |
| AF-05 | 腾讯开源 TencentDB Agent Memory 四层本地内存管道解决长时序上下文 | AI Frontier | 4 | 5 | 5 | 5 | 4 | 保留 | Agent memory 结构化，适合 AI 前沿。 |
| AF-06 | Anthropic Claude 用于多日科学计算 Agent 工作流，实现持久内存和编排 | AI Frontier | 4 | 5 | 5 | 5 | 4 | 保留 | 多日任务和科研工作流能说明长任务能力变化。 |
| AF-07 | 移动 AR 眼镜中的主动式 on-device Agent，实现实时意图预测和协助 | AI Frontier | 4 | 5 | 4 | 5 | 4 | 保留 | on-device 主动 Agent 是清晰能力边界。 |
| AF-08 | OWASP 将内存投毒列为 2026 年 Agentic AI 顶级风险 | AI Frontier | 5 | 5 | 5 | 5 | 5 | 保留 | 安全标准变化，专业度高。 |
| AF-09 | OpenClaw 开源 computer-use Agent 生态扩展，支持浏览器和 Workspace 集成 | AI Frontier | 4 | 3 | 3 | 4 | 4 | 换 shelf | 更像 Build & Workflow 的开源技能生态，不是核心 frontier。 |
| AF-10 | Nous Research 发布 Contrastive Neuron Attribution，无需 SAE 即可控制 Agent 拒绝行为 | AI Frontier | 4 | 5 | 5 | 5 | 4 | 保留 | Agent 内部控制技术有前沿性。 |
| AF-11 | Abacus AI Agent 动态组合多模型一键构建带数据库和后端的移动 App | AI Frontier | 4 | 3 | 3 | 4 | 4 | 换 shelf | 更像构建工作流或应用交付，不是 AI 能力边界本身。 |
| AF-12 | Anthropic 收购 Vercept 进一步推进 Computer Use 桌面控制能力 | AI Frontier | 4 | 5 | 4 | 4 | 4 | 保留 | 收购推动 computer use 生产化，保留但需关注功能落地。 |
| BW-01 | Cursor 原生支持 MCP，直接查询 Supabase 真实数据库 schema 并生成代码 | Build & Workflow | 5 | 5 | 5 | 5 | 5 | 保留 | 开发流程从假设 schema 转向读取真实 schema。 |
| BW-02 | Supabase 发布 Agent Skills 插件，教 Claude Code 和 Cursor 正确构建 Supabase 项目 | Build & Workflow | 5 | 5 | 5 | 5 | 4 | 保留 | 平台 skills 注入最佳实践，工作流变化清楚。 |
| BW-03 | Figma 通过 MCP 与 GitHub Copilot 双向集成，实现设计与代码实时同步 | Build & Workflow | 5 | 4 | 5 | 5 | 5 | 保留 | 设计到代码同步，也可跨到 Design，但 workflow 属性足够强。 |
| BW-04 | Claude Code Agent Teams 支持 16 个以上子 Agent 在共享任务列表上协作 | Build & Workflow | 4 | 5 | 5 | 5 | 5 | 保留 | 多 Agent 团队协作改变大型构建流程。 |
| BW-05 | Cursor 推出 Agents Window，支持多个 Agent 并行在同一界面开发 | Build & Workflow | 5 | 5 | 5 | 5 | 5 | 保留 | IDE 中并行 Agent 管理是明确 workflow 信号。 |
| BW-06 | Claude Code 支持 prompt-to-commit 完整 CLI 记录到 Git commit | Build & Workflow | 4 | 5 | 5 | 5 | 4 | 保留 | 从 prompt 到可审计 commit，交付链路变化明确。 |
| BW-07 | GitHub Copilot 在 PR review 时自动拉取 Figma MCP 设计上下文 | Build & Workflow | 4 | 5 | 5 | 5 | 5 | 保留 | PR review 引入设计上下文，质量控制变化强。 |
| BW-08 | Cursor 优化大 monorepo 的仓库索引，支持更快 Agent 理解 | Build & Workflow | 4 | 5 | 4 | 4 | 4 | 保留 | 企业级 repo 理解范围扩大，专业但需数据支撑。 |
| BW-09 | Playwright MCP 集成到 Cursor，用于 AI 驱动的浏览器自动化测试 | Build & Workflow | 4 | 5 | 5 | 5 | 5 | 保留 | 测试从人工脚本走向 Agent 自动生成执行。 |
| BW-10 | Vercel MCP 集成 Claude Code，实现 Agent 直接触发部署预览 | Build & Workflow | 4 | 5 | 5 | 5 | 4 | 保留 | 生成到部署验证闭环，交付流程明确。 |
| BW-11 | Claude Code 使用 MCP 工具实现生产事故的自动化响应流程 | Build & Workflow | 4 | 5 | 5 | 5 | 5 | 保留 | incident response 符合 shelf 专业期待。 |
| BW-12 | Cursor Background Agents 支持长时间后台运行的重构任务 | Build & Workflow | 5 | 5 | 5 | 5 | 5 | 保留 | 长时间后台重构改变开发者工作方式。 |
| DC-01 | Figma Agent 直接在画布上运行，支持批量编辑和自动实现反馈 | Design & Creation | 5 | 5 | 5 | 5 | 5 | 保留 | 画布内 Agent 改变设计迭代方式。 |
| DC-02 | Figma Make 将设计帧直接连接本地代码库，支持视觉编辑和 PR 提交 | Design & Creation | 5 | 5 | 5 | 5 | 5 | 保留 | 视觉编辑和 PR 连接改变设计交付。 |
| DC-03 | TopView Canvas 以 storyboard 画布先行规划 AI 视频生成 | Design & Creation | 4 | 5 | 5 | 5 | 5 | 保留 | AI video 从 prompt-first 转向 storyboard-first。 |
| DC-04 | Adobe Firefly 加强 Content Credentials，在交付文件中记录 AI 生成过程 | Design & Creation | 5 | 5 | 5 | 5 | 5 | 保留 | provenance 和可验证交付标准非常适合此 shelf。 |
| DC-05 | Canva Magic Studio Brand Intelligence 自动在本地化营销活动中强制品牌一致性 | Design & Creation | 4 | 5 | 4 | 5 | 4 | 保留 | 品牌本地化和一致性属于创作交付标准。 |
| DC-06 | LTX Studio 从 AI storyboard 直接编排多模型视频生成 | Design & Creation | 4 | 5 | 5 | 5 | 5 | 保留 | 多模型 video pipeline 由 storyboard 驱动，结构清楚。 |
| DC-07 | Figma AI Replace Content 在原型中自动生成真实上下文文案 | Design & Creation | 4 | 5 | 4 | 4 | 4 | 保留 | 内容占位向上下文文案变化，可用但专业度略浅。 |
| DC-08 | Claude Design 将生成的设计系统干净导出为 Figma 组件 | Design & Creation | 4 | 5 | 5 | 5 | 4 | 保留 | 设计系统生成和导出标准变化明确。 |
| DC-09 | Runway 与 Kling 通过参考帧实现一致角色视频工作流 | Design & Creation | 4 | 5 | 5 | 5 | 5 | 保留 | 角色一致性是 AI video 交付关键问题。 |
| DC-10 | Canva AI 支持客户评审中实时 Magic Edit 建议修改 | Design & Creation | 4 | 5 | 4 | 4 | 4 | 保留 | 客户评审流程变化明确，但需更具体案例。 |
| DC-11 | Adobe Firefly 为企业商业活动提供 IP indemnification 保障 | Design & Creation | 5 | 5 | 5 | 5 | 5 | 保留 | 商业设计资产的法律保障是交付标准变化。 |
| DC-12 | Figma AI 自动在团队文件中更新设计系统变更 | Design & Creation | 4 | 5 | 5 | 5 | 5 | 保留 | 设计系统维护自动传播，专业且可提炼。 |
| MC-01 | Iris Energy 为 Microsoft AI 合同获得 36 亿美元融资，用于采购 NVIDIA GPU | Market & Capital | 5 | 5 | 5 | 5 | 5 | 保留 | 合同、融资、GPU 采购绑定，资本判断强。 |
| MC-02 | 美国数据中心开发中电力可用性取代资本成为首要瓶颈 | Market & Capital | 4 | 5 | 5 | 5 | 5 | 保留 | 电力约束直接影响 capex 和资本配置。 |
| MC-03 | 小米在中国 AI API 价格战中最高降价 99% | Market & Capital | 3 | 5 | 4 | 4 | 4 | 需要重写 | 价格战方向正确，但需明确 API、竞品和商业影响来源。 |
| MC-04 | Hyperscalers 2026 年承诺 6000-6300 亿美元资本开支，电力设备成硬约束 | Market & Capital | 4 | 5 | 5 | 5 | 5 | 保留 | capex 和电力设备硬约束专业度高。 |
| MC-05 | Nebius 以 6.43 亿美元收购 Eigen AI 强化推理优化能力 | Market & Capital | 4 | 4 | 3 | 4 | 4 | 需要重写 | 收购属于资本流动，但需要更清楚连接到推理成本或收入质量。 |
| MC-06 | 变压器和高电压设备交付期延长至 5 年，成为 AI 数据中心主要限制 | Market & Capital | 4 | 5 | 5 | 5 | 5 | 保留 | 供应链交付周期影响投资节奏，强相关。 |
| MC-07 | 企业 AI 采购转向 FinOps 工具控制推理成本 | Market & Capital | 4 | 5 | 5 | 4 | 4 | 保留 | 企业采购和持续成本控制符合标准。 |
| MC-08 | 数据中心投资转向 GPU 与自备电源的混合融资结构 | Market & Capital | 4 | 5 | 5 | 5 | 5 | 保留 | 融资结构变化清楚。 |
| MC-09 | Hyperscalers 加速核电购电协议以稳定长期电力成本 | Market & Capital | 4 | 5 | 5 | 5 | 5 | 保留 | PPA 和长期成本锁定是资本判断核心。 |
| MC-10 | 推理每 token 成本下降推动企业转向开源模型 | Market & Capital | 4 | 5 | 4 | 4 | 4 | 保留 | 成本结构影响采购和部署选择，合格。 |
| MC-11 | 资本流向 AI 数据中心电气设备供应商 | Market & Capital | 3 | 5 | 3 | 4 | 4 | 需要重写 | 方向正确但标题泛，需要具体公司、资金或订单案例。 |
| MC-12 | 私募股权增加对 GPU 和电力联合融资的早期参与 | Market & Capital | 4 | 5 | 5 | 5 | 5 | 保留 | PE 介入阶段前移，资本结构变化明确。 |
| SU-01 | 通用汽车裁减传统 IT 员工，转而优先招聘具备 AI 技能的人才 | Self Upgrade | 4 | 5 | 5 | 5 | 5 | 保留 | 招聘标准变化明确，职业信号强。 |
| SU-02 | 开发者在 LinkedIn 作品集中增加 AI Agent 编排演示项目 | Self Upgrade | 3 | 5 | 4 | 4 | 4 | 保留 | 作品集标准变化可用，但最好补具体来源样本。 |
| SU-03 | 科技公司面试新增 Cursor 或 Claude Code 实时配对编程环节 | Self Upgrade | 4 | 5 | 5 | 5 | 5 | 保留 | 面试标准变化清楚。 |
| SU-04 | 非技术创始人用 Claude Code 在 7 天内完成首个 MVP 上线 | Self Upgrade | 4 | 4 | 4 | 4 | 4 | 保留 | 能力迁移强，也可与 Build 交叉。 |
| SU-05 | LinkedIn 个人资料将 'AI Workflow Builder' 列为首要技能 | Self Upgrade | 2 | 4 | 3 | 3 | 3 | 需要重写 | 像趋势概括，缺具体主体和数据。 |
| SU-06 | Notion AI 用户构建持久化个人 Agent 工作空间 | Self Upgrade | 3 | 4 | 3 | 4 | 4 | 需要重写 | 方向不错，但太像普通工具使用，需要真实案例。 |
| SU-07 | 招聘职位描述要求展示 Agent 调试和纠正能力 | Self Upgrade | 4 | 5 | 5 | 5 | 5 | 保留 | 职业能力证明变化明确。 |
| SU-08 | Cursor 用户将完整项目构建过程记录为学习成果 | Self Upgrade | 4 | 5 | 4 | 5 | 5 | 保留 | 学习验证从证书转向可审计过程。 |
| SU-09 | 专业人士用 AI Agent 进行每周注意力与任务审计 | Self Upgrade | 3 | 4 | 3 | 3 | 3 | 需要重写 | 偏个人效率小技巧，需要更强职业验证场景。 |
| SU-10 | 营销专业人士用无代码 + AI Agent 构建活动工具 | Self Upgrade | 4 | 5 | 4 | 4 | 4 | 保留 | 非技术专业能力扩展明确。 |
| SU-11 | 大学课程将最终考核转向 AI Agent 项目交付 | Self Upgrade | 4 | 5 | 5 | 5 | 5 | 保留 | 学习评估标准变化强。 |
| SU-12 | 转行者记录 30 天 AI 工作流掌握挑战 | Self Upgrade | 2 | 4 | 3 | 3 | 3 | 需要重写 | 挑战叙事容易鸡汤，需改成具体能力证明案例。 |
| LS-01 | Kmart 澳大利亚推出 AI 虚拟试穿工具，用于在线服装购买决策 | Life Signals | 5 | 5 | 5 | 5 | 5 | 保留 | 购物、退货和消费决策变化具体。 |
| LS-02 | 家长用 AI Agent 为孩子制定个性化每周饮食计划 | Life Signals | 3 | 4 | 3 | 4 | 4 | 需要重写 | 场景对，但缺具体产品、来源和真实使用证据。 |
| LS-03 | 新加坡学生使用 AI 制定个性化每周学习时间表 | Life Signals | 3 | 4 | 3 | 4 | 4 | 需要重写 | 学习安排是生活决策，但现在像通用 AI 用法。 |
| LS-04 | 新加坡通勤者用 AI 结合实时因素优化每日地铁和巴士路线 | Life Signals | 3 | 4 | 3 | 4 | 4 | 需要重写 | 通勤方向好，但需要真实工具或用户来源。 |
| LS-05 | 新加坡家庭用 AI Agent 规划周末活动 | Life Signals | 2 | 3 | 2 | 3 | 3 | 删除 | 过轻，像普通推荐小工具，不够生活方式变化信号。 |
| LS-06 | 新加坡居民用 AI 辅助 HDB 翻新材料和承包商选择 | Life Signals | 4 | 5 | 5 | 5 | 5 | 保留 | 家装高成本决策，生活信号强。 |
| LS-07 | 新加坡老年人使用 AI 语音 Agent 处理每日服药和预约提醒 | Life Signals | 4 | 5 | 5 | 5 | 5 | 保留 | 健康和照护决策真实，专业度高。 |
| LS-08 | 新加坡年轻专业人士用 AI 优化每周杂货购物清单 | Life Signals | 3 | 4 | 3 | 4 | 4 | 需要重写 | 购物清单方向可用，但要补真实消费数据或工具来源。 |
| LS-09 | 新加坡家长使用 AI 聊天实时指导小学生家庭作业 | Life Signals | 3 | 4 | 3 | 4 | 4 | 需要重写 | 家庭教育方向对，但需要真实平台、学校或家长采用证据。 |
| LS-10 | 新加坡健身爱好者用 AI 获取每日跑步路线建议 | Life Signals | 3 | 4 | 3 | 4 | 3 | 需要重写 | 运动路线偏轻，需要安全、健康或城市服务维度增强。 |
| LS-11 | 新加坡情侣用 AI 在预算内规划平衡约会夜晚 | Life Signals | 2 | 3 | 2 | 3 | 2 | 删除 | 过像娱乐推荐，不够结构性变化。 |
| LS-12 | 新加坡居民用 AI 辅助 HDB 转售公寓估值和看房决策 | Life Signals | 4 | 5 | 5 | 5 | 5 | 保留 | 房产高成本决策，真实生活决策价值强。 |

## Market & Capital 修正建议

### 建议保留

- MC-01: GPU 项目融资绑定 Microsoft 合同。
- MC-02: 电力可用性成为数据中心首要瓶颈。
- MC-04: hyperscaler capex 受电力设备制约。
- MC-06: 变压器和高电压设备交付期影响 AI 数据中心。
- MC-07: 企业 AI 采购转向 FinOps。
- MC-08: GPU 与自备电源混合融资结构。
- MC-09: 核电 PPA 锁定长期 AI 电力成本。
- MC-10: 推理成本下降推动开源自托管。
- MC-12: PE 更早进入 GPU + 电力联合融资。

### 建议删除

- 暂无必须删除项。当前 Market & Capital 的问题不是完全跑题，而是维度偏窄。

### 建议重写

- MC-03: 需要补充价格战主体、API 线、竞品和收入影响，不要只写“最高降价 99%”。
- MC-05: 需要说明收购如何影响推理成本、客户采购或 revenue quality。
- MC-11: 需要具体公司、订单、融资、估值或公开市场信号，否则太泛。

### 还缺哪些类型的信息

- 企业 AI 采购合同和 CIO 预算变化。
- AI SaaS ARR、net retention、gross margin、revenue quality。
- 推理成本如何影响商业模式和定价权。
- API price war 对模型公司的收入质量影响。
- 云厂商、芯片厂商、电力公司之间的利润池转移。
- 公开市场对 AI infra、data center、energy、software 的估值分化。
- M&A、私募融资、债务融资、项目融资的具体交易结构。
- “客户愿意为 AI 付多少钱”的真实采购案例。

### 下一轮 Grok 应该抓什么关键词

- `AI enterprise procurement CIO budget`
- `AI ARR revenue quality gross margin`
- `inference cost pricing enterprise AI`
- `AI API price war revenue impact`
- `GPU financing data center power PPA`
- `AI data center project finance`
- `hyperscaler capex power bottleneck`
- `AI startup customer contract ARR`
- `AI FinOps enterprise procurement`
- `AI software gross margin inference`
- `private equity GPU power financing`
- `data center transformer backlog AI`

## Life Signals 修正建议

### 建议保留

- LS-01: Kmart AI 虚拟试穿影响服装购买和退货决策。
- LS-06: HDB 翻新材料和承包商选择是高成本生活决策。
- LS-07: 老年人服药和预约提醒涉及真实家庭照护。
- LS-12: HDB 转售估值和看房决策是强生活信号。

### 建议删除

- LS-05: 周末活动规划过轻，像普通推荐工具。
- LS-11: 约会夜晚规划过轻，不足以代表生活方式变化。

### 建议重写

- LS-02: 饮食计划需要真实产品、家庭场景、过敏或健康约束来源。
- LS-03: 学习时间表需要学校、考试、家长或学生采用证据。
- LS-04: 通勤路线需要真实服务、交通数据或城市服务来源。
- LS-08: 杂货清单需要价格、浪费、库存或零售平台证据。
- LS-09: 家庭作业指导需要教育政策、平台使用或家长真实案例。
- LS-10: 跑步路线需要健康、安全、天气或城市空间维度，不能只是推荐路线。

### 还缺哪些类型的信息

- 医疗分诊、预约、保险理赔、健康数据解释。
- 老年照护、儿童教育、家庭安全这些高信任场景。
- 零售退货、比价、订阅、消费金融等真实消费决策。
- 城市服务、交通、停车、通勤、公共服务入口。
- 隐私信任、家庭设备、智能家居和摄像头之外的感知技术。
- 教育场景里家长、老师、学校规则如何改变。
- AI 影响普通人“买不买、去哪、信不信、约不约、看不看医生”的真实决策。

### 下一轮 Grok 应该抓什么关键词

- `AI virtual try-on return rate retailer`
- `AI eldercare medication reminder real users`
- `AI health triage appointment consumer`
- `AI homework parents school policy`
- `AI grocery shopping waste reduction`
- `AI public transit route planning real time`
- `AI home renovation contractor selection`
- `AI housing valuation home buyer`
- `AI privacy trust smart home consumer`
- `AI family healthcare decision`
- `AI education parent adoption`
- `AI consumer decision retail returns`

## Shelf-Level Notes

### AI Frontier

整体质量高，但 AF-09 和 AF-11 更像工作流或产品构建。下一轮可继续抓 capability boundary，而不是应用构建案例。

### Build & Workflow

当前是最稳定的 shelf 之一。MCP、测试、部署、PR review、incident response 都覆盖到了。下一轮可以补企业内控、权限、审计和合规 workflow。

### Design & Creation

整体强。覆盖 Figma、Adobe、Canva、AI video、storyboard、provenance、IP indemnification。下一轮可补客户验收、版权争议、素材供应链和设计系统 governance。

### Market & Capital

比早期版本更专业，但过度集中在 AI infra 和电力瓶颈。需要补足软件收入质量、企业采购、价格战、客户合同、public market 判断。

### Self Upgrade

强项是招聘和面试变化。弱项是部分个人效率和挑战类内容容易鸡汤化。下一轮应优先抓真实招聘 JD、面试流程、作品集标准、课程考核变化。

### Life Signals

最需要优化。应减少“新加坡用户用 AI 规划 X”的泛场景，增加真实品牌、服务、城市、家庭、健康、教育和高成本消费决策案例。

