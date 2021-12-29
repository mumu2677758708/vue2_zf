import {createTextNode,createElement} from './vdom/create-element'
export function renderMixin(Vue){
    Vue.prototype._c = function () { // 创建元素型的虚拟节点
        return createElement(...arguments);
    }
    Vue.prototype._v = function (text) { // 创建文本型的虚拟节点
        return createTextNode(text);
    }
    Vue.prototype._s = function (val) { // JSON.stringify
        return val == null? '' : (typeof val === 'object'?JSON.stringify(val):val);
    }
    Vue.prototype._render = function () {
        const vm = this; // vm表示实例，不是Vue构造函数
        const {render} = vm.$options;
        let vnode = render.call(vm); // vm中有所有数据  取vm.xx会代理到vm._data.xx
        debugger
        return vnode;
    }
}