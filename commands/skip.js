exports.run = async (client, message, args, ops) => {
    
    let fetched = ops.active.get(message.guild.id);

    if (!fetched)
        return message.channel.send('No music is currently playing.');

    if (message.member.voice.channel !== message.guild.me.voice.channel)
        return message.channel.send('You have to be in the same voice channel as the bot');

    message.channel.send('Skipping the current song...');

    return fetched.dispatcher.emit('end');
}