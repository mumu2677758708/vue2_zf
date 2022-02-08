let callbacks = []
function flushCallbacks() {
  callbacks.forEach(cb => cb())
}
// 主要通过一些兼容的判断来创建合适的timerFunc，最优先肯定是微任务，其次再到宏任务
// 优先级为promise.then> MutationObserver> setImmediate> setTimeout
let timerFunc
if(Promise) { // then方法是异步的
  timerFunc = () => {
    Promise.resolve().then(flushCallbacks)
  }
} else if (MutationObserver) { // MutationObserver也是一个异步方法
  let observe = new MutationObserver(flushCallbacks) // h5的api
  let textNode = document.createTextNode(1)
  observe.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    textNode.textContent = 2
  }
}else if(setImmediate) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
}else{
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  }
}
export function nextTick(cb) {
  callbacks.push(cb)
  timerFunc()
}