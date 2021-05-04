import React, { useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom'
import axios from 'axios';

// const Login = () => {
class Login extends React.Component {
    // const [user, setUser] = useState({
    //     email: "",
    //     password: ""
    // });
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

        // axios.post(`localhost:48080/api/customer/login`, { email, password })
        //     .then((response) => {
        //         console.log(response);
        //     }, (error) => {
        //         console.log(error);
        // });
        // axios({
        //     method: "post",
        //     url: "localhost:48080/api/customer/login",
        //     data: {user},
        // })
        // .then((response) => {
        //     console.log(response);
        //   }, (error) => {
        //     console.log(error);
        //   });

        fetch('http://localhost:48080/api/customer/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })
        // .then(res => res.json())
        // .then(json => setUser(json.user))
        .then(response => response.json())

        // e.preventDefault()
        }

    

    // const submit = (e: { preventDefault: () => void; }) => {
    //     const Data = new FormData();
    //     Data.append('email', {user.email});

        
        
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
                    {/* <input id="email" type="text" name="email" placeholder="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} required /><br/><br/>
                    <input id="password" type="password" name="password" placeholder="password" value={user.password}  onChange={e => setUser({ ...user, password: e.target.value })} required /><br/><br/> */}
                    {/* <Link to={"/profile/proof"}> */}
                        <button className="login" type="submit">Log in</button>
                    {/* </Link> */}
                </form>
            </div>
        </div>
    )
    }

}

export default Login