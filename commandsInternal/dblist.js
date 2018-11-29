var unifiedIO = require('../unifiedIO.js');

// TODO: Add the ability to view IDs as well? This command was originally designed to be used by "dumb users" who just want a list of current adverbs for hugs, so, uh, I dunno. The way I see it, if you're running the bot, you have access to the database. That might be asking a bit too much, though... if this bot gets used by more people, then we need to downgrade from "developer-level understanding" requirement for those running the bot, to "power-user-level understanding". Which means printing out IDs too, so they can use this command to debug, I guess.


module.exports = {
	name: 'dblist',
	aliases: ['dbl'],
	cooldown: 1,
	description: 'Lists values of a (single-column) collection in the database. (Internal)',
	usage: '__collection__',
	execute: async function(msg, args, db) {
		
		if (!args.length) {
			unifiedIO.print('Give me a collection.',msg);
		}
		else
		{
			if (!db) {
				unifiedIO.print('Database is not mounted.',msg);
			}
			if (db) {
				
				try {
					
					var selectedCollection = args[0];
					
					// Get the list of collection names
					let collecsListArray = await db.listCollections({},{nameOnly: true}).toArray();
					var collecNames = new Array ();
					
					for (i = 0; i < collecsListArray.length; i++) {
						collecNames[i] = collecsListArray[i].name;
					}
					
					
					
					// We need to check if the collection is actually in the DB.
					unifiedIO.debugLog("Did the user give a collection that exists? : " + collecNames.includes(selectedCollection));
					
					if (!collecNames.includes(selectedCollection)) {
						unifiedIO.print("Error: " + selectedCollection + " is not a valid collection.",msg);
						return;
					}
					
					// First, we grab the whole collection, sorted in order by _id.
					var sortedCollec = await db.collection(selectedCollection).find({},{_id: 0, value: 1}).sort({_id: 1}).toArray();
					
					
					var collecValues = []
					
					// The for loop extracts all the values from our sortedCollec object
					//  into a simple string array.
					for (k of sortedCollec) {
						collecValues.push(k.value);
					}
					
					unifiedIO.printSplit("Contents of " + selectedCollection + ": " + collecValues.join(', '),msg);
					
					
					
				}
				catch(err)
				{
					console.log(err);
					unifiedIO.print('Something went wrong...',msg);
				}
				
			}
		}
		
	},
};