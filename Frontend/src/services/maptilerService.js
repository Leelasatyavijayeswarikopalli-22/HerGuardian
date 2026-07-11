import axios from "axios";

const API_KEY = import.meta.env.VITE_ORS_API_KEY;

export async function getAlternativeRoutes(source, destination) {

    const response = await axios.post(

        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",

        {
            coordinates: [
                [source[1], source[0]],
                [destination[1], destination[0]]
            ],

            alternative_routes: {
                target_count: 3,
                weight_factor: 1.6
            }
        },

        {
            headers: {
                Authorization: API_KEY,
                "Content-Type": "application/json"
            }
        }

    );

    return response.data.features.map(feature => ({

        geometry: feature.geometry,

        distance: feature.properties.summary.distance,

        duration: feature.properties.summary.duration

    }));

}