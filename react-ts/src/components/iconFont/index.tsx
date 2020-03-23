import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
// 使用阿里图标库iconfont
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1706129_kmvo2sbma9.js',
  });
interface IProps{
    icon:string,
}
const Icon = ({icon}:IProps)=>{
    return (
        <IconFont type={icon} className={icon}></IconFont>
    )
}
export default Icon