import { arrayMethods } from './array.js'
class Observe{
  constructor(value) {
    if(Array.isArray(value)) {
      value.__proto__ = arrayMethods
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  observeArray(arr) {
    for(let i = 0; i < arr.length; i++) {
      observe(arr[i])
    }
  }
  walk(data) {
    const keys = Object.keys(data)
    for(let i = 0; i < keys.length; i++) {
      let key = keys[i]
      let value = data[key]
      defineReactive(data, key, value)
    }
  }
}
function defineReactive(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newVal) {
      if(newVal == value) return
      value = newVal
      observe(value)
    }
  })
}
export function observe(data) {
  if(typeof data !== 'object' || data == null) return
  return new Observe(data)
}