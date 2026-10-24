# Time Slice Coffee / 时代信息切片咖啡 项目状态

更新日期：2026-10-24（Asia/Shanghai）。

本次整理以应用提交 `4be7bda stabilize signal output flow` 为基线。备份和交接文档的提交会在它之后；最新版本以 `git log --oneline -5` 为准。旧文档中 `3c1adb8`、未推送和 ahead 2 commits 的说明已经过时。

## 接手入口

1. 阅读 [README.md](README.md)，了解项目和启动方式。
2. 阅读 [docs/PROJECT_HANDOFF.md](docs/PROJECT_HANDOFF.md)，了解换账号恢复、文件范围、运行依赖和已知限制。
3. 阅读 [docs/PROJECT_DESCRIPTION.md](docs/PROJECT_DESCRIPTION.md)，了解产品定位、用途和标签规则。
4. 阅读 [docs/DEVELOPMENT_HISTORY.md](docs/DEVELOPMENT_HISTORY.md)，了解之前的开发决策、修复和回归记录。

## 当前定位与流程

Time Slice Coffee 是一个把真实信息信号萃取成时代切片的互动 Demo。用户像点咖啡一样选择用途、信息浓度和 Hot / Iced，得到小票、杯子预览和可打印的 50mm x 70mm 信息标签。

核心叙事是把今天真正重要的一则变化装进一杯咖啡，帮助用户理解时代并减少 FOMO。保持咖啡点单直觉，不把它扩展成新闻客户端、复杂 AI SaaS 或大型后台。

```text
Signal Shelves -> Raw Signal -> Extracted Slice -> Choose Your Cup
-> Information Strength -> Hot / Iced -> Time Slice Receipt
-> Pick Up / Cup Mockup / 50x70 Label -> Print Label / Source QR
```

## 已有内容

- 六个信息货架：AI Frontier、Build & Workflow、Design & Creation、Market & Capital、Self Upgrade、Life Signals；货架保持 3 x 2 排列。
- 六个用途：Learn、Build、Create、Spot Opportunity、Make a Decision、Ease FOMO。内部 identity id 仍是 `student / builder / designer / founder / vc / everyday`。
- 三档浓度：`light / regular / double`。区别是信息层级，不是单纯缩放字号。
- Hot / Paper Cup 用于带走、贴杯；Iced / Clear Cup 用于观察和展示。
- 默认入口 `/` 使用 54 条稳定 signals。
- `/?signals=candidate` 使用 72 条候选 signals，六个货架各 12 条。它不会默认替换稳定库。
- Receipt、杯子图片预览、50 x 70 标签、QR 溯源和浏览器打印 iframe。
- 完整 pitch deck：PPTX、上一版 PPTX、逐页源码、图片、讲稿和渲染预览位于 `pitch-deck/`。

## 最近应用修复

`4be7bda` 只修改了 `script.js`，处理 Raw Signal 与后续输出不一致的问题：

- 切换选择时清理旧的 generated label、canonical slice 和下游 DOM。
- canonical 记录 signal id、identity id、浓度和上杯方式，并在读取时检查绑定。
- label 以 `labelNo`、浓度和上杯方式检查当前归属。
- brew 使用 generation token，丢弃已经过时的异步结果。
- receipt、标签和杯子渲染入口读取已经准备好的结果；Generate Label 正常复用已有 label。
- 当前 label 的 QR 从当前 Raw Signal URL 派生。

设计上要持续保持以下数据流：

```text
selectedSignal -> canonicalSlice -> generatedLabel
-> Receipt / Pick Up / Cup Mockup / 50x70 Label / Print / QR
```

详细实现边界和历史测试证据见交接文档。不要把这次文档整理理解为新增一轮 UI 或真实 API 回归。

## 本地运行与部署

当前机器是 macOS，原路径：

```text
/Users/acnglab/Desktop/Demo项目开发/清客松-Time slice coffee/qingsong-time-slice-coffee
```

项目根目录没有应用依赖安装步骤，使用 Node 内置模块：

```bash
node server.js
```

默认端口为 8080，默认监听 `0.0.0.0`。浏览器打开 `http://127.0.0.1:8080/?signals=candidate`。

没有 `OPENAI_API_KEY` 时，前端走本地 fallback；`/api/rewrite` 返回 500 是现有服务的行为。API Key 需要在新环境自行配置。当前没有真实 Grok / X 抓取接入。

既有部署地址记录在 README 中，平台为 Render。本次备份没有重新验证线上实例、修改部署设置或迁移 Render 账号。

## 打印与外部依赖

- 标签尺寸维持 50mm x 70mm，高对比黑色，内容应位于安全区。
- 真实打印需本地 NIIMBOT B1 Pro 驱动、`NIIMBOT50*70` 纸张和 100% 缩放。
- Print 继续克隆 Pick Up 标签到 iframe，再调用浏览器打印。
- QR 图片使用 `api.qrserver.com`，生成图片需要网络；扫描后的来源页也可能要求用户登录。
- `source.html` 仍保留为已有页面，正常标签 QR 不应指向本机或依赖它。

## 后续工作边界

优先维持数据一致性与可演示性。历史上提出的排版收敛、meta 弱化和 Label Preview 优化属于后续候选事项，需具体任务再执行。

保持小范围改动；不要顺手大改首页主视觉、CodeCup 动画、数据文案策略、标签字段或打印触发逻辑。真实 Grok API、PNG/PDF 导出、打印机 SDK、大规模用户后台均不在当前已完成范围。

## 本次备份校验

2026-10-24 已检查应用语法、candidate 数据和 Git 对象完整性。Candidate 校验通过，存在 5 条原有长度提示，未改数据原文。项目文件的 SHA-256 清单见 [docs/BACKUP_MANIFEST.json](docs/BACKUP_MANIFEST.json)。
