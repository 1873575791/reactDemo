export let stateAll = {
  list: []
};
const EventCenter = (function(){
  var events = {};
  function on(event, handler){
      events[event] = events[event] || [];
      events[event].push({
          handler: handler
      });
  }

  function fire(event, args){
      if (!events[event]) {return}
      for (var i = 0; i < events[event].length; i++) {
          events[event][i].handler(args);
      }
  }

  function off(event){
      delete events[event];
  }

  return {
      on: on,
      fire: fire,
      off: off,
      events,
  }
})();

export const { on, fire, off, events } = EventCenter;

// export default EventCenter

EventCenter.on('event', function(data){
  console.log(data);
  stateAll.list.push(data)
}, 'key');
EventCenter.fire('event', '这是展示内容1');
EventCenter.fire('event', '这是展示内容2');
console.log(EventCenter.events, stateAll);