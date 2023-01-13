import React, { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./index.scss";

export default function NewVideo({ options, onReady }) {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      }));
      // console.log(progress)
      // var Button = videojs.getComponent("Button");
      // var button = new Button(player, {
      //   controlText: "123",
      //   clickHandler: function (event) {
      //     videojs.log("Clicked");
      //     console.log(player);
      //     player.pause();
      //   },
      //   className: "vjs-visible-text",
      // });
      // player.getChild("ControlBar").addChild(button);
      // player.addChild('MouseTimeDisplay', {
      //   handleMouseMove:(event)=>{
      //     console.log(event)
      //   }
      // });
    } else {
      // you can update player here [update player through props]
      const player = playerRef.current;
      console.log("playerplayerplayer===", player);
      player.src(options.sources[0].src);
      player.autoplay(true);
    }
  }, [options, videoRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-theme-city" />
    </div>
  );
}
