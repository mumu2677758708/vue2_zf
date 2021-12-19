let oldArrayProtoMethods = Array.prototype // 获取数组原有的原型方法
export let arrayMethods = Object.create(oldArrayProtoMethods) // 让arrayMethods通过__proto__能获取到数组的方法
let methods = [ // 只有这七个方法可以导致数组发生变化
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
]
methods.forEach(method => {
  arrayMethods[method] = function(...args) { // 数组的方法进行重写操作
    const result = oldArrayProtoMethods[method].apply(this, args) // 调用原来的方法
    const ob = this.__ob__
    let inserted;
    switch(method){
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2) // splice从第三个参数起，是增加的新数据
      default:
        break;
    }
    if(inserted) ob.observeArray(inserted) // 对新增的每一项进行观测
    return result
  }
})