module.exports = {
    name: 'roll',
	aliases: [],
	cooldown: 5,
    description: 'You could use a roll!',
    execute(msg, args) {
       var author = msg.author; 
		  var i = Math.floor(HugAdverbs.length*Math.random());
		  console.log('The Sai bot ' + HugAdverbs[i] + ' hugs!');
    },
};