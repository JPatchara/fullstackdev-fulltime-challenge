import React from 'react'
import '../../static/styles/keyservice.scss'
import axios from 'axios'
import Router from 'next/router'
import { mailingLockerID, mailingLockerSize, mailingCustomerName } from './locker'

class Keyservice extends React.Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    async mailingKey() {
        var mailingKey = this.props.customerKey
        var email = this.refs.email.value
        
        await axios.post('/customer/mailing', { 
            mailingLockerID, mailingLockerSize, mailingCustomerName, mailingKey, email
        })
        await window.alert("Mailing success!\nPlease press finish to end the service.")
    }

    handleClickToHomepage() {
        Router.push({ pathname: '/'})
    }

    render() {
        return (
            <React.Fragment>
                {this.props.show && (
                    <div className="keyserviceBackground">
                        <div className="keyserviceContent">
                        <div className="card rounded-lg text-center">
                            <div className="card-header text-left text-danger bg-warning font-weight-bold">
                                **Please keep your key code for checking out your belonging**
                            </div>
                            <div className="card-body">
                                <div className="input-group-prepend" id="centerThing">
                                    <h5 className="input-group-text px-4 bg-info text-dark border-warning" id="inputGroup-sizing-default">
                                        Your Key: {this.props.customerKey}
                                    </h5>
                                </div>
                                <br/><p className="card-text text-dark">You may want to consider using our mailing key service.</p>
                                <p className="card-text text-dark">Enter your email and then click the "Send" button.</p>
                                <input type="text" readonly className="w-75 form-control border-warning" aria-label="Default" 
                                    aria-describedby="inputGroup-sizing-default" ref="email" id="centerThing"
                                    placeholder="Type your email here."
                                /><br/>
                                <button className="btn w-25 btn-primary float-left ml-5" onClick={() => this.mailingKey()}>Send</button>
                                <button className="btn w-25 btn-danger float-right mr-5" onClick={() => this.handleClickToHomepage()}>Finish</button>
                            </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

export default Keyservice