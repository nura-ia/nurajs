# @nura-js/client

Interact with the Nura AI intent surface from any UI or automation client.

## Installation

```bash
pnpm add @nura-js/client
```

## Usage Example

```ts
import { AiClient, UiDispatcher } from '@nura-js/client'

const client = new AiClient('https://api.example.com/ai')
const dispatcher = new UiDispatcher()

dispatcher.register('ui.open', (_, hint) => openModal(hint?.target))

const { id } = await client.createIntent({
  type: 'orders.create',
  payload: { id: 'o-88' }
})
await client.approveIntent(id)
dispatcher.dispatch(await client.getIntentResult(id))
```

See [`@nura-js/intents`](../../docs/modules/intents.md) and [`@nura-js/transport-http`](../../docs/modules/transport-http.md) for server-side integration.
