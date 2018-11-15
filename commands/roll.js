module.exports = {
    name: 'roll',
	aliases: ['rolls'],
	cooldown: 5,
    description: 'Lets roll some dice!',
    execute(msg, args, db, abort) {
       var author = msg.author; 
	   
	   if(!args.length)
	   {
		    msg.channel.send('no args expecting the command in the format of !roll 1d20');
	   }
	   else
	   {
		   if(args[0].includes("d"))
		   {
		   var rolls = args[0].split("d");
		   
			   if(rolls.length == 2)
			   {
			   
					for(i = rolls[0]; i > 0; i--)
					{
						if(i > 50)
						{
							break;
							break;
						}
						if(abort)
						{
							break;
							break;
							abort = false;
						}
					  var returnnum = Math.floor(rolls[1]*Math.random());
					  returnnum = returnnum + 1;
					  msg.channel.send('roll: ' + returnnum);
					}
			   }
			   else
			   {
				   msg.channel.send('didnt split expecting the command in the format of !roll 1d20');
			   }
			   
			   
			   //rolled...
		   }
		   else
		   {
			   msg.channel.send('expecting the command in the format of !roll 1d20');
		   }
		}
	
		
		return;
    },
};