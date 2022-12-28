import "./index.scss";
import React, { PureComponent } from "react";

export default class TextMove extends PureComponent {
  constructor(props) {
    super(props);
    // 把父组件传入的arr转化成字符串 听说直接在constuctor里初始化数据是有问题?
    let { lists } = this.props;
    this.state = {
      // 数组文字转化后的字符串
      text: lists.map((item) => item.elevatorName).join(",")
    };
  }
  componentDidMount() {
    console.log(this.state.text);
    this.move();
  }
  move = () => {
    // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
    let width = document.getElementById("copy").getBoundingClientRect().width;
    let box = document.getElementById("box");
    // 文字副本填充
    let distance = 110; // 位移距离
    //设置位移
    this.t = setInterval(function () {
      // 如果位移超过文字宽度，则回到起点
      if (-distance >= width) {
        distance = 110;
      }else{
        distance = distance - 1;
      }
      box.style.transform = "translateX(" + distance + "px)";
    }, 50);
  };

  componentWillUnmount(){
    clearInterval(this.t)
  }
  render() {
    const { text } = this.state;
    return (
      <div className="wrap">
        <div id="box">
          <div id="copy">{text}</div>
        </div>
      </div>
    );
  }
}
