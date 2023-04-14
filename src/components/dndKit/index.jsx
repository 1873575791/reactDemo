import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./index.scss";

import { Draggable, Droppable, Item } from "./Droppable";
// import { Droppable } from "./Droppable";

export default function DndKit() {
  const [parent, setParent] = useState(["A", "B", "C"]);
  const [list, setList] = useState(["A", "B", "C"]);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  const onDragMove = (info) => {
    console.log(info)
    // const { active, over } = info;
    // const overId = over?.id
    // const dragItem = active.id
    // if(!overId) return

    // if (parent.some((it) => it === overId)) {
    //   console.log(info);
    //   // const dragItemIndex = parent.indexOf(overId);
    //   // parent.splice(dragItemIndex, 0 , dragItem);
    //   // setParent(parent);
    // } else {
    //   return
    // }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 0,
      },
    })
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // })
  );

  return (
    <DndContext sensors={sensors} onDragMove={onDragMove} onDragEnd={handleDragEnd}>
      {draggableMarkup}
      <Droppable parent={parent}>123</Droppable>

        {/* <SortableContext items={parent} strategy={verticalListSortingStrategy}>
        {parent.map((val,index) => (
          <Item key={val} id={val} />
        ))}
      </SortableContext> */}
      
    </DndContext>
  );

  function handleDragEnd(event) {
    // const { over, active } = event;
    console.log(event);
    // if (over === null) return;
    const { active, over } = event;
    if (over === null || active === null) return;
    const newData = [...parent, `${active.id}/${new Date() * 1}`];
    if (over.id === "droppable") {
      setParent(newData);
    } else {
      setParent((parent) => {
        const oldIndex = parent.indexOf(active.id);
        const newIndex = parent.indexOf(over.id);

        return arrayMove(parent, oldIndex, newIndex);
      });
    }
    // console.log(
    //   activeIndex,
    //   overIndex,
    //   // arrayMove(parent, activeIndex, overIndex)
    // );
    // setParent(newData);
  }
}
