## 1、初始化 npm init -y
## 2、npm install @babel/preset-env @babel/core rollup rollup-plugin-babel rollup-plugin-serve cross-env -D
  - @babel/core 将高级语法转为低级语法，核心模块，但不具备转译功能，还需要安装@babel/preset-env插件
  - @babel/preset-env 具有编译功能
  - rollup-plugin-babel rollup和babel连接的桥梁，这样才能保证在rollup中使用babel
  - rollup-plugin-serve 开发服务插件
  - cross-env 能够提供一个设置环境变量的scripts，并且兼容windows

## 3、创建项目目录
  - src/index.js 打包入口文件
  - rollup.config.js 打包配置文件

## 4、脚本命令
  - rollup会找node_modules下bin里的rollup
  - -c 表示打包的时候找配置文件rollup.config.js
  - -w 文件目录发生变化时，可以重新进行打包

## 双向绑定和响应式数据的区别
   - 双向绑定页面得需要能修改（表单：radio，input等等），数据变化能影响视图，视图变化影响数据
   - 响应式数据变化，能监听到数据变化，并且更新视图（单向的）
 - Vue模式，并不是mvvm（虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。）
 - mvvm只能通过视图更改数据，只能通过数据更改视图，别的方法不行。但vue比较随意，可以通过获取节点进行操作（比如ref）
 - Vue 的核心库只关注视图层，是一套用于构建用户界面的渐进式框架（渐进式：主要用来做数据响应式的，如果想做更复杂的，可以增加一些组件化、vuex、vue-router、vue-cli）

## 响应式数据实现思路
  - new Vue({})时，会调用_init方法进行初始化（原型上绑定_init）
  - 将用户的options配置在vm.$options上
  - 在vm.$options上搜索有没有data属性    initState
  - 有的话，判断data是不是一个函数，如果是函数取函数返回值   initData
  - observe去观测data中的数据，进行数据初始化   和vm没关系，说明data已经变成了响应式
  - vm上想取值也能取到data中的数据   vm._data = data
  - 如果vm.$options.el存在，将数据挂在到页面上

## 模板编译
- 解析标签和内容：
  - 实现思路：边解析边删：html = <div id="app">{{message}}</div>，先解析<div id="app">，解析完后,html.substring(start[0].length)，这样html就变成了'{{message}}</div>'，根据while循环继续解析
- 生成ast语法树：（语法树就是用对象描述js语法）
  - 构建父子关系，可以通过栈来模拟谁是父亲，谁是子
  - 自闭合标签，就不用放到栈里
  - 实现思路：<html><body><p><span></span></p><ul><li></li></ul></body></html>，在这个结构中，从上到下解析，先解析到html标签，添加到栈中（stack = []）,stack=[html],继续解析，[html, body]...[html,body,p,span],遇到开始标签就添加到栈中，遇到闭合标签就从栈数组中移除。遇到p标签的闭合标签时，栈数组变为[html,body]，然后继续解析... [html,body,ul,li]。根据从栈中添加和移除可以形成树结构

## 流程回顾：
- 1.默认会调用vue._init方法将用户的参数挂载到$options选项中  vm.$options
- 2.vue会根据用户的参数进行数据的初始化 props  computed watch  会获取到对象作为数据，可以通过vm._data访问到用户的数据
- 3.对数据进行观测 对象（递归使用Object.defineProperty）、数组（方法的重写）  劫持到用户的操作，比如用户修改了数据 ==> 更新视图（性能问题）
- 4.将数据代理到vm对象上  vm.xx  ===> vm._data.xx
- 5.判断用户是否传入了el属性，内部会调用$mount方法，此方法也可以用户自己调用
- 6.对模板的优先级处理  render/template/outerHTML
- 7.将模板编译成函数  parserHTML  解析模板 ==> ast语法树，解析语法树生成code ===> render函数
- 8.通过render方法生成虚拟dom + 真实的数据  ==> 真实的dom
- 9.根据虚拟节点渲染成真实节点
## 创建渲染watcher
- 初始化渲染watcher
- 生成虚拟dom
- 生成真实dom元素
备注：
一个属性对应一个dep,dep中存放着每个组件对应的渲染函数，数据变了，会通知dep里的每个watcher方法，去调用它的update方法
一个属性对应一个dep，一个dep对应多个watcher(因为多个组件可能公用一个属性)；
一个watcher可以对应多个dep（因为一个页面可能不止一个属性）

## 生命周期的合并
- mixin原理
- 合并生命周期
- 调用生命周期
- 初始化流程中调用生命周期
## 依赖收集
- 在渲染时存储watcher
- 对象依赖收集
- 数组的依赖收集
## 实现Vue异步更新之nextTick
- 实现队列机制
- nextTick实现原理
备注：
使用场景：更新数据后重新渲染Dom


