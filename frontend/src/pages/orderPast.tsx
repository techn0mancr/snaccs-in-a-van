import React from "react";
import './order.css';
import leftArrow from "../img/leftArrow.png"
import rightArrow from "../img/rightArrow.png"
import { Link } from 'react-router-dom'
import axios from "axios";

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br /><br />
                <input type="image" alt="back" className="back" src={leftArrow} />
                <h1>Past Orders</h1>
            </div>
        )
    }
}
       
class ListPastOrder extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        orderList: [] as any[]
    }

    async getPastOrders() {
        const BASE_URL = "http://localhost:48080/api";
        const endpoint = `${BASE_URL}/customer/order/past`;
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

    componentDidMount() {
        this.getPastOrders();
    }

    render() {
        const { error, isLoaded, orderList } = this.state;

        return (
            <div className="content">
                { orderList.length ?
                    orderList.map((order, i) => (   
                        <div key={i}>
                            <button className="order" type="submit" value="order">
                                <img alt="right arrow" className="right" src={rightArrow} />
                                <h2>{order.vendorId}</h2>
                                <p id="ready">{order.status}</p>
                                <p className="date">{order.placedTimestamp}</p>
                            </button>
                        </div> 
                        
                ))
            :
            (<h2>No Order Present</h2>)
            }
            </div>
        )
    }
}

class OrderPast extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <ListPastOrder />
            </div>
        )
    }
}
        
export default OrderPast