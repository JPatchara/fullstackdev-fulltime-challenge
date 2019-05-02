import React, { Component } from 'react'
import Layout from '../components/layout'
import logo from '../static/images/lockerLogo.png'
import checkinIcon from '../static/images/checkin.png'
import takeoutIcon from '../static/images/takeout.png'
import '../static/styles/homepage.scss'
import Router from 'next/router'

class Homepage extends Component {

    handleClickToServicepage() {
        Router.push({ pathname: '/servicepage'})
    }

    handleClickToCheckoutpage() {
        // Router.push({ pathname: '/checkoutpage'})
    }

    render() {
        return(
            <Layout>
                <div className="row align-items-center" id="content">
                    <div className="col-6">
                        <h1>ZafeBox</h1>
                        <img className="logo" src={logo} alt=""/>
                    </div>
                    <div className="col-6" id="optionsPart">
                        {/* <div className="namingTitle">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-transparent text-dark border-success border-bottom-0" id="inputGroup-sizing-default">
                                    Customer Name:
                                </span>
                            </div>
                            <input type="text" className="w-75 form-control border-success" aria-label="Default" 
                                aria-describedby="inputGroup-sizing-default" 
                                placeholder="Type your name here."    
                            />
                        </div> */}
                        <button type="button" className="btn btn-primary" id="storeBTN" onClick={() => this.handleClickToServicepage()}>
                            Checking<br/><br/>
                            <img className="buttonIcon" src={checkinIcon} alt="" />
                        </button>
                        <button type="button" className="btn btn-danger" id="removeBTN" onClick={() => this.handleClickToCheckoutpage()}>
                            Taking out<br/><br/>
                            <img className="buttonIcon" src={takeoutIcon} alt="" />
                        </button>
                        <div className="advertise">
                            <li>More than just security and convenience.</li>
                            <li>Safer than you think Safer than your life.</li>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Homepage