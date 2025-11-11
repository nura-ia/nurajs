# @nura-js/vue

> Official Vue 3 adapter for rendering Nura.js metadata and wiring runtime actions.

## Installation

```bash
pnpm add @nura-js/vue @nura-js/core vue
# or
yarn add @nura-js/vue @nura-js/core vue
```

## Quick Start

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { createRegistry, Nura } from '@nura-js/core'
import { withVue } from '@nura-js/vue'

const registry = createRegistry({
  config: { app: { id: 'demo-nura' } },
})

const nura = new Nura({ registry })
const app = createApp(App)

withVue(nura).install(app)
nura.start()

app.mount('#app')
```

## API Surface

### `withVue(nura)`

Returns an installer with:

- `install(app)` – provides the `Nura` instance to the Vue app and registers
  directives/components.
- `directive` – access to the raw `v-nu-act` directive for manual registration.
- `plugin` – Vue plugin reference usable with `app.use(...)`.

### Directives

- `v-nu-act="action"` – serialises an `NAction` into `data-nu-act`, attaches
  accessible descriptions, and triggers `nura.act(...)` on interaction.
- `v-nu-listen` – marks DOM sections to be indexed by the registry.
  - Modifiers: `.soft`, `.deep` map to priority hints.
  - Argument: `v-nu-listen:scope="'ui'"` sets the scope metadata.

### Composables

- `useNura()` – injects the active `Nura` instance.
- `useNuraAction(action)` – builds a reactive action executor.
- `useNuraElement(options)` – registers components within the semantic graph.
- `useNuraEvents(event, handler)` – subscribe to registry events.
- `useNuraPermission(verb, scope)` – computes permission state for UI hints.

## Configuration

The package ships strict TypeScript definitions, Vue-specific directive typings,
and Rollup-based ESM builds with source maps. See `tsconfig.build.json` for
compiler flags.

## Dependencies

- Internal: `@nura-js/core`.
- Peer: Vue 3 (`>=3.3.0`).

## Status

**Experimental.** The adapter stabilises alongside the core runtime. Monitor the
root [`CHANGELOG.md`](../../CHANGELOG.md) for updates.
