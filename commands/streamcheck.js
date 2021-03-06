var request = require('request');
const util = require('util');

var unifiedIO = require('../unifiedIO.js');

module.exports = {
	name: 'twitch',
	aliases: ['tw', 'stream'],
	cooldown: 5,
	description: 'Checks if the username is streaming on Twitch.',
	usage: '__channelname__',
	execute(msg, args) {
		if (args.length == 1) {
			checkStream(args[0], process.env.TWITCH, function(returncall) {
				unifiedIO.print(msg.author + ', ' + returncall,msg);
			});
		} else {
			unifiedIO.print(msg.author + ', please enter the Twitch channel name (as it appears in the url e.g. edmazing... or someone who actually streams a lot...)',msg);
		}
		return;
	},
};



function checkStream(channelName, TwitchToken, callback) {
	// Note that "TwitchToken" is actually a Twitch client ID from a registered application.
	request('https://api.twitch.tv/kraken/streams/' + channelName + '?client_id=' + TwitchToken + '', function (error, response, body)
	{
		if (!error && response.statusCode == 200) {
			var jsonArr = JSON.parse(body.toString());
			//console.log(jsonArr);
			
			if(jsonArr['stream'] != null) {
				//console.log(jsonArr['stream']);
				return callback('' + channelName + ' is streaming!');
			}
			
			//console.log("streaming?:" + stream);
			return callback('' + channelName + ' is Not active');
		} else if (response.statusCode == 400) {
			return callback("Twitch returned error 400 (Invalid Request). Check that the Twitch client ID is valid.");
		} else {
			return callback("error: " + error + " Server Response: "  + response.statusCode + '');
			//console.log(error);
			//console.log(response.statusCode);
		}
	})
}