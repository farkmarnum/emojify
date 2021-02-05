import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [conversionResult, setConversionResult] = useState<String>()

  const convert = () => {
    // fetch result from api
    setConversionResult('')
  }
  return (
    <div className="main container">
      <div className="row text-center">
        <h1>Emojipasta Generator</h1>
        <p>
          This algorithm was trained on all text posts containing emojis in the
          subreddit{' '}
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
          <textarea style={{ width: '100%' }} id="input" />
          <button type="button" onClick={convert} className="btn">
            Convert
          </button>
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
    </div>
  )
}

export default App
