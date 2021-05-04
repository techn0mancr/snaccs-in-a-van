import './order.css';
import rightArrow from "../img/rightArrow.png"
import { Link } from 'react-router-dom'

function orderCurrent() {
    const header = (
        <div className="title">
            <br /><br />
            <h1>Current Orders</h1>
            <Link to={'/cart/past'}>
                <button className="past" type="submit" value="past">View past orders</button>
            </Link>
            <br />
        </div>
    )

    const content = (
        <div className="content">
            <Link to={'/cart/orderstatus'}>
                <button className="order" type="submit" value="order">
                    <img alt="right arrow" className="right" src={rightArrow} />
                    <h2>Tasty Trailer</h2>
                    <p id="ready">Ready for pick up</p>
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