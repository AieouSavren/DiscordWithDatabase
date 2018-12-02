var unifiedIO = require('../unifiedIO.js');

module.exports = {
	name: 'squeak',
	aliases: [],
	cooldown: 5,
	description: 'Squeak!',
	usage: ' ',
	execute(msg, args) {
		unifiedIO.print('The Sai bot opens his mouth and emits a mighty **squeak!**',msg);
	},
};
