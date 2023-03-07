import React, { useMemo, useState, memo } from "react";
import { useCallback } from "react";

export default function Study(){
  const [num, setNum] = useState(0)
  const [num2, setNum2] = useState(3)
  

  const content = useMemo(()=>{
    console.log('我被调用了')
    return '这是memo' + num2
  }, [num2])

  const click = useCallback(() =>{
    setNum((num) => {
      console.log(num)
      return num += 1
    })
  },[])

  return <div>
    <div>{content}</div>
    <div>
      <h2>{num}</h2>
      <button onClick={click}>点击+</button>
    </div>
    <div><Child click={click}  /></div>
  </div>
}

const Child = memo(({click})=>{
  console.log('子组件更新')
  return <div>
    .....
    <button onClick={click}>dianji</button>
  </div>
})