import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  node: true,
  rules: {
    'no-console': 'warn',
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
    'next/typescript',
  ],
  globals: {
    process: true,
  },
  ignores: [
    'dist',
    'node_modules',
    'app/gen',
  ],
})
