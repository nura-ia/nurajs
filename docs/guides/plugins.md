# Crear un plugin

Los plugins extienden el dispatcher con nuevas capacidades como voz, transporte o analítica.

## Concepto clave

1. Recibe una instancia de `Dispatcher`.
2. Expone métodos `attach` / `detach` para controlar el ciclo de vida.
3. Llama a `dispatcher.dispatch` cuando captura un nuevo intent.

## Ejemplo mínimo

```ts
interface WeatherPayload {
  city: string;
}

const dispatcher = createDispatcher<Intent<'weather.lookup', WeatherPayload>>({
  registry: {
    'weather.lookup': { required: ['city'] },
  },
});

dispatcher.register('weather.lookup', {
  perform: async ({ payload }) => fetchWeather(payload.city),
});

function createWeatherPlugin(dispatcher: Dispatcher) {
  return {
    attach() {
      console.log('🌦️ Weather plugin ready');
    },
    async simulate(city: string) {
      return dispatcher.dispatch({ name: 'weather.lookup', payload: { city } });
    },
  };
}
```

## Testing

- Usa `vitest` para simular `simulate` o eventos del plugin.
- Mockea APIs externas (micrófono, HTTP) antes de llamar a `dispatch`.

## Publicar

1. Añade tu paquete en `packages/`.
2. Crea un changeset `pnpm changeset` y describe si es `minor` o `patch`.
3. Ejecuta `pnpm release` y `pnpm publish` cuando estés listo.
