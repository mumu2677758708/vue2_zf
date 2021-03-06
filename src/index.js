// vue要如何实现，原型模式，所有的功能都通过原型扩展的方式来添加
import { initMixin } from './init'
import { renderMixin } from './render'
import { lifecycleMixin } from './lifecycle'
import { initGlobalAPI } from './state'
function Vue(options) {
  this._init(options)
}
// 给原型上新增一个_init方法
initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)
initGlobalAPI
// 导出Vue给别人使用
export default Vue