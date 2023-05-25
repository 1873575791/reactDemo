import React, { useEffect } from "react";
import { WOW } from "wowjs";
import "./index.scss";

import 'animate.css';
import "../../../node_modules/wowjs/css/libs/animate.css";

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
    <div>
      <div
        className="wow animate__jackInTheBox header"
        // data-wow-duration="2s"
        // data-wow-delay="7s"
      >
        123
      </div>

      <div
        className="wow slideInRight content"
        // data-wow-duration="2s"
        // data-wow-delay="7s"
      >
        123
      </div>
      <div
        className="wow rollIn content"
        // data-wow-duration="2s"
        // data-wow-delay="7s"
      >
        123
      </div>
      <div
        className="wow bounceIn content"
        // data-wow-duration="2s"
        // data-wow-delay="7s"
      >
        123
      </div>
      <div
        className="wow bounceInUp content"
        // data-wow-duration="2s"
        // data-wow-delay="7s"
      >
        123
      </div>
      <div
        className="wow bounceInDown content"
        // data-wow-duration="2s"
        // data-wow-delay="7s"
      >
        123
      </div>
      <div
        className="wow bounceInLeft content"
        // data-wow-duration="2s"
        // data-wow-delay="7s"
      >
        123
      </div>
      <div
        className="wow bounceInRight content"
        // data-wow-duration="2s"
        // data-wow-delay="7s"
      >
        123
      </div>
      <div
        className="wow lightSpeedIn content"
        // data-wow-duration="2s"
        // data-wow-delay="7s"
      >
        123
      </div>
      <div
        className="wow pulse content"
        // data-wow-duration="2s"
        // data-wow-delay="7s"
      >
        123
      </div>
      <div
        className="wow flipInX content"
        // data-wow-duration="2s"
        // data-wow-delay="7s"
      >
        123
      </div>
      <div
        className="wow flipInY content"
        // data-wow-duration="2s"
        // data-wow-delay="7s"
      >
        123
      </div>
    </div>
  );
}
