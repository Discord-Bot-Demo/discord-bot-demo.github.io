function commandHandler(message) {
    if (message === `@${bot.username}`) createMessage(true, `<code>!github</code> - Get link to project's github<br>
    <code>!docs</code> - Go to documentation<br>
    <code>!discord</code> - Get link to support server<br>
    <code>!say</code> - Say something as bot<br>
    <code>!radio</code> - Radio controls<br>
    <code>!leave</code> - Leave voice channel`);

    const prefix = '!';

    if (!message.startsWith(prefix)) return;

    const args = message.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    
    if (command === 'github') createMessage(true, 'Here is the repo link: <a href="https://github.com/discord-bot-demo/discord-bot-demo.github.io" target="_blank">https://github.com/discord-bot-demo/discord-bot-demo.github.io</a>');
    if (command === 'docs') createMessage(true, 'Here is the docs link: <a href="https://discord-bot-demo.github.io/docs" target="_blank">https://discord-bot-demo.github.io/docs</a>');
    if (command === 'discord') createMessage(true, '<a href="https://discord.gg/YAPsEdXEMY" target="_blank">https://discord.gg/YAPsEdXEMY</a>');

    if (command === 'say') {
        if (!args.length) return createMessage(true, 'Enter some args');
        createMessage(true, args.join(' '), false);
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