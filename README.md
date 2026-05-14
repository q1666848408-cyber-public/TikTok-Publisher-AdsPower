# TikTok-Publisher-AdsPower

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

> **Showcase** — ~15% skeleton. Core implementation not included.

Two subsystems sharing one AdsPower browser account pool. The rotator warms up accounts by simulating organic TikTok browsing. The publisher reads video records from Feishu Bitable and uploads them via TikTok Studio. A cloud relay bridges Feishu HTTP calls to a Windows publishing host.

## Stack

- Node.js, TypeScript
- Playwright (CDP via AdsPower)
- AdsPower browser profile API
- Feishu (Lark) Bitable API

## Subsystems

### Rotator

Opens AdsPower profiles on a schedule and simulates real user behavior: scroll feed, watch videos, like, pause. Keeps accounts warm between publish sessions.

### Publisher

Reads pending video records from a Feishu Bitable table, opens the corresponding AdsPower profile, navigates to TikTok Studio, and uploads the video with metadata. Marks the row as published on success.

### Cloud Relay

A lightweight HTTP server deployed to a cloud VM. Feishu automations POST to it; it forwards requests over a persistent tunnel to the Windows host running Publisher.

## Architecture

```
Feishu Bitable
    └── Cloud relay (cloud VM)
         └── Tunnel → Windows host
              └── Publisher (Node.js + Playwright CDP)
                   └── AdsPower profile pool
                        └── TikTok Studio upload
```

## Usage

```bash
npm install
cp .env.example .env

# Start the account rotator
node dist/rotator.js

# Start the publisher (Windows host)
node dist/publisher.js

# Start the cloud relay
node dist/relay.js
```

## Structure

```
TikTok-Publisher-AdsPower/
├── src/
│   ├── rotator/       # warm-up logic
│   ├── publisher/     # TikTok Studio upload flow
│   └── relay/         # cloud HTTP relay
├── config/
│   └── profiles.json  # AdsPower account list
└── .env.example
```
