module.exports = {
    name: 'abort',
	aliases: [],
	cooldown: 5,
    description: 'STOP for any commands that allow stopping like roll.',
    execute(msg, args, db, abort) {
          abort = !abort;
		  if(abort)
		  console.log('The Sai bot stops doing stuff.');
		  else
		  console.log('The Sai bot starts doing stuff.');	  
		  
    },
};