/*
 * @Descripttion: 登录action
 * @version:
 * @Author: qqqiu
 * @Date: 2020-01-30 11:02:15
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-27 01:04:49
 */
import {
  register,
  login,
  authorization,
  getUserAll,
  getUserRole,
} from "../../api/user";
import { setToken, removeToken } from "../../utils/auth";
import { USER_INFO, SET_TOKEN, USER_ROLE } from "../actionTypes";
import { Dispatch } from "redux";

// import { setAlert } from './flashMessage'
export const setUserToken = (token: any) => {
  return {
    type: SET_TOKEN,
    token,
  };
};

export const setUserInfo = (user: any) => {
  return {
    type: USER_INFO,
    user,
  };
};
export const setUserRole = (role: any) => {
  return {
    type: USER_ROLE,
    role,
  };
};
//注册
export const registerRequest = (data: any) => {
  return (dispatch) => {
    // return  register(data.username,data.password)
  };
};

//登录
export const loginRequest = (data: any) => {
  return (dispatch: Dispatch<any>) => {
    return login(data.username, data.password).then((res: any) => {
      setToken(res.data.token); //把token存储在cookie
      // setLocalStore('userInfo',res.data.userInfo)   //登录成功之后本地化存储用户信息
      dispatch(setUserInfo(res.data.userInfo)); //把用户信息存储在redux
      dispatch(setUserToken(res.data.token)); //把token存储在redux
    });
  };
};

//退出登录
export const logout = () => {
  return (dispatch) => {
    removeToken();
    // removeLocalStore('userInfo')   //清除本地用户信息
    //清除redux数据
    dispatch(setUserInfo({}));
    dispatch(setUserToken(""));
  };
};

//token验证
export const authToken = () => {
  return async (dispatch) => {
    return await authorization().then(
      (res: { data: any }) => {
        //当用户一直在操作，进行跳转路由
        //我们希望延迟token的过期时间
        //再设置token时间来延迟token的过期时间
        setToken(res.data.token);
      },
      (err) => {
        // console.log(err.response.status)
        if (err.response.status === 401) {
          // console.log('token过期')
          //token过期,清除数据
          removeToken();
          // removeLocalStore('userInfo')
          //清除redux数据
          dispatch(setUserInfo({}));
          dispatch(setUserToken(""));
          // dispatch(setAlert({type:'fail',text:'登录过期,请重新登录'}))
        }
      }
    );
  };
};

//用户角色
export const getRole = () => {
  return async (dispatch) => {
    let res = await getUserRole();
    console.log(res.data.role_name, "res");
    dispatch(setUserRole(res.data.role_name)); //把用户信息存储在redux
  };
};

//获取所有用户
export const getUser = () => {
  console.log("aaa");
  return async (dispatch) => {
    let res = await getUserAll();
    dispatch(setUserInfo(res.data.data)); //把用户信息存储在redux
  };
};
