/* Import the required libraries and types */
import React from "react";
import moment from 'moment';

/* Import components */
import './order.css';
import leftArrow from "../img/leftArrow.png"
import rightArrow from "../img/rightArrow.png"
import history from '../history';
import { getPastOrders } from "../api";
moment().format();

/* Header component of Past Order Page */
class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br/><br/>
                <input type="image" alt="back" className="back" src={leftArrow} onClick={()=> history.goBack()}/>
                <h1>Past Orders</h1>
            </div>
        )
    }
}
   
/* Content component of Past Order Page */
class ListPastOrder extends React.Component {

    state = {
        error: null,
        isLoaded: false,
        orderList: [] as any[]
    }
    interval!: NodeJS.Timeout;

    /* During on page, re-render every second */
    async componentDidMount() {
        /* Get past orders */
        try {
            this.interval = setInterval(async () => { 
                this.pastOrders();
            }, 5000);
            } catch(e) {
                console.log(e);
            }
    }

    /* Clear time interval when unmount */
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /* Get past orders from api */
    pastOrders() {
        getPastOrders().then(
            (response) => {
                var data = response.data
                this.setState({isLoaded: true, orderList: data});
            }, (error) => {
                this.setState({isLoaded: true, error});
                console.log(error);
            }
        )
    }

    render() {
        const { error, isLoaded, orderList } = this.state;

        if (error === true) {
            return (<h3 className="error">No Order Present</h3>)
        } else if (isLoaded === false) {
            return (<h3 className="error">Loading...</h3>)
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
                        :<h3 className="error">No current orders</h3>
                    }
                </div>
            )
        }
        
    }
}

/* Render all components on Order Past Page */
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
        
export default OrderPast;
