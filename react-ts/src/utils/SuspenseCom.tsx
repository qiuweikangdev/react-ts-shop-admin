//包裹懒加载组件
import React, {  Suspense } from "react";
import PageLoading from '../components/pageLoading'
const SuspenseComponent = (Component:React.FC) => (props:any) => {
    return (
      <Suspense fallback={<PageLoading/>}>
        <Component {...props}/>
      </Suspense>
    )
  }
  export default SuspenseComponent 