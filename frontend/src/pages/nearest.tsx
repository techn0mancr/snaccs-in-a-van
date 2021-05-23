import React from 'react';
import './nearest.css';

class ListNearest extends React.Component {
    render() {
        return (
            <div className ="nearestVans">
                <h1 className="nVan">Nearest Vans</h1>
                <div className="nearestVan-card">
                    <div className="nearestVan-container">
                        <h2 className ="nVan">Tasty Trailer</h2>
                        <h3 className="nVan">757 Swanston St, Parkville VIC 3010</h3>
                        <p className="nVan">0.25 km away from you</p>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListNearest;