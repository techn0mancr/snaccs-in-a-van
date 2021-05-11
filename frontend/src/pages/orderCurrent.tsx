import React from 'react';
import './order.css';
import rightArrow from '../img/rightArrow.png';
import axios from 'axios';
import history from '../history';
import moment from 'moment';
import { customerProfile } from '../api';
moment().format();

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br /><br />
                <h1>Current Orders</h1>
                <button className="past" type="submit" value="past" onClick={()=> history.push(`/cart/order/past`)}>View past orders</button>
                <br />
            </div>
        )
    }
}

class ListActiveOrder extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        orderList: [] as any[]
    }
 
    async getActiveOrders() {
        const BASE_URL = "http://localhost:48080/api";
        // const BASE_URL = "https://snaccs-in-a-van.herokuapp.com/api";
        const endpoint = `${BASE_URL}/customer/orders/active`;
        return await axios.get(endpoint) 
        .then((response) => {
            var data = response.data
            this.setState({isLoaded: true, orderList: data});
            console.log(response);  
        }, (error) => {
            this.setState({isLoaded: true, error});
            console.log(error);
        },);
    }

    componentWillMount() {
        customerProfile();
    }

    componentDidMount() {
        this.getActiveOrders();
    }

    render() {
        const { error, isLoaded, orderList } = this.state;
        if (error === true) {
            return (
                <h2>No Order Present</h2>
            )
        } else if (isLoaded === false) {
            return (
                <h2>Loading...</h2>
            )
        } else {
            return (
                <div className="content">
                    { orderList.map((order, i) => (   
                            <div key={i}>
                               <button className="order" type="submit" value="order" onClick={()=> history.push(`/order/active/status/?id=${order._id}`)}>
                                    <img alt="right arrow" className="right" src={rightArrow} />
                                    <h2>{order.vendorId.name}</h2>
                                    <p id="ready">{order.status}</p>
                                    <p className="date">{moment(order.placedTimestamp).format('D MMM YYYY h.mm A')}</p>
                                </button>
                            </div> 
                        ))}
                </div>
            )
        }
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
