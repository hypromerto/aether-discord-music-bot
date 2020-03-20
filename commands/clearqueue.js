exports.run = (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if (fetched.queue.length <= 0)
        return message.channel.send('Queue is already empty.');

    fetched.queue = [];

    ops.active.set(message.guild.id, fetched);

    return message.channel.send('Cleared the queue.');
}