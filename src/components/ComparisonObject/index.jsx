import React from "react";
import { Button } from "antd";
import { hashCode } from "../../utils/hashCode";

export default function ComparisonObject() {
  const a = {
    elevatorName: "深感产业园1栋1单元",
    alarmTime: "2020-12-02",
    tag: true,
    children: {
      elevatorName: "奥里奥克1栋1单元",
      alarmTime: "2020-12-06",
    },
    data: [
      {
        elevatorName: "深感产业园1栋2单元",
        alarmTime: "2020-12-02",
        tag: true,
      },
    ],
  };

  const b = {
    elevatorName: "深感产业园1栋1单元",
    alarmTime: "2020-12-02",
    tag: true,
    children: {
      elevatorName: "奥里奥克1栋1单元",
      alarmTime: "2020-12-06",
    },
    data: [
      {
        elevatorName: "深感产业园1栋2单元",
        alarmTime: "2020-12-02",
        tag: true,
      },
    ],
  };

  const onClick = () => {
    console.log(hashCode(a), hashCode(b), hashCode(a) === hashCode(b));
    // const hasCodeText = fs.readFileSync('../../utils/hashCode.js', 'utf-8')
  };
  return (
    <div>
      <Button type="primary" onClick={onClick}>
        Primary Button
      </Button>
    </div>
  );
}
