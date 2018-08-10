  var autoIncrement = require("mongodb-autoincrement");
var HugAdverbs = new Array ();
HugAdverbs[0] = "firmly";
HugAdverbs[1] = "tightly";
HugAdverbs[2] = "noisily";
HugAdverbs[3] = "merrily";
HugAdverbs[4] = "quickly";
HugAdverbs[5] = "eagerly";
HugAdverbs[6] = "tiredly";
HugAdverbs[7] = "joyously";
HugAdverbs[8] = "zealously";
HugAdverbs[9] = "ferociously";

module.exports = {
    name: 'hugdelete',
	aliases: ['deletehugs', 'deletehug', 'hugsdelete', 'hugdelete', 'hugremove'],
	cooldown: 5,
    description: 'You could use a hug!',
    execute(msg, args, db) {
		 var author = msg.author; 
		  var num = 0;
		   var returnmessage = "";
		  
		  if (!args.length) {
			msg.channel.send('Give me an adverb to delete from the list...');
		  } 
		  else
		  {
			  
			  if (!db) {
			  initDb(function(err){});
			  }
			  if (db) {
				
				try {
					
				for(i3 = 0; i3<args.length;i3++)
				{
				  returnmessage += args[i3] + ' ';
				}	
					
				var query = { adverbs: returnmessage };

				db.collection("hugs").deleteOne(query, function(err, result) {
				if (err) throw err;
				 msg.channel.send('Yeah ' + returnmessage + ' was not a good way to hug someone.');
			  });
			  }
			  catch(err)
			  {
				  console.log(err);
				  msg.channel.send('Something went wrong... maybe that was not an option?');
			  }
		  
		  }
		  }
       
		 
    },
};