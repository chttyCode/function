const path =require('path')
module.exports={
  target: 'node',
  mode: "development",
  context: process.cwd(),
    mode:'production',
    entry: "./index.js",
    output:{
      libraryTarget: 'commonjs2'
    },
}