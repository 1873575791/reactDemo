import React, { useEffect } from "react";
import { WOW } from "wowjs";
import "./index.scss";

import 'animate.css';
import "../../../node_modules/wowjs/css/libs/animate.css";

export default function Animation() {

  const fnArr = (it) => {
    return it.name;
  }

  const fn = () => {
    console.log(1);
    const arr = [
      { key: '1', name: '这是1' },
      { key: '2', name: '这是2' },
      { key: '3', name: '这是3' },
      { key: '4', name: '这是4' },
      { key: '5', name: '这是5' },
  ];
    const data = arr.map(fnArr);
    console.log(data);
  }

  useEffect(() => {
    const wow = new WOW({
      boxClass: "wow",
      nimateClass: "animated", // animation css class (default is animated)
      offset: 0,
      mobile: true, // trigger animations on mobile devices (default is true)
      live: false,
    });
    wow.init();
    fn();
  }, []);
  return (
    <div className="animation">
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
