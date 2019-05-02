import React, { Component } from 'react'
import Layout from '../components/layout'
import '../static/styles/servicepage.scss'
import Locker from './sections/locker'

class Servicepage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: null,
            locker: 0,
            size: "",
            access: false
        }
    }

    lockerSelected(lockerNum, lockerSize) {
        console.log('U are selecting locker'+lockerNum+'.')

        this.setState({ access: true })
        this.setState({ locker: lockerNum })
        this.setState({ size: lockerSize })

        if (this.state.selected === lockerNum) {
            this.setState({ selected : null })
        } else {
            this.setState({ selected : lockerNum })
        }
        

        //if coustomerName =! lockerUser disble onclick(pointer-event: none)
        //else if coustomerName == lockerUser enable onclick(pointer-event: ture)

    }

    lockerStatus(lockerNum) {
        // more checking condition with selected status in DB & cancel service
        if (this.state.selected === lockerNum) {
            return 'red'
        } else {
            return 'rgba($color: #15a5e7e0, $alpha: 0.55)'
        }
    }

    closeLocker() {
        this.setState({ access: false })
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
                        <div className="col-2 text-center border border-dark" id="locker" style={{background: this.lockerStatus(1)}} onClick={() => this.lockerSelected(1,"Small")}>
                            <div className="lockerDetails">
                                <p className="lockerNum">#1</p>
                                <p>S01</p>
                            </div>
                        </div>
                        <div className="col-3 text-center border border-dark" id="locker" style={{background: this.lockerStatus(2)}} onClick={() => this.lockerSelected(2,"Medium")}>
                            <p className="lockerNum">#2</p>
                            <p>M01</p>
                        </div>
                        <div className="col-4 text-center border border-dark" id="locker" style={{background: this.lockerStatus(3)}} onClick={() => this.lockerSelected(3,"Large")}>
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
                        <div className="col-2 text-center border border-dark" id="locker" style={{background: this.lockerStatus(4)}} onClick={() => this.lockerSelected(4,"Small")}>
                            <p className="lockerNum">#4</p>
                            <p>S02</p>
                        </div>
                        <div className="col-3 text-center border border-dark" id="locker" style={{background: this.lockerStatus(5)}} onClick={() => this.lockerSelected(5,"Medium")}>
                            <p className="lockerNum">#5</p>
                            <p>M02</p>
                        </div>
                        <div className="col-4 text-center border border-dark" id="locker" style={{background: this.lockerStatus(6)}} onClick={() => this.lockerSelected(6,"Large")}>
                            <p className="lockerNum">#6</p>
                            <p>L02</p>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-2 h-50" id="gap"/>
                        <div className="col-2 text-center border border-dark" id="locker" style={{background: this.lockerStatus(7)}} onClick={() => this.lockerSelected(7,"Small")}>
                            <p className="lockerNum">#7</p>
                            <p>S03</p>
                        </div>
                        <div className="col-3 text-center border border-dark" id="locker" style={{background: this.lockerStatus(8)}} onClick={() => this.lockerSelected(8,"Medium")}>
                            <p className="lockerNum">#8</p>
                            <p>M03</p>
                        </div>
                        <div className="col-4 text-center border border-dark" id="locker" style={{background: this.lockerStatus(9)}} onClick={() => this.lockerSelected(9,"Large")}>
                            <p className="lockerNum">#9</p>
                            <p>L03</p>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-2 h-50" id="gap"/>
                        <div className="col-2 text-center border border-dark" id="locker" style={{background: this.lockerStatus(10)}} onClick={() => this.lockerSelected(10,"Small")}>
                            <p className="lockerNum">#10</p>
                            <p>S04</p>
                        </div>
                        <div className="col-3 text-center border border-dark" id="locker" style={{background: this.lockerStatus(11)}} onClick={() => this.lockerSelected(11,"Medium")}>
                            <p className="lockerNum">#11</p>
                            <p>M04</p>
                        </div>
                        <div className="col-4 text-center border border-dark" id="locker" style={{background: this.lockerStatus(12)}} onClick={() => this.lockerSelected(12,"Large")}>
                            <p className="lockerNum">#12</p>
                            <p>L04</p>
                        </div>
                    </div>
                </div>
                <Locker show={this.state.access} onHide={() => this.closeLocker()} locker={this.state.locker} size={this.state.size}/>
            </Layout>
        )
    }
}

export default Servicepage