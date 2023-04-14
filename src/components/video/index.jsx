import React, { useState, useEffect, useRef } from "react";
import { Slider, Button, Popover, Upload as Uploads, message } from "antd";
import {
  CaretRightOutlined,
  PauseOutlined,
  NotificationOutlined,
  RedditOutlined,
} from "@ant-design/icons";
import Upload from "@dm/img_oss";

import "./index.scss";

export default function Video({ url, id }) {
  const progress = useRef();
  const [allTime, setAllTime] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0);
  const [fileList, setFileList] = useState({});
  const [loading, setLoading] = useState(false); // 上传loading
  const [bufferTime, setBufferTime] = useState(0); // 缓冲进度
  const [bufferWidth, setBufferWidth] = useState(0); // 缓冲进度
  const [watchWidth, setWatchWidth] = useState(0); // 播放进度
  const [iconLeft, setIconLeft] = useState(-8); // icon位置
  const isDrag = useRef(false); // 是否可拖拽
  const total = useRef(0); // 总时间

  // 上传前检查附件类型和大小
  const checkFileSize = async (file) => {
    setLoading(true);
    const data = file;
    const fileType = ["mp4"];
    const str = data.name.split(".").pop().toLocaleLowerCase();

    if (fileType.indexOf(str) === -1) {
      message.error(`仅支持${fileType.join(",")}格式的文件`);
      setLoading(false);
      return false;
    }
    return true;
  };

  // 上传附件
  const handleUploadFile = async (file) => {
    const e = new Upload("juranapp-test");
    try {
      const obj = await e.upload(file.file);
      if (obj) {
        setFileList(obj);
        setLoading(false);
        message.success("上传成功");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // 上传文件参数
  const props = {
    beforeUpload: checkFileSize,
    customRequest: handleUploadFile,
    showUploadList: false,
  };

  // 开始播放
  const onPlay = () => {
    const audio = document.getElementById(`video${id}`);
    console.log(audio.readyState)
    if (audio.src === "") {
      message.info("暂无视频，请上传视频");
    } else {
      audio.play();
      setIsPlay(true);
    }
  };

  // 停止播放
  const onPause = (e) => {
    const audio = document.getElementById(`video${id}`);
    audio.pause();
    setIsPlay(false);
  };

  // 时间处理
  const formatSecond = (time) => {
    const second = Math.floor(time % 60);
    const minite = Math.floor(time / 60);
    return `${minite}:${second >= 10 ? second : `0${second}`}`;
  };

  // 改变音量
  const changeVolume = (value) => {
    const audio = document.getElementById(`video${id}`);
    audio.volume = value;
    setVolume(value);
  };

  // 视频播放前
  const onCanPlay = () => {
    const audio = document.getElementById(`video${id}`);
    setAllTime(audio.duration);
    total.current = audio.duration
    audio.volume = 0;
    setBufferTime(audio.buffered.end(0));
    setVolume(0);
    setBufferTime(0);
  };

  // 当前播放位置改变时执行
  const onTimeUpdate = () => {
    const audio = document.getElementById(`video${id}`);
    if (allTime !== 0 && audio.currentTime > audio.buffered.end(0)) {
      console.log("进度超过缓冲");
      audio.pause();
      setIsPlay(false);
    }
    if (audio.readyState === 4){
      setBufferTime(audio.buffered.end(0));
    }
    setCurrentTime(audio.currentTime);
    if (audio.currentTime === audio.duration) {
      audio.currentTime = 0;
      audio.pause();
      setCurrentTime(0);
      setIsPlay(false);
      setBufferTime(audio.buffered.end(0));
    }
  };

  const content = (
    <div>
      <Slider
        vertical
        style={{ height: 100 }}
        step={0.01}
        max={1}
        value={volume}
        tooltip={{
          open: false,
        }}
        onChange={changeVolume}
      />
      <span>{`${(volume * 100).toFixed(0)}%`}</span>
    </div>
  );

  // 视频停止
  const onWaiting = () => {
    if (currentTime !== 0) {
      console.log("停止了");
    }
  };

  // 监听播放进度
  useEffect(() => {
    const width = progress.current.getBoundingClientRect().width;
    const num = width / allTime;
    setIconLeft(currentTime * num);
    setWatchWidth(currentTime * num);
  }, [currentTime]);

  // 监听缓冲进度
  useEffect(() => {
    const width = progress.current.getBoundingClientRect().width;
    const num = width / allTime;
    setBufferWidth(bufferTime * num);
  }, [bufferTime]);

  // 缓冲时
  const onProgress = () => {
    const audio = document.getElementById(`video${id}`);
    console.log('视频缓冲数据');
    if (audio.readyState === 4){
      setBufferTime(audio.buffered.end(0));
    }
  };

  // 视频加载成功
  const onLoadedMetadata = () => {
    console.log("加载成功");
  };

  // 进度条点击事件
  const progressClick = (e) => {
    const allWidth = progress.current.getBoundingClientRect().width;
    const audio = document.getElementById(`video${id}`);
    const num = allWidth / allTime;
    const width = e.pageX - 200 - 8;
    const time = width / num;
    audio.currentTime = time;
    setCurrentTime(time);
    if (time === audio.duration) {
      setIsPlay(false);
    }
  };

  // 鼠标按下
  const onMouseDown = (e) => {
    if (allTime !== 0) {
      isDrag.current = true;
    }
  };

  // 鼠标移动
  const onMouseMove = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (isDrag.current && total.current !== 0) {
      const icon = document.querySelector(".progressIcon");
      const width = progress.current.getBoundingClientRect().width;
      const iconWidth = icon.getBoundingClientRect();
      const leftPx = e.clientX - 200 - iconWidth.width / 2;
      const audio = document.getElementById(`video${id}`);
      if (leftPx >= -8 && leftPx <= width) {
        const num = width / total.current;
        const time = leftPx / num;
        audio.currentTime = time;
        setCurrentTime(time);
        icon.style.left = leftPx + "px";
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener("mousemove", (e) => onMouseMove(e));
    document.body.addEventListener("mouseup", (e) => onMouseUp(e));
    return () => {
      document.body.removeEventListener("mousemove", (e) => onMouseMove(e));
      document.body.removeEventListener("mouseup", (e) => onMouseUp(e));
    };
  }, []);

  // 鼠标抬起
  const onMouseUp = (e) => {
    e.stopPropagation()
    e.preventDefault()
    isDrag.current = false;
  };

  return (
    <div>
      <div className="video">
        <video
          id={`video${id}`}
          // src={fileList.url}
          src={url}
          // controls
          preload={"metadata"}
          onCanPlay={onCanPlay}
          onTimeUpdate={onTimeUpdate}
          onWaiting={onWaiting}
          onLoadedMetadata={onLoadedMetadata}
          onProgress={onProgress}
          onPlaying={() => console.log('因缓冲而暂停或停止')}
          onStalled={() => console.log('媒体数据不可用')}
          className="videoPlayer"
        />
        <div className="videoConsole">
          <div className="progressBar">
            {/* <Slider
              step={0.01}
              max={allTime}
              value={currentTime}
              onChange={changeTime}
              tooltip={{
                formatter: (value) => <span>{`${formatSecond(value)}`}</span>,
              }}
            /> */}
          </div>
          <div className="duration">
            <div>{formatSecond(currentTime)}</div>
            <div>{formatSecond(allTime)}</div>
          </div>
          <div>
            <div className="btn">
              <div></div>
              <div>
                {!isPlay ? (
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={onPlay}
                    title="播放"
                  >
                    <CaretRightOutlined />
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={onPause}
                    title="暂停"
                  >
                    <PauseOutlined />
                  </Button>
                )}
              </div>
              <div className="volume">
                <Popover content={content}>
                  <NotificationOutlined />
                </Popover>
                {/* <input
                type="range"
                step="0.1"
                max={1}
                value={volume}
                onChange={changeVolume}
              /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Uploads {...props}>
        <Button loading={loading} type="primary" ghost>
          点击上传视频
        </Button>
        <span style={{ marginLeft: "10px" }}>仅支持mp4格式</span>
      </Uploads>
      <div className="progressBar">
        <div>
          <div
            className="allTime"
            ref={progress}
            onClick={(e) => progressClick(e)}
          ></div>
          <div
            className="bufferTime"
            style={{ width: `${bufferWidth}px` }}
            onClick={(e) => progressClick(e)}
          ></div>
          <div
            className="watchTime"
            style={{ width: `${watchWidth}px` }}
            onClick={(e) => progressClick(e)}
          ></div>
          <div
            className="progressIcon"
            style={{ left: `${iconLeft}px` }}
            onMouseDown={(e) => onMouseDown(e)}
          >
            <RedditOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}
