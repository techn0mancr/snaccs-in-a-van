import React from "react";
import './checkout.css';
import leftArrow from '../img/leftArrow.png';
import history from '../history';
import { checkoutCart, getCart, getMenu } from '../api';
import { getId } from "../App";

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

class Vendor extends React.Component {
    state = {
        profile: [] as any
    }

    vendorId = getId() || "";

  componentDidMount() {
    getMenu(this.vendorId).then(
            (response) => {
                var data = response.data;
                this.setState({profile: data.vendorId});
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    } 
    render() {
        const { profile } = this.state;

        return (
            <div className="containerCheckout" id="loc">
                <h2 className="pickup">Pick up location</h2>
                <p className="address">{profile.name}</p>
                <p className="desc">{profile.locationDescription} ({profile.latitude},{profile.longitude})</p>
            </div>
        )
    }
}

class Information extends React.Component {
    state = {
        cart: [] as  any[],
    }

    componentDidMount() {
        getCart().then(
            (response) => {
            var data = response.data
            this.setState({isLoaded: true, cart: data});
            console.log(response);  
        }, (error) => {
            this.setState({isLoaded: true, error});
            console.log(error);
        },);
    }

    render() {
        const { cart } = this.state;
        return (
            <div>
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
                <Vendor />
                <Information />
                <CheckoutButton />
            </div>
        )
    }
}

export default Checkout;