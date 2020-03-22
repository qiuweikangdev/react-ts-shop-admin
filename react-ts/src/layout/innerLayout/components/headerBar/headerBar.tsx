import React from 'react'
import './index.less'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
  } from '@ant-design/icons';
import ScreenFull from '../../../../components/screenFull'
import Avatar from './avatar'
import { Menu, Dropdown} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classnames from 'classnames'
interface IHeaderProps{
    collapse: boolean;
    onToggleCollapsed:()=>void,
    screenfullHidden:boolean
}

const HeaderBar: React.FC<IHeaderProps> = (props) =>{
    const { collapse, onToggleCollapsed,screenfullHidden} = props;
    const  screenfullClass =classnames({
             'screen-full':true,
             'hidden':screenfullHidden
    })
    return (
        <div className="header-bar">
            {/* 折叠/展开侧边栏 */}
            <div onClick={onToggleCollapsed} style={{cursor:"pointer"}} className='collapse-icon'>
                {collapse?<MenuFoldOutlined style={{ fontSize: '24px', color: '#3F3F3F' }} />:<MenuUnfoldOutlined style={{ fontSize: '24px', color: '#3F3F3F' }} />}
            </div>
            {/* 全屏 */}
            
            <div className={screenfullClass}>
                    <ScreenFull></ScreenFull>
            </div>
            {/* 头像 */}
             <div className='header-menu'>
                    <Avatar></Avatar>
             </div>

        </div>
        
    )

}
export default HeaderBar;
