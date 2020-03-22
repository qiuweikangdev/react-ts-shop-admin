import React,{ useEffect,useState } from 'react'
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as userAction from '../../../store/actions/userActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './index.less'
import { messageError,messageWarning,messageSuccess } from '@/utils/message';
interface FieldData {
    username:string;
    password:string;
}
const Login = (props:any)=>{
  const [account,setAccount]=useState({
     username:'',
     password:''
  })
   //表单实例
    const [form] = Form.useForm();

    //表单验证成功之后触发
    const onFinish = ()=>{
        props.userAction.loginRequest(account).then(()=>{
          //登录成功跳转首页
          messageSuccess('登录成功');
          props.history.replace('/')
        },(err:any)=>{
         //用户名不存在 404
         //登录失败/授权失败/密码不正确 =>返回401 
          console.log(err,'err')
          if(err.data){
            messageWarning(err.data.message);
          }
              // alert(err.data.message)

        }).catch((err:any)=>{
          //服务器发送错误
          console.error(err)
          messageError('出了问题,请再试试');

        })
    }

    //字段值更新回调
  const onValuesChange = (changedValues, allValues)=>{
     setAccount({
       username:allValues.username,
       password:allValues.password
     })

  }
    return (
      <div className='login-main'>
        <div className='login-wrapper'>
        <p className='title'>后台管理系统</p>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              size='large'
              form={form}
              scrollToFirstError
              onValuesChange={onValuesChange}
            >
           <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="username"
                  placeholder="username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Login
                </Button>
              </Form.Item>
            </Form>
            </div>
            </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
   return {
     userAction:bindActionCreators(userAction,dispatch)
   }
}
export default connect(null,mapDispatchToProps)(Login);