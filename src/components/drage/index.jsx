import React, { useRef } from "react";
import 'animate.css'

import './index.scss'
export default function Drage(){
  const clickDom = useRef();
  const listDom = useRef();

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
  }


const record = (eleAll) => {
  for( let i = 0;i < eleAll.length; i++ ) {
    const { top,left } = eleAll[i].getBoundingClientRect()
    eleAll[i]._top_ = top
    eleAll[i]._left_ = left
  }
}
 
 
 
const last = (eleAll)=> {
  for( let i = 0;i < eleAll.length; i++ ) {
    const dom = eleAll[i]
    const { top,left } = dom.getBoundingClientRect()
    if(dom._left_) {
      dom.style.transform = `scale(1) translate3d(${ dom._left_ - left }px, ${ dom._top_ - top }px,0px)`
 
      let rafId = requestAnimationFrame(function() {
        dom.style.transition = 'transform 200ms ease-out'
        dom.style.transform = 'none'
      })
      dom.addEventListener('transitionend', () => {
        dom.style.transition = 'none'
        cancelAnimationFrame(rafId)
      })
    }
  }
}

  return <div>
    <div 
    className="list"
    ref={listDom}
    onDragStart={onDragStart}
    onDragEnter={onDragEnter}
    onDragEnd={onDragEnd}
    onDragOver={(e) => e.preventDefault()}
    >
      <div draggable={true} className="list-item">1</div>
      <div draggable={true} className="list-item">2</div>
      <div draggable={true} className="list-item">3</div>
      <div draggable={true} className="list-item">4</div>
      <div draggable={true} className="list-item">5</div>
      <div draggable={true} className="list-item">6</div>
      <div draggable={true} className="list-item">7</div>
      <div draggable={true} className="list-item">8</div>
      <div draggable={true} className="list-item">9</div>
      <div draggable={true} className="list-item">10</div>
    </div>
  </div>
}