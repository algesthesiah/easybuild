import { cp } from 'shelljs'

export default function createForBase() {
  cp('-R', 'templates/base', './')
}
