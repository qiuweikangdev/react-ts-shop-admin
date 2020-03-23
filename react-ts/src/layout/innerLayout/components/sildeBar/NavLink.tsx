import React from 'react'
import { Link } from 'react-router-dom';
import Icon from '@/components/iconFont/index';
interface IProps {
    path: string;
    icon:string;
    title: string;
}
const NavLink: React.FC<IProps> = ({ path,title,icon }) => {
    return (
        <Link to={path}>
            <Icon icon={icon} />
            <span className='title-link'>{title}</span>
        </Link>
    )
}
export default NavLink;