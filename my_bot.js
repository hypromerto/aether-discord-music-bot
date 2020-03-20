const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';
const playCommand = require('./commands/play');
const leaveCommand = require('./commands/leave');
const queueCommand = require('./commands/queue');
const skipCommand = require('./commands/skip');

const active = new Map();

const ownerID = '231';

client.login('NjkwMjg4MjgwMjcyNjMzOTY3.XnPPIQ.0DtgXHK7O1-q_82RrrdcwlfHMAw');

client.on('message', async message => {
  	// Voice only works in guilds, if the message does not come from a guild,
  	// we ignore it
  	if (!message.guild) return;
	if (message.author.bot) return undefined;
	if (!message.content.startsWith(prefix)) return;

	let ops = {
		ownerID: ownerID,
		active: active
	}

  	let args = message.content.split(" ");
	if (args[0] === '!play')
		playCommand.run(client, message, args, ops);

	if (args[0] == '!queue')
		queueCommand.run(client, message, args, ops);
	
	if(args[0] == '!leave')
		leaveCommand.run(client, message, args, ops);

	if(args[0] == '!skip')
		skipCommand.run(client, message, args, ops);
		
});
