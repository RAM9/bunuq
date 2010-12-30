

var IrcMock = function() {
  var that = this
  that.sent = []
  return {
    say : function(target,message) {
      that.sent[that.sent.length]=message
    },
    sent : function() {
      return that.sent
    }
  }
}
exports.mock = function() {
  return new IrcMock()
}

