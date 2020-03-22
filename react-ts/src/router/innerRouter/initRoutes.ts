/*
 * @Descripttion: 初始化路由表
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-09 00:29:01
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-22 10:45:21
 */
import config from '@/config'
import Dashboard from './modules/dashboard';
import UserManage from './modules/userManage'
import OrderManage from './modules/orderManage'
import GoodsManage from './modules/goodsManage'
import IRoute from './IRoute';
//路由表
const routeMap = [
    Dashboard,
    UserManage,
    OrderManage,
    GoodsManage,
]

// 动态路由生成:从路由权限表中获取到角色可访问的路由名称
const generateRoutes = (roles:string[])=>{
    const permission:any = config.permission //获取权限表
    let accessedRoutes:string [] = []   //可访问的路由表
    roles.map((role:string)=>{
        accessedRoutes = [...permission[role],...accessedRoutes]
    })
    let newRoutes = Array.from(new Set(accessedRoutes))

    return newRoutes
}
// 根据路由名称获取可访问的路由表
const filterRouteMap =(routeNames:string[],routeMap: IRoute[])=>{
    const accessedRouteMap: IRoute[] = []; //可访问的路由表
    routeMap.map((route:IRoute,index)=>{
        // 如果一级路由的名称存在路由权限表中，则它之下的所有子路由都可访问
        if(routeNames.includes(route.name)){
            accessedRouteMap.push(route)

        }else{
            //如果一级路由的名称不在路由权限表中，再看它的哪些子路由名称在路由权限表中
            if(route.children){
                route.children = filterRouteMap(routeNames, route.children);
                 // 如果有子路由可访问，再添加。
                if (route.children.length > 0) {
                    accessedRouteMap.push(route)
                }
            }
        }
    })
    return accessedRouteMap
}
const initRoutes = (roles: string[]) => {
    const routeNames = generateRoutes(roles);
    return filterRouteMap(routeNames, routeMap);
    
  }
  export default initRoutes;