const mongoose = require('mongoose')

const lockerModel = new mongoose.Schema({
    lockerID: { type: Number },
    lockerSize: { type: String },
    selected: { type: Boolean, default: false },
    status: { type: String, required: true  },
    customer: { type: String, required: false },
    startTime: { type: Date, required: false  }
},{
    collection: 'lockers'  
})

module.exports = mongoose.model('locker', lockerModel)