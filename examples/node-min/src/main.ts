import { createDispatcher, createIntent } from '@nura-js/core';

const dispatcher = createDispatcher({
  registry: {
    'hello.intent': { required: ['name'] },
  },
});

dispatcher.register('hello.intent', {
  perform: ({ payload }) => `Nura whispers back: hello ${payload.name}!`,
});

const intent = createIntent('hello.intent', { name: process.argv[2] ?? 'traveler' });

const result = await dispatcher.dispatch(intent);
console.log(result);
