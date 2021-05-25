import React from 'react';
import "./home.css";
import history from '../history';
import snaccVan from '../img/food-van.svg';


class Home extends React.Component {
    render() {
        return (
            <div className="titleLogin">
                <span className="landing">
                <input type="image" alt="Snaccs-In-A-Van" className="snaccVan" src={snaccVan}/>
                </span>
                <h2 className="home">I am a ...</h2>
                <span className="landingbtn">
                <button className="home" type="button" onClick={() => history.push(`/menu/list`)}>Customer</button>
                <button className="login" type="button" onClick={() => history.push(`/vendor/login`)}>Vendor</button>
                </span>
            </div>
            // <footer class='snaccVan'>
            // </footer>
        )
    }
}

export default Home;