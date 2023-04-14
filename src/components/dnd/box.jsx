/**
 * filename: Box
 * overview: 用来承载界面最上方水果类型的 Box 组件
 */

import React from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';

let id = 1;

const Box = ({bg, category, cardList, changeCardList, cardTwoList, changeCardListtwo, type, setDropType}) => {
    
    const box = {
        bg,
        category,
    };
    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        item() {
            const useless = cardList.find((item) => item.id === -1);
            // 拖拽开始时，向 cardList 数据源中插入一个占位的元素，如果占位元素已经存在，不再重复插入
            if (!useless) {
                changeCardList([{ bg: "aqua", category: '放这里', id: -1 }, ...cardList]);
                changeCardListtwo([{ bg: "aqua", category: '放这里', id: -1 }, ...cardTwoList]);
            }
            return box;
        },
        end(item, monitor) {
            const uselessIndex = cardList.findIndex((item) => item.id === -1);
            const uselessIndexTwo = cardTwoList.findIndex((item) => item.id === -1);

            /**
             * 拖拽结束时，判断是否将拖拽元素放入了目标接收组件中
             *  1、如果是，则使用真正传入的 box 元素代替占位元素
             *  2、如果否，则将占位元素删除
             */

            if (monitor.didDrop()) {
                if (type === 'card') {
                    cardList.splice(uselessIndex, 1, { ...monitor.getItem(), id: id++ });
                    cardTwoList.splice(uselessIndexTwo, 1);
                } else {
                    cardTwoList.splice(uselessIndexTwo, 1, { ...monitor.getItem(), id: id++ });
                    cardList.splice(uselessIndex, 1);
                }

            } else {
                cardList.splice(uselessIndex, 1);
                cardTwoList.splice(uselessIndexTwo, 1);
            }
            // 更新 cardList 数据源
            changeCardList(cardList);
            changeCardListtwo(cardTwoList);
            setDropType(null)
        },
        
    });
    const style = {
        background: bg,
        display: 'inline-block',
        margin: 20,
        padding: '16px 30px',
        cursor: 'move',
        // translate: getDifferenceFromInitialOffset(),
        // transition: 'all 100ms'
        opacity: isDragging ? 0.2 : 1,
    }
    return (
        <div ref={ drag } style={ style } className={isDragging ? 'move' : ''}>{ category }</div>
    )
};

export default Box;