'use strict'

process.env.NODE_ENV = 'production'

const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.config')

if (process.argv.length < 3) {
  console.log(chalk.red('  Build failed!'))
  console.log(chalk.red('  Please specify project name(s).'))
  console.log(chalk.yellow('  (e.g.: npm run build hello)\n'))
  return
}

const spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})