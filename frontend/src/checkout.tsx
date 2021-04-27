import React from "react";
import './checkout.css';
import leftArrow from './img/leftArrow.png';
import penEdit from './img/penEdit.png';

function checkout() {
    const head = (
        <div className="title">
            <br></br>
            <input type="image" alt="back" className="back" src={leftArrow}/>
            <h1>Checkout</h1>
            <br></br>           
        </div>
    )
    
    const location = (
        <div className="container" id="loc">
            <h2 className="pickup">Pick up location</h2>
            <p className="address">757 Swanston St, ParkVille VIC 3010</p>
            <p className="desc">next to Stop 1</p>
        </div>
    )
    
    const cart = (
        <div className="container" id="cart">
            <h2>Your Cart</h2>
    
            <div className="cart">
                <div className="item">
                    <input type="image" alt="edit" className="edit" src={penEdit}/>
                    <h3>1x Cappuccino</h3>
                </div>
                
                <p className="price">$8.00</p>
            </div>
        </div>
    )
    
    const payment = (
        <div className="container" id="payment">
            <h2>Payment</h2>
    
            <div className="amount">
                <h3 className="payment">Total amount</h3>
                <h3 className="value">$8.00</h3>
            </div>
            <br></br><br></br><br></br><br></br>
            
            <div className="amountPaid">
                <h3 className="payment">Amount to be paid</h3>
                <h3 className="value">$8.00</h3>
            </div>
        </div>
    )

    const order = (
        <div className="order">
            <button className="order" type="submit" value="order">
                <h3 className="payment" id="order">Place order</h3>
                <h3 className="value" id="order">$8.00</h3>
            </button>
        </div>
    )

    return(
        <div>
            {head}
            {location}
            {cart}
            {payment}
            {order}
        </div>
    )
}

export default checkout;