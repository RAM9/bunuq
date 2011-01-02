var SpeakTo = function(opts) {
  for(var x in opts) {
    this[x] = opts[x]
  }
  this.timeout = this.timeout || 1000
  this.callback = this.callback || function() {}
}
SpeakTo.prototype.speak_array = function(target,messages) {
  if (messages.length != 0) {
    var msgs = messages.splice(0,3)
    for(var x in msgs) {
      this.irc.say(target,JSON.stringify(msgs[x]))
    }
    this.callback(this)
    if (this.timeout > 0) {
      var that = this
      setTimeout(function() {
        that.speak_array(target,messages) 
      },this.timeout)
    }
  }
}

SpeakTo.prototype.speak_to = function(target,messages) {
  if (target && messages) {
    if (messages instanceof Array) {
      this.speak_array(target,messages)
    }
  }
  return this;
}
exports.create = function(_irc,_timeout,_callback) {
  var speaker = new SpeakTo({irc:_irc,timeout:_timeout,callback:_callback});
  return speaker
}
exports.bang_speaker = function(_irc,_bang,_timeout,_callback) {
  /* yes this is is convoluted and could use some work */
  var speaker = exports.create(_irc,_timeout,_callback)
  var bang    = _bang
  return function(from,maybe_bang_message) {
    bang.run(maybe_bang_message,function(e,res) {
      speaker.speak_to(from,res)
    })
    return speaker;
  }
}
