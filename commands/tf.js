module.exports = {
    name: 'tf',
	aliases: [],
	cooldown: 5,
    description: 'Time for a blessing!',
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
		   
		   //blue guilmon fix.
		  if(msg.author.tag.toString() == "Cirus Kel#9823" && i2 == 7)
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
		   
		  if(!Array.isArray(args) || args.length === 0)
		  {
				msg.channel.send('Sai blesses ' + author + ' with a' + InflatableTypes[i] + ' ' + Species[i2] +  ' ' + 'transformation!');
			 
		  }
		  else if (args.length == 1)
		  {
			   msg.channel.send('Sai blesses ' + author + ' with a ' + args[0] + ' ' + Species[i2] +  ' ' + 'transformation!');
				return;
		  }
		  else if(args.length == 2)
		  {
			   msg.channel.send('Sai blesses ' + author + ' with a ' + args[0] + ' ' + args[1] +  ' ' + 'transformation!');
			   return;
		  }
		  else
		  {
			  for(i3 = 0; i3<args.length;i3++)
			  {
				  returnmessage += args[i3] + ' ';
			  }
			   msg.channel.send('Sai blesses ' + author + ' with a ' + returnmessage + 'transformation!');
			   return;
		  }
    },
};