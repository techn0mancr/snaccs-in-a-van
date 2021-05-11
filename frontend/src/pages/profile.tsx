import React from 'react';
import './profile.css';
import { customerProfile, customerLogout, emptyCart } from '../api';
import history from '../history';

class Profile extends React.Component {

    componentWillMount() {
        customerProfile();
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        emptyCart();
        customerLogout();
        history.push('/customer/login');
    }

    render() {
        return (
            <div className="titleLogin">
                <h1 className="titleLog">You are logged in</h1>
                <br />
                <button className="login" type="submit" onClick={this.handleSubmit}>
                    <h2 className="click">Log out</h2>
                </button>
            </div>
        )
    }
}

export default Profile;