#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
const inquirer = require('inquirer')

inquirer
  .prompt([
    {
      type: 'input', // type： input, number, confirm, list, checkbox ...
      name: 'name', // key 名
      message: 'Your name', // 提示信息
      default: 'my-node-cli', // 默认值
    },
  ])
  .then(answers => {
    // 打印互用输入结果
    console.log(answers)
  })
