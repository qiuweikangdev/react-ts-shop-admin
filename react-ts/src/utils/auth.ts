/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-07 09:40:40
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-08 20:08:37
 */
import Cookies from 'js-cookie'
import config from '../config';
export const setToken = (token: string ) => Cookies.set(config.TOKEN_KEY, token);

export const getToken =() => Cookies.get(config.TOKEN_KEY) || '';

export const removeToken = () => Cookies.remove(config.TOKEN_KEY);
