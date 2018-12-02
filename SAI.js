//discord bot
require('dotenv').config();
const fs = require('fs');
const readline = require('readline');
const Discord = require('discord.js');
commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
var aborts = false;

const client = new Discord.Client();
const request = require('request');
const util = require('util');

var unifiedIO = require('./unifiedIO.js');
const DEBUGFLAG = (process.env.DEBUG_FLAG == "true");

//  HTTP HANDLING begins here.
var express = require('express'),
	app     = express(),
	morgan  = require('morgan');

Object.assign = require('object-assign'); // What is this needed for?

app.engine('html', require('ejs').renderFile); 
app.use(morgan('combined'));
// Every request SHOULD be logged in Apache combined format...
// ...but as far as I can tell, express actually is not being
// used to handle HTTP requests. Derp indeed.

//  HTTP HANDLING ends here. ^^

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	//  TODO: Make it add stuff that is contained in subdirectories of /commands/, too.
	//			(Probably not recursively, that would be a bad idea. But single folders for groups of commands.)
	//			(Probably can be done by doing fs.readdir, and then for (dirs of theStuff) do { add commands in dir })
	//  TODO: Make a directory for "smart aliases" (i.e. commands like !hugadd)
	const command = require(`./commands/${file}`);
	
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	commands.set(command.name, command);
}

// DATABASE STUFF begins here.
 
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 27017,
	ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1',
	mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
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
		// ^ By default ("on unsecured systems" according to Ed's old comment), this is the "admin" db.
		//      TODO: Change this so Sai creates its own db. Could just call it "saibot".
		dbDetails.url = mongoURLLabel;
		dbDetails.type = 'MongoDB';
		
		console.log('Connected to MongoDB at: ' + mongoURL);
	});
};

initDb(function(err){
	console.log('Error connecting to Mongo. Message:\n'+err);
});

//  DATABASE STUFF ends here. ^^

unifiedIO.debugLog("====== Debug mode on. ======");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity({game: {name: "meditating", type: 0}});
});

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', (receivedLine) => {
	// If debug mode is ON, do the readline thing
	if (DEBUGFLAG) {
		onNewInput(receivedLine);
	}
});

client.on("message", async message => {
	// If debug mode is off, do the client thing
	if (!DEBUGFLAG) {
		onNewInput(message);
	}
});




async function onNewInput(msg) {
	/* "msg" can be either a string or a Message object.
		This function will be written to accept both,
		using the "process.env.DEBUG_FLAG" to determine which
		methods to use. */
	
	// try to initialize the db on every request if it's not already
	// initialized.
	if (!db) {
		initDb(function(err){});
	}
	
	if (!DEBUGFLAG) {
		if (msg.author.bot) return; //no bot to bot chatter
	}
	
	/*
	// Example code to prevent non-administrator roles from using the bot
	if(!msg.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
		return msg.reply("Sorry, you don't have permissions to use this!");
	*/
	
	/* This bit makes the code which handles just the content of the message
		agnostic to whether the message is actually a Message object or not. */
	var input = msg;
	if (!DEBUGFLAG) {
		var input = msg.content;
	}
	// TODO: DO THE SAME FOR THINGS LIKE "AUTHOR". i.e., provide a unified value for author so that things that use it don't complain about msg not having that property.  //
	
	if (!input.startsWith(process.env.PREFIX)) return;
	
	const args = input.slice(process.env.PREFIX.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase(); // shift pops the first element of the array
	/* After these two statements, args consists of an array of arguments,
		minus the command that directly follows the prefix.
	   Example: !hug quite nicely -> ["quite","nicely"]*/
	
	
	//  INPUT VALIDATION begins here.
	
	//the command is empty!
	if(commandName == "")
	{
		return; //empty command. Return silently.
	}
	
	
	//the command has too many prefixes, or is ONLY prefixes!
	/*
		Set up a regular expression to test for a message that has too many prefixes.
		It looks confusing... but if the prefix is "!" then our regexp is just /^!!+/.
		/^!!+/ matches the prefix (only at the beginning of the string!), followed 
		by the prefix once or more. So '!!hello' is ignored, but '!hello!!' is not.
		KNOWN BUG: Doesn't work for multi-character prefixes!
	*/
	const re = new RegExp('^'+process.env.PREFIX+process.env.PREFIX+'+');
	/*
		The regexp is tested on the original message,
		minus the slicing applied by the declaration of args.
		If it evaluates to true, then our command has too many
		prefixes at the beginning, and so we reject it.
	*/
	if (re.test(input)) {
		return; //command is just prefixes, or too many prefixes. Return silently.
	}
	
	
	const command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
	//that's not a command name!
	if (!command) 
	{
		unifiedIO.print('The Sai bot meditates in an attempt to understand your command better.',msg);
		return;
	}
	
	//  INPUT VALIDATION ends here. ^^
	
	// Some commands use the database. But calling initDb in a module will crash Sai, apparently. So we do it here.
	if (!db) {
		initDb(function(err){});
	}
	
	
	// Cooldown mechanics
	if (!DEBUGFLAG) {
		//does our command have a cool down?
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		//what time is it
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
	
		//default cooldown is 1s
		const cooldownAmount = (command.cooldown || 1) * 1000;

		if (!timestamps.has(msg.author.id)) {
			//okay you're fine to use the command
			timestamps.set(msg.author.id, now);
			setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
		}
		else {
			const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

			//uh-oh you've gotta wait
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return unifiedIO.print(msg.author + `, please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`,msg);
			}

			timestamps.set(msg.author.id, now);
			setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
		}
		//cooldowns done 
	}
	
	try {
		command.execute(msg, args, db, aborts);
	}
	catch (error) {
		console.error(error);
		unifiedIO.print(msg.author + ', there was an error trying to execute that command!',msg);
	}
	
	//Close the DB... we're async... so this might create a race condition... hopefully a defult time out will handle it. 
	//db.close();
	
}

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	// TODO: Delegate stuff like this to a config file?
	const channel = member.guild.channels.find('name', 'shrine-artificial-intellegence');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`Welcome to the server, ${member}`);
});

// Create an event listener for leaving guild members
client.on('guildMemberRemove', member => {
	// Send the message to a designated channel on a server:
	// TODO: Delegate stuff like this to a config file?
	const channel = member.guild.channels.find('name', 'shrine-artificial-intellegence');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`${member} has left the server`);
});

if (!DEBUGFLAG) {
	client.login(process.env.TOKEN);
}