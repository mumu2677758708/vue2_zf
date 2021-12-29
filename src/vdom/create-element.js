// 创建文本虚拟节点
export function createTextNode(text) {
    return vnode(undefined,undefined,undefined,undefined,text)
}
// 创建元素
export function createElement(tag,data={},...children){
    let key = data.key;
    if(key){
        delete data.key;
    }
    return vnode(tag,data,key,children);
}
function vnode(tag,data,key,children,text){
    return {
        tag,
        data,
        key,
        children,
        text
    }
}
/**
 * vnode其实就是一个对象，用来描述节点的
 * 和ast的区别：
 * ast是描述语法的，他并没有用户自己的逻辑，只有语法解析出来的内容；
 * vnode他是描述dom结构的，可以自己去扩展属性
 */