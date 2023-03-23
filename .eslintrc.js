// 一些参考链接
// https://eslint.org/
// https://eslint.vuejs.org/
// https://prettier.io/

module.exports = {
  extends: [
    'plugin:vue/vue3-recommended', // 推荐使用的eslint-plugin-vue规则
    'prettier', // 使用 Prettier 格式化代码
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // 开启 Prettier 格式化代码的错误提示
  },
};
