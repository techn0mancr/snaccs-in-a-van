import React from "react";
import './order.css';
import leftArrow from "../img/leftArrow.png"
import rightArrow from "../img/rightArrow.png"
import history from '../history';
import moment from 'moment';
import { getPastOrders } from "../api";
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
    
    interval!: NodeJS.Timeout;

    async componentDidMount() {
        try {
            this.interval = setInterval(async () => { 
                this.pastOrders();
            }, 1000);
            } catch(e) {
                console.log(e);
            }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    pastOrders() {
        getPastOrders().then(
            (response) => {
                var data = response.data
                this.setState({isLoaded: true, orderList: data});
                console.log(response);
            }, (error) => {
                this.setState({isLoaded: true, error});
                console.log(error);
            }
        );
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
                    {orderList.length>0 ?
                        <div>
                            { orderList.map((order, i) => (   
                                <div key={i}>
                                    <button className="order" type="submit" value="order" onClick={()=> history.push(`/order/details/?id=${order._id}`)}>
                                        <img alt="right arrow" className="right" src={rightArrow} />
                                        <h2>{order.vendorId.name}</h2>
                                        <p id="ready">{order.status}</p>
                                        <p className="date">{moment(order.timestamps.completed).format('D MMM YYYY h.mm A')}</p>
                                    </button>
                                </div> 
                            ))} 
                        </div>
                    :
                    <h2>No current orders</h2>}
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
