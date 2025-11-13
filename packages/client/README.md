# @nura-js/client

Framework bindings for Nura intents.

## Installation

```bash
pnpm add @nura-js/core @nura-js/client
```

## React

```tsx
import { createClient, useIntent } from '@nura-js/client/react';
import { createDispatcher, createIntent } from '@nura-js/core';

const dispatcher = createDispatcher({
  registry: {
    'hello.intent': { required: ['name'] },
  },
});

dispatcher.register('hello.intent', {
  perform: ({ payload }) => `Hi ${payload.name}!`,
});

const client = createClient({ dispatcher });
const intent = createIntent('hello.intent', { name: 'traveler' });
const { run, isPending, result } = useIntent(client, intent);
```

## Vue

```ts
import { createClient, useIntent } from '@nura-js/client/vue';
```

The Vue composable mirrors the React API but returns refs for `isPending`, `result`, and `error`.
