import { useMapEvents } from "react-leaflet";

export default function LocationPicker({

    pickingMode,

    setPickingMode,

    setSource,

    setDestination

}){

    useMapEvents({

        click(e){

            const point=[

                e.latlng.lat,

                e.latlng.lng

            ];

            if(pickingMode==="source"){

                setSource(point);
                setPickingMode(null);

            }

            if(pickingMode==="destination"){

                setDestination(point);
                setPickingMode(null);

            }

        }

    });

    return null;

}