import React from 'react';
import './order.css';
import rightArrow from "../img/rightArrow.png"
import { Link } from 'react-router-dom'
// import { getActiveOrders } from '../api';
import axios from 'axios';

// function orderCurrent() {
//     const header = (
//         <div className="title">
//             <br /><br />
//             <h1>Current Orders</h1>
//             <Link to={'/cart/order/past'}>
//                 <button className="past" type="submit" value="past">View past orders</button>
//             </Link>
//             <br />
//         </div>
//     )

//     const content = (
        // <div className="content">
        //     <Link to={'/cart/order/active/status'}>
        //         <button className="order" type="submit" value="order">
        //             <img alt="right arrow" className="right" src={rightArrow} />
        //             <h2>Tasty Trailer</h2>
        //             <p id="ready">Ready for pick up</p>
        //             <p className="date">29 April 2021 3.30 PM</p>
        //         </button>
        //     </Link>
        // </div>
//     )

//     return (
//         <div>
//             {header}
//             {content}
//         </div>
//     )
// }

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br /><br />
                <h1>Current Orders</h1>
                <Link to={'/cart/order/past'}>
                    <button className="past" type="submit" value="past">View past orders</button>
                </Link>
                <br />
            </div>
        )
    }
}

class ListActiveOrder extends React.Component {
    state = {
        orders: []
    }

    
    // getActiveOrders() {
    //     const BASE_URL = "http://localhost:48080/api";
    //     const endpoint = `${BASE_URL}/customer/orders/active`;
    //     return axios.get(endpoint) 
    //         .then((response) => {
    //             response.data.map((order: { status: String; items: any; total: Number; isChanged: Boolean; vendorId: any; placedTimestamp: Date; }) => ({
    //             status: `${order.status}`,
    //             items: `${order.items}`,
    //             total: `${order.total}`,
    //             isChanged: `${order.isChanged}`,
    //             vendorId: `${order.vendorId}`,
    //             placedTimestamp: `${order.placedTimestamp}`
    //             }))
    //             console.log(response); 
    //         }, (error) => {
    //             console.log(error);
    //         });
    // }

    // getActiveOrders() {
    //     const BASE_URL = "http://localhost:48080/api";
    //     const endpoint = `${BASE_URL}/customer/orders/active`;
    //     return axios.get(endpoint) 
    //     .then((response) => {
    //         this.setState(response.data);
    //         console.log(response); 
    //     }, (error) => {
    //         console.log(error);
    //     });
    // }

    // async componentDidMount() {
    //     // const result = this.getActiveOrders()
    //     this.setState(this.getActiveOrders());
    // }

    componentDidMount() {
        const BASE_URL = "http://localhost:48080/api";
        const endpoint = `${BASE_URL}/customer/orders/active`;
        axios.get(endpoint) 
        .then((response) => {
            const statuses = response.data.map((order: { status: String; }) => order.status);
            const itemses = response.data.map((order: { items: any; }) => order.items);
            const totals = response.data.map((order: { total: Number; }) => order.total);
            const isChangeds = response.data.map((order: { isChanged: Boolean; }) => order.isChanged);
            const _ids = response.data.map((order: { _id: String; }) => order._id);
            const vendorIds = response.data.map((order: { vendorId: String; }) => order.vendorId);
            const placedTimestamps = response.data.map((order: { placedTimestamp: Date; }) => order.placedTimestamp);
            console.log(response);
            this.setState({
                orders: response.data
              }); 
        }, (error) => {
            console.log(error);
        });
    }

    // orders  = this.setState({ users: data })getActiveOrders();
    // if (error) {
    //     return (
    //         <h2>No Order Present</h2>
    //     )
    // }

    render() {
        
        const { orders } = this.state;
        // const orderComponents = orders.map(order: { status: String, items: String, total: Number, isChanged: Boolean, vendorId: String, placedTimestamp: Date } => <status={order.status} items={order.items} total={order.total} isChanged={order.isChanged} vendorId={order.vendorId} placedTimestamp={order.placedTimestamp} />);
        // const orderComponents = orders.map((order: { status: String; items: any; total: Number; isChanged: Boolean; vendorId: any; placedTimestamp: Date; }) => <li>status={order.status} items={order.items} total={order.total} isChanged={order.isChanged} vendorId={order.vendorId} placedTimestamp={order.placedTimestamp}</li>);
        return (
            <div className="content">
                { orders.length ?
                    orders.map(order => (  
                        <button className="order" type="submit" value="order">
                            <img alt="right arrow" className="right" src={rightArrow} />
                            <h2>hi</h2>
                            <p id="ready">Ready for pick up</p>
                            <p className="date">29 April 2021 3.30 PM</p>
                        </button>
                    ))
                    :
                    (<h2>No Order Present</h2>)
                    }
            </div>
        )
    }



}

class OrderCurrent extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <ListActiveOrder />
            </div>
        )
    }
}

export default OrderCurrent;