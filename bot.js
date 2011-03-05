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
      irc_bot.say("<__" + from + '__> [pm] ' + message)
      console.log(from + ' => TOCHO: ' + message)
    })

    irc_bot.addListener('error', function (message) {
      irc_bot.say('robotarmy',message)
      irc_bot.say('robotarmy','..........eeeaaAhh')
      irc_bot.say('robotarmy',' o     o          ')
      irc_bot.say('robotarmy',' <-+  -<+    \    ')
      irc_bot.say('robotarmy',' ^     ^    >^o   ')
      irc_bot.say('robotarmy','             +    ')
      irc_bot.say('robotarmy','     [sepuku]     ')
      process.exit(1)
    })


    if(config.auth)
      setTimeout(authbot, 20000)

  })
