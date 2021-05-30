/* Import the required libraries and types */
import React from 'react';
import mapboxgl from 'mapbox-gl';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';
import mapbox from 'mapbox';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

/* Import components */
import 'leaflet/dist/leaflet.css';
import "./map.css";
import 'mapbox-gl/dist/mapbox-gl.css';

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
            zoom: 2,
            mapContainer: React.createRef()
        }
    }

//     componentDidMount() {
//         const { lng, lat, zoom, maps } = this.state;
//         // const map = new mapboxgl.Map({ container: this.state.mapContainer.current,
//         // style: 'mapbox://styles/livyanatasha/ckpa4turt3glb18qtp0d6qz4r',
//         // center: [lng, lat],
//         // zoom: zoom
//         // });

//         // var marker = new mapboxgl.Marker()
//         //             .setLngLat([lng, lat])
//         //             .addTo(map);
//         var token = "pk.eyJ1IjoibGl2eWFuYXRhc2hhIiwiYSI6ImNrcGE0b2ttajBrY3kycGxsdnRxNXB5dmgifQ.ZU7MvBafKMb1fX91QcItiQ";
        
//         var map = L.map('map').setView([lng,lat], zoom);
//         L.marker([38.912753, -77.032194])
//         .bindPopup("Hello <b>Leaflet GL</b>!<br>Whoa, it works!")
//         .addTo(map)
//         .openPopup();

//     var gl = L.mapboxGL({
//         accessToken: 'no-token',
//         // get your own MapTiler token at https://cloud.maptiler.com/ or use MapBox style
//         style: 'https://api.maptiler.com/maps/topo/style.json?key=gbetYLSD5vR8MdtZ88AQ'
//     }).addTo(map);
//     this.setState({maps: map})
// //         var mapLeaflet = L.mapboxgl.map('map-leaflet')
// //   .setView([37.8, -96], 4)
// //   .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));
//         }

//     render() {
//         const {lng, lat, zoom, maps} = this.state;

//         return (
//             <div>
//                 <div ref={this.state.maps} className="map-container" />
//             </div>
            
//             // <div>
//             //     <div className="sidebar">
//             //         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//             //     </div>
//             //     <div ref={this.state.mapContainer} className="map-container" />
//             // </div>
            
//         )
//     }
// }

    componentDidMount() {
        const { lat, lng } = this.state;
        var map = L.map(this.state.mapContainer.current).setView([38.912753, -77.032194], 15);
        L.marker([lat, lng])
        .bindPopup("Hello <b>Leaflet GL</b>!<br>Whoa, it works!")
        .addTo(map)
        .openPopup();

        var gl = L.mapboxGL({
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