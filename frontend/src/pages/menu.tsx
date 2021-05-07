import React from 'react';
import './menu.css';

class VanInfo extends React.Component {
    render() {
        return (
            <div className="van-card">
                <input type="image" className="back" src="elements/leftArrow.png" />
                <div className="van-image">
                    <div className="van-container">
                        <h1>Tasty Trailer</h1>
                        <h2>757 Swanston St, Parkville VIC 3010</h2>
                        <h3>next to Stop 1</h3>
                        <p>0.25 km away from you</p>
                    </div>
                </div>
            </div>
        )
    }
}

class Items extends React.Component {
    render() {
        return (
            <div className="menu">
                <h1>Drinks</h1>
                <div className="menu-card">
                    <img src= "https://source.unsplash.com/J-4ozdP9EQ0/88x82" class="card" alt="cappucino" />
                    <div className="menu-container">
                        <button type="button" className="menu-button">Add</button>
                        <h2>Cappucino</h2>
                        <h3>$8.00</h3>
                    </div>
                </div>
            </div>
        )
    }
}

class Menu extends React.Component {
    render() {
        return (
            <div>
                <VanInfo />
                <Items />
            </div>
        )
    }
}

export default Menu;