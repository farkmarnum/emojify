import * as express from 'express'
import * as dotenv from 'dotenv'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

import * as emojiData from '../data/emoji-data.json'
import { commonWords, inappropriateEmojis } from '../data/constants'

const isInappropriate = (str) =>
  inappropriateEmojis.some((emoji) => str.includes(emoji))

dotenv.config()

const app = express()
app.use(cors())

app.use(bodyParser.json({ limit: '500kb' }))

// For health checks:
app.get('/', (_req: express.Request, res: express.Result) => {
  res.sendStatus(200)
})

app.post('/convert', (req: express.Request, res: express.Result) => {
  const { input, density, shouldFilterEmojis } = req.body
  const words = input.replace(/\n/g, ' ').split(' ')

  const result = words.reduce((acc: string, wordRaw: string) => {
    const word = wordRaw.replace(/[^0-9a-zA-Z]/g, '').toLowerCase()

    const randomChoice = Math.random() * 100 <= density
    const isTooCommon = commonWords.has(word)
    const wordHasEmojis = Object.prototype.hasOwnProperty.call(emojiData, word)

    const emojiFilter = shouldFilterEmojis
      ? (option: string) => !isInappropriate(option)
      : () => true

    if (randomChoice && !isTooCommon && wordHasEmojis) {
      const emojiOptionsMapping = emojiData[word]
      const emojiOptionsList = []
      Object.entries(emojiOptionsMapping)
        .filter(([option]) => emojiFilter(option))
        .forEach(([option, frequency]) => {
          ;[...Array(frequency).keys()].forEach(() => {
            emojiOptionsList.push(option)
          })
        })
      const index = Math.floor(emojiOptionsList.length * Math.random())
      const emojis = emojiOptionsList[index]
      return `${acc} ${wordRaw} ${emojis}`
    }
    return `${acc} ${wordRaw}`
  }, '')

  res.json({ result })
})

app.listen(process.env.PORT)

console.info(`Server running on port ${process.env.PORT}`)
