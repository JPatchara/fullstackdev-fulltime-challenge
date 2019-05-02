import React, { Component } from 'react'
import Layout from '../components/layout'

class Instruction extends Component {

    render() {
        return (
            <div>
                <h2>Instruction for Customer</h2>
                <h3>How to check your belonging:</h3>
                <p>1. Type your name that you want to use for our service.</p>
                <p>2. Press "Checking" button on the screen and it will lead you to locker selection process.</p>
                <p>3. Choose an available locker(green locker) you want.</p>
                <p>4. Put your belonging to your locker.</p>
                <p>5. Press "Get your key" button to get the key for taking out your belonging.</p>
                <p>6. If you want our sending key service you can type your email and then press "send" button.</p>
                <p>Enjoy your day!!</p>
            </div>
        )
    }
}

export default Instruction