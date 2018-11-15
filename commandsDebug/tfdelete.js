  var autoIncrement = require("mongodb-autoincrement");


module.exports = {
    name: 'tfdelete',
	aliases: ['deletetfs', 'deletetf', 'tfsdelete', 'tfremove'],
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
			  console.log('SAI is very forgetful today.');
			  }
			  if (db) {
				
				try {
					
					args[0] = args[0].replace(/_/g, ' ');
					 
						var query = { adverbs: args[0] };

						db.collection("inf").remove(query, true, function(err, result) {
						if (err) {
							throw err;
							
							console.log('Something went wrong... maybe that was not an option?');
							return; //dont sort or change the count if we couldnt remove an element
							}
							 console.log('Yeah ' + args[0] + ' was not a good way to hug someone.');
						});
						  
					var query = { "_id": "inf"}	  
						  
					 //get count and change it to be count - 1
					  db.collection("counters").find(query, {_id: 0, seq: 1}).toArray(function(err, result) {
						if (err) throw err;
						num = result[0].seq;
						
					 
					db.collection("counters").findOneAndUpdate({"_id": "inf"}, {$set: {"seq": num-1}},  function(err,doc) {
					   if (err) { throw err; }
					   else { console.log("Updated Counter"); }
					});
					});
					for(counter = 1; counter < num-1; counter++)
					{
					
						var query = { "_id": counter}
					 db.collection("inf").findOneAndUpdate(query, {$set: {"_id": counter}},  function(err,doc) {
					   if (err) { throw err; }
					   else { console.log("Updated id:" + counter); }
						});
					}
					//change the index of hugs _id
					
					///Removed the inflation type now for the Species
					args[1] = args[1].replace(/_/g, ' ');
					 
						var query = { adverbs: args[1] };

						db.collection("species").remove(query, true, function(err, result) {
						if (err) {
							throw err;
							
							console.log('Something went wrong... maybe that was not an option?');
							return; //dont sort or change the count if we couldnt remove an element
							}
							 console.log('Yeah ' + args[1] + ' was not a good way to hug someone.');
						});
						  
					var query = { "_id": "species"}	  
						  
					 //get count and change it to be count - 1
					  db.collection("counters").find(query, {_id: 0, seq: 1}).toArray(function(err, result) {
						if (err) throw err;
						num = result[0].seq;
						
					 
					db.collection("counters").findOneAndUpdate({"_id": "species"}, {$set: {"seq": num-1}},  function(err,doc) {
					   if (err) { throw err; }
					   else { console.log("Updated Counter"); }
					});
					});
					for(counter = 1; counter < num-1; counter++)
					{
					
						var query = { "_id": counter}
					 db.collection("species").findOneAndUpdate(query, {$set: {"_id": counter}},  function(err,doc) {
					   if (err) { throw err; }
					   else { console.log("Updated id:" + counter); }
						});
					}
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