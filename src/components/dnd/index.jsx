/**
 * filename: Container
 * overview: 整个拖拽演示界面
 */

import React, { useEffect, useState } from "react";
import Box from "./box";
import List from "./List";
import "./index.scss";

const boxs = [
  { id: 1, category: "Apple", bg: "red" },
  { id: 2, category: "Banana", bg: "yellow" },
  { id: 3, category: "Orange", bg: "orange" },
  { id: 4, category: "Grape", bg: "purple" },
  { id: 5, category: "Watermelon", bg: "green" },
  { id: 6, category: "Peach", bg: "pink" },
];

const Container = () => {
  const [cardList, setCardList] = useState([]);
  const [cardTwoList, setCardTwoList] = useState([]);
  const [dropType, setDropType] = useState(null);
  let timer = null; // 定时器

  const changeCardList = (list) => {
    setCardList([...list]);
  };

  const changeCardListtwo = (list) => {
    setCardTwoList([...list]);
  };
  const getLeft = () => {
    const dom = document.querySelector(".scroll");
    if (dom.scrollLeft > 0) {
      dom.scrollTo(dom.scrollLeft - 50, 0);
    }
  };

  const getRight = () => {
    const dom = document.querySelector(".scroll");
    if (dom.scrollLeft < dom.scrollWidth - dom.clientWidth) {
      dom.scrollTo(dom.scrollLeft + 50, 0);
    }
  };

  return (
    <div>
      <button onClick={getLeft}>&lt;</button>
      <button onClick={getRight}>&gt;</button>
      <div className="scroll">
        {boxs.map((it) => (
          <div style={{}}>{it.category}</div>
        ))}
      </div>
      {/* {boxs.map((item) => (
        <Box
          key={item.id}
          type={dropType}
          {...item}
          setDropType={setDropType}
          cardList={cardList}
          changeCardList={changeCardList}
          cardTwoList={cardTwoList}
          changeCardListtwo={changeCardListtwo}
        />
      ))}
      <List
        cardList={cardList}
        changeCardList={changeCardList}
        twoList={cardTwoList}
        twoChange={changeCardListtwo}
        setDropType={setDropType}
        type="card"
        dropType={dropType}
      />
      <List
        cardList={cardTwoList}
        changeCardList={changeCardListtwo}
        twoList={cardList}
        twoChange={changeCardList}
        setDropType={setDropType}
        type="cardTwo"
        dropType={dropType}
      /> */}
    </div>
  );
};

export default Container;
