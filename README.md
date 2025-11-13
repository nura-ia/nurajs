# Nura.js — The Agent-UI Bridge

[![npm](https://img.shields.io/npm/v/@nura-js/core.svg?label=%40nura-js%2Fcore)](https://www.npmjs.com/package/@nura-js/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

**Nura.js** harmonizes AI agents and UI layers so teams can build interfaces that listen, understand, and act. Born from the ideals of *nur* (light) and *pneuma* (breath), it carries Billy Rojas's vision of living, conversational software.

> "Create a world where apps feel profoundly human—so present and gentle you could swear they almost breathe."

Nura offers a cohesive toolchain—runtime, intent engine, client SDKs, and UI adapters—that makes agent-driven experiences feel natural without sacrificing guardrails.

---

## Table of Contents

- [Why Nura.js](#why-nurajs)
- [Architecture at a Glance](#architecture-at-a-glance)
- [Quick Start](#quick-start)
- [Usage in Your Stack](#usage-in-your-stack)
- [Core Capabilities](#core-capabilities)
- [Ecosystem Packages](#ecosystem-packages)
- [Documentation](#documentation)
- [Community & Support](#community--support)
- [Security](#security)
- [License](#license)

---

## Why Nura.js

- **Agent-native** — structure natural language into deterministic intents and actions.
- **Framework-agnostic** — ship React, Vue, Svelte, or DOM-first interfaces with the same agent brain.
- **Production ready** — policies, approvals, idempotency, telemetry, and rate limiting are built-in.
- **Multilingual** — locale-aware numerals, synonyms, wake-word handling, and lexicon utilities.

## Architecture at a Glance

The framework is organized into modular packages that work together:

- **Core Runtime** (`@nura-js/core`) – Foundation for action execution, permissions, i18n, and NLP utilities.
- **Intent System** (`@nura-js/intents`) – Structured intent definition, validation, approval workflows, and execution.
- **Client SDK** (`@nura-js/client`) – HTTP client and UI dispatcher for intent-based interactions.
- **Framework Adapters** (`@nura-js/react`, `@nura-js/vue`, `@nura-js/svelte`) – Framework-specific integrations.
- **Transport Layer** (`@nura-js/transport-http`) – Secure HTTP endpoints with rate limiting.
- **DOM Utilities** (`@nura-js/dom`) – DOM indexing and scanning for UI automation.

---

## Quick Start

### Requirements

- Node.js ≥ 18.18.0
- pnpm ≥ 8.15.0

### Install the essentials

```bash
# Core runtime
pnpm add @nura-js/core

# Optional linguistic helpers
pnpm add @nura-js/plugin-voice @nura-js/plugin-fuzzy

# Framework adapter (pick one)
pnpm add @nura-js/react
# or
pnpm add @nura-js/vue
# or
pnpm add @nura-js/svelte

# Intent + transport layer for backend flows
pnpm add @nura-js/intents @nura-js/transport-http

# Client SDK for browser-based dispatching
pnpm add @nura-js/client
```

### Develop inside the monorepo

```bash
# Install dependencies
pnpm install

# Run development mode
pnpm dev

# Build every package
pnpm build

# Global type checking
pnpm typecheck
```

---

## Usage in Your Stack

### React (hooks-driven)

```tsx
import { NuraProvider, useNuraAction } from '@nura-js/react';
import { createRegistry, defineActionSpec } from '@nura-js/core';

const registry = createRegistry({
  config: { app: { id: 'orders-app', locale: 'en-US' } },
  specs: [
    defineActionSpec({
      name: 'open_orders',
      type: 'open',
      target: 'orders',
      phrases: { 'en-US': { canonical: ['open orders'] } },
    }),
  ],
});

export function App() {
  return (
    <NuraProvider registry={registry}>
      <OrdersButton />
    </NuraProvider>
  );
}

function OrdersButton() {
  const { execute } = useNuraAction({
    type: 'open',
    target: 'orders',
    handler: () => console.log('Opening orders…'),
  });

  return <button onClick={() => execute()}>Open Orders</button>;
}
```

### Vue (composition API)

```ts
import { createApp } from 'vue';
import { createNuraPlugin, useNura } from '@nura-js/vue';
import { createRegistry } from '@nura-js/core';

const registry = createRegistry({
  config: { app: { id: 'orders-app', locale: 'en-US' } },
});

const app = createApp({
  setup() {
    const nura = useNura();
    const execute = () => nura.act({ type: 'open', target: 'orders' });
    return { execute };
  },
});

app.use(createNuraPlugin({ registry }));
app.mount('#app');
```

### Node (intent pipeline)

```ts
import { registerType, createIntent, approveIntent } from '@nura-js/intents';

registerType({
  type: 'orders.create',
  schema: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string' } },
  },
  mapper: (payload) => ({
    type: 'ui.open',
    payload,
    uiHint: { target: 'orderForm' },
  }),
});

const { id } = await createIntent({
  type: 'orders.create',
  payload: { id: 'o-100' },
});

await approveIntent(id);
```

---

## Core Capabilities

### Intent Engine (`@nura-js/intents`)

- Complete Intent → Approval → Execute (IAE) lifecycle.
- JSON Schema validation powered by Ajv.
- Policy hooks for role-, tenant-, and predicate-based approvals.
- Built-in queues for human approvals and audit logging.
- Idempotent retries and rate limiting to protect critical paths.

### Wake & Language Processing (`@nura-js/core/wake` and friends)

- Damerau-Levenshtein and Soundex fuzzy matching.
- Alias and prefix support ("ok", "okay", "okey").
- Locale-aware numeral parsing and synonym normalization.
- Entity extraction helpers for booleans, enums, dates, numbers, and ranges.

### Context Management (`@nura-js/core/context`)

- Persist the last action for confirmation or replay.
- Detect confirmation phrases like "yes", "ok", "si", "dale".
- Rehydrate context for follow-up agent interactions.

### Internationalization (`@nura-js/core/i18n`)

- Namespaced message bundles for common, actions, and UI copy.
- Fallback locale chains and runtime registration.
- Variable interpolation for dynamic phrases.

### Lexicon System (`@nura-js/core/lexicon`)

- Normalize terminology into canonical representations.
- Locale-specific dictionaries with phonetic similarity checks.
- Batch registration APIs for large vocabularies.

### Action System (`@nura-js/core`)

- Register and dispatch actions with modern (`type/target`) or legacy (`verb/scope`) styles.
- Scope- and role-based permission checks.
- Confirmation hooks and telemetry events for observability.

### Framework Adapters

- Provider components to inject registries into React, Vue, and Svelte apps.
- Hooks like `useNura`, `useNuraAction`, and `useNuraPermission` to wire UI events.
- Declarative helpers (`NuraElement`, `NuraButton`) that align component actions with intents.

---

## Ecosystem Packages

| Package | Description |
| --- | --- |
| `@nura-js/core` | Runtime, permissions, NLP utilities, i18n, lexicon, telemetry. |
| `@nura-js/intents` | Define, validate, approve, and execute intents with guardrails. |
| `@nura-js/client` | Unified client SDK with dispatchers and transport helpers. |
| `@nura-js/react` | React provider, hooks, and components for agent-driven UIs. |
| `@nura-js/vue` | Vue plugin and composition helpers. |
| `@nura-js/svelte` | Svelte stores and components for Nura actions. |
| `@nura-js/transport-http` | Hardened HTTP endpoints for ingesting intents. |
| `@nura-js/dom` | DOM scanning/indexing utilities for UI automation. |

---

## Documentation

- **Getting Started**: [docs/getting-started.md](./docs/getting-started.md)
- **Concepts Overview**: [docs/guide/concepts.md](./docs/guide/concepts.md)
- **Full Documentation**: [docs/index.md](./docs/index.md)
- **API Reference**: [docs/api/](./docs/api/)
- **Guides**: [docs/guide/](./docs/guide/)
- **Architecture**: [docs/internals/architecture.md](./docs/internals/architecture.md)

## Community & Support

- **GitHub**: [https://github.com/nura-ia/nurajs](https://github.com/nura-ia/nurajs)
- **Issues**: [https://github.com/nura-ia/nurajs/issues](https://github.com/nura-ia/nurajs/issues)
- **Website**: [https://nura.dev](https://nura.dev)

## Security

- **Vulnerability Reports**: [security@nura.dev](mailto:security@nura.dev)
- **Security Policy**: [SECURITY.md](./SECURITY.md)

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

**"Create a world where apps feel profoundly human—so present and gentle you could swear they almost breathe."**
