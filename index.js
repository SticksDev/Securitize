const chalk = require('chalk');
const express = require('express')

const app = express()
const port = 3001

require('better-logging')(console, {
    color: {
      base: chalk.greenBright,
      type: {
        debug: chalk.blue,
        info: chalk.green,
        log: chalk.green,
        error: chalk.red,
        warn: chalk.yellow,
      }
    },
});


app.get('/api/process', (req, res) => {
    const error = {code: 500, error: "No request was sent to the API."}
    res.json(error)
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './securitize/build/index.html'))
})

app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`)
})
