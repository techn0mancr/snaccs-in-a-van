import React from 'react';
import './nearest.css';
import history from "../history";
import { getVendors, selectVendor, getDistance, getCustomerGeolocation } from "../api";
import rightArrow from "../img/rightArrow.png"

class ListNearest extends React.Component {
    state = {
        vendors: [] as any[],
        distance: 0
    }

    componentDidMount() {
        getCustomerGeolocation();
        getVendors().then(
            (response) => {
                // if (response)
                var data = response.data
                this.setState({vendors: data})
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
        
    }

    onClick(vendorId: String) {
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
                                
                                <button className="order" type="submit" value="order" onClick={()=> this.onClick(vendor._id)}>
                                    {/* <div className="nearestVan-card"> */}
                                        <div className="nearestVan-container">
                                        <img alt="right arrow" className="right" src={rightArrow} />
                                            <h2 className ="nVan">{vendor.name}</h2>
                                            <h3 className="nVan">{vendor.locationDescription}</h3>
                                            <p className="nVan">{getDistance([window.sessionStorage.getItem("lat") as unknown as number, 
                                            window.sessionStorage.getItem("lng") as unknown as number],
                                             vendor.geolocation)} kms away...</p>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    {/* </div> */}
                                </button>
                               
                            </div>
                        ))}
                    </div>
                :
                <h2>No Van Within 10km</h2>}
            </div>
        )
    }
}

export default ListNearest;