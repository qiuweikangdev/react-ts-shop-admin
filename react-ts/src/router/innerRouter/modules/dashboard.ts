/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-14 16:39:21
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-22 10:45:56
 */
// 首页
import { lazy } from 'react';
import IRoute from '../IRoute';
import SuspenseCom from '@/utils/SuspenseCom';
const Dashboard = lazy(() => import( '@/pages/dashboard'));
const route: IRoute = {
  name: 'Dashboard',
  title: '首页',
  icon: 'icon-Home',
  path: '/dashboard',
  exact: true,
  component: SuspenseCom(Dashboard)
}
export default route;
