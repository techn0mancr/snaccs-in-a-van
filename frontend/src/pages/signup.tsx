import React from "react";
import './profile.css';
import { Link } from 'react-router-dom'

function signup() {
    const header = (
        <div className="titleProfile">
            <h1>Sign In</h1>
            <br />
            <h2>Already have an account? </h2>
            <Link to={"/customer/login"}>
            <button className="signup" type="submit" value="signup"><h2>Log in here</h2></button>
            </Link>  
        </div>
    )
    
    const signup = (
        <div className="containerProfile">
            <form method="POST" action="/login" id="form"> 
                <input id="first" type="text" name="first" placeholder="first name" required/><br/><br/>
                <input id="last" type="text" name="last" placeholder="last name" required/><br/><br/>
                <input id="email" type="text" name="email" placeholder="email" required/><br/><br/>
                <input id="password" type="password" name="password" placeholder="password" required/><br/><br/>
                <input id="confirmPassword" type="password" name="confirmPassword" placeholder="confirm password" required/><br/><br/><br/><br/>
                <button className="login" type="submit" value="signup">Sign up</button>
            </form>
        </div>
    )

    return (
        <div>
            {header}
            {signup}
        </div>
    )
}

export default signup;
    