const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const path = require('path')
let MFS = require("memory-fs");
var requireFromString = require("require-from-string");
let mfs = new MFS();
class SkeletonPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    //骨架屏的webpackconfig
    let {config={}}=this.options
    //订阅 一次编译事件
    compiler.hooks.compilation.tap("SkeletonPlugin", compilation => {
      console.log('插入 skeleton')
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
          'SkeletonPlugin',
          (data, cb) => {
            console.log(config)
            //获取dist路径
            let outputPath = path.join(config.output.path,config.output.filename);
            let childCompiler = webpack(config);
            //重写wbepack fs 系统
            childCompiler.outputFileSystem = mfs;
            //启动一次webpack编译
            childCompiler.run((err, stats) => {
              if(err)return err
              let skeleton= mfs.readFileSync(outputPath, "utf8");
              let skeletonHtml = requireFromString(skeleton);
              console.log(skeletonHtml)
              if (skeletonHtml.default) {
                skeletonHtml = skeletonHtml.default;
              }
              //加载骨架屏
            data.html=data.html.replace(`<div id="root"></div>`,`<div id="root">${skeletonHtml}</div>`);
            cb(null, data)
            });
            
          }
        )
    });
  }
}
module.exports = SkeletonPlugin;