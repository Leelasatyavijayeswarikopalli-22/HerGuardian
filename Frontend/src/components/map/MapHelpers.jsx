import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export function FlyToSource({source}){

    const map=useMap();

    useEffect(()=>{

        if(source){

            map.flyTo(

                source,

                15,

                {

                    animate:true,

                    duration:1.2

                }

            );

        }

    },[source]);

    return null;

}

export function FitRoute({

    source,

    destination

}){

    const map=useMap();

    useEffect(()=>{

        if(source && destination){

            map.fitBounds(

                L.latLngBounds([

                    source,

                    destination

                ]),

                {

                    padding:[50,50]

                }

            );

        }

    },[source,destination]);

    return null;

}