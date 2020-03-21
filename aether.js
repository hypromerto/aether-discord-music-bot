const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '/';
const token = process.env.token;

const playCommand = require('./commands/play');
const leaveCommand = require('./commands/leave');
const queueCommand = require('./commands/queue');
const skipCommand = require('./commands/skip');
const pauseCommand = require('./commands/pause');
const resumeCommand = require('./commands/resume');
const clearqueueCommand = require('./commands/clearqueue');
const volumeCommand = require('./commands/volume');
const helpCommand = require('./commands/help');

const active = new Map();

const ownerID = '231';

client.login(token);

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

	let commandType = message.content.split(" ")[0];

	let args = message.content.split(" ").slice(1);
	  
	if (commandType === '/play')
		playCommand.run(client, message, args, ops);

	if (commandType == '/queue')
		queueCommand.run(client, message, args, ops);
	
	if(commandType == '/leave')
		leaveCommand.run(client, message, args, ops);

	if(commandType == '/skip')
		skipCommand.run(client, message, args, ops);

	if(commandType == '/pause')
		pauseCommand.run(client, message, args, ops);
	
	if(commandType == '/resume')
		resumeCommand.run(client, message, args, ops);

	if(commandType == '/clearqueue')
		clearqueueCommand.run(client, message, args, ops);

	if(commandType == '/volume')
		volumeCommand.run(client, message, args, ops);

	if(commandType == '/help')
		helpCommand.run(client, message, args, ops);
		
});
