// Encoding: UTF8
var SpeakTo = require('../../lib/speak_to')
var irc = require('../../test_helpers/irc_mock')
var vows = require('vows')
var assert = require('assert')
var suite = vows.describe('SpeakTo')
var events = require('events')

suite.addBatch({
  'no args': {
    topic: function () {
      var s = SpeakTo.create(irc.mock(),-1)
      return s.speak_to(null,null)
    },
    'nothing happens': function (topic) {
      assert.equal(topic.irc.sent().length,0)
    },
  },
  'no messages': {
    topic: function () {
      var s = SpeakTo.create(irc.mock(),-1)
      var who = 'fred'
      var messages = []
      return s.speak_to(who,messages)
    },
    'nothing happens': function (topic) {
      assert.equal(topic.irc.sent().length,0)
    },
  },
  'private messages a user a set of messages': {
    topic: function () {
     var promise = new(events.EventEmitter);
      var s = SpeakTo.create(irc.mock(),1,function(self) {
        promise.emit('success',self)
      })
      var who = 'fred'
      var messages = ['one', 'two', 'three', 'four']
      s.speak_to(who,messages)
      return promise
    },
    'messages come in groups of three - timeout apart': function (topic) {
      if (!this.once) {
        this.once = true
        assert.equal(topic.irc.sent().length,3)
      } else {
        assert.equal(topic.irc.sent().length,4)
      }
    },
  },
}).export(module)

