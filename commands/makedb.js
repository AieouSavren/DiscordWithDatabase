var autoIncrement = require("mongodb-autoincrement");

module.exports = {
    name: 'makedatabase',
	aliases: ['db', 'setup', 'makedb'],
	cooldown: 5,
    description: 'Builds a database! Be amazed, be very amazed.',
    usage: ' ',
    execute(msg, args, db) {
        //console.log('working...');
		if(!msg.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
		{
		return msg.reply("Sorry, you don't have permissions to use this!");
		}
		  // try to initialize the db on every request if it's not already
		  // initialized.
		  if (!db) {
			//initDb(function(err){});
			//Throw an error or mention something went wrong...
			
		  }
		  if (db) {
			  //todo add a check if this was already run
			  //setup the auto incrementer
				try {
					
                autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
					if (err) throw err;
					var collection = db.collection('hugs');
					collection.insert({ _id: autoIndex, adverbs: "firmly" });
					
                });
				}
				catch (err) {
				   console.log(err);
				}
				
				try {
					
                autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
					if (err) throw err;
					var collection = db.collection('hugs');
					collection.insert({ _id: autoIndex, adverbs: "tightly" });
                });
				}
				catch (err) {
				   console.log(err);
				}

				try {
					
                autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
					if (err) throw err;
					var collection = db.collection('hugs');
					collection.insert({ _id: autoIndex, adverbs: "noisily" });
                });
				}
				catch (err) {
				   console.log(err);
				}
				
				try {
					
                autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
					if (err) throw err;
					var collection = db.collection('hugs');
					collection.insert({ _id: autoIndex, adverbs: "merrily" });
                });
				}
				catch (err) {
				   console.log(err);
				}	
				
				try {
					
                autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
					if (err) throw err;
					var collection = db.collection('hugs');
					collection.insert({ _id: autoIndex, adverbs: "quickly" });
                });
				}
				catch (err) {
				   console.log(err);
				}
				
				try {
					
                autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
					if (err) throw err;
					var collection = db.collection('hugs');
					collection.insert({ _id: autoIndex, adverbs: "eagerly" });
                });
				}
				catch (err) {
				   console.log(err);
				}
				
				try {
					
                autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
					if (err) throw err;
					var collection = db.collection('hugs');
					collection.insert({ _id: autoIndex, adverbs: "tiredly" });
                });
				}
				
				catch (err) {
				   console.log(err);
				}
				
				try {
					
                autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
					if (err) throw err;
					var collection = db.collection('hugs');
					collection.insert({ _id: autoIndex, adverbs: "joyously" });
                });
				}
				
				catch (err) {
				   console.log(err);
				}
				
				try {
					
                autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
					if (err) throw err;
					var collection = db.collection('hugs');
					collection.insert({ _id: autoIndex, adverbs: "zealously" });
                });
				}
				catch (err) {
				   console.log(err);
				}
				
				try {
					
                autoIncrement.getNextSequence(db, 'hugs', function (err, autoIndex) {
					if (err) throw err;
					var collection = db.collection('hugs');
					collection.insert({ _id: autoIndex, adverbs: "ferociously" });
                });
				}
				catch (err) {
				   console.log(err);
				}

			
		  } else {
			   msg.channel.send('db issues...');
		  }
    },
};