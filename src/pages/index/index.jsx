import { Outlet, useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { useState } from "react";
import { useEffect } from "react";

import './index.scss';

export default function Index() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("/index/code");
  const routerList = [
    {
      label: '代码编辑器',
      key: '/index/code',
      children: <></>,
    },
    {
      label: '页面滚动动画',
      key: '/index/animation',
      children: <></>,
    },
    {
      label: 'PDF预览',
      key: '/index/PDF',
      children: <></>,
    },
    {
      label: 'Grid布局',
      key: '/index/Grid',
      children: <></>,
    },
    {
      label: '虚拟滚动',
      key: '/index/virtualScroll',
      children: <></>,
    },
    {
      label: '弹框和锚点',
      key: '/index/myDom',
      children: <></>,
    },
  ]

  const onChange = (key) => {
    setUrl(key);
  }

  useEffect(() => {
    navigate(url);
  }, [url])
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={routerList}
      />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
