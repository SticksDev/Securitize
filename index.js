const chalk = require('chalk');
const express = require('express');
const db = require('quick.db')
var keysdb = new db.table('keys')

const app = express()
const port = 3001
const cors = require('cors')

let lastupdated = null

const { v4: uuidv4 } = require('uuid');

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

function addZeros(time) {
  return parseInt(time) < 10 ? "0" + time : time
}


app.use(cors({origin: `*`}))

app.get('/api/process', (req, res) => {
  const error = { code: 500, error: "No request was sent to the API." }
  res.json(error)
})

app.get('/api/process/addkey', (req, res) => {
  const error = { code: 500, error: "No key was sent to the API." }
  const sucess = { code: 200, message: "Sucess, key was added to the database.", complete: "true"}
  if(!req.query.key) {
    res.json(error)
  }else{
    keysdb.set(req.query.key, {Key: req.query.key, UUID: uuidv4()})
    keysdb.add("KeyCount", 1)
    const date = new Date()
    lastupdated = date.getFullYear().toString().concat("/" + (date.getMonth() + 1)).concat("/" + date.getDate()).concat(" | " + addZeros(date.getHours())).concat(":" + addZeros(date.getMinutes())).concat(":" + addZeros(date.getSeconds()))
    res.json(sucess)
  }
})

app.get('/api/process/removekey', (req, res) => {
  const error = { code: 500, error: "No key was sent to the API." }
  const servererror = {code: 500, error: "An system error occured while remvoing the key. Please check the backend system logs!"}
  const sucess = { code: 200, message: "Sucess, key was REMOVED from the database.", complete: "true"}
  if(!req.query.key) {
    res.json(error)
  }else{
    try {
      keysdb.subtract("KeyCount", 1)
      keysdb.delete(req.query.key)
    } catch(e) {
      console.warn("DB REMOVE ERROR: " + e.message)
      res.json(servererror)
    }
    res.json(sucess)
  }
})

app.get('/api/process/keylist', (req, res) => {
  const keylist = keysdb.all().filter((item) => {
    return item.ID !== "KeyCount"
  })
  const sucess = { code: 200, message: keylist, lastupdated}
  res.json(sucess)
})

app.get('/api/process/keycount', (req, res) => {
  const sucess = { code: 200, message: keysdb.get("KeyCount")}
  res.json(sucess)
})

app.get('/api/process/version', (req, res) => {
  const sucess = { code: 200, message: "1.0.0"}
  res.json(sucess)
})

app.get('/api/process/keys', (req, res) => {
  if(!req.query.key) {
    const error = { code: 500, error: "No key was sent to the API." }
    res.json(error)
  }else{
    if(keysdb.fetch(req.query.key) === null) {
      const notfound = {code: 404, message: "key was not found!"}
      res.json(notfound)
    }
    const sucess = {code: 200, message: keysdb.fetch(req.query.key)}
    res.json(sucess)
  }
})

app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`)
})
