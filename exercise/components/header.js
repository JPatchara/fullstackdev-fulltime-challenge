import React from 'react'
import '../static/styles/header.scss'
import homeIcon from '../static/images/home.png'
import Router from 'next/router'

class Header extends React.Component {

    handleClickToHomepage() {
        Router.push({ pathname: '/'})
    }
    render() {
        return(
            <div className="headerBG">
                <div className="neon-wrapper">
                    <span className="txt" >Coin Locker</span>
                    <span className="gradient"></span>
                    <span className="dodge"></span>
                </div>
                <img className="homeIcon" src={homeIcon} alt="" onClick={() => this.handleClickToHomepage()}/>
            </div>
        )
    }
}

export default Header