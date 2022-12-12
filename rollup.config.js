const html = require('rollup-plugin-html2')
const image = require('@rollup/plugin-image')
const typescript = require('@rollup/plugin-typescript')
const terser = require('@rollup/plugin-terser')
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')
const postcss = require('rollup-plugin-postcss')
const postcssPresetEnv = require('postcss-preset-env')
const del =require('rollup-plugin-delete') 
const htmlTemplate =require('rollup-plugin-generate-html-template') 


const isProduction = process.env.NODE_ENV === 'production'

const plugins =
  process.env.NODE_ENV === 'production'
    ? [
        terser({
          compress: {
            drop_console: isProduction,
          },
        }),
      ]
    : process.env.NODE_ENV !== 'development'
    ? [
        serve({
          port:8081,
          contentBase:'dist'
        }),
        livereload({
          watch: 'dist'
        }),
      ]
    : []

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    sourcemap: false,
    format:'es'
  },
  context:'window',
  plugins: [
    // del({ targets: 'dist/*' }),  //自动删除dist目录
    html({
      template: 'index.html',
      exclude:['index']
      // externals:{
      //   before: [{
      //     tag:  'link',
      //     href: './index.css',
      //   }]
      // }
    }),
    // htmlTemplate({
    //   template: 'index.html',
    //   target: 'dist/index.html',
    // }),
    // image(),
    postcss({
      extensions: ['.css', '.less'],
      minimize: isProduction,
      extract: true,
      // Or with custom file name, it will generate file relative to bundle.js in v3
      extract: 'index.css',
      plugins: [
        postcssPresetEnv({ browsers: 'defaults' })
      ],
    }),
    typescript(),
    ...plugins,
  ],
}
