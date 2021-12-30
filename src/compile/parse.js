const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 标签开头的正则 捕获的内容是标签名
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束 >
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ // 匹配属性的
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 匹配标签结尾的 </div>

// 语法树就是用对象描述js语法
let root;
let currentParent;
let stack = [];
const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3;
/**
 * nodeType:
 * 1:元素节点
 * 2:属性节点
 * 3:文本节点
 * 8:注释节点
 */

function createASTElement(tagName, attrs) {
  return {
    tag: tagName,
    type: ELEMENT_TYPE,
    children: [],
    attrs,
    parent: null
  }
}

function start(tagName, attrs) {
  // 遇到开始标签，就取栈中的最后一个作为父节点
  let element = createASTElement(tagName, attrs)
  if (!root) {
    root = element
  }
  currentParent = element
  stack.push(element)
}

function end(tagName) {
  let element = stack.pop()
  currentParent = stack[stack.length - 1]
  if (currentParent) {
    element.parent = currentParent
    currentParent.children.push(element)
  }
}

function chars(text) {
  text = text.replace(/\s/g, '')
  if (text) {
    currentParent.children.push({
      type: TEXT_TYPE,
      text
    })
  }
}

export function parseHTML(html) {
  // 可以不停的截取模板，直到把模板全部解析完毕
  while (html) {
    // 解析标签和文本
    let textEnd = html.indexOf('<')
    if (textEnd == 0) {
      // 解析开始标签，并且把属性也解析出来
      const startTagMatch = parseStartTag() // 返回的值为{tagName: 'div',attrs:[{name: 'id',value: 'app'}]}
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }
      const endTagMatch = html.match(endTag)
      // 结束标签
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        end(endTagMatch[1])
        continue
      }
    }
    let text
    if (textEnd >= 0) {
      text = html.substring(0, textEnd) // 截取文本
    }
    if (text) {
      advance(text.length) // 截取html
      chars(text)
    }
  }
  return root

  function advance(n) {
    html = html.substring(n)
  }

  function parseStartTag() {
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length);
      let attr, end;
      // 要有属性，并且不能为开始的结束标签
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length)
        match.attrs.push({
          name: attr[1],
          value: attr[3]
        })
      }
      if (end) { // end为‘>’
        advance(end[0].length) // 此时html为‘{{message}}</div>’
        return match
      }
    }
  }
}