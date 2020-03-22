/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-07 09:33:30
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-22 10:52:20
 */
const { override, addWebpackAlias,fixBabelImports ,addLessLoader,overrideDevServer,addWebpackModuleRule,watchAll} = require('customize-cra')
const path = require('path')
const resolve = dir => path.join(__dirname, '.', dir)

//是一个高阶函数
const changeServer = ()=>(config)=>{
      return config
}
module.exports ={
  webpack: override(
    addWebpackAlias({
      ['@']: resolve('src')
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
     addLessLoader({
         javascriptEnabled: true,
         modifyVars: { '@primary-color': '#1DA57A' },
    }),
  ),
  devServer:overrideDevServer(
    // dev server plugin
    changeServer()
  )
}

