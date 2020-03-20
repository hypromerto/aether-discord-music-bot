exports.run = async (client, message, args, ops) => {
    
    let fetched = ops.active.get(message.guild.id);

    if (!fetched)
        return message.channel.send('No music is currently playing.');

        
}