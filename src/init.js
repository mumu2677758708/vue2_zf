import { initState } from './state'
import { compileToFunctions } from './compile/index.js'
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
      // 现在数据已经被劫持了，数据变化需要更新视图，diff算法更新需要更新的部分
      // vue ==> template(写起来更符合直觉) ===> jsx（更灵活）
      // vue3 template写起来性能会更高一些，内部做了很多优化
      // template ===> ast语法树（用来描述语法的，描述语法本身的） ===> 描述成一个树结构 ===> 将代码重组成js语法
      // 模板编译原理（把template模板编译成render函数 ===> 虚拟dom ===> diff算法比对虚拟dom）
      // ast ==> render函数 ==> vnode ===> 生成真是dom
      //        更新的时候再次调用render ===> 新的vnode  ===> 新旧比对  ===> 更新真实dom
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
