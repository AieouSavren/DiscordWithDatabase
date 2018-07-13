module.exports = {
    name: 'off',
	aliases: ['power down', 'deactivate'],
	cooldown: 5,
    description: 'Sets the bot to DND... might change in the future to save on processing power.',
    execute(msg, args) {
        client.user.setStatus("dnd");
    },
};