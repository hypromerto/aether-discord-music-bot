exports.run = (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if (!fetched) 
        return message.channel.send('No music is currently playing.');

    if (message.member.voiceChannel !== message.guild.me.voiceChannel)
        return message.channel.send('You have to be in the same voice channel as the bot');

    if (!fetched.dispatcher.pause)
        return message.channel.send('The music is already playing');

    fetched.dispatcher.resume();

    message.channel.send(`Resumed ${fetched.queue[0].songTitle}`);
}