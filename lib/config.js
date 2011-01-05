
configs = {
  '2600' : {
    server : 'irc.2600.net',
    channels : ['#hscool'],
    nick : 'MrRam9t',
    password : '',
    auth : false
  }
  , 'freenode' : {
    server : 'irc.freenode.net',
    channels : ['#unhosted'],
    nick : 'bunnuuu',
    password : '',
    auth : false
  }
  }
// simple exports
exports.servers = function(callback) {
  for( x in configs) {
	  callback(configs[x]) 
  }
}

