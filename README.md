# Time Slice Coffee

**你今天 FO 了 MO？**

Time Slice Coffee 是一个把今日信息信号萃取成“时代切片”的互动 demo。

过去人们买水是为了解渴；后来人们买咖啡，是为了提神、停留和进入一种日常节奏。到了 AI 时代，人们真正需要购买的，可能是一种对时代的理解：今天发生了什么，哪些变化值得看见，哪些噪音可以先放下。

这不是新闻聚合，不是 AI SaaS，也不是 ChatGPT 套壳。它更像一间未来咖啡店：你选择今天想带走的信息作用，系统把 raw signal 萃取成一张可以阅读、保存、打印的 Time Slice。

## Live Demo

- Live Demo: https://qingsong-time-slice-coffee.onrender.com
- Candidate Demo: https://qingsong-time-slice-coffee.onrender.com/?signals=candidate

Render 免费实例首次打开可能需要 30 到 60 秒冷启动时间。

## Current Flow

```text
Signal Shelves
→ Raw Signal
→ Extracted Slice
→ Choose Your Cup
→ Information Strength
→ Hot/Iced
→ Time Slice Receipt
→ 50×70 Label
→ Print Label
```

## Signal Shelves

项目当前包含 6 个信息货架：

- AI Frontier / AI 前沿
- Build & Workflow / 构建工作流
- Design & Creation / 设计创作
- Market & Capital / 市场资本
- Self Upgrade / 自我升级
- Life Signals / 生活信号

默认 demo 使用稳定 signal bank。Candidate demo 使用扩展候选库。

## Candidate Signal Bank

Candidate signal bank 位于 `data/candidate-signals-expanded.js`。

- 共 72 条候选 signals
- 6 个 shelf
- 每组 12 条
- 本地可通过 `?signals=candidate` 进入测试模式

候选库用于验证更丰富的信息源表现，不会默认替换正式 demo。

## Local Run

```bash
node server.js
```

打开正式数据：

```text
http://127.0.0.1:8080
```

打开 candidate 数据：

```text
http://127.0.0.1:8080/?signals=candidate
```

可选环境变量：

```bash
OPENAI_API_KEY=your_api_key
PORT=8080
HOST=0.0.0.0
```

没有 API Key 时，demo 会继续使用本地 fallback 逻辑演示主流程。

## Deploy

当前部署平台：Render。

Render 配置：

```text
Build Command: echo "No build step"
Start Command: node server.js
```

`server.js` 会读取 Render 提供的 `process.env.PORT`，并监听 `0.0.0.0`，以便公网访问。

## Printing Notes / 打印说明

线上网页可以展示 50×70 标签，也可以打开浏览器打印预览。

线上 Demo 可以完整展示网页流程、Time Slice Receipt 和 50×70 标签预览；真实 NIIMBOT 打印将在现场使用本地浏览器 + NIIMBOT B1 Pro 演示。线上访问者点击 Print Label 时，只会调用自己设备的浏览器打印环境。

真实 NIIMBOT B1 Pro 打印仍建议本地演示：

- 本地电脑需要安装 NIIMBOT 打印驱动
- 浏览器打印时需要手动选择 NIIMBOT B1 Pro
- 纸张规格建议选择 `NIIMBOT50*70`
- 缩放建议使用实际大小 / 100%

公网网页不能直接控制用户本地打印机。

## Technical Structure

```text
index.html                  Main page structure
styles.css                  Screen UI styles
script.js                   Frontend interaction, signal flow, label generation, print iframe
server.js                   Static file server and small Node API
data/prepared-signals.js    Stable demo signal bank
data/candidate-signals-expanded.js
                            Dev-only candidate signal bank
data/signal-shelves.js      Shelf definitions
data/signals.js             Identity and fallback copy data
scripts/validate-candidate-signals.js
                            Candidate signal validation script
public/images/              Cup image assets
```

Key runtime modes:

- Default: `https://qingsong-time-slice-coffee.onrender.com`
- Candidate: `https://qingsong-time-slice-coffee.onrender.com/?signals=candidate`
