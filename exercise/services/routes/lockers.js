const routes = require('express').Router()
const lockerCtrl = require('../controllers/lockers')

routes.route('/get').get(lockerCtrl.listAll) //Get all customers data
routes.route('/create').post(lockerCtrl.create) //Add a customer data
routes.route('/update/:id').put(lockerCtrl.edit) //Update a customer data
routes.route('/remove/:id').delete(lockerCtrl.remove) //Delete a customer data

module.exports = routes