import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    // Permite componentes de una sola palabra
    'vue/multi-word-component-names': 'off',

    // Ignorar variables que empiezan con _
    '@typescript-eslint/no-unused-vars': ['warn', { "varsIgnorePattern": "^_" }],

    // Solo warning al usar console.log
    'no-console': 'warn',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/no-unused-vars': 'off' // en Vue, algunas props o variables reactivas pueden no usarse
      }
    }
  ]
})
