module.exports = {
    name: 'ping',
	aliases: ['p', 'active'],
	cooldown: 5,
    description: 'Ping!',
    execute(msg, args) {
        console.log('Pong.');
    },
};