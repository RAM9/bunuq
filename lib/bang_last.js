var BangLast = function(_lastlog){
  this.last_log = _lastlog
}

BangLast.prototype.is = function() {
  return /^!last\s(\d{1,3})(?:\s\/(.+)\/)?$/
}
BangLast.prototype.args = function(str,callback) {
  var m  = str.match(this.is())
  if (m instanceof Array) {
    m = m.slice(1,3)
    if (m[0]) {
      m[0] = parseInt(m[0])
    }
    if (m[1]){
     m[1] = new RegExp(m[1]);
    }
    m[2] = callback
  }
  else 
    m = []
  return m
}

BangLast.prototype.run = function(message,callback) {
  var args = this.args(message,callback)
  callback(null,this.last_log.n.apply(this.last_log,args))
}

exports.create = function(last_log) {
  return new BangLast(last_log)
}
