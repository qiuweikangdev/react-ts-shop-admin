
/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-08 23:41:28
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-27 15:17:34
 */
import { lazy } from 'react';
import IRoute from '../IRoute';
import SuspenseCom from '../../../utils/SuspenseCom';
import OrderManage from '../../../pages/orderManage/index';
const route: IRoute = {
  name: 'OrderManage',
  title: '订单管理',
  icon: 'icon-dingdanguanli',
  path:'/order-manage',
  exact:true,
  component:SuspenseCom(OrderManage)
}

export default route;
