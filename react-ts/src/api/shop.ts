/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-07 13:57:21
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-26 20:55:00
 */
import axios from './index'
//获取商品类别总数据
export const getGoodsSumType = () =>{
    return axios.request({
        url:'getGoodsSumType',
        method:'get'
    })
}
//获取类别总数据
export const getTypsData = () =>{
    return axios.request({
        url:'getTypsData',
        method:'get'
    })
}

//获取商品数据
export const getGoodsData = () =>{
    return axios.request({
        url:'getGoodsData',
        method:'get'
    })
}
//搜索商品数据
export const searchGoods = (data) =>{
    return axios.request({
        url:'goods/searchGoods',
        method:'get',
        params:data
        
    })
}