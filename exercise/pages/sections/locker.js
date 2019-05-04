import React from 'react'
import '../../static/styles/locker.scss'
import Keyservice from './keyservice'
import axios from 'axios'

class Locker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customerName: '',
            customerKey: '',
            getKey: false,
        }
    }

    randomCustomerKey(length) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        var lockerKey = ''
        for (var x = 0; x < length; x++) {
            var i = Math.floor(Math.random() * chars.length)
            lockerKey += chars.charAt(i)
        }
        return lockerKey
    }
    
    customerKeyGenerate() {
        this.setState({ customerName: this.refs.name.value })
        this.setState({ customerKey: this.randomCustomerKey(8) })
        this.setState({ getKey: true })
    }

    render() {
        return (
            <React.Fragment>
                {this.props.show && (
                    <div className="lockerBackground">
                        <div className="lockerContent">
                        <div className="card rounded-lg text-center">
                            <div className="card-header text-left  bg-warning">
                                Locker No.{this.props.locker}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button type="button" className="close" aria-label="Close" onClick={this.props.onHide}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="input-group-prepend ml-4">
                                    <h5 className="input-group-text px-4 bg-transparent text-dark border-0" id="inputGroup-sizing-default">
                                        Customer Name:
                                    </h5>
                                </div>
                                <input type="text" className="w-75 form-control border-warning ml-5" aria-label="Default" 
                                    aria-describedby="inputGroup-sizing-default" ref="name"
                                    placeholder="Type your name here."    
                                />
                                <br/><p className="card-text text-danger">Please put your belonging in the locker before get the key.</p>
                                <button className="btn btn-primary" onClick={() => this.customerKeyGenerate()}>Get your key</button>
                            </div>
                            </div>
                        </div>
                    </div>
                )}
                <Keyservice show={this.state.getKey} customerKey={this.state.customerKey}/>
            </React.Fragment>
        )
    }
}

export default Locker