# `@nura-js/core`

## Tipos principales

- `Intent<TName, TPayload>`: describe una intención del usuario con nombre y payload tipado.
- `Action<TIntent, TResult>`: lógica que responde a un intent y devuelve un resultado.
- `Dispatcher<TIntent, TResult>`: orquestador que valida intents y ejecuta acciones.
- `IntentRegistry`: mapa opcional que define campos requeridos y opcionales.

## Funciones

### `createIntent(name, payload, meta?)`
Crea un intent tipado. Devuelve un objeto plano que puedes serializar.

### `createDispatcher(options?)`
Devuelve un dispatcher con:

- `register(name, action)` para asociar intents con acciones.
- `dispatch(intent, context?)` para ejecutar la acción correspondiente.
- `validateIntent(intent)` para ejecutar la validación manual.

`options` admite:

- `registry`: reglas de validación.
- `onDispatch(intent, context)`: callback antes de ejecutar la acción.
- `onError(intent, error, context)`: callback en caso de fallo.

### `defineIntentRegistry(registry)`
Helper para obtener inferencia fuerte desde objetos literales.

### `IntentValidationError`
Error lanzado cuando un intent no cumple con el schema definido.

## Helpers adicionales

- `isIntent(value)` comprueba si un objeto tiene las propiedades mínimas.
- `createIntent` y `createDispatcher` están diseñados para usarse tanto en Node como en navegadores.
