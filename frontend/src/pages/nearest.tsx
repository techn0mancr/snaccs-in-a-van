/* Import the required libraries and types */
import React from 'react';

/* Import components */
import './nearest.css';
import history from "../history";
import rightArrow from "../img/right.svg";
import { getVendors, selectVendor, getDistance, getCustomerGeolocation } from "../api";

/* Content component of List Nearest Page */
class ListNearest extends React.Component {

    state = {
        vendors: [] as any[],
        distance: 0
    }

    /* During on page */
    componentDidMount() {
        /* Get customer geolocation then find vendors near customer */
        getCustomerGeolocation();
        getVendors().then(
            (response) => {
                var data = response.data
                this.setState({vendors: data})
                console.log(response);
            }, (error) => {
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
        const { vendors } = this.state;

        return (
            <div className ="nearestVans">
                <h1 className="nVan">Nearest Vans</h1>
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
                                            <p className="nVan">{getDistance([window.sessionStorage.getItem("lat") as unknown as number, window.sessionStorage.getItem("lng") as unknown as number],vendor.geolocation)} kms away...</p>
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

export default ListNearest;