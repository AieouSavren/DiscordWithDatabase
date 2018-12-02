var unifiedIO = require('../unifiedIO.js');

var dbdelete = require('../commandsInternal/dbdelete.js');


module.exports = {
	name: 'tfdelete',
	aliases: ['deletetfs', 'deletetf', 'tfsdelete', 'tfremove'],
	cooldown: 5,
	description: 'Remove an inflatable type or species from the list.',
	usage: '[ __inflatable_type__ | __species_name__ ]',
	execute: async function(msg, args, db) {
		
		var returnmessage = "";
		
		if (!args.length) {
			unifiedIO.print('Give me an inflatable type or species to delete from the list.',msg);
		}
		else
		{
			
			// TODO: Decide whether to stick with this syntax, or to .join() multiple args like normal.
			//			Remember to add `usage` when this change is made.
			// Do note that this currently only accepts one arg and ignores all the rest.
			selectedItem = args.join(" ");
			var selectedItem = args[0];
			
			if (!db) {
				unifiedIO.print('SAI is very forgetful today. (No database)',msg);
				return;
			}
			
			if (db) {
				try {
					
					// Selects all entries that match the given item.
					var query = { value: { $eq: selectedItem} };
					
					// We search for our query in BOTH collections.
					var InfsCursor = await db.collection('tfinfs').find(query);
					var SpeciesCursor = await db.collection('tfspecies').find(query);
					
					// Call .count() on the cursors to find the number of matches.
					var numOfMatchInfs = await InfsCursor.count();
					var numOfMatchSpecies = await SpeciesCursor.count();
					
					var totalMatches = numOfMatchInfs + numOfMatchSpecies;
					
					unifiedIO.debugLog("Matches in infs: " + numOfMatchInfs);
					unifiedIO.debugLog("Matches in species: " + numOfMatchSpecies);
					
					if (totalMatches == 0) {
						unifiedIO.print("That query doesn't match anything in the list.",msg);
						return;
					} else if (numOfMatchInfs >= 1 && numOfMatchSpecies >= 1) {
						unifiedIO.print("That query matches entries in both collections. Nothing has been deleted.",msg);
						//  TODO:  Um, what do we actually do if it matches both collections? A command-line switch to override...?
						return; // For now we'll just return.
					} else {
						unifiedIO.debugLog("One or more matches in a single collection.");
						
						if (numOfMatchInfs >= 1) {
							unifiedIO.debugLog("Deleting from infs...");
							
							var success = await dbdelete.execute(msg,["tfinfs"].concat(selectedItem),db);
							if (success) {
								unifiedIO.print('The Sai bot has now forgotten ' + selectedItem + '.',msg);
							}
						}
						if (numOfMatchSpecies >= 1) {
							unifiedIO.debugLog("Deleting from species...");
							
							var success = await dbdelete.execute(msg,["tfspecies"].concat(selectedItem),db);
							if (success) {
								unifiedIO.print('The Sai bot has now forgotten ' + selectedItem + '.',msg);
							}
						}
					}
					
				} catch (err) {
					console.log(err);
					unifiedIO.print('Something went wrong... maybe that was not an option?',msg);
				}
				
			}
			
		}
		
	},
};