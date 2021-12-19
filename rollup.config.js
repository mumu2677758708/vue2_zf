import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
export default {
  input: './practice/index.js', // 入口文件
  output: {
    file: './dist/vue.js', // 出口文件路径
    format: 'umd', // 模块化类型。常见的格式有：IIFE ESM CJS UMD
    name: 'Vue', // umd模块需要配置name,会将导出的模块放到window上。如果在node中使用，cjs;如果只是打包webpack里面导入 esm模块；前端里 script iife umd
    sourcemap: true // 可以进行源代码映射，进行源代码调试
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // glob写法 去掉node_modules下的所有文件夹下的文件
    }),
    process.env.ENV === 'development' ? serve({
      open: true,
      openPage: '/practice/index.html',
      port: 3000,
      contentBase: ''
    }) : null
  ]
}