const mongoose = require('mongoose')

const customerModel = new mongoose.Schema({
    customer: { type: String },
    lockerID: { type: String },
    lockerKey: { type: String },
    checkout: { type: Boolean },
    checkoutTime: { type: Date }
},{
    collection: 'customers'  
})

module.exports = mongoose.model('customer', customerModel)