/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-08 23:41:28
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-22 10:46:42
 */
import { lazy } from 'react';
import IRoute from '../IRoute';
import SuspenseCom from '@/utils/SuspenseCom';
const C = lazy(() => import('@/pages/goodsManage'));
const route: IRoute = {
  name: 'GoodsManage',
  title: '商品管理',
  icon: 'icon-store_icon',
  path: '/goods-manage',
  exact: true,
  component:SuspenseCom(C)
}

export default route;
