#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// const inquirer = require('inquirer')
import { Command } from 'commander'
import createForBase from './base'
import createForRollup from './rollup'

const program = new Command()

program.name('eb').version('1.0.0').description('An easybuild cli')

program
  .command('create <name>')
  .alias('c')
  .description('run create commands for create files')
  .action(name => {
    if (name === 'react') {
      console.log('暂未支持，敬请期待')
    }
    if (name === 'base') {
      createForBase()
      return
    }
    if (name === 'rollup') {
      createForRollup('build')
      return
    }
    if (name === 'rollup-dep') {
      createForRollup('dep')
      return
    }
    console.log(`
Examples:
  $ eb c base
  $ eb c rollup
  $ eb c rollup-dep
  $ eb c react`)
  })
  .addHelpText(
    'after',
    `
Examples:
  $ eb c base
  $ eb c rollup
  $ eb c rollup-dep
  $ eb c react`
  )
program.parse(process.argv)
// inquirer
//   .prompt([
//     {
//       type: 'input', // type： input, number, confirm, list, checkbox ...
//       name: 'name', // key 名
//       message: 'Your name', // 提示信息
//       default: 'my-node-cli', // 默认值
//     },
//   ])
//   .then(answers => {
//     // 打印互用输入结果
//     console.log(answers)
//   })
