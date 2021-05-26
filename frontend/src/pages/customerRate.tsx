/* Import the required libraries and types */
import React from 'react';
import "./customerRate.css";
import leftArrow from '../img/leftArrow.png';
import history from "../history";
import StarRatingComponent from 'react-star-rating-component';
import { rateOrder } from "../api";
import { getId } from '../App';


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

class Content extends React.Component {
    state = {
        rating: 0,
        comment: ""
    }

    orderId = getId() || "";

    onStarClick(nextValue: number, prevValue: number, name: string) {
        console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
        this.setState({rating: nextValue});
    }

    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const {rating, comment} = this.state;
        rateOrder(this.orderId, rating, comment);
        history.goBack();
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