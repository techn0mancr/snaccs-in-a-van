import React from 'react';
import './vendorLogin.css';
import { vendorLogin, getVendorGeolocation } from '../api';

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

        getVendorGeolocation();
        const { email, password } = this.state;
        vendorLogin(email, password);
    }

    render() {
    const { email, password } = this.state;
    return (
        <div>
            <h1 className="vendor">Log In</h1>
            <div className="center">
                <form id="form" onSubmit={this.handleSubmit}> 
                    <input className="vanName" type="text" name="email" value={email} placeholder="van name" onChange={this.handleChange} required />
                    <br/><br/>
                    <input className="pin" type="password" name="password" placeholder="pin" value={password} onChange={this.handleChange} required/>
                    <br/><br/><br/><br/>
                    <button className="vendor" type="submit" value="Login">Log in</button>
                </form>
            </div>
        </div>
    )
    }

}

export default VendorLogin;