module.exports = {
    name: 'abort',
	aliases: [],
	cooldown: 5,
    description: 'E STOP for any running commands that allow stopping like roll.',
    execute(msg, args, db, abort) {
          abort = !abort;
		  if(abort)
		  msg.channel.send('The Sai bot stops doing stuff.');
		  else
		  msg.channel.send('The Sai bot starts doing stuff.');	  
		  
    },
};