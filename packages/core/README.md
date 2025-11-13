# @nura-js/core

Core primitives for building intent-driven experiences with Nura.

## Installation

```bash
pnpm add @nura-js/core
```

## Usage

```ts
import { createDispatcher, createIntent } from '@nura-js/core';

const dispatcher = createDispatcher({
  registry: {
    'hello.intent': { required: ['name'] },
  },
});

dispatcher.register('hello.intent', {
  perform: ({ payload }) => `Hi ${payload.name}!`,
});

await dispatcher.dispatch(createIntent('hello.intent', { name: 'traveler' }));
```
