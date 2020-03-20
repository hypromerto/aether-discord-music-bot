exports.run = async (client, message, args, ops) => {
    
    let fetched = ops.active.get(message.guild.id);

    if (!fetched)
        return message.channel.send('No music is currently playing.');

    if (message.member.voiceChannel !== message.guild.me.voiceChannel)
        return message.channel.send('You have to be in the same voice channel as the bot');

    let userCount = message.member.voiceChannel.members.size;

    let required = Math.ceil(userCount/2);

    if (!fetched.queue[0].voteSkips)
        fetched.queue[0].voteSkips = [];
    
    if (fetched.queue[0].voteSkips.includes(message.member.id))
        return message.channel.send(`You already voted to skip. ${fetched.queue[0].voteSkips.length}/${required} votes needed to skip`);

    fetched.queue[0].voteSkips.push(message.member.id);

    ops.active.set(message.guild.id, fetched);

    if (fetched.queue[0].voteSkips.length >= required){

        message.channel.send('Skipping the current song...');

        return fetched.dispatcher.emit('finish');
    }

    message.channel.send(`Voted to skip the current song. ${fetched.queue[0].voteSkips.length}/${required} votes needed to skip`);
}