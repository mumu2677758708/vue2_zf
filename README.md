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