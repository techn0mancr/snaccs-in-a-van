import React from "react";
import { NavLink } from "react-router-dom";
import './nav.css';
import history from '../history';

import Home from "../img/navBar/home.png";
import Cart from "../img/navBar/cart.png";
import Profile from "../img/navBar/profile.png";
import axios from "axios";

export default function Nav() {

    function handleSubmit() {
        if (axios.defaults.withCredentials == false) {
            history.push("/customer/profile")
        } else {
            history.push("/customer/login")
        }
    }
    return (
        <nav className="navBar">
            <NavLink className="contentNav" exact to="/menu">
            {/* <NavLink className="contentNav" exact to="/order/checkout"> */}
                <img className="nav" src={Home} alt="Home"/>
            </NavLink>

            <NavLink className="contentNav" to="/cart/order/active">
                <img className="nav" src={Cart} alt="Cart"/>
            </NavLink>

            <NavLink className="contentNav" to="/customer/profile">
                <img className="nav" src={Profile} alt="Profile"/>
            </NavLink>
        </nav>
    )
};