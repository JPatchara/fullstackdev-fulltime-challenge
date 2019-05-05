const routes = require('express').Router()
const lockerCtrl = require('../controllers/lockers')

routes.route('/get').get(lockerCtrl.listAll) //Get all lockers data
routes.route('/getStatus').get(lockerCtrl.status) //Get lockers status
routes.route('/get/:id').get(lockerCtrl.getOne)//Get a locker data by their id
routes.route('/create').post(lockerCtrl.create) //Add a locker data
routes.route('/update/:id').put(lockerCtrl.edit) //Update a locker data
routes.route('/remove/:id').delete(lockerCtrl.remove) //Delete a locker data

module.exports = routes