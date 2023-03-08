import EventCenter from './index';
var state = {
  list: []
}
// list更新
EventCenter.on('event', function(data){
  state.list = [...state.list, data]
});

export default state