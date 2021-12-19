// vue要如何实现，原型模式，所有的功能都通过原型扩展的方式来添加
import { initMixin } from './init'
function Vue(options) {
  this._init(options)
}
// 给原型上新增一个_init方法
initMixin(Vue)
// 导出Vue给别人使用
export default Vue