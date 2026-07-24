import js from '@eslint/js'
import globals from 'globals'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintPrettier from 'eslint-plugin-prettier';
import eslintImportX from 'eslint-plugin-import-x';
import eslintUnusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      prettier: eslintPrettier,
      'import-x': eslintImportX,
      'unused-imports': eslintUnusedImports,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-refresh/only-export-components': 'off',
      // 'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-control-regex': 'off',
      // 'prefer-const': 'error',
      'import-x/no-dynamic-require': 'warn',
      'import-x/no-duplicates': 'error',
      'import-x/order': [
        'error',
        {
          groups: ['external', 'internal', 'type', 'builtin', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          sortTypesGroup: true,
          'newlines-between': 'always',
          'newlines-between-types': 'always',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'prettier/prettier': [
        'error',
        {
          // experimentalTernaries: false, // default - false
          // experimentalOperatorPosition: 'end', // default - 'end' / "<start|end>"
          printWidth: 120, // default - 80
          tabWidth: 3, // default - 2
          // useTabs: false, // default - false
          // semi: true, // default - true
          singleQuote: true, // default - false
          // quoteProps: 'preserve', // default - 'as-needed' / "<as-needed|consistent|preserve>"
          jsxSingleQuote: true, // default - false
          // trailingComma: 'all', // default - all / "<all|es5|none>"
          // bracketSpacing: true, // default - true
          // objectWrap: 'collapse' // default - 'preserve' / "<preserve|collapse>"
          // bracketSameLine: false // default - false
          arrowParens: 'avoid', // default - 'always' / "<always|avoid>"
          // rangeStart: 0, // default - 0
          // rangeEnd: Infinity, // default - Infinity
          // parser: 'none' // default - 'string'
          // filepath: 'none' // default - 'string'
          // requirePragma: false // default - false
          // insertPragma: false // default - false
          // checkIgnorePragma: false // default - false
          proseWrap: 'always', // default - 'preserve' / "<always|never|preserve>"
          // htmlWhitespaceSensitivity: 'css', // default - 'css' / "<css|strict|ignore>"
          // vueIndentScriptAndStyle: false, // default - false
          endOfLine: 'auto', // default - 'lf' / "<lf|crlf|cr|auto>"
          // embeddedLanguageFormatting: 'auto', // default - 'auto' / "<off|auto>"
          // singleAttributePerLine: 'auto', // default - false
        },
      ],
    }
  },
])
