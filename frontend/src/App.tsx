import React, { useState } from 'react'
import * as toastr from 'toastr'
import Clipboard from 'react-clipboard.js'
import 'toastr/build/toastr.min.css'
import './App.css'

const DENSITY_MAX = 100

const apiUrl = process.env.REACT_APP_API_URL

const App = () => {
  const [input, setInput] = useState('')
  const [density, setDensity] = useState(DENSITY_MAX)
  const [shouldFilterEmojis, setShouldFilterEmojis] = useState(true)
  const [conversionResult, setConversionResult] = useState<string>()

  const convert = async () => {
    try {
      const response = await fetch(`${apiUrl}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, density, shouldFilterEmojis }),
      })
      const data = await response.json()

      const { result } = data
      setConversionResult(result)
    } catch (err) {
      console.error(err)
    }
  }

  const onCopySuccess = () => {
    toastr.success('Copied to clipboard!')
  }

  return (
    <>
      <div className="main container">
        <div className="row text-center">
          <h1>Emojipasta Generator</h1>
          <p className="subtitle">
            This algorithm was trained on all text posts containing emojis in
            the subreddit{' '}
            <a
              href="https://www.reddit.com/r/emojipasta"
              target="_blank"
              rel="noreferrer"
            >
              /r/emojipasta
            </a>
            .
          </p>
        </div>
        <div className="row">
          <div className="eight columns offset-by-two">
            <textarea
              style={{ width: '100%' }}
              className="input"
              value={input}
              onChange={(evt) => setInput(evt.target.value)}
            />
            <div className="interface">
              <div>
                <span style={{ marginRight: '1rem' }}>Emoji density:</span>
                <span>
                  <input
                    type="range"
                    className="slider"
                    min={0}
                    max={DENSITY_MAX}
                    step={1}
                    value={density}
                    onChange={(evt) => {
                      setDensity(Number(evt.target.value))
                    }}
                  />
                </span>{' '}
                <span style={{ fontSize: '2.4rem', verticalAlign: '-0.2rem' }}>
                  {density <= 10 && '😶'}
                  {density > 10 && density <= 20 && '😐'}
                  {density > 20 && density <= 30 && '🙂'}
                  {density > 30 && density <= 40 && '😀'}
                  {density > 40 && density <= 50 && '😛'}
                  {density > 50 && density <= 60 && '😅'}
                  {density > 60 && density <= 70 && '😂'}
                  {density > 70 && density <= 80 && '🤣'}
                  {density > 80 && density <= 90 && '😈'}
                  {density > 90 && density <= 100 && '💩'}
                </span>
              </div>
              <button type="button" onClick={convert} className="btn">
                Convert
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="eight columns offset-by-two">
            Filter out inappropriate emojis{' '}
            <input
              type="checkbox"
              checked={shouldFilterEmojis}
              onChange={(evt) => {
                setShouldFilterEmojis(evt.target.checked)
              }}
            />
          </div>
        </div>
        <div className="row">
          <div
            className="eight columns offset-by-two"
            style={{ opacity: conversionResult ? 1 : 0.5 }}
            id="conversion-result"
          >
            {conversionResult || '(Result will appear here)'}
          </div>
        </div>
        <div className="row">
          <div
            className="eight columns offset-by-two"
            style={{ marginTop: '1.5rem' }}
          >
            <Clipboard
              data-clipboard-text={conversionResult}
              className="btn"
              style={{ float: 'right' }}
              onSuccess={onCopySuccess}
            >
              copy to clipboard
            </Clipboard>
          </div>
        </div>
      </div>

      <footer>
        <div>© Mark Farnum {new Date().getFullYear()}</div>
        <div className="funding">
          Like this tool? You can{' '}
          <a
            href="https://paypal.me/markfarnum"
            target="_blank"
            rel="noreferrer"
          >
            chip in
          </a>{' '}
          to pay for the server or{' '}
          <a
            href="https://github.com/farkmarnum/emojify"
            target="_blank"
            rel="noreferrer"
          >
            contribute
          </a>{' '}
          to improve the code.
        </div>
      </footer>
    </>
  )
}

export default App
