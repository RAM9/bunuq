// Encoding: UTF8
var BangLast = require('../../lib/bang_last')
var vows = require('vows')
var assert = require('assert')
var suite = vows.describe('BangLast')

/* */
// Asyncronous Tests
suite.addBatch({
  // The first test
  'command last': {
    // the topic function (called first)
    topic: function () {
      var c = BangLast.create()
      return c
    },
    // the post conditions of the topic
    '!last 3': function (topic) {
      assert.equal(topic.is().test('!last 3'),true)
      assert.deepEqual(topic.args('!last 3'),[3,undefined])
    },
    '!last 999': function (topic) {
      assert.equal(topic.is().test('!last 999'),true)
      assert.deepEqual(topic.args('!last 999'),[999,undefined])
    },
    '!last 1000': function (topic) {
      assert.equal(topic.is().test('!last 1000'),false)
      assert.deepEqual(topic.args('!last 1000'),[])
    },
    '!last 3 /fish/': function (topic) {
      assert.equal(topic.is().test('!last 3 /fish/'),true)
      assert.equal(topic.args('!last 3 /fish/')[0],3)
      assert.equal(topic.args('!last 3 /fish/')[1].test('fish'),true)

    },
  },
  // This is where we tell node to export the
  // suite - this is how the vows executable
  // passes 'run()' onto the suite
}).export(module)
