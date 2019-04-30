const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('API GET method is working!');
})

module.exports = router