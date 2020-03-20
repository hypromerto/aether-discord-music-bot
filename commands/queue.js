
exports.run = async (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if (!fetched) return message.channel.send('There is no music playing.');

    let queue = fetched.queue;
    let nowPlaying = queue[0];

    let response = `__**Now Playing**__\n**${nowPlaying.songTitle}** -- **Requested by:** *${nowPlaying.requester}*\n\n__**Queue**__\n`;

    for (var i = 1; i < queue.length; i++){
        response += `${i}. **${queue[i].songTitle}** -- **Requested by:** *${queue[i].requester}*\n`;
    }

    message.channel.send(response);

}