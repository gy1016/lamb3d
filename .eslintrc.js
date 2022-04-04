module.exports = {
  // 规则继承
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  // 解析器
  parser: '@typescript-eslint/parser',
  // ts插件
  plugins: ['@typescript-eslint'],
  // 规则定制
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all', //全部声明包括全局
        args: 'all', //一次声明全位置
        ignoreRestSiblings: true, //忽略rest
        argsIgnorePattern: '^_', //通过lint正则
        varsIgnorePattern: '^_', //通过lint正则
      },
    ],
  },
};
