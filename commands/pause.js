exports.run = (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if (!fetched) 
        return message.channel.send('No music is currently playing.');

    if (message.member.voiceChannel !== message.guild.me.voiceChannel)
        return message.channel.send('You have to be in the same voice channel as the bot');

    if (fetched.dispatcher.paused)
        return message.channel.send('The music is already paused');

    fetched.dispatcher.pause();

    message.channel.send(`Paused ${fetched.queue[0].songTitle}`);
}