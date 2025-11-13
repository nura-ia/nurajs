# @nura-js/plugin-voice

Placeholder voice plugin for Nura. The API is stabilized so that downstream projects can start experimenting while the streaming implementation is completed.

## Usage

```ts
import { createDispatcher } from '@nura-js/core';
import { createVoicePlugin } from '@nura-js/plugin-voice';

const dispatcher = createDispatcher({});
const voice = createVoicePlugin({ dispatcher });

voice.attach();
await voice.simulateTranscript('hello there');
```

## Status

- Dispatch contract: ✅
- Real microphone capture: 🚧 in progress
