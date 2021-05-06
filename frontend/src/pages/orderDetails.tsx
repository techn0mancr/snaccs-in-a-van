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
    const orderId = query.replace('?id=','')
    return orderId;
} 

class Invoice extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        details: "" as unknown as object,
    }

    orderId = getorderId() || '';

    async getOrderDetails( orderId: String ) {
        const BASE_URL = "http://localhost:48080/api";
        const endpoint = `${BASE_URL}/order/${orderId}`;
        return await axios.get(endpoint)
        .then((response) => {
            var data = response.data
            this.setState({isLoaded: true, details: data});
            // console.log(response);
            console.log(this.state.details);  
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

        // {
// "status":"Completed",
// "items":[{"itemId":"607073f83ed89dee65af788d","quantity":3}],
// "total":13.5,
// "isChanged":false,
// "_id":"60780115c5c0362b60d60376",
// "vendorId":{"_id":"60707b103ed89dee65af78a2","name":"Tasty Trailer","locationDescription":"Across Stop 1","geolocation":[-37.7999432,144.9616192,17]},
// "customerId":{"_id":"60707a6b3ed89dee65af78a0","email":"nputro@student.unimelb.edu.au","givenName":"Nathanael","familyName":"Putro"},
// "orderTimestamp":"6951301566670307329",
// "isCancelled":false,
// "fulfilledTimestamp":"2021-05-03T10:49:54.469Z",
// "placedTimestamp":"2021-05-06T15:35:47.400Z"
// }

        var status = ""
        var total = 0
        var changed = ""
        var vendor_name
        for (const [key, value] of Object.entries(details)) {
            if (key === "status") {
                status = value 
            }
            if (key === "total") {
                total = value
            }
            if (key === "isChanged") {
                if (value===true) {
                    changed = "Changes made"
                }
                changed = "No changes made"
            }
            if (key === "items") {
                for ( const [subkeys, subvalues] of Object.entries(key)) {
                    //need to make a matrix for item id to output... or change order id model
                }
            }
            if (key === "vendorId") {
                for (const [subkeys, subvalues] of Object.entries(value)) {
                    if (subkeys === "name") {
                        vendor_name = subvalues
                    }
                }
            }
            }

        // const data = JSON.parse(details);
        if (error == true) {
            return (
                <h2>fail</h2>
            )
        } else {
        return (
            <div className="title">
                <h2 className="invoice">INVOICE: #A0001</h2>
                <h2 className="invoice">29 April 2021 3.25 PM</h2>
                <h3>
                    <br></br>
                    Status = {status}
                    <br></br>
                    Total = {total}
                    <br></br>
                    Changed = {changed}
                    <br></br>
                    OrderID = {this.orderId}
                    <br></br>
                    Vendor Name = {vendor_name}

                </h3>
                {/* <h2>{details.status}</h2> */}
            </div>
        )
        }
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

function details(details: any) {
    throw new Error("Function not implemented.");
}
// export default getorderId;
