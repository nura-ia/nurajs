import { describe, expect, it } from 'vitest';
import { createIntent, createDispatcher } from '@nura-js/core';
import { createClient } from '../src/index.js';

describe('createClient', () => {
  it('dispatches intents through dispatcher', async () => {
    const dispatcher = createDispatcher({});
    dispatcher.register('echo', {
      perform: ({ payload }) => payload.message,
    });

    const client = createClient({ dispatcher });
    const result = await client.dispatch(createIntent('echo', { message: 'ping' }));
    expect(result).toBe('ping');
  });
});
