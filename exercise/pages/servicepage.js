import React, { Component } from 'react'
import Layout from '../components/layout'
import '../static/styles/servicepage.scss'
import Locker from './sections/locker'
import axios from 'axios'
import socketIOClient from 'socket.io-client'

var url = 'http://localhost:3000'
var currentStatus = []
class Servicepage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            access: false,
            timestamp: null,
            locker: 0,
            size: '',
            lockerStatus: [],
            endpoint: "http://localhost:3000" // connect to realtime server url
        }
        this.infoResponse = this.infoResponse.bind(this)
        this.lockerStatusDetection = this.lockerStatusDetection.bind(this)
    }

    async componentDidMount() {
        var statusList = []
        
        await axios.get('/locker/getStatus')
        .then(status => {
            statusList = status.data
            statusList.forEach(function(object, i) {
                currentStatus[i+1] = object.selected
            })
            this.setState({lockerStatus: currentStatus})
        })
        .catch(function (error) {
            console.log(error)
        })

        this.infoResponse()
    }

    async lockerSelected(lockerNum, lockerSize) {
        if (this.state.lockerStatus[lockerNum] === false) {
            //time setting
            var today = new Date()
            today.setHours(today.getHours() + 7) //Thailand GMT+7 set up for local time
            var date = today.toString()

            await this.setState({ timestamp: date })
            await console.log(this.state.timestamp)

            await this.setState({ access: true })
            await this.setState({ locker: lockerNum })
            await this.setState({ size: lockerSize})

            const socket = socketIOClient(this.state.endpoint) //socket.io client handle
            await socket.emit('selected-locker', this.state.locker)
            
            await axios.put(
                '/locker/update/'+lockerNum,
                { selected: this.state.access, startTime: this.state.timestamp, status: "taken" },
                { headers: { 'Content-Type': 'application/json' } }
            ).then(response => { 
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            })
        } else {
            window.alert("This Locker has been taken.")
        }
    }

    lockerStatusDetection(lockerNum) {
        if (this.state.lockerStatus[lockerNum] === true) {
            return 'red'
        } else {
            return 'rgba($color: #15a5e7e0, $alpha: 0.55)'
        }
    }

    closeLocker() {
        this.setState({ access: false })
        //axios put method for wipe out the locker info
    }

    infoResponse() {
        const socket = socketIOClient(this.state.endpoint) //socket.io client handle
        var statusList = []
        socket.on('taken', function(lockerNum){
            // this.lockerStatusDetection(lockerNum) //real time locker color change
            //update infomation from all lockers status
            console.log(lockerNum)
            axios.get('/locker/getStatus')
            .then(status => {
                statusList = status.data
                statusList.forEach(function(object, i) {
                    currentStatus[i+1] = object.selected
                })
                this.setState({lockerStatus: currentStatus})
                if (this.state.lockerStatus[lockerNum] === true) {
                    return 'red'
                } else {
                    return 'rgba($color: #15a5e7e0, $alpha: 0.55)'
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        }.bind(this))
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
                        <div className="col-2 h-50" id="gap"/>
                        <div className="col-2 text-center border border-dark" id="locker" style={{background: this.lockerStatusDetection(1)}} onClick={() => this.lockerSelected(1,'S')}>
                            <div className="lockerDetails">
                                <p className="lockerNum">#1</p>
                                <p>S01</p>
                            </div>
                        </div>
                        <div className="col-3 text-center border border-dark" id="locker" style={{background: this.lockerStatusDetection(2)}} onClick={() => this.lockerSelected(2,'M')}>
                            <p className="lockerNum">#2</p>
                            <p>M01</p>
                        </div>
                        <div className="col-4 text-center border border-dark" id="locker" style={{background: this.lockerStatusDetection(3)}} onClick={() => this.lockerSelected(3,'L')}>
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
                        <div className="col-2 text-center border border-dark" id="locker" style={{background: this.lockerStatusDetection(4)}} onClick={() => this.lockerSelected(4,'S')}>
                            <p className="lockerNum">#4</p>
                            <p>S02</p>
                        </div>
                        <div className="col-3 text-center border border-dark" id="locker" style={{background: this.lockerStatusDetection(5)}} onClick={() => this.lockerSelected(5,'M')}>
                            <p className="lockerNum">#5</p>
                            <p>M02</p>
                        </div>
                        <div className="col-4 text-center border border-dark" id="locker" style={{background: this.lockerStatusDetection(6)}} onClick={() => this.lockerSelected(6,'L')}>
                            <p className="lockerNum">#6</p>
                            <p>L02</p>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-2 h-50" id="gap"/>
                        <div className="col-2 text-center border border-dark" id="locker" style={{background: this.lockerStatusDetection(7)}} onClick={() => this.lockerSelected(7,'S')}>
                            <p className="lockerNum">#7</p>
                            <p>S03</p>
                        </div>
                        <div className="col-3 text-center border border-dark" id="locker" style={{background: this.lockerStatusDetection(8)}} onClick={() => this.lockerSelected(8,'M')}>
                            <p className="lockerNum">#8</p>
                            <p>M03</p>
                        </div>
                        <div className="col-4 text-center border border-dark" id="locker" style={{background: this.lockerStatusDetection(9)}} onClick={() => this.lockerSelected(9,'L')}>
                            <p className="lockerNum">#9</p>
                            <p>L03</p>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-2 h-50" id="gap"/>
                        <div className="col-2 text-center border border-dark" id="locker" style={{background: this.lockerStatusDetection(10)}} onClick={() => this.lockerSelected(10,'S')}>
                            <p className="lockerNum">#10</p>
                            <p>S04</p>
                        </div>
                        <div className="col-3 text-center border border-dark" id="locker" style={{background: this.lockerStatusDetection(11)}} onClick={() => this.lockerSelected(11,'M')}>
                            <p className="lockerNum">#11</p>
                            <p>M04</p>
                        </div>
                        <div className="col-4 text-center border border-dark" id="locker" style={{background: this.lockerStatusDetection(12)}} onClick={() => this.lockerSelected(12,'L')}>
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