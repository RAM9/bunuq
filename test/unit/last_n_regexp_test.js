// Encoding: UTF8

var LastLog = require('../../lib/last_log')
var vows = require('vows')
var assert = require('assert')
var suite = vows.describe('LastLog')

// Asyncronous Tests
suite.addBatch({
  // The first test
  'last with one element': {
    // the topic function (called first)
    topic: function () {
      var last = LastLog.create(2)
      last.add({d:1})
      return last
    },
    // the post conditions of the topic
    'has one element': function (topic) {
      assert.equal(topic.count(), 1)
    },
    'given n no size': function (topic) {
      assert.equal(topic.n(), null)
    },
    'has n size 1': function (topic) {
      assert.equal(topic.n(1).length, 1)
    },
    'has n with d:1': function (topic) {
      assert.deepEqual(topic.n(1), [{d:1}])
    },
  },
  'returns last  2 elements on log': {
    // the topic function (called first)
    topic: function () {
      var last = LastLog.create(2)
      last.add({d:1})
      last.add({d:2})
      last.add({d:3})
      last.add({d:4})
      return last
    },
    // the post conditions of the topic
    'has 2 element': function (topic) {
      assert.equal(topic.count(), 2)
    },
    'has n size 2': function (topic) {
      assert.equal(topic.n(2).length, 2)
    },
    'has 2 elements': function (topic) {
      assert.deepEqual(topic.n(2), [{d:3},{d:4}])
    },
  },
  'returns last  2 elements on log matching ': {
    // the topic function (called first)
    topic: function () {
      var last = LastLog.create(4)
      last.add({d:"cake"})
      last.add({d:"wake"})
      last.add({d:"lake"})
      last.add({d:"fish"})
      return last.n(3,/ake/)
    },
    '3 matches': function (topic) {
      assert.equal(topic.length, 3)
    },
    'has these elements': function (topic) {
      assert.deepEqual(topic, [{d:'cake'},{d:'wake'},{d:'lake'}])
    },
  },
  // This is where we tell node to export the
  // suite - this is how the vows executable
  // passes 'run()' onto the suite
}).export(module)

