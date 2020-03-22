/*
 * @Descripttion:  用户相关
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-28 19:13:11
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-20 21:24:25
 */
import { SET_TOKEN,USER_INFO} from '../actionTypes'
import { getToken } from '../../utils/auth'
import isEmpty from 'lodash/isEmpty'
const initialState = {
    token:getToken(),
    isAuthenticated:!isEmpty(getToken()), //表示用户是否已登录  (根据token来判断)
    userInfo:[]  //用户信息
} 
export default (state=initialState,action:any)=>{
    switch (action.type) {
        case SET_TOKEN:
            return Object.assign({},state,{token:action.token},{isAuthenticated:!isEmpty(getToken())})
            break;
        case USER_INFO:
            return Object.assign({},state,{userInfo:action.user})
            break;   
        default:
            return state
            break;
    }
}