var unifiedIO = require('../unifiedIO.js');

var autoIncrement = require("mongodb-autoincrement");


module.exports = {
	name: 'tfadd',
	aliases: ['tfsadd', 'addtf', 'addtfs'],
	cooldown: 5,
	description: 'You could use more types of blessings!',
	execute(msg, args, db) {
		var author = msg.author;
		var num = 0;
		var returnInflatableType = "";
		var returnSpecies = "";
		var returnmessage = "";
		
		if (!args.length || args.length > 2) {
			unifiedIO.print("Add an transformation to SAI's database of transformations! e.g. big_balloonie bunny_cutie lets anyone be a big balloonie or a cute bunny.",msg);
			return;
			//maybe pm a list of current adverbs o3o? It could be a very very long list... 
		} else {
			var InflatableTypes = new Array();
			var Species = new Array();
			
			args[0] = args[0].replace(/_/g, ' ');
			InflatableTypes = args[0].split(/ +/g);
			
			args[1] = args[1].replace(/_/g, ' ');
			Species = args[1].split(/ +/g);
			
			
			for (i1 = 0; i1 < InflatableTypes.length - 1; i1++) {
				returnInflatableType += InflatableTypes[i1] + ' ';
			}
			returnInflatableType += InflatableTypes[InflatableTypes.length - 1];
			
			for (i2 = 0; i2 < Species.length - 1; i2++) {
				returnSpecies += Species[i2] + ' ';
			}
			returnSpecies += Species[Species.length - 1];
			
			
			if (!db) {
				unifiedIO.print('SAI cannot remember to bless cuties with a "' + returnInflatableType + ' ' + returnSpecies + '" transformation right now.'),msg;
				return;
			}
			if (db) {
				try {
					
					var InflatableTypes = new Array();
					var Species = new Array();
					
					args[0] = args[0].replace(/_/g, ' ');
					InflatableTypes = args[0].split(/ +/g);
					
					args[1] = args[1].replace(/_/g, ' ');
					Species = args[1].split(/ +/g);
					
					autoIncrement.getNextSequence(db, 'tfinfs', function(err, autoIndex) {
						if (err) throw err;
						var collection = db.collection('tfinfs');
						collection.insert({
							_id: autoIndex,
							value: args[0]
						});
						//console.log('The Sai bot can now hug ' + returnmessage + '!');
						
					});
					
					
					autoIncrement.getNextSequence(db, 'tfspecies', function(err, autoIndex) {
						if (err) throw err;
						// TODO: Change to db.collection('tfspecies').insert()
						var collection = db.collection('tfspecies');
						collection.insert({
							_id: autoIndex,
							value: args[1]
						});
						
					});
					
					unifiedIO.print('SAI can now bless cuties with a "' + returnInflatableType + ' ' + returnSpecies + '" transformation!',msg);
					
					
				} catch (err) {
					console.log(err);
					unifiedIO.print('There was an error adding that to the database.',msg);
				}
				
				
			}
			
		}
		
		
		
	},
};
