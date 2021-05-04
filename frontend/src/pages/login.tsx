import React, { useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom'

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        fetch('/apilocalhost:48080/api/customer/login', {
            method: 'POST',
            body: JSON.stringify({ user }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => setUser(json.user))
    }

    return (
        <div>
            <div className="titleLogin">
                <h1 className="titleLog">Log In</h1>
                <br />
                <h2>Don't have an account?</h2>
                <Link to={"/customer/register"}> 
                    <button className="signup" type="submit" value="signup"><h2> Sign up here</h2></button>
                </Link> 
            </div>

            <div className="containerProfile">
                <form id="form" onSubmit={submit}> 
                    <input id="email" type="text" name="email" placeholder="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} required /><br/><br/>
                    <input id="password" type="password" name="password" placeholder="password" value={user.password}  onChange={e => setUser({ ...user, password: e.target.value })} required /><br/><br/>
                    <Link to={"/profile/proof"}>
                        <button className="login" type="submit" value="Login">Log in</button>
                    </Link>
                </form>
            </div>
        </div>
    )


}

export default Login