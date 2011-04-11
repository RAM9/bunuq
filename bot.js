// load node-irc & other stuff
var irc = require('irc')
var fs = require('fs')
var json = JSON.stringify
var config = require('./lib/config')

var BangLast = require('./lib/bang_last')
var SpeakTo = require('./lib/speak_to')
var red     = require('./lib/red_whysky')


  config.servers(function(config) {
    var irc_bot = new irc.Client(config.server, config.nick, {
      channels: config.channels,
    })
    function authbot() {
      irc_bot.say('nickserv', ("identify "+config.password))
      console.log("AUTH SENT.")
    }

    console.log('tocho is getting ready to listen & log...')

    irc_bot.addListener('message', function (from, to, message) {
      json_message = {date:Date(), from:from, message:message }
      var bang = BangLast.create(red.channel(to))
      SpeakTo.bang_speaker(irc_bot,bang)(from,message)
    })

    irc_bot.addListener('message', function (from, to, message) {
      json_message = {date:Date(), from:from, message:message }
      red.channel(to).record(JSON.stringify(json_message))
    })

    irc_bot.addListener('pm', function (from, message) {
      json_message = {date:Date(), from:from, message:message }
      red.channel(from).record(JSON.stringify(json_message))
    })

    irc_bot.addListener('pm', function (from, message) {
      json_message = {date:Date(), message:message }
      irc_bot.say('robotarmy',"<__" + from + '__> [pm] ' + JSON.stringify(json_message))
    })

    irc_bot.addListener('error', function (message) {
      console.log(JSON.stringify(message))
      irc_bot.say('robotarmy',JSON.stringify(message))
      irc_bot.say('robotarmy','|                  |')
      irc_bot.say('robotarmy','|..........eeeaaAhh|')
      irc_bot.say('robotarmy','| o     o          |')
      irc_bot.say('robotarmy','| <-+  -<+    \    |')
      irc_bot.say('robotarmy','| ^     ^    >^o   |')
      irc_bot.say('robotarmy','|             +    |')
      irc_bot.say('robotarmy','|                  |')
    })


    if(config.auth)
      setTimeout(authbot, 20000)

  })
