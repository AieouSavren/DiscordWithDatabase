module.exports = {
    name: 'tf',
	aliases: [],
	cooldown: 5,
    description: 'Time for a blessing!',
    execute(msg, args) {
		var InflatableTypes = new Array ();
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
		

		  var i = Math.floor(InflatabelTypes.length*Math.random())
		  var i2 = Math.floor(Species.length*Math.random())
		  var returnmessage = "";
		   

		  if(!Array.isArray(args) || args.length === 0)
		  {
				console.log('Sai blesses ' + author + ' with a' + InflatableTypes[i] + ' ' + Species[i2] +  ' ' + 'transformation!');
			 
		  }
		  else if (args.length == 1)
		  {
			   console.log('Sai blesses ' + author + ' with a ' + args[0] + ' ' + Species[i2] +  ' ' + 'transformation!');
				return;
		  }
		  else if(args.length == 2)
		  {
			   console.log('Sai blesses ' + author + ' with a ' + args[0] + ' ' + args[1] +  ' ' + 'transformation!');
			   return;
		  }
		  else
		  {
			  for(i3 = 0; i3<args.length;i3++)
			  {
				  returnmessage += args[i3] + ' ';
			  }
			   console.log('Sai blesses ' + author + ' with a ' + returnmessage + 'transformation!');
			   return;
		  }
    },
};