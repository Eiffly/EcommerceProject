import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"


// 这里应该写成什么形式呢
export default [{
    path: "/detail/:skuId",
    component: Detail,
    meta: { show: true }
},
{
    path: "/home",
    component: Home,
    meta: { show: true }
},
{
    name: "Search",
    path: "/search/:keyword?",
    // path: "/search",
    component: Search,
    meta: { show: true }
},
{
    path: "/login",
    component: Login,
    meta: { show: false }
},
{
    path: "/register",
    component: Register,
    meta: { show: false }
},
{
    path: "*",
    redirect: "/home"
}
]