import React, { useEffect, useState } from "react";
import moment from "moment/moment";;

export default function Time() {
  const [time, setTime] = useState('')

  useEffect(()=>{
    const s = setInterval(() =>{
      setTime(moment().format('YYYY-MM-DD HH:mm:ss'))
    }, 1000)
    return ()=>{
      clearInterval(s)
    }
  })

  return (
    <div style={{display: 'flex', justifyContent: 'center', fontSize: '40px'}}>
      <div>{time}</div>
    </div>
  );
}
