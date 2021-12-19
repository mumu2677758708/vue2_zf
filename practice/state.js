import { observe } from './observe.js'
export function initState(vm) {
  const options = vm.$options
  if(options.data) {
    // 初始化数据
    initData(vm)
  }
}
function initData(vm) {
  let data = vm.$options.data
  // 保证data是一个对象
  data = typeof data === 'function' ? data.call(vm) : data
  observe(data)
}