import React,{ useEffect,memo ,useCallback,Suspense,useState,lazy,useMemo } from 'react'
import { Table, Input, Avatar, message } from 'antd';
import { connect }  from 'react-redux'
import {  getUser } from '@/store/actions/userActions'
import { formatTime,getBase64 } from '@/utils'
import './index.less'
import PageLoading from '../../components/pageLoading/index';
import { searchUser } from '../../api/user';
import { messageError,messageSuccess,messageWarning} from '@/utils/message'
const { Search } = Input;
const { Column  } = Table;
interface IData{
    key:number,
    name:string,
    password:string,
    avatar:string,
    time:string,
}
const columns:any = [
    { title: '编号', dataIndex: 'key',width: 50},
    { title: '用户名', dataIndex: 'name',width: 50},
    { title: '密码', dataIndex: 'password',width: 50, className: 'column-password',ellipsis:true},
    { title: '头像', dataIndex: 'avatar',width: 50,className: 'column-avatar',ellipsis:true,render:(text)=>(
        <img src={'data:image/jpeg;base64,'+getBase64(text)} alt=""/>
    )

    },
    { title: '创建时间', dataIndex: 'time',width: 80,ellipsis:true},
    { title: '操作',  fixed: 'right', width: 50, render: () => <a>删除</a>},
  ];
  

const UserManage:React.FC = (props:any)=>{
    const { userAll,getUser } = props
    const [tableData,settableData]=useState([])
    const [loading,setLoading ] =useState(true)
    useEffect(()=>{
        //获取用户
         getUser() //组件挂载之后执行
         settableData(dealData(userAll)) //组件更新之后执行
    },[userAll.length])

    let arr:any=[]
    //处理表格数据
 const dealData =(data)=>{
     if(data&&data.length>0){
        data.map((item)=>{
            let obj:any= {}
            obj.key = item.id
            obj.time =formatTime(item.createAt)
            obj.name = item.username
            obj.password = item.password
            obj.avatar = (item.avatar)
            arr.push(obj)
    })
     }
     setLoading(false)
    return arr 
 }

   async function handleSearch(value){
          setLoading(true)
      let res = await searchUser({username:value})
          if(!res.data.ok){
            setLoading(false)
            messageWarning(res.data.message);
        }
        settableData(dealData(res.data.data))
   }
   const handleChange =(event)=>{
       if(event.target.value === ''){
             settableData(dealData(userAll)) 
        }
   }
    return (
            <div className='user-manage'>
                 <div className='search-bar'>
                     <div className='search'>
                     <Search
                        placeholder="please search username"
                        enterButton="Search"
                        size="large"
                        onSearch={handleSearch}
                        onChange={handleChange}
                        />
                     </div>
                </div>
                <div className='table-container'>
                        <Table  columns={columns} dataSource={tableData} loading={loading}/>
                </div> 
                
            </div>

    )
}

const mapStateProps = (state:any)=>{
    return {    
      userAll:state.user.userInfo
    }
}
export default connect(mapStateProps,{ getUser })(UserManage);