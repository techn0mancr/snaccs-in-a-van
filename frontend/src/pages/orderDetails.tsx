import React, { FunctionComponent } from "react";
import './order.css';
import leftArrow from '../img/leftArrow.png';
import penEdit from '../img/penEdit.png';
import history from '../history';
import UseQueryParam from "../hooks/useQueryParam";
// import {getOrderDetails} from '../api';
import axios from 'axios';
// import { QueryClient, QueryClientProvider } from "react-query";
// import { RouteComponentProps } from '@reach/router';
// import queryString from 'query-string';

class Header extends React.Component {
    render() {
        return (
            // console.log(this.props.),
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
<<<<<<< HEAD
=======
    // UseQueryParam("id", "order");
>>>>>>> cbeff850b2cb9386fc3bb17d04555d83dad6781f
    const orderId = query.replace('?id=','')
    // return orderId;
    return orderId;
} 

// type Props = { component: FunctionComponent } & RouteComponentProps;

class Invoice extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        state: ""
    }

    orderId = getorderId() || '';

    async getOrderDetails( orderId: String ) {
        const BASE_URL = "http://localhost:48080/api";
        const endpoint = `${BASE_URL}/order/${orderId}`;
        return await axios.get(endpoint)
        .then((response) => {
            var data = response.data
            this.setState({isLoaded: true, oDetails: data});
            console.log(response);  
        }, (error) => {
            this.setState({isLoaded: true, error});
            console.log(error);
        },);
    }

    componentDidMount() {
        this.getOrderDetails(this.orderId);
    }
    
    render() {
        // const { error, isLoaded, oDetails } = this.state;
        return (
            <div className="title">
                <h2 className="invoice">INVOICE: #A0001</h2>
                <h2 className="invoice">29 April 2021 3.25 PM</h2>
                {/* <h2>{oDetails}</h2> */}
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
// export default getorderId;
