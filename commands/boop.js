var unifiedIO = require('../unifiedIO.js');

module.exports = {
	name: 'boop',
	aliases: [],
	cooldown: 5,
	description: 'Snoot boops.',
	usage: ' ',
	execute(msg, args) {
		var author = msg.author;
		unifiedIO.print('The Sai bot gingerly reaches out one of his front paws and touches it to ' + author + '’s nose. “Boop!”',msg);
	},
};
