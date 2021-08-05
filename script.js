const _DiscordBotDemo_Script = document.currentScript;

document.write(`<script src="https://unpkg.com/wc-discord-message@2.0.4/dist/wc-discord-message/wc-discord-message.js"></script>
    <link rel="stylesheet" type="text/css" href="https://discord-bot-demo.github.io/assets/main.css">
    <script src="https://discord-bot-demo.github.io/assets/main.js"></script>

    <div class="discord-bot-demo">
        <div id="main">
            <div id="inner">
            <div id="channels"></div>
            <div id="channel-area">
            <div id="messages"><discord-messages></discord-messages></div>
                <div id="text-area">
                <div id="mention-box"></div>
                <div id="text-box">
                    <div contenteditable="true" id="input" spellcheck="false" autocomplete="off" placeholder="Enter command here"></div>
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>`);