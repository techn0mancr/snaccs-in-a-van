import React from 'react';
import './vendorProfile.css';
import { Link } from 'react-router-dom'
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import { setVendorLocation } from '../api';
import map from "../img/map.png";

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br/><br/>
                <input className="vendorProfile" type="image" src={leftArrow} onClick={() => history.goBack()}/>
                <h1>Vendor Profile</h1>
                <br/>
            </div>
        )
    }
}

class Description extends React.Component {
    
    state = {
        desc: "",
        geolocation: [-37.7999432,144.9616192],
    };

    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const { desc, geolocation } = this.state;
        setVendorLocation(desc, geolocation);
    }

    render() {
    const { desc } = this.state;
    return (
        <div>
            <div className="container">
                <h2>Current location</h2>
                <p>757 Swanston St, Parkville VIC 3010</p>
            </div>

            <form onSubmit={this.handleSubmit}>
                <div className="container">
                <label id="location"><h2>Location Description</h2></label>
                <input className="vendorProfile" type="text" placeholder="Enter text..." name="desc" value={desc} onChange={this.handleChange} required />
            </div>
                <br/><br/><br/>
                <button type="submit" value="open" className="open">Open Store</button>
            </form>
        </div>
    )}
}

class VendorProfile extends React.Component {
    render() {
        return (
            <div>
                <div className="split left">
                    <img className="vendorProfile" src={map} />
                </div>

                <div className="split right">
                    <Header />
                    <Description />
                </div>
            </div>
        )
    }
}

export default VendorProfile