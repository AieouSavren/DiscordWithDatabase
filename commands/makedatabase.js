

var initDb = function(callback) {
  if (mongoURL == null) return;

  var mongodb = require('mongodb');
  if (mongodb == null) return;

  mongodb.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
    }

    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';

    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};




initDb(function(err){
  msg.channel.send('Error connecting to MongoDB. Message:\n'+err);
});

module.exports = {
    name: 'makedatabase',
	aliases: ['makedb', 'builddatabase', 'createdatabase'],
	cooldown: 5,
    description: 'Lets think up a database!',
    execute(msg, args) {
		
		var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
		mongoURLLabel = "";

		if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
		  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
			  mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
			  mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
			  mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
			  mongoPassword = process.env[mongoServiceName + '_PASSWORD']
			  mongoUser = process.env[mongoServiceName + '_USER'];

		  if (mongoHost && mongoPort && mongoDatabase) {
			mongoURLLabel = mongoURL = 'mongodb://';
			if (mongoUser && mongoPassword) {
			  mongoURL += mongoUser + ':' + mongoPassword + '@';
			}
			// Provide UI label that excludes user id and pw
			mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
			mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

		  }
		}
		var db = null,
			dbDetails = new Object();
		
		
        if (!db) {
		initDb(function(err){});
		}
		if (db) {
			var adverbs = db.collection('adverbs');
			// Create a document with request IP and current time of request
			adverbs.insert(
			[
				{adverb: "firmly"},
				{adverb: "tightly"},
				{adverb: "noisily"},
				{adverb: "merrily"},
				{adverb: "quickly"},
				{adverb: "eagerly"},
				{adverb: "tiredly"},
				{adverb: "joyously"},
				{adverb: "zealously"},
				{adverb: "ferociously"}
					
			]
			);
			
			 msg.channel.send('The Sai bot creates a database of hugs!');
		}
    },
};