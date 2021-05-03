import React from "react";
import './profile.css';
import { Link } from 'react-router-dom'

function customerLogin() {
    const header = (
        <div className="titleLogin">
            <h1 className="titleLog">Log In</h1>
            <br />
            <h2>Don't have an account?</h2>
            <Link to={"/profile/signup"}> 
                <button className="signup" type="submit" value="signup"><h2> Sign up here</h2></button>
            </Link> 
        </div>
    )

    const login = (
        <div className="containerProfile">
            <form method="POST" action="/login" id="form"> 
                <input id="email" type="text" name="email" placeholder="email" required /><br/><br/>
                <input id="password" type="password" name="password" placeholder="password" required /><br/><br/>
                <button className="login" type="submit" value="Login">Log in</button>
            </form>
        </div>
    )

    return (
        <div>
            {header}
            {login}
        </div>
    )
}

export default customerLogin;