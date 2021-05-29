import React from 'react';
import './vendorProfile.css';
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import { setVendorLocationDescription, setVendorAvailability, vendorProfile } from '../api';

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br/><br/>
                <input className="back" type="image" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1 className="titleLog">Vendor Geolocation</h1>
                <br/>
            </div>
        )
    }
}

class Geolocation extends React.Component {
    
    state = {
        profile: [] as any,
        error: null,
        isLoaded: false
    }

    componentDidMount() {
        vendorProfile().then(
            (response) => {
                var data = response.data;
                this.setState({profile: data, isLoaded: true});
                console.log(response);
            }, (error) => {
                this.setState({isLoaded: true, error});
                console.log(error);
            }
        )
    }

    render() {
        const { isLoaded, error } = this.state;

        if (error === true) {
            return (
                <div className ="vendorGeolocation">
                    <div className="geoContainer">
                        <h2>Current location</h2>
                        <p>Could not load coordinate</p>
                    </div>
                </div>
            )
        } else if (isLoaded === false) {
            return (
                <div className ="vendorGeolocation">
                    <div className="geoContainer">
                        <h2>Current location</h2>
                        <p>Loading...</p>
                    </div>
                </div>
            )
        }
        return (
            <div className ="vendorGeolocation">
                <div className="geoContainer">
                    <h2>Current location</h2>
                    <p>({window.sessionStorage.getItem("vendorLat") as any as number}, {window.sessionStorage.getItem("vendorLng") as any as number})</p>
                </div>
            </div>
        )
    }
}

class Description extends React.Component {

    state = {
        desc: ""
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
        const { desc } = this.state;

        return (
            <div className ="vendorGeolocation">
                <form onSubmit={this.handleSubmit}>
                    <div className="geoContainer">
                        <label id="location"><h2>Location Description</h2></label>
                        <input className="vendorDesc" type="text" placeholder="Enter text..." name="desc" value={desc} onChange={this.handleChange} required />
                    </div>
                    <br/>
                    <button type="submit" value="open" className="open">Open Store</button>
                </form>
            </div>
        )
    }

}

class VendorGeolocation extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Geolocation />
                <Description />
            </div>
        )
    }
}

export default VendorGeolocation;