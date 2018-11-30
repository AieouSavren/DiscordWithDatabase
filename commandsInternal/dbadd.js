var unifiedIO = require('../unifiedIO.js');

var autoIncrement = require("mongodb-autoincrement");



module.exports = {
	name: 'dbadd',
	aliases: ['dba'],
	cooldown: 1,
	description: 'Adds stuff to the database (Internal)',
	usage: '__collection__ __item__',
	execute: async function(msg, args, db) {
		
		if (!args.length) {
			unifiedIO.print('Give me a collection, and an item to add to it...',msg);
		}
		else
		{
			if (!db) {
				unifiedIO.print('Database is not mounted.',msg);
			}
			if (db) {
				
				try {
					
					var selectedCollection = args[0];
					var selectedItem = "";
					
					if (args.length > 2) {
						// TODO: could replace this whole thing with args.slice(1).join(" ") ?
						// Test it. It should work.
						for(i = 1; i < args.length - 1; i++)
						{
							selectedItem += args[i] + ' ';
						}
						
						selectedItem += args[args.length - 1];
					} else {
						selectedItem = args[1];
					}
					
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
						return false;
					}
					
					if (args.length == 1) {
						unifiedIO.print('Please specify an item to add to ' + selectedCollection + '.',msg);
						return false;
					}
					
					
					autoIncrement.getNextSequence(db, selectedCollection, function (err, autoIndex) {
						if (err) throw err;
						var collection = db.collection(selectedCollection);
						collection.insert({ _id: autoIndex, value: selectedItem });
						
						unifiedIO.debugLog('Inserted "' + selectedItem + '" into ' + selectedCollection + '.');
						
					});
					
					
					return true;
					
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