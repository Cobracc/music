//官网配置： https://cli.vuejs.org/zh/config/#filenamehashing

const path = require("path");
const debug = process.env.NODE_ENV !== "production";

module.exports = {
  publicPath: "./",
  //输出文件路径
  outputDir: "dist",
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,

  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的Vue构建版本，设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: true,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
  // 生产环境不需要sourceMap
  productionSourceMap: false,

  // 官网：https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  // 更多配置参考：https://www.jb51.net/article/150844.htm
  configureWebpack: config => {
    if (debug) {
      // 开发环境配置
      // sourcemap 参考：https://www.cnblogs.com/hhhyaaon/p/5657469.html
      config.devtool = "#cheap-module-eval-source-map";
    } else {
      // 生产环境配置
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
          vue$: "vue/dist/vue.esm.js"
        }
      }
    });
  },

  // css的相关配置
  css: {
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 true 后你就可以去掉文件名中的 .
    // module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    modules: false,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    extract: true,
    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      css: {
        //这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  },
  //所有 webpack-dev-server 的选项都支持
  // devServer: {
  //   open: true,
  //   host: "127.0.0.1",
  //   port: 8003,
  //   https: false,
  //   hotOnly: false,
  //   proxy: null
  // },
  // 第三方插件配置
  pluginOptions: {}
};
