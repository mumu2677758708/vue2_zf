import { initState } from './state'
import { compileToFunctions } from './compile'
export function initMixin(Vue){
  // 后续组件化开发的时候，Vue.extend可以创造一个子组件，子组件可以继承Vue,子组件也可以调用_init方法
  Vue.prototype._init = function (options) {
    const vm = this
    // 把用户的选项放到vm上，这样在其他方法中都可以获取到options
    vm.$options = options // 为了后续扩展的方法都可以获取到$options选项
    console.log(options)
    // 初始化状态
    initState(vm)
    if(vm.$options.el) {
      // 要将数据挂在到页面上
      console.log('页面要挂载')
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function (el) {
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)
    // 如果没有render方法
    if(!options.render) {
      let template = options.template
      // 如果没有模板但是有el
      if(!template && el) {
        template = el.outerHTML
      }
      const render = compileToFunctions(template) // 将template编译成render函数
      options.render = render
    }
  }
}
