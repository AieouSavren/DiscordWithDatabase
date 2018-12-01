var unifiedIO = require('../unifiedIO.js');

var autoIncrement = require("mongodb-autoincrement");

var dbadd = require('../commandsInternal/dbadd.js');


module.exports = {
	name: 'tfadd',
	aliases: ['tfsadd', 'addtf', 'addtfs'],
	cooldown: 5,
	description: 'You could use more types of blessings!',
	usage: '__inflatable_type__ __species_name__',
	execute: async function(msg, args, db) {
		var author = msg.author;
		var returnInflatableType = "";
		var returnSpecies = "";
		var returnmessage = "";
		
		if (!args.length || args.length == 1 || args.length > 2) {
			unifiedIO.print("Add an transformation to SAI's database of transformations! (Takes two args.) e.g. big_balloonie bunny_cutie lets anyone be a big balloonie or a cute bunny.",msg);
			return;
			//maybe pm a list of current adverbs o3o? It could be a very very long list... 
		} else {
			var InflatableTypes = new Array();
			var Species = new Array();
			
			// TODO: I don't really think this is appropriate. Maybe just have separate infs and species input...? Well, that's an executive decision.
			args[0] = args[0].replace(/_/g, ' ');
			InflatableTypes = args[0].split(/ +/g);
			
			args[1] = args[1].replace(/_/g, ' ');
			Species = args[1].split(/ +/g);
			
			
			returnInflatableType = InflatableTypes.join(" ");
			returnSpecies = Species.join(" ");
			
			if (!db) {
				unifiedIO.print('SAI cannot remember to bless cuties with a "' + returnInflatableType + ' ' + returnSpecies + '" transformation right now.'),msg;
				return;
			}
			if (db) {
				try {
					
					success = await dbadd.execute(msg,["tfinfs"].concat(InflatableTypes),db);
					success = await dbadd.execute(msg,["tfspecies"].concat(Species),db);
					if (success) {
						unifiedIO.print('SAI can now bless cuties with a "' + returnInflatableType + ' ' + returnSpecies + '" transformation!',msg);
					}
					
				} catch (err) {
					console.log(err);
					unifiedIO.print('There was an error adding that to the database.',msg);
				}
				
				
			}
			
		}
		
		
		
	},
};
