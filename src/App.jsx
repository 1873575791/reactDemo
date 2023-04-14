import React from "react";
// import { useTranslation } from 'react-i18next'
// import mp4 from './asstes/demo.mp4';
// import socket from './socket';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import TextMove from "./components/textMove";
// import MyEditor from "./components/Editor";
// import Grid from "./components/grid";
// import PDF from "./components/PDF";
// import DateCom from "./components/DateCom";
// import CreateDate from "./components/createDate";
// import Audio from "./components/audio";
// import mp4 from './asstes/demo.mp4'
// import ComparisonObject from "./components/ComparisonObject";
// import Loading from "./components/loading";
// import Time from "./components/time";
// import Clock from "./components/clock";
// import Video from "./components/video";
// import wanhao from './asstes/腕豪.mp4'
// import NewVideo from "./components/newVideo";
// import Home from "./components/listTwo";
// import List from "./components/list";
// import Drage from "./components/drage";
// import DND from "./components/dnd";
// import StudyDnD from "./components/studyDnD";
// import Locale from "./components/locale";
// import Wavesurfer from "./components/wavesurfer";
// import Study from "./components/study";
// import Animation from "./components/animation";
// import Echarts from "./components/echarts";
// import DndKit from "./components/dndKit";
// import ReactBeautifulDnd from "./components/ReactBeautifulDnd";
import Code from "./components/code";
import "./App.scss";

export default function App() {
  // const { i18n } = useTranslation()
  // const onReady = (play) => {
  //   console.log("play====", play);
  //   // videoRef.current = play

  // };

  // const getPointerPosition = (el, event) =>{
  //   console.log(el, event)
  // }
//   useEffect(() =>{
//     console.log(socket.connected); // socket是否与服务器连接
// console.log(socket.disconnected); // socket是否与服务器断开连接
//     socket.open()
//     console.log(1)
//   },[])
  return (
    <div className="box">
      <Code />
      {/* <ReactBeautifulDnd /> */}
      {/* <DndKit /> */}
      {/* <Echarts /> */}
      {/* <Animation/> */}
      {/* <Study /> */}
      {/* <Locale i18n={i18n} /> */}
      {/* <Drage /> */}
      {/* <DndProvider backend={ HTML5Backend }> */}
        {/* <DND /> */}
        {/* <StudyDnD /> */}
      {/* </DndProvider> */}
      {/* <Wavesurfer /> */}
      {/* <TextMove lists={[{elevatorName: '这是我写的视频播放组件，厉害吧！'}]}/> */}
      {/* <MyEditor content={'<p></p>'} getEditorHtml={(value) => console.log(value)} readOnly={false} isPreview={true} /> */}
      {/* <Grid /> */}
      {/* <PDF /> */}
      {/* <DateCom /> */}
      {/* <CreateDate /> */}
      {/* <Audio src={mp4} id={123} /> */}
      {/* <ComparisonObject /> */}
      {/* <Loading /> */}
      {/* <Time /> */}
      {/* <Clock /> */}
      {/* <Video id={'123'} url={mp4} /> */}
      {/* <NewVideo
        onReady={onReady}
        options={{
          controls: true,
          autoSetup: false,
          playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
          autoplay: true, // 如果true,浏览器准备好时开始回放。
          muted: true, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: "zh-CN",
          aspectRatio: "16:5", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [
            {
              src: "https://osstest.jrdaimao.com/file/1672984612301130.mp4",
              type: "video/mp4",
            },
          ],
          audioPosterMode: false,
          poster: "", // 你的封面地址
          width: 700,
          notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: true,
            fullscreenToggle: true, // 全屏按钮
          },
          getPointerPosition: getPointerPosition
        }}
      /> */}
      {/* <List data={ [
        {
          newIndex: 1,
          color: "red"
        },

        {
          newIndex: 2,
          color: "green"
        },

        {
          newIndex: 3,
          color: "blue"
        },

        {
          newIndex: 4,
          color: "yellow"
        },

        {
          newIndex: 5,
          color: "orange"
        },

        {
          newIndex: 6,
          color: "black"
        }
      ]} /> */}
      {/* <Home /> */}
    </div>
  );
}
