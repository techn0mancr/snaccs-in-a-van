import React from "react";
import './order.css';
import leftArrow from '../img/leftArrow.png';
import penEdit from '../img/penEdit.png';
import history from '../history';

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br></br>
                <input type="image" alt="back" className="back" src={leftArrow} onClick={()=> history.goBack()}/>
                <h1>Order</h1>
                <br></br>           
            </div>
        )
    }
}

class Invoice extends React.Component {
    render() {
        return (
            <div className="title">
                <h2 className="invoice">INVOICE: #A0001</h2>
                <h2 className="invoice">29 April 2021 3.25 PM</h2>
            </div>
        )
    }
}

class Location extends React.Component {
    render() {
        return (
            <div className="containerCheckout" id="loc">
                <h2 className="pickup">Pick up location</h2>
                <p className="address">757 Swanston St, ParkVille VIC 3010</p>
                <p className="desc">next to Stop 1</p>
            </div>
        )
    }
}

class Cart extends React.Component {
    render() {
        return (
            <div className="containerCheckout" id="cart">
                <h2>Your Cart</h2>
        
                <div className="cart">
                    <div className="item">
                        <h3>1x Cappuccino</h3>
                    </div>
                    
                    <p className="price">$8.00</p>
                </div>
            </div>
        )
    }
}

class Payment extends React.Component {
    render() {
        return (
            <div className="containerCheckout" id="payment">
                <h2>Payment</h2>
        
                <div className="amount">
                    <h3 className="payment">Total amount</h3>
                    <h3 className="value">$8.00</h3>
                </div>
                <br></br><br></br><br></br>
                
                <div className="amountPaid">
                    <h3 className="payment">Amount to be paid</h3>
                    <h3 className="value">$8.00</h3>
                </div>
            </div>
        )
    }
}

class OrderDetails extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Invoice />
                <Location />
                <Cart />
                <Payment />
            </div>
        )
    }
}

export default OrderDetails;