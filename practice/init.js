import { initState } from './state.js'
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this
    vm.$options = options
    initState(vm)

    if(vm.$options.el) {
      // 页面挂载
    }
  }
}