<div align="center">
  <img src="./public/nura-logo.svg" alt="Nura logo" width="120" />
  <h1>Nura: Build human-feeling apps that almost breathe.</h1>
  <p align="center">
    <a href="https://github.com/nura-ia/nurajs/actions/workflows/ci.yml"><img src="https://github.com/nura-ia/nurajs/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
    <a href="https://www.npmjs.com/org/nura-js"><img src="https://img.shields.io/npm/v/@nura-js/core.svg?label=@nura-js/core" alt="npm version" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-3DA5D9" alt="License" /></a>
    <a href="https://bundlephobia.com/package/@nura-js/core"><img src="https://img.shields.io/badge/bundle%20size-2.3%20kB-9C27B0" alt="Bundle size" /></a>
  </p>
</div>

> Nura is the poetic bridge between agent minds and human interfaces. Compose secure intents, orchestrate reactions, and watch your UI breathe along with the story your AI wants to tell.

## Installation & demo in 60 seconds

```bash
# Install the CLI
npm create nura@latest my-nura-app -- --template react
cd my-nura-app
pnpm install && pnpm dev
```

![Hello intent placeholder](https://dummyimage.com/900x420/101828/ffffff&text=Hello+Intent+%E2%9C%A8)

When you press the glowing button, Nura dispatches a typed intent to a local dispatcher, validates the payload, and streams the agent's whisper back into your UI. No boilerplate, no guesswork.

```tsx
// @nura-js/client + React hook
const dispatcher = createDispatcher({
  registry: { 'hello.intent': { required: ['name'] } },
});

dispatcher.register('hello.intent', {
  perform: ({ payload }) => `Nura breathes back: hello ${payload.name}!`,
});

const client = createClient({ dispatcher });
const intent = createIntent('hello.intent', { name: 'traveler' });
const { run, isPending, result } = useIntent(client, intent);
```

## Why teams choose Nura

- **DX that glows** – React/Vue hooks, headless dispatcher, and ready-to-publish plugins.
- **Intents that feel safe** – typed payloads, structural validation, composable middleware.
- **One SDK, many frontends** – React, Vue, and Node templates land in a single command.
- **MCP & VS Code friendly** – designed for AI-native workflows, ready for your tooling.

## How it feels in code

```ts
const dispatcher = createDispatcher({
  registry: {
    'voice.capture': { required: ['transcript'] },
  },
  onDispatch(intent) {
    console.log('✨ breathing', intent.name);
  },
});

dispatcher.register('voice.capture', {
  description: 'Let the agent listen with confidence.',
  perform: ({ payload }) => payload.transcript.toUpperCase(),
});

await dispatcher.dispatch(createIntent('voice.capture', { transcript: 'hello horizon' }));
```

## Quick comparison

| Framework | Propósito       | Estilo    | Seguridad           | Ecosistema       |
| --------- | --------------- | --------- | ------------------- | ---------------- |
| Nura      | Agent-UI bridge | React/Vue | Intents endurecidos | Plugins AI-ready |
| Next.js   | Full-stack web  | React     | Route-based guard   | Vercel platform  |
| Astro     | Content-first   | Multi     | Islands hydration   | Integrations     |
| SvelteKit | UI framework    | Svelte    | Form actions        | Adapters         |

## Roadmap visual

- [x] Core SDK (dispatcher, intents, validators)
- [x] Client React/Vue hooks
- [ ] Plugin Voice realtime capture
- [ ] MCP Integration
- [ ] VS Code Tools

## Packages

- `@nura-js/core` – intent contracts, dispatcher, validation helpers.
- `@nura-js/client` – React/Vue bindings and transport adapters.
- `@nura-js/plugin-voice` – placeholder plugin with defined API surface.
- `@nura-js/create-nura` – CLI that ships React, Vue, and Node templates.

Explore the [examples](./examples) and dive into the [documentation](./docs/README.md) for the encyclopedic view.

## Contact & comunidad

- Preguntas y soporte en [GitHub Discussions](https://github.com/nura-ia/nurajs/discussions)
- Reportes de seguridad: [security@nura.dev](mailto:security@nura.dev)

---

Ready to publish? Run `pnpm changeset` → `pnpm release` → `pnpm publish`. Nura will exhale a new version to npm with changelogs that read like storyboards.
