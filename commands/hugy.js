var HugAdverbs = new Array ();
HugAdverbs[0] = "firmly";


module.exports = {
    name: 'hugb',
	aliases: [],
	cooldown: 5,
    description: 'You could use a hug!',
    execute(msg, args) {
       var author = msg.author; 
		  var i = Math.floor(HugAdverbs.length*Math.random());
		  msg.channel.send('The Sai bot ' + HugAdverbs[i] + ' hugs ' +  author + '!');
    },
};