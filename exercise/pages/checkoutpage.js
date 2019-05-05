import React, { Component } from 'react'
import Layout from '../components/layout'
import '../static/styles/checkoutpage.scss'
import axios from 'axios'
import Router from 'next/router'

class Checkoutpage extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            lockerNum: null,
            customerName: ''
        }
    }

    keySubmit() {
        
        Router.push({ pathname: '/paymentpage'})
    }

    async idPicker() {
        var lockerData = []
        await this.setState({ lockerNum: this.refs.num.value })
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
                                    <input type="password" className="form-control" id="inputPassword" placeholder="Type your key here"/>
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