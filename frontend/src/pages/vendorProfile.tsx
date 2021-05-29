import React from 'react';
import './vendorProfile.css';
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import { vendorProfile, vendorLogout, setVendorAvailability } from '../api';
import VendorGeolocation from './vendorGeolocation';

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br/><br/>
                <input className="vendorProfile" type="image" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1 className="titleLog">Vendor Profile</h1>
                <br/>
            </div>
        )
    }
}

class Description extends React.Component {
    
    state = {
        details: [] as any,
        geolocation: [] as any
    };

    componentDidMount() {
        vendorProfile().then(
            (response) => {
                var data = response.data;
                this.setState({details: data, geolocation: data.geolocation});
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClick() {
        setVendorAvailability().then(
            (response) => {
                if (response.status === 200) {
                    history.push("/vendor/login");
                    vendorLogout();
                } 
                console.log(response);
            })
            .catch(error=>{ 
                if (error.response) {
                    alert("Please fulfill all order!"); 
                    history.goBack();
                }
                console.log(error);
            });
    }

    render() {
    const { details, geolocation } = this.state;
    
    return (
        <div className ="vendorGeolocation">
            <div className="geoContainer">
                <h2>Current location</h2>
                <p>{geolocation[0]},{geolocation[1]}</p> 
                </div>

            <div className="geoContainer">
                <h2>Location Description</h2>
                <p>{details.locationDescription}</p>
            <br/><br/><br/>

        </div>
        <br/>
        <button type="button" className="closeStore" onClick={this.handleClick}>Close Store</button>
        </div>

    )}
}

class VendorProfile extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Description />
            </div>
        )
    }
}

export default VendorProfile