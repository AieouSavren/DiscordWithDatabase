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
	description: "Add an adverb to SAI's database of hugs!",
	usage: '__adverb__',
	execute(msg, args, db) {
		var author = msg.author; 
		var num = 0;
		var returnmessage = "";
		
		if (!args.length) {
			unifiedIO.print("Please give an adverb to add.",msg);
			return;
			
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
				
				unifiedIO.print('SAI cannot remember to hug "' + returnmessage + '" right now. (No database)',msg); 
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
						
						unifiedIO.print('The Sai bot can now hug ' + returnmessage + '!',msg);
						
					});
				} catch (err) {
					console.log(err);
					unifiedIO.print('There was an error adding that to the database.');
				}
			
			}
			
		}
		
	},
};