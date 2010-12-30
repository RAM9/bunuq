// Encoding: UTF8
/*
*
* Last Log is a capped - in memory storage 
* device for getting the last n logs and also
* using a regexp
*
*/
var LastLog = function(size) {
  this.list = Array(size);
  this._index = 0
};


LastLog.prototype.count = function() {
  return this._index 
}

LastLog.prototype.add = function(document) {
  if (this.count() < this.list.length) {
    this.list[this._index] = document
    this._index = this._index + 1
  } else {
    this.list.splice(0,1)
    this.list[this._index-1] = document
  }
  return 0
}

LastLog.prototype.n = function(n,regexp) {
  var sublist = null
  if (n) {
  if (regexp == undefined)
    sublist = this.list.slice(this._index-n,this._index)
  else {
    sublist = []
    var found = 0
    for(var i=this._index-1; found < n && i >=0; i--) {
      if (regexp.test(JSON.stringify(this.list[i]))) {
        sublist[found++] = this.list[i] 
      }
    }
    sublist = sublist.reverse()
  }
  }
  return sublist
}

exports.create = function(size) {
  return new LastLog(size);
}
