/* Import the required libraries and types */
import React from 'react';
import mapboxgl from 'mapbox-gl';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

/* Import components */
import 'leaflet/dist/leaflet.css';
import "./map.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import {getVendors} from '../api';

mapboxgl.accessToken = 'pk.eyJ1IjoibGl2eWFuYXRhc2hhIiwiYSI6ImNrcGE0b2ttajBrY3kycGxsdnRxNXB5dmgifQ.ZU7MvBafKMb1fX91QcItiQ';

/* Header component of Map Page */
class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <h1 className="nVan">Nearest Vans</h1>
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

    componentDidMount() {
        const { lat, lng, zoom, vendors } = this.state;

        var map = L.map(this.state.mapContainer.current).setView([lat, lng], zoom);
        var greenIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
        
        L.marker([lat, lng], {icon: greenIcon})
        .bindPopup("You are here!")
        .addTo(map)
        .openPopup();

        getVendors().then(
            (response) => {
                var data = response.data
                this.setState({vendors: data})
                var i = 0 ;
                while (i < 5) {
                    L.marker([data[i].geolocation[0], data[i].geolocation[1]], {icon: greenIcon})
                    .bindPopup(data[i].name +  "<br/>" + data[i].locationDescription + "<br/>" + "<a href=" + "/menu/vendor/?id=" + data[i]._id + ">" + "Order" + "</a>" )
                    .addTo(map)
                    i++;
                }
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )

        L.mapboxGL({
            accessToken: 'pk.eyJ1IjoibGl2eWFuYXRhc2hhIiwiYSI6ImNrcGE0b2ttajBrY3kycGxsdnRxNXB5dmgifQ.ZU7MvBafKMb1fX91QcItiQ',
            style: 'mapbox://styles/livyanatasha/ckpa4turt3glb18qtp0d6qz4r'
        }).addTo(map);

    }

    render() {
        return (
            <div ref={this.state.mapContainer} className="map-container" />
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