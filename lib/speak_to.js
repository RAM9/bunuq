var SpeakTo = function(opts) {
  for(var x in opts) {
    this[x] = opts[x]
  }
  this.timeout = this.timeout || 1000
  this.callback = this.callback || function() {}
}
SpeakTo.prototype.speak_to = function(target,messages) {
  if (target && messages) {
    var that = this
    var speak_array = function(target,messages) {
        var msgs = messages.splice(0,3)
        var say = function(){
          for(var x in msgs) {
            that.irc.say(target,JSON.stringify(msgs[x]))
          }
          that.callback(that)
        }
        var send = function() {
          say()
          msgs = messages.splice(0,3)
          if(msgs){
            setTimeout(say,that.timeout) 
          }
        }
        if(that.timeout < 0) {
          send()
        } else {
          setTimeout(send,that.timeout) 
        }
    }
    var speak_other = function(target,messages) {
      irc.say(target,messages)
      that.callback(that)
    }

    if (messages instanceof Array) {
      speak_array(target,messages)
    } else {
      speak_other(target,messages)
    }
  }
  return this;
}
exports.create = function(irc,_timeout,_callback) {
  var speaker = new SpeakTo({irc:irc,timeout:_timeout,callback:_callback});
  return speaker
}
exports.bang_speaker = function(irc,_bang,_timeout,_callback) {
  var speaker = exports.create(irc,_timeout,_callback)
  var bang    = _bang
  return function(from,maybe_bang_message) {
    speaker.speak_to(from,
                     bang.run(maybe_bang_message))
    return speaker
  }
}
