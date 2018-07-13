module.exports = {
    name: 'fwoomp',
	aliases: [],
	cooldown: 5,
    description: 'insta fwoomp.',
    execute(msg, args) {
          var author = msg.author; 
		  msg.channel.send('The Sai bot bops ' +  author + ' with one of his tails, and makes them inflate into a giant balloon!');
    },
};