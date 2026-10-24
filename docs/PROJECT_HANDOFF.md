# Time Slice Coffee 项目交接与恢复

整理日期：2026-10-24（Asia/Shanghai）。应用基线：`4be7bda stabilize signal output flow`。

本文将当前仓库与本次对话中可见的项目上下文整理成独立交接资料，方便更换 ChatGPT / Codex 账号或电脑后继续开发。

## 1. 仓库与阅读顺序

- GitHub：<https://github.com/AcngAcng/qingsong-time-slice-coffee>
- 默认分支：`master`。
- 整理时仓库为 public；公开读取不依赖原 ChatGPT / Codex 账号。
- 备份标签：`backup-2026-10-24`。
- 备份下载：<https://github.com/AcngAcng/qingsong-time-slice-coffee/releases/tag/backup-2026-10-24>。

推荐阅读顺序：

1. `README.md`：项目介绍、访问和启动。
2. `PROJECT_STATE.md`：当前实际状态，取代早期未同步的状态说明。
3. 本文：文件范围、恢复方法、环境和边界。
4. `docs/PROJECT_DESCRIPTION.md`：产品叙事、用途与实体标签规则。
5. `docs/DEVELOPMENT_HISTORY.md`：历史修复、四条精确回归信号和测试限制。
6. `docs/SIGNAL_QUALITY_STANDARD.md`、`docs/CANDIDATE_SIGNAL_AUDIT.md`：内容标准与候选库审计。
7. `pitch-deck/deck-outline.md`、`pitch-deck/speaker-notes.md`：演示结构与讲稿。

## 2. 如何恢复整个项目

### 从 GitHub 克隆

在想保存项目的父目录运行：

```bash
git clone https://github.com/AcngAcng/qingsong-time-slice-coffee.git
cd qingsong-time-slice-coffee
git fetch origin --tags
git status
git log --oneline -5
```

正常克隆会获取 `master` 及其完整提交历史。不要使用 `--depth 1`，如果需要保留所有历史。

### 从 Release 恢复

Release 提供两种用途不同的备份：

- `qingsong-time-slice-coffee-2026-10-24-source.zip`：可直接解压的当前项目文件，包含源码、数据、图片、PPT 和文档，不含 `.git`。
- `qingsong-time-slice-coffee-2026-10-24-full-history.bundle`：Git 原生完整历史备份，包含这次备份时本地所有分支、标签和可达提交对象。
- `SHA256SUMS.txt`：上述文件的 SHA-256 校验值。

在下载目录校验并从 bundle 克隆：

```bash
shasum -a 256 -c SHA256SUMS.txt
git clone qingsong-time-slice-coffee-2026-10-24-full-history.bundle qingsong-time-slice-coffee-restored
cd qingsong-time-slice-coffee-restored
git remote set-url origin https://github.com/AcngAcng/qingsong-time-slice-coffee.git
git fetch origin --tags
git log --oneline -5
```

ZIP 适合读取当前文件；bundle 适合保留历史继续开发。历史版本也可以通过 Git 标签和 `git log` 找到。

### 使用另一个 GitHub 账号继续写入

如果只更换 ChatGPT / Codex 账号，连接有权限的 GitHub 账号并打开仓库即可。

如果 GitHub 账号也更换，公开仓库仍可读取和克隆；向原仓库 push 需要原仓库所有者授予协作者权限，或把仓库转移给新账号。也可以在新账号下 Fork，或创建一个空仓库后推送当前分支和全部标签。不要在备份时自动转移所有权或修改可见性。

Render 账号、GitHub 授权和操作系统钥匙串属于独立服务状态，需要在新账号下重新建立。

## 3. macOS 环境与启动

原开发路径：

```text
/Users/acnglab/Desktop/Demo项目开发/清客松-Time slice coffee/qingsong-time-slice-coffee
```

路径不是运行依赖，新电脑可以克隆到任意目录。当前机器已安装 Homebrew、Node.js 和 GitHub CLI；2026-10-24 语法及数据校验使用 `node v26.3.0`。这不是版本锁定声明，其他 Node 版本需要自行验证。

新 Mac 如果没有 `node` 且已有 Homebrew：

```bash
brew install node
node -v
npm -v
```

运行时必须位于仓库根目录，因为 `server.js` 使用 `process.cwd()` 作为静态资源根目录：

```bash
node server.js
```

默认数据入口：<http://127.0.0.1:8080/>。

Candidate 入口：<http://127.0.0.1:8080/?signals=candidate>。

限制为本机访问时可运行：

```bash
HOST=127.0.0.1 PORT=8080 node server.js
```

若端口被已有项目服务占用，先检查 `lsof -nP -iTCP:8080 -sTCP:LISTEN`，确认进程身份后再决定是否停止或使用别的 `PORT`。

应用根目录没有 `package.json`，服务器使用 Node 内置模块，普通网页运行不需要 `npm install`。`components/*.tsx` 是已有组件源码，不是当前静态网页的构建入口。

## 4. 环境变量与服务行为

| 名称 | 当前行为 |
| --- | --- |
| `HOST` | 默认 `0.0.0.0` |
| `PORT` | 默认 `8080`，支持部署平台注入 |
| `OPENAI_API_KEY` | 可选；没有时 rewrite/slice API 返回错误，前端 brew 使用本地 fallback |
| `OPENAI_MODEL` | 可选；代码默认值为 `gpt-4.1-mini`，实际可用性取决于新环境的 API 账号 |

`server.js` 直接读取进程环境，没有 dotenv 加载逻辑。仅创建 `.env` 文件不会自动生效，应在 shell 或部署平台配置变量。认证密钥不属于仓库备份内容。

现有路由：

- `POST /api/rewrite`：基于信号、身份、浓度和上杯方式请求 AI 标签输出。
- `POST /api/slice`：请求结构化时代切片。
- `POST /api/prepare-signals`：当前使用本地 prepared signals fallback，并非实时 Grok / X API 抓取。

前端 brew 请求现有超时为 1200ms；无 key、请求失败或超时可触发 fallback。实际 API 成功路径本次没有在线调用验证。

## 5. 文件与素材范围

| 路径 | 内容 |
| --- | --- |
| `index.html`、`styles.css`、`script.js` | 主页面、样式、状态流、标签和打印 |
| `server.js` | 静态服务与轻量 API |
| `source.html`、`source.js` | 既有 Source Access 页面 |
| `data/raw-signals-xai-sample.js` | 稳定库的 raw signals 来源；同名 `.ts` 也保留 |
| `data/prepared-signals.js`、`lib/prepare-signal-beans.js` | 稳定库准备逻辑；对应 `.ts` 也保留 |
| `data/candidate-signals-expanded.js` | 72 条扩展候选库 |
| `data/signal-shelves.*`、`data/signals.js`、`data/time-slice-label.ts` | 货架、用途、fallback 与标签类型 |
| `public/images/` | Hot / Iced 杯子原图与 clean 版 |
| `components/` | 已有 TSX 组件源码 |
| `scripts/validate-candidate-signals.js` | 候选库校验 |
| `docs/` | 产品说明、内容标准、审计、历史和交接 |
| `pitch-deck/*.pptx` | 当前演示稿及微调前备份 |
| `pitch-deck/slides/` | 8 页幻灯片源码及公共样式函数 |
| `pitch-deck/assets/` | 演示素材图片 |
| `pitch-deck/review-renders/`、`pitch-deck/layout/` | 逐页预览、contact sheet 和布局快照 |
| `pitch-deck/*.md`、`artifact-build-manifest.json` | 大纲、讲稿、视觉规范、评审和历史构建信息 |

PPTX 可以直接打开或编辑。幻灯片源码依赖原构建时提供的 presentation/context，`pitch-deck/package.json` 只有 module 声明，没有可直接复现的一键构建脚本。历史 build manifest 中的 Windows 绝对路径是旧环境记录，不是当前 Mac 的运行步骤；相关文件在仓库相对路径下已保留。

## 6. 数据流维护约束

设计目标：

```text
selectedSignal -> canonicalSlice -> generatedLabel
-> Receipt / Pick Up / Cup Mockup / 50x70 Label / Print / QR
```

`script.js` 中当前主要状态与守卫：

- `selectedSignal`、`selectedShelfId`、`selectedIdentity`、`selectedStrength`、`selectedServeStyle`。
- `activeRewrite`、`generatedLabel`、`currentCanonicalSlice`、`currentCanonicalSignalId`。
- `isCanonicalForSelection` 校验 canonical 的 signal、identity、浓度与上杯方式。
- `isLabelForCurrentSelection` 校验 `labelNo`、浓度和上杯方式；未单独将 identity 纳入 label 守卫，身份切换依赖统一清理。
- `clearGeneratedOutputState` 清理下游产物及其 DOM；`resetBrewResult` 使旧 generation token 失效。
- `prepareRewriteForCurrentSelection` 在 brew 完成阶段准备结果；渲染入口消费已准备的 label。
- `showGeneratedLabel` 正常复用已有 label，缺失或不匹配时允许 fallback。
- `getSourceAccessMarkup` 当前 label 匹配时使用当前 `selectedSignal.rawUrl`。

不要只凭 `labelNo` 正确就宣称所有内容语义都正确。现有内容 helper 还包含条件匹配模板，生成/normalize 阶段也可能多次调用 `buildCanonicalSlice`；这些不是本次备份新做的重构。若要进一步加强单次生成或精确语义匹配，先读实际代码并补对应回归。

## 7. 标签、QR 和打印

标签维持现有字段与 50mm x 70mm 结构。QR 目标 URL：

- `http/https` 原地址直接使用。
- `grok-search://...` 转成 `https://x.com/search?q=...`。
- 正常溯源不应指向 `127.0.0.1` 或依赖 `source.html`。

二维码图片来自 `https://api.qrserver.com/v1/create-qr-code/`；即便本地生成文案使用 fallback，QR 图片仍依赖网络。

打印函数从 `#pickup-50x70-label .label-paper-50x70` 克隆当前 DOM，在隐藏 iframe 中等待图片后调用 `print()`。实体打印需要在当前电脑配置 NIIMBOT B1 Pro 驱动、选择 `NIIMBOT50*70`，并设为实际大小 / 100%。在线页面不能直接控制别人的打印机。

## 8. 校验与备份清单

```bash
node --check script.js
node --check server.js
node scripts/validate-candidate-signals.js
git diff --check
git fsck --full
```

2026-10-24 的 candidate 校验结果：72 条、每货架 12 条、无缺失字段或重复 id、30 个 http/https URL、42 个 grok-search URL；有 5 条原有长度提示，状态为 passed。本次未修改这些数据。

`docs/BACKUP_MANIFEST.json` 保存文件路径、字节数和 SHA-256。它覆盖这次备份的其他全部版本文件，不包含自身，避免自引用散列。

在仓库根目录核验每个文件：

```bash
node --input-type=module <<'NODE'
import fs from 'node:fs';
import { createHash } from 'node:crypto';
const manifest = JSON.parse(fs.readFileSync('docs/BACKUP_MANIFEST.json', 'utf8'));
const invalid = manifest.files.filter(file => {
  if (!fs.existsSync(file.path)) return true;
  const bytes = fs.readFileSync(file.path);
  return bytes.length !== file.bytes
    || createHash('sha256').update(bytes).digest('hex') !== file.sha256;
});
console.log({ checked: manifest.files.length, invalid: invalid.map(file => file.path) });
if (invalid.length) process.exitCode = 1;
NODE
```

后续修改项目后，旧清单用于验证这个备份版本；不要把清单误当作自动更新的实时状态。

## 9. 账号之外的信息边界

仓库保存代码、项目文件、Git 历史及已整理的开发上下文，不会自动搬走 ChatGPT / Codex 的全部原始聊天、其他会话和账号侧附件。本文和开发历史仅依据本次可见对话及本地仓库整理，不能代表未知历史会话的逐字导出。

如果需要保留所有聊天原文或不在当前项目目录里的附件，需在原账号仍可用时另外导出并妥善保存。操作系统密码、GitHub token、API Key、钥匙串、Render 环境变量和第三方服务账号不应写入公开仓库；新环境重新登录或配置。

## 10. 给新账号的接手提示词

```text
请先阅读 README.md、PROJECT_STATE.md、docs/PROJECT_HANDOFF.md、
docs/PROJECT_DESCRIPTION.md 和 docs/DEVELOPMENT_HISTORY.md。

这是 Time Slice Coffee / 时代信息切片咖啡，当前主分支是 master。
用中文回复；按当前实际操作系统和仓库状态工作。
先检查 git status 与 git log，再决定操作，不要假定旧电脑路径或进程仍有效。
默认入口是稳定库；?signals=candidate 是 72 条候选库，两者不要混用。
保持已有咖啡点单、用途、浓度、Hot/Iced、50x70 标签和打印语义。
需要修复时小范围改动，先确认 selectedSignal 到 canonicalSlice/generatedLabel 的一致性。
4be7bda 是最近一次应用修复；之后的账号迁移备份主要补充交接资料。
请明确区分历史测试记录与当前实际复测，不要声称未执行的测试已通过。
在此基础上继续我接下来指定的任务。
```
