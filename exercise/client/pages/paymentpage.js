import React, { Component } from 'react'
import Layout from '../components/layout'
import '../static/styles/paymentpage.scss'
import axios from 'axios'
import CurrencyInput from 'react-currency-input'
import { customerCharge, serviceTime } from './checkoutpage'
import Receipt from './sections/receipt';

// var serviceTime = 60
// var customerCharge = 50
class Paymentpage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            serviceHour: 0,
            billsNcoins: [],
            totalChange: 0,
            numCoins: 0,
            numBills: 0,
            bills: [],
            coins: [],
            cash: 0,
            submit: false
        }
    }

    componentDidMount() {
        //time information handle (minute to hour converting)
        this.setState({ serviceHour: serviceTime/60 })

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

    async changesCalculate() {
        var paid = this.refs.paid.getMaskedValue().replace(/,(?=\d{3})/g, '')
        this.setState({ cash: paid})
        var changes = 0
        var numCoins = 0
        var numBills = 0
        var cash = []
        var bill = []
        var coin = []
        
        if(paid < customerCharge) {
            window.alert("Please put more money for the payment.")
        } else {
            // find the total change
            await this.setState({totalChange: paid - customerCharge})
            changes = paid - customerCharge
            // find number of bills and coins for the change
            await this.setState({billsNcoins: this.amountToChange(this.state.totalChange, [1000, 500, 100, 50, 20, 10, 5, 2, 1])})
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
            await this.setState({numCoins: numCoins, numBills: numBills, bills: bill, coins: coin })
            await console.log("Total change is "+this.state.totalChange+"\nThere are "+this.state.numBills+" bills and "+this.state.numCoins+" coins\n"+this.state.bills+"/"+this.state.coins)
        }

        if(paid >= customerCharge) {
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
                        <p className="text-primary" id="title">
                            You've been use our service for
                            &nbsp;&nbsp;{this.state.serviceHour}&nbsp;&nbsp; hr.<br/>(charge by an hour)
                        </p><br/>
                        <p className="text-white" id="title">
                            Total price is 
                            <CurrencyInput id="total" readOnly thousandSeparator="," value={customerCharge}/> 
                            Bath.
                        </p><hr/>
                        <p className="text-white" id="title">Insert money for the payment:</p>
                        <label className="text-warning mr-2">฿</label>
                        <CurrencyInput thousandSeparator="," ref="paid" precision="0"/><br/>
                        <button className="btn btn-primary w-25 mt-4" onClick={() => this.changesCalculate()}>Submit</button>
                    </div>
                </div>
                <Receipt show={this.state.submit} changes={this.state.totalChange}
                    numBills={this.state.numBills} numCoins={this.state.numCoins}
                    bills={this.state.bills} coins={this.state.coins}
                    total={customerCharge} cash={this.state.cash}
                />
            </Layout>
        )
    }
}

export default Paymentpage