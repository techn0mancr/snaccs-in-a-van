/* Import the required libraries and types */
import React from 'react';

/* Import components */
import './vendorProfile.css';
import leftArrow from "../img/leftArrow.png";
import history from "../history";
import { setVendorLocationDescription, setVendorAvailability, vendorProfile, getVendorGeolocation } from '../api';

/* Header component of Vendor Geolocation Page */
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

/* Content component of Vendor Geolocation Page */
class Description extends React.Component {
    
    state = {
        desc: "",
        profile: [] as any
    }

    /* During on page */
    componentDidMount() {
        /* Get vendor's geolocation and profile */
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

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void; }) => {
        const { desc } = this.state;
        event.preventDefault();
        
        /* Set vendor's location description and set status to open. Then push new entry to history */
        setVendorLocationDescription(desc);
        setVendorAvailability();
        history.push("/vendor/orders");
    }

    render() {
        const { desc } = this.state;

        return (
            <div className ="vendorGeolocation">
                <div className="container">
                    <h2>Current location</h2>
                    <p>{window.sessionStorage.getItem("vendorLat") as any as number},{window.sessionStorage.getItem("vendorLng") as any as number}</p>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <label id="location"><h2>Location Description</h2></label>
                        <input className="vendorProfile" type="text" placeholder="Enter text..." name="desc" value={desc} onChange={this.handleChange} required />
                    </div>
                    <br/>
                    <button type="submit" value="open" className="open">Open Store</button>
                </form>
            </div>
        )
    }
}

/* Render all components on vendor geolocation page */
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
