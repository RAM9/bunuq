// Encoding: UTF8
var SpeakTo = require('../../lib/speak_to')
var BangLast = require('../../lib/bang_last')
var LastLog = require('../../lib/last_log')

var irc = require('../../test_helpers/irc_mock')

var vows = require('vows')
var assert = require('assert')
var suite = vows.describe('Integration LastLog + BangLast + SpeakTo')

// Asyncronous Tests
suite.addBatch({
  // The first test
  'a proper command': {
    // the topic function (called first)
    topic: function () {
      var last_log = LastLog.create(4)
      last_log.add({from:'mike',message:'I like chicks'})
      last_log.add({from:'stan',message:'I like chickens'})
      last_log.add({from:'mike',message:'I like chickens too - but mostly i like chicks'})
      last_log.add({from:'betty',message:'I am for poatched eggs'})
      var bang        = BangLast.create(last_log)
      var if_speak_fn = SpeakTo.bang_speaker(irc.mock(),bang,-1)
      return if_speak_fn 
    },
    'matches mike and stan messages': function (topic) {
      var speaker = topic('trent','!last 10 /chicken/')
      assert.equal(speaker.irc.sent().length,2)
      assert.include(speaker.irc.sent(),JSON.stringify({from:'stan',message:'I like chickens'}))
      assert.include(speaker.irc.sent(),JSON.stringify({from:'mike',message:'I like chickens too - but mostly i like chicks'}))
    },
  },
  'giberish commands': {
    // the topic function (called first)
    topic: function () {
      var last_log = LastLog.create(4)
      last_log.add({from:'mike',message:'I like chicks'})
      last_log.add({from:'stan',message:'I like chickens'})
      last_log.add({from:'mike',message:'I like chickens too - but mostly i like chicks'})
      last_log.add({from:'betty',message:'I am for poatched eggs'})
      var bang        = BangLast.create(last_log)
      var if_speak_fn = SpeakTo.bang_speaker(irc.mock(),bang,-1)
      return if_speak_fn 
    },
    'will not send messages': function (topic) {
      var speaker = topic('trent','aoeu!lastaoeua 10 /chickeouoeen/')
      assert.equal(speaker.irc.sent().length,0)
    }, 
  },
  // This is where we tell node to export the
  // suite - this is how the vows executable
  // passes 'run()' onto the suite
}).export(module)

