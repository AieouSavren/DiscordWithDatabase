var unifiedIO = require('../unifiedIO.js');

module.exports = {
	name: 'roll',
	aliases: ['rolls'],
	cooldown: 5,
	description: 'Let\'s roll some dice!',
	usage: '[number of dice]d[number of sides]',
	execute(msg, args, db, abort) {
		
		var author = msg.author;
		
		if (!args.length) {
			unifiedIO.print('No args provided. Expecting the command in the format of !roll 1d20',msg);
		} else {
			if (args[0].includes("d")) {
				var rolls = args[0].split("d");
				
				if (rolls.length == 2) {
					
					for (i = rolls[0]; i > 0; i--) {
						if (i > 50) {
							break;
							break;
						}
						if (abort) {
							break;
							break;
							abort = false;
						}
						var returnnum = Math.floor(rolls[1] * Math.random());
						returnnum = returnnum + 1;
						
						unifiedIO.print('roll: ' + returnnum,msg);
					}
				} else {
					unifiedIO.print('Expecting the command in the format of !roll 1d20',msg);
				}
				
				
				//rolled...
			} else {
				unifiedIO.print('Expecting the command in the format of !roll 1d20',msg);
			}
		}
		
		
		return;
	},
};
