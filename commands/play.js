const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops) => {

    if (!message.member.voiceChannel) 
        return message.channel.send('You have to be in a voice channel to use this command.');

    if (!args[0]) return message.channel.send('Please input a url.');
    
    let validate = await ytdl.validateURL(args[0]);

    if (!validate){

        let commandFile = require('./search');

        return commandFile.run(client, message, args, ops)
    }

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};

    if (!data.connection)
        data.connection = await message.member.voiceChannel.join();
    
    if (!data.queue)
        data.queue = [];

    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if (!data.dispatcher)
        play(client, ops, data);
    else {
        message.channel.send(`Added to the queue: ${info.title} | Requested by: ${message.author.tag}`);
    }

    ops.active.set(message.guild.id, data);
}

async function play(client, ops, data){
    
    client.channels.get(data.queue[0].announceChannel).send(`Now playing: ${data.queue[0].songTitle}`);

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly'}));
    data.dispatcher.setVolume(5/100);

    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function() {
        finish(client, ops, this);
    });
}

function finish(client, ops, dispatcher){

    let fetched = ops.active.get(dispatcher.guildID);

    console.log("before + " + fetched);

    fetched.queue.shift();

    console.log("after + " + fetched);

    if (fetched.queue.length > 0){
        ops.active.set(dispatcher.guildID, fetched);

        play(client, ops, fetched);
    } 
    else {
        ops.active.delete(dispatcher.guildID);

        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;

        if (vc) vc.leave();
    }

}