import React from "react";
import './order.css';
import leftArrow from "../img/leftArrow.png"
import rightArrow from "../img/rightArrow.png"
import axios from "axios";
import history from '../history';
import moment from 'moment';
moment().format();

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br /><br />
                <input type="image" alt="back" className="back" src={leftArrow} onClick={()=> history.goBack()}/>
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
        const endpoint = `${BASE_URL}/customer/orders/past`;
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

    // pastOrders() {
    //     const queryResult = getPastOrders();
    //     console.log(queryResult);
    //     if (queryResult) {
    //         this.setState({isLoaded: true, orderList: queryResult.data.args});
    //     } else {
    //         this.setState({isLoaded: true, error: true});
    //     }
    // }

    componentDidMount() {
        this.getPastOrders();
    }

    // componentDidMount() {
    //     this.pastOrders();
    // }

    render() {
        const { error, isLoaded, orderList } = this.state;

        if (error == true) {
            return (
                <h2>No Order Present</h2>
            )
        } else if (isLoaded == false) {
            return (
                <h2>Loading...</h2>
            )
        } else {
            return (
                <div className="content">
                    { orderList.map((order, i) => (   
                        <div key={i}>
                            <button className="order" type="submit" value="order" onClick={()=> history.push(`/order/?id=${order._id}`)}>
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
