import React, { useEffect } from "react";
import { WOW } from "wowjs";
import './index.scss'

import '../../../node_modules/wowjs/css/libs/animate.css'

export default function Animation() {
  useEffect(() => {
    const wow = new WOW({
      boxClass: "wow",
      nimateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: false,
    });
    wow.init();
  }, []);
  return (
    <div className="main">
      <div 
      className="wow flipInX header"
      // data-wow-duration="2s"
      // data-wow-delay="7s"
      >123</div>
    </div>
  );
}
