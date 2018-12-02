var unifiedIO = require('../unifiedIO.js');

module.exports = {
	name: 'tf',
	aliases: [],
	cooldown: 5,
	description: 'Time for a blessing!',
	usage: '[__adjective__] [__species__] ...',
	execute(msg, args, db) {
		var InflatableTypes = new Array ();
		InflatableTypes[0] = " parade balloon";
		InflatableTypes[1] = " balloonie";
		InflatableTypes[2] = "";
		InflatableTypes[3] = " inflatable";
		
		var Species = new Array ();
		Species[0] = "fox";
		Species[1] = "turtle";
		Species[2] = "bunny";
		Species[3] = "skunk";
		Species[4] = "dragon";
		Species[5] = "dragoness";
		Species[6] = "renamon";
		Species[7] = "guilmon";
		
		var author = msg.author; 
		var infChoiceNum = Math.floor(InflatableTypes.length*Math.random())
		var speciesChoiceNum = Math.floor(Species.length*Math.random())
		var returnmessage = "";
		
		
		if (process.env.DEBUG_FLAG != "true") {
			//blue guilmon fix.
			if(msg.author.tag == "Curus Keel#9823" && speciesChoiceNum == 7)
			{
			
				while(speciesChoiceNum = 7)
				{
					speciesChoiceNum = Math.floor(Species.length*Math.random());
				}
			}
			
			// Makes sure that Sai (the user) always gets a bunny tf >:3
			// NOTE TO SELF: "some" is an function on arrays. It's exactly like Haskell "elem".
			if(msg.member.roles.some(role => role.name.includes("LOVED GOD OF INFLATABLES")))
			{
				speciesChoiceNum = 2;
			}
		}
		
		
		//  TODO: Add database support for !tf.
		
		
		// Actual output begins here.
		// ISSUE NOTE: This code can currently output stuff like
		// "Sai blesses [user] with a inflatable skunk transformation!"
		// which is ungrammatical. TODO: Needs to be fixed eventually.
		//  also TODO: Just... clean up this... whole sort of area. I'm sure it can be made more elegant.
		if(!Array.isArray(args) || args.length === 0)
		{
			unifiedIO.print('Sai blesses ' + author + ' with a' + InflatableTypes[infChoiceNum] + ' ' + Species[speciesChoiceNum] +  ' ' + 'transformation!',msg);
			
		}
		else if (args.length == 1)
		{
			unifiedIO.print('Sai blesses ' + author + ' with a ' + args[0] + ' ' + Species[speciesChoiceNum] +  ' ' + 'transformation!',msg);
			return;
		}
		else if(args.length == 2)
		{
			unifiedIO.print('Sai blesses ' + author + ' with a ' + args[0] + ' ' + args[1] +  ' ' + 'transformation!',msg);
			return;
		}
		else
		{
			returnmessage = args.join(" ");
			unifiedIO.print('Sai blesses ' + author + ' with a ' + returnmessage + ' transformation!',msg);
			return;
		}
	},
};