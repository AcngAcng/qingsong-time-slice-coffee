# 开发历史与回归记录

整理日期：2026-10-24（Asia/Shanghai）。依据当前 Git 历史、仓库文件及本次可见对话整理，保留接手需要的决策和证据。它不是账号全部聊天的逐字导出。

## 1. 产品方向与长期边界

Time Slice Coffee / 时代信息切片咖啡把今日 raw signal 处理成与用户有关的时代切片，像点咖啡一样选择用途、浓度和 Hot / Iced，然后带走一张小票和 50mm x 70mm 标签。主 slogan 为“你今天 FO 了 MO？”。

保留以下决策：

- 六个信息货架保持专业 FOMO 分类，界面维持 3 x 2。
- 身份层前台改成简单的“今日用途”，内部固定 id 不变。
- Light / Regular / Double 对应信息层级，不能仅靠缩放文字区分。
- Hot / Paper Cup 是把理解带在手里；Iced / Clear Cup 是把变化看得更清楚。
- 标签是可贴杯、可打印的信息商品标签，不是普通 AI 长总结。
- 聚焦 Demo 现场可演示性，暂不接复杂用户系统、真实 Grok / X 抓取或打印机 SDK。
- 修改时保持小范围，不因数据一致性修复顺手改 UI、文案策略、信号原文或标签结构。

## 2. Git 里可追溯的阶段

| 提交 / 标签 | 内容 |
| --- | --- |
| `dcef498` / `v0.1-demo-flow-stable` | 早期稳定 Demo 流程 |
| `4d65927` / `v0.2-signal-shelf-picker` | 两层货架与 bean picker |
| `6074e23` / `v0.2-signal-shelf-scroll` | 货架选择和平滑滚动 |
| `4a7304a` / `v0.3-signal-rack-visual` | 货架视觉调整 |
| `3c1adb8` | Raw Signal 排版与标签结构；旧 PROJECT_STATE 曾停在这一阶段 |
| `a0c25cf`、`92927fd` | refresh 的 shelf mapping 与 prepared mappings |
| `8320d5e` | brew loading 与 label fallback |
| `e59ad41`、`de7f3cc`、`24c59ef` | 50x70 模板、文案适配和预览接入 |
| `0a92f36` 及之后多次提交 | pitch deck、逐页预览和素材迭代 |
| `e6f00b0` | Pick Up 使用 50x70 标签预览 |
| `a0df5d7`、`5ea67af` | iframe 打印与 NIIMBOT 输出稳定 |
| `9c32a95`、`8bb216b` | 咖啡式用途选择 |
| `94fb0c2`、`ecfc218` | receipt 风格 brew preview 与流程稳定 |
| `ef00c11`、`1189bc1`、`2f387ae` | candidate 模式及 extraction notes |
| `b9b2989`、`f320da1` | Render 的 HOST / PORT 适配 |
| `f78ae25` | signal 内容质量标准和审计 |
| `88307f7`、`b98a67c` | Source Access 展示与二维码直接打开来源 |
| `8fddf61` | QR/print 稳定及项目说明 |
| `4be7bda` | signal output flow 稳定修复，当前应用基线 |

完整逐条记录使用 `git log --oneline --all --decorate`。不要仅根据这张概览表替代实际 diff。

## 3. 2026-06-18 的数据一致性修复

用户报告：前面选择的 Raw Signal 与后面的 Brew Result / Pick Up / 50x70 Label / QR 有时不一致，甚至出现另一条 signal 的内容。

明确目标：

```text
selectedSignal -> canonicalSlice -> generatedLabel
-> Receipt / Pick Up / Cup Mockup / 50x70 Label / Print / QR
```

当时授权只改 `script.js`；要求保持 UI、文案策略、data、标签字段、50x70 结构、server/API 和 Print iframe 触发流程。

提交 `4be7bda stabilize signal output flow` 实际加入：

- 当前选择 signature 和 canonical 的 signal / identity / intensity / serveStyle 校验。
- Raw Signal、Identity、Strength、ServeStyle 切换时的下游清理。
- `brewGenerationId` token，防止过时异步结果覆盖当前选择。
- `prepareRewriteForCurrentSelection` 准备结果，渲染入口读取已绑定的 label。
- Pick Up label 不匹配时不在渲染函数内另找 signal 重新 fallback。
- Generate Label 优先沿用现有 label，缺失或不匹配才允许 fallback。
- QR 对当前匹配 label 使用当前 `selectedSignal.rawUrl`。
- 清理未使用、读取时会 normalize 的 `getStableRewriteValue`。

应用代码后续没有因本次备份而改动。

## 4. 四条精确回归信号

以下是此前 2026-06-18 的浏览器回归记录，不是 2026-10-24 新执行的浏览器测试。

关键数据事实：这四条精确原文属于默认入口 `/` 的稳定库 `preparedSignals`，不能在 `/?signals=candidate` 中假定相同 id 存在。candidate 里另测过 `BW-08`。

| stable id | rawTitleZh | 历史 Brew / Pick Up / print label title |
| --- | --- | --- |
| `056` | 加密 AI agent 代币回调，交易员整理项目收入、机器人活跃数和解锁时间表。 | 加密 AI agent 代币回调。 |
| `045` | DeepMind 机器人论文被开发者转发：模型通过视频学习倒水、开抽屉等连续动作。 | 机器人通过视频学习连续动作。 |
| `042` | OpenAI 研究员在 X 讨论 agent 记忆功能：重点不是记住更多，而是何时忘记。 | Agent 记忆重点变成何时忘记。 |
| `047` | Cursor 用户晒出大型仓库索引失败记录，团队开始把文档目录改成 agent 友好结构。 | 大型仓库文档开始变成 agent 友好结构。 |

对应 QR target URL：

| id | URL |
| --- | --- |
| `056` | `https://x.com/search?q=crypto%20AI%20agent%20token%20revenue%20active%20users%20unlock` |
| `045` | `https://x.com/search?q=DeepMind%20robotics%20video%20learning%20manipulation` |
| `042` | `https://x.com/search?q=OpenAI%20agent%20memory%20privacy%20control` |
| `047` | `https://x.com/search?q=Cursor%20large%20repo%20indexing%20AI%20friendly%20docs` |

历史验证路径：从货架找到 signal，选择用途 / Regular / Hot 或 Iced，等待 Brew Result，点击 Generate Label，比较 signal id、Brew/Pick Up/print 标题和 QR 目标。

历史记录显示上述标题、labelNo 与 QR 同源，未命中互相串线的禁用关键词。这不能证明原文里每个细节都完整保留在短标签，也不等同于对所有 signal 的语义准确性保证。

candidate 补充场景：

- id：`BW-08`。
- rawTitleZh：`Cursor 优化大 monorepo 的仓库索引，支持更快 Agent 理解`。
- 原英文标题：`Repo indexing improvements in Cursor for large monorepos`。
- 历史输出标题：`大型仓库文档开始变成 agent 友好结构。`。
- QR：`https://x.com/search?q=Cursor%20repo%20indexing%20monorepo%20May%202026`。

这也说明现有索引相关模板能影响 candidate 文案，不能将 signal 绑定一致等同于语义完全吻合。现有 memory / robot / Cursor / copyright 条件模板仍在生成路径，后续如调整需按具体任务审查匹配条件。

## 5. 已知测试范围与限制

- 历史浏览器回归使用本地 fallback；当时没有 API Key，`/api/rewrite` 返回 500。
- 历史记录未证明真实 OpenAI 成功返回、快速连续切换的受控竞态测试或真实打印机输出在该轮全覆盖。
- 当前 canonical 已绑定 signal id，但 normalize/生成 helper 仍可能多次构建 canonical；不是完全纯函数式的一次生成架构。
- label 归属守卫是 labelNo + intensity + serveStyle，身份切换依赖清理，而非 label 自身的独立 identity guard。
- 原文内容并非实时自动验证的新闻；候选库审计另见已有 docs。
- QR 图片依赖第三方网络服务，原始来源的登录或可用性不由项目保证。
- Render 线上可用性与本地 Git 备份是独立事项，本次没有重新探测线上服务。

这些是接手时需要了解的边界，本次只归档，没有新增代码修复或 UI 调整。

## 6. Mac 安装与推送记录

此前本机使用 zsh，初始没有 `brew`、`gh` 或 `node`。

- 已安装 Homebrew，并在用户 `.zprofile` 中加入 brew shellenv。
- 已安装 GitHub CLI，完成 GitHub.com / HTTPS / 浏览器 device 授权。
- `gh auth setup-git` 配置了 Git HTTPS credential helper。
- `4be7bda` 已成功推送到 `origin/master`。
- 已安装 Homebrew Node；本机曾确认 Node `v26.3.0`、npm `11.16.0`。
- 旧 Codex 自带 Node 服务停掉后，曾使用系统 `node server.js` 启动并验证本地页面 200。

原电脑上的进程、密码、token、钥匙串和 Homebrew 安装不会随 Git 克隆迁移。新电脑按交接文档重新安装和授权，不要使用本记录里的旧进程会话号。

## 7. 2026-10-24 的备份工作

- 备份前 `master` 和 `origin/master` 都指向 `4be7bda`，工作区干净。
- 盘点到 73 个已跟踪项目文件；本轮新增交接文档和校验清单在此基础上增加。
- 54 条稳定 signals 和 72 条 candidate signals 已核对。
- 本次运行 `node --check script.js`、`node --check server.js`、candidate validator、`git fsck --full`，均通过。
- Candidate 有 5 条原有长度提示：`AF-10`、`BW-01`、`BW-02`、`BW-04`、`SU-05`，没有改原文。
- 更新 PROJECT_STATE、README 导航，并增加本记录、恢复指南和 SHA-256 文件清单。
- 备份发布拟使用 `backup-2026-10-24` 标签，源码 ZIP、完整历史 bundle 和校验文件随 Release 提供。远程完成情况以实际 GitHub Release 和 Git refs 为准。

此次目标是让换账号后的协作者可从仓库理解项目，继续开发无需依赖旧对话才能知道启动方式、数据模式和先前修复。
