import { useCallback, useState } from 'react';
import type { Intent } from '@nura-js/core';
import type { Client } from '../index.js';

export interface UseIntentResult<TResult> {
  run: () => Promise<TResult>;
  isPending: boolean;
  result?: TResult;
  error?: unknown;
}

export const useIntent = <TIntent extends Intent, TResult = unknown>(
  client: Client<TIntent, TResult>,
  intent: TIntent,
): UseIntentResult<TResult> => {
  const [state, setState] = useState<UseIntentResult<TResult>>({
    run: async () => {
      throw new Error('Intent run function not initialised');
    },
    isPending: false,
  });

  const run = useCallback(async () => {
    setState((previous) => ({ ...previous, isPending: true, error: undefined }));
    try {
      const result = await client.dispatch(intent);
      setState({ run, isPending: false, result });
      return result;
    } catch (error) {
      setState({ run, isPending: false, error });
      throw error;
    }
  }, [client, intent]);

  return { ...state, run, isPending: state.isPending };
};
