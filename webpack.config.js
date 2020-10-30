const path = require('path');


module.exports = {
    // 1
    entry: './src/index.ts',
    // 2
    output: {
      path: path.resolve(__dirname , 'dist/'),
    //   publicPath: '/public',
      filename: 'viworld.js'
    },
    // 3
    devServer: {
      contentBase: './dist'
    }
  };