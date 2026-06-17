# Time Slice Coffee 项目说明

## 1. 项目名称

**Time Slice Coffee / 时代信息切片咖啡**

主 slogan：

**你今天 FO 了 MO？**

## 2. 一句话介绍

Time Slice Coffee 是一个把今日信息信号萃取成「时代切片」的互动 Demo。

用户像点一杯咖啡一样选择今天想带走的信息用途、浓度和呈现方式，系统会把一条 raw signal 转化成 Time Slice Receipt 和一张可预览、可打印的 50mm x 70mm 信息标签。

## 3. 核心叙事

过去，人们买水是为了解渴。

后来，人们买咖啡，是为了提神、停留和进入一种日常节奏。

到了 AI 时代，人们真正需要购买的，可能是一种对时代的理解：

- 今天发生了什么？
- 哪些变化值得看见？
- 哪些噪音可以先放下？
- 这条信息和我今天要做的事有什么关系？

Time Slice Coffee 把这种理解做成一杯「今日信息咖啡」。

它不是新闻聚合，不是 AI SaaS，也不是 ChatGPT 套壳。它更像一间未来咖啡店：用户选择今天想带走的信息作用，系统把真实信息信号萃取成一张可以阅读、保存、扫码溯源、打印带走的 Time Slice。

## 4. 产品流程

当前主流程：

```text
Signal Shelves
-> Raw Signal
-> Extracted Slice
-> Choose Your Cup
-> Information Strength
-> Hot / Iced
-> Time Slice Receipt
-> 50x70 Label
-> Print Label
```

页面体验对应为：

1. 选择一个信息货架。
2. 从货架中选择一条 Raw Signal。
3. 查看系统萃取出的时代切片。
4. 选择今日杯型 / 用途。
5. 选择信息浓度：Light / Regular / Double。
6. 选择 Served Hot 或 Served Iced。
7. 获得 Time Slice Receipt。
8. 生成 Pick Up 页面和 50mm x 70mm 标签。
9. 通过 Source Access QR 扫码追溯原始来源。
10. 本地环境中可使用 Print Label 打印实体标签。

## 5. 六个信息货架

项目当前包含 6 个信息货架：

1. **AI Frontier / AI 前沿**  
   关注 AI 能力边界变化，例如 agent、模型能力、多模态、memory、tool use、AI safety、computer use、on-device AI。

2. **Build & Workflow / 构建工作流**  
   关注做事方式和工作流变化，例如开发者工具、MCP、repo、PR、testing、deployment、review、incident response、workflow automation。

3. **Design & Creation / 设计创作**  
   关注创作流程、交付标准、版权证明、客户验收变化，例如 Figma、Adobe、Canva、AI video、storyboard、provenance、design system、client review。

4. **Market & Capital / 市场资本**  
   关注钱、资源、成本、采购、收入、资本流向和商业模式，例如投资判断、融资结构、企业采购、ARR、revenue quality、API price war、inference cost、GPU / power / data center。

5. **Self Upgrade / 自我升级**  
   关注个人能力证明、职业变化、学习验证、作品集和工作流迁移，例如招聘标准变化、面试变化、AI workflow 作品集、个人 agent workflow。

6. **Life Signals / 生活信号**  
   关注 AI 如何改变真实日常决策，例如购物、家庭、健康、教育、通勤、城市服务、消费决策、隐私信任和普通用户实际使用 AI 的场景。

## 6. 信息生成逻辑

Time Slice Coffee 的信息提炼分为几层：

- **Raw Headline**：保留原始热点标题，让用户知道今天发生了什么。
- **Signal Subject**：提取真正的信息主体，避免把「谁转发、谁讨论、谁晒出」当成最终切片。
- **Core Shift**：说明这条信息背后世界哪里正在变化。
- **Purpose Angle**：根据用户选择的杯型 / 用途，生成不同的带走角度。
- **Label Title**：压缩成适合 50mm x 70mm 标签打印的主标题。
- **Source Access**：通过二维码指向原始 rawUrl 或 X search 页面。

用户选择不会改变原始信号本身，而是改变这条信号被萃取和带走的角度。

## 7. 今日杯型 / 用途

前台用「杯型」表达用户今天需要的信息作用，内部仍保持固定 identity id：

| 前台选项 | 内部 id | 输出方向 |
| --- | --- | --- |
| Learn / 学点什么 | student | 今天值得理解什么 |
| Build / 做点东西 | builder | 它会改变哪一步做事方式 |
| Create / 创作表达 | designer | 它给表达、创作或交付带来什么入口 |
| Spot Opportunity / 找机会 | founder | 机会可能落在哪个需求或产品场景 |
| Make a Decision / 做判断 | vc | 判断时应该看什么依据 |
| Ease FOMO / 少焦虑一点 | everyday | 今天只带走什么，哪些噪音可以先放下 |

## 8. 信息浓度

Time Slice Coffee 使用三种信息浓度：

- **Light / 轻萃**  
  更像一句杯贴标语，保留核心标题和一条带走信息。

- **Regular / 标准**  
  默认推荐版本，包含标题、Signal Context、FOR section、Today Focus 和 footer。

- **Double / 浓缩**  
  信息最多，包含更完整的判断层级和必要的 noise / whyToday 补充。

三种浓度不是简单缩放字号，而是不同的信息层级。

## 9. Hot / Iced

- **Served Hot / Paper Cup**  
  偏向可带走、可打印、可贴杯的短句。

- **Served Iced / Clear Cup**  
  偏向看清结构、展示和观察。

Hot / Iced 保留咖啡点单感，同时影响小票和标签中的呈现语气。

## 10. 50mm x 70mm 标签

最终标签遵循实体纸张规则：

- 外部纸张尺寸：50mm x 70mm
- 内容安全区：不超过 48mm 宽，当前按更保守安全区处理
- 所有文字、线条、二维码和 footer 必须落在安全区内
- 打印态使用高对比黑色，以适配 NIIMBOT B1 Pro 热敏打印

标签内容结构：

```text
TIME SLICE COFFEE
#编号 / shelf
source · date

Main Title
Signal Context

FOR ...
identityValue

TODAY'S FOCUS
todayFocus

SOURCE ACCESS
QR Code
SOURCE #编号

BREW ... / shelf
SERVED ... / cup type
```

## 11. Source Access / 溯源

50mm x 70mm 标签下半部分包含 Source Access 区块。

二维码不再指向本地 `127.0.0.1`，也不默认指向项目自己的 `source.html`。当前策略是：

- 如果 rawUrl 是 `https://x.com/.../status/...`，二维码直接打开原推文。
- 如果 rawUrl 是 `https://x.com/search?q=...`，二维码直接打开 X 搜索页。
- 如果 rawUrl 是 `grok-search://...`，二维码转换为 `https://x.com/search?q=...`。

这样用户扫码后能直接进入原始信息路径，不需要手动输入长 URL。

## 12. 数据模式

项目当前有两套数据入口：

1. **正式稳定数据**
   - 默认访问使用正式数据。
   - 入口：`/`

2. **Candidate signal bank**
   - 扩展候选库，共 72 条候选 signals。
   - 6 个 shelf，每组 12 条。
   - 入口：`/?signals=candidate`

候选库用于本地和线上测试信息源质量，不会默认替换正式 demo。

## 13. Live Demo

正式 Demo：

```text
https://qingsong-time-slice-coffee.onrender.com
```

Candidate Demo：

```text
https://qingsong-time-slice-coffee.onrender.com/?signals=candidate
```

Render 免费实例首次打开可能需要 30 到 60 秒冷启动。

## 14. 本地运行

启动命令：

```bash
node server.js
```

本地正式数据：

```text
http://127.0.0.1:8080
```

本地 candidate 数据：

```text
http://127.0.0.1:8080/?signals=candidate
```

可选环境变量：

```bash
PORT=8080
HOST=0.0.0.0
OPENAI_API_KEY=your_api_key
```

没有 API Key 时，Demo 会继续使用本地 fallback 逻辑完成主流程。

## 15. 部署方式

当前部署平台：Render

Render 配置：

```text
Build Command: echo "No build step"
Start Command: node server.js
```

`server.js` 支持 `process.env.PORT`，并监听 `0.0.0.0`，适配 Render / Railway 等 Node 服务平台。

## 16. 打印说明

线上 Demo 可以完整展示网页流程、Time Slice Receipt 和 50mm x 70mm 标签预览。

真实 NIIMBOT 打印建议在现场使用本地浏览器 + NIIMBOT B1 Pro 演示：

- 本地电脑需要安装 NIIMBOT 打印驱动。
- 浏览器打印时需要手动选择 NIIMBOT B1 Pro。
- 纸张规格建议选择 `NIIMBOT50*70`。
- 缩放建议使用实际大小 / 100%。

公网网页不能直接控制用户本地打印机。线上访问者点击 Print Label 时，只会调用自己设备的浏览器打印环境。

## 17. 技术结构

```text
index.html                  主页面结构
styles.css                  屏幕 UI、标签预览和打印样式
script.js                   前端交互、信息提炼、标签生成、打印 iframe
server.js                   静态服务和轻量 Node API
source.html                 Source Access 详情页
source.js                   Source Access 数据读取与展示
data/prepared-signals.js    正式稳定 signal bank
data/candidate-signals-expanded.js
                            candidate signal bank
data/signal-shelves.js      信息货架定义
data/signals.js             身份、文案和 fallback 数据
scripts/validate-candidate-signals.js
                            candidate signals 校验脚本
public/images/              杯子图片资源
docs/                       标准、审计和项目文档
```

## 18. 当前项目边界

Time Slice Coffee 当前适合展示：

- 信息货架和 raw signal 选择
- candidate signal bank 测试
- Time Slice Receipt
- 50mm x 70mm 标签预览
- Source Access QR 溯源
- 本地 NIIMBOT 打印演示

当前不做：

- 自动控制用户本地打印机
- 全自动抓取实时新闻
- 真实 Grok / X API 接入
- 大规模后端用户系统
- 替代新闻客户端或投资研究终端

