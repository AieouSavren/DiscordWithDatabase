require('dotenv').config();

exports.debugLog = function (str) {
	/* Used for things you want to output in debug mode
		but not in normal mode, like "> Received". */
	// Use like `unifiedIO.debugLog("bla bla")`.
	if (process.env.DEBUG_FLAG == "true") {
		console.log('+: ' + str);
		// Just to let you know what won't be printed in production mode.
	}
};

exports.alwaysLog = function (str) {
	/* Log to console, debug mode or not.
		Used for _actual_ logging purposes. */
	console.log(str);
	// If you want, you can just use console.log.
	// You don't have to use this function.
	
	// To be honest this function has never been used.
	// It's *technically* good practice, because oh noes what if we aren't using a console??
	// Eh. Whatever.
};

exports.print = function (str,msg) {
	/* Note that "msg" is a DISCORD.JS MESSAGE OBJECT!
		It is used to retrieve the proper Discord
		channel to send "str" onto. */
	// Use like `unifiedIO.print("bla bla",msg)`.
	if (process.env.DEBUG_FLAG == "true") {
		console.log(str);
	} else {
		msg.channel.send(str);
	}
};

exports.printSplit = function (str,msg) {
	/* Note that "msg" is a DISCORD.JS MESSAGE OBJECT!
		It is used to retrieve the proper Discord
		channel to send "str" onto. */
	// This command splits the message if the char limit needs it to be split.
	// Use like `unifiedIO.printSplit("bla bla",msg)`.
	if (process.env.DEBUG_FLAG == "true") {
		console.log(str);
	} else {
		msg.channel.send(str, { split: true });
	}
};