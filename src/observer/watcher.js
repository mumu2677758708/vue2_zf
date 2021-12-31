import { popTarget, pushTarget } from "./dep";

let id = 0;
class Watcher {
    constructor(vm, exprOrFn, cb, options) { // 要将dep放到watcher中
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        if (typeof exprOrFn == 'function') {
            this.getter = exprOrFn; // exprOrFn就是页面渲染的逻辑
        }
        this.cb = cb;
        this.options = options;
        this.id = id++;
        this.get();
    }
    get() { // 表示一开始就做一次初始化
        pushTarget(this)
        this.getter(); // 页面渲染的逻辑
        popTarget()
    }
}

export default Watcher;