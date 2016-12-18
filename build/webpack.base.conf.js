var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var postcss = [
  require('autoprefixer')(),
  require('postcss-px2rem')({remUnit: 50})
]
var imagemin=require("imagemin");

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

var query={};
if(env=== 'development'){


  query= {
    multiple:[
      { search: '\\$\\{tps\\.domain\\}', replace: '/list',flags:"gi" },
      { search: '\\$\\{mobile\\.image\\.host\\.url\\}', replace: 'http://img.suning.cn/project/mtps' ,flags:"gi"},
      { search: '\\$\\{mobile\\.css\\.host\\.url\\}', replace: 'http://sitres.suning.cn/project/mtps/' ,flags:"gi"},
      { search: '\\$\\{mobile\\.js\\.host\\.url\\}', replace: 'http://sitres.suning.cn/project/mtps/' ,flags:"gi"},
      { search: '\\$\\{versionNo\\}', replace: '411,255',flags:"gi" }


    ]
  };
}
else{
  query={

  }
}

var changequery=JSON.stringify(query);
module.exports = {
  entry: {
    report: './src/main.js'
    //,
    //zepto:['./src/assets/js/zepto-1.1.6.js']
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    // preLoaders: [
    //  {
    //    test: /\.vue$/,
    //    loader: 'eslint',
    //    include: projectRoot,
    //    exclude: /node_modules/
    //  },
    //  {
    //    test: /\.js$/,
    //    loader: 'eslint',
    //    include: projectRoot,
    //    exclude: /node_modules/
    //  }
    // ],


    loaders: [
      {
        test: /\.(htm|html)$/,
        loader: 'raw'
      }
      ,
      {
        test: /\.(js|html|vue)$/i,
        loader: 'string-replace',
        query: query,
        //include: projectRoot,
        exclude: /node_modules/
      }
      ,
      {
        test: /\.vue$/,
        loader: 'vue'
      },

      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },

      {


        test: /\.json$/,
        loader: 'json'
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader:'url?limit=3500&name='+utils.assetsPath("images/[name].[ext]?v=[hash:5]")+''
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'improved-image-webpack-loader',
        query: {
          gifsicle: {
            interlaced: true,
            optimizationLevel: 3,
            number: 256

          },
          mozjpeg: {
            quality: 70,
            progressive: true
          },
          optipng: {
            optimizationLevel: 7
          }
          ,
          pngquent: {
            quality: '70',
            speed: 4
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // eslint: {
  //  formatter: require('eslint-friendly-formatter')
  // },

  imageOptimizeLoader: {
    optimizer: {
      covertPngToJpg: true
    }
    ,
    pngquant: {
      quality: '70',
      speed: 4
    }
    ,
    mozjpeg: {
      targa: false,
      progressive: false,
      quality: 70
    }
    ,
    svgo: {
      plugins: [
        {removeComments: true},
        {sortAttrs: true},
        {minifyStyles: true}
      ]
    }
  },
  postcss: postcss,

  vue: {
    //loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    loaders:Object.assign({ js: 'string-replace?'+changequery+'!babel' }, utils.cssLoaders({ sourceMap: config.build.productionSourceMap})),
    postcss: postcss
  }
};
