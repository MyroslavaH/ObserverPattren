
  var Observer2 = function(){
    this.handlers = {};
  }
  Observer2.prototype = {
    subscribe: function( event, handler ){
      if( event in this.handlers ) {
        this.handlers[event].push(handler)
      } else {
        this.handlers[event] = [handler]
      }
    },
    fire: function( event ){
		var w=event.split('.');
		var length = w.length
	  for(var i=0; i<length; i++){
		  var el = w.join('.');
		  this.handlers[el].forEach(function(v,i){
        v();
      })
	  w.pop()
	  }
      
    }
  }

  var o = new Observer2();
  o.subscribe('facebook', function(){
  console.log(1)
})
o.subscribe('facebook.messages', function(){
  console.log(2)
})
o.subscribe('facebook.messages.new', function(){
  console.log(3)
})
o.subscribe('facebook.messages.old', function(){
  console.log(4)
})
console.log('facebook');
o.fire('facebook') // expected: 1
console.log('facebook.messages');
o.fire('facebook.messages') // expected: 2,1
console.log('facebook.messages.new');
o.fire('facebook.messages.new') // expected: 3,2,1