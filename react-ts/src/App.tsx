import React from 'react'; 
import { Provider } from "react-redux";
import { HashRouter,Route,Switch } from "react-router-dom";
import InnerLayout from '@/layout/innerLayout/index'
import OuterLayout from '@/layout/outerLayout/index';
import store from "@/store";
import ViewportProvider from '@/hooks/useViewport/viewportContext'
import './styles/index.less'
import NProgressCom from './components/nprogress/index';
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
      <Switch>
        {/* 
          注意：
          由于没有设置exact，只要url中包含"/",就会与这个路由匹配成功，所以必须将它写在最后。
        */}
        {/* <NProgressCom> */}
        <Route path='/account' component={OuterLayout}></Route>
        <ViewportProvider>
        <Route path='/'  component={InnerLayout}></Route>
        </ViewportProvider>
        {/* </NProgressCom> */}
      </Switch>
      </HashRouter>
     </Provider>
  );
}

export default App;
