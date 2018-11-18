module.exports = {
    name: 'abort',
	aliases: [],
	cooldown: 5,
    description: 'STOP for any commands that allow stopping like roll.',
    usage: ' ',
    execute(msg, args, db, abort) {
          abort = true;
		  if(abort)
		  msg.channel.send('The Sai bot stops doing stuff.');
		  else
		  msg.channel.send('The Sai bot starts doing stuff.');	  
		  
    },
};