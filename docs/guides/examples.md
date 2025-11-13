# Ejemplos avanzados

## Eventos de dispatcher

```ts
const dispatcher = createDispatcher({
  onDispatch(intent) {
    metrics.increment(intent.name);
  },
  onError(intent, error) {
    logger.error({ intent, error });
  },
});
```

## Transporte personalizado

```ts
const client = createClient({
  dispatcher,
  transport: {
    async send(intent) {
      const response = await fetch('/api/intents', {
        method: 'POST',
        body: JSON.stringify(intent),
      });
      return response.json();
    },
  },
});
```

## Streaming con Server-Sent Events

```ts
const eventSource = new EventSource('/api/intents/stream');

eventSource.addEventListener('intent', (event) => {
  const intent = JSON.parse(event.data);
  dispatcher.dispatch(intent);
});
```

Más ejemplos se encuentran en la carpeta [`examples/`](../../examples).
