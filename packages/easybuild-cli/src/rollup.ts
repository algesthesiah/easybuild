import path from 'path'
import fs from 'fs'
import { cp } from 'shelljs'
import { merge } from 'lodash'

export default function createForRollup(type?: 'dep' | 'build') {
  let jobDep = ''
  if (type === 'dep') {
    jobDep = '../templates/rollup/dep.json'
  } else if (type === 'build') {
    jobDep = '../templates/rollup/build.json'
  }
  let promises = [path.join(__dirname, jobDep), path.join(process.cwd(), './package.json')].map(function (_path) {
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
    let resJson = { devDependencies: {} }
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
    cp('-R', path.join(__dirname, '../templates/rollup/rollup.config.js'), './')
  })
}
