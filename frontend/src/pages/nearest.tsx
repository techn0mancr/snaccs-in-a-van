import React from 'react';
import './nearest.css';
import history from "../history";
import { getVendors, selectVendor, getDistance, getCustomerGeolocation } from "../api";
import rightArrow from "../img/right.svg";
import sorry from "../img/sorry.svg";

class ListNearest extends React.Component {
    state = {
        vendors: [] as any[],
        distance: 0
    }

    componentDidMount() {
        getVendors().then(
            (response) => {
                if (response)
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
                                <div className="content">
                                <button className="order" type="submit" value="order" onClick={()=> this.onClick(vendor._id)}>
                                    {/* <div className="nearestVan-card"> */}
                                        <div className="nearestVan-container">
                                        <img alt="right arrow" className="nearRight" src={rightArrow} />
                                            <h2 className ="nVan">{vendor.name}</h2>
                                            <h3 className="nVan">{vendor.locationDescription}</h3>
                                            <p className="nVan">{getDistance([localStorage.getItem("lat") as unknown as number, 
                                            localStorage.getItem("lng") as unknown as number],
                                             vendor.geolocation)} kms away...</p>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    {/* </div> */}
                                </button>
                                </div>

                            </div>
                        ))}
                    </div>
                    
                :
                // <input type="image" alt="Sorry" className="sorry" src={sorry}/>

                <h3 className ="error">Oh no, we can't find a van near you</h3>}
            </div>
        )
    }
}

export default ListNearest;