// load node-irc & other stuff
var irc = require('irc')
var fs = require('fs')
var json = JSON.stringify
var config = require('./lib/config')

var BangLast = require('./lib/bang_last')
var SpeakTo = require('./lib/speak_to')
var red     = require('./lib/red_whysky')
var error_f = function(err) {

  if (err)
    throw err
}

  config.servers(function(config) {
    var bot = new irc.Client(config.server, config.nick, {
      channels: config.channels,
    })
    function authbot() {
      bot.say('nickserv', ("identify "+config.password))
      console.log("AUTH SENT.")
    }

    console.log('tocho is getting ready to listen & log...')

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

    if(config.auth)
      setTimeout(authbot, 20000)

  })
