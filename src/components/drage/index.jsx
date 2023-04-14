import React, { useRef, useLayoutEffect, useEffect } from "react";
import { QRCode } from 'antd';

import 'animate.css'

import './index.scss'
import { useState } from "react";
export default function Drage(){
  const clickDom = useRef();
  const listDom = useRef();
  const lastRectRef = useRef(new Map());
  const [list, setList] = useState([1,2,3,4,5,6,7,8]);

  // useEffect(() => {
  //   const currentRectMap = createChildrenElementMap(listDom.current);
	//   lastRectRef.current = currentRectMap;
  // }, [list]);

  const onDragStart = (e) =>{
    e.target.classList.add('animated', 'move')
    clickDom.current = e.target
  }

  const insterAfter = (newElement, targetElement) => {
    var parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  };

  const onDragEnter = (e) =>{
    e.preventDefault();
    record(listDom.current.children)
    if (e.target === listDom.current || e.target === clickDom.current){
      return;
    }
    const children = Array.from(listDom.current.children)
    const  sourceIndex = children.indexOf(clickDom.current)
    const targetIndex = children.indexOf(e.target)
    if (sourceIndex < targetIndex){
      insterAfter(clickDom.current, e.target)
    } else {
      listDom.current.insertBefore(clickDom.current, e.target)
    }
    last([clickDom.current, e.target])
  }

//   useLayoutEffect(() => {
//     // 这里获取到的是最新的状态信息，也就是最终状态
//     const currentRectMap = createChildrenElementMap(listDom.current);
//     // 对保存的上次状态的元素进行遍历
//     lastRectRef.current.forEach((prevNode, node) => {
//         // 由于DOM的属性变化后其引用是不会发生改变的，因此可以在currentRectMap中获取到其最终状态
//         const currentRect = currentRectMap.get(node);
//         // 计算位置信息的变化
//         const invert = {
//             left: prevNode.left - currentRect?.left,
//             top: prevNode.top - currentRect?.top,
//         };
//         // 设置动画过程
//         const keyframes = [
//             {
//                 transform: `translate(${invert.left}px, ${invert.top}px)`
//             },
//             {
//                 transform: `translate(0, 0)`
//             }
//         ];
//         // 执行动画
//         node.animate(keyframes, {
//             duration: 800,
//             easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
//         })
//     });
//     lastRectRef.current = currentRectMap;
// }, [list]);

  const onDragEnd = (e) =>{
    e.target.classList.remove('animated', 'move')
    const newArr = [];
    Array.from(listDom.current.children).forEach((item) => {
      const itemData = item.getAttribute('data-item');
      if (itemData !== null) {
        newArr.push(itemData);
      }
    });
    setList(newArr);
  }

//   const createChildrenElementMap = (listDom) => {
//     if (!listDom) {
//         return new Map();
//     }
//     // 获取到所有的子元素
//     const childNodes = Array.from(listDom.childNodes);
//     // 原元素作为KEY，其属性值作为VALUE
//     const result = new Map(childNodes.map(node => [node, node.getBoundingClientRect()]));
//     return result;
// }


const record = (eleAll) => {
  for( let i = 0;i < eleAll.length; i++ ) {
    const { top,left } = eleAll[i].getBoundingClientRect();
    eleAll[i]._top_ = top
    eleAll[i]._left_ = left
  }
}
 
 
 
const last = (eleAll)=> {
  for( let i = 0;i < eleAll.length; i++ ) {
    const dom = eleAll[i]
    const { top,left } = dom.getBoundingClientRect();
    if(dom._left_) {
      dom.style.transform = `scale(1) translate(${ dom._left_ - left }px, ${ dom._top_ - top }px)`
 
      let rafId = requestAnimationFrame(function() {
        dom.style.transition = 'all 100ms'
        dom.style.transform = ''
      })
      dom.addEventListener('transitionend', () => {
        dom.style.transition = ''
        cancelAnimationFrame(rafId)
      })
    }
  }
}


  return <div>
    <QRCode value="https://baidu.com/" />

    <div 
    className="list"
    ref={listDom}
    onDragStart={onDragStart}
    onDragEnter={onDragEnter}
    onDragEnd={onDragEnd}
    onDragOver={(e) => e.preventDefault()}
    >
      {
        list.map(item =>{
          return <div draggable={true} data-item={item} key={item} className="list-item">{item}</div>
        })
      }
    </div>
  </div>
}