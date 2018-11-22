var unifiedIO = require('../unifiedIO.js');

module.exports = {
	name: 'tf',
	aliases: [],
	cooldown: 5,
	description: 'Time for a blessing!',
	usage: '[adjective] [species] ...',
	execute(msg, args) {
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
		var i = Math.floor(InflatableTypes.length*Math.random())
		var i2 = Math.floor(Species.length*Math.random())
		var returnmessage = "";
		
		
		if (process.env.DEBUG_FLAG != "true") {
			//blue guilmon fix.
			if(msg.author.tag.toString() == "Curus Keel#9823" && i2 == 7)
			{
			
				while(i2 = 7)
				{
					i2 = Math.floor(Species.length*Math.random());
				}
			}
		
			if(msg.member.roles.some(r=>["LOVED GOD OF INFLATABLES"].includes(r.name)))
			{
				i2 = 2;
			}
		}
		
		
		// Actual output begins here.
		// ISSUE NOTE: This code can currently output stuff like
		// "Sai blesses [user] with a inflatable skunk transformation!"
		// which is ungrammatical. Needs to be fixed eventually.
		if(!Array.isArray(args) || args.length === 0)
		{
			unifiedIO.print('Sai blesses ' + author + ' with a' + InflatableTypes[i] + ' ' + Species[i2] +  ' ' + 'transformation!',msg);
			
		}
		else if (args.length == 1)
		{
			unifiedIO.print('Sai blesses ' + author + ' with a ' + args[0] + ' ' + Species[i2] +  ' ' + 'transformation!',msg);
			return;
		}
		else if(args.length == 2)
		{
			unifiedIO.print('Sai blesses ' + author + ' with a ' + args[0] + ' ' + args[1] +  ' ' + 'transformation!',msg);
			return;
		}
		else
		{
			for(i3 = 0; i3<args.length;i3++)
			{
				returnmessage += args[i3] + ' ';
			}
			unifiedIO.print('Sai blesses ' + author + ' with a ' + returnmessage + 'transformation!',msg);
			return;
		}
	},
};