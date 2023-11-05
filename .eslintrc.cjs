module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config', '@nuxtjs/eslint-config-typescript'],
  rules: {
    'vue/no-multiple-template-root': 'off',
    'vue/no-template-shadow': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
