= DESCRIPTION:

BUNUQ is a bot that lives in #hscool - it is based first on Tocho - then rewritten with irc

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
# Tōchō 盗聴 - was this - rewrote it


