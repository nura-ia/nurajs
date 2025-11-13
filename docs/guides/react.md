# Integrar React

Esta guía muestra cómo combinar React con el cliente de Nura.

## Instalación

```bash
pnpm add @nura-js/core @nura-js/client react react-dom
```

## Configurar el dispatcher

```ts
const dispatcher = createDispatcher({
  registry: {
    'search.intent': { required: ['query'] },
  },
});

dispatcher.register('search.intent', {
  description: 'Consulta un agente y devuelve resultados',
  perform: async ({ payload }) => doAgentSearch(payload.query),
});
```

## Hook `useIntent`

```tsx
const client = createClient({ dispatcher });
const intent = createIntent('search.intent', { query: 'planets that breathe' });
const { run, result, isPending, error } = useIntent(client, intent);
```

Renderiza el estado en tu componente:

```tsx
return (
  <div>
    <button onClick={run} disabled={isPending}>
      {isPending ? 'Consultando…' : 'Preguntar'}
    </button>
    {result && <Results data={result} />}
    {error && <ErrorBanner error={error} />}
  </div>
);
```

## Testing

Usa `@testing-library/react` o `vitest` para simular intents y validar respuestas. Los hooks son funciones puras: basta con mockear el dispatcher si quieres aislar al agente.
