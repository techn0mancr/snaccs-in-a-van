import React from 'react';
import './vendorOrder.css';
import vanIcon from '../img/vanTruck.png';
import moment from "moment";
import { fulfillOrder, completeOrder, getPlacedOrders, getFulfilledOrders, getOrderDetails } from '../api';
moment().format();

class Header extends React.Component {
    render() {
        return (
            <div>
                <input type="image" alt="Profile" className="vanIcon" src={vanIcon} />
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
        order: [] as any,
        items: [] as any[]
    }

    componentDidMount() {
        getPlacedOrders().then(
            (response) => {
                var data = response.data
                this.setState({placedOrders: data})
                console.log(response)
            }, (error) => {
                console.log(error);
            }
        )
        getFulfilledOrders().then(
            (response) => {
                var data = response.data
                this.setState({fulfillOrder: data});
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    handleDisplay(orderId: String) {
        getOrderDetails(orderId).then(
            (response) => {
                var data = response.data;
                this.setState({order: data, items: data.items});
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    render() {
        const { placedOrders, fulfillOrders, order, items } = this.state;

        return (
            <div className ="row">
                <div className ="column">
                    <div className ="outstanding">
                        <h2 className ="vendorOrder">Outstanding Orders</h2>
                        { placedOrders.map((order, i) => (
                            <div key={i}>
                                <div className ="perOrder" onClick={() => this.handleDisplay(order._id)}>
                                    <div className ="leftBox">
                                        <p className = "vendorOrder">#A0001</p>
                                        <p className = "vendorOrder">9:00:20</p>
                                    </div>
                                    <p className = "orderName">Natasha Rayani</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className ="column">
                    <div className ="orderDetails">
                        <h2 className ="vendorOrder">Details</h2>
                        <div className ="orderCard">
                            <p className ="vendorOrder">{order._id}</p>
                            <p className = "vendorOrder">{order.placedTimestamp}</p>
                            <p className="orderName">Natasha Rayani</p>
                            { items.map((item, i) => (
                                <div key={i}>
                                    <p className = "vendorOrder">{item.quantity}x {item.itemId.name}</p>
                                </div>
                            ))}
                            <button type="button" className="btn-vendorOrder">Ready</button>
                        </div>
                    </div>

                    <div className ="ordersFulfilled">
                        <h2 className ="vendorOrder">Orders Fulfilled</h2>
                        { fulfillOrders.map((order, i) => (
                            <div key={i}>
                                <div className="perOrder" onClick={() => this.handleDisplay(order._id)}>
                                    <div className="leftBox">
                                        <p className = "vendorOrder">#A0001</p>
                                        <p className = "vendorOrder">9:00:20</p>
                                    </div>
                                    <p className = "orderName">Natasha Rayani</p>
                                    <button type="button" className="btn-vendorOrder">Completed</button>
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