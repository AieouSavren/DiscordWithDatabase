var example = require('../exampleFunction.js');

module.exports = {
    name: 'fwoomp',
	aliases: [],
	cooldown: 5,
    description: 'Insta fwoomp.',
    usage: ' ',
    execute(msg, args) {
		 example.print('The Sai bot bops  with one of his tails, and makes them inflate into a giant balloon!');
    },
};