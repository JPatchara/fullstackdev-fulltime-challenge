//----packages requirement----//
const express = require('express')
const next = require('next')
const cors = require('cors')
const socketIO = require('socket.io')
const bodyParser = require('body-parser')
const server = express() //create express application
const path = require('path')

//----setting up development environment----//
const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

//----db handle with mongoose----//
const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://JPatchara:Jin0835795068@coinlocker-ogp6o.mongodb.net/coinlockerDB'
mongoose.set('useFindAndModify', false)
mongoose.connect(connectionURL, {useNewUrlParser: true})

//----server starting handle----//
nextApp.prepare().then(() => {
    const lockerRoutes = require('./routes/lockers')
    const customerRoutes = require('./routes/customers')
    
    server.use(cors({ origin: true }))
    server.use(bodyParser.json()) //support json encoded body
    server.use(bodyParser.urlencoded({ extended: true })) //support urlencoded body

    //using custom api from routes directory files
    server.use('/locker', lockerRoutes) 
    server.use('/customer', customerRoutes)

    //handling request from the server
    server.get('*', (req, res) => {
        return handle(req, res)
    })
    
    const app = server.listen(process.env.PORT || PORT, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:${PORT}')
    })

    //----socket.io handle----//
    const io = socketIO.listen(app)

    io.on('connection', client => {
        //response when client connect
        console.log('service connected')
      
        //response when client disconnect
        client.on('disconnect', () => {
            console.log('service disconnected')
        })

        client.on('selected-locker', function (lockerNum) {
            io.sockets.emit('taken', lockerNum)
            console.log('selected-locker = '+ lockerNum)
        })
    })

}).catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})

//db status checking
var connection = mongoose.connection
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

module.exports = { nextApp, server, connection }