import * as express from 'express'
import * as dotenv from 'dotenv'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

import * as emojipastaData from '../data/emoji-data.json'

const emojiData = emojipastaData

dotenv.config()

const app = express()
app.use(cors())

app.use(bodyParser.json())

// For health checks:
app.get('/', (_req: express.Request, res: express.Result) => {
  res.sendStatus(200)
})

app.post('/convert', (req: express.Request, res: express.Result) => {
  const { input, density } = req.body
  const words = input.trim().split(' ')

  const result = words.reduce((acc: string, wordRaw: string) => {
    const word = wordRaw.replace(/[^0-9a-zA-Z]/g, '').toLowerCase()
    const randomChoice = Math.random() * 100 <= density

    if (randomChoice && Object.prototype.hasOwnProperty.call(emojiData, word)) {
      const emojiOptionsMapping = emojiData[word]
      const emojiOptionsList = []
      Object.entries(emojiOptionsMapping).forEach(([option, frequency]) => {
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
