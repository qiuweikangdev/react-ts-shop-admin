import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Layout } from "antd";
import SiderBar from "./components/sildeBar";
import HeaderBar from "./components/headerBar";
import IRoute from "../../router/innerRouter/IRoute";
import { Router, initRoutes } from "@/router/innerRouter";
import { connect } from "react-redux";
import "./index.less";
import { useHistory, useLocation } from "react-router-dom";
import { toggleSlidebar } from "@/store/actions/appActions";
import { getRole } from "@/store/actions/userActions";
import { useViewport } from "@/hooks";
import { Scrollbars } from "react-custom-scrollbars";
import { getUserRole } from "@/api/user";
interface IProps {
  routeMap: IRoute[];
  token: string;
  toggleSlidebar: (opened) => void;
  sidebar: boolean;
  getRole: Function;
  role: string[];
}
//渲染滚动条
const renderThumb = (props: any) => {
  const { style, ...rest } = props;
  const thumbStyle: React.CSSProperties = {
    backgroundColor: "rgba(255,255,255,.2)",
    borderRadius: "3px",
    cursor: "pointer",
  };
  return <div style={{ ...style, ...thumbStyle }} {...rest} />;
};
const { Header, Content, Footer, Sider } = Layout;
const InterLayouts: React.FC<IProps> = ({
  routeMap = [],
  token,
  toggleSlidebar,
  sidebar,
  getRole,
  role,
}) => {
  const [routes, setRoutes] = useState(routeMap);
  const [collapse, setCollapse] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(80);
  const [screenfullHidden, setScreenfullHidden] = useState(false);

  // const role = ["admin"];
  //获取视口宽度
  const { width } = useViewport();

  //判断是否登录
  let history = useHistory();
  const isAuth = async () => {
    if (!token) {
      history.replace("/account/login");
    } else {
      //根据token，根据用户信息 (角色)
      getRole();
    }
  };
  useEffect(() => {
    isAuth();
  }, [token]);
  //获取可访问的路由
  useEffect(() => {
    setRoutes(initRoutes(role));
  }, [routes.length, role]);

  //判断视口变化
  useEffect(() => {
    if (width > 768 && width <= 992) {
      setCollapsedWidth(80);
      setCollapse(true);
      setScreenfullHidden(false);
    } else if (width <= 768) {
      setCollapsedWidth(0);
      setCollapse(true);
      setScreenfullHidden(true);
    } else {
      setCollapsedWidth(80);
      setCollapse(false);
      setScreenfullHidden(false);
    }
  }, [width]);
  const onToggleCollapsed = () => {
    setCollapse(!collapse);
  };
  const isSlidebar = useCallback(() => {
    toggleSlidebar(!collapse);
  }, [collapse]);
  useEffect(() => {
    isSlidebar();
  }, [collapse]);

  return (
    // <Scrollbars
    //     renderThumbHorizontal={renderThumb}
    //     renderThumbVertical={renderThumb}
    // >
    <Layout className="layout-wrapper">
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
          <HeaderBar
            collapse={collapse}
            onToggleCollapsed={onToggleCollapsed}
            screenfullHidden={screenfullHidden}
          />
        </Header>
        {/* 内容 */}
        <Content className="layout-content">
          <Router routeMap={routes} />
        </Content>
      </Layout>
    </Layout>
    //    </Scrollbars>
  );
};

const mapStateToProps = (state: any) => {
  return {
    token: state.user.token,
    role: state.user.role,
  };
};

export default connect(mapStateToProps, { toggleSlidebar, getRole })(
  InterLayouts
);
