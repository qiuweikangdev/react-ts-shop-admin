import React from 'react'
import { Menu, Dropdown,Avatar } from 'antd';
import { UserOutlined,DownOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { logout } from '@/store/actions/userActions'
import { withRouter,RouteChildrenProps } from 'react-router-dom';

interface IProps extends RouteChildrenProps {
    logout:()=>void,
}
const avatar = (props:IProps)=>{
    const onLogout = ()=>{
        props.logout()
    }
    const onBackHome = ()=>{
        props.history.push('/dashboard')
    }
    const menu = (
        <Menu>
          <Menu.Item key="1">个人中心</Menu.Item>
          <Menu.Item key="2" onClick={onBackHome}>首页</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={onLogout}>退出登录</Menu.Item>
        </Menu>
      );
    return (
            <Dropdown overlay={menu} trigger={['click']}>
                <a  onClick={e => e.preventDefault()}>
                 <Avatar icon={<UserOutlined />}/>
                </a>    
            </Dropdown>
    )
}

export default withRouter(connect(null,{logout})(avatar))