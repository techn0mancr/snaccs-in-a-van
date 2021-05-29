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
        timeStamps: [] as any,
        showDetail: false,
        readyButton: false,
        hour: 0,
        minute: 0,
        second: 0,
    }

    interval!: NodeJS.Timeout;

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

    async componentDidMount() {
        try {
            this.interval = setInterval(async () => { 
                this.getPlaced();
                this.getFulfill();
                var now = moment(new Date());
                var end = moment(this.state.timeStamps.placed);
                var duration = moment.duration(now.diff(end));
                this.setState({hour: duration.hours(), minute: duration.minutes(), second: duration.seconds()});
            }, 1000);
            } catch(e) {
                console.log(e);
            }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleDisplay(orderId: String, placed: Boolean) {
        getOrderDetails(orderId).then(
            (response) => {
                var data = response.data;
                this.setState({details: data, items: data.items, timeStamps: data.timestamps, showDetail: true});
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
                this.setState({showDetail: false});
                this.getPlaced();
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    handleComplete(orderId: String) {
        completeOrder(orderId).then(
            (response) => {
                this.setState({showDetail: false});
                this.getFulfill();
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    render() {
        const { placedOrders, fulfillOrders, details, items, showDetail, readyButton, hour, minute, second } = this.state;

        return (
            <div className ="row">
                <div className ="column">
                    <div className ="outstanding">
                        <h2 className ="vendorOrder">Outstanding Orders</h2><br/>
                        {placedOrders.length>0 ?
                            <div>
                                { placedOrders.map((order, i) => (
                                    <div key={i}>
                                        <div className ="perOrder" onClick={() => this.handleDisplay(order._id, true)}>
                                            <div className ="leftBox">
                                            <p className = "p-vendorOrder">{order._id}</p>
                                            <p className = "p-vendorOrder">{moment(order.timestamps.placed).format('h.mm A')}</p>
                                            </div>
                                            <p className = "p-orderName">{order.customerId.givenName} {order.customerId.familyName}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        :<h2>Orders all completed</h2>}
                    </div>
                </div>

                <div className ="column">
                    <div className ="orderDetails">
                        <h2 className ="vendorOrder">Details</h2>
                        { showDetail ? 
                        <div className ="orderCard">
                            <p className ="p-orderCard">{details._id}</p>
                            {readyButton? 
                            <p className = "p-orderTime">{moment(details.timestamps.placed).format('h.mm A')}</p>
                            :
                            <p className = "p-orderTime">{moment(details.timestamps.fulfilled).format('h.mm A')}</p>}
                            <p className="p-detailsName">{details.customerId.givenName} {details.customerId.familyName}</p>
                            { items.map((item, i) => (
                                <div key={i}>
                                    <p className = "p-orderCard">{item.quantity}x {item.itemId.name}</p>
                                </div>
                            ))}
                            { readyButton ? 
                                <div>
                                    <p>Time Elapsed: {hour}h {minute}m {second}s</p>
                                    <button type="button" className="btn-vendorOrder" onClick={() => this.handleFulfill(details._id)}>Ready</button>
                                </div>
                            :
                            null }
                        </div>
                        : 
                        null }
                    </div>

                    <div className ="ordersFulfilled">
                        <h2 className ="vendorOrder">Orders Fulfilled</h2><br/>
                        {fulfillOrders.length>0 ?
                            <div>
                                { fulfillOrders.map((fulfill, i) => (
                                    <div key={i}>
                                        <div className="perOrder" onClick={() => this.handleDisplay(fulfill._id, false)}>
                                            <div className="leftBox">
                                                <p className = "p-vendorOrder">{fulfill._id}</p>
                                                <p className = "p-vendorOrder">{moment(fulfill.timestamps.fulfilled).format('h.mm A')}</p>
                                            </div>
                                            <p className = "p-orderName">{fulfill.customerId.givenName} {fulfill.customerId.familyName}</p>
                                            <button type="button" className="btn-vendorOrder" onClick={() => this.handleComplete(fulfill._id)}>Picked Up</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        :<h2>Orders all fulfilled</h2>}
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