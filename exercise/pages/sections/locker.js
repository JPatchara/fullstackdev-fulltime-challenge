import React from 'react'
import '../../static/styles/locker.scss'

class Locker extends React.Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.show && (
                    <div className="lockerBackground">
                        <div className="lockerContent">
                        <div className="card rounded-lg text-center">
                            <div className="card-header text-left  bg-warning">
                                Locker {this.props.locker}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Size: {this.props.size}
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
                                    aria-describedby="inputGroup-sizing-default" 
                                    placeholder="Type your name here."    
                                />
                                <br/><p className="card-text text-danger">Please put your belonging in the locker before get the key.</p>
                                <a href="#" className="btn btn-primary">Get your key</a>
                            </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

export default Locker