/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    '.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 0关闭，1警告，2错误
    // 必须结束分号
    'semi': [2, "always"],
    // 关闭缩进校验
    'indent': 0,
    // 关闭函数名后空格
    'space-before-function-paren': 0,
    // 有未使用已经定义的变量或者常量定义
    'no-unused-vars': 1,
    // 关闭 每个js文件写完后要多写一行的空白行
    'eol-last': 0,
    // 关闭 逗号后需要一个空格
    'comma-spacing': 0,
    'no-tabs': 0,
    'keyword-spacing': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-lonely-if': 0,
    // 关闭 禁止函数名称和调用它的左括号之间的空格。
    'func-call-spacing': 0,
    'standard/object-curly-even-spacing': 0,
    'eqeqeq': 0 // 不需要强制使用全等
  }
};
