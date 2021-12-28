import {patch} from './observer/patch'
import Watcher from './watcher'
// 将虚拟节点渲染成真实节点
export function lifecycleMixin(Vue){
    Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el,vnode);
    }
}
export function mountComponent(vm,el) {
    vm.$el = el;
    let updateComponent = () => {
        // 将虚拟节点 渲染到页面上
        vm._update(vm._render());
    }
    new Watcher(vm, updateComponent, () => {}, true);
}
// 先调用_render方法生成虚拟dom,通过_update方法将虚拟dom创建成真实的dom