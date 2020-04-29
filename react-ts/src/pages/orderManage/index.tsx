import React, { useEffect, useState, useMemo } from "react";
import { Table, Input, Avatar, Button, Popconfirm, message } from "antd";
import { messageError, messageSuccess, messageWarning } from "@/utils/message";
import { DownloadOutlined } from "@ant-design/icons";
import { searchOrder, getOrderData, deleteOrderID } from "@/api/shop";
import { formatTime } from "@/utils";
import "./index.less";
const { Search } = Input;
const { Column } = Table;
const OrderManage = () => {
  const [tableData, settableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [multipleSelection, setMultipleSelection] = useState([]); //选择要导出的数据
  const [selectedRowKey, setSelectedRowKey] = useState([]); //选中的key
  useEffect(() => {
    getData(); //获取数据
  }, []);

  const getData = async () => {
    let result = await getOrderData();
    let data = dealData(result.data.data);
    // console.log(data,'result')
    settableData(data);
    setLoading(false);
  };
  let load = useMemo(() => {
    if (tableData.length > 0 || value) {
      return false;
    } else {
      return true;
    }
  }, [tableData]);
  const dealData = (data) => {
    let arr: any = [];
    if (data && data.length > 0) {
      data.map((item) => {
        let obj: any = {};
        obj.key = item.order_num;
        obj.userId = item.user_id;
        obj.name = item.shipping_user;
        obj.orderStatus = item.order_status === 0 ? "未付款" : "已付款";
        obj.orderTime = formatTime(item.order_time);
        arr.push(obj);
      });
    }
    return arr;
  };

  const columns: any = [
    {
      title: "订单编号",
      dataIndex: "key",
    },
    {
      title: "用户编号",
      dataIndex: "userId",
    },
    {
      title: "收货人",
      dataIndex: "name",
    },
    {
      title: "订单状态",
      dataIndex: "orderStatus",
    },
    {
      title: "创建时间",
      dataIndex: "orderTime",
    },
    {
      title: "操作",
      fixed: "right",
      width: 50,
      render: (text, record, index) => (
        //  <a onClick={()=>handleDelete(record)}>删除</a>
        <Popconfirm
          title="确定删除吗?"
          onConfirm={() => handleConfirm(record)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a>删除</a>
        </Popconfirm>
      ),
    },
  ];

  const handleSearch = async (value) => {
    if (!value) {
      messageWarning("请输入");
    } else {
      setLoading(true);
      let res = await searchOrder({ user_id: value });
      console.log(res, "res");
      if (res.data.ok == 0) {
        messageWarning(res.data.message);
        setLoading(false);
      } else {
        settableData(dealData(res.data.data));
        setLoading(false);
      }
    }
  };
  const handleChange = (event) => {
    if (event.target.value === "") {
      getData();
    } else {
      setValue(event.target.value);
    }
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setMultipleSelection(selectedRows);
      setSelectedRowKey(selectedRowKeys);
    },
    selectedRowKeys: selectedRowKey,
  };
  //导出excel
  const handleDownload = () => {
    if (multipleSelection.length > 0) {
      setDownloadLoading(true);
      import("@/assets/excel/Export2Excel").then((excel) => {
        const tHeader = [
          "订单编号",
          "用户编号",
          "收货人",
          "订单状态",
          "创建时间",
        ]; //excel标题
        const filterVal = ["key", "userId", "name", "orderStatus", "orderTime"];
        const list = multipleSelection;
        const data = formatJson(filterVal, list); //要导出的数据
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "order",
        });
      });
      setSelectedRowKey([]); //取消全种
      setDownloadLoading(false);
    } else {
      messageWarning("请选择要导出的数据");
    }
  };
  const formatJson = (filterVal, jsonData) => {
    return jsonData.map((v) => filterVal.map((j) => v[j]));
  };

  const handleConfirm = async (data) => {
    const { key: order_num } = data;
    // console.log(data,'data')
    let result = await deleteOrderID({ order_num });
    if (result.data.ok) {
      messageSuccess("删除成功");
      getData(); //重新获取数据更新页面
    } else {
      messageError("删除失败");
    }
  };
  const cancel = (e) => {};
  return (
    <div className="order-manage">
      <div className="operate-bar">
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size={"large"}
          onClick={handleDownload}
          loading={downloadLoading}
        >
          EXCEL
        </Button>
        <div className="search">
          <Search
            placeholder="please search userid"
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
            onChange={handleChange}
          />
        </div>
      </div>
      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={tableData}
        loading={load || loading}
        scroll={{ x: true }}
      />
    </div>
  );
};
export default OrderManage;
