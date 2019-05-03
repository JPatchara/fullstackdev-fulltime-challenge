const customerData = require('../models/customers')

//Get all customers data
function listAll(req, res, report) {
    customerData.find().then(eachOne => {
        res.json(eachOne)
    }).catch(err => {
        res.json(err.message)
    })
}
//Add a customer data
function create(req, res, report) {
    customerData.create(req.body).then(function(details) {
        res.send(details)
    }).catch(report)
}
//Update a customer data
function edit(req, res, report) {
    customerData.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
        customerData.findOne({_id: req.params.id}).then(function(details) {
            res.send(details)
        }).catch(report)
    }).catch(report)
}
//Delete a customer data
function remove(req, res, report) {
    customerData.findByIdAndDelete({_id: req.params.id}).then(function(details) {
        res.send(details)
    }).catch(report)
}

module.exports = { listAll, create, edit, remove }