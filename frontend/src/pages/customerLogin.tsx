import React from "react";
import './customerLogin.css';

function customerLogin() {
    const header = (
        <div className="titleLogin">
            <h1 className="titleLog">Log In</h1>
            <br />
            <h2>Don't have an account?</h2>
            <button className="signup" type="submit" value="signup"><h2> Sign up here</h2></button>
        </div>
    )

    const login = (
        <div className="containerLogin">
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