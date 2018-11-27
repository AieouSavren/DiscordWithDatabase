var unifiedIO = require('../unifiedIO.js');

var autoIncrement = require("mongodb-autoincrement");

//  TODO: Make this whole dang thing obselete (thanks !dbdelete)

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
	execute(msg, args, db) {
		var author = msg.author; 
		var num = 0;
		var returnmessage = "";
		
		if (!args.length) {
			unifiedIO.print('Give me an adverb to delete from the list...',msg);
		}
		else
		{
			if (!db) {
				unifiedIO.print('SAI is very forgetful today.',msg);
			}
			if (db) {
				
				try {
					
					for(i3 = 0; i3<args.length-1;i3++)
					{
						returnmessage += args[i3] + ' ';
					}
					
					returnmessage += args[args.length-1];
					unifiedIO.debugLog("Adverb to remove: " + returnmessage);
					
					var query = { adverbs: { $eq: returnmessage} };
					
					db.collection("hugs").deleteMany(query, function(err, result) {
						if (err) {
							throw err;
						
							unifiedIO.print('Something went wrong... maybe that was not an option?',msg);
							return; //dont sort or change the count if we couldnt remove an element
						}
						unifiedIO.debugLog("Documents removed: " + result.deletedCount);
						unifiedIO.print('Yeah, ' + returnmessage + ' was not a good way to hug someone.',msg);
					});
					
					var query = { "_id": "hugs"}	  
					
					//get count and change it to be count - 1
					// SELECT * FROM counters WHERE _id = "hugs"
					db.collection("counters").find(query, {_id: 0, seq: 1}).toArray(function(err, result) {
						if (err) throw err;
						// Get the last used hug ID number (which is^H^H SHOULD BE seq)
						num = result[0].seq;
						
						// UPDATE counters SET seq = seq - 1 WHERE _id = "hugs"
						// Could just use $inc instead?
						db.collection("counters").findOneAndUpdate({"_id": "hugs"}, {$set: {"seq": num-1}},  function(err,doc) {
							if (err) { throw err; }
							else { console.log("Updated counters."); }
						});
					});
					for(counter = 1; counter < num-1; counter++)
					{
						// UPDATE hugs SET _id = counter WHERE _id = counter
						// Uhh, a little redundant much...?
						var query = { "_id": counter}
						db.collection("hugs").findOneAndUpdate(query, {$set: {"_id": counter}},  function(err,doc) {
							if (err) { throw err; }
							else { console.log("Updated id: " + counter); }
						});
					}
					//change the index of hugs _id
					
				}
				catch(err)
				{
					console.log(err);
					unifiedIO.print('Something went wrong... maybe that was not an option?',msg);
				}
				
			}
		}
		
	},
};