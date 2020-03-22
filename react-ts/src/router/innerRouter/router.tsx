/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-09 21:51:07
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-21 23:57:04
 */
import React, { Suspense,useEffect,Fragment,useState } from 'react';
import { Switch, Route, RouteProps } from 'react-router-dom';
import PageLoading from '../../components/pageLoading'
import IRoute from './IRoute';
interface IProps {
    routeMap: IRoute[];
  }
const Router:React.FC<IProps> = ({ routeMap })=>{
    const [component,setComponent] = useState()
        // 根据路由配置生成路由
    const getRoutes = (routeMap: IRoute[]) => {
        const routes: RouteProps[] = [];
        const getRoute = (routeMap: IRoute[]) => {
        routeMap.forEach(config => {
            const { path, exact, component, children } = config;
            if (children) {
            getRoute(children);
            } else {
            routes.push({ path, exact, component });
            }
        })
        }
        getRoute(routeMap);
        return routes;
    }
    return (
      <Suspense fallback={<PageLoading/>}>
          <Switch>
            {
              getRoutes(routeMap).map((route) =>
                        <Route
                      key={route.path + ''}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                  />
                  )
            }
          </Switch>
        </Suspense>
    )
}

export default Router