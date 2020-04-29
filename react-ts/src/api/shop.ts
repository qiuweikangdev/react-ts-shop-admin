/*
 * @Descripttion:
 * @version:
 * @Author: qqqiu
 * @Date: 2020-03-07 13:57:21
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-29 20:15:09
 */
import axios from "./index";
//获取商品类别总数据
export const getGoodsSumType = () => {
  return axios.request({
    url: "getGoodsSumType",
    method: "get",
  });
};
//获取类别总数据
export const getTypsData = () => {
  return axios.request({
    url: "getTypsData",
    method: "get",
  });
};

//获取商品数据
export const getGoodsData = () => {
  return axios.request({
    url: "getGoodsData",
    method: "get",
  });
};
//搜索商品数据
export const searchGoods = (data) => {
  return axios.request({
    url: "goods/searchGoods",
    method: "get",
    params: data,
  });
};

//获取订单数据
export const getOrderData = () => {
  return axios.request({
    url: "getOrderData",
    method: "get",
  });
};

//删除订单id
export const deleteOrderID = ({ order_num }) => {
  return axios.request({
    url: "deleteOrderID",
    method: "post",
    data: { order_num },
  });
};

//删除商品Id
export const deleteGoodsID = ({ goods_serial_number }) => {
  return axios.request({
    url: "deleteGoodsID",
    method: "post",
    data: { goods_serial_number },
  });
};
//搜索商品数据
export const searchOrder = (data) => {
  return axios.request({
    url: "searchOrder",
    method: "post",
    data,
  });
};
