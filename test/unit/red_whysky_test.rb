var red = require('../../lib/red_whysky')
var vows = require('vows')
var assert = require('assert')
var suite = vows.describe('red why sky')

// our testing space
var channel ='#ram9_test'
// clean test dataset
// clean test dataset
var rd = red.channel(channel)
rd.clear()

var fixtures = [ 
  {date:new(Date),from:'robotarmy',message:'i like toast'}
  , {date:new(Date),from:'bunuq',message:'melba toast?'}
  , {date:new(Date),from:'robotarmy',message:'sure - melba toast is great!'}
]

var fixture = function(fixtures){
  for (var x in fixtures) {
           rd.record(JSON.stringify(fixtures[x]))
         }
}(fixtures);

var ife = function(e) {
  if (e)
    throw e;
}
suite.addBatch({
  'red whysky record': {
    topic: function() {
      rd.size(this.callback);
    }
    ,'stores the history': function (e,res) {
      ife(e)
      assert.equal(res,3) 
    }
  }
  ,'red whysky last n' : {
    topic:function() {
      rd.n(2,this.callback)
    }
    ,'returns n items':function (e, res) {
      ife(e)
      assert.equal(res.length,2)
    }
    ,'matches':function(e,res) {
      ife(e)
      assert.include(res,JSON.stringify(fixtures[1]))
      assert.include(res,JSON.stringify(fixtures[2]))
    }
  }
  ,'red whysky last n matches' : {
    topic:function() {
      rd.n(1,/toast/,this.callback)
    }
    ,'returns n items':function (e, res) {
      ife(e)
      assert.equal(res.length,1)
    }
    ,'matches':function(e,res) {
      ife(e)
      assert.include(res,JSON.stringify(fixtures[2]))
    }
  }
 }).export(module)

