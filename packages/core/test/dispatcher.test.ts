import { describe, expect, it } from 'vitest';
import {
  createDispatcher,
  createIntent,
  defineIntentRegistry,
  IntentValidationError,
} from '../src/index.js';

describe('createDispatcher', () => {
  it('dispatches registered intents', async () => {
    const registry = defineIntentRegistry({
      'greet.user': { required: ['name'] },
    });
    const dispatcher = createDispatcher({ registry });
    dispatcher.register('greet.user', {
      description: 'Greets a user',
      perform: ({ payload }) => `Hello ${payload.name}!`,
    });

    const result = await dispatcher.dispatch(createIntent('greet.user', { name: 'Nura' }));
    expect(result).toBe('Hello Nura!');
  });

  it('validates payloads against registry', async () => {
    const dispatcher = createDispatcher({
      registry: defineIntentRegistry({
        'greet.user': { required: ['name'] },
      }),
    });

    dispatcher.register('greet.user', {
      description: 'Greets a user',
      perform: () => 'hi',
    });

    await expect(() => dispatcher.dispatch(createIntent('greet.user', {} as never))).rejects.toBeInstanceOf(
      IntentValidationError,
    );
  });
});
