var request = require('request');
const util = require('util');

module.exports = {
    name: 'twitch',
	aliases: ['tw', 'stream'],
	cooldown: 5,
    description: 'Checks if the username is streaming on twitch',
	execute(msg, args) {
		if (args.length == 1)
		  {
			    checkStream(args[0], process.env.TWITCH, function(returncall)
				{
				msg.reply(util.format("", returncall));
				});
		  }
		  else
		  {
			  msg.reply('Please enter the twitch channel name (as it appears in the url e.g. edmazing ...or someone who actually streams a lot...)');
		  }
		return;
	},
};

		
function checkStream(channelName, TwitchToken, callback) {
	request('https://api.twitch.tv/kraken/streams/' + channelName + '?client_id=' + TwitchToken + '', function (error, response, body) {
		 if (!error && response.statusCode == 200) {
			var jsonArr = JSON.parse(body.toString());
				//console.log(jsonArr);
					
				if(jsonArr['stream'] != null)
				{
					//console.log(jsonArr['stream']);
				return callback('' + channelName + ' is streaming!');
				}
					


				//console.log("streaming?:" + stream);
				return callback('' + channelName + ' is Not active');
			  }
			  else
			  {
				  return callback("error:" + error + "Server Response"  + response.statusCode + '');
				 //console.log(error);
				 //console.log(response.statusCode);
			  }
	})
}