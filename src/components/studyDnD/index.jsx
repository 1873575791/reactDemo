import React, { useState } from "react";
import Item from "./item";

export default function StudyDnD(){
  const [list] = useState([1,2,3,4,5,6]);
  return <div>
    {
      list.map(item => <Item list={list} key={item} item={item} />)
    }
  </div>
}