var autoIncrement = require("mongodb-autoincrement");


module.exports = {
    name: 'tfadd',
	aliases: ['tfsadd' , 'addtf' , 'addtfs'],
	cooldown: 5,
    description: 'You could use more types of blessings!',
    execute(msg, args, db) {
		 var author = msg.author; 
		  var num = 0;
		   var returnInflatableType = "";
		   var returnSpecies = "";
		   var returnmessage = "";
		  
		  if (!args.length || args.length-1 >= 2) {
			return console.log("Add an transformation to SAI's database of transformations! e.g. big_balloonie bunny_cutie lets anyone be a big balloonie or a cute bunny.");
			
			//maybe pm a list of current adverbs o3o? It could be a very very long list... 
		  } 
		  else
		  {
			 var InflatableTypes = new Array ();
			 var Species = new Array ();
			  
			 args[0] = args[0].replace(/_/g, ' ');
			 InflatableTypes = args[0].split(/ +/g);
			 
			 args[1] = args[1].replace(/_/g, ' ');
			 Species = args[1].split(/ +/g);
			  
			    for(i1 = 0; i1<InflatableTypes.length-1;i1++)
				  {
				  returnInflatableType += InflatableTypes[i1] + ' ';
				  }
				  returnInflatableType += InflatableTypes[InflatableTypes.length-1];
				  
				  
				for(i2 = 0; i2<Species.length-1;i2++)
				  {
				  returnSpecies += Species[i2] + ' ';
				  }
				  returnSpecies += Species[Species.length-1];
			  
				if (!db) {
				 console.log('SAI cannot remember to bless cuties with a "' + returnInflatableType + ' ' + returnSpecies + '" transformation right now.' ); 
				return;
			  }
			  if (db) {
			  try {
				  
				var InflatableTypes = new Array ();
				var Species = new Array ();
			  
				args[0] = args[0].replace(/_/g, ' ');
				InflatableTypes = args[0].split(/ +/g);
			 
				args[1] = args[1].replace(/_/g, ' ');
				Species = args[1].split(/ +/g);
			 
					autoIncrement.getNextSequence(db, 'inf', function (err, autoIndex) {
						if (err) throw err;
						var collection = db.collection('inf');
						collection.insert({ _id: autoIndex, adverbs: args[0] });
						//console.log('The Sai bot can now hug ' + returnmessage + '!');
						
					});
					
					
					autoIncrement.getNextSequence(db, 'species', function (err, autoIndex) {
						if (err) throw err;
						var collection = db.collection('species');
						collection.insert({ _id: autoIndex, adverbs: args[1] });
						//console.log('The Sai bot can now hug ' + returnmessage + '!');
						
					});
					
					console.log('SAI can now bless cuties with a "' + returnInflatableType + ' ' + returnSpecies + '" transformation!' ); 

					
					}
					catch (err) {
						console.log(err);
					    console.log('uh oh...');
					}
					
			  
			  }
			  
		  }
		  
       
		 
    },
};