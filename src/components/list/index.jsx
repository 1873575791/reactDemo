import React from "react";

import "./index.scss";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
  }
  dragEnd(e) {
    const createList = document.querySelectorAll(".createElement");
    createList.forEach((item) => {
      item.remove();
    });
    this.dragged.style.display = "block";

    e.target.classList.remove("drag-up");
    this.over.classList.remove("drag-up");

    e.target.classList.remove("drag-down");
    this.over.classList.remove("drag-down");

    var data = this.state.data;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    data.splice(to, 0, data.splice(from, 1)[0]);

    //set newIndex to judge direction of drag and drop
    data = data.map((doc, index) => {
      doc.newIndex = index + 1;
      return doc;
    });

    this.setState({ data: data });
  }

  insterAfter = (newElement, targetElement) => {
    var parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  };

  dragOver(e) {
    e.preventDefault();
    const createList = document.querySelectorAll(".createElement");
    createList.forEach((item) => {
      item.remove();
    });
    e.target.classList.remove("drag-up", "drag-down");
    this.dragged.style.display = "none";

    if (e.target.tagName !== "LI") {
      return;
    }

    //判断当前拖拽target 和 经过的target 的 newIndex

    const parent = document.querySelector(".contain");
    const div = document.createElement("div");
    // console.log(div.style, e.target.classList);
    div.classList.add("createElement");
    let animateName = "";
    if (e.clientX - e.target.getBoundingClientRect().x <= 250 && e.clientX - e.target.getBoundingClientRect().x > 0) {
      animateName = "drag-down";
      parent.insertBefore(div, e.target);
    } else {
      animateName = "drag-Up";
      this.insterAfter(div, e.target);
    }

    if (this.over && e.target.dataset.item !== this.over.dataset.item ) {
      this.over.classList.remove("drag-up", "drag-down");
    }

    if (!e.target.classList.contains(animateName)) {
      e.target.classList.add(animateName);
      this.over = e.target;
    }
  }
  render() {
    var listItems = this.state.data.map((item, i) => {
      return (
        <li
          data-id={i}
          key={i}
          style={{
            height: "60px",
            width: "500px",
            border: "solid 1px #cccccc",
            borderRadius: "5px",
            backgroundColor: "green",
            color: "#ffffff",
          }}
          draggable="true"
          onDragEnd={this.dragEnd.bind(this)}
          onDragStart={this.dragStart.bind(this)}
          onDragOver={this.dragOver.bind(this)}
          data-item={JSON.stringify(item)}
        >
          {item.color}
        </li>
      );
    });
    return <ul className="contain">{listItems}</ul>;
  }
}
