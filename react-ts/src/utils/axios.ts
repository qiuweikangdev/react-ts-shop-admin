/*
 * @Descripttion: 封装axios
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-21 11:30:21
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-15 19:47:36
 */
import axios,{ AxiosRequestConfig,AxiosResponse,AxiosError } from 'axios'
import config from '../config'
import { getToken ,removeToken} from './auth';
import { message} from 'antd'
axios.defaults.withCredentials = true; //允许请求头携带cookie
class HttpRequest{
    //baseURL请求的基础路径
    //当没有传入baseURL参数时，则使用默认的baseURL
    public baseURL:string 
    constructor(baseURL:string=config.baseURL ){
    // this是我们创建的实例
        this.baseURL =baseURL
    }
    getInsideConfig(){
        const config = {
            baseURL:this.baseURL,
            // withCredentials:true //允许请求头携带cookie
            // headers:{ },
        }
        return config
    }
    //请求和响应拦截
    interceptors(instance:any){
         //请求拦截
         //在发送请求之前做些什么
         //可让每个请求携带token
        instance.interceptors.request.use((config: AxiosRequestConfig)=>{
            //config : 请求的所有配置 
             //让每个请求携带令牌token
         // 每次发送请求之前判断store中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        //  config.headers['authorization'] ='Bearer '+ getToken()
         config.headers['authorization'] ='Bearer '+ getToken()
            return config
        },(error: any)=>{
            return Promise.reject(error)
        })
        //响应拦截
        //成功请求
        instance.interceptors.response.use((response: AxiosResponse)=>{
            //res ：响应的信息
            //对响应的结果进行处理
           //拿到响应结果的data数据和status状态码
           if(response.status === 200){
            return Promise.resolve(response);  
            }else{
                return Promise.reject(response)
            }
        },(error: AxiosError)=>{
            //如果存在token,即已登录,请求返回状态码401时则登录过期
            if(getToken() && error.response && error.response.status ===401){  
                    message.error("登录过期,请重新登录");
                // alert('登录过期,请重新登录')
                    removeToken()
                // removeLocalStore('userInfo'); //清除用户信息
            }
            return Promise.reject(error.response)
        })
    }
    request(options:AxiosRequestConfig){
        const instance = axios.create()
        // 把两个对象合并一个对象
        options = Object.assign(this.getInsideConfig(),options)
        this.interceptors(instance)
        return instance(options)
    }
}
export default HttpRequest