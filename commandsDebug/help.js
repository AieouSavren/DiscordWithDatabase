const Discord = require('discord.js');
//could also redeclare fs and get the commands if they're stored privately. 
//be sure to change const command = require(`./commands/${file}`); to const command = require(`./${file}`);
//or the proper directory. It will ignore the current command that way. Ummm it's a feature so we made it global in scope to fix that.

module.exports = {
    name: 'help',
	aliases: ['commands'],
	cooldown: 0,
    description: 'List all of my commands or info about a specific command.',
    execute(msg, args) {
		const data = [];
		
		//msg.reply('' + commands.map(command => command.name).join(', ') + '');
		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nYou can send \`${process.env.PREFIX}help [command name]\` to get info on a specific command!`);
		}
		else {
			//consider adjusting the cool down?
			
			if (!commands.has(args[0])) {
				return message.reply('that\'s not a valid command!');
			}

			const command = commands.get(args[0]);

			data.push(`**Name:** ${command.name}`);

			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

			data.push(`**Cooldown:** ${command.cooldown || 1} second(s)`);
		}

		
		msg.channel.send(data, { split: true })
		
		//dm? No people probably wanna know it's got a cool down too.
			/*
			.then(() => {
				if (msg.channel.type !== 'dm') {
					msg.channel.send('I\'ve sent you a DM with all my commands!');
				}
			})
			.catch(() => msg.reply('it seems like I can\'t DM you!'));*/
	},
};