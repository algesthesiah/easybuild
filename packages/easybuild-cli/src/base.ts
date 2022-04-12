import { cp } from 'shelljs'
import path from 'path'

export default function createForBase() {
  cp('-R', path.join(__dirname, '../templates/base/'), './')
}
