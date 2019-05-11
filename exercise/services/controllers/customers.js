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
//Get a customer data by id
function getOne(req, res, report) {
    customerData.find({lockerID: req.params.id}).then(function(details) {
        res.send(details)
    }).catch(report)
}
//Add a customer data
function create(req, res, report) {
    customerData.create(req.body).then(function(details) {
        res.send(details)
    }).catch(report)
}
//Update a customer data
function edit(req, res, report) {
    customerData.findOneAndUpdate({lockerID: req.params.id}, req.body, {upsert:false}, function(err, doc){
        if (err) {
            return res.send(500, { error: err })
        } else {
            return res.send(doc)
        }
    })
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
//Mailing a receipt to a customer
function getReceipt(req, res, report) {
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
        subject: 'Receipt [ZafeBox coin locker]',
        html: '&nbsp;&nbsp;&nbsp;&nbsp;<b>Receipt [ZafeBox coin locker]</b><br/><br/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;Charge: '+req.body.total+' Baht.<br/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;Cash: '+req.body.cash+' Baht.<br/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;Refund Cash: '+req.body.refund+' Baht.<br/><br/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;===Bills and coins for changes===<br/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;You will get '+req.body.numBills+' bills.<br/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;[ '+req.body.bills+' ]<br/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;You will get '+req.body.numCoins+' coins.<br/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;[ '+req.body.coins+' ]<br/><br/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;<b>Thank you to use our service,</b><br/>'+
            '&nbsp;&nbsp;&nbsp;&nbsp;<b>Patchara Chukiatkajohn (ZafeBox Owner).</b><br/>'
    }
          
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = { listAll, create, edit, remove, mailing, getOne, getReceipt }