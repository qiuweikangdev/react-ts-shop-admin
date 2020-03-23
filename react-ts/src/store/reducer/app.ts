/*
 * @Descripttion: 应用相关的
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-28 19:13:11
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-23 11:22:25
 */
import { SLIDE_BAR } from '../actionTypes'
import { getToken } from '../../utils/auth'
import { AnyAction } from 'redux'
import isEmpty from 'lodash/isEmpty'
interface IState{
    sidebar: {
        opened: boolean;
    };
}
const initialState:IState = {
    sidebar: {
        opened:true
    }
} 
export default (state = initialState,action:AnyAction)=>{
    switch(action.type){
        case SLIDE_BAR:
        return Object.assign({},state,{sidebar:{opened:action.opened}});
        break;
        default:
            return state
            break;
    }
}
