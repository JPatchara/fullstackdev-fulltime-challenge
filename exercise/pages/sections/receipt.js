import React from 'react'
import '../../static/styles/receipt.scss'
import axios from 'axios'
import Router from 'next/router'

class Receipt extends React.Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    async mailingReceipt() {
        var email = this.refs.email.value
        var total = this.props.total
        var cash = this.props.cash
        var refund = this.props.changes
        var numBills = this.props.numBills
        var numCoins = this.props.numCoins
        var bills = this.props.bills
        var coins = this.props.coins

        await axios.post('/customer/receipt', { 
            total, cash, refund, numBills, numCoins, bills, coins, email
        })
    }

    handleClickToHomepage() {
        Router.push({ pathname: '/'})
    }

    render() {
        return (
            <React.Fragment>
                {this.props.show && (
                    <div className="receiptBackground">
                        <div className="receiptContent">
                        <div className="card rounded-lg text-left">
                            <div className="card-header text-left text-dark bg-warning font-weight-bold">
                                Receipt [ZafeBox coin locker]
                            </div>
                            <div className="card-body">
                                <div className="row align-items-center m-0 mw-100">
                                    <div className="col-6 text-left border-0">Charge:</div>
                                    <div className="col-6 text-right border-0">{this.props.total} &nbsp;&nbsp;Baht.</div>
                                </div>
                                <div className="row align-items-center m-0 mw-100">
                                    <div className="col-6 text-left border-0">Cash:</div>
                                    <div className="col-6 text-right border-0">{this.props.cash} &nbsp;&nbsp;Baht.</div>
                                </div>
                                <div className="row align-items-center m-0 mw-100">
                                    <div className="col-6 text-left border-0">Refund Cash:</div>
                                    <div className="col-6 text-right border-0">{this.props.changes} &nbsp;&nbsp;Baht.</div>
                                </div><br/><br/>
                                <div className="row align-items-center m-0 mw-100">
                                    <div className="col-12 text-center border-0">==========Bills and coins for changes==========</div>
                                </div>
                                <div className="row align-items-center m-0 mw-100">
                                    <div className="col-12 text-left border-0">You'll get {this.props.numBills} bills</div>
                                </div>
                                <div className="row align-items-center m-0 mw-100">
                                    <div className="col-12 text-left border-0">[ {this.props.bills} ]</div>
                                </div><br/>
                                <div className="row align-items-center m-0 mw-100">
                                    <div className="col-12 text-left border-0">You'll get {this.props.numCoins} coins</div>
                                </div>
                                <div className="row align-items-center m-0 mw-100">
                                    <div className="col-12 text-left border-0">[ {this.props.coins} ]</div>
                                </div><br/><hr/>
                                <p className="card-text text-dark">Enter your email and then click the "Get receipt" button.</p>
                                <input type="text" className="w-75 form-control border-warning" aria-label="Default" 
                                    aria-describedby="inputGroup-sizing-default" ref="email" id="centerThing"
                                    placeholder="Type your email here."
                                /><br/>
                                <button className="btn w-50 btn-primary float-left ml-5 mb-2" onClick={() => this.mailingReceipt()}>Get receipt</button>
                                <button className="btn w-25 btn-danger float-right mr-5 mb-2" onClick={() => this.handleClickToHomepage()}>Finish</button>
                            </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

export default Receipt