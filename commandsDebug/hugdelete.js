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
    execute(msg, args, db) {
		 var author = msg.author; 
		  var num = 0;
		   var returnmessage = "";
		  
		  if (!args.length) {
			console.log('Give me an adverb to delete from the list...');
		  } 
		  else
		  {
			  
			  if (!db) {
			  initDb(function(err){});
			  }
			  if (db) {
				
				try {
					
					for(i3 = 0; i3<args.length;i3++)
					{
					  returnmessage += args[i3] + ' ';
					}	
						
						var query = { adverbs: returnmessage };

						db.collection("hugs").remove(query, true, function(err, result) {
						if (err) {
							throw err;
							
							console.log('Something went wrong... maybe that was not an option?');
							return; //dont sort or change the count if we couldnt remove an element
							}
							 console.log('Yeah ' + returnmessage + ' was not a good way to hug someone.');
						});
						  
					var query = { "_id": "hugs"}	  
						  
					 //get count and change it to be count - 1
					  db.collection("counters").find(query, {_id: 0, seq: 1}).toArray(function(err, result) {
						if (err) throw err;
						num = result[0].seq;
						});
					 
					db.collection("counters").findOneAndUpdate({"_id": "hugs"}, {$set: {"seq": num-1}},  function(err,doc) {
					   if (err) { throw err; }
					   else { console.log("Updated Counter"); }
					});
					
					
					 db.collection("hugs").find(query, {_id: 0, seq: 1}).toArray(function(err, result) {
						if (err) throw err;
						num = result[0].seq;
						});
					
					//change the index of hugs _id
					
				
				 
				
				}
			  catch(err)
			  {
				  console.log(err);
				  console.log('Something went wrong... maybe that was not an option?');
			  }
		  
		  }
		 }
       
		 
    },
};