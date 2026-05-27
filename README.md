# 时代信息切片咖啡

Hackathon MVP for **Time Slice Coffee / Today’s Signal / Signal Brew**.

This is a static frontend plus a tiny Node API server for:

Signal → Slice → Value → Label

信号 → 切片 → 价值 → 标签

## Run

```powershell
$env:OPENAI_API_KEY="sk-..."
node server.js
```

Open:

```text
http://127.0.0.1:8080
```

## Slice API

`POST /api/slice`

```json
{
  "rawTitle": "Agent workflow tools released",
  "rawSummary": "A new tool lets software complete several connected work steps.",
  "source": "Manual"
}
```

## Rewrite API

`POST /api/rewrite`

```json
{
  "signal": {
    "id": "024",
    "slice": "答案变多之后，问题开始变贵。",
    "shortReason": "AI 让获取答案变容易，但判断什么值得问，正在成为新的能力。"
  },
  "identity": {
    "id": "designer",
    "name": "设计师",
    "label": "FOR DESIGNERS"
  }
}
```

Mock fallback data lives in `data/signals.js`.
