import type { Intent, Dispatcher } from '@nura-js/core';

export interface VoiceIntentPayload extends Record<string, unknown> {
  transcript: string;
  confidence?: number;
}

export interface VoiceIntent extends Intent<'voice.capture', VoiceIntentPayload> {}

export interface VoicePluginOptions<TIntent extends Intent = VoiceIntent> {
  dispatcher: Dispatcher<TIntent>;
}

export interface VoicePlugin<TIntent extends Intent = VoiceIntent> {
  attach(): void;
  detach(): void;
  simulateTranscript(transcript: string, confidence?: number): Promise<unknown>;
}

export const createVoicePlugin = <TIntent extends VoiceIntent>({ dispatcher }: VoicePluginOptions<TIntent>): VoicePlugin<TIntent> => {
  let attached = false;

  return {
    attach() {
      attached = true;
    },
    detach() {
      attached = false;
    },
    async simulateTranscript(transcript, confidence) {
      if (!attached) {
        throw new Error('Voice plugin must be attached before dispatching intents');
      }

      return dispatcher.dispatch({
        name: 'voice.capture',
        payload: { transcript, confidence },
      } as TIntent);
    },
  } satisfies VoicePlugin<TIntent>;
};
