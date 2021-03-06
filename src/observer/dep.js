let id = 0
class Dep{
  constructor() { // 要将watcher放到dep中
    this.id = id++
    this.subs = []
  }
  depend() {
    if(Dep.target) {
      Dep.target.addDep(this) // 让watcher去存放dep
    }
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
}
let stack = []
Dep.target = null
export function pushTarget(watcher) {
  Dep.target = watcher
  stack.push(watcher)
}
export function popTarget() {
  stack.pop()
  Dep.target = stack[stack.length - 1]
}
export default Dep