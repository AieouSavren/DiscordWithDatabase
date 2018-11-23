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
	name: 'hugdelete',
	aliases: ['deletehugs', 'deletehug', 'hugsdelete', 'hugdelete', 'hugremove'],
	cooldown: 5,
	description: 'You could use a hug!',
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
					
					var query = { adverbs: returnmessage };
					
					db.collection("hugs").remove(query, true, function(err, result) {
						if (err) {
							throw err;
						
							console.log('Something went wrong... maybe that was not an option?');
							return; //dont sort or change the count if we couldnt remove an element
						}
						unifiedIO.print('Yeah, ' + returnmessage + ' was not a good way to hug someone.',msg);
					});
					
					var query = { "_id": "hugs"}	  
					
					//get count and change it to be count - 1
					db.collection("counters").find(query, {_id: 0, seq: 1}).toArray(function(err, result) {
						if (err) throw err;
						num = result[0].seq;
						
						
						db.collection("counters").findOneAndUpdate({"_id": "hugs"}, {$set: {"seq": num-1}},  function(err,doc) {
							if (err) { throw err; }
							else { console.log("Updated Counter"); }
						});
					});
					for(counter = 1; counter < num-1; counter++)
					{
						
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