import React from "react";
import './checkout.css';
import leftArrow from '../img/leftArrow.png';
import history from '../history';
import axios from 'axios';
import { checkoutCart } from '../api';

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br></br>
                <input type="image" alt="back" className="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1>Checkout</h1>
                <br></br>           
            </div>
        )
    }
}

class Information extends React.Component {
    state = {
        cart: [] as  any[],
    }

    async getCart() {
        const BASE_URL = "http://localhost:48080/api";
        const endpoint = `${BASE_URL}/customer/cart`;
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
        const { cart } = this.state;
        return (
            <div>
                 <div className="containerCheckout" id="loc">
                    <h2 className="pickup">Pick up location</h2>
                    <p className="address">Tasty Trailer</p>
                    <p className="desc">Across Stop 1</p>
                </div>

                <div className="containerCheckout" id="cart">
                    <h2>Your Cart</h2>

                   { cart.map((item, i) => (
                        <div key={i}>
                            <div className="cart">
                                <div className="item">
                                    <h3>{item.quantity}x {item.itemId.name}</h3>
                                </div>
                        
                                <p className="price">${item.subtotal}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="containerCheckout" id="payment">
                    <h2>Payment</h2>
            
                    <div className="amount">
                        <h3 className="payment">Total amount</h3>
                        <h3 className="value">${cart.subtotal}</h3>
                    </div>
                    <br></br><br></br><br></br>
                    
                    <div className="amountPaid">
                        <h3 className="payment">Amount to be paid</h3>
                        <h3 className="value">${cart.subtotal}</h3>
                    </div>
                </div> */}
            </div>
        )
    }
}

class CheckoutButton extends React.Component {

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        checkoutCart();
        history.push(`/cart/order/active`);
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