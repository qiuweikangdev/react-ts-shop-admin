import React from 'react'
import { Link } from 'react-router-dom';
import { createFromIconfontCN } from '@ant-design/icons';
interface IProps {
    path: string;
    icon:string;
    title: string;
}
// 使用阿里图标库iconfont
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1706129_h5s02d69uj6.js',
  });

const NavLink: React.FC<IProps> = ({ path,title,icon }) => {
    return (
        <Link to={path}>
            <IconFont type={icon} />
            <span className='title-link'>{title}</span>
        </Link>
    )
}
export default NavLink;