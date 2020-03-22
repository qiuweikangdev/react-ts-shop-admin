import React, { useState }  from 'react'
import {
    FullscreenOutlined,
    FullscreenExitOutlined,
  } from '@ant-design/icons';
import screenfull from 'screenfull'
const ScreenFull:React.FC = ()=>{
 const [isScreenFull,setScreenFull] = useState(false)
 const onScreenFull = ()=>{
     //是否允许您进入全屏模式
    if (screenfull.isEnabled) {
        setScreenFull(!isScreenFull)
        screenfull.toggle(); //如果不是全屏状态则请求全屏显示，否则退出全屏
    }
    }
    return (
        <span onClick={onScreenFull} style={{fontSize:'24px'}}>
            {!isScreenFull?<FullscreenOutlined />:<FullscreenExitOutlined />}
        </span>
    )
}
export default ScreenFull;