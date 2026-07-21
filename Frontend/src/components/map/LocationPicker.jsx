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

                alert(

                    "Source Selected Successfully."

                );

            }



            if(pickingMode==="destination"){


                setDestination(point);

                setPickingMode(null);


                alert(

                    "Destination Selected Successfully."

                );


            }


        }


    });


    return null;


}