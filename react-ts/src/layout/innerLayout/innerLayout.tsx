import React ,{ useState,useEffect,useCallback, useMemo } from 'react'
import { Layout } from 'antd';
import SiderBar from './components/sildeBar';
import HeaderBar from './components/headerBar'
import IRoute from '../../router/innerRouter/IRoute';
import { Router,initRoutes }  from '@/router/innerRouter';
import { connect } from 'react-redux'
import './index.less'
import { useHistory,useLocation } from 'react-router-dom';
import { toggleSlidebar } from '@/store/actions/appActions'
import { useViewport } from '@/hooks'
import { 
    Scrollbars
   } from 'react-custom-scrollbars';
interface IProps {
    routeMap: IRoute[],
    token:string,
    toggleSlidebar:(opened)=>void,
    sidebar:boolean
  }
  //渲染滚动条
const renderThumb = (props: any) => {
  const { style, ...rest } = props;
  const thumbStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,.2)',
    borderRadius: '3px',
    cursor: 'pointer'
  };
  return (<div style={{ ...style, ...thumbStyle }}  {...rest} />);
}
const { Header, Content, Footer, Sider } = Layout;
const InterLayouts:React.FC<IProps>= ({routeMap=[],token,toggleSlidebar,sidebar})=>{
   const [routes,setRoutes] = useState(routeMap); 
   const [collapse,setCollapse] = useState(false); 
   const [collapsedWidth,setCollapsedWidth] = useState(80);
   const [screenfullHidden,setScreenfullHidden] = useState(false);

   const role = ['admin']
   //获取视口宽度
   const { width } =  useViewport()

   //获取可访问的路由
   useEffect(()=>{
        setRoutes(initRoutes(role))
   },[routes.length])
   //判断是否登录
   useEffect(()=>{
        isAuth()
   },[token])
   //判断视口变化
   useEffect(()=>{
       if(width>768 && width<=992){
        setCollapsedWidth(80)
        setCollapse(true)
        setScreenfullHidden(false)
    }
    else if(width<=768){
        setCollapsedWidth(0)
        setCollapse(true)
        setScreenfullHidden(true)
    }
    else{
        setCollapsedWidth(80)
        setCollapse(false)
        setScreenfullHidden(false)
        }
    },[width])
   const onToggleCollapsed =()=>{
        setCollapse(!collapse)
} 
   const isSlidebar = useCallback(()=>{
        toggleSlidebar(!collapse)
   },[collapse])
   useEffect(()=>{ 
        isSlidebar()
   },[collapse])
    //判断是否登录
    let history = useHistory()
    const isAuth = ()=>{
        if(!token){
            history.replace("/account/login");
        }else{
            //根据token，根据用户信息 (角色)
            
            
        }
    }
    return (
        <Scrollbars
            renderThumbHorizontal={renderThumb}
            renderThumbVertical={renderThumb}
        >
       <Layout className="layout-wrapper"  >
           {/* 侧边栏 */}
           <Sider
            collapsedWidth={collapsedWidth}
            className="layout-sider"
            width={180}
            collapsible
            collapsed={collapse} 
            trigger={null}
            >
                 <SiderBar routeMap={routes} />
            </Sider>
             <Layout className="layout-main">
                 {/* 标题栏 */}
                 <Header className="layout-header">
                        <HeaderBar collapse={collapse} onToggleCollapsed={onToggleCollapsed} screenfullHidden={screenfullHidden}/>
                 </Header>
                 {/* 内容 */}
                 <Content className='layout-content'>
                        <Router routeMap={routes}/>
                 </Content>
             </Layout>
       </Layout>
       </Scrollbars>
    )
}

const mapStateToProps = (state:any)=>{
    return {
        token:state.user.token
    }
}

export default connect(mapStateToProps,{toggleSlidebar})(InterLayouts);