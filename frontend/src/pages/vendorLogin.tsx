/* Import the required libraries and types */
import React from 'react';

/* Import components */
import './vendorLogin.css';
import vendor from "../img/vendor.svg";
import { vendorLogin, getVendorGeolocation } from '../api';

/* Component for Vendor Login */
class VendorLogin extends React.Component {
    
    state = {
        name: "",
        password: "",
    }

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void; }) => {
        const { name, password } = this.state;
        event.preventDefault();

        /* Get vendor location and login the vendor. Then push new entry to history */
        getVendorGeolocation();
        vendorLogin(name, password);
    }

    render() {
        const { name, password } = this.state;

        return (
            <div>
                <div className="titleLogin">
                    <input className="vendor" type="image" alt="vendorimage" src={vendor}/>
                    <h1 className="titleLog">Log In</h1>
                </div>
                <br/>

                <div className="containerProfile">
                    <form id="form" onSubmit={this.handleSubmit}> 
                        <input type="text" name="name" value={name} placeholder="van name" onChange={this.handleChange} required />
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