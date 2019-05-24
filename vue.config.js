

//路径别名
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports={
    lintOnSave: true,
    //路径别名
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('pages',resolve('src/pages'))
            .set('static',resolve('src/static'))
    },
    devServer: {
        disableHostCheck: true,
        //跨域
        proxy:{
            '/api':{
                target: 'https://xsytest.dingdingxiujia.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
    outputDir: 'dist',
    publicPath: './',
    // // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,




    //多页应用
    pages: {

        pages: {
            entry:"src/pages/project/main.js",
            template:"src/pages/project/project.html",
            filename:'project.html'
        },
        info: {
            entry:"src/pages/info/main.js",
            template:"src/pages/info/info.html",
            filename:'info.html'
        },
        package: {
            entry: "src/pages/package/main.js",
            template: "src/pages/package/package.html",
            filename: 'package.html'
        },
        group: {
            entry: "src/pages/group/main.js",
            template: "src/pages/group/group.html",
            filename: 'group.html'
        }
    }
}