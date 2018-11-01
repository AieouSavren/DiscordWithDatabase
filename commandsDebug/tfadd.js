  var autoIncrement = require("mongodb-autoincrement");


module.exports = {
    name: 'tfadd',
	aliases: ['tfsadd' , 'addtf' , 'addtfs'],
	cooldown: 5,
    description: 'You could use more types of blessings!',
    execute(msg, args, db) {
		 var author = msg.author; 
		  var num = 0;
		   var returnmessage = "";
		  
		  if (!args.length) {
			return console.log("Add an transformation to SAI's database of transformations! e.g. big balloonie_bunny lets anyone be a big balloonie or a bunny");
			
			//maybe pm a list of current adverbs o3o? It could be a very very long list... 
		  } 
		  else
		  {
			  
				if (!db) {
				  for(j3 = 0; j3<args.length-1;j3++)
				  {
				  returnmessage += args[j3] + ' ';
				  }
				  
				  returnmessage += args[args.length-1];
				   
				   console.log('SAI cannot rember to hug "' + returnmessage + '" right now.' ); 
				return;
			  }
			  if (db) {
			  try {
				  
				  for(i3 = 0; i3<args.length-1;i3++)
				  {
				  returnmessage += args[i3] + ' ';
				  }
					autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
						if (err) throw err;
						var collection = db.collection('hugs');
						collection.insert({ _id: autoIndex, adverbs: returnmessage });
						console.log('The Sai bot can now hug ' + returnmessage + '!');
						
					});
					}
					catch (err) {
						console.log(err);
					    console.log('uh oh...');
					}
					
			  
			  }
			  
		  }
		  
       
		 
    },
};