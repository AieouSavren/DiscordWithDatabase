module.exports = {
    name: 'ping',
	aliases: ['p', 'active'],
	cooldown: 5,
    description: 'Ping!',
    execute(msg, args) {
        msg.channel.send('Pong.');
    },
};