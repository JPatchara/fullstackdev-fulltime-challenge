const routes = require('express').Router()
const customerCtrl = require('../controllers/customers')

routes.route('/get').get(customerCtrl.listAll) //Get all customers data
routes.route('/create').post(customerCtrl.create) //Add a customer data
routes.route('/update/:id').put(customerCtrl.edit) //Update a customer data
routes.route('/remove/:id').delete(customerCtrl.remove) //Delete a customer data

module.exports = routes