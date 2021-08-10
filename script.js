const _DiscordBotDemo_Script = document.currentScript;

const commandHandler = _DiscordBotDemo_Script.getAttribute('command_handler');
const beginning_message = _DiscordBotDemo_Script.getAttribute('beginning_message');
const user_username = _DiscordBotDemo_Script.getAttribute('user_username');
const user_avatar = _DiscordBotDemo_Script.getAttribute('user_avatar');
const bot_username = _DiscordBotDemo_Script.getAttribute('bot_username');
const bot_avatar = _DiscordBotDemo_Script.getAttribute('bot_avatar');
const lightmode = _DiscordBotDemo_Script.getAttribute('lightmode');

const url = 'https://discord-bot-demo.github.io/demo.html';
const params = new URLSearchParams(url.search);

if (user_username) params.append('uu', encodeURIComponent(user_username));
if (user_avatar) params.append('ua', encodeURIComponent(user_avatar));
if (bot_username) params.append('bu', encodeURIComponent(bot_username));
if (bot_avatar) params.append('ba', encodeURIComponent(bot_avatar));
if (commandHandler) params.append('c', encodeURIComponent(commandHandler));
if (beginning_message) params.append('m', encodeURIComponent(beginning_message));
if (lightmode === 'true' || lightmode == '1') params.append('l', '1');
const finalUrl = `${url}?${decodeURIComponent(params)}`;

const _DiscordBotDemo_generatedByComment = document.createComment(' Code generated by Discord Bot Demo ');

document.head.appendChild(_DiscordBotDemo_generatedByComment);
const _DiscordBotDemo_FrameCss = document.createElement('style');

document.head.append(_DiscordBotDemo_FrameCss);
_DiscordBotDemo_FrameCss.append(`#DiscordBotDemo {
    border: 0;
}

@media (max-device-width: 950px) {
    #DiscordBotDemo {
        display: none;
    }
}`);

document.write(`<!-- Code generated by Discord Bot Demo --> <iframe id="DiscordBotDemo" width="900px" height="450px" src="${finalUrl}"></iframe>`);