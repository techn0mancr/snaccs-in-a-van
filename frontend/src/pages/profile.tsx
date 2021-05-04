import React from "react";
import './profile.css';
import { Link } from 'react-router-dom'

function profile() {
    const header = (
        <div className="titleLogin">
            <h1 className="titleLog">Profile</h1>
            <br />
        </div>
    )

    return (
        <div>
            {header}
        </div>
    )
}

export default profile;