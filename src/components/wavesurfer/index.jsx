import React, { useEffect } from "react";
import { useState } from "react";
import WaveSurfer from 'wavesurfer.js' //导入wavesurfer.js
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js' //导入时间轴插件
import audio from '../../asstes/巡光.mp3';

export default function Wavesurfer(){

  const [wavesurfer, setWavesurfer] = useState();

  useEffect(()=>{
    drawPlay()
  },[])

  const drawPlay=()=>{
    const wavesurfer = WaveSurfer.create({
        container: '.wav',//容器
        waveColor: 'red',//波形图颜色
        progressColor: '#159faf',//进度条颜色
        backend: 'MediaElement',
        mediaControls: true,
        audioRate: '1',//播放音频的速度
        //插件
        plugins: [
            //时间轴插件
            // Timeline.create({
            //     container: '#wave-timeline'
            // }),
            // 光标插件
            // CursorPlugin.create({
            //     showTime: true,
            //     opacity: 1,
            //     customShowTimeStyle: {
            //         backgroundColor: '#000',
            //         color: '#fff',
            //         padding: '2px',
            //         fontSize: '10px'
            //     }
            // }),
        ]
    });
    // 特别提醒：此处需要使用require(相对路径)，否则会报错
    wavesurfer.load(require('../../asstes/巡光.mp3'));
    setWavesurfer(wavesurfer)
  }

  return <div className="box">
    <div className="wav"></div>
    <div id="wave-timeline"></div>
    {/* <audio src={audio} controls></audio> */}
  </div>
}