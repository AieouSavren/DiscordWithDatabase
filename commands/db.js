var dbadd = require('./dbadd.js');
var dbdelete = require('./dbdelete.js');
var dblist = require('./dblist.js');
var dbnormalize = require('./dbnormalize.js');
/*
// !hugadd equivalent
dbadd.execute(msg,['hugs',returnmessage],db);

// !db add hugs bepis
// ->
dbadd.execute(msg,['hugs','bepis'],db);

// !db add A B C D
dbadd.execute(msg,args.slice(1),db);
// Slice off the "add", pass the rest unaltered



*/




var unifiedIO = require('../unifiedIO.js');



module.exports = {
	name: 'db',
	aliases: [],
	cooldown: 1,
	description: 'Database commands. (WIP)',
	usage: '[add | delete | list | normalize] __collection__ [__item__]',
	execute: async function(msg, args, db) {
		
		if (!args.length) {
			unifiedIO.print('Use `!help ' + this.name + '` to see usage.',msg);
		}
		else
		{
			if (!db) {
				unifiedIO.print('Database is not mounted.',msg);
			}
			if (db) {
				
				try {
					
					var choice = args[0];
					
					// Shortcuts
					switch (choice) {
					case "a":
						choice = "add";
						break;
					case "d":
						choice = "delete";
						break;
					case "l":
						choice = "list";
						break;
					case "n":
						choice = "normalize";
						break;
					default:
						
					}
					
					switch (choice) {
					case "add":
						dbadd.execute(msg,args.slice(1),db);
						break;
					case "delete":
						dbdelete.execute(msg,args.slice(1),db);
						break;
					case "list":
						dblist.execute(msg,args.slice(1),db);
						break;
					case "normalize":
						dbnormalize.execute(msg,args.slice(1),db);
						break;
					default:
						unifiedIO.print("Not a valid choice. (Use `!help " + this.name + "` to see usage.)",msg);
					}
					
					
				}
				catch(err)
				{
					console.log(err);
					unifiedIO.print('Something went wrong...',msg);
				}
				
			}
		}
		
	},
};