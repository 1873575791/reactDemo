import React, { useRef, useState, useEffect } from "react";
import GridLayout from "react-grid-layout";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "./index.scss";


export default function Grid() {
  const ref = useRef()
  const [width, setWidth] = useState(0); // 宽
  const [height, setHeight] = useState(0); // 宽
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 2 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];

  useEffect(()=>{
    console.log(ref.current.getBoundingClientRect())
    const {width, height} = ref.current.getBoundingClientRect()
    setWidth(width)
    setHeight(height)
  }, [ref])
  return (
    <div className="gridMain" ref={ref}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        isBounded={true}
        width={width}
        style={{height: height}}
      >
        <div className="box" key="a">
          <div onMouseDown={(e) => e.stopPropagation()}>a</div>
        </div>
        <div className="box" key="b">b</div>
        <div className="box" key="c">c</div>
      </GridLayout>
    </div>
  );
}
