<script setup lang="ts">
import { computed, ref } from 'vue';
import { createClient } from '@nura-js/client';
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

const name = ref('traveler');
const intent = computed(() => createGreetingIntent(name.value));

const isPending = ref(false);
const result = ref('');
const error = ref('');

const onClick = async () => {
  isPending.value = true;
  error.value = '';
  try {
    result.value = await client.dispatch(intent.value);
  } catch (err) {
    error.value = String(err);
  } finally {
    isPending.value = false;
  }
};
</script>

<template>
  <main class="wrapper">
    <h1>Nura Vue minimal</h1>
    <label>
      <span>Name</span>
      <input v-model="name" />
    </label>
    <button type="button" :disabled="isPending" @click="onClick">
      {{ isPending ? 'Breathing…' : 'Send intent' }}
    </button>
    <p v-if="result">Agent replied: {{ result }}</p>
    <p v-if="error" class="error">Error: {{ error }}</p>
  </main>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: grid;
  gap: 1rem;
  place-content: center;
  font-family: system-ui;
}

button {
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
}

.error {
  color: tomato;
}
</style>
