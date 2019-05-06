const routes = require('express').Router()
const customerCtrl = require('../controllers/customers')

routes.route('/get').get(customerCtrl.listAll) //Get all customers data
routes.route('/create').post(customerCtrl.create) //Add a customer data
routes.route('/get/:id').get(customerCtrl.getOne)//Get a customer data by id
routes.route('/update/:id').put(customerCtrl.edit) //Update a customer data
routes.route('/remove/:id').delete(customerCtrl.remove) //Delete a customer data
routes.route('/mailing').post(customerCtrl.mailing)//Send a key to a customer by email with nodemailer
routes.route('/receipt').post(customerCtrl.getReceipt)//Send a receipt to a customer by email with nodemailer

module.exports = routes