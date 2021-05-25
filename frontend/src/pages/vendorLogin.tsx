import React from 'react';
import './vendorLogin.css';
import { vendorLogin } from '../api';
import vendor from "../img/vendor.svg";


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
            <div className="titleLogin">
            <input className="vendor" type="image" alt="vendorimage" src={vendor}/>
            <h1 className="titleLog">Log In</h1>
            </div>
            <br/>

            <div className="containerProfile">
                <form id="form" onSubmit={this.handleSubmit}> 
                    <input type="text" name="email" value={email} placeholder="van name" onChange={this.handleChange} required />
                    <br/><br/>
                    <input  type="password" name="password" placeholder="pin" value={password} onChange={this.handleChange} required/>
                    <br/><br/>
                    <button className="login" type="submit" value="Login">Log in</button>
                </form>
        </div>
        </div>

    )
    }

}

export default VendorLogin;