import antfu from '@antfu/eslint-config';

export default antfu({
  // enable UnoCSS support
  // https://unocss.dev/integrations/vscode
  unocss: true,

  stylistic: {
    indent: 2, // 缩进风格
    quotes: 'single', // 单引号
    'eol-last': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    semi: 2,
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
  },

}, {
  // Without `files`, they are general rules for all files
  rules: {
    'no-console': 'off',
    'curly': ['error', 'all'],
  },
});
