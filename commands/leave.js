exports.run = (client, message, args, ops) => {

    if (!message.member.voiceChannel) 
        return message.channel.send('You have to be in a voice channel to use this command.');

    if (!message.guild.me.voiceChannel) 
        return message.channel.send('Bot is not connected to a guild.');
    
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID)
        return message.channel.send('You aren\'t in the same channel with the bot');

    message.guild.me.voiceChannel.leave();

    message.channel.send('Leaving channel...');
}