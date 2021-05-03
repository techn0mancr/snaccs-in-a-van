import React from "react";
import './order.css';
import leftArrow from "../img/leftArrow.png"
import rightArrow from "../img/rightArrow.png"
import { Link } from 'react-router-dom'

function orderCurrent() {
    const header = (
        <div className="title">
            <br /><br />
            <input type="image" alt="back" className="back" src={leftArrow} />
            <h1>Past Orders</h1>
        </div>
    )

    const content = (
        <div className="content">
            <Link to={'/cart/checkout'}>
                <button className="order" type="submit" id="done" value="order">
                    <img alt="right arrow" className="right" id="dark" src={rightArrow} />
                    <h2>Tasty Trailer</h2>
                    <p>Preparing order</p>
                    <p className="date">29 April 2021 3.30 PM</p>
                </button>
            </Link>
        </div>
    )

    return (
        <div>
            {header}
            {content}
        </div>
    )
}

export default orderCurrent;