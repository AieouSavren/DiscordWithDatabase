module.exports = {
    name: 'squeak',
	aliases: [],
	cooldown: 5,
    description: 'Squeak!',
    execute(msg, args) {
          msg.channel.send('The Sai bot opens his mouth and emits a mighty **squeak!**');
    },
};