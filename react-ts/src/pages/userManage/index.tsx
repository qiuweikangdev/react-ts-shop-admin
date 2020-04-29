import React, {
  useEffect,
  memo,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import { Table, Input, Avatar, Popconfirm, message } from "antd";
import { connect } from "react-redux";
import { getUser } from "@/store/actions/userActions";
import { formatTime, getBase64 } from "@/utils";
import "./index.less";
import { searchUser, deleteUserID } from "../../api/user";
import { messageError, messageSuccess, messageWarning } from "@/utils/message";
const { Search } = Input;
const { Column } = Table;
interface IData {
  key: number;
  name: string;
  password: string;
  avatar: string;
  time: string;
}

const UserManage: React.FC = (props: any) => {
  const { userAll, getUser } = props;
  const [tableData, settableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);
  useEffect(() => {
    //获取用户
    getUser(); //组件挂载之后执行
    settableData(dealData(userAll)); //组件更新之后执行
    setLoading(false);
  }, [userAll.length]);
  const columns: any = [
    { title: "编号", dataIndex: "key", width: 50 },
    { title: "用户名", dataIndex: "name", width: 50 },
    {
      title: "密码",
      dataIndex: "password",
      width: 50,
      className: "column-password",
      ellipsis: true,
    },
    {
      title: "头像",
      dataIndex: "avatar",
      width: 50,
      className: "column-avatar",
      ellipsis: true,
      render: (text) => (
        <img src={"data:image/jpeg;base64," + getBase64(text)} alt="" />
      ),
    },
    { title: "创建时间", dataIndex: "time", width: 80, ellipsis: true },
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

  //处理表格数据
  const dealData = (data) => {
    let arr: any = [];
    if (data && data.length > 0) {
      data.map((item) => {
        let obj: any = {};
        obj.key = item.user_id;
        obj.time = formatTime(item.createAt);
        obj.name = item.username;
        obj.password = item.password;
        obj.avatar = item.avatar;
        arr.push(obj);
      });
    }
    return arr;
  };
  let load = useMemo(() => {
    if (tableData.length > 0 || value) {
      return false;
    } else {
      return true;
    }
  }, [tableData]);

  async function handleSearch(value) {
    if (!value) {
      messageWarning("请输入");
    } else {
      setLoading(true);
      let res = await searchUser({ username: value });
      if (!res.data.ok) {
        messageWarning(res.data.message);
        setLoading(false);
      }
      settableData(dealData(res.data.data));
      setLoading(false);
    }
  }
  const handleChange = (event) => {
    if (event.target.value === "") {
      settableData(dealData(userAll));
    } else {
      setValue(event.target.value);
    }
  };
  const handleConfirm = async (data) => {
    const { key: user_id } = data;
    let result = await deleteUserID({ user_id });
    if (result.data.ok) {
      messageSuccess("删除成功");
      getUser(); //重新获取数据更新页面
    } else {
      messageError("删除失败");
    }
  };
  const cancel = (e) => {};
  return (
    <div className="user-manage">
      <div className="search-bar">
        <div className="search">
          <Search
            placeholder="please search username"
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={tableData}
          loading={load || loading}
        />
      </div>
    </div>
  );
};

const mapStateProps = (state: any) => {
  return {
    userAll: state.user.userInfo,
  };
};
export default connect(mapStateProps, { getUser })(UserManage);
