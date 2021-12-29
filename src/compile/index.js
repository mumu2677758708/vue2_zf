import { generate } from "./generate"
import { parseHTML } from "./parse"

// 将template编译成render函数
export function compileToFunctions(template) {
  // 将模板变成ast语法树
  let ast = parseHTML(template)
  // 代码优化 标记静态节点
  // 代码生成
  let code = generate(ast)
  /**
   * with 语句用于设置代码在特定对象中的作用域
   * 用法举例：
   var str = "hello"
   with(str) {
     console.log(toUpperCase) // 输出‘HELLO'
   }
   这样我们在调用render函数时，renderFn.call(vm._data),就会取_data对象中的值
   */
  let render = `with(this){return ${code}}` // 模板引擎的实现原理，都是new Function() + with  比如：ejs、jade、handlerbar
  // 包装成函数的原因是：下次想要数据更新时，可以直接调用函数
  let renderFn = new Function(render)
  return renderFn
}