import React from 'react';
import "./home.css";
import history from '../history';
import snaccVan from '../img/food-van.svg';


class Home extends React.Component {
    render() {
        return (
            <div className="titleLogin">
<<<<<<< HEAD
                <span className="landing">
                <input type="image" alt="Snaccs-In-A-Van" className="snaccVan" src={snaccVan}/>
                </span>
                {/* <h1 className="home">Snaccs In A Van</h1> */}
                <h2 className="home">I am a ...</h2>
                <span className="landingbtn">
                <button className="home" type="button" onClick={() => history.push(`/menu/list`)}>Customer</button>
=======
                <h1 className="titleLog">Welcome To Snaccs In a Van</h1>
                <br/>
                <h2>Are you a ...</h2>
                <br/>
                <button className="login" type="button" onClick={() => history.push(`/menu`)}>Customer</button>
>>>>>>> main
                <button className="login" type="button" onClick={() => history.push(`/vendor/login`)}>Vendor</button>
                </span>
            </div>
            // <footer class='snaccVan'>
            // </footer>
        )
    }
}

export default Home;