/*
 * @Descripttion:
 * @version:
 * @Author: qqqiu
 * @Date: 2020-01-21 12:09:21
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-29 20:34:49
 */
import axios from "./index";
export const login = (username: string, password: string) => {
  return axios.request({
    url: "user/loginAdmin",
    method: "post",
    data: {
      username,
      password,
    },
  });
};
export const register = (username: string, password: string) => {
  return axios.request({
    url: "user/register",
    method: "post",
    data: {
      username,
      password,
    },
  });
};
//判断token是否有效
//后端判断请求头有无 token，没有或者 token 过期，返回401；
export const authorization = () => {
  return axios.request({
    url: "/user/authorization",
    method: "get",
  });
};
//获取用户角色
export const getUserRole = () => {
  return axios.request({
    url: "/user/getUserRole",
    method: "get",
  });
};

//获取所有用户信息
export const getUserAll = () => {
  return axios.request({
    url: "user/getUserAll",
    method: "get",
  });
};

//搜索某用户
export const searchUser = (data) => {
  return axios.request({
    url: "searchUser",
    method: "post",
    data,
  });
};
//删除用户id
export const deleteUserID = ({ user_id }) => {
  return axios.request({
    url: "user/deleteUserID",
    method: "post",
    data: { user_id },
  });
};
