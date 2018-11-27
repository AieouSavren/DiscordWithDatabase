var unifiedIO = require('../unifiedIO.js');

var autoIncrement = require("mongodb-autoincrement");

//This whole command is currently experimental.
//It is literally patchwork at any given time. Don't use it
//until Val says it's ok to do so.
//  TODO: !db [delete | add | list]
//		1. delete is ALMOST IMPLEMENTED. (Don't forget about "adverbs" vs "value"!)
//		2. list WILL BE EASY TO IMPLEMENT.
//		3. add is NOT IMPLEMENTED.
//  TODO: Somehow prevent !db from working on collections that it's not for...? Whitelist?


module.exports = {
	name: 'dbdelete',
	aliases: ['dbremove' , 'dbd'], //  TODO: Remember to remove "dbd"
	cooldown: 5,
	description: 'Removes stuff from the database (WIP)',
	usage: '__collection__ __adverb__',
	execute: async function(msg, args, db) {
		var author = msg.author; 
		var num = 0;
		var returnmessage = "";
		
		if (!args.length) {
			unifiedIO.print('Give me a collection, and an item to delete from the list...',msg);
		}
		else
		{
			if (!db) {
				unifiedIO.print('Database is not mounted.',msg);
			}
			if (db) {
				
				try {
					
					//  TODO: Complain about improper number of args.
					//  also TODO: Accept item that has spaces in it. Nab the code from hugdelete.js.
					var selectedCollection = args[0];
					var selectedItem = args[1];
					
					console.log("Selected collection: " + selectedCollection);
					console.log("Item selected to be removed: " + selectedItem);
					
					
					
					// Get the list of collection names
					let collecsListArray = await db.listCollections({},{nameOnly: true}).toArray();
					var collecNames = new Array ();
					
					for (i = 0; i < collecsListArray.length; i++) {
						collecNames[i] = collecsListArray[i].name;
					}
					
					
					
					// First, we need to check if the collection is actually in the DB.
					console.log("Did the user give a collec that exists? : " + collecNames.includes(selectedCollection));
					
					if (!collecNames.includes(selectedCollection)) {
						unifiedIO.print("Error: " + selectedCollection + " is not a valid collection.",msg);
						return;
					}
					
					
					// Next, we need to check if the item is actually in the collection.
					
					//  TODO: Change "adverbs" to "value".
					var query = { adverbs: { $eq: selectedItem} };
					let numOfFind = await db.collection(selectedCollection)
											.find(query)
											.count();
					
					//console.log("Number of matches: " + numOfFind);
					if (numOfFind == 0) {
						unifiedIO.print("Error: No matches in given collection.",msg);
						return;
					}
					
					
					// DELETE selectedCollection WHERE adverbs = selectedItem
					db.collection(selectedCollection).deleteMany(query, function(err, result) {
						if (err) {
							throw err;
							
							console.log('Something went wrong...?');
							return; //dont sort or change the count if we couldnt remove an element
						}
						console.log("Documents removed: " + result.deletedCount);
						unifiedIO.print('"' + selectedItem + '" has been removed from ' + selectedCollection + '.',msg);
					});
					
					//fixNegativeIDs(); // Use a db.find operation to check for negative IDs? or... use the sorted thing?
					correctIDs(db,selectedCollection,selectedItem);
					
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

var correctIDs = async function(db,selectedCollection,selectedItem) {
	/* This function takes a "messed up" sequence of IDs
		(For example: 
		{ "_id" : 2, "adverbs" : "tightly" }
		{ "_id" : 4, "adverbs" : "merrily" }
		{ "_id" : 9, "adverbs" : "tiredly" }
		{ "_id" : 1, "adverbs" : "firmly" }
		)
		and corrects it so that they are in order, with no gaps
		{ "_id" : 1, "adverbs" : "firmly" }
		{ "_id" : 2, "adverbs" : "tightly" }
		{ "_id" : 3, "adverbs" : "merrily" }
		{ "_id" : 4, "adverbs" : "tiredly" }
		AND it updates the seq in counters.
	*/

	// First, we grab the whole collection, sorted in order by _id.
	var sortedCollec = await db.collection(selectedCollection).find().sort({_id: 1}).toArray();
	//unifiedIO.debugLog(sortedCollec);
	
	//  TODO: Use this sorted collection to check for negative IDs
	//		  If the first item's ID is negative, then we can commence checking
	//		  This can continue until we hit a positive ID.

	// Normalize document sequence numbers.
	// Remember that this only occurs if the user has deleted something.
	// NOTE THAT THIS CODE DOES NOT WORK
	// IF ANY _IDS HAVE NEGATIVE SEQ VALUES!!
	// IT WILL HAVE A DUPLICATE KEY ERROR!!
	for (let i = 0; i <= sortedCollec.length - 1; i++) {
		let ithID = sortedCollec[i]._id;
	
		// Is the ith document's ID equal to i + 1? (+1 so the IDs start at 1, not 0)
		if (ithID != i + 1) {
			// If not, then make it so.
			sortedCollec[i]._id = i + 1;
		
				// Remove the offending doc...
			db.collection(selectedCollection).deleteOne({_id: ithID})
			.then((result) => {
				//console.log("Deleted {" + ithID + "," + sortedCollec[i].adverbs + "}.");
			})
			.then(() => {
				// ...then re-insert the doc with the proper ID.
				
				//  TODO: Change "adverbs" to "value".
				//console.log("Attempting to insert {" + (i + 1) + "," + sortedCollec[i].adverbs + "}.");
				db.collection(selectedCollection).insertOne({_id: i + 1, adverbs: sortedCollec[i].adverbs});
			})
			.catch((err) => { throw err; });
		
		}
	
	}

	// Update the corresponding seq.
	db.collection("counters").findOneAndUpdate({_id: selectedCollection}, {$set: {"seq": sortedCollec.length}})
	.then(() => {
		console.log("Updated counters. Current seq: " + sortedCollec.length);
	})
	.catch((err) => { throw err; });;
}

// TODO: Add a bit which fixes negative IDs