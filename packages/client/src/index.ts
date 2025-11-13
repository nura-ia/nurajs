import type { Dispatcher, Intent } from '@nura-js/core';

export interface ClientTransport<TIntent extends Intent = Intent, TResult = unknown> {
  send(intent: TIntent): Promise<TResult> | TResult;
}

export interface CreateClientOptions<TIntent extends Intent = Intent, TResult = unknown> {
  dispatcher: Dispatcher<TIntent, TResult>;
  transport?: ClientTransport<TIntent, TResult>;
}

export interface Client<TIntent extends Intent = Intent, TResult = unknown> {
  dispatch(intent: TIntent): Promise<TResult>;
  connect(transport: ClientTransport<TIntent, TResult>): void;
}

export const createClient = <TIntent extends Intent, TResult = unknown>({
  dispatcher,
  transport,
}: CreateClientOptions<TIntent, TResult>): Client<TIntent, TResult> => {
  let currentTransport: ClientTransport<TIntent, TResult> | undefined = transport;

  const ensureTransport = () => {
    if (currentTransport) return currentTransport;
    return {
      send(intent: TIntent) {
        return dispatcher.dispatch(intent);
      },
    } satisfies ClientTransport<TIntent, TResult>;
  };

  return {
    dispatch(intent) {
      return Promise.resolve(ensureTransport().send(intent));
    },
    connect(nextTransport) {
      currentTransport = nextTransport;
    },
  } satisfies Client<TIntent, TResult>;
};

export * from './react/index.js';
export * from './vue/index.js';
