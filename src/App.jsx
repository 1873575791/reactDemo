import React, { useEffect } from "react";
// import TextMove from "./components/textMove";
// import MyEditor from "./components/Editor";
// import Grid from "./components/grid";
// import PDF from "./components/PDF";
// import DateCom from "./components/DateCom";
// import CreateDate from "./components/createDate";
import { Button } from 'antd';
import { hashCode } from './utils/hashCode'
// import Audio from "./components/audio";
import mp4 from './asstes/巡光.mp3'
import "./App.scss";

export default function App() {

  const a = {
    elevatorName: "深感产业园1栋1单元",
    alarmTime: "2020-12-02",
    tag: true,
    children: {
      elevatorName: "奥里奥克1栋1单元",
      alarmTime: "2020-12-06",
    },
    data:[{
      elevatorName: '深感产业园1栋2单元',
      alarmTime: '2020-12-02',
      tag: true
    }]
  };

  const b = {
    elevatorName: "深感产业园1栋1单元",
    alarmTime: "2020-12-02",
    tag: true,
    children: {
      elevatorName: "奥里奥克1栋1单元",
      alarmTime: "2020-12-06",
    },
    data:[{
      elevatorName: '深感产业园1栋2单元',
      alarmTime: '2020-12-02',
      tag: true
    }]
  }
  const getEditorHtml = (html) =>{
    console.log(html)
  }

  const onClick = () => {
    console.log(hashCode(a), hashCode(b), hashCode(a) === hashCode(b))
  }
  return (
    <div className="box">
      <Button type="primary" onClick={onClick}>Primary Button</Button>
      {/* <TextMove lists={data}/>
        <MyEditor content={'<p></p>'} getEditorHtml={getEditorHtml} readOnly={false} isPreview={true} /> */}
      {/* <Grid /> */}
      {/* <PDF /> */}
      {/* <DateCom /> */}
      {/* <CreateDate /> */}
      {/* <Audio src={mp4} id={123} /> */}
    </div>
  );
}
