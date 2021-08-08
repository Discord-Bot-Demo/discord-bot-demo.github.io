/*
 * Data sending
*/

//-----------//
// Defaults //
//---------//

const defaultUserAvatars = [
    'https://cdn.discordapp.com/embed/avatars/0.png',
    'https://cdn.discordapp.com/embed/avatars/1.png',
    'https://cdn.discordapp.com/embed/avatars/2.png',
    'https://cdn.discordapp.com/embed/avatars/3.png',
    'https://cdn.discordapp.com/embed/avatars/4.png',
    'https://cdn.discordapp.com/embed/avatars/5.png'
]

const defaults = {
    avatars: {
        user: defaultUserAvatars[Math.floor(Math.random() * defaultUserAvatars.length)],
        bot: 'https://discord.com/assets/f78426a064bc9dd24847519259bc42af.png'
    },
    usernames: {
        user: 'User',
        bot: 'Bot'
    }
}

const data = {
    user: {
        username: document.location.href.includes('user_username=') ? decodeURIComponent(document.location.href.split('user_username=')[1].split('&')[0]) : defaults.usernames.user,
        avatar: document.location.href.includes('user_avatar=') ? decodeURIComponent(document.location.href.split('user_avatar=')[1].split('&')[0]) : defaults.avatars.user
    },
    bot: {
        username: document.location.href.includes('bot_username=') ? decodeURIComponent(document.location.href.split('bot_username=')[1].split('&')[0]) : defaults.usernames.bot,
        avatar: document.location.href.includes('bot_avatar=') ? decodeURIComponent(document.location.href.split('bot_avatar=')[1].split('&')[0]) : defaults.avatars.bot
    },
    commandHandler: document.location.href.includes('handler=') ? decodeURIComponent(document.location.href.split('handler=')[1].split('&')[0]) : 'commandHandler',
    beginning_message: document.location.href.includes('msg=') ? decodeURIComponent(document.location.href.split('msg=')[1].split('&')[0]) : ''
}

window.top.postMessage(data, '*');

const DiscordBotDemo = {
    userInVC: false,
    botInVC: false
}

function load() {
    const root = document.querySelector('#main');

    // Hide command handler from devtools
    const cmdElement = document.createElement('script');

    cmdElement.src = `${data.commandHandler}.js`;
    cmdElement.type = 'text/javascript';
    cmdElement.id = 'DiscordBotDemo_CommandHandler';
    
    document.body.appendChild(cmdElement);
    document.querySelector('#DiscordBotDemo_CommandHandler').remove();

    // Demo channels
    const channelsDiv = document.querySelector('#main #channels');
    
    channelsDiv.innerHTML = `<div id="text">
        <svg id="icon">
        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z">
        </path>
        </svg>
        <p id="name">Text Channel</p>
    </div>
    <div id="voice">
        <svg id="icon">
        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z">
        </path>
        </svg>
        <p id="name">Voice Channel</p>
    </div>
    <div class="member-list"></div>
    <div class="voice-controls">
        <div class="content" style="visibility: hidden">
            <div id="title">Voice Connected</div>
            <div>
            <button>
            <div>
                <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M21.1169 1.11603L22.8839 2.88403L19.7679 6.00003L22.8839 9.11603L21.1169 10.884L17.9999 7.76803L14.8839 10.884L13.1169 9.11603L16.2329 6.00003L13.1169 2.88403L14.8839 1.11603L17.9999 4.23203L21.1169 1.11603ZM18 22H13C6.925 22 2 17.075 2 11V6C2 5.447 2.448 5 3 5H7C7.553 5 8 5.447 8 6V10C8 10.553 7.553 11 7 11H6C6.063 14.938 9 18 13 18V17C13 16.447 13.447 16 14 16H18C18.553 16 19 16.447 19 17V21C19 21.553 18.553 22 18 22Z">
                </path>
                </svg>
                </button>
            </div>
        </div>
    </div>`;

    const inputBox = document.querySelector('#main #channel-area #text-box #input');
    const mentionBox = document.querySelector('#main #channel-area #text-area #mention-box');
    const voiceChannel = document.querySelector('#main #channels #voice');
    const memberList = document.querySelector('#main #channels .member-list');
    const voiceControls = document.querySelector('#main #channels .voice-controls .content');
    const vcButton = document.querySelector('#main #channels .voice-controls .content button');

    mentionBox.visible = mode => {
        mode ? mentionBox.innerHTML = `<div id="title">members</div><div id="content" type="bot" selected="true"><img draggable="false" src="${data.bot.avatar}"> ${data.bot.username}</div><div id="content" type="user"><img draggable="false" src="${data.user.avatar}"> ${data.user.username}</div>` : mentionBox.innerHTML = '';
    }

    if (data.beginning_message) createMessage(true, data.beginning_message.trim());

    inputBox.addEventListener('keydown', e => {
        if (e.key === 'Enter') e.preventDefault();
        if (e.key === '@') mentionBox.visible(true);

        if (e.key === 'Backspace' && /.@$/.test(inputBox.textContent)) return mentionBox.visible(true);
        if (e.key === 'Backspace' && /@$/.test(inputBox.textContent)) return mentionBox.visible(false);
        if (e.key === 'Backspace' && /@.$/.test(inputBox.textContent)) return mentionBox.visible(true);
    
        if (/@$/.test(inputBox.textContent)) {
            const user = document.querySelector('#main #channel-area #text-area #mention-box #content[type="user"]');
            const bot = document.querySelector('#main #channel-area #text-area #mention-box #content[type="bot"]');
            const selected = document.querySelector('#main #channel-area #text-area #mention-box #content[selected="true"]');

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                user.setAttribute('selected', 'false');
                bot.setAttribute('selected', 'true');
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                bot.setAttribute('selected', 'false');
                user.setAttribute('selected', 'true');
            }

            if (e.key === 'Enter' || e.keyShift && e.key === 'Enter') {
                mentionBox.visible(false);
                inputBox.textContent = inputBox.textContent.replace(/@$/, `@${selected.textContent.trimStart()}`);
                const selection = window.getSelection();
                const range = document.createRange();
                selection.removeAllRanges();
                range.selectNodeContents(inputBox);
                range.collapse(false);
                selection.addRange(range);
                return inputBox.focus();
            }
        }

        if (e.key === 'Enter' && inputBox.textContent) {
            mentionBox.visible(false);
            createMessage(false, inputBox.textContent.trim());
            inputBox.textContent = '';
        }
    });

    mentionBox.addEventListener('click', e => {
        const type = e.target.getAttribute('type');
        const img = e.target.getAttribute('src');

        mentionBox.visible(false);
        if (type === 'bot' || img === data.bot.avatar) inputBox.textContent = inputBox.textContent.replace(`@`, `@${data.bot.username}`);
        if (type === 'user' || img === data.user.avatar) inputBox.textContent = inputBox.textContent.replace(`@`, `@${data.user.username}`);

        const selection = window.getSelection();
        const range = document.createRange();
        selection.removeAllRanges();
        range.selectNodeContents(inputBox);
        range.collapse(false);
        selection.addRange(range);
        inputBox.focus();
    });

    voiceChannel.addEventListener('click', () => {
        if (DiscordBotDemo.userInVC) return;

        const member = `<div class="member user">
            <img draggable="false" src="${data.user.avatar}"> ${data.user.username}
        </div>`;
        
        memberList.innerHTML += member;
        voiceControls.style = '';
        DiscordBotDemo.userInVC = true;
    });

    vcButton.addEventListener('click', () => {
        const member = document.querySelector('#channels .member-list .member.user');
    
        if (!DiscordBotDemo.botInVC) {
            member.remove();
            voiceControls.style = 'visibility: hidden';
            return DiscordBotDemo.userInVC = false;
        }

        const isSpeaking = document.querySelector('#channels .member-list .member.bot').classList.contains('speaking');
        if (!isSpeaking) {
            member.remove();
            voiceControls.style = 'visibility: hidden';
            return DiscordBotDemo.userInVC = false;
        }

        audio.stop();
        member.remove();
        voiceControls.style = 'visibility: hidden';
        DiscordBotDemo.userInVC = false;
    });
}

window.addEventListener('load', load);

// Voice channel function
function joinVoiceChannel() {
    const memberList = document.querySelector('#main #channels .member-list');
    
    const member = `<div class="member bot">
        <img draggable="false" src="${data.bot.avatar}"> ${data.bot.username}
    </div>`;

    if (!DiscordBotDemo.botInVC) memberList.innerHTML += member;
    DiscordBotDemo.botInVC = true;
}

function leaveVoiceChannel() {
    const member = document.querySelector('#main #channels .member-list .member.bot');

    if (DiscordBotDemo.botInVC) member.remove();
    DiscordBotDemo.botInVC = false;
    if (!audio._a.paused) audio.stop();
}

const audio = {
    _a: new Audio(),
    play: function(src) {
        if (!DiscordBotDemo.botInVC) return console.log('Bot is not in voice channel, it must join before playing audio');

        const isSpeaking = document.querySelector('#channels .member-list .member.bot').classList.contains('speaking');
        if (isSpeaking) return;
        
        this._a.src = src;
        document.querySelector('#channels .member-list .member.bot').classList += " speaking";
        this._a.play();
    },
    stop: function() {
        const isSpeaking = document.querySelector('#channels .member-list .member.bot').classList.contains('speaking');
        if (DiscordBotDemo.botInVC && isSpeaking) document.querySelector('#channels .member-list .member.bot.speaking').classList.remove("speaking");
        this._a.pause();
        this._a.currentTime = 0;
    },
    setVolume: function(percentage) {
        return this._a.volume = percentage/100;
    },
    getVolume: function() {
        return this._a.volume*100;
    },
    isPlaying: function() {
        return !this._a.paused;
    }
}

audio._a.addEventListener('pause', () => {
    const isSpeaking = document.querySelector('#channels .member-list .member.bot').classList.contains('speaking');
    if (DiscordBotDemo.botInVC && isSpeaking) document.querySelector('#channels .member-list .member.bot.speaking').classList.remove("speaking");
});

function createMessage(isBot, content, parseHTML = true) {
    const messagesDiv = document.querySelector('discord-messages');
    const message = document.createElement('discord-message');

    message.setAttribute('author', isBot ? data.bot.username : data.user.username);
    message.setAttribute('bot', isBot);
    message.setAttribute('avatar', isBot ? data.bot.avatar : data.user.avatar);
    const contentRaw = content;
    
    content = content
    .replace(new RegExp(`@${data.bot.username}`, 'g'), `<discord-mention>${data.bot.username}</discord-mention>`)
    .replace(new RegExp(`@${data.user.username}`, 'g'), `<discord-mention highlight>${data.user.username}</discord-mention>`)

    if (!isBot) message.textContent = contentRaw;
    if (isBot && !parseHTML) message.textContent = contentRaw;
    if (isBot && parseHTML) message.innerHTML = content;

    messagesDiv.append(message);

    setTimeout(function() {
        message.querySelector('.discord-author-avatar img').setAttribute('draggable', false);
        const messages = document.querySelector('#messages');
        messages.scrollTo(0, messages.scrollHeight);
    }, 50);
    
    if (!isBot) commandHandler(contentRaw);
}