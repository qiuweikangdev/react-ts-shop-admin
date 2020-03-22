/*
 * @Descripttion: 消息提示
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-22 16:50:48
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-22 16:58:35
 */
import { message } from 'antd';
message.config({
    top: 50,
    duration: 2,
    maxCount: 1,
  });
export const messageSuccess = (msg:string)=> message.success(msg);
export const messageWarning = (msg:string)=> message.warning(msg);
export const messageError = (msg:string)=> message.error(msg);