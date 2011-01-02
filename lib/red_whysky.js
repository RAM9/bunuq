var rws = function(ic) {
  var channel  = ic['channel']
  var client   = ic['client']
  var self = {
    clear         : client.del.bind(client,channel)
    , record      : client.rpush.bind(client,channel)
    , size        : client.llen.bind(client,channel)
    , last        : function() {
       client.lrange(channel,-arguments[0],-1,arguments[1])
      }
    , last_match  : function(n,regexp,callback) {
        var matches = []
        var cb = function(e,res) {
          if(e) {
            throw e
          }
          if (res) {
            for(var x in res) {
              if(regexp.test(JSON.stringify(res[x]))) {
                matches[matches.length] = res[x]
              }
            }
          }
          callback(e,matches)
        }
        self.last(n,cb)
      }
    , n           : function(n,regexp,callback) {
        if(n > 0 && ((regexp == undefined && 
                     callback instanceof Function) 
                        || regexp instanceof Function)) {
          if(regexp instanceof Function) {
            callback = regexp
          }
          self.last(n,callback)
        } else {
          if (n >0 && regexp && callback) {
            self.last_match(n,regexp,callback)
          }
        }
      }
    , channel     : channel
  }
  return self
}

var redis = require('redis')
var redis_client = redis.createClient();
redis_client.on("error", function (err) {
    console.log("Error " + err);
}); 
exports.channel = function(channel) {
  return rws({channel:channel,client:redis_client})
}

