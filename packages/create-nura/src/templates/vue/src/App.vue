<script setup lang="ts">
import { computed } from 'vue';
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
const intent = createIntent('hello.intent', { name: 'traveler' });

const onClick = async () => {
  const result = await client.dispatch(intent);
  window.alert(result);
};

const headline = computed(() => 'Nura says hi');
</script>

<template>
  <main class="wrapper">
    <h1>{{ headline }}</h1>
    <p>Press the button to send an intent to your local agent.</p>
    <button type="button" @click="onClick">Send intent</button>
  </main>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 1rem;
  font-family: system-ui;
}

button {
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
}
</style>
