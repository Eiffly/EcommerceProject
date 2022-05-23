1:SKU进行串讲？
-----API里面文件SKU默认对外暴露【index.js引入的时候不需要 * as】
-----sku.vue:HintButton






2:深度选择器 ----[scoped]

scoped:作用与原理
scoped:style标签添加上scoped属性，主要的作用是书写的样式只是针对当前组件或者当前组件的子组件的根节点起作用
原理:如果加上scoped属性，给当前组件的节点（或者子组件的跟标签）添加上data-v-xxxx自定义属性，vue通过属性选择器匹配进行样式渲染。


深度选择器：应用的场景，父组件想修改子组件的样式（非根标签），而且父组件的样式加了scoped

CSS原生的深度选择器： >>>
less样式深度选择器:一般用  /deep/
scss样式深度选择器: 一般  ::v-deep  【less、scss】
工作中深度选择器：一般是用来修改第三方组件的样式。



3：数据可视化？
数据可视化:将数据一图表的形式进行展示
e-charts什么框架都可以使用、v-charts  、  d3.js 、hight-charts



4：echarts准备

1：把demo文件夹里面首页文件夹复制进来
2：项目中没有echarts，安装echarts@4
3：提示缺少vue-count-to 再次安装


注意:e-charts数据可视化插件---React|Vue|Angular..........后台（JSP）


v-charts:只能在Vue框架中使用【它是一个插件】
https://v-charts.js.org/ 官网

