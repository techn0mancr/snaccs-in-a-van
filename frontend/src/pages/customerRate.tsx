/* Import the required libraries and types */
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

/* Import components */
import "./customerRate.css";
import leftArrow from '../img/leftArrow.png';
import history from "../history";
import { rateOrder, getId, rateOrderStar } from "../api";

/* Header component of Rating Page */
class Header extends React.Component {
    render() {
        return (
            <div className="titleOrder">
                <input type="image" className="back" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <br></br>
                <h1 className="h1-rate">Rate your experience</h1>
            </div>
        )
    }
}

/* Content component of Rating Page */
class Content extends React.Component {

    state = {
        rating: 0,
        comment: ""
    }
    orderId = getId() || "";

    /* When click the stars, change value accordingly */
    onStarClick(nextValue: number, prevValue: number, name: string) {
        console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
        this.setState({rating: nextValue});
    }

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }

     /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void; }) => {
        const {rating, comment} = this.state;
        event.preventDefault();

        /* Submit rating to api. Then push new entry to history */
        if (comment === "") {
            rateOrderStar(this.orderId, rating);
        } else {
            rateOrder(this.orderId, rating, comment);
        }
        
        history.push(`/cart/order/past`);
    }

    render() {
        const { rating, comment } = this.state;

        return (
            <div>
                <StarRatingComponent name="rate" starCount={5} value={rating} onStarClick={this.onStarClick.bind(this)} />
                <br/>

                <div className ="comments">
                    <h2 className = "h2-comments">
                        Additional comments
                    </h2>
                    <br></br>
                    <form onSubmit={this.handleSubmit}>
                        <input className="customerRate" type="text" placeholder="Comments" name="comment" value={comment} onChange={this.handleChange} />
                        <br></br>
                        <button type="submit" className="btn-customerRate">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

/* Render all components on Rating Page */
class Rating extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

export default Rating;