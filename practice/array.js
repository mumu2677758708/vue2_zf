const oldArrayProtoMethods = Array.prototype
export let arrayMethods = Object.create(oldArrayProtoMethods)
let methods = [ // 只有这七个方法可以导致数组发生变化
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
]