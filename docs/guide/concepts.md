# Core Concepts

This overview introduces the mental model behind Nura's building blocks. Each section links directly to the packages you will touch most when orchestrating agents, transport layers, and UI adapters.

---

## Intents — describe what the agent wants

**Package:** `@nura-js/intents`

Intents capture structured actions that your agent (or user) wants to perform. They provide:

- **Specification** — Declare payload schemas with JSON Schema so every request is validated.
- **Policies & approvals** — Gate actions behind role rules, tenant scopes, manual reviews, or custom predicates.
- **Lifecycle hooks** — Track intents across the Intent → Approval → Execute (IAE) pipeline with audit logging and idempotent retries.

```ts
import { registerType, createIntent, approveIntent } from '@nura-js/intents';

registerType({
  type: 'orders.cancel',
  schema: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string' } },
  },
});

const { id } = await createIntent({ type: 'orders.cancel', payload: { id: 'o-42' } });
await approveIntent(id);
```

Use the [recipes](../recipes) directory for deeper policy patterns and transport integrations.

---

## Core runtime — execute with guardrails

**Package:** `@nura-js/core`

The runtime ties together registries, actions, context, i18n, and lexicon tooling.

- **Registry** — The source of truth for action specs, permissions, and telemetry configuration.
- **Actions** — Define handlers that respond to agent decisions using either `type/target` or legacy `verb/scope` formats.
- **Context** — Persist the previous action to enable confirmations and follow-up prompts.
- **Language helpers** — Strip wake words, normalize synonyms, parse numerals, and detect locales.

```ts
import { createRegistry, defineActionSpec, Nura } from '@nura-js/core';

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

const nura = new Nura({ registry });
await nura.act({ type: 'open', target: 'orders' });
```

Check the [`packages/core`](../../packages/core) directory for a deeper dive into configuration flags and utilities.

---

## Client SDK — bridge transports and UI

**Package:** `@nura-js/client`

The client library consolidates HTTP transport calls, event dispatching, and UI wiring.

- **Transport** — Communicate with your intent server or HTTP router.
- **Dispatcher** — Emit events from resolved intents into the UI (or other subscribers).
- **Realtime hooks** — Listen to updates such as `intent:approved`, `intent:failed`, or custom channels.

```ts
import { NuraClient } from '@nura-js/client';

const client = new NuraClient({ baseUrl: '/ai' });

client.on('intent', (intent) => {
  console.log('Intent received:', intent.type);
});

await client.dispatch({
  type: 'orders.create',
  payload: { id: 'o-100' },
});
```

Pair the client with your preferred UI adapter — React, Vue, or Svelte — to surface results in components. Explore [`docs/index.md`](../index.md) for additional integration guides.

---

## What's next?

- Start with the [Getting Started guide](../getting-started.md) for project bootstrapping.
- Visit [`docs/modules`](../modules) for detailed API documentation.
- Join the discussion in the [community docs](../community) for governance, support, and contribution guidelines.
