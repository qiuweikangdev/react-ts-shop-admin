
/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-08 23:41:28
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-22 10:45:44
 */
import { lazy } from 'react';
import IRoute from '../IRoute';
import SuspenseCom from '../../../utils/SuspenseCom';
const List = lazy(() => import( '@/pages/orderManage/components/list'));
const Artcle = lazy(() => import( '@/pages/orderManage/components/article'));
const route: IRoute = {
  name: 'OrderManage',
  title: '订单管理',
  icon: 'icon-dingdanguanli',
  children: [{
    name: 'ArticleList',
    title: '文章列表',
    path: '/article/list',
    icon: 'order',
    exact: true,
    component: SuspenseCom(List)
  },{
    name: 'ArticleContent',
    title: '文章内容',
    icon: 'order',
    path: '/article/content',
    exact: true,
    component: SuspenseCom(Artcle)
  }]

}

export default route;
