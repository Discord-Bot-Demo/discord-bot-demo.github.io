const _DiscordBotDemo_Script = document.currentScript;

const commandHandler = _DiscordBotDemo_Script.getAttribute('command_handler');
const beginning_message = _DiscordBotDemo_Script.getAttribute('beginning_message');
const user_username = _DiscordBotDemo_Script.getAttribute('user_username');
const user_avatar = _DiscordBotDemo_Script.getAttribute('user_avatar');
const bot_username = _DiscordBotDemo_Script.getAttribute('bot_username');
const bot_avatar = _DiscordBotDemo_Script.getAttribute('bot_avatar');

const url = 'demo.html';
const params = new URLSearchParams(url.search);

if (user_username) params.append('user_username', encodeURIComponent(user_username));
if (user_avatar) params.append('user_avatar', encodeURIComponent(user_avatar));
if (bot_username) params.append('bot_username', encodeURIComponent(bot_username));
if (bot_avatar) params.append('bot_avatar', encodeURIComponent(bot_avatar));
if (commandHandler) params.append('handler', encodeURIComponent(commandHandler));
if (beginning_message) params.append('msg', encodeURIComponent(beginning_message));
const finalUrl = `${url}?${decodeURIComponent(params)}`;

document.write(`<iframe id="DiscordBotDemo" width="900px" height="450px" frameBorder="0" scrolling="no" src="${finalUrl}"></iframe>`);