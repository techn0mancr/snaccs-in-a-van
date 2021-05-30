/* Import the required libraries and types */
import React from 'react';
import moment from "moment";

/* Import components */
import './vendorProfile.css';
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import { getCompletedOrders } from '../api';
moment().format();

/* Header component of Vendor Complete Page */
class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br/><br/>
                <input className="vendorProfile" type="image" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1>Completed Orders</h1>
                <br/>
            </div>
        )
    }
}

/* Content component of Vendor Complete Page */
class Description extends React.Component {

    state = {
        completedOrders: [] as any[],
        isLoaded: false
    }

    /* During on page */
    componentDidMount() {

        /* Get completed orders from api */
        getCompletedOrders().then(
            (response) => {
                var data = response.data;
                this.setState({completedOrders: data, isLoaded: true});
            }, (error) => {
                console.log(error);
            }
        )
    }

    render() {
        const { completedOrders, isLoaded } = this.state;

        return (
            <div>
                 {isLoaded? 
                            <div>
                                {completedOrders.length>0 ?
                                    <div>
                                        { completedOrders.map((order, i) => (
                                            <div key={i}>
                                                <div className ="content pastOrder">
                                                    <div className ="leftBox" onClick={() => history.push(`/order/details/?id=${order._id}`)}>
                                                        <p className = "p-vendorOrder">{(order._id).substring(16,24)}</p>
                                                        <p className = "p-vendorOrder">{moment(order.timestamps.placed).format('h.mm A')}</p>
                                                    </div>
                                                    <p className = "p-orderName">{order.customerId.givenName} {order.customerId.familyName}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :<h2>No order has been completed</h2>
                                }
                            </div>
                            :<h3 className="error">Loading...</h3>
                        }
            </div>
        )
    }
}

/* Render all components on vendor profile page */
class VendorComplete extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Description />
            </div>
        )
    }
}

export default VendorComplete;