import React, { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';

const style = {
  width: '50px',
  height: '30px',
  background: 'red',
  border: '1px solid #000',
  margin: '5px 0'
}

export default function Item(props){
  const { item, list } = props;

  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'Item' ,
    collect: (monitor) => {
      return { isDragging: monitor.isDragging() }
    },
    item: () => {
      return { type: 'Item', id: item, text: item }
    },
    end: (item) => {
      console.log(item)
    }
  }, [])

  const [, drop] = useDrop({
    accept: 'Item',
    hover: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
    },
    drop: (item) => {
      
    },
  });

  drag(drop(ref));

  return <div style={style} ref={ ref }>{item}</div>
}