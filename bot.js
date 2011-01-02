// load node-irc & other stuff
var irc = require('irc')
var fs = require('fs')
var json = JSON.stringify
var config = require('./lib/config')
var BangLast = require('./lib/bang_last')
var LastLog = require('./lib/last_log')
var SpeakTo = require('./lib/speak_to')
var red     = require('./lib/red_whysky')
var error_f = function(err) {
  if (err)
    throw err
}

if(config.ircbot() == true) {
	var bot = new irc.Client(config.server(), config.nick(), {
		channels: config.channels(),
	})

	// load welcome message
	console.log('tocho is getting ready to listen & log...')

	// temp auth 
	var auth = config.auth()
  //=== !last
  
	// load messages to screen
	bot.addListener('message', function (from, to, message) {
    json_message = {date:Date(), from:from, message:message }
    var bang = BangLast.create(red.channel(to))
    SpeakTo.bang_speaker(bot,bang)(from,message)
  })

	bot.addListener('message', function (from, to, message) {
    json_message = {date:Date(), from:from, message:message }
    red.channel(to).record(JSON.stringify(json_message))
  })

	bot.addListener('pm', function (from, message) {
    json_message = {date:Date(), from:from, message:message }
    red.channel(from).record(JSON.stringify(json_message))
  })


	bot.addListener('pm', function (from, message) {
	    console.log(from + ' => TOCHO: ' + message)
	})

	if(auth == true)
		setTimeout(authbot, 20000)

	function authbot() {
		bot.say('nickserv', ("identify "+config.password()))
		console.log("AUTH SENT.")
	}
}
