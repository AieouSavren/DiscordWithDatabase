module.exports = {
    name: 'ping',
	aliases: ['p', 'active'],
	cooldown: 5,
    description: 'Ping!',
    usage: ' ',
    execute(msg, args) {
        console.log('Pong.');
    },
};