import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname
});

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**']
  },
  ...compat.config({
    extends: [
      js.configs.recommended,
      'plugin:@typescript-eslint/recommended',
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates'
    ],
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: __dirname,
      sourceType: 'module'
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component'] }],
      '@angular-eslint/directive-class-suffix': ['error', { suffixes: ['Directive'] }],
      '@angular-eslint/prefer-standalone-component': 'off'
    }
  }),
  ...compat.config({
    files: ['src/**/*.html'],
    extends: ['plugin:@angular-eslint/template/recommended'],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/alt-text': 'error'
    }
  })
];

