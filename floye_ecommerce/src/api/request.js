import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
import store from '@/store';



//1、对axios二次封装
const requests = axios.create({
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL: '/api',
    //代表请求超时的时间 5s
    timeout: 5000,
})


//2.请求拦截
requests.interceptors.request.use(config => {
    //config内主要是对请求头Header配置
    //1、先判断uuid_token是否为空
    if (store.state.detail.uuid_token) {
        //2、userTempId字段和后端统一
        config.headers['userTempId'] = store.state.detail.uuid_token
    }

    //开启进度条
    nprogress.start();
    return config
})
//3.响应拦截
requests.interceptors.response.use((res) => {
    //关闭进度条
    nprogress.done();
    return res.data;
}, (error) => {
    console.log("响应失败" + error)
    return Promise.reject(new Error('fail'))
})

//4.对外暴露
export default requests;
