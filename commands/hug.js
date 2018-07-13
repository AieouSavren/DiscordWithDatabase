var HugAdverbs = new Array ();
HugAdverbs[0] = "firmly";
HugAdverbs[1] = "tightly";
HugAdverbs[2] = "noisily";
HugAdverbs[3] = "merrily";
HugAdverbs[4] = "quickly";
HugAdverbs[5] = "eagerly";
HugAdverbs[6] = "tiredly";
HugAdverbs[7] = "joyously";
HugAdverbs[8] = "zealously";
HugAdverbs[9] = "ferociously";

module.exports = {
    name: 'hug',
	aliases: [],
	cooldown: 5,
    description: 'You could use a hug!',
    execute(msg, args) {
       var author = msg.author; 
		  var i = Math.floor(HugAdverbs.length*Math.random());
		  msg.channel.send('The Sai bot ' + HugAdverbs[i] + ' hugs ' +  author + '!');
    },
};