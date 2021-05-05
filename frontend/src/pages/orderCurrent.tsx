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
    
    getActiveOrders() {
        const BASE_URL = "http://localhost:48080/api";
        const endpoint = `${BASE_URL}/customer/orders/active`;
        return axios.get(endpoint) 
            .then((response) => {
                response.data.map((order: { status: String; items: any; total: Number; isChanged: Boolean; vendorId: any; placedTimestamp: Date; }) => ({
                status: `${order.status}`,
                items: `${order.items}`,
                total: `${order.total}`,
                isChanged: `${order.isChanged}`,
                vendorId: `${order.vendorId}`,
                placedTimestamp: `${order.placedTimestamp}`
                }))
                console.log(response); 
            }, (error) => {
                console.log(error);
            });
    }

    // getActiveOrders() {
    //     const BASE_URL = "http://localhost:48080/api";
    //     const endpoint = `${BASE_URL}/customer/orders/active`;
    //     return axios.get(endpoint) 
    //     .then((response) => {
    //         this.setState({ response });
    //         console.log(response); 
    //     }, (error) => {
    //         console.log(error);
    //     });
    // }

    componentDidMount() {
        this.getActiveOrders();
    }

    // orders  = this.setState({ users: data })getActiveOrders();
    // if (error) {
    //     return (
    //         <h2>No Order Present</h2>
    //     )
    // }

    render() {
        // const { orders } = this.state;
        // const orderComponents = orders.map(order: { status: String, items: String, total: Number, isChanged: Boolean, vendorId: String, placedTimestamp: Date } => <status={order.status} items={order.items} total={order.total} isChanged={order.isChanged} vendorId={order.vendorId} placedTimestamp={order.placedTimestamp} />);
        return (
            <div className="content">
                {this.state.orders.map(order => (  
                    <button className="order" type="submit" value="order">
                        <img alt="right arrow" className="right" src={rightArrow} />
                        <h2>Tasty Trailer</h2>
                        <p id="ready">Ready for pick up</p>
                        <p className="date">29 April 2021 3.30 PM</p>
                    </button>
                ))}
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