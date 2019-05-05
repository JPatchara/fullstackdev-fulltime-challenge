const customerData = require('../models/customers')
const nodemailer = require('nodemailer')

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
//Mailing a key to a customer
function mailing(req, res, report) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zafebox.coinlocker@gmail.com',
            pass: 'zafebox@556'
        }
    })

    var mailOptions = {
        from: 'zafebox.coinlocker@gmail.com',
        to: req.body.email,
        subject: 'Your locker details(Zafebox coin locker)',
        html: '&nbsp;&nbsp;&nbsp;&nbsp;<b>ZafeBox coin locker</b><br/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;Hello our customer '+req.body.mailingCustomerName+'.<br/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;Your locker is locker number '+req.body.mailingLockerID+
            ' size "'+req.body.mailingLockerSize+'".<br/>'+'**Your key for unlock the locker is "'+
            req.body.mailingKey+'".**'
    }
          
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = { listAll, create, edit, remove, mailing }