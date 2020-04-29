import React, { useEffect, useRef, useState, useMemo, memo } from "react";
import { Row, Col } from "antd";
import "./index.less";
import Icon from "../../components/iconFont/index";
import BarChart from "@/components/chart/barChart/barChart1";
import { getGoodsSumType, getTypsData } from "../../api/shop";
const Dashboard = () => {
  const [chartData, setChartData] = useState({
    name: [],
    count: [],
  });
  const [iconData, setIconData] = useState({
    countUser: "",
    countGoods: "",
    countOrder: "",
    countPaid: "",
  });
  useEffect(() => {
    getChartData();
    getIconData();
  }, []);

  const getIconData = async () => {
    let result = await getTypsData();
    if (result.data.data.length > 0) {
      let obj: any = {
        countUser: result.data.data[0].countUser,
        countGoods: result.data.data[0].countGoods,
        countOrder: result.data.data[0].countOrder,
        countPaid: result.data.data[0].countPaid,
      };
      setIconData(obj);
    }
  };
  const getChartData = async () => {
    let result = await getGoodsSumType();
    let obj: any = {};
    let name: Array<string> = [];
    let count: Array<number> = [];
    result.data.data.map((item) => {
      name.push(item.name);
      count.push(item.count);
    });
    //截取10个数据.. 因为太多数据图表会有点难看。。 以后再解决
    obj.name = name.slice(0, 10);
    obj.count = count.slice(0, 10);
    //obj.name = name
    //obj.count = count
    setChartData(obj);
  };

  return (
    <div className="dashboard" id="dashboard">
      <Row className="icon-wrapper" justify="center" align="middle" gutter={20}>
        <Col className="icon-content" xs={12} lg={6}>
          <span className="icon-user">
            <Icon icon="icon-yonghu"></Icon>
          </span>
          <span className="content">
            <span>{iconData.countUser}</span>
            <span>商城用户</span>
          </span>
        </Col>
        <Col className="icon-content" xs={12} lg={6}>
          <span className="icon-goods">
            <Icon icon="icon-store_icon"></Icon>
          </span>
          <span className="content">
            <span>{iconData.countGoods}</span>
            <span>商城商品</span>
          </span>
        </Col>
        <Col className="icon-content" xs={12} lg={6}>
          <span className="icon-order">
            <Icon icon="icon-dingdanguanli"></Icon>
          </span>
          <span className="content">
            <span>{iconData.countOrder}</span>
            <span>商城订单</span>
          </span>
        </Col>
        <Col className="icon-content" xs={12} lg={6}>
          <span className="icon-deal">
            <Icon icon="icon-jiaoyijilu"></Icon>
          </span>
          <span className="content">
            <span>{iconData.countPaid}</span>
            <span>交易记录</span>
          </span>
        </Col>
      </Row>
      <Row className="chart-wrapper">
        <Col span={24}>
          <BarChart width="100%" height="100%" chartData={chartData}></BarChart>
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;
