exports.run = (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if (!fetched)
        return message.channel.send('No music is currently playing');

    if (message.member.voiceChannel !== message.guild.me.voiceChannel)
        return message.channel.send('You have to be in the same voice channel as the bot');

    if(isNaN(args[0]) || args[0] > 200 || args[0] < 0)
        return message.channel.send('Input not valid. Please enter a value between 0-200');
    
    fetched.dispatcher.setVolume(args[0]/100);

    message.channel.send(`Set the volume to ${args[0]}`);
}