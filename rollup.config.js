import svelte from 'rollup-plugin-svelte'
import pkg from './package.json'
import serve from 'rollup-plugin-serve'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import css from 'rollup-plugin-postcss'
import html from '@gen/rollup-plugin-generate-html'
import dotenv from 'rollup-plugin-dotenv'

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase())

const dev = process.env.NODE_ENV === 'development'

const plugins = [
  resolve(),
  commonjs(),
  css(),
  svelte()
]

const output = [
  { file: pkg.module, format: 'es' },
  { file: pkg.main, format: 'umd', name }
]

if (dev) {
  plugins.unshift(
    dotenv()
  )
  plugins.push(
    html({
      template: 'demo/index.html', // Default undefined
      filename: 'index.html', // Default index.html
      publicPath: 'dist' // Default undefined
    }),
    serve({
      contentBase: 'dist',
      port: 12001
    })
  )
  output.push(
    ...output.map(o => {
      return { ...o, file: `dist/${o.file}` }
    })
  )
}

export default {
  input: dev ? 'demo/demo.js' : 'src/components.js',
  output,
  plugins
}
