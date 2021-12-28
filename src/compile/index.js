import { generate } from "./generate"
import { parseHTML } from "./parse"

// 将template编译成render函数
export function compileToFunctions(template) {
  // 将模板变成ast语法树
  let ast = parseHTML(template)
  console.log(ast)
  // 代码优化 标记静态节点
  // 代码生成
  let code = generate(ast)
  console.log(code)
  let render = `with(this){return ${code}}`
  let renderFn = new Function(render)
  return renderFn
}