import store from '@/store'
//判断当前组件是否显示这个按钮
export default function isHasBtn(name){
    return store.getters.buttons.indexOf(name)!=-1;
}