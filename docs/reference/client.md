# `@nura-js/client`

## Conceptos

- `createClient({ dispatcher, transport? })`: crea un cliente que envía intents al dispatcher o a un transporte personalizado.
- `ClientTransport`: interfaz con método `send(intent)` que devuelve una promesa con el resultado.

## React

- `useIntent(client, intent)` devuelve `{ run, isPending, result, error }`.
- Invoca `run()` para ejecutar el intent y actualizar el estado.

## Vue

- `useIntent(client, intent)` devuelve refs reactivas: `{ run, isPending, result, error }`.
- Ideal para combinar con `setup()` y composición de estado.

## Transportes personalizados

Puedes sustituir el transporte por defecto para enviar intents a un backend:

```ts
const client = createClient({
  dispatcher,
  transport: {
    send(intent) {
      return fetch('/api/intents', {
        method: 'POST',
        body: JSON.stringify(intent),
      }).then((response) => response.json());
    },
  },
});
```
