import React, { Component } from 'react'
import Layout from '../components/layout'
import '../static/styles/paymentpage.scss'
import axios from 'axios'
import CurrencyInput from 'react-currency-input'

class Paymentpage extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            totalPrice: 0,
            hour: 0,
            minute: 0
        }
    }

    render() {
        return(
            <Layout>
                <p className="paymentHead">Payment Process</p>
                <div className="paymentContent">
                    <div className="mx-auto w-100 p-3 text-center px-4">
                        <p className="text-white" id="title">
                            You've been use our service for
                            &nbsp;&nbsp;{this.state.hour}&nbsp;&nbsp; hr.
                            &nbsp;&nbsp;{this.state.minute}&nbsp;&nbsp; min.
                        </p>
                        <p className="text-white" id="title">
                            Total price is 
                            <CurrencyInput id="total" readOnly thousandSeparator="," value={this.state.totalPrice}/> 
                            Bath.
                        </p>
                        <p className="text-white" id="title">Insert money for the payment:</p>
                        <CurrencyInput thousandSeparator="," prefix="฿"/><br/>
                        <button className="btn btn-primary w-25 mt-4" onClick={() => this.keySubmit()}>Submit</button>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Paymentpage