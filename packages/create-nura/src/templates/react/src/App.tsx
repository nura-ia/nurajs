import { useMemo } from 'react';
import { createClient } from '@nura-js/client';
import { createDispatcher, createIntent } from '@nura-js/core';

const dispatcher = createDispatcher({
  registry: {
    'hello.intent': { required: ['name'] },
  },
});

dispatcher.register('hello.intent', {
  perform: ({ payload }) => `Nura breathes back: hello ${payload.name}!`,
});

const client = createClient({ dispatcher });

export default function App() {
  const intent = useMemo(() => createIntent('hello.intent', { name: 'traveler' }), []);

  const handleClick = async () => {
    const result = await client.dispatch(intent);
    alert(result);
  };

  return (
    <main style={{ fontFamily: 'system-ui', padding: '4rem', textAlign: 'center' }}>
      <h1>Nura says hi</h1>
      <p>Press the button to send an intent to your local agent.</p>
      <button onClick={handleClick} style={{ fontSize: '1.25rem', padding: '0.75rem 1.5rem' }}>
        Send intent
      </button>
    </main>
  );
}
