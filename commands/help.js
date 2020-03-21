exports.run = async (client, message, args, ops) => {

    let response = `__**Available Commands**__\n**/play** Usage: /play song-title OR /play youtube-url\n**/pause** Pauses the current song\n
                    **/resume** Resumes the current paused song\n**/queue** Displays the song queue\n**/clearqueue** Clears the song queue\n
                    **/leave** Bot leaves the voice channel.`;

    return message.channel.send(response);
}