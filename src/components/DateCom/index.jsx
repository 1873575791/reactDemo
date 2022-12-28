import React, { useState } from "react";
import {
  Button,
  Col,
  Row,
  Form,
  Input,
  Space,
  DatePicker,
  Table,
  Pagination,
} from "antd";
import { UnorderedListOutlined, CalendarOutlined } from "@ant-design/icons";
import { columns, data} from './config'

import "./index.scss";

export default function DateCom() {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [tabKey, setTabKey] = useState("list");

  const onChange = (page, pageSize) => {
    console.log("Page: ", page, "PageSize: ", pageSize);
  };

  // 重置
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className="DateCom">
      <div className="DateComHeader">
        <div>
          <span className="title">营销活动日历</span>
        </div>
        <div className="DateComHeaderOpe">
          <CalendarOutlined
            className={tabKey === "date" ? "icon active" : "icon"}
            onClick={() => setTabKey("date")}
          />
          <UnorderedListOutlined
            className={tabKey === "list" ? "icon active" : "icon"}
            onClick={() => setTabKey("list")}
          />
          <Button type="primary">创建营销日历</Button>
        </div>
      </div>
      {tabKey === "list" && (
        <div className="DateComList">
          <div className="DateComFilter">
            <Form labelAlign="right" labelCol={{ span: 6 }} form={form}>
              <Row>
                <Col span={8}>
                  <Form.Item name="dateRange" label="活动时间">
                    <RangePicker />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="name" label="活动名称">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="theme" label="活动主题">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}></Col>
                <Col span={8}></Col>
                <Col span={8}>
                  <Space className="adverFilterBtn">
                    <Button onClick={onReset}>重置</Button>
                    <Button type="primary">查询</Button>
                  </Space>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="DateComTable">
            <Table columns={columns} scroll={{ x: 1300 }} dataSource={data} pagination={false} />
            <div className="pagination">
              <Pagination
              showQuickJumper
              defaultCurrent={2}
              total={500}
              onChange={onChange}
              showTotal={(total) => `共 ${total} 条`}
            />
            </div>
            
          </div>
        </div>
      )}
      {tabKey === "date" && (
        <div className="DateComDate">
          <div>日历</div>
        </div>
      )}
    </div>
  );
}
