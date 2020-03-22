import React ,{ lazy} from 'react'
import SuspenseCom from '../../utils/SuspenseCom';
import { Switch ,RouteProps, Route } from 'react-router-dom';
const Login  =lazy(()=>import('../../pages/account/login'))

const routes: RouteProps[] = [{
    path: '/account/login',
    exact: true,
    component: SuspenseCom(Login)
  }]
  
const OuterRouter:React.FC =()=>{
    return (
            <Switch>
                {routes.map((route:RouteProps)=>
                    <Route
                        key={route.path + ''}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                )}
            </Switch>
    )
}
export default OuterRouter