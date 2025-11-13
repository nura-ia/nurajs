# Empezar con Nura

Nura conecta agentes de IA con interfaces humanas mediante un sistema de intents tipados. Sigue estos pasos para lanzar tu primera experiencia.

## Requisitos

- Node.js 18.18 o superior
- pnpm 8.15 o superior

## Crear un proyecto

```bash
npm create nura@latest my-nura-app -- --template react
cd my-nura-app
pnpm install
pnpm dev
```

El comando anterior genera un proyecto React con un dispatcher listo para usar. Cambia `--template` por `vue` o `node` para otras experiencias.

## Anatomía del intent

```ts
const dispatcher = createDispatcher({
  registry: {
    'hello.intent': { required: ['name'] },
  },
});

const intent = createIntent('hello.intent', { name: 'Ayu' });

dispatcher.register('hello.intent', {
  description: 'Saluda con calidez.',
  perform: ({ payload }) => `Hola ${payload.name}!`,
});

await dispatcher.dispatch(intent);
```

1. **Registry**: define los campos permitidos.
2. **Intent**: describe la intención del usuario.
3. **Action**: responde al intent con lógica de negocio.

## Siguientes pasos

- Conecta React o Vue con `@nura-js/client`.
- Explora ejemplos en `examples/*`.
- Configura plugins personalizados para transporte o voz.
