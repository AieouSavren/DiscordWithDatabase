var unifiedIO = require('../unifiedIO.js');

module.exports = {
	name: 'abort',
	aliases: [],
	cooldown: 5,
	description: 'STOP for any commands that allow stopping like roll. (Deprecated)',
	usage: ' ',
	execute(msg, args, db, abort) {
		// TODO: Make this actually do anything, or alternatively, remove it entirely.
		abort = true;
		if (abort)
			unifiedIO.print('The Sai bot stops doing stuff.',msg);
		else
			unifiedIO.print('The Sai bot starts doing stuff.',msg);
	},
};