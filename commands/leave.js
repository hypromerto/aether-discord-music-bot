exports.run = (client, message, args, ops) => {

    if (!message.member.voice.channel) 
        return message.channel.send('You have to be in a voice channel to use this command.');

    if (!message.guild.me.voice.channel) 
        return message.channel.send('Bot is not connected to a guild.');
    
    if (message.guild.me.voice.channelID !== message.member.voice.channelID)
        return message.channel.send('You aren\'t in the same channel as the bot');

    message.guild.me.voice.channel.leave();

    message.channel.send('Leaving channel...');
}