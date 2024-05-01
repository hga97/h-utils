import json from '@rollup/plugin-json' // 允许从json中导入数据
import typescript from '@rollup/plugin-typescript' // typescript插件
import nodeResolve from '@rollup/plugin-node-resolve' // 解析第三方模块
import commonjs from '@rollup/plugin-commonjs' // 将非ES6语法的包转为ES6可用
import babel from '@rollup/plugin-babel' // rollup 的 babel 插件，ES6转ES5
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

import pkg from './package.json' assert { type: 'json' }

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'h-utils'
    }
  ],
  plugins: [
    json(),
    typescript(),
    nodeResolve({
      browser: true,
      main: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // 忽略 node_modules
      babelHelpers: true // 开启体积优化
    }),
    process.env.ENV === 'dev'
      ? serve({
          open: true, // 是否打开浏览器
          // contentBase: './', // 入口 html 文件位置
          host: 'localhost', //
          port: 3000 // 端口号
        })
      : null,
    livereload()
  ],
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}
