import React, { useEffect, useState } from "react";
import Upload from "@dm/img_oss";
import moment from 'moment';
import {
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Upload as Uploads ,
  Modal,
  Row,
  Col,
  Table,
  Tooltip,
  message
} from "antd";
import { DeleteOutlined, DownloadOutlined, CopyOutlined } from "@ant-design/icons";

import backImg from "../../asstes/back.png";
import "./index.scss";

export default function CreateDate() {
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD'; // 时间格式
  const [fileSize, setFileSize] = useState(0); // 文件大小
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [rangeList, setRangeList] = useState([]); // 活动范围数据
  const [tableData, setTableData] = useState([{name: '张茂林', info: '修改主题', time: '2022-11-11 15:34:22'}])
  const options = [
    { value: "S" },
    { value: "A" },
    { value: "B" },
    { value: "C" },
  ]; // 下拉框选项
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0,
    showTotal: (total) => `共${total}条数据`,
  }); // 分页设置

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // 表格行
  const columns = [
    {
      title: '操作人',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '日志内容',
      dataIndex: 'info',
      key: 'info',
    },
    {
      title: '操作事件',
      dataIndex: 'time',
      key: 'time',
    },
  ];



   // 表格改变触发
   const handleChange = (page) => {
    pagination.current = page.current;
    pagination.pageSize = page.pageSize;
    pagination.total = page.total;
    setPagination({ ...pagination });
  };

  // 下载方法
  const download = (content, fileName) => {
    const blob = new Blob([content]);
    const url = window.URL.createObjectURL(blob);
    const dom = document.createElement("a");
    dom.style.display = "none";
    dom.href = url;
    dom.setAttribute("download", fileName);
    document.body.appendChild(dom);
    dom.click();
  };

   // 覆盖默认的上传行为，自定义自己的上传 视频
   const handleUploadFile = async (uploadFile) => {
    console.log(uploadFile, fileList)
    const e = new Upload('juranapp-test');
    try {
      // const obj = await IMGCLIENT.upload(
      //   {
      //     url,
      //     request,
      //     project,
      //   },
      //   uploadFile.file
      // );
      const obj = await e.upload(uploadFile.file)
      if (obj) {
        let arr = fileList.slice();
        arr.push({ ...obj,  status: 'done'});
        setFileList(arr);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkFileSize = (file) =>{
    console.log(file)
    const size = fileSize / (1024 * 1024);
    const data = file;
    const fileType = ['jpg','png','pdf','doc','xlsx','xls']
    const type = data.name.split(".").pop().toLocaleLowerCase();

    if (size > 10) {
      message.error('上传的所有文件限10M');
      return false
    }

    if (fileType.indexOf(type) === -1) {
      message.error(`仅支持${fileType.join(",")}格式的文件`);
      return false;
    }

    setFileSize(fileSize + file.size);
    return true
  }

  const onRemove = (file) => {
    let del = fileList.filter((item) => item.key !== file.key);;
    setFileList(del);
  };

  // 上传文件参数
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    customRequest: handleUploadFile,
    beforeUpload: checkFileSize,
    onRemove: onRemove,
    onDownload: (file) => download(backImg, "123.jpg"),
    multiple: true,
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: (
        <span>
          <DownloadOutlined />
        </span>
      ),
      showRemoveIcon: true,
      removeIcon: <DeleteOutlined />,
    },
  };

  // 选择获取范围
  const getRange = (value) =>{
    console.log(value);
    setRangeList(value)
  }

  // 复制文字
  const copyText = () =>{
    const text = rangeList.map(item => item.name).join('、')
    if (!text) {
      message.warning('没有内容')
      return;
    }
    // 创建text area
    const textArea = document.createElement('textarea')
    textArea.value = text
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = 'absolute'
    textArea.style.opacity = '0'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select() // 选中文本
    const successful = document.execCommand('copy') // 执行 copy 操作
    if (successful) {
      message.success('复制成功！')
    } else {
      message.warning('复制失败，请手动复制！')
    }
    textArea.remove()
  }

  // 日期处理函数
  const timeFormat = (data) => {
    let gmtCreatedStart = moment(data[0]).format(dateFormat);
    let gmtCreatedEnd = moment(data[1]).format(dateFormat);
    return [gmtCreatedStart, gmtCreatedEnd]
};

  // 确定点击
  const btnOk = async(type) =>{
    const data = await form.getFieldsValue();
    const time = data.time ? timeFormat(data.time) : [];
    if (type === '2'){
      form.resetFields();
      setRangeList([]);
      setFileList([]);
      setFileSize(0);
    }
    console.log(data, time, rangeList, fileList);
  }

  return (
    <div className="seeDate">
      <div className="seeDateHeader">
        <div>
          <img src={backImg} alt="" />
          <span>创建营销日历</span>
        </div>
        <div className="btnList">
          <Button>取消</Button>
          <Button type="primary" onClick={() => btnOk("1")}>
            确认
          </Button>
          <Button type="primary" onClick={() => btnOk("2")}>
            确认并新增
          </Button>
        </div>
      </div>
      <div className="seeDateFrom">
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <Form.Item label="活动名称" name="name" rules={[{ required: true }]}>
            <Input showCount maxLength={20} placeholder="请输入" />
          </Form.Item>
          <Form.Item label="活动主题" name="theme" rules={[{ required: true }]}>
            <Input showCount maxLength={20} placeholder="请输入" />
          </Form.Item>
          <Form.Item label="活动时间" name="time" rules={[{ required: true }]}>
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="活动级别" name="level" rules={[{ required: true }]}>
            <Select
              showArrow
              style={{ width: "100%" }}
              options={options}
              placeholder="请选择"
            />
          </Form.Item>
          <Form.Item label="活动预算" name="budget">
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              max={999999}
              addonAfter="万"
              placeholder="请输入"
            />
          </Form.Item>
          <Form.Item label="活动范围" name="range">
            <Button type="primary" ghost onClick={showModal}>
              选择活动范围
            </Button>
            {rangeList.length > 0 && (
              <div className="rangeText">
                <div className="rangeTextTop">已选范围：</div>
                <div className="rangeTextMain">
                  <div>
                    {rangeList.map((item, index) => {
                      if (index < 5) {
                        return (
                          <span>
                            {item.name}
                            {index === 4 || index === rangeList.length - 1
                              ? ""
                              : "、"}
                          </span>
                        );
                      }
                      return null;
                    })}
                    {rangeList.length > 5 ? "..." : ""}
                  </div>
                  <div>
                    <Tooltip placement="top" title="复制" className="icon">
                      <span onClick={copyText}>
                        <CopyOutlined />
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>
            )}
          </Form.Item>
          <Form.Item label="备注" name="remarks">
            <TextArea
              rows={4}
              placeholder="请输入"
              showCount
              maxLength={1000}
            />
          </Form.Item>
          <Form.Item label="上传附件" name="enclosure">
            <Uploads {...props} fileList={fileList}>
              <Button type="primary" ghost>
                点击上传附件
              </Button>
              <span className="tips">
                支持jpg、png、pdf、doc、xlsx、xls格式
              </span>
            </Uploads>
          </Form.Item>
        </Form>
        <Row>
          <Col span={9} push={7}>
            <div className="journal">
              <div className="journalHeader">修改日志：</div>
              <Table
                columns={columns}
                dataSource={tableData}
                key={tableData}
                pagination={pagination}
                onChange={handleChange}
              />
            </div>
          </Col>
        </Row>
      </div>
      {isModalOpen && (
        <RangeModel
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getRange={getRange}
          rangeList={rangeList}
        />
      )}
    </div>
  );
}

const RangeModel = ({ isModalOpen, setIsModalOpen, getRange, rangeList }) => {
  const [form] = Form.useForm();
  const [selectData, setSelectData] = useState([]); // 选中数据
  const [data, setData] = useState([]); // 渲染数据
  const [defaultSelected, setDefaultSelected] = useState([]); // 默认选中项
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0,
    showTotal: (total) => `共${total}条数据`,
  }); // 分页设置

  useEffect(()=>{
    if(rangeList.length > 0){
      setDefaultSelected(rangeList.map(item => item.key));
    }
    setData([
      {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [
          {
            key: 11,
            name: 'John Brown',
            age: 42,
            address: 'New York No. 2 Lake Park',
            parentId: 1,
          },
          {
            key: 12,
            name: 'John Brown jr.',
            age: 30,
            address: 'New York No. 3 Lake Park',
            parentId: 1,
          },
          {
            key: 13,
            name: 'Jim Green sr.',
            age: 72,
            address: 'London No. 1 Lake Park',
            parentId: 1,
          },
        ],
      },
      {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        children: [
          {
            key: 14,
            name: 'John B',
            age: 42,
            address: 'New York No. 100 Lake Park',
            parentId: 2,
          },
          {
            key: 15,
            name: 'John Brown j.',
            age: 30,
            address: 'New York No. 3Park',
            parentId: 2,
          },
          {
            key: 16,
            name: 'Green sr.',
            age: 72,
            address: 'London No. 1 Lake',
            parentId: 2,
          },
        ],
      },
      {
        key: 3,
        name: 'Joe',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        children: [
          {
            key: 17,
            name: 'John B',
            age: 42,
            address: 'New York No. 100 Lake Park',
            parentId: 3,
          },
          {
            key: 18,
            name: 'John Brown j.',
            age: 30,
            address: 'New York No. 3Park',
            parentId: 3,
          },
          {
            key: 19,
            name: 'Green sr.',
            age: 72,
            address: 'London No. 1 Lake',
            parentId: 3,
          },
        ],
      }
    ])
  }, [rangeList])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '12%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      key: 'address',
    },
  ];

  
  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    defaultSelectedRowKeys: defaultSelected,
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      let newData = [];
      const obj = {};
      selectedRows.forEach(item=>{
        if(!item.parentId){
          newData.push(item);
        }else{
          if (obj[item.parentId]){
            obj[item.parentId].push(item);
          }else {
            obj[item.parentId] = [item];
          }
        }
      })
      data.forEach(item =>{
        if(obj[item.key] && item.children){
          if (item.children.length > obj[item.key].length){
            newData = [...newData, ...obj[item.key]];
          }
        }
      })
      setSelectData(newData);
    },
  };
  const handleOk = () => {
    setIsModalOpen(false);
    getRange(selectData)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 重置
  const onRest = () => {
    form.resetFields();
  };

  // 表格改变触发
  const handleChange = (page) => {
    pagination.current = page.current;
    pagination.pageSize = page.pageSize;
    pagination.total = page.total;
    setPagination({ ...pagination });
  };

  return (
    <Modal
      title="选择活动范围"
      open={isModalOpen}
      onOk={handleOk}
      style={{top: 180}}
      onCancel={handleCancel}
      width={750}
      maskClosable={false}
    >
      <div className="modelheader">
        <Form form={form} labelCol={{ span: 6 }}>
          <Row>
            <Col span={8}>
              <Form.Item label="分公司" name="office">
                <Input allowClear placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item label="门店" name="store">
                <Input allowClear placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={8} style={{display: 'flex', justifyContent: 'end'}}>
            <Button onClick={onRest} style={{marginRight: '8px'}}>重置</Button>
              <Button type="primary">搜索</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
      <Table
        columns={columns}
        rowSelection={{...rowSelection, checkStrictly: false}}
        dataSource={data}
        key={defaultSelected}
        pagination={pagination}
        onChange={handleChange}
        scroll={{ y: '500px' }}
      />
      </div>
    </Modal>
  );
};
