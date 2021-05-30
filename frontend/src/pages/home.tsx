/* Import the required libraries and types */
import React from 'react';

/* Import components */
import "./home.css";
import history from '../history';
import snaccVan from '../img/food-van.svg';
import { getCustomerGeolocation } from '../api';

/* Header component of Home Page */
class Home extends React.Component {

    handleClick() {
        getCustomerGeolocation();
        history.push(`/menu`);
    }
    render() {
        return (
            <div className="titleLogin">
                <span className="landing">
                    <input type="image" alt="Snaccs-In-A-Van" className="snaccVan" src={snaccVan}/>
                </span>
                <h2 className="home">I am a ...</h2>
                <span className="landingbtn">
                    <button className="home" type="button" onClick={() => this.handleClick()}>Customer</button>
                    <button className="login" type="button" onClick={() => history.push(`/vendor/login`)}>Vendor</button>
                </span>
            </div>
        )
    }
}

export default Home;