require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const botToken = process.env.BOT_TOKEN;
const apiUrl = 'https://source.unsplash.com/random';

const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const keyboard = {
        reply_markup: {
            keyboard: [
                [{ text: 'Press me', request_contact: false, request_location: false }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    };
    bot.sendMessage(chatId, 'Welcome! Press the button to get a random image.', keyboard);
});
bot.onText(/Press me/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        const response = await fetch(apiUrl);
        const imageUrl = response.url;

        bot.sendPhoto(chatId, imageUrl);
    } catch (error) {
        console.error('Error fetching the image:', error.message);
        bot.sendMessage(chatId, 'Sorry, an error occurred while fetching the image.');
    }
});

