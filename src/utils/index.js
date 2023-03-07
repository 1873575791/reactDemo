// const fs = require('fs')
// const path = require('path');
// function num (url){
//   let arr = []
//   const dirList = fs.readdirSync(url, 'utf8');
//   dirList.forEach(item =>{
//     const isDir = path.extname(item)
//     if (isDir === ''){
//       arr.push({filname: item, type: 'folder', childrenFile: num(`${url}/${item}`)})
//     } else {
//       const { size } = fs.statSync(`${url}/${item}`)
//       arr.push({filname: item, type: isDir.split('.')[1], size: (size / 1024).toFixed(2) + 'kb'})
//     } 
//   })
//   return arr
// }
// let obj = num('../components');
// fs.writeFileSync('../components/index.json', JSON.stringify(obj), 'utf-8')
// console.log(obj)

// var addTwoNumbers = function(l1, l2) {
//   const l1Arr = arrReversal(l1).join('') * 1;
//   const l2Arr = arrReversal(l2).join('') * 1;
//   const num = arrReversal((l1Arr + l2Arr + '').split(''))
//   console.log(num)
//   return num
// };

// function arrReversal(arr){
//   const num = arr.length
//   let newArr = []
//   for (let i = num; i > 0; i--){
//       newArr[i - 1] = arr[num - i]
//   }
// return newArr
// }

// addTwoNumbers([2,4,3],[5,6,4])

// function fn(arr1, arr2){
//   const newArr = arr1.concat(arr2).sort((a, b)=> a - b);
//   let str = 0;
//   if (newArr.length % 2 === 0){
//     str = (newArr[newArr.length / 2] + newArr[newArr.length / 2 - 1]) / 2
//   }else{
//     str = newArr[parseInt(newArr.length / 2)]
//   }
//   console.log(newArr, str)
// }

// fn([4,3], [2, 5])

// function fn(str){
//   const obj = {};
//   for(let i = 0; i < str.length; i++){
//     if (obj[str[i]]){
//       obj[str[i]] = obj[str[i]] + 1
//     }else{
//       obj[str[i]] = 1
//     }
//   }
//   const keys = Object.keys(obj)
//   let maxNum = obj[keys[0]], maxStr = keys[0];
//   for(let i = 0; i < keys.length; i++){
//     if (maxNum < obj[keys[i]]){
//       maxNum = obj[keys[i]]
//       maxStr = keys[i]
//     }
//   }
//   console.log(maxNum, maxStr, obj)
// }

// fn('asdasdasdwaxsvewdasadsss ssssss s是的是的')