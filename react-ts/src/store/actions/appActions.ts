/*
 * @Descripttion: 登录action
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-30 11:02:15
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-11 14:27:45
 */
import { register,login,authorization } from '../../api/user'
// import { setLocalStore ,removeLocalStore } from '@/utils/global'
import { setToken ,removeToken } from '../../utils/auth'
import { WINDOW_SIZE} from '../actionTypes'
import { Dispatch }  from 'redux'
import { ThunkAction,ThunkDispatch } from 'redux-thunk'

export const windowSize = (windowSize:number)=>{
    return {
        type:WINDOW_SIZE,
        windowSize
    }
}
