import React from 'react';
import './vendorOrder.css';
import vanIcon from '../img/vanTruck.png';

class Header extends React.Component {
    render() {
        return (
            <div>
                <input type="image" alt="Profile" className="vanIcon" src={vanIcon} />
                <h1 className="vendorOrder">Orders</h1>
            </div>
        )
    }
}

class Content extends React.Component {
    render() {
        return (
            <div className ="row">
                <div className ="column">
                    <div className ="outstanding">
                        <h2 className ="vendorOrder">Outstanding Orders</h2>
                        <div className ="perOrder">
                            <div className ="leftBox">
                                <p className = "vendorOrder">#A0001</p>
                                <p className = "vendorOrder">9:00:20</p>
                            </div>
                            <p className = "orderName">Natasha Rayani</p>
                        </div>
                    </div>
                </div>

                <div className ="column">

                    <div className ="orderDetails">
                        <h2 className ="vendorOrder">Details</h2>
                        <div className ="orderCard">
                            <p className ="vendorOrder">#A0001</p>
                            <p className = "vendorOrder">9:00:20</p>
                            <p className="orderName">Natasha Rayani</p>
                            <p className = "vendorOrder">3x Cappucino</p>
                            <button type="button" className="btn-vendorOrder">Ready</button>
                        </div>
                    </div>

                    <div className ="ordersFulfilled">
                        <h2 className ="vendorOrder">Orders Fulfilled</h2>
                            <div className="perOrder">
                                <div className="leftBox">
                                    <p className = "vendorOrder">#A0001</p>
                                    <p className = "vendorOrder">9:00:20</p>
                                </div>
                                <p className = "orderName">Natasha Rayani</p>
                                <button type="button" className="btn-vendorOrder">Completed</button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

class VendorOrder extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

export default VendorOrder