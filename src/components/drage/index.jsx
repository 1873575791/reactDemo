import React, { useRef } from "react";
import 'animate.css'

import './index.scss'
import { useState } from "react";
import { useEffect } from "react";
export default function Drage(){
  const clickDom = useRef();
  const listDom = useRef();
  const old = useRef([]);
  const [list, setList] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);

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
    last(listDom.current.children)
  }

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
        dom.style.transition = 'all 300ms'
        dom.style.transform = ''
      })
      dom.addEventListener('transitionend', () => {
        dom.style.transition = ''
        cancelAnimationFrame(rafId)
      })
    }
  }
}

useEffect(()=>{
  last(listDom.current.children)
},[])

  return <div>
    <button onClick={() => {
      setList([1,2,3,4,5,6,7,8,9,10,11,12]);
      record(listDom.current.children)
    }}>恢复</button>
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