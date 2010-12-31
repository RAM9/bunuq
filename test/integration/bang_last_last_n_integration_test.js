// Encoding: UTF8
var BangLast = require('../../lib/bang_last')
var LastLog = require('../../lib/last_log')
var vows = require('vows')
var assert = require('assert')
var suite = vows.describe('Integration LastLog + BangLast')

// Asyncronous Tests
suite.addBatch({
  // The first test
  'command last': {
    // the topic function (called first)
    topic: function () {
      var last_log = LastLog.create(4)
      last_log.add({from:'mike',message:'I like chicks'})
      last_log.add({from:'stan',message:'I like chickens'})
      last_log.add({from:'mike',message:'I like chickens too - but mostly i like chicks'})
      last_log.add({from:'betty',message:'I am for poatched eggs'})
      var c = BangLast.create(last_log)
      return c
    },
    'matches mike and stan messages': function (topic) {
      var actual = topic.run("!last 3 /chickens/")
      assert.equal(actual.length,2)
      for (var x in actual) {
          assert.include(['stan','mike'],actual[x].from)
      }
    },
    'giberish': function (topic) {
      var actual = topic.run("!aoeuaoueaoeu !!!") 
      assert.equal(actual,null)
    },
  },
  'large set' : {
    topic: function() {
      var last_log = LastLog.create(1000)
      for(var i = 0 ; i < 1400; i++) {
        last_log.add({from:'mike',message:'I like chickens too - but mostly i like chicks'})
      }
      var c = BangLast.create(last_log)
      return c
    }
    , 'matches chic' : function(topic) {
      var actual = topic.run("!last 999 /chic/")
      assert.equal(actual.length,999)
    }
  }
}).export(module)
