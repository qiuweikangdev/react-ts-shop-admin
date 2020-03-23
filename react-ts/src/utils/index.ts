/*
 * @Descripttion: 一些工具函数
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-12 23:20:18
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-23 09:11:50
 */
import moment from 'moment'

 //处理时间
 export const formatTime = (time)=>{
   return moment(time).format('YYYY-MM-DD HH:mm:ss') 
 }


  //二进制流数据转换为base64  (用于图片处理)
export const getBase64 =(str)=>{
    const buffer = Buffer.from(str, 'utf8') //转换为buffer对象
    const base64Str = buffer.toString('base64') //根据base64编码转换为base64字符串
    return base64Str
}