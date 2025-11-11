import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      '@nura-js/intents': resolve(__dirname, '../intents/src/index.ts'),
    },
  },
});
