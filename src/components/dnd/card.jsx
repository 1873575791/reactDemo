/**
 * filename: Card
 * overview: 根据放入 Box 生成的 Card 组件
 */

import React, { useRef, useMemo } from 'react';
import { XYCoord } from 'dnd-core';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

const Card = ({ bg, category, index, moveCard, id, type, twoChange, twoList, dropType }) => {
    const ref = useRef(null);

    const [{ isDragging }, drag, dragPreview] = useDrag({
        type: 'card',
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        item: { bg, category, index, moveCard, id, type },
        end(item, monitor) {

            // const uselessIndex = cardList.findIndex((item) => item.id === -1);

            // /**
            //  * 拖拽结束时，判断是否将拖拽元素放入了目标接收组件中
            //  *  1、如果是，则使用真正传入的 box 元素代替占位元素
            //  *  2、如果否，则将占位元素删除
            //  */
            
            // if (type !== dropType){
            //     const data = twoList.push(item);
            //     twoChange(data);
            //     console.log(type, dropType, twoList);
            // }

            // if (monitor.didDrop()) {
            //     cardList.splice(uselessIndex, 1, { ...monitor.getItem(), id: id++ });
            //     // cardTwoList.splice(uselessIndex, 1, { ...monitor.getItem(), id: id++ });
            // } else {
            //     cardList.splice(uselessIndex, 1);
            //     // cardTwoList.splice(uselessIndex, 1);
            // }
            // // 更新 cardList 数据源
            // changeCardList(cardList);
            // // changeCardList(cardTwoList);
        },
    });

    const [, drop] = useDrop({
        accept: 'card',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // 拖拽元素下标与鼠标悬浮元素下标一致时，不进行操作
            if (dragIndex === hoverIndex) {
                return;
            }

            // 确定屏幕上矩形范围
            const hoverBoundingRect = ref.current.getBoundingClientRect();

            // 获取中点垂直坐标
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // 确定鼠标位置
            const clientOffset = monitor.getClientOffset();

            // 获取距顶部距离
            const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

            /**
             * 只在鼠标越过一半物品高度时执行移动。
             *
             * 当向下拖动时，仅当光标低于50%时才移动。
             * 当向上拖动时，仅当光标在50%以上时才移动。
             *
             * 可以防止鼠标位于元素一半高度时元素抖动的状况
             */

            // 向下拖动
            // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            //     return;
            // }

            // // 向上拖动
            // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            //     return;
            // }

            // 执行 move 回调函数
            moveCard(dragIndex, hoverIndex, item.type, item);

            /**
             * 如果拖拽的组件为 Box，则 dragIndex 为 undefined，此时不对 item 的 index 进行修改
             * 如果拖拽的组件为 Card，则将 hoverIndex 赋值给 item 的 index 属性
             */
            if (item.index !== undefined) {
                item.index = hoverIndex;
            }
        },
    });

    const style = useMemo(() => ({
        position: 'relative',
        background: bg,
        margin: '16px 6px',
        // Card 为占位元素是，透明度 0.4，拖拽状态时透明度 0.2，正常情况透明度为 1
        opacity: id === -1 ? 0.4 : isDragging ? 0.2 : 1,
        verticalAlign: 40,
        // width: 288,
        textAlign: 'center'
        // transform: `scale(1) translate(${ getSourceClientOffset?.x }px, ${ getSourceClientOffset?.y }px)`
    }), [bg, id, isDragging]);

    /**
     * 使用 drag 和 drop 对 ref 进行包裹，则组件既可以进行拖拽也可以接收拖拽组件
     * 使用 dragPreview 包裹组件，可以实现拖动时预览该组件的效果
     */
    drag(drop(ref));
    dragPreview(ref);

    return (
        <div ref={ref} style={style}>
            {category}
        </div>
    );
};

export default Card;