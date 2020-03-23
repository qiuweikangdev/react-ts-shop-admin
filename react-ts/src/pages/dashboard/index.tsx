import React,{ useEffect} from 'react'
import { Row, Col } from 'antd';
import './index.less'
import Icon from '../../components/iconFont/index';
import BarChart from '@/components/chart/barChart/barChart1';
import usePrevious from '../../hooks/usePrevious/index';
const Dashboard = ()=>{
    const [count, setCount] = React.useState(0);
    const newValue = count + 100;
    const prevCalculation = usePrevious(newValue);
  
   console.log(newValue,'now')
   console.log(prevCalculation,'old')

    return (
        <div className='dashboard' id='dashboard'>
            <Row className='icon-wrapper' justify='center' align='middle' gutter={20} >
                <Col className='icon-content'  xs={12} lg={6} >
                  <span className='icon-user'>
                      <Icon icon='icon-yonghu'></Icon>
                   </span>
                   <span className='content'>
                        <span>200</span>
                        <span>商城用户</span>
                    </span>
                </Col>
                <Col className='icon-content'  xs={12} lg={6}>
                  <span className='icon-goods'>
                      <Icon icon='icon-store_icon'></Icon>
                   </span>
                   <span className='content'>
                        <span>200</span>
                        <span>商城商品</span>
                    </span>
                </Col>
                <Col className='icon-content'  xs={12} lg={6}>
                  <span className='icon-order'>
                      <Icon icon='icon-dingdanguanli'></Icon>
                   </span>
                   <span className='content'>
                        <span>200</span>
                        <span>商城订单</span>
                    </span>
                </Col>
                <Col className='icon-content'  xs={12} lg={6}>
                  <span className='icon-deal'>
                      <Icon icon='icon-jiaoyijilu'></Icon>
                   </span>
                   <span className='content'>
                        <span>200</span>
                        <span>交易记录</span>
                    </span>
                </Col>
            </Row>
            <Row className='chart-wrapper'>
                 <Col span={24}>
                    <BarChart width='100%' height="100%"></BarChart>
                    </Col>
             </Row>
        </div>
    )
}
export default Dashboard;