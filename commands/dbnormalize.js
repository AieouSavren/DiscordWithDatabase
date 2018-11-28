var unifiedIO = require('../unifiedIO.js');

var autoIncrement = require("mongodb-autoincrement");

//This whole command is currently experimental.
//It is literally patchwork at any given time. Don't use it



module.exports = {
	name: 'dbnormalize',
	aliases: ['dbcorrect' , 'dbn' , 'dbc'], //  TODO: This will eventually not be needed I guess
	cooldown: 1,
	description: 'Normalizes the IDs of documents in a single-column collection. (WIP)',
	usage: '__collection__ __adverb__',
	execute: async function(msg, args, db) {
		var author = msg.author;
		
		if (!args.length) {
			unifiedIO.print('Give me a collection to fix.',msg);
		}
		else
		{
			if (!db) {
				unifiedIO.print('Database is not mounted.',msg);
			}
			if (db) {
				
				try {
					
					var selectedCollection = args[0];
					
					//console.log("Selected collection: " + selectedCollection);
					
					
					
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
					
					
					correctIDs(db,selectedCollection);
					
					
					
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

var correctIDs = async function(db,selectedCollection) {
	/* This function takes a "messed up" sequence of IDs
		(For example: 
		{ "_id" : 2, "value" : "tightly" }
		{ "_id" : 4, "value" : "merrily" }
		{ "_id" : 9, "value" : "tiredly" }
		{ "_id" : 1, "value" : "firmly" }
		)
		and corrects it so that they are in order, with no gaps
		{ "_id" : 1, "value" : "firmly" }
		{ "_id" : 2, "value" : "tightly" }
		{ "_id" : 3, "value" : "merrily" }
		{ "_id" : 4, "value" : "tiredly" }
		AND it updates the seq in counters.
	*/

	// First, we grab the whole collection, sorted in order by _id.
	var sortedCollec = await db.collection(selectedCollection).find().sort({_id: 1}).toArray();
	//unifiedIO.debugLog(sortedCollec);
	
	//  TODO: Use this sorted collection to check for negative IDs
	//		  If the first item's ID is negative, then we can commence checking, one by one
	//		  until we hit a positive ID.
	//  old comment: //fixNegativeIDs(); // Use a db.find operation to check for negative IDs? or... use the sorted thing?

	// Normalize document sequence numbers.
	// Remember that this only occurs if the user has succesfully deleted something.
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
				//console.log("Deleted {" + ithID + "," + sortedCollec[i].value + "}.");
			})
			.then(() => {
				// ...then re-insert the doc with the proper ID.
				
				//console.log("Attempting to insert {" + (i + 1) + "," + sortedCollec[i].value + "}.");
				db.collection(selectedCollection).insertOne({_id: i + 1, value: sortedCollec[i].value});
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