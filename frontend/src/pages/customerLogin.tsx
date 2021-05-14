import React from 'react';
import './profile.css';
import { Link } from 'react-router-dom'
import { customerLogin } from '../api';

class CustomerLogin extends React.Component {
    
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
        customerLogin(email, password);
    }

    render() {
    const { email, password } = this.state;
    return (
        <div>
            <div className="titleLogin">
                <h1 className="titleLog">Log In</h1>
                <br />
                <h2>Don't have an account?</h2>
                <Link to={"/customer/register"}> 
                    <button className="signup" type="button"><h2> Sign up here</h2></button>
                </Link> 
            </div>

            <div className="containerProfile">
                <form onSubmit={this.handleSubmit}> 
                    <input id="email" type="text" name="email" placeholder="email" value={email} onChange={this.handleChange} required /><br/><br/>
                    <input id="password" type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} required /><br/><br/>
                    
                    <button className="login" type="submit">
                        <h2 className="click">Log in</h2>
                    </button>
                </form>
            </div>
        </div>
    )
    }

}

export default CustomerLogin