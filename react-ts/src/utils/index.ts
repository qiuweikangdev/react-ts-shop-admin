/*
 * @Descripttion: 一些工具函数
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-12 23:20:18
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-21 11:48:27
 */
import moment from 'moment'
//防抖
// export function debounce(func, wait, immediate) {
//     let timeout, args, context, timestamp, result
  
//     const later = function() {
//       // 据上一次触发时间间隔
//       const last = +new Date() - timestamp
  
//       // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
//       if (last < wait && last > 0) {
//         timeout = setTimeout(later, wait - last)
//       } else {
//         timeout = null
//         // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
//         if (!immediate) {
//           result = func.apply(context, args)
//           if (!timeout) context = args = null
//         }
//       }
//     }
//     return function(...args:any) {
//       context = this
//       timestamp = +new Date()
//       const callNow = immediate && !timeout
//       // 如果延时不存在，重新设定延时
//       if (!timeout) timeout = setTimeout(later, wait)
//       if (callNow) {
//         result = func.apply(context, args)
//         context = args = null
//       }
  
//       return result
//     }
//   }

 //处理时间
 export const formatTime = (time)=>{
   return moment(time).format('YYYY-MM-DD HH:mm:ss') 
 }


  //二进制流数据转换为base64
export const getBase64 =(str)=>{
    const buffer = Buffer.from(str, 'utf8') //转换为buffer对象
    const base64Str = buffer.toString('base64') //根据base64编码转换为base64字符串
    return base64Str
}