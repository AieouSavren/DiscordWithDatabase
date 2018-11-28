var unifiedIO = require('../unifiedIO.js');

var autoIncrement = require("mongodb-autoincrement");

//This whole command is currently experimental.
//It is literally patchwork at any given time. Don't use it
//until Val says it's ok to do so.



module.exports = {
	name: 'dblist',
	aliases: ['dbl'], //  TODO: This will eventually not be needed I guess
	cooldown: 1,
	description: 'Lists "adverbs" in the database (WIP)',
	usage: '__collection__',
	execute: async function(msg, args, db) {
		var author = msg.author;
		
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
					
					//  TODO: Complain about improper number of args.
					var selectedCollection = args[0];
					
					
					
					
					// Get the list of collection names
					let collecsListArray = await db.listCollections({},{nameOnly: true}).toArray();
					var collecNames = new Array ();
					
					for (i = 0; i < collecsListArray.length; i++) {
						collecNames[i] = collecsListArray[i].name;
					}
					
					
					
					// First, we need to check if the collection is actually in the DB.
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