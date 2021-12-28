import { observe } from './observer/index.js'
import {mergeOptions} from './util/index.js'
export function initGlobalAPI(Vue){
    Vue.options = {};

    Vue.mixin = function (mixin) {
        // 将属性合并到Vue.options上
        this.options = mergeOptions(this.options,mixin);
        return this;
    }
}
export function initState(vm) {
  const options = vm.$options
  if(options.props) {
    initProps(vm)
  }
  if (options.data) {
    // 初始化data
    initData(vm)
  }
  if (options.computed) {
    initComputed(vm)
  }
  if (options.methods) {
    initMethods(vm)
  }
  if (options.watch) {
    initWatch(vm)
  }
}
function initProps(vm) {}
function initData(vm) {
  // 数据的初始化操作
  let data = vm.$options.data
  // 如果用户传递的是一个函数，则取函数的返回值作为对象，如果就是对象那就直接使用这个对象
  // 只有根实例的data是一个对象，其他都为函数
  data = vm._data = typeof data === 'function' ? data.call(vm) : data // _data已经是响应式了
  for(let key in data) { // 将_data上的属性代理到vm实例
    proxy(vm, '_data', key)
  }
  // 需要将data变成响应式的  Object.defineProperty重写data中的所有属性
  observe(data)
}
function initComputed(vm) {}
function initMethods(vm) {}
function initWatch(vm) {}
// 数据代理  vm.message ===> vm._data.message
function proxy(vm, source, key) { // 在取值时做代理
  Object.defineProperty(vm,key,{
    get() {
      return vm[source][key]
    },
    set(newVal) {
      vm[source][key] = newVal
    }
  })
}