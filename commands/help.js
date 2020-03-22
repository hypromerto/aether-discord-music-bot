exports.run = async (client, message, args, ops) => {

    let response = `__**Available Commands**__\n**/play** -> Usage: /play song-title OR /play youtube-url\n**/pause** -> Pauses the current song\n**/resume** -> Resumes the current paused song\n**/queue** -> Displays the song queue\n**/skip** -> Skips the current song\n**/volume value** -> Changes the volume of Aether. Value needs to be between 0-200\n**/clearqueue** -> Clears the song queue\n**/leave** -> Bot leaves the voice channel.`;

    return message.channel.send(response);
}