import React from "react";
import './orderStatus.css';
import leftArrow from '../img/leftArrow.png';
import order from '../img/orderStatus/order.png';
import prepare from '../img/orderStatus/prepare.png';
import ready from '../img/orderStatus/ready.png';
import dashLine from '../img/orderStatus/dashLine.png';
import { getId } from "../App";
import history from "../history";

class Header extends React.Component {
    render() {
        return (
            <div className="titleOrder">
                <br></br><br></br>
                <input type="image" className="back" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1>Order Status</h1>
            </div>
        )
    }
}

class Status extends React.Component {
    state = {
        details: [] as any,
    }

    orderId = getId() || "";

    render() {
        return (
            <div>
                <div className="titleOrder">
                    <h2 className="invoice">INVOICE: #A0001</h2>
                    <h2 className="invoice">29 April 2021 3.25 PM</h2>
                </div>

                <div className="orderTime">
                    <h4 className="time">Time Elapsed: 5m 30s</h4>
                    <button className="cancel" type="submit" value="edit">Edit or Cancel Order</button>
                </div>

                <div className="orderTime">

                    <div className="progressImage">
                        <img className="status" src={order} alt="Order"/>
                        <img className="status line" src={dashLine} alt="Line"/>
                        <img className="status" src={prepare} alt="Prepare"/>
                        <img className="status line" id="notReady" src={dashLine} alt="Line"/>
                        <img className="status" id="notReady" src={ready} alt="Ready"/>
                    </div>

                    <br />
                    
                    <div className="progressStatus">
                        <div className="status">
                            <h3>Order received</h3>
                            <p className="time" id="status">03:20 PM</p>
                        </div>
            
                        <div className="status">
                            <h3>Preparing order</h3>
                            <p className="time" id="status">03:25 PM</p>
                        </div>
            
                        <div className="status">
                            <h3 id="notReady">Ready for pickup</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class OrderStatus extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Status />
            </div>
        )
    }
}

export default OrderStatus;