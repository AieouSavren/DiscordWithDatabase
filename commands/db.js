var dbadd = require('../commandsInternal/dbadd.js');
var dbdelete = require('../commandsInternal/dbdelete.js');
var dblist = require('../commandsInternal/dblist.js');
var dbnormalize = require('../commandsInternal/dbnormalize.js');
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
					case "r": // "r" for "remove"
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
					
					let success = false;
					
					// A note about the subcommands: They should return false if they encounter any sort of (non-fatal) error.
					switch (choice) {
					case "add":
						success = await dbadd.execute(msg,args.slice(1),db);
						// It will return false if it reports an error.
						if (success) {
							unifiedIO.print('Inserted "' + args.slice(2).join(" ") + '" into ' + args[1] + '.',msg);
						}
						break;
					case "delete":
						success = await dbdelete.execute(msg,args.slice(1),db);
						// It will return false if it reports an error.
						if (success) {
							unifiedIO.print('"' + args.slice(2).join(" ") + '" has been removed from ' + args[1] + '.',msg);
						}
						break;
					case "list":
						dblist.execute(msg,args.slice(1),db);
						// !dblist prints out its own stuff, so... no need for anything extra.
						break;
					case "normalize":
						success = await dbnormalize.execute(msg,args.slice(1),db);
						// It will return false if it reports an error.
						if (success) {
							unifiedIO.print('Done. `!db list [collection]` can be used to view the collection.',msg);
						}
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