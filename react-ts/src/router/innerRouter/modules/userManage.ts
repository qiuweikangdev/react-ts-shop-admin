/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-08 23:41:28
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-27 15:14:34
 */
import { lazy } from 'react';
import IRoute from '../IRoute';
import SuspenseCom from '../../../utils/SuspenseCom';
const UserManage = lazy(() => import('@/pages/userManage'));
const route: IRoute = {
  name: 'UserManage',
  title: '用户管理',
  icon: 'icon-yonghuguanli',
  path: '/user-manage',
  exact: true,
  component: SuspenseCom(UserManage)
}

export default route;