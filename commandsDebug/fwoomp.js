var unifiedIO = require('../unifiedIO.js');

module.exports = {
    name: 'fwoomp',
	aliases: [],
	cooldown: 5,
    description: 'Insta fwoomp.',
    usage: ' ',
    execute(msg, args) {
		 unifiedIO.print('The Sai bot bops ' + msg.author + ' with one of his tails, and makes them inflate into a giant balloon!',msg);
    },
};