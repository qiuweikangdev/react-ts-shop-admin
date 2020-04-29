/*
 * @Descripttion: 配置文件
 * @version:
 * @Author: qqqiu
 * @Date: 2020-03-07 00:04:57
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-27 09:24:56
 */
interface Config {
  baseURL: string;

  TOKEN_KEY: string;

  title: string;

  permission: {
    admin: string[];
    editor: string[];
  };
}
// 路由权限表
// 如果配置了一级路由，则它之下的所有子路由都可访问。
// admin :管理员  editor:普通用户
const permission = {
  admin: ["Dashboard", "UserManage", "OrderManage", "GoodsManage"],
  editor: ["Dashboard", "OrderManage", "GoodsManage"],
};

const AdminConfig: Config = {
  // 统一请求地址
  baseURL: process.env.NODE_ENV === "production" ? "" : "http://localhost:5000",

  // 本地存储token 的key
  TOKEN_KEY: "Admin_Token_key",

  // 项目名称
  title: "React Ant Admin",
  permission: permission,
};
export default AdminConfig;
