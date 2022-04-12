import path from 'path'
import fs from 'fs'
import { cp } from 'shelljs'

export default function createForRollup() {
  let promises = [path.join(__dirname, '../templates/rollup/dep.json'), './package.json'].map(function (_path) {
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
    results.forEach((content, i) => {
      if (content) {
        if (i === 0) {
          Object.assign(resJson, JSON.parse(content as string))
        } else {
          const pkg = JSON.parse(content as string)
          const rootDependencies = pkg?.devDependencies || {}
          const resDevDependencies = { ...resJson.devDependencies, ...rootDependencies }
          Object.assign(pkg, resJson, {
            devDependencies: resDevDependencies,
          })
        }
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
