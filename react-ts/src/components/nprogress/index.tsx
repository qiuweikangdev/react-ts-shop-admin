import React,{ useEffect } from 'react'
import NProgress from 'nprogress'
import { useLocation,useHistory } from 'react-router-dom';
const NProgressCom = ({children})=>{
    const location = useLocation()
    const history = useHistory()
    useEffect(()=>{
        NProgress.start();
        // console.log(location)
        setTimeout(()=>{
            console.log(location.pathname,'location.pathname')
            history.listen(route => {
                console.log(route,'route')
                if(location.pathname !==route.pathname){
                    // console.log(NProgress,'hhhah')
                    //   NProgress.start();
                            // NProgress.done();

                }
            })
        },2000)
       
    })

    return children
}
export default NProgressCom