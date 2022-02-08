const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // {{ xxx }}

function gen(node) {
  if (node.type == 1) {
    return generate(node) // 如果是元素，就递归的生成
  } else {
    let text = node.text
    if (!defaultTagRE.test(text)) { // 普通文本
      return `_v(${JSON.stringify(text)})`
    }
    // 有表达式的情况，需要做一个表达式和普通值的拼接 _v('aaa' + _s(message) + 'bbb')
    let lastIndex = defaultTagRE.lastIndex = 0
    let tokens = []
    let match, index;
    while (match = defaultTagRE.exec(text)) { // 如果正则加上g，再配合exec，就会出现一个lastIndex的问题，所以需要给defaultTagRE.lastIndex设置为0
      index = match.index
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${tokens.join('+')})`
  }
}

function getChildren(el) { // 生成儿子节点
  const children = el.children
  if (children) {
    return `${children.map(c => gen(c)).join(',')}`
  } else {
    return false
  }
}

function genProps(attrs) { // 生成属性
  let str = ''
  /**
   * 将attrs = [{name: 'id',value: 'app'}, {name: 'style', value: 'color:#333;font-size: 12px'}]
   * 转换为‘id:"app",style:{"color":"blue","font-size":"12px"}’
   */
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]
    if (attr.name === 'style') {
      let obj = {}
      // attr.value.split(';').forEach(item => {
      //   let [key,value] = item.split(':')
      //   obj[key] = value
      // })
      attr.value.replace(/([^:;]+):([^;:]+)/g, function () {
        obj[arguments[1]] = arguments[2]
      })
      attr.value = obj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0,-1)}}`
}

export function generate(ast) {
  let children = getChildren(ast)
  let code = `_c('${ast.tag}',${
    ast.attrs.length ? genProps(ast.attrs) : 'undefined'
  }${
    children ? `,${children}` : ''
  })`
  return code
}