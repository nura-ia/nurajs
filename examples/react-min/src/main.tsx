import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient, useIntent } from '@nura-js/client/react';
import { createDispatcher, createIntent } from '@nura-js/core';

type GreetingIntent = ReturnType<typeof createGreetingIntent>;

const dispatcher = createDispatcher({
  registry: {
    'hello.intent': { required: ['name'] },
  },
});

dispatcher.register('hello.intent', {
  perform: ({ payload }) => `Nura whispers back: hello ${payload.name}!`,
});

const client = createClient<GreetingIntent, string>({ dispatcher });

function createGreetingIntent(name: string) {
  return createIntent('hello.intent', { name });
}

function App() {
  const [name, setName] = useState('traveler');
  const intent = useMemo(() => createGreetingIntent(name), [name]);
  const { run, isPending, result, error } = useIntent(client, intent);

  return (
    <main style={{ fontFamily: 'system-ui', padding: '4rem', display: 'grid', gap: '1rem' }}>
      <h1>Nura React minimal</h1>
      <label>
        <span>Name</span>
        <input value={name} onChange={(event) => setName(event.target.value)} style={{ marginLeft: '0.75rem' }} />
      </label>
      <button disabled={isPending} onClick={run} style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}>
        {isPending ? 'Breathing…' : 'Send intent'}
      </button>
      {result && <p>Agent replied: {result}</p>}
      {error && <p style={{ color: 'tomato' }}>Error: {String(error)}</p>}
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
