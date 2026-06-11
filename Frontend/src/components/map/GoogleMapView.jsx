import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

const center = {
  lat: 17.385,
  lng: 78.4867,
};

export default function GoogleMapView() {
  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY"
    >
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "600px",
        }}
        center={center}
        zoom={13}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}