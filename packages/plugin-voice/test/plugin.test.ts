import { describe, expect, it } from 'vitest';
import { createDispatcher } from '@nura-js/core';
import { createVoicePlugin } from '../src/index.js';

describe('plugin-voice', () => {
  it('simulates transcripts when attached', async () => {
    const dispatcher = createDispatcher({});
    dispatcher.register('voice.capture', {
      perform: ({ payload }) => payload.transcript.toUpperCase(),
    });

    const plugin = createVoicePlugin({ dispatcher });
    plugin.attach();

    await expect(plugin.simulateTranscript('hello')).resolves.toBe('HELLO');
  });
});
