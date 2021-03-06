/* Import the required libraries and types */
import { NavLink } from "react-router-dom";

/* Import components */
import '../css/nav.css';
import Home from "../img/navBar/home.png";
import Cart from "../img/navBar/cart.png";
import Profile from "../img/navBar/profile.png";

/* Navigation bar at the bottom of all customer page */
export default function Nav() {
    return (
        <nav className="navBar">
            <NavLink className="contentNav" exact to="/menu">
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