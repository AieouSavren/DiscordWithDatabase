var unifiedIO = require('../unifiedIO.js');

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
	name: 'hugadd',
	aliases: ['hugsadd' , 'addhug' , 'addhugs'],
	cooldown: 5,
	description: 'You could use more types of hugs!',
	execute(msg, args, db) {
		var author = msg.author; 
		var num = 0;
		var returnmessage = "";
		
		if (!args.length) {
			return msg.channel.send("Add an adverb to SAI's database of hugs!");
			
			//maybe pm a list of current adverbs o3o? It could be a very very long list... 
		} 
		else
		{
			
			if (!db) {
				//initDb(function(err){});
				for(i3 = 0; i3<args.length-1;i3++)
				{
					returnmessage += args[i3] + ' ';
				}
			
				returnmessage += args[args.length-1];
			
				msg.channel.send('SAI cannot remember to hug "' + returnmessage + '" right now.' ); 
				return;
			}
			
			if (db) {
				try {
					
					for(i3 = 0; i3<args.length-1;i3++)
					{
						returnmessage += args[i3] + ' ';
					}
					
					returnmessage += args[args.length];
					
					autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
						if (err) throw err;
						var collection = db.collection('hugs');
						collection.insert({ _id: autoIndex, adverbs: returnmessage });
						
						msg.channel.send('The Sai bot can now hug ' + returnmessage + '!');
						
					});
				} catch (err) {
					console.log(err);
					msg.channel.send('uh oh...');
				}
			
			}
			
		}
		
	},
};