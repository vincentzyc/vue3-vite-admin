// @see: https://prettier.io/docs/en/options.html

module.exports = {
  printWidth: 120, // 超过最大值换行
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 使用制表符而不是空格缩进行
  semi: true, // 结尾不用分号(true有，false没有)
  arrowParens: "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 ,always：不省略括号
  endOfLine: "auto", // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
};