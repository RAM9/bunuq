= DESCRIPTION:

BUNUQ is a bot that lives in #unhosted - it is based on tocho!

BUNUQ has a command 
!last n /regexp/  :  send me the last n messages matching regexp
!last n           :  just send me the last n messages

Right now BUNUQ has an nstore for all channel history - he wants to move
to redis .

Right now BUNUQ has an 1000 item in memory 'index' used for !last - he
would like to write that to redis too .

= REQUIREMENTS:

 git@github.com:robotarmy/cookbooks.git/bunuq

*original readme*
# Tōchō 盗聴 - a simple irc logging bot built on node-irc and nstore.

*overview*

just another sketch in node.js. I usually can't be on the node.js channel all the time, so this bot is run off a cheap shell on one background process.

there's already the official logs of course, but nstore lets me potentially do a search for my favorite guys...etc

and of course, it's just plain good fun on weekend late nights to put some node goodies together.

*update*

adding a simple web delivery to a page so ideally tocho can just pass off what it hears and can be viewed real-time from a webpage. eventually to integrate the search into the webpage as well. I'm turning this guy into a Doraemon. If anyone else got some wacky idea of what tocho should do, join in the fun.

*requirements*

- node.js (duh!)
- npm
- use npm install node-irc
- nStore if you want to save the conversations to Tim Caswell's nStore instead of a plain vanilla text file.
- Socket.io if you want to configure the conversations to a webpage (and less.js for simple CSS beautification). Also to use express/fab or any good framework.

*settings*

see config.js

*run bot*

`node bot.js`

*tocho-san is live*

He's living in #node.js at Freenode!
