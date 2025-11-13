# @nura-js/create-nura

Scaffold Nura projects in seconds.

## Usage

```bash
npm create nura@latest my-nura-app -- --template react
```

Templates available:

- `react`
- `vue`
- `node`

Each template ships with:

- Dispatcher configured with a sample intent
- Typed client integration
- Development scripts ready for pnpm

## Local development

```bash
pnpm install
pnpm build --filter @nura-js/create-nura
```
