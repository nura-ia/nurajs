import { ref } from 'vue';
import type { Intent } from '@nura-js/core';
import type { Client } from '../index.js';

export interface UseIntentState<TResult> {
  run: () => Promise<TResult>;
  isPending: Readonly<{ value: boolean }>;
  result: Readonly<{ value: TResult | undefined }>;
  error: Readonly<{ value: unknown }>;
}

export const useIntent = <TIntent extends Intent, TResult = unknown>(
  client: Client<TIntent, TResult>,
  intent: TIntent,
): UseIntentState<TResult> => {
  const isPending = ref(false);
  const result = ref<TResult>();
  const error = ref<unknown>();

  const run = async () => {
    isPending.value = true;
    error.value = undefined;
    try {
      const value = await client.dispatch(intent);
      result.value = value;
      return value;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      isPending.value = false;
    }
  };

  return { run, isPending, result, error };
};
