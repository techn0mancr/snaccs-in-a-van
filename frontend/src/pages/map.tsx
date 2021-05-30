/* Import the required libraries and types */
import React from 'react';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

/* Import components */
import 'leaflet/dist/leaflet.css';
import "./map.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import leftArrow from '../img/leftArrow.png';
import vanPoint from '../img/vanPoint.svg';
import pinPoint from '../img/pinPoint.svg';
import history from "../history";
import {getVendors} from '../api';

/* Header component of Map Page */
class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <h1 className="nVan">Nearest Vans</h1>
                <input type="image" className="back" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
            </div>
        )
    }
}

interface MainProps {
}

/* Render all components on Map Page */
class Content extends React.Component<MainProps, any> {

    constructor(props: MainProps) {
        super(props);
        this.state = {
            lat: window.sessionStorage.getItem("customerLat") as any as number,
            lng: window.sessionStorage.getItem("customerLng") as any as number,
            zoom: 15,
            mapContainer: React.createRef(),
            vendors: [] as any[]
        }
    }

    /* During on page, re-render every second */
    componentDidMount() {
        const { lat, lng, zoom } = this.state;

        /* Generate map into state */
        var map = L.map(this.state.mapContainer.current).setView([lat, lng], zoom);

        /* Customize icon */
        var vanIcon = new L.Icon({
            iconUrl: vanPoint,
            iconSize: [40, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });
        var pinIcon = new L.Icon({
            iconUrl: pinPoint,
            iconSize: [40, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });
        
        /* Pin point marker for current location */
        L.marker([lat, lng], {icon: pinIcon})
        .bindPopup("You are here!")
        .addTo(map)
        .openPopup();

        /* Get information of closest vendors */
        getVendors().then(
            (response) => {
                var data = response.data
                this.setState({vendors: data})
                /* Generate markers for each individual vendor */
                var i = 0 ;
                while (i < 5) {

                    /* Pin point marker for vendor's location and link to corresponding menu page */
                    L.marker([data[i].geolocation[0], data[i].geolocation[1]], {icon: vanIcon})
                    .bindPopup(data[i].name +  "<br/>" + data[i].locationDescription + "<br/><a href=/menu/vendor/?id=" + data[i]._id + ">Order</a>" )
                    .addTo(map)
                    i++;
                }
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
        
        /* Style the map using mapbox */
        L.mapboxGL({
            accessToken: 'pk.eyJ1IjoibGl2eWFuYXRhc2hhIiwiYSI6ImNrcGE0b2ttajBrY3kycGxsdnRxNXB5dmgifQ.ZU7MvBafKMb1fX91QcItiQ',
            style: 'mapbox://styles/livyanatasha/ckpa4turt3glb18qtp0d6qz4r'
        }).addTo(map);
    }

    render() {
        return (
            <div className ="map">
                <div ref={this.state.mapContainer} className="map-container" />
            </div>
        )
    }
    
}

/* Render all components on Map Page */
class Map extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

export default Map;