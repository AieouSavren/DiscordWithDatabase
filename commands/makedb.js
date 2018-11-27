var unifiedIO = require('../unifiedIO.js');

var autoIncrement = require("mongodb-autoincrement");


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
	name: 'makedatabase',
	aliases: ['db', 'setup', 'makedb'],
	cooldown: 5,
	description: 'Builds a database! Be amazed, be very amazed.',
	usage: ' ',
	execute(msg, args, db) {
		if (process.env.DEBUG_FLAG != "true") {
			if(!msg.member.roles.some(role => ["Administrator", "Moderator"].includes(role.name)) )
			{
				return unifiedIO.print(msg.author + ", sorry, you don't have permissions to use this!",msg);
			}
		}
		if (!db) {
			//Throw an error or mention something went wrong...
			unifiedIO.print("The database is not up!",msg);
			
		}
		if (db) {
			// TODO: add a check to see if this was already run
			
			//setup the auto incrementer
			try {
				
				for (i = 0; i <= HugAdverbs.length - 1; i++) {
					
					autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
						if (err) throw err;
						var collection = db.collection('hugs');
						
						//  TODO: Change "adverbs" to "value".
						collection.insert({ _id: autoIndex, adverbs: HugAdverbs[this.i] });
					}.bind( {i: i} )); // This bind is req'd to make the for loop work
					
				}
			}
			catch (err) {
				console.log(err);
			}
			
		} else {
			unifiedIO.print('db issues...',msg);
		}
		
		unifiedIO.print("Added initial hug adverbs.",msg);
	},
};