//----packages requirement----//
const express = require('express')
const next = require('next')
const cors = require('cors')
const bodyParser = require('body-parser')

//----setting up development environment----//
const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

//----server starting handle----//
nextApp.prepare().then(() => {
    const server = express() //create express application
    
    server.use(cors())
    server.use(bodyParser.json()) //support json encoded body
    server.use(bodyParser.urlencoded({ extended: true })) //support urlencoded body

    server.use('/api', require('./api.js')) //using custom api from api.js file

    server.get('*', (req, res) => {
        return handle(req, res)
    })
    
    server.listen(PORT, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:${PORT}')
    })

}).catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})