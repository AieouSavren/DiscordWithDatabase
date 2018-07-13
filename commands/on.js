module.exports = {
    name: 'on',
	aliases: ['turn on', 'activate'],
	cooldown: 5,
    description: 'Shows that the bot is awake',
    execute(msg, args) {
        client.user.setStatus("online");
    },
};