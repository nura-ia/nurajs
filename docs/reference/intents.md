# Intents en Nura

Los intents son contratos que describen la intención del usuario. Cada intent contiene:

- `name`: identificador único (ej. `voice.capture`).
- `payload`: datos estructurados.
- `meta`: información opcional de trazabilidad.

## Validación

El registry opcional define reglas por intent:

```ts
const registry = defineIntentRegistry({
  'voice.capture': {
    required: ['transcript'],
    optional: ['confidence'],
  },
});
```

Los intents que no cumplan estas reglas disparan `IntentValidationError` con la lista de issues.

## Contexto

El método `dispatch(intent, context?)` acepta un contexto opcional con `source` y `correlationId`. Usa estos campos para conectar logs, trazas o sesiones de usuario.

## Buenas prácticas

- Prefiere nombres con namespace (`module.action`).
- Mantén los payloads serializables.
- Documenta cada intent en tu propio catálogo para que otros equipos sepan cómo invocarlo.
