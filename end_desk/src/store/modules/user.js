//api文件夹里面用于发请求的函数:登录、退出登录、获取用户信息
import { login, logout, getInfo } from "@/api/acl/user";
//获取token|设置token|移出token的函数
import { getToken, setToken, removeToken } from "@/utils/auth";
//重置路由
import { resetRouter,allAsyncRoutes, constantRoutes,anyRoute} from "@/router";
//路由器
import router from '@/router';
import cloneDeep from 'lodash/cloneDeep'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    roles:[],
    buttons:[],
    allAsyncRoutes:[],//将来项目中要展示的全部的异步路由【根据不同的身份展示不同的异步路由】-----不是字符串
    allRoutes:[],//计算完毕：不同用户身份需要展示的全部路由---不是字符串
  };
};

//state右侧数值应该为对象
const state = getDefaultState();
//mutations:修改state唯一的地方
const mutations = {
  //重置state
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  //设置token
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  //设置用户信息
  SET_USERINFO:(state,userInfo)=>{
       //存储用户名字
       state.name = userInfo.name;
       //存储用户的头像
       state.avatar = userInfo.avatar;
       //存储角色
       state.roles = userInfo.roles;
       //存储按钮
       state.buttons = userInfo.buttons;
  },
  //将来程序中需要展示的异步路径进行设置
  SET_ASYNCROUTES(state,allAsyncRoutes){
     //仓库仓储当用用户（不同身份可以访问异步路由）
     state.allAsyncRoutes = allAsyncRoutes;
     //下面的代码返回的是一个数组：数组里面包含用户全部需要展示路由
     state.allRoutes = constantRoutes.concat(state.allAsyncRoutes,anyRoute);
     //修改路由器中新的路由
     router.addRoutes(state.allRoutes);
  }
};

//定义一个函数：计算出需要展示的异步路由
function filterAllAsyncRoutes(allAsyncRoutes,routes){ 
  //过滤：需要返回值 true 新数组要的   false新数组不要
 return allAsyncRoutes.filter(item=>{
     //判断当前路由当中的name属性值是否在routes中出现
     //如果出现需要的
     if(routes.indexOf(item.name)!=-1){
        //如果当前路由有子理由
       if(item.children&&item.children.length){
           //递归进行对比子组件是否出现
           item.children = filterAllAsyncRoutes(item.children,routes);
       }
        return true;
     }
  })
}


const actions = {
  
  //登录业务
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    let result = await login({ username: username.trim(), password: password });
    if (result.code == 20000 || result.code == 200) {
      //提交mutation，修改Vuex中state的token字段
      commit("SET_TOKEN", result.data.token);
      //持久化存储
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //获取用户信息（开发后台管理系统权限问题:用户信息）
  getInfo({ commit, state }) {
     //返回promise
    return new Promise((resolve, reject) => {
      //getInfo函数：带着token获取用户信息
      getInfo(state.token).then(response => {
           //服务器返回的用户信息
          const { data } = response;
          //存储用户信息
          commit('SET_USERINFO',data);
          //提交mutations:给allAsyncRoutes进行赋值
          //用户全部异步路由【注意：当晚上测试的时候，用户切换的时候，切记这里需要深拷贝】
          commit('SET_ASYNCROUTES',filterAllAsyncRoutes(cloneDeep(allAsyncRoutes),data.routes));
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
};
