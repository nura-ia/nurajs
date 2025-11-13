import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { join } from 'node:path';
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { runCli } from '../src/index.js';

const createTmp = () => mkdtempSync(join(tmpdir(), 'nura-test-'));

describe('create-nura CLI', () => {
  const cwd = process.cwd();
  let directory = '';

  beforeEach(() => {
    directory = createTmp();
    process.chdir(directory);
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    process.chdir(cwd);
    if (existsSync(directory)) {
      rmSync(directory, { recursive: true, force: true });
    }
    vi.restoreAllMocks();
  });

  it('generates a project for the React template', () => {
    runCli(['my-app', '--template', 'react']);
    const pkg = JSON.parse(readFileSync(join(directory, 'my-app', 'package.json'), 'utf8'));
    expect(pkg.name).toBe('my-app');
  });
});
