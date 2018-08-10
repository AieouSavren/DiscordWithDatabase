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
    name: 'hug',
	aliases: ['hugs'],
	cooldown: 5,
    description: 'You could use a hug!',
    execute(msg, args, db) {
		 var author = msg.author; 
		  var num = 0;
		   var returnmessage = "";
		  
		  if (!args.length) {
			  if (!db) {
				initDb(function(err){});
			  }
			  if (db) {
				var query = { _id: "hugs" };
			   db.collection("counters").find(query, {_id: 0, seq: 1}).toArray(function(err, result) {
				if (err) throw err;
				num = result[0].seq;

				
				
				var i = Math.floor(num*Math.random()); //0 to n-1
				i += 1; //1 to max

			  
				var query = { _id: i };
				db.collection("hugs").find(query, {_id: 0, adverbs: 1}).toArray(function(err, result) {
				if (err) throw err;
				 msg.channel.send('The Sai bot ' + result[0].adverbs + ' hugs ' +  author + '!');
			  });
				
			  });
			  }
		  } 
		  else
		  {
			 for(i3 = 0; i3<args.length;i3++)
			  {
				  returnmessage += args[i3] + ' ';
			  }
				  
				  msg.channel.send('The Sai bot ' + returnmessage + 'hugs ' +  author + '!');
			  
		  }
		  
       
		 
    },
};