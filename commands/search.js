const search = require('yt-search');

exports.run = (client, message, args, ops) => {

    search(args.join(' '), function(err, res) {

        if (err) 
            return message.channel.send('Something went wrong.');

        let video = res.videos.slice(0, 1);

        let playFile = require('./play');
        playFile.run(client, message, [video[0].url], ops);
    });
}