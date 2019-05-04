const lockerData = require('../models/lockers')

//Get all lockers data
function listAll(req, res, report) {
    lockerData.find().then(eachOne => {
        res.json(eachOne)
    }).catch(err => {
        res.json(err.message)
    })
}
//Get all lockers status
function status(req, res, report) {
    lockerData.find({}, 'selected').sort( { lockerID: 1 } ).then(function(selectedStatus) {
            res.send(selectedStatus)
    }).catch(report)
}
//Add a locker data
function create(req, res, report) {
    lockerData.create(req.body).then(function(details) {
        res.send(details)
    }).catch(report)
}
//Update a locker data
function edit(req, res, report) {
    lockerData.findOneAndUpdate({lockerID: req.params.id}, req.body, {upsert:false}, function(err, doc){
        if (err) {
            return res.send(500, { error: err })
        } else {
            return res.send(doc)
        }
    })
}
//Delete a locker data
function remove(req, res, report) {
    lockerData.findByIdAndDelete({_id: req.params.id}).then(function(details) {
        res.send(details)
    }).catch(report)
}

module.exports = { listAll, create, edit, remove, status }