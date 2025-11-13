import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const color = (code: number) => (value: string) => `\u001B[${code}m${value}\u001B[0m`;
const bold = color(1);
const cyan = color(36);
const gray = color(90);
const green = color(32);
const magenta = color(35);

export interface CliOptions {
  projectName: string;
  template: TemplateName;
  directory: string;
}

export type TemplateName = 'react' | 'vue' | 'node';

export const AVAILABLE_TEMPLATES: Record<TemplateName, string> = {
  react: 'React + Vite',
  vue: 'Vue + Vite',
  node: 'Node (TypeScript)',
};

const DEFAULT_PROJECT_NAME = 'nura-app';
const DEFAULT_TEMPLATE: TemplateName = 'react';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_ROOT = join(__dirname, 'templates');

export const parseArguments = (argv: string[]): CliOptions => {
  let projectName = DEFAULT_PROJECT_NAME;
  let template = DEFAULT_TEMPLATE;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg) continue;
    if (arg === '--template' || arg === '-t') {
      const value = argv[++i] as TemplateName | undefined;
      if (!value || !isTemplate(value)) {
        throw new Error(`Unknown template. Use one of: ${Object.keys(AVAILABLE_TEMPLATES).join(', ')}`);
      }
      template = value;
      continue;
    }

    if (arg.startsWith('--template=')) {
      const value = arg.split('=')[1] as TemplateName | undefined;
      if (!value || !isTemplate(value)) {
        throw new Error(`Unknown template. Use one of: ${Object.keys(AVAILABLE_TEMPLATES).join(', ')}`);
      }
      template = value;
      continue;
    }

    if (arg.startsWith('-')) {
      continue;
    }

    projectName = arg;
  }

  const directory = resolve(process.cwd(), projectName);
  return { projectName, template, directory };
};

export const isTemplate = (value: string): value is TemplateName => value in AVAILABLE_TEMPLATES;

export const ensureEmptyDirectory = (directory: string) => {
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
    return;
  }

  const files = readdirSync(directory);
  if (files.length > 0) {
    throw new Error(`Directory ${directory} is not empty. Choose an empty folder or a new project name.`);
  }
};

export const copyTemplate = (template: TemplateName, destination: string, projectName: string) => {
  const templateDirectory = join(TEMPLATE_ROOT, template);
  cpSync(templateDirectory, destination, { recursive: true });

  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const absolute = join(dir, entry);
      const stats = statSync(absolute);
      if (stats.isDirectory()) {
        walk(absolute);
      } else {
        const content = readFileSync(absolute, 'utf8');
        const replaced = content.replaceAll('__APP_NAME__', projectName);
        writeFileSync(absolute, replaced);
      }
    }
  };

  walk(destination);
};

export const printSuccess = (options: CliOptions) => {
  const relativePath = options.projectName === '.' ? '.' : `./${options.projectName}`;
  console.log(`\n${bold(green('Success!'))} Project created at ${cyan(relativePath)}\n`);
  console.log(`${bold('Next steps:')}`);
  console.log(`  ${magenta('cd')} ${relativePath}`);
  console.log('  pnpm install');
  console.log('  pnpm dev\n');
  console.log(gray('Need help? Open a discussion at https://github.com/nura-ia/nurajs/discussions.'));
};

export const runCli = (argv: string[]) => {
  const options = parseArguments(argv);
  ensureEmptyDirectory(options.directory);
  copyTemplate(options.template, options.directory, options.projectName);
  console.log(`${bold('Nura project bootstrapper')}`);
  console.log(`> Creating ${cyan(options.projectName)} using template ${magenta(options.template)} (${AVAILABLE_TEMPLATES[options.template]})`);
  printSuccess(options);
};

const isExecutedDirectly = () => {
  const entry = process.argv[1];
  if (!entry) return false;
  return fileURLToPath(import.meta.url) === resolve(entry);
};

if (isExecutedDirectly()) {
  try {
    runCli(process.argv.slice(2));
  } catch (error) {
    console.error(bold(magenta('create-nura')) + ': ' + (error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}
