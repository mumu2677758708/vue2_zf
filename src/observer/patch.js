// 将虚拟节点渲染成真实节点
export function patch(oldVnode,vnode){
    // 删除老节点，根据vnode创建新节点，替换掉老节点
    const isRealElement = oldVnode.nodeType;
    if(isRealElement){
        const oldElm = oldVnode;
        const parentElm = oldElm.parentNode;
        let el = createElm(vnode);
        parentElm.insertBefore(el,oldElm.nextSibling);
        parentElm.removeChild(oldVnode)
   		return el;
    }
}
/**
 * 面试有问 虚拟节点的实现；如何将虚拟节点渲染成真实节点
 */
function createElm(vnode){
    let {tag,children,key,data,text} = vnode;
    if(typeof tag === 'string'){
        // 我们让虚拟节点和真实节点做一个映射关系，后续某个虚拟节点更新了，我可以跟踪到真实节点，并且更新真实节点
        vnode.el = document.createElement(tag);
        updateProperties(vnode);
        children.forEach(child => {
            return vnode.el.appendChild(createElm(child));
        });
    }else{
        vnode.el = document.createTextNode(text);
    }
    return vnode.el
}
function updateProperties(vnode){
    let newProps = vnode.data || {}; // 获取当前老节点中的属性
    let el = vnode.el; // 当前的真实节点
    for(let key in newProps){
        if(key === 'style'){ 
            for(let styleName in newProps.style){
                el.style[styleName] = newProps.style[styleName]
            }
        }else if(key === 'class'){
            el.className= newProps.class
        }else{ // 给这个元素添加属性 值就是对应的值
            el.setAttribute(key,newProps[key]);
        }
    }
}