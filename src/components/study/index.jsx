import React, { useState, useEffect } from "react";

import "./index.scss";

export default function Study() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([1, 2, 3, 4, 5]);
  }, []);
  return (
    <div>
      <div>
        {list.map((item) => {
          return (
            <div className={"item" + item} key={item}>
              {item}
            </div>
          );
        })}
      </div>
      <div>
        <div className="ball"></div>
      </div>
      <div style={{ marginTop: '200px' }} className='add'>
        <span>+</span>
      </div>
    </div>
  );
}
