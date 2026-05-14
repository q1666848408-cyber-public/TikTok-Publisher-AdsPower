<div align="center">

# 📱 TikTok Publisher (AdsPower)

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Playwright](https://img.shields.io/badge/Playwright-CDP-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev)
[![AdsPower](https://img.shields.io/badge/AdsPower-Browser-FF6B35?style=flat-square)](https://www.adspower.com)
[![Lark](https://img.shields.io/badge/Lark-Bitable-00D6B9?style=flat-square&logo=bytedance&logoColor=white)](https://open.feishu.cn)

**TikTok automation toolkit — multi-account rotator (nurture) + Feishu-driven auto-publish via AdsPower & Playwright CDP**

> ⚠️ **Showcase Only** — ~15% skeleton. Anti-detection logic, account pool & cloud-relay glue not included.

</div>

---

## ✨ Overview

Two coordinated subsystems share a single AdsPower-managed account pool:

- **Rotator** — opens accounts on schedule, scrolls TikTok like a real user (warm-up / nurture)
- **Publish** — reads video records from Feishu Bitable, uploads & publishes via TikTok Studio

A cloud relay server bridges Feishu automation HTTP calls to a Windows publishing host.

---

## 🏗️ Architecture

```
   Feishu Bitable                Cloud Relay
  ┌────────────────┐            ┌──────────────┐
  │  video records │── HTTP ───►│  Queue API   │
  │  + publish=Y   │            │  (Flask)     │
  └────────────────┘            └──────┬───────┘
                                       │ poll
                                       ▼
                          ┌─────────────────────────┐
                          │   Windows Publisher     │
                          │   ┌─────────────────┐   │
                          │   │ Scheduler       │   │
                          │   │ (Bull queue)    │   │
                          │   └────────┬────────┘   │
                          │            ▼            │
                          │   ┌─────────────────┐   │
                          │   │ AdsPower client │   │
                          │   │ + Playwright    │   │
                          │   └────────┬────────┘   │
                          └────────────┼────────────┘
                                       │
                                       ▼
                              TikTok Studio (upload)

  Independently:
  ┌──────────────┐      ┌──────────────────────┐
  │ Cron daily   │─────►│ Rotator (nurture)    │
  │              │      │ multi-account scroll │
  └──────────────┘      └──────────────────────┘
```

---

## 📁 Structure

```
tiktok-publisher-adspower/
├── src/
│   ├── core/
│   │   └── adspower.js          # AdsPower client (CDP bridge)
│   ├── publish/
│   │   └── scheduler.js         # Bull-queue publish scheduler
│   ├── rotator/
│   │   └── index.js             # Nurture rotator
│   └── integrations/
│       └── feishu.js            # Feishu Bitable client
└── package.json
```

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 18+ |
| Browser | AdsPower → Playwright (via CDP) |
| Queue | Bull + Redis |
| Trigger | Feishu Bitable automation |
| Cloud Relay | Flask (Python) on Singapore VPS |

---

<div align="center">
<sub>Showcase version · Anti-detection & account pool not included · For portfolio reference only</sub>
</div>
