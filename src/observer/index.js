import { arrayMethods } from './array'
// 递归属性劫持 数组方法的劫持
class Observer { // 观测值
  constructor(value) {
    // 为了不让__ob__被遍历，用Object.defineProperty来定义
    Object.defineProperty(value, '__ob__', {
      enumerable: false, // 不可枚举
      configurable: false,
      value: this
    })
    // 数组也可以使用defineProperty，但我们很少使用
    if(Array.isArray(value)) {
      value.__proto__ = arrayMethods // 重写数组原型方法
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  observeArray(arr) { // 递归遍历数组
    for(let i = 0; i < arr.length; i++) {
      observe(arr[i])
    }
  }
  walk(data) { // 让对象上的所有属性依次进行观测
    let keys = Object.keys(data)
    for(let i = 0; i < keys.length; i++) {
      let key = keys[i]
      let value = data[key]
      defineReactive(data,key,value)
    }
  }
}
/**
 * vue2应用了defineProperty需要一加载时就进行递归的操作，所以耗性能，如果层次过深也会浪费性能
 * 性能优化的原则：
 * 1）不要把所有的数据都放在data中，因为所有的数据都会增加get和set
 * 2）不要写数据的时候，层次过深，数据尽量扁平化
 * 3）不要频繁获取数据
 * 4）如果数据不需要响应式，可以使用Object.freeze()冻结属性
 */
function defineReactive(data,key,value) { // vue2 慢的原因，主要在这个方法中
  observe(value) // 递归进行观测数据
  Object.defineProperty(data, key,{
    get() {
      return value // 闭包，此value会向上层的value进行查找
    },
    set(newVal) {
      if(newVal == value) return
      observe(newVal) // vm.message = 'hello' ===>  vm.message = {name: 'hi'} ===> vm.message = {name: 'bye'}
      value = newVal
    }
  })
}
export function observe(data) {
  if(typeof data !== 'object' || data == null ) return
  // 如果有__ob__这个属性，表示已经被标识过了
  if(data.__ob__) return;
  return new Observer(data)
}