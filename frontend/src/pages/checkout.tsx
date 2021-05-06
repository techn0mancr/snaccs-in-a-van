import React from "react";
import './checkout.css';
import leftArrow from '../img/leftArrow.png';
import penEdit from '../img/penEdit.png';
import history from '../history';
import axios from 'axios';
import { checkoutCart } from '../api';

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br></br>
                <input type="image" alt="back" className="back" src={leftArrow}/>
                <h1>Checkout</h1>
                <br></br>           
            </div>
        )
    }
}

class Information extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        cart: [] as  any,
    }

    async getCart() {
        const BASE_URL = "http://localhost:48080/api";
        const endpoint = `${BASE_URL}/order/checkout`;
        return await axios.get(endpoint) 
        .then((response) => {
            var data = response.data
            this.setState({isLoaded: true, cart: data});
            console.log(response);  
        }, (error) => {
            this.setState({isLoaded: true, error});
            console.log(error);
        },);
    }

    componentDidMount() {
        this.getCart();
    }

    render() {
        const { error, isLoaded, cart } = this.state;
        return (
            <div>
                 <div className="containerCheckout" id="loc">
                    <h2 className="pickup">Pick up location</h2>
                    <p className="address">757 Swanston St, ParkVille VIC 3010</p>
                    <p className="desc">next to Stop 1</p>
                </div>

                <div className="containerCheckout" id="cart">
                    <h2>Your Cart</h2>
            
                    <div className="cart">
                        <div className="item">
                            <h3>1x Cappuccino</h3>
                        </div>
                        
                        <p className="price">$8.00</p>
                    </div>
                </div>

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
            </div>
        )
    }
}

class CheckoutButton extends React.Component {

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        checkoutCart();
    }

    render() {
        return (
            <div className="fixed-bottom orderCheckout">
                <button className="orderCheckout" type="submit" value="order" onClick={this.handleSubmit}>
                    <h3 className="payment" id="order">Place order</h3>
                </button>
            </div>
        )
    }
}

class Checkout extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Information />
                <CheckoutButton />
            </div>
        )
    }
}

export default Checkout;