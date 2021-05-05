import React, { useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom'
import history from '../history';
import axios from 'axios';

class Login extends React.Component {
    
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

        axios.post(`http://localhost:48080/api/customer/login`, { email, password })
            .then((response) => {
                history.push('/profile/proof');
                console.log(response);
            }, (error) => {
                console.log(error);
        });

        // axios.get(`http://localhost:48080/api/customer/profile`)
        // .then(resp => {
        //     console.log(resp.data);
        // });
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
                <form id="form" onSubmit={this.handleSubmit}> 
                    <input id="email" type="text" name="email" placeholder="email" value={email} onChange={this.handleChange} required /><br/><br/>
                    <input id="password" type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} required /><br/><br/>
                    
                        <button className="login" type="submit">
                            {/* <Link to={"/profile/proof"}> */}
                                <h2 className="click">Log in</h2>
                            {/* </Link> */}
                        </button>
                    
                </form>
            </div>
        </div>
    )
    }

}

export default Login