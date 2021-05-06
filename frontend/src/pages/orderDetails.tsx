import React from "react";
import './order.css';
import leftArrow from '../img/leftArrow.png';
import history from '../history';
import axios from 'axios';
import moment from 'moment';
moment().format();

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

function getorderId(){
    const query = history.location.search
    const orderId = query.replace('?id=','')
    return orderId;
} 

class Invoice extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        details: [] as  any,
    }

    orderId = getorderId() || '';

    async getOrderDetails( orderId: String ) {
        const BASE_URL = "http://localhost:48080/api";
        const endpoint = `${BASE_URL}/order/${orderId}`;
        return await axios.get(endpoint)
        .then((response) => {
            var data = response.data
            this.setState({isLoaded: true, details: data});
            console.log(response); 
            return data;
        }, (error) => {
            this.setState({isLoaded: true, error});
            console.log(error);
        },);
    }

    componentDidMount() {
        this.getOrderDetails(this.orderId);
    }

    render() {
        const { error, isLoaded, details } = this.state;

        if (error == true) {
            return (
                <h2>fail</h2>
            )
        } else {
            return (
                <div className="title">
                    <h2 className="invoice">INVOICE: {details._id}</h2>
                    <br />
                    <h2 className="invoice">{moment(details.placedTimestamp).format('D MMM YYYY h.mm A')}</h2>
                </div>
            )
        }
    }
}

class Information extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        details: [] as  any,
        items: [] as any[],
        vendorId: [] as any,
    }

    orderId = getorderId() || '';

    async getOrderDetails( orderId: String ) {
        const BASE_URL = "http://localhost:48080/api";
        const endpoint = `${BASE_URL}/order/${orderId}`;
        return await axios.get(endpoint)
        .then((response) => {
            var data = response.data
            this.setState({isLoaded: true, details: data, vendorId: data.vendorId, items: data.items});
            console.log(response); 
            return data;
        }, (error) => {
            this.setState({isLoaded: true, error});
            console.log(error);
        },);
    }

    componentDidMount() {
        this.getOrderDetails(this.orderId);
    }

    render() {
        const { error, isLoaded, details, vendorId, items } = this.state;

        if (error == true) {
            return (
                <h2>fail</h2>
            )
        } else {
        return (
            <div>
                <div className="containerCheckout" id="loc">
                    <h2 className="pickup">Pick up location</h2>
                    <p className="address">{vendorId.name}</p>
                    <p className="desc">{vendorId.locationDescription}</p>
                </div>
               
                <div className="containerCheckout" id="cart">
                    <h2>Your Cart</h2>
                    { items.map((item, i) => (
                        <div key={i}>
                            <div className="cart">
                                <div className="item">
                                    <h3>{item.quantity}x {item.itemId}</h3>
                                </div>
                        
                                <p className="price">$9.00</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> 
        )}
    }
}

class Payment extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        details: [] as  any,
    }

    orderId = getorderId() || '';

    async getOrderDetails( orderId: String ) {
        const BASE_URL = "http://localhost:48080/api";
        const endpoint = `${BASE_URL}/order/${orderId}`;
        return await axios.get(endpoint)
        .then((response) => {
            var data = response.data
            this.setState({isLoaded: true, details: data});
            console.log(response); 
            return data;
        }, (error) => {
            this.setState({isLoaded: true, error});
            console.log(error);
        },);
    }

    componentDidMount() {
        this.getOrderDetails(this.orderId);
    }
    
    render() {
        const { error, isLoaded, details } = this.state;

        return (
            <div className="containerCheckout" id="payment">
                <h2>Payment</h2>
        
                <div className="amount">
                    <h3 className="payment">Total amount</h3>
                    <h3 className="value">${details.total}</h3>
                </div>
                <br></br><br></br><br></br>
                
                <div className="amountPaid">
                    <h3 className="payment">Amount to be paid</h3>
                    <h3 className="value">${details.total}</h3>
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
                <Information />
                <Payment />
            </div>
        )
    }
}

export default OrderDetails;
