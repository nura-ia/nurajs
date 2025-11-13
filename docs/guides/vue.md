# Integrar Vue

Vue y Nura trabajan en armonía mediante composables reactivos.

## Instalación

```bash
pnpm add @nura-js/core @nura-js/client vue
```

## Configurar el dispatcher

```ts
const dispatcher = createDispatcher({
  registry: {
    'compose.intent': { required: ['tone'] },
  },
});

dispatcher.register('compose.intent', {
  perform: async ({ payload }) => composeWithTone(payload.tone),
});
```

## Composable `useIntent`

```ts
const client = createClient({ dispatcher });
const intent = createIntent('compose.intent', { tone: 'gentle' });
const { run, isPending, result, error } = useIntent(client, intent);
```

Usa el estado en tu plantilla:

```vue
<button :disabled="isPending.value" @click="run">
  {{ isPending.value ? 'Respirando…' : 'Invocar agente' }}
</button>
<p v-if="result.value">{{ result.value }}</p>
<p v-if="error.value" class="error">Error: {{ error.value }}</p>
```

## Consejos

- Envuelve el dispatcher en un plugin de Vue para compartirlo via provide/inject.
- Usa `watchEffect` si necesitas reenviar intents cuando cambian parámetros.
