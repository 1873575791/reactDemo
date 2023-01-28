import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import DndSortable, {arrayMove} from "react-dragger-sort";

const Home = (props) => {
  const [part1, setPart1] = useState([1, 2, 3, 4, 5])

  // const onUpdate = (params) => {
  //   const { from, to } = params;
  //   const formIndex = from?.index
  //   const toIndex = to?.index
  //   console.log(params, 'the same group', formIndex, toIndex);
  //   // do something ...
  // }

//   const onDragMoveEnd = (tag, coverChild) => {
//     // if (tag && coverChild) {
//         const preIndex = part1?.findIndex((item) => item === tag?.id);
//         const nextIndex = part1?.findIndex((item) => item === coverChild?.id)
//         const newArr = arrayMove(arr, preIndex, nextIndex);
//         console.log(newArr, tag, coverChild)
//         setPart1(newArr);
//     // }
// }

useEffect(()=>{
  console.log(part1)
}, [part1])

  const onEnd = (params) => {
    const { from, to } = params;
    const formIndex = from?.index
    const toIndex = to?.index

    // const newArr = arrayMove(part1, formIndex, toIndex)
    // console.log(newArr)
    part1.splice(toIndex, 0, part1.splice(formIndex, 1)[0]);
    // const data = part1.map((doc, index) => {
    //   doc = index + 1;
    //   return doc;
    // })
    // console.log(params)
    console.log(part1);
    setPart1(part1)
  }

  return (
    <div>
      <p>part1</p>
      <DndSortable 
        onEnd={onEnd}
        collection={{ group: 'part1' }} // custome props
        style={{ display: 'flex', flexWrap: 'wrap', background: 'blue', width: '200px', marginTop: '10px' }}
        options={{
          hiddenFrom: true
      }}>
        {
          part1?.map((item, index) => (<div style={{margin: '20px', width: '50px', height: '50px', backgroundColor: 'red', border: '1px solid green' }} key={index}>{item}</div>))
        }
      </DndSortable >
    </div>
  );
};

export default Home;