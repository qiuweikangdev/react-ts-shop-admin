/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-22 19:53:24
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-23 21:18:42
 */
import React, { useEffect, useMemo } from 'react'
import { connect } from "react-redux";
import debounce from 'lodash/debounce'
const ChartResize = ({ children,chart,sidebar})=>{
    let resizeHandler
    useEffect(()=>{
        if(chart){
            // 当侧边栏发生展开收缩时，图表尺寸也需要一定的变化
            //由于echart渲染图表时有些延迟，没有得到实际的图表尺寸
            //可以延迟200毫秒来获取实际的图表尺寸
            setTimeout(()=>{
                chart.resize()
            },200)
           }
           //浏览器大小发生改变执行
        resizeHandler = debounce(()=>{
            if(chart){
                chart.resize()
            }
        },150)
        window.addEventListener('resize',resizeHandler)
        return ()=>{
            window.removeEventListener('resize', resizeHandler)
        }
    },[chart,sidebar])
    return children
}
const mapStateProps = (state)=>{
    return {
        sidebar:state.app.sidebar
    }
}
export default connect(mapStateProps)(ChartResize)