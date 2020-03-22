/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-09 01:22:28
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-21 14:24:53
 */

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)