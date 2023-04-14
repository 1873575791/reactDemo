import React from "react";
import {
  useDroppable,
  useDraggable,
  DragOverlay,
  DragHandle,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export function Droppable({ parent }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    border: isOver ? "1px solid #000" : "1px solid red",
  };

  const style2 = {
    width: "300px",
    height: "300px",
    marginTop: "50px",
  };

  return (
    <div ref={setNodeRef} style={{ ...style, ...style2 }}>
      {/* <SortableContext items={parent} strategy={verticalListSortingStrategy}>
        {parent.map((val,index) => (
          <Item key={val} id={val} />
        ))}
      </SortableContext> */}
      {parent.map((val) => (
        <Draggable id={val} key={val}>{val}</Draggable>
      ))}
    </div>
  );
}

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      className="btn"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
}
export function Item(props) {
  const { id } = props;
  const { setNodeRef, listeners, transform, transition, attributes } =
    useSortable({ id });
  const styles = {
    transform: CSS.Transform.toString(transform),
    border: "1px solid red",
    marginTop: "10px",
    transition,
    width: "100px",
  };

  return (
    <div
      ref={setNodeRef}
      dragOverly
      {...attributes}
      {...listeners}
      style={styles}
    >
      {id}
    </div>
  );
}
