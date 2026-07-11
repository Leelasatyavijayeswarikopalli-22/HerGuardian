import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import LocationPicker from "./LocationPicker";
import SafetyRouting from "./SafetyRouting";
import RouteCards from "./RouteCards";
import { FlyToSource, FitRoute } from "./MapHelpers";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25,41],
  iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function GoogleMapView({

    source,

    destination,

    setSource,

    setDestination,

    pickingMode,

    setPickingMode

}){

    const apiKey =
        import.meta.env.VITE_MAPTILER_KEY;

    const [routeResults,setRouteResults] =
        useState([]);

    const [selectedRoute,setSelectedRoute] =
        useState(null);

    return(

        <>

        <div
        className="rounded-xl overflow-hidden border"
        style={{

            height:"600px",

            width:"100%"

        }}
        >

            <MapContainer

                center={
                    source ??
                    [16.989,82.247]
                }

                zoom={13}

                scrollWheelZoom={true}

                style={{

                    height:"100%",

                    width:"100%"

                }}

            >

                <TileLayer

                    attribution="© MapTiler © OpenStreetMap"

                    url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${apiKey}`}

                />

                <LocationPicker

                    pickingMode={pickingMode}

                    setPickingMode={setPickingMode}

                    setSource={setSource}

                    setDestination={setDestination}

                />

                <FlyToSource

                    source={source}

                />

                <FitRoute

                    source={source}

                    destination={destination}

                />

                {

                    source &&

                    <Marker position={source}>

                        <Popup>

                            Source

                        </Popup>

                    </Marker>

                }

                {

                    destination &&

                    <Marker position={destination}>

                        <Popup>

                            Destination

                        </Popup>

                    </Marker>

                }

                {

                    source &&

                    destination &&

                    <SafetyRouting

                        source={source}

                        destination={destination}

                        routeResults={routeResults}

                        setRouteResults={setRouteResults}

                        selectedRoute={selectedRoute}

                        setSelectedRoute={setSelectedRoute}

                    />

                }

            </MapContainer>

        </div>

        <RouteCards

            routeResults={routeResults}

            selectedRoute={selectedRoute}

            setSelectedRoute={setSelectedRoute}

        />

        </>

    );

}