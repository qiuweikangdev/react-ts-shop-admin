/*
 * @Descripttion: 应用相关的
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-28 19:13:11
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-11 15:38:43
 */
import { WINDOW_SIZE } from '../actionTypes'
import { getToken } from '../../utils/auth'
import { AnyAction } from 'redux'
import isEmpty from 'lodash/isEmpty'
const initialState = {
    windowSize: 0 //窗口大小
} 
export default (state = initialState,action:AnyAction)=>{
    switch(action.type){
        case WINDOW_SIZE:
        return Object.assign({},state,{windowSize:action.windowSize});
        break;
        default:
            return state
            break;
    }
}
