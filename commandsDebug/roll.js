module.exports = {
    name: 'roll',
	aliases: ['rolls'],
	cooldown: 5,
    description: 'Lets roll some dice!',
    execute(msg, args, db, abort) {
       var author = msg.author; 
	   
	   if(!args.length)
	   {
		    console.log('no args expecting the command in the format of !roll 1d20');
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
						if(abort)
						{
							break;
							break;
							abort = false;
						}
					  var returnnum = Math.floor(rolls[1]*Math.random());
					  returnnum = returnnum + 1;
					  console.log('roll: ' + returnnum);
					}
			   }
			   else
			   {
				   console.log('didnt split expecting the command in the format of !roll 1d20');
			   }
			   
			   
			   //rolled...
		   }
		   else
		   {
			   console.log('expecting the command in the format of !roll 1d20');
		   }
		}
	
		
		return;
    },
};