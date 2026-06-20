import js from '@eslint/js'
import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintPrettier from 'eslint-plugin-prettier';
import eslintImportX from 'eslint-plugin-import-x';
import eslintUnusedImports from 'eslint-plugin-unused-imports';
import eslintSimpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      prettier: eslintPrettier,
      'import-x': eslintImportX,
      'unused-imports': eslintUnusedImports,
      'simple-import-sort': eslintSimpleImportSort,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-control-regex': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-refresh/only-export-components': 'off',
      // 'react/no-unknown-property': ['error', { ignore: ['f-inert'] }],
      'import-x/no-dynamic-require': 'warn',
      'import-x/no-duplicates': 'error',
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
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // react и внешние пакеты
            ['^react', '^@?\\w'],
            // внутренние алиасы
            ['^(@|components)(/.*|$)'],
            // side effect imports
            ['^\\u0000'],
            // parent imports, .. последний
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // relative imports, . последний
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // стили
            ['^.+\\.css$', '^.+/css(/.*)?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    }
  },
])
