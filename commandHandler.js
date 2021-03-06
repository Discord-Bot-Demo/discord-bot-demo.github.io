function commandHandler(message) {
    if (message === '<discord-mention>Bot</discord-mention>') createMessage(true, `<code>!github</code> - Get link to project's github<br>
    <code>!docs</code> - Go to documentation<br>
    <code>!discord</code> - Get link to support server<br>
    <code>!say</code> - Say something as bot<br>
    <code>!radio</code> - Radio controls<br>
    <code>!leave</code> - Leave voice channel<br>
    <code>!deletetest</code> - Deletes your message<br>
    <code>!bulkdelete</code> - Deletes given amount of messages`);

    const prefix = '!';

    if (!message.startsWith(prefix)) return;

    const args = message.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    
    if (command === 'github') createMessage(true, 'Here is the repo link: https://github.com/discord-bot-demo/discord-bot-demo.github.io');
    if (command === 'docs') createMessage(true, 'Here is the docs link: https://discord-bot-demo.github.io/docs');
    if (command === 'discord') createMessage(true, 'https://discord.gg/YAPsEdXEMY');

    if (command === 'say') {
        if (!args.length) return createMessage(true, 'Enter some args');
        createMessage(true, args.join(' '));
    }

    if (command === 'deletetest') deleteMessage();
    if (command === 'bulkdelete') {
        if (!args.length) return createMessage(true, 'Enter the amount of messages you want to delete');
        bulkDeleteMessages(args[0]);
    }
    
    if (command === 'radio') {
        if (!args.length) return createMessage(true, 'Enter an action (play/stop/volume)');
        if (args.length && !DiscordBotDemo.userInVC) return createMessage(true, 'You must be in a voice channel');

        if (args[0] === 'play') {            
            joinVoiceChannel();
            audio.play('https://streams.iloveradio.de/iloveradio5.mp3');
        }
        if (args[0] === 'stop') {
            if (!DiscordBotDemo.botInVC) return createMessage(true, 'I\'m not in a voice channel');
            if (!audio.isPlaying()) return createMessage(true, 'I\'m not playing any audio');
            audio.stop();
        }

        if (args[0] === 'volume') {
            if (!args[1]) return createMessage(true, `Current volume: ${audio.getVolume()}%`);

            if (args[1] < 1 || args[1] > 100) return createMessage(true, 'Volume must be within 1-100');
            audio.setVolume(args[1]);
        }
    }

    if (command === 'leave') {
        if (!DiscordBotDemo.userInVC) return createMessage(true, 'You must be in a voice channel');
        if (!DiscordBotDemo.botInVC) return createMessage(true, 'I\'m not in a voice channel');

        leaveVoiceChannel();
    }
}