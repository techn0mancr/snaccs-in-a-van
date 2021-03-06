/* Import the required libraries and types */
import React from 'react';
import moment from "moment";

/* Import components */
import './vendorOrder.css';
import vanIcon from '../img/vanTruck.png';
import history from '../history';
import { fulfillOrder, completeOrder, getPlacedOrders, getFulfilledOrders, getOrderDetails } from '../api';
moment().format();

/* Header component of Vendor Order Page */
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

/* Content component of Vendor Order Page */
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
        isLoadedPlaced: false, 
        isLoadedFulfill: false
    }
    interval!: NodeJS.Timeout;

    /* Function to call placed order from api */
    getPlaced() {
        getPlacedOrders().then(
            (response) => {
                var data = response.data;
                this.setState({placedOrders: data, isLoadedPlaced: true});
            }, (error) => {
                console.log(error);
            }
        )
    }

    /* Function to call fulfilled order from api */
    getFulfill() {
        getFulfilledOrders().then(
            (response) => {
                var data = response.data;
                this.setState({fulfillOrders: data, isLoadedFulfill: true});
            }, (error) => {
                console.log(error);
            }
        )
    }

    /* During on page, re-render every second */
    async componentDidMount() {
        /* Get placed and fulfilled order */
        try {
            this.interval = setInterval(async () => { 
                /* Caculate time remaining from 15 minutes */
                this.calculateTimeRemain();

                /* Call get placed and get fultill */
                this.getPlaced();
                this.getFulfill();
            }, 1000);
            } catch(e) {
                console.log(e);
            }
    }

    /* Clear time interval when unmount */
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /* Handle display of details */
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
            }, (error) => {
                console.log(error);
            }
        )
        
        /* Caculate time remaining from 15 minutes */
        this.calculateTimeRemain();
    }

    /* Caculate time remaining from 15 minutes */
    calculateTimeRemain() {
        var now = moment(new Date());
        var end = moment(this.state.timeStamps.placed);
        var difference = moment.duration(now.diff(end), 'milliseconds');
        var interval = 900000;
        var remaining = moment.duration(interval - difference.asMilliseconds(), 'milliseconds');
        this.setState({hour: remaining.hours(), minute: remaining.minutes(), second: remaining.seconds()});  
    }

    /* Handle when order is fulfilled by marking status as fulfilled */
    handleFulfill(orderId: String) {
        fulfillOrder(orderId).then(
            (response) => {
                this.setState({showDetail: false});
                this.getPlaced();
            }, (error) => {
                console.log(error);
            }
        )
    }

    /* Handle when order is complete by marking status as complete */
    handleComplete(orderId: String) {
        completeOrder(orderId).then(
            (response) => {
                this.setState({showDetail: false});
                this.getFulfill();
            }, (error) => {
                console.log(error);
            }
        )
    }

    render() {
        const { placedOrders, fulfillOrders, details, items, showDetail, readyButton, hour, minute, second, isLoadedFulfill, isLoadedPlaced } = this.state;

        return (
            <div className ="row">
                <div className ="column">
                    <div className ="outstanding">
                        <h2 className ="vendorOrder">Outstanding Orders</h2><br/>
                        {isLoadedPlaced? 
                            <div>
                                {placedOrders.length>0 ?
                                    <div>
                                        { placedOrders.map((order, i) => (
                                            <div key={i}>
                                                <div className ="perOrder" onClick={() => this.handleDisplay(order._id, true)}>
                                                    <div className ="leftBox">
                                                        <p className = "p-vendorOrder">{(order._id).substring(16,24)}</p>
                                                        <p className = "p-vendorOrder">{moment(order.timestamps.placed).format('h.mm A')}</p>
                                                    </div>
                                                    <p className = "p-orderName">{order.customerId.givenName}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :<h2>Orders all completed</h2>
                                }
                            </div>
                            :<h2>Loading...</h2>
                        }
                        
                    </div>
                </div>

                <div className ="column">
                    <div className ="orderDetails">
                        <h2 className ="vendorOrder">Details</h2>
                        { showDetail ? 
                            <div className ="orderCard">
                                <p className ="p-orderCard">{details._id}</p>
                                {readyButton? 
                                    <p className = "p-orderTime">Placed: {moment(details.timestamps.placed).format('h.mm A')}</p>
                                    :<p className = "p-orderTime">Placed: {moment(details.timestamps.placed).format('h.mm A')}, Fulfilled: {moment(details.timestamps.fulfilled).format('h.mm A')}</p>
                                }
                                <p className="p-detailsName">{details.customerId.givenName}</p>
                                { items.map((item, i) => (
                                    <div key={i}>
                                        <p className = "p-orderCard">{item.quantity}x {item.itemId.name}</p>
                                    </div>
                                ))}
                                { readyButton ? 
                                    <div>
                                        <p>Time Remaining: {hour}h {minute}m {second}s</p>
                                        <button type="button" className="btn-vendorOrder" onClick={() => this.handleFulfill(details._id)}>Ready</button>
                                    </div>
                                    :null 
                                }
                            </div>
                            :null 
                        }
                    </div>

                    <div className ="ordersFulfilled">
                        <h2 className ="vendorOrder">Orders Fulfilled</h2><br/>
                        {isLoadedFulfill?
                            <div>
                                {fulfillOrders.length>0 ?
                                    <div>
                                        { fulfillOrders.map((fulfill, i) => (
                                            <div key={i}>
                                                <div className="perOrder" onClick={() => this.handleDisplay(fulfill._id, false)}>
                                                    <div className="leftBox">
                                                        <p className = "p-vendorOrder">{(fulfill._id).substring(16,24)}</p>
                                                        <p className = "p-vendorOrder">{moment(fulfill.timestamps.fulfilled).format('h.mm A')}</p>
                                                    </div>
                                                    <p className = "p-orderName">{fulfill.customerId.givenName}</p>
                                                    <button type="button" className="btn-vendorOrder" onClick={() => this.handleComplete(fulfill._id)}>Picked Up</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :<h2>Orders all fulfilled</h2>
                                }
                            </div>
                            :<h2>Loading...</h2>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

/* Render all components on Vendor Order Page */
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

export default VendorOrder;