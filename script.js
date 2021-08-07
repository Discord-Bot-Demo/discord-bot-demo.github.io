const _DiscordBotDemo_Script = document.currentScript;

const width = _DiscordBotDemo_Script.getAttribute('width');
const height = _DiscordBotDemo_Script.getAttribute('height');
const commandHandler = _DiscordBotDemo_Script.getAttribute('command_handler');
const beginning_message = _DiscordBotDemo_Script.getAttribute('beginning_message');
const user_username = _DiscordBotDemo_Script.getAttribute('user_username');
const user_avatar = _DiscordBotDemo_Script.getAttribute('user_avatar');
const bot_username = _DiscordBotDemo_Script.getAttribute('bot_username');
const bot_avatar = _DiscordBotDemo_Script.getAttribute('bot_avatar');

let url = 'https://discord-bot-demo.github.io/demo.html';

const querySign = url.includes('?') ? '&' : '?';
if (user_username !== null) url += `${querySign}user_username=${user_username}`;
if (user_avatar !== null) url += `${querySign}user_avatar=${user_avatar}`;
if (bot_username !== null) url += `${querySign}bot_username=${bot_username}`;
if (bot_avatar !== null) url += `${querySign}bot_avatar=${bot_avatar}`;
if (width !== null) url += `${querySign}width=${width}`;
if (height !== null) url += `${querySign}height=${height}`;
if (beginning_message !== null) url += `${querySign}msg=${beginning_message}`;

document.write(`<iframe id="DiscordBotDemoFrame" width="100%" height="100%" frameBorder="0" scrolling="no" src="${url}"></iframe>`);