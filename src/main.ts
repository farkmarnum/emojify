import * as dotenv from 'dotenv'

import * as emojiData from '../data/emoji-data.json'
import { commonWords, inappropriateEmojis } from '../data/constants'

dotenv.config()

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === '/about') {
    bot.sendMessage(chatId, "I emojify your text. Send me any message to get it emojified!\n\n" +
      "Credits: emojify.net // Mark Farnum");
  } else {
    bot.sendMessage(chatId, emojify(msg.text))
  }
});

const isInappropriate = (str) =>
  inappropriateEmojis.some((emoji) => str.includes(emoji))

const emojify = (input, density = 100, shouldFilterEmojis = false) => {
  const words = input.replace(/\n/g, ' \n ').split(' ')
    return words
      .reduce((acc: string, wordRaw: string) => {
        const word = wordRaw.replace(/[^0-9a-zA-Z]/g, '').toLowerCase()

        const accNext = `${acc} ${wordRaw}`

        const randomChoice = Math.random() * 100 <= density
        const isTooCommon = commonWords.has(word)

        const emojiFilter = shouldFilterEmojis
          ? (option: string) => !isInappropriate(option)
          : () => true

        const emojiOptions = Object.entries(emojiData[word] || {})
          .filter(([option]) => emojiFilter(option))
          .reduce(
            (arr, [option, frequency]) => [
              ...arr,
              ...[...Array(frequency)].fill(option),
            ],
            [],
          )

        if (isTooCommon || !randomChoice || emojiOptions.length === 0) {
          return accNext
        }

        const emojis =
          emojiOptions[Math.floor(Math.random() * emojiOptions.length)]

        return `${accNext} ${emojis}`
      }, '')
      .trim()

}

console.log(emojify("Bot is ready to go!"));
