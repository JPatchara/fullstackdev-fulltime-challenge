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
    const lockerRoutes = require('./routes/lockers')
    const customerRoutes = require('./routes/customers')
    
    server.use(cors())
    server.use(bodyParser.json()) //support json encoded body
    server.use(bodyParser.urlencoded({ extended: true })) //support urlencoded body

    //using custom api from routes directory files
    server.use('/locker', lockerRoutes) 
    server.use('/customer', customerRoutes)

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

//----db handle with mongoose----//
const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://JPatchara:Jin0835795068@coinlocker-ogp6o.mongodb.net/coinlockerDB'

mongoose.connect(connectionURL, {useNewUrlParser: true})
var connection = mongoose.connection
mongoose.set('useFindAndModify', false)

//db status checking
connection.on('connected', function() {
    console.log('connected to coinlocker db')
})
connection.on('disconnected', function() {
    console.log('disconnected to coinlocker db')
})
connection.on('error', function(err) {
    console.log('coinlocker db connection error', err)
})
process.on('SIGINT', function() {
    connection.close(function() {
        console.log('db connection closed due to process termination')
        process.exit(0)
    })
})
module.exports = connection