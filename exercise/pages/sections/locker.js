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
                        <div class="card rounded-lg text-center">
                            <div class="card-header text-left  bg-warning">
                                Locker {this.props.locker}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Size: {this.props.size}
                                <button type="button" class="close" aria-label="Close" onClick={this.props.onHide}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Customer: </h5>
                                <p class="card-text">Please put your belonging in the locker before get the key.</p>
                                <a href="#" class="btn btn-primary">Get your key</a>
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