import {patch} from './observer/patch'
import Watcher from './observer/watcher'
// 将虚拟节点渲染成真实节点
export function lifecycleMixin(Vue){
    Vue.prototype._update = function (vnode) {
        const vm = this;
        // 采用的是，先深度遍历，创建节点（遇到节点就创造节点，递归创建）
        vm.$el = patch(vm.$el,vnode);
    }
}
export function mountComponent(vm,el) {
    vm.$el = el; // 页面真实元素
    let updateComponent = () => {
        // 将虚拟节点 渲染到页面上
        vm._update(vm._render()); // 对render进行封装的原因是：render里面还会调用_c、_v、_s方法
    }
    // 每个组件都有一个wather，我们把这个watcher称之为渲染watcher
    new Watcher(vm, updateComponent, () => {}, true);
}
// 先调用_render方法生成虚拟dom,通过_update方法将虚拟dom创建成真实的dom

export function callHook(vm, hook) {
    const handlers = vm.$options[hook];
    if (handlers) {
        for (let i = 0; i < handlers.length; i++) {
            handlers[i].call(vm);
        }
    }
}