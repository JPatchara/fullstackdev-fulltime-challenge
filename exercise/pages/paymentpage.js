import React, { Component } from 'react'
import Layout from '../components/layout'
import '../static/styles/paymentpage.scss'
import axios from 'axios'
import CurrencyInput from 'react-currency-input'

class Paymentpage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hour: 0,
            minute: 0,
            totalPrice: 0,
            billsNcoins: [],
            totalChange: 0,
            numCoins: 0,
            numBills: 0,
            bills: [],
            coins: []
        }
    }

    amountToChange(amount, change) {
        if(amount === 0) {
            return []
        } else {
            if(amount >= change[0]) {
                var left = (amount - change[0])
                return [change[0]].concat( this.amountToChange(left, change) )
            } else {
                change.shift()
                return this.amountToChange(amount, change)
            }
        }
    }

    changesCalculate() {
        var paid = this.refs.paid.value
        var totalPrice = 0
        var changes, numCoins, numBills = 0
        var cash, bill, coin = []
        
        if(paid < totalPrice) {
            window.alert("Please put more money for the payment.")
        } else {
            // find the total change
            this.setState({totalChange: paid - totalPrice})
            changes = paid - totalPrice
            // find number of bills and coins for the change
            this.setState({billsNcoins: this.amountToChange(this.state.totalChange, [1000, 500, 100, 50, 20, 10, 5, 2, 1])})
            cash = this.amountToChange(changes, [1000, 500, 100, 50, 20, 10, 5, 2, 1])

            for(let i = 0; i < cash.length; i++) {
                if(cash[i] < 20) {
                    numCoins = numCoins + 1
                    if (numCoins === 1) {
                        coin[numCoins] = cash[i]
                    } else { coin[numCoins] = ", "+cash[i] }
                } else if(cash[i] >= 20) {
                    numBills += 1
                    if (numBills === 1) {
                        bill[numBills] = cash[i]
                    } else { bill[numBills] = ", "+cash[i] }
                }
            }
            this.setState({numCoins: numCoins, numBills: numBills, bills: bill, coins: coin })
        }

        if(paid >= totalPrice) {
            this.setState({ submit: true })
        } else {
            window.alert("Please put more money for the payment.")
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
                        <CurrencyInput thousandSeparator="," prefix="฿" ref="paid"/><br/>
                        <button className="btn btn-primary w-25 mt-4" onClick={() => this.keySubmit()}>Submit</button>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Paymentpage