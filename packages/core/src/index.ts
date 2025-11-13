export type IntentName = string;

export type IntentPayload = Record<string, unknown>;

export interface Intent<TName extends IntentName = IntentName, TPayload extends IntentPayload = IntentPayload> {
  /**
   * Unique name describing the user's goal.
   */
  name: TName;
  /**
   * Structured payload with context required for the action.
   */
  payload: TPayload;
  /**
   * Optional metadata that can be used by transports for tracing.
   */
  meta?: Record<string, unknown>;
}

export interface Action<TIntent extends Intent = Intent, TResult = unknown> {
  /**
   * Human readable description of what the action does.
   */
  description?: string;
  /**
   * Execute the action and return a result.
   */
  perform(intent: TIntent): Promise<TResult> | TResult;
}

export type DispatchResult<TResult = unknown> = Promise<TResult> | TResult;

export interface DispatcherContext {
  source?: string;
  correlationId?: string;
}

export interface Dispatcher<TIntent extends Intent = Intent, TResult = unknown> {
  readonly intents: Map<TIntent['name'], Action<TIntent, TResult>>;
  readonly validateIntent: (intent: Intent) => asserts intent is TIntent;
  dispatch(intent: TIntent, context?: DispatcherContext): DispatchResult<TResult>;
  register(intentName: TIntent['name'], action: Action<TIntent, TResult>): void;
}

export interface ValidationIssue {
  path: string;
  message: string;
}

export interface IntentSchema {
  required?: string[];
  optional?: string[];
}

export type IntentRegistry<TIntent extends Intent = Intent> = Record<TIntent['name'], IntentSchema | undefined>;

export interface CreateDispatcherOptions<TIntent extends Intent = Intent> {
  registry?: IntentRegistry<TIntent>;
  onDispatch?: (intent: TIntent, context?: DispatcherContext) => void;
  onError?: (intent: TIntent, error: unknown, context?: DispatcherContext) => void;
}

export class IntentValidationError extends Error {
  constructor(public readonly issues: ValidationIssue[]) {
    super(issues.map((issue) => `${issue.path}: ${issue.message}`).join('\n'));
    this.name = 'IntentValidationError';
  }
}

export const createIntent = <TName extends IntentName, TPayload extends IntentPayload>(
  name: TName,
  payload: TPayload,
  meta?: Intent<TName, TPayload>['meta'],
): Intent<TName, TPayload> => ({ name, payload, meta });

export const createDispatcher = <TIntent extends Intent = Intent, TResult = unknown>(
  options: CreateDispatcherOptions<TIntent> = {},
): Dispatcher<TIntent, TResult> => {
  const intents = new Map<TIntent['name'], Action<TIntent, TResult>>();
  const { registry = {}, onDispatch, onError } = options;

  const validateIntent = (intent: Intent): asserts intent is TIntent => {
    const schema = registry[intent.name as TIntent['name']];
    if (!schema) return;

    const issues: ValidationIssue[] = [];
    const required = schema.required ?? [];
    const optional = schema.optional ?? [];
    const allowed = new Set([...required, ...optional]);

    for (const key of required) {
      if (!(key in intent.payload)) {
        issues.push({ path: key, message: 'is required' });
      }
    }

    for (const key of Object.keys(intent.payload ?? {})) {
      if (!allowed.has(key)) {
        issues.push({ path: key, message: 'is not allowed' });
      }
    }

    if (issues.length > 0) {
      throw new IntentValidationError(issues);
    }
  };

  return {
    intents,
    validateIntent,
    register(intentName, action) {
      intents.set(intentName, action);
    },
    async dispatch(intent, context) {
      try {
        validateIntent(intent);
        const action = intents.get(intent.name as TIntent['name']);
        if (!action) {
          throw new Error(`No action registered for intent: ${intent.name}`);
        }
        onDispatch?.(intent, context);
        const result = await action.perform(intent);
        return result;
      } catch (error) {
        onError?.(intent, error, context);
        throw error;
      }
    },
    validateIntent,
  } satisfies Dispatcher<TIntent, TResult>;
};

export const defineIntentRegistry = <TIntent extends Intent = Intent>(registry: IntentRegistry<TIntent>): IntentRegistry<TIntent> =>
  registry;

export const isIntent = (value: unknown): value is Intent => {
  if (typeof value !== 'object' || value === null) return false;
  const intent = value as Intent;
  return typeof intent.name === 'string' && typeof intent.payload === 'object';
};

export type { CreateDispatcherOptions as DispatcherOptions };
