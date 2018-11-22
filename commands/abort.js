var unifiedIO = require('../unifiedIO.js');

module.exports = {
	name: 'abort',
	aliases: [],
	cooldown: 5,
	description: 'STOP for any commands that allow stopping like roll.',
	usage: ' ',
	execute(msg, args, db, abort) {
		abort = true;
		if (abort)
			unifiedIO.print('The Sai bot stops doing stuff.',msg);
		else
			unifiedIO.print('The Sai bot starts doing stuff.',msg);
	},
};