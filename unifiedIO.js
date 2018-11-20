require('dotenv').config();

exports.myDateTime = function () {
    return Date();
};

// DO NOT USE THESE FUNCTIONS YET
// THE FUNCTIONS BELOW, DO NOT USE THEM YET

exports.debugLog = function (str) {
	/* Used for things you want to output in debug mode
		but not in normal mode, like "> Received". */
	if (process.env.DEBUG_FLAG == "true") {
		console.log(str);
	}
};

exports.alwaysLog = function (str) {
	/* Log to console, debug mode or not.
		Used for _actual_ logging purposes. */
	console.log(str);
	// If you want, you can just use console.log.
	// You don't have to use this function.
};

exports.print = function (str,msg) {
    /* Note that "msg" is a DISCORD.JS MESSAGE OBJECT!
        It is used to retrieve the proper Discord
        channel to send "str" onto. */
    if (process.env.DEBUG_FLAG == "true") {
        console.log(str);
    } else {
        msg.channel.send(str);
    }
};
