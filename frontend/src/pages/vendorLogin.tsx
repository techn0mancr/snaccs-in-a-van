import React from 'react';
import './vendorLogin.css';
import { vendorLogin } from '../api';

class VendorLogin extends React.Component {
    
    state = {
        email: "",
        password: "",
    };

    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const { email, password } = this.state;
        vendorLogin(email, password);
    }

    render() {
    const { email, password } = this.state;
    return (
        <div>
            <h1>Log In</h1>
            <div className="center">
                <form id="form" onSubmit={this.handleSubmit}> 
                    <input id="vanName" type="text" name="vanName" placeholder="van name" onChange={this.handleChange} required />
                    <br/><br/>
                    <input id="pin" type="password" name="pin" placeholder="pin" onChange={this.handleChange} required/>
                    <br/><br/><br/><br/>
                    <button type="submit" value="Login">Log in</button>
                </form>
            </div>
        </div>
    )
    }

}

export default VendorLogin;