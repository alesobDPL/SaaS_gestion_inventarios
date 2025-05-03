import next from '@next/eslint-plugin-next'
import typescriptEslint from '@typescript-eslint/eslint-plugin'

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
        '@typescript-eslint': typescriptEslint
      },
    ignores: ['.next/**', 'node_modules/**']
  },
  ...next.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@next/next/no-html-link-for-pages': 'off'
    }
  }
]