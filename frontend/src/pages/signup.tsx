import React from 'react';
import './profile.css';
import { customerRegister } from "../api";
import history from "../history";

class CustomerSignup extends React.Component {
    state = {
        email: "", 
        givenName: "", 
        familyName: "", 
        password: ""
    }

    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const { email,  givenName, familyName, password } = this.state;
        customerRegister(email, givenName, familyName, password);
    }

    render() {
        const { email,  givenName, familyName, password } = this.state;
        return (
            <div>
                <div className="titleLogin">
                    <h1>Sign up</h1>
                    <br />
                    <h2>Already have an account? </h2>
                    <button className="signup" type="submit" value="signup" onClick={() => history.push(`/customer/login`)}><h2>Log in here</h2></button>
                </div>
                <br />

                <div className="containerProfile">
                    <form onSubmit={this.handleSubmit}> 
                        <input id="first" type="text" name="givenName" placeholder="given name" value={givenName} onChange={this.handleChange} required/><br/><br/>
                        <input id="last" type="text" name="familyName" placeholder="family name" value={familyName} onChange={this.handleChange} required/><br/><br/>
                        <input id="email" type="text" name="email" placeholder="email" value={email} onChange={this.handleChange} required/><br/><br/>
                        <input id="password" type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} required/><br/><br/>
                        <button className="login" type="submit" value="signup">Sign up</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CustomerSignup;
    