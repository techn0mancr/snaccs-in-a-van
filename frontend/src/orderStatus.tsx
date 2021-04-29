import React from "react";
import './orderStatus.css';
import leftArrow from './img/leftArrow.png';
import order from './img/orderStatus/order.png';
import prepare from './img/orderStatus/prepare.png';
import ready from './img/orderStatus/ready.png';
import dashLine from './img/orderStatus/dashLine.png';

function orderStatus() {
    const head = (
        <div className="title">
            <br></br><br></br>
            <input type="image" className="back" src={leftArrow}/>
            <h1>Order Status</h1>
            <h2 className="invoice">INVOICE: #A0001</h2>
        </div>
    )

    const time = (
        <div className="order">
            <h4 className="time">Time Elapsed: 5m 30s</h4>
            <button type="submit" value="edit">Edit or Cancel Order</button>
        </div>
    )

    const status = (
        <div className="order">

            <div className="progressImage">
                <img src={order} alt="Order"/>
                <img className="line" src={dashLine} alt="Line"/>
                <img src={prepare} alt="Prepare"/>
                <img className="line" id="notReady" src={dashLine} alt="Line"/>
                <img id="notReady" src={ready} alt="Ready"/>
            </div>

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
    )

    return(
        <div>
            {head}
            {time}
            {status}
        </div>
    )
}

export default orderStatus;