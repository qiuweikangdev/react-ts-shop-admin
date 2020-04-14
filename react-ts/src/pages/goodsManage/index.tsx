import React,{ useEffect,useState,useMemo } from 'react'
import { Table, Input, Avatar, Button, Popconfirm, message  } from 'antd';
import { messageError,messageSuccess,messageWarning} from '@/utils/message'
import { DownloadOutlined } from '@ant-design/icons';
import { getGoodsData,searchGoods,deleteGoodsID  } from '@/api/shop'
import './index.less'
const { Search } = Input;
const { Column  } = Table;
const GoodsManage = ()=>{
  const [tableData,settableData]=useState([])
  const [loading,setLoading ] =useState(true)
  const [value,setValue ] =useState(null)
  const [downloadLoading,setDownloadLoading ] =useState(false)
  const [multipleSelection,setMultipleSelection ] =useState([]) //选择要导出的数据
  const [selectedRowKey,setSelectedRowKey] = useState([])  //选中的key
    useEffect(()=>{
       getData()  //获取数据
  },[])
 
    const getData =async ()=>{
        let result = await getGoodsData()
        console.log(result,'resut')
        let data = dealData(result.data.data)
        settableData(data)
        setLoading(false)
    }
    let load = useMemo(()=>{
        if(tableData.length>0 || value){
            return false
        }else{
            return true
        }
  },[tableData])
    const dealData =(data)=>{
      let arr:any = []
      if(data && data.length>0){
         data.map((item)=>{
            let obj:any ={}
            obj.key = item.goods_serial_number
            obj.name = item.product_name
            obj.presentPrice =  item.present_price
            obj.originPrice =  item.origin_price
            obj.likeNum =  item.like_num
            obj.amount =  item.amount
            arr.push(obj)
         })
      }
      return arr
    }
    const handleChange = ()=>{

    }
    // '商品编号','商品名称','销售价格','原有价格','用户点赞','库存数量'
 const header =[{
    prop:'key',
    label:'商品编号'
 },{
  prop:'name',
  label:'商品名称'
},{
  prop:'presentPrice',
  label:'销售价格'
},{
  prop:'originPrice',
  label:'原有价格'
},{
  prop:'likeNum',
  label:'用户点赞'
},{
  prop:'amount',
  label:'库存数量'
},{
  prop:'operate',
  label:'操作'
}]
 const columns:any= []
  for(let i=0;i<header.length;++i){
       let obj = {}
       obj['title'] = header[i].label
       obj['dataIndex'] = header[i].prop
       obj['align'] ='center'
      if(header[i].prop.includes('operate')){
          obj['title'] = header[i].label
          obj['dataIndex'] = header[i].prop
          obj['fixed'] ='right'
          obj['render']=(text, record, index)=>(
            <Popconfirm
                  title="确定删除吗?"
                  onConfirm={()=>handleConfirm(record)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
              <a>删除</a>
            </Popconfirm>
            )
      }
      columns.push(obj)
  }
    // const columns:any  = [
    //     {
    //       title: '商品编号',
    //       dataIndex: 'key',
    //       align:'center',
    //     },
    //     {
    //       title: '商品名称',
    //       dataIndex: 'name',
    //       width: '25%',
    //       align:'center'
    //     },
    //     {
    //         title: '销售价格',
    //         dataIndex: 'presentPrice',
    //         width: '10%',
    //         align:'center'
    //       },
    //       {
    //         title: '原有价格',
    //         dataIndex: 'originPrice',
    //         width: '10%',
    //         align:'center'
    //       },
    //       {
    //         title: '用户点赞',
    //         dataIndex: 'likeNum',
    //         width: '10%',
    //         align:'center'
    //       },
    //       {
    //         title: '库存数量',
    //         dataIndex: 'amount',
    //         width: '10%',
    //         align:'center'
    //       },
    //     { title: '操作',  fixed: 'right', width: 50,render: (text, record, index)=>
    //       //  <a>删除</a>
    //       <Popconfirm
    //       title="确定删除吗?"
    //       onConfirm={()=>handleConfirm(record)}
    //       onCancel={cancel}
    //       okText="Yes"
    //       cancelText="No"
    //     >
    //     <a>删除</a>
    //     </Popconfirm>,
        
    //     },

    //   ];
      
      // const data = [
      //   {
      //     key: 1,
      //     name: 'John Brown sr.',
      //     address: 'New York No. 1 Lake Park',
      //   },
      //   {
      //     key: 2,
      //     name: 'Joe Black',
      //     address: 'Sidney No. 1 Lake Park',
      //   },
      // ];
      const handleSearch=async (value)=>{
        if(!value){
          messageWarning('请输入');
        }else{
             setLoading(true)
             let res = await searchGoods({name:value})
             console.log(res,'res')
                 if(!res.data.ok){
                 messageWarning(res.data.message);
                 setLoading(false)
               }else{
                settableData(dealData(res.data.message))
                setLoading(false)
               }
            
     
         }
    }
 
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
             setMultipleSelection(selectedRows)
             setSelectedRowKey(selectedRowKeys)
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
      selectedRowKeys:selectedRowKey,
        // onSelect: (record, selected, selectedRows) => {
        //    console.log(record, selected, selectedRows);
        // },
        // onSelectAll: (selected, selectedRows, changeRows) => {
        //   console.log(selected, selectedRows, changeRows);
        // }
      };
      //导出excel
    const handleDownload = ()=>{
      if(multipleSelection.length > 0){
        setDownloadLoading(true)
        import('@/assets/excel/Export2Excel').then(excel=>{
          const tHeader = ['id', 'name', 'present_price', 'origin_price', 'amount'] //excel标题
          const filterVal = ['key', 'name', 'presentPrice', 'originPrice', 'amount']
          const list = multipleSelection
          const data = formatJson(filterVal, list) //要导出的数据
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename:'goods',
          })
        })
        setSelectedRowKey([])  //取消全种
          setDownloadLoading(false)
      }else{
        messageWarning('请选择要导出的数据')
      }
      
    }
    const formatJson = (filterVal, jsonData)=>{
        return jsonData.map(v => filterVal.map(j => v[j]))
    }
    
     
    const handleConfirm = async (data)=>{    
      console.log(data,'data')
     const { key:goods_serial_number} = data
      // console.log(data,'data')
     let result =  await deleteGoodsID({goods_serial_number})
     if(result.data.ok){
            messageSuccess('删除成功')
             getData()  //重新获取数据更新页面
     }else{
          console.log(result)
          messageError('删除失败')
     }

  }
    const cancel = (e)=>{
    }

    return (
        <div className='goods-manage'>
            <div className='operate-bar'> 
            <Button type="primary" icon={<DownloadOutlined />} size={'large'} onClick={handleDownload} loading={downloadLoading}>
                   EXCEL
                </Button>
            <div className='search'>
            <Search
                        placeholder="please search product name"
                        enterButton="Search"
                        size="large"
                        onSearch={handleSearch}
                        onChange={handleChange}
                        />
            </div>
            </div>
             <Table columns={columns} rowSelection={rowSelection}  dataSource={tableData} loading={load || loading} scroll={{x:true}}/>
        </div>
    )
}
export default GoodsManage;