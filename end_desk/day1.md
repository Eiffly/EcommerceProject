1:后台管理系统？
后台管理:不是你想的 java、php、python、scala 这些后台语言。




2:获取到模板，别忘记添加 node_modules 文件夹



3：切记后台管理系统，是没有注册的。




4：当前项目中文件夹与问价的作用
build 文件夹：webpack 配置文件，不需要管理。
mock 文件夹：项目起步的时候，模拟一些假的数据 mockjs
node_modules:项目依赖的文件夹。
publick 文件夹：放置静态资源的文件夹，这个文件夹里面资源，在 webpack 打包的时候，会原封不动进入 dist 文件夹。
src：程序员源代码文件夹
-----API：axios 请求先关
-----assets:放置项目中组件共用的静态资源，这个文件夹里面静态资源 webpack 会打包处理。
-----components:非路由组件（共用的组件）
-----icons:矢量图
-----layout 项目框架【类似于房子的大框】
router：路由相关的
store:仓库先关--vuex
style:样式相关
utils:request.js 到时候要修改的
tests：潘家成人家测试的文件夹




5:登录组件业务。
http://39.98.123.211:8170/swagger-ui.html 真实接口地址
5.1 静态组件-----人家骨架当中已经写好了
修改标题 与 背景图设置

5.2 书写 API---把模板中默认的 mock 数据进行替换，换成咱们的真实接口。

5.3 先把跨域问题解决------vue.config.js
先把 mock 的假的数据配置项 before 干掉
devServer: {
port: port,
open: true,
overlay: {
warnings: false,
errors: true
},
proxy:{
'/dev-api':{
target:'xxx',
pathRewrite:{}
}
}
},

5.4 替换 API 文件夹中的 user.js[和登录|退出登录|获取用户信心相关]，需要把假的数据变为真是的数据

5.5 修改请求拦截器判断
token 字段不应该叫做 X-token，咱们和后台老师商量好了，token



6:修改路由
6.1 先把模板中带有的路由干掉 --【views 文件夹不需要路由组件干掉，router 路由重新配置】
6.2Spu|Sku|trademark|attr内容区域距离边框是有距离。需要重新设置样式
在style文件夹中index.scss



7:书写API
ES5暴露 
ES6暴露---------强哥视频看看



8:获取品牌列表的数据以及展示
今晚：table、Pagination看看





9:产品的添加【点击添加按钮：添加产品的操作】


http://39.98.123.211:8170/swagger-ui.html



http://39.98.123.211:8216/swagger-ui.html