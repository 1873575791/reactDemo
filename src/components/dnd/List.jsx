/**
 * filename: List
 * overview: 用来存放下方 Card 列表的 List 组件
 */

import update from "immutability-helper";
import React, { CSSProperties, useCallback } from "react";
import { useDrop } from "react-dnd";
import Card from "./card";

const style = {
  width: 400,
  margin: "100px auto",
  lineHeight: "60px",
  border: "1px dashed black",
  overflow: "auto",
};

const List = ({ cardList, changeCardList, type, setDropType, twoChange, twoList, dropType }) => {
  const [collectProps, drop] = useDrop({
    accept: ["card"],
    collect: (minoter) => ({
      isOver: minoter.isOver(),
      canDrop: minoter.canDrop(),
    }),
    hover() {
      setDropType(type);
    },
  });

  const moveCard = useCallback(
    (dragIndex, hoverIndex, types, item) => {
      console.log(dragIndex, hoverIndex, types, item, dropType);
      /**
       * 1、如果此时拖拽的组件是 Box 组件，则 dragIndex 为 undefined，则此时修改，则此时修改 cardList 中的占位元素的位置即可
       * 2、如果此时拖拽的组件是 Card 组件，则 dragIndex 不为 undefined，此时替换 dragIndex 和 hoverIndex 位置的元素即可
       */
      if (dragIndex === undefined) {
        const lessIndex = cardList.findIndex((item) => item.id === -1);
        changeCardList(
          update(cardList, {
            $splice: [
              [lessIndex, 1],
              [hoverIndex, 0, { bg: "aqua", category: "放这里", id: -1 }],
            ],
          })
        );
      } else {
        if (types === type) {
          const dragCard = cardList[dragIndex];
          changeCardList(
            update(cardList, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
              ],
            })
          );
        } else {
          console.log(1);
          const lessIndex = cardList.findIndex((item) => item.id === -1);
        changeCardList(
          update(cardList, {
            $splice: [
              [lessIndex, 1],
              [hoverIndex, 0, { bg: "aqua", category: "放这里", id: -1 }],
            ],
          }))
        }
      }
    },
    [cardList]
  );

  const onDel = (id) => {
    console.log();
  };

  const isActive = collectProps.isOver && collectProps.canDrop;

  let backgroundColor = "";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (collectProps.canDrop) {
    backgroundColor = "darkkhaki";
  }

  // const bg = collectProps.isOver ? 'rgba(19, 160, 231, .5)' : '';
  const content = collectProps.canDrop
    ? "快松开，放到碗里来"
    : "将 Box 组件拖动到这里";

  return (
    <div style={{ ...style, backgroundColor }} ref={drop}>
      {cardList.length <= 0 ? (
        <div style={{ lineHeight: "60px", textAlign: "center" }}>
          请放入水果
        </div>
      ) : (
        cardList.map((item, index) => (
          <Card
            type={type}
            index={index}
            key={item.id}
            twoChange={twoChange}
            twoList={twoList}
            moveCard={moveCard}
            dropType={dropType}
            {...item}
          />
        ))
      )}
    </div>
  );
};

export default List;
