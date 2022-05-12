import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
import groupOrder from "@/pages/Center/groupOrder"
import myOrder from "@/pages/Center/myOrder"


// 这里应该写成什么形式呢
export default [
    {
        path: "/center",
        component: Center,
        meta: { show: true },
        children: [
            {
                path: "groupOrder",
                component: groupOrder,
            },
            {
                path: "myOrder",
                component: myOrder,
            },
            {
                path: "",
                redirect: "myOrder"
            }
        ]
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: "/pay",
        component: Pay,
        meta: { show: true }
    },
    {
        path: "/trade",
        component: Trade,
        meta: { show: true }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { show: true }
    },
    {
        name: 'AddCartSuccess',
        path: "/addCartSuccess",
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
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