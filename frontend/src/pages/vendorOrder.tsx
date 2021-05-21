import React from 'react';
import './vendorOrder.css';
import vanIcon from '../img/vanTruck.png';
import history from '../history';
import moment from "moment";
import { fulfillOrder, completeOrder, getPlacedOrders, getFulfilledOrders, getOrderDetails } from '../api';
moment().format();

class Header extends React.Component {
    render() {
        return (
            <div>
                <input type="image" alt="Profile" className="vanIcon" src={vanIcon} onClick={() => history.push(`/vendor/profile`)}/>
                <h1 className="vendorOrder">Orders</h1>
            </div>
        )
    }
}

class Content extends React.Component {
    state = {
        orderId: '',
        placedOrders: [] as any[],
        fulfillOrders: [] as any[],
        details: [] as any,
        items: [] as any[],
        showDetail: false,
        readyButton: false
    }

    getPlaced() {
        getPlacedOrders().then(
            (response) => {
                var data = response.data
                this.setState({placedOrders: data})
                console.log(response)
            }, (error) => {
                console.log(error);
            }
        )
    }

    getFulfill() {
        getFulfilledOrders().then(
            (response) => {
                var data = response.data
                this.setState({fulfillOrders: data});
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    componentDidMount() {
        this.getPlaced();
        this.getFulfill();
    }

    handleDisplay(orderId: String, placed: Boolean) {
        getOrderDetails(orderId).then(
            (response) => {
                var data = response.data;
                this.setState({details: data, items: data.items, showDetail: true});
                if (placed === true) {
                    this.setState({readyButton: true});
                } else {
                    this.setState({readyButton: false});
                }
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )  
    }

    handleFulfill(orderId: String) {
        fulfillOrder(orderId).then(
            (response) => {
                this.getPlaced();
                this.setState({showDetails: false});
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    handleComplete(orderId: String) {
        completeOrder(orderId).then(
            (response) => {
                this.getFulfill();
                this.setState({showDetails: false});
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    render() {
        const { placedOrders, fulfillOrders, details, items, showDetail, readyButton } = this.state;

        return (
            <div className ="row">
                <div className ="column">
                    <div className ="outstanding">
                        <h2 className ="vendorOrder">Outstanding Orders</h2>
                        { placedOrders.map((order, i) => (
                            <div key={i}>
                                <div className ="perOrder" onClick={() => this.handleDisplay(order._id, true)}>
                                    <div className ="leftBox">
                                    <p className = "p-vendorOrder">{order._id}</p>
                                    <p className = "p-vendorOrder">{moment(order.placedTimestamp).format('h.mm A')}</p>
                                    </div>
                                    <p className = "p-orderName">{order.customerId.givenName} {order.customerId.familyName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className ="column">
                    <div className ="orderDetails">
                        <h2 className ="vendorOrder">Details</h2>
                        { showDetail ? 
                        <div className ="orderCard">
                            <p className ="vendorOrder">{details._id}</p>
                            <p className = "vendorOrder">{moment(details.placedTimestamp).format('D MMM YYYY h.mm A')}</p>
                            <p className="orderName">{details.customerId.givenName} {details.customerId.familyName}</p>
                            { items.map((item, i) => (
                                <div key={i}>
                                    <p className = "vendorOrder">{item.quantity}x {item.itemId.name}</p>
                                </div>
                            ))}
                            { readyButton ? 
                                <button type="button" className="btn-vendorOrder" onClick={() => this.handleFulfill(details._id)}>Ready</button>
                            :
                            null }
                        </div>
                        : 
                        null }
                    </div>

                    <div className ="ordersFulfilled">
                        <h2 className ="vendorOrder">Orders Fulfilled</h2>
                        { fulfillOrders.map((fulfill, i) => (
                            <div key={i}>
                                <div className="perOrder" onClick={() => this.handleDisplay(fulfill._id, false)}>
                                    <div className="leftBox">
                                        <p className = "p-vendorOrder">{fulfill._id}</p>
                                        <p className = "p-vendorOrder">{moment(fulfill.placedTimestamp).format('h.mm A')}</p>
                                    </div>
                                    <p className = "p-orderName">{fulfill.customerId.givenName} {fulfill.customerId.familyName}</p>
                                    <button type="button" className="btn-vendorOrder" onClick={() => this.handleComplete(fulfill._id)}>Completed</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

class VendorOrder extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

export default VendorOrder