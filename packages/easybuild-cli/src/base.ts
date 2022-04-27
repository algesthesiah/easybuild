import { cp } from 'shelljs'
import path from 'path'

export default function createForBase() {
  cp('-Rf', path.join(__dirname, '../templates/base/*'), path.join(process.cwd(), './'))
  cp('-Rf', path.join(__dirname, '../templates/base/.husky/*'), path.join(process.cwd(), './.husky'))
  cp('-Rf', path.join(__dirname, '../templates/base/.editorconfig'), path.join(process.cwd(), './.editorconfig'))
  cp('-Rf', path.join(__dirname, '../templates/base/.eslintignore'), path.join(process.cwd(), './.eslintignore'))
}
