import { createDispatcher, createIntent } from '@nura-js/core';

const dispatcher = createDispatcher({
  registry: {
    'hello.intent': { required: ['name'] },
  },
});

dispatcher.register('hello.intent', {
  perform: ({ payload }) => `Nura breathes back: hello ${payload.name}!`,
});

const intent = createIntent('hello.intent', { name: 'traveler' });

const result = await dispatcher.dispatch(intent);
console.log(result);
