module.exports = {
    name: 'tf',
	aliases: [],
	cooldown: 5,
    description: 'Time for a blessing!',
    execute(msg, args) {
		var InflatabelTypes = new Array ();
		InflatabelTypes[0] = " parade balloon";
		InflatabelTypes[1] = " balloonie";
		InflatabelTypes[2] = "";
		InflatabelTypes[3] = " inflatable";

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
		  var i = Math.floor(InflatabelTypes.length*Math.random())
		  var i2 = Math.floor(Species.length*Math.random())
		  
		   
		   //blue guilmon fix.
		  if(msg.author.tag.toString() == "Cirus Kel#9823" && i2 == 7)
		  {
			i2 -= 1;
		  }
		  if(msg.member.roles.some(r=>["LOVED GOD OF INFLATABLES"].includes(r.name)))
		  {
			i2 = 2;
		  }
		   
		  if(!Array.isArray(args) || args.length === 0)
		  {
			  if(i > 2)
			  {
				msg.channel.send('Sai blesses ' + author + ' with an' + InflatabelTypes[i] + ' ' + Species[i2] +  ' ' + 'transformation!');

			  }
			  else
			  {
				msg.channel.send('Sai blesses ' + author + ' with a' + InflatabelTypes[i] + ' ' + Species[i2] +  ' ' + 'transformation!');

			  }
			  
			 
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
    },
};