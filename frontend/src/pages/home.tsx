import React from 'react';
import history from '../history';

class Home extends React.Component {
    render() {
        return (
            <div className="titleLogin">
                <h1 className="titleLog">Welcome To Snaccs In a Van</h1>
                <br/>
                <h2>Are you a ...</h2>
                <br/>
                <button className="login" type="button" onClick={() => history.push(`/menu`)}>Customer</button>
                <button className="login" type="button" onClick={() => history.push(`/vendor/login`)}>Vendor</button>
            </div>
        )
    }
}

export default Home;