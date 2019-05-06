import React, { Component } from 'react'
import Layout from '../components/layout'
import '../static/styles/checkoutpage.scss'
import axios from 'axios'
import Router from 'next/router'

export var customerCharge
export var serviceTime
class Checkoutpage extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            lockerNum: null,
            customerName: '',
            customerKey: '',
            startTime: null,
            totalCharge: 0
        }
    }

    chargeCalculate() {
        //Charge calculate with different size of locker
        //Locker (1,4,7,10 size is S), (2,5,8,11 size is M), (3,6,9,12 size is L)
        var firstCharge = 0 //Declare first 60 minute charge
        var nextCharge = firstCharge/2 //Next minutes charge

        //Get service end-time
        var today = new Date()
        today.setHours(today.getHours() + 7) //Thailand GMT+7 set up for local time
        var endTime = today.toString()
        var diffTime = (this.state.startTime.getTime() - endTime.getTime()) / 1000 //convert time to seconds
        diffTime /= 60 //convert seconds to minutes
        var totalTime = Math.abs(Math.round(diffTime))

        if(this.state.lockerNum === 1 || this.state.lockerNum === 4 || this.state.lockerNum === 7 || this.state.lockerNum === 10) {
            firstCharge = 50
        } else if(this.state.lockerNum === 2 || this.state.lockerNum === 5 || this.state.lockerNum === 8 || this.state.lockerNum === 11) {
            firstCharge = 100
        } else if(this.state.lockerNum === 3 || this.state.lockerNum === 6 || this.state.lockerNum === 9 || this.state.lockerNum === 12) {
            firstCharge = 200
        }

        if (totalTime < 60) {
            this.setState({ totalCharge: firstCharge })
        } else if (totalTime > 60) {
            var nextHours = (totalTime / 60) - 1 //Get next hours counting time
            this.setState({ totalCharge: firstCharge+(nextHours * nextCharge) })
        }

        customerCharge = this.state.totalCharge //Keep value to global variable for a next process
    }

    async keySubmit() {
        //key checking before the payment
        if( this.refs.key.value === this.state.customerKey) {

            await Router.push({ pathname: '/paymentpage'})
        } else {
            window.alert("Incorrect Key!\nPlease enter the key again.")
        }
    }

    async idPicker() {
        var lockerData, lockerDetails, details, startDate, name, theKey = []
        await this.setState({ lockerNum: this.refs.num.value })
        //Get customer name of that locker
        await axios.get('/locker/get/'+this.refs.num.value)
        .then(response => {
            console.log(response.data)
            lockerData = response.data
            lockerData.forEach(function(object, i) {
                name = object.customer
            })
            this.setState({customerName: name})
        })
        .catch(function (error) {
            console.log(error)
        })
        //Get customer key for checking entered key
        await axios.get('/customer/get/'+this.refs.num.value)
        .then(response => {
            lockerDetails = response.data
            lockerDetails.forEach(function(object, i) {
                theKey = object.lockerKey
            })
            this.setState({ customerKey: theKey})
        }).catch(function (error) {
            console.log(error)
        })
        await console.log(this.state.customerKey)
        //Get service start time of the customer for charge calculate
        await axios.get('/locker/get/'+this.refs.num.value)
        .then(response => {
            details = response.data
            details.forEach(function(object, i) {
                startDate = object.startTime
            })
            this.setState({ startTime: startDate})
        }).catch(function (error) {
            console.log(error)
        })
        await console.log(this.state.startTime)
    }

    render() {
        return(
            <Layout>
                <p className="checkoutHead">Checking out</p>
                <div className="checkoutContent">
                    <div className="mx-auto w-100 p-3 text-center px-4">
                        <div className="mb-0 w-100 p-3 text-left">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label text-white" id="title">Locker No. </label>
                                <select className="custom-select w-25" ref="num" onChange={()=>this.idPicker()}>
                                    <option selected>Number</option>
                                    <option value="1">1</option><option value="2">2</option><option value="3">3</option>
                                    <option value="4">4</option><option value="5">5</option><option value="6">6</option>
                                    <option value="7">7</option><option value="8">8</option><option value="9">9</option>
                                    <option value="10">10</option><option value="11">11</option><option value="12">12</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label text-white" id="title">Customer:</label>
                                <div className="col-sm-8 ml-4">
                                    <input type="text" readOnly className="form-control-plaintext text-white" value={this.state.customerName}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label text-white mr-2" id="title">Key:</label>
                                <div className="col-sm-8 ml-4">
                                    <input type="password" className="form-control" id="inputPassword" placeholder="Type your key here" ref="key"/>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary w-25" onClick={() => this.keySubmit()}>Submit</button>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Checkoutpage