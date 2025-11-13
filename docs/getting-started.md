# Getting Started with Nura.js

This guide walks you through installing the core packages, wiring a minimal project, and navigating the monorepo during development. It focuses on fast, incremental steps so you can feel confident integrating Nura with your agents and UI.

---

## 1. Prerequisites

- Node.js **18.18.0** or newer
- pnpm **8.15.0** or newer (npm/yarn work for single apps, but the repo uses pnpm workspaces)
- Basic familiarity with TypeScript or modern JavaScript tooling

---

## 2. Install the packages you need

The Nura ecosystem is modular. Start with the runtime, then add the layers that match your use case.

```bash
# Core runtime and shared utilities
pnpm add @nura-js/core

# Optional linguistic helpers (wake words, phonetics, fuzzy matching)
pnpm add @nura-js/plugin-voice @nura-js/plugin-fuzzy

# Framework adapter — choose the UI layer you ship today
pnpm add @nura-js/react
# or
pnpm add @nura-js/vue
# or
pnpm add @nura-js/svelte

# Intent lifecycle + transport if you coordinate server-side agents
pnpm add @nura-js/intents @nura-js/transport-http

# Client dispatching utilities for browsers and hybrid apps
pnpm add @nura-js/client
```

Need another package? Browse the [ecosystem table in the README](../README.md#ecosystem-packages).

---

## 3. Bootstrap a tiny React app

```tsx
// src/App.tsx
import { NuraProvider, useNuraAction } from '@nura-js/react';
import { createRegistry, defineActionSpec } from '@nura-js/core';

const registry = createRegistry({
  config: { app: { id: 'demo-app', locale: 'en-US' } },
  specs: [
    defineActionSpec({
      name: 'open_orders',
      type: 'open',
      target: 'orders',
      phrases: { 'en-US': { canonical: ['open orders'] } },
    }),
  ],
});

function OrdersButton() {
  const { execute } = useNuraAction({
    type: 'open',
    target: 'orders',
    handler: () => console.log('Opening orders…'),
  });

  return <button onClick={() => execute()}>Open Orders</button>;
}

export function App() {
  return (
    <NuraProvider registry={registry}>
      <OrdersButton />
    </NuraProvider>
  );
}
```

Run your dev server (`pnpm dev`, `npm run dev`, or `yarn dev`). Trigger the button and observe the console output to confirm the action dispatch.

---

## 4. Wire the intent engine on the server

```ts
// src/agent/intents.ts
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
    uiHint: { target: 'ordersForm' },
  }),
});

export async function createOrderIntent() {
  const { id } = await createIntent({
    type: 'orders.create',
    payload: { id: 'o-100' },
  });

  await approveIntent(id);
  return id;
}
```

Pair the above with `@nura-js/transport-http` or your custom transport to accept requests from clients or agents.

---

## 5. Run the monorepo locally

```bash
pnpm install   # install dependencies once
pnpm dev       # run the root dev script (turborepo orchestrates packages)
pnpm build     # build all packages when you need release artifacts
pnpm test      # execute repository tests (if configured in packages)
pnpm typecheck # ensure shared types compile cleanly
```

- Use `pnpm --filter <package>` to scope commands to a single package.
- Refer to [`BUILD_NOTES.md`](../BUILD_NOTES.md) if you run into environment-specific constraints.

---

## 6. Explore more

- Read the [Concepts Overview](guide/concepts.md) to understand the intent lifecycle, client SDK, and runtime composition.
- Dive into [docs/index.md](./index.md) for the full documentation landing page.
- Check the [recipes](./recipes) and [tutorials](./tutorials) folders for experimental patterns and deeper walkthroughs.

Happy building! Let your agents breathe life into your interfaces.
