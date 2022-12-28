import { Space, Tag } from "antd";
export const columns = [
  { title: "活动编号", dataIndex: "applyId", key: "applyId", width: 200 },
  { title: "活动名称", dataIndex: "applyName", key: "applyName" },
  {
    title: "活动主题",
    dataIndex: "positionName",
    key: "positionName",
    width: 200,
  },
  {
    title: "活动时间",
    dataIndex: "time",
    key: "time",
    width: 220,
  },
  {
    title: "活动级别",
    dataIndex: "level",
    key: "level",
    width: 100,
    render: (_, item)=> (
      <Space>
        { item.level === 'S' && <span className="textS" style={{padding: '1px 15px', fontSize: '15px', fontWeight: '600', borderRadius: '4px'}} color="magenta">{item.level}</span> }
        { item.level === 'A' && <span className="textA" style={{padding: '1px 15px', fontSize: '15px', fontWeight: '600', borderRadius: '4px'}} color="orange">{item.level}</span> }
        { item.level === 'B' && <span className="textB" style={{padding: '1px 15px', fontSize: '15px', fontWeight: '600', borderRadius: '4px'}} color="blue">{item.level}</span> }
        { item.level === 'C' && <span className="textC" style={{padding: '1px 15px', fontSize: '15px', fontWeight: '600', borderRadius: '4px'}} color="green">{item.level}</span> }
    </Space>
    )
    
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 200,
    render: (_, item) => (
      <Space>
        <span className="textColor">查看</span>
        <span className="textColor">修改</span>
        <span className="textColor">删除</span>
        <span className="textColor">终止</span>
      </Space>
    ),
  },
];

export const data = [
  {
    key: '1',
    applyId: '123',
    applyName: '123',
    positionName: '123',
    time: '12:22',
    level: 'B',
  },
  {
    key: '2',
    applyId: '123',
    applyName: '123',
    positionName: '123',
    time: '12:22',
    level: 'S',
  },
  {
    key: '3',
    applyId: '123',
    applyName: '123',
    positionName: '123',
    time: '12:22',
    level: 'A',
  },
  {
    key: '4',
    applyId: '123',
    applyName: '123',
    positionName: '123',
    time: '12:22',
    level: 'C',
  }
];
