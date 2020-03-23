/*
 * @Descripttion: 登录action
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-30 11:02:15
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-23 11:06:37
 */
import { register,login,authorization } from '../../api/user'
// import { setLocalStore ,removeLocalStore } from '@/utils/global'
import { setToken ,removeToken } from '../../utils/auth'
import { SLIDE_BAR } from '../actionTypes'
import { Dispatch }  from 'redux'
import { ThunkAction,ThunkDispatch } from 'redux-thunk'

export const toggleSlidebar = (opened:boolean)=>{
    return {
        type:SLIDE_BAR,
        opened
    }
}
