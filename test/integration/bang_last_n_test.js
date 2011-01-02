// Encoding: UTF8
var BangLast = require('../../lib/bang_last')
var LastLog = require('../../lib/last_log')
var vows = require('vows')
var assert = require('assert')
var suite = vows.describe('Integration LastLog + BangLast')

var last_log = LastLog.create(4)
last_log.add({from:'mike',message:'I like chicks'})
last_log.add({from:'stan',message:'I like chickens'})
last_log.add({from:'mike',message:'I like chickens too - but mostly i like chicks'})
last_log.add({from:'betty',message:'I am for poatched eggs'})

// Asyncronous Tests
suite.addBatch({
  // The first test
  'command last': {
    // the topic function (called first)
    topic: function () {
      var c = BangLast.create(last_log)
      c.run("!last 3 /chickens/",this.callback)
    },
    'matches mike and stan messages': function (e,res) {
      assert.equal(res.length,2)
      for (var x in res) {
          assert.include(['stan','mike'],res[x].from)
      }
    },
  }
  ,'command nothing': {
    topic: function () {
      var c = BangLast.create(last_log)
      c.run("!loeouoeu!ast 3 /chickens###/",this.callback)
    },

    'giberish': function (e,res) {
      assert.equal(res,null)
    },
  }
  ,'large set' : {
    topic: function() {
      var last_log = LastLog.create(1000)
      for(var i = 0 ; i < 1400; i++) {
        last_log.add({from:'mike',message:'I like chickens too - but mostly i like chicks'})
      }
      var c = BangLast.create(last_log)
      c.run("!last 999 /chic/",this.callback)
    }
    , 'matches chic' : function(e, res) {
      assert.equal(res.length,999)
    }
  }
}).export(module)

