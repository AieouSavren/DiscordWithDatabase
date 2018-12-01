var unifiedIO = require('../unifiedIO.js');

var autoIncrement = require("mongodb-autoincrement");

var dbdelete = require('../commandsInternal/dbdelete.js');

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
	description: 'Removes a type of hug from the list!',
	usage: '__adverb__',
	execute: async function(msg, args, db) {
		var returnmessage = "";
		
		if (!args.length) {
			unifiedIO.print('Give me an adverb to delete from the list.',msg);
		}
		else
		{
			
			// TODO: Rename all "returnmessage" variables to something more elucidating.
			returnmessage = args.join(" ");
			
			if (!db) {
				unifiedIO.print('SAI is very forgetful today. (No database)',msg);
				return;
			}
			
			if (db) {
				try {
					
					unifiedIO.debugLog("Adverb to remove: " + returnmessage);
					
					
					success = await dbdelete.execute(msg,["hugs"].concat(args),db);
					if (success) {
						unifiedIO.print('The Sai bot has now forgotten how to hug ' + returnmessage + '.',msg);
					}
					
				} catch (err) {
					console.log(err);
					unifiedIO.print('Something went wrong... maybe that was not an option?',msg);
				}
				
			}
			
		}
		
	},
};