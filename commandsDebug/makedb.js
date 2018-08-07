  var autoIncrement = require("mongodb-autoincrement");

module.exports = {
    name: 'makedatabase',
	aliases: ['db', 'setup', 'makedb'],
	cooldown: 5,
    description: 'builds a database! Be amazed be very amazed.',
    execute(msg, args, db) {
        //console.log('working...');
		
		  // try to initialize the db on every request if it's not already
		  // initialized.
		  if (!db) {
			initDb(function(err){});
		  }
		  if (db) {
			  
			  //setup the auto incramenter
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
			  console.log('db issue');
		  }
    },
};