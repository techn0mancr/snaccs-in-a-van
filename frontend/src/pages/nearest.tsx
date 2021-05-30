/* Import the required libraries and types */
import React from 'react';

/* Import components */
import './nearest.css';
import history from "../history";
import rightArrow from "../img/right.svg";
import { getVendors, selectVendor, getDistance } from "../api";

/* Header component of List Nearest Page */
class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <h1 className="nVan">Nearest Vans</h1>
                <button className="past" type="submit" value="past" onClick={()=> history.push(`/map`)}>View Map</button>
            </div>
        )
    }
}

/* Content component of List Nearest Page */
class ListNearest extends React.Component {

    state = {
        vendors: [] as any[],
        distance: 0,
        isLoaded: false,
        error: null
    }

    /* During on page */
    componentDidMount() {
        /* Get customer geolocation then find vendors near customer */
        getVendors().then(
            (response) => {
                var data = response.data
                this.setState({vendors: data, isLoaded: true})
                console.log(response);
            }, (error) => {
                this.setState({isLoaded: true, error});
                console.log(error);
            }
        )
        
    }

    /* Handle when click on button */
    onClick(vendorId: String) {
        /* Pick vendor. Then push new entry to history */
        selectVendor(vendorId);
        history.push(`/menu/vendor/?id=${vendorId}`);
    }

    render() {
        const { vendors, error, isLoaded } = this.state;

        if (error === true) {
            return (<h3 className="error">Currently No Stores Near</h3>)
        } else if (isLoaded === false) {
            return (<h3 className="error">Loading...</h3>)
        } else {
            return (
                <div className ="nearestVans">
                    {vendors.length>0 ?
                        <div>
                            {vendors.map((vendor, i) => (
                                <div key={i}>
                                    <div className="content">
                                        <button className="order" type="submit" value="order" onClick={()=> this.onClick(vendor._id)}>
                                            <div className="nearestVan-container">
                                                <img alt="right arrow" className="nearRight" src={rightArrow} />
                                                <h2 className ="nVan">{vendor.name}</h2>
                                                <h3 className="nVan">{vendor.locationDescription}</h3>
                                                <p className="nVan">{getDistance([window.sessionStorage.getItem("customerLat") as unknown as number, window.sessionStorage.getItem("customerLng") as unknown as number],vendor.geolocation)} km away from you</p>
                                                <i className="fas fa-chevron-right"></i>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :<h3 className ="error">Oh no, we can't find a van near you</h3>
                    }
                </div>
            )
        }
    }
}

/* Render all components on List Nearest Page */
class Near extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <ListNearest />
            </div>
        )
    }
}

export default Near;