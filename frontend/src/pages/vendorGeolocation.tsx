import React from 'react';
import './vendorProfile.css';
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import { setVendorLocationDescription, setVendorAvailability, getVendorGeolocation, vendorProfile } from '../api';

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br/><br/>
                <input className="vendorProfile" type="image" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1>Vendor Geolocation</h1>
                <br/>
            </div>
        )
    }
}

class Description extends React.Component {
    
    state = {
        desc: "",
        profile: [] as any
    };

    componentDidMount() {
        getVendorGeolocation();
        vendorProfile().then(
            (response) => {
                var data = response.data;
                this.setState({profile: data});
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }

    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const { desc } = this.state;
        setVendorLocationDescription(desc);
        setVendorAvailability();
        history.push("/vendor/orders");
    }

    render() {
    const { desc, profile } = this.state;
    return (
        <div>
            <div className="container">
                <h2>Current location</h2>
                <p>{profile.latitude}, {profile.longitude}</p>
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

class VendorGeolocation extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Description />
            </div>
        )
    }
}

export default VendorGeolocation;