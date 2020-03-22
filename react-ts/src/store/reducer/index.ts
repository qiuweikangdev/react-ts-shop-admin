/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-08 18:59:22
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-13 17:07:14
 */
import { combineReducers } from 'redux'
import app from './app'
import user from './user'
//合并多个reducer函数
const rootReducer = combineReducers({
    user,
    app,
})
export default rootReducer