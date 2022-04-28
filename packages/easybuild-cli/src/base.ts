import { cp } from 'shelljs'
import path from 'path'
import { merge } from 'lodash'
import fs from 'fs'

export function createForDep() {
  let promises = [
    path.join(__dirname, '../templates/base/package.json'),
    path.join(process.cwd(), './package.json'),
  ].map(function (_path) {
    return new Promise(
      function (_path, resolve, reject) {
        fs.readFile(_path, 'utf8', function (err, data) {
          if (err) {
            resolve('') // following the same code flow
          } else {
            resolve(data)
          }
        })
      }.bind(this, _path)
    )
  })
  Promise.all(promises).then(function (results) {
    let resJson = {} as any
    results.forEach(content => {
      if (content) {
        resJson = merge(resJson, JSON.parse(content as string))
      }
    })
    const str = JSON.stringify(resJson, null, 2)
    fs.writeFile('./package.json', str, _err => {
      if (_err) {
        console.log(_err)
      }
    })
  })
}
export default function createForBase() {
  cp('-Rf', path.join(__dirname, '../templates/base/.husky'), path.join(process.cwd(), './'))
  cp('-Rf', path.join(__dirname, '../templates/base/.vscode'), path.join(process.cwd(), './'))
  ;[
    '.editorconfig',
    '.eslintignore',
    '.eslintrc.js',
    '.prettierrc.js',
    '.stylelintrc.js',
    'tsconfig.json',
    'commitlint.config.js',
  ].forEach(name => {
    cp('-Rf', path.join(__dirname, `../templates/base/${name}`), path.join(process.cwd(), `./${name}`))
  })
  createForDep()
}
