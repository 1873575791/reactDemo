import React, { useEffect, useState } from "react";
import * as echarts from 'echarts';

export default function Echarts(){
  const [gaugeOption, setGaugeOption] = useState({});
  const gaugeOptionFn = () =>{
    const myChart = echarts.init(document.querySelector('.gauge'));
    const option = {
      series: [
        {
          width: 100,
          radius: '120%',
          center: ['50%', '70%'],
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 240,
          splitNumber: 12,
          itemStyle: {
            color: '#58D9F9',
            shadowColor: 'rgba(0,138,255,0.45)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          },
          progress: {
            show: true,
            roundCap: true,
            width: 30
          },
          pointer: {
            show: false,
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 30
            }
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          title: {
            show: false
          },
          detail: {
            width: 78,
            height: 24,
            fontSize: 14,
            color: '#1890FF',
            borderColor: '#1890FF',
            borderRadius: 20,
            borderWidth: 1,
            backgroundColor: 'rgba(24, 144, 255, 0.05)',
            formatter: function (value) {
              return '{value|' + value.toFixed(2) + '%}';
            },
            offsetCenter: [0, '-35%'],
            rich: {
              value: {
                fontSize: 16,
                fontWeight: 'bolder',
                color: '#1890FF'
              }
            }
          },

          data: [
            {
              value: 30.86,
              name: `{value|${865809}} {text1|人} \n {text|覆盖用户}`,
              title: {
                show: true,
                offsetCenter: ['0%', '-10%'],
                rich: {
                  value: {
                    align: 'center',
                    fontSize: 22,
                    fontWeight: 'bolder',
                    color: '#000',
                    padding: [10,0,0,0]
                  },
                  text1: {
                    color: '#000',
                    padding: [10,0,0,0]
                  },
                  text: {
                    fontSize: 14,
                    color: '#000',
                    padding: [10,10,0,0]
                  }
                }
              },
            },
          ]
        }
      ]
    };
    myChart.setOption(option)
  }
  useEffect(()=>{
    gaugeOptionFn()
  },[])
  return <div>
    <div style={{ width: '500px', height: '300px', border: '1px solid #000' }} className="gauge"></div>
    <div>123</div>
    <div>123</div>
  </div>
}