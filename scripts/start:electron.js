const path = require('path')
const { exec } = require('child_process')
const start =  require(path.join(__dirname, 'start.js'))

exec(`npx electron ${path.join(__dirname, '../electron/main.js')}`)
