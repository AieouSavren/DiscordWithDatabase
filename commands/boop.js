module.exports = {
    name: 'boop',
	aliases: [],
	cooldown: 5,
    description: 'Snoot boops.',
    execute(msg, args) {
          var author = msg.author;
		  msg.channel.send('The Sai bot gingerly reaches out one of his front paws and touches it to ' + author + '’s nose. “Boop!”');
    },
};