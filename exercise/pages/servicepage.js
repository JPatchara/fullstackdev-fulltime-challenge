import React, { Component } from 'react'
import Layout from '../components/layout'
import '../static/styles/servicepage.scss'

class Servicepage extends Component {

    constructor(props) {
        super(props)
        this.state = { selected: null }
    }

    lockerSelected(lockerNum) {
        console.log('U are selecting locker'+lockerNum+'.')

        if (this.state.selected === lockerNum) {
            this.setState({ selected : null })
        } else {
            this.setState({ selected : lockerNum })
        }
    }

    lockerStatus(lockerNum) {
        if (this.state.selected === lockerNum) {
            return 'red';
        }
        return 'rgba($color: #15a5e7e0, $alpha: 0.55)';
    }

    render() {
        return(
            <Layout>
                <div className="container h-100" id="lockerArea">
                    <div className="row align-items-center m-0 mw-100" id="size">
                        <div className="col-2 h-50" id="gap"/>
                        <div className="col-2 h-50 text-center bg-secondary border border-dark" id="sizeTXT">
                            S
                        </div>
                        <div className="col-3 h-50 text-center bg-secondary border border-dark" id="sizeTXT">
                            M
                        </div>
                        <div className="col-4 h-50 text-center bg-secondary border border-dark" id="sizeTXT">
                            L
                        </div>
                        <div className="w-100"></div>
                        <div className="col-2 h-50" id="gap">
                            <p>Customer:</p>
                        </div>
                        <div className="col-2 text-center border border-dark" id="locker" style={{background: this.lockerStatus(1)}} onClick={() => {this.lockerSelected(1)}}>
                            <p className="lockerNum">#1</p>
                            <p>S01</p>
                        </div>
                        <div className="col-3 text-center border border-dark" id="locker" style={{background: this.lockerStatus(2)}} onClick={() => {this.lockerSelected(2)}}>
                            <p className="lockerNum">#2</p>
                            <p>M01</p>
                        </div>
                        <div className="col-4 text-center border border-dark" id="locker">
                            <p className="lockerNum">#3</p>
                            <p>L01</p>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-2" id="gap">
                            <div className="greenPoint"/>
                            <p className="info">Available</p>
                            <div className="redPoint"/>
                            <p className="info">Taken</p>
                        </div>
                        <div className="col-2 text-center border border-dark" id="locker">
                            <p className="lockerNum">#4</p>
                            <p>S02</p>
                        </div>
                        <div className="col-3 text-center border border-dark" id="locker">
                            <p className="lockerNum">#5</p>
                            <p>M02</p>
                        </div>
                        <div className="col-4 text-center border border-dark" id="locker">
                            <p className="lockerNum">#6</p>
                            <p>L02</p>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-2 h-50" id="gap"/>
                        <div className="col-2 text-center border border-dark" id="locker">
                            <p className="lockerNum">#7</p>
                            <p>S03</p>
                        </div>
                        <div className="col-3 text-center border border-dark" id="locker">
                            <p className="lockerNum">#8</p>
                            <p>M03</p>
                        </div>
                        <div className="col-4 text-center border border-dark" id="locker">
                            <p className="lockerNum">#9</p>
                            <p>L03</p>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-2 h-50" id="gap"/>
                        <div className="col-2 text-center border border-dark" id="locker">
                            <p className="lockerNum">#10</p>
                            <p>S04</p>
                        </div>
                        <div className="col-3 text-center border border-dark" id="locker">
                            <p className="lockerNum">#11</p>
                            <p>M04</p>
                        </div>
                        <div className="col-4 text-center border border-dark" id="locker">
                            <p className="lockerNum">#12</p>
                            <p>L04</p>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Servicepage