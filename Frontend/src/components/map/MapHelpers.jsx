import {useEffect} from "react";

import {useMap} from "react-leaflet";

import L from "leaflet";



export function FlyToSource({source}){


    const map=useMap();


    useEffect(()=>{


        if(source){


            map.flyTo(

                source,

                16,

                {

                    animate:true,
                    duration:2

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

                    padding:[100,100],
                    animate:true

                }

            );


        }


    },[source,destination]);


    return null;


}




export function FollowLiveLocation({


    currentLocation,
    journeyStarted


}){


    const map=useMap();


    useEffect(()=>{


        if(

            currentLocation

            &&

            journeyStarted

        ){


            map.flyTo(

                currentLocation,

                18,

                {

                    animate:true,
                    duration:1

                }

            );


        }



    },[currentLocation]);


    return null;


}





export function FlyToDestination({


    destination


}){


    const map=useMap();


    useEffect(()=>{


        if(destination){


            map.flyTo(

                destination,

                16,

                {

                    animate:true,
                    duration:1.5

                }

            );


        }


    },[destination]);


    return null;


}