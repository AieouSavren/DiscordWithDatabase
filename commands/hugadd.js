var unifiedIO = require('../unifiedIO.js');

var autoIncrement = require("mongodb-autoincrement");

var dbadd = require('../commandsInternal/dbadd.js');


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
	execute: async function(msg, args, db) {
		var returnmessage = "";
		
		if (!args.length) {
			unifiedIO.print("Please give an adverb to add to the list.",msg);
			
			//maybe pm a list of current adverbs o3o? It could be a very very long list... 
		}
		else
		{
			
			// TODO: Rename all "returnmessage" variables to something more elucidating.
			returnmessage = args.join(" ");
			
			if (!db) {
				unifiedIO.print('SAI cannot remember to hug "' + returnmessage + '" right now. (No database)',msg); 
				return;
			}
			
			if (db) {
				try {
					
					unifiedIO.debugLog("Adverb to remove: " + returnmessage);
					
					
					success = await dbadd.execute(msg,["hugs"].concat(args),db);
					if (success) {
						unifiedIO.print('The Sai bot can now hug ' + returnmessage + '!',msg);
					}
					
				} catch (err) {
					console.log(err);
					unifiedIO.print('There was an error adding that to the database.');
				}
			
			}
			
		}
		
	},
};