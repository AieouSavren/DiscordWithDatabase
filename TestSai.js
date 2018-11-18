//discord bot
require('dotenv').config();
const fs = require('fs');
const readline = require('readline');
const Discord = require('discord.js');
commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
var aborts = false;

const request = require('request');
const util = require('util');

//  OpenShift sample Node application
var express = require('express'),
	app     = express(),
	morgan  = require('morgan');

Object.assign=require('object-assign')


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 27017,
	ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
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
		dbDetails.databaseName = db.databaseName; //there's a defined default?... apparently admin on unsecure systems. 
		dbDetails.url = mongoURLLabel;
		dbDetails.type = 'MongoDB';
		
		console.log('Connected to MongoDB at: %s', mongoURL);
	});
};


initDb(function(err){
	console.log('Error connecting to Mongo. Message:\n'+err);
});


const commandFiles = fs.readdirSync('./commandsDebug').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commandsDebug/${file}`);
	
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	commands.set(command.name, command);
}

//process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error}`));

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log('> Ready.');

rl.on('line', (input) => { // When a message is received:

	// try to initialize the db on every request if it's not already
	// initialized.
	if (!db) {
		initDb(function(err){});
	}
	
	console.log(`> Received: ${input}`);
	
	
	
	const args = input.slice(process.env.PREFIX.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();
	// After these two statements, args consists of an array of arguments,
	// minus the command that directly follows the prefix.
	
	
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
		console.log('The Sai bot meditates in an attempt to understand your command better.');
		return;
	}
	

	
	try {
		 command.execute(input, args, db, aborts);
		 console.log('> Ready.');
	}
	catch (error) {
		console.error(error);
		console.log('There was an error trying to execute that command!');
		console.log('> Ready.');
	}
});