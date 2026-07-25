import {useState,useEffect,useRef} from "react";

import{

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

import{

FlyToSource,
FitRoute

} from "./MapHelpers";



const DefaultIcon=L.icon({

iconUrl:icon,
shadowUrl:iconShadow,

iconSize:[25,41],
iconAnchor:[12,41]

});


const LiveIcon=L.icon({

iconUrl:icon,
shadowUrl:iconShadow,

iconSize:[40,60],
iconAnchor:[20,60]

});


L.Marker.prototype.options.icon=
DefaultIcon;



export default function GoogleMapView({


source,
destination,

setSource,
setDestination,

pickingMode,
setPickingMode


}){


const apiKey=

import.meta.env.VITE_MAPTILER_KEY;



const[routeResults,setRouteResults]=
useState([]);


const[selectedRoute,setSelectedRoute]=
useState(null);



const[journeyStarted,setJourneyStarted]=
useState(false);



const[currentLocation,setCurrentLocation]=
useState(null);



const[remainingDistance,
setRemainingDistance]=
useState(0);



const[eta,setEta]=
useState(0);



const[watchId,setWatchId]=
useState(null);



const[routeDeviation,
setRouteDeviation]=
useState(false);



const[voiceSOS,setVoiceSOS]=
useState(false);



const[safetyStatus,setSafetyStatus]=
useState("VERY SAFE");



const recognitionRef=
useRef(null);
function startJourney(route){

setSelectedRoute(
route.routeNumber
);
useEffect(()=>{

console.log(routeResults);

},[routeResults]);

setJourneyStarted(true);


setVoiceSOS(true);


startTracking();


startListening();

}



function stopJourney(){


setJourneyStarted(false);


setVoiceSOS(false);



if(watchId){

navigator.geolocation.clearWatch(
watchId
);

}



if(recognitionRef.current){

recognitionRef.current.stop();

}



alert(

"SAFE JOURNEY COMPLETED"

);


}



function startTracking(){


const id=

navigator.geolocation.watchPosition(


(position)=>{


const lat=
position.coords.latitude;


const lng=
position.coords.longitude;



setCurrentLocation(

[lat,lng]

);



if(destination){


const distance=

getDistance(

lat,
lng,

destination[0],
destination[1]

);



setRemainingDistance(

distance.toFixed(2)

);



const averageSpeed=35;


const time=

(distance/averageSpeed)*60;


setEta(

Math.round(time)

);



if(distance<0.03){
setSafetyStatus(
"DESTINATION REACHED"
);
stopJourney();

}



if(distance>0.20){

setRouteDeviation(true);
setSafetyStatus(
"CAUTION"
);

}


else{

setRouteDeviation(false);
setSafetyStatus(
"VERY SAFE"
);

}



}


},


(error)=>{


console.log(error);


},


{


enableHighAccuracy:true,

timeout:10000,

maximumAge:0


}



);


setWatchId(id);


}
function startListening(){


const SpeechRecognition=

window.SpeechRecognition ||

window.webkitSpeechRecognition;



if(!SpeechRecognition){

return;

}



const recognition=

new SpeechRecognition();


recognition.continuous=true;

recognition.interimResults=true;



recognition.onresult=(event)=>{


const text=

event.results[

event.results.length-1

][0].transcript.toLowerCase();



if(

text.includes("help me")

||

text.includes("danger")

||

text.includes("emergency")

||

text.includes("save me")

||

text.includes("sos")

||

text.includes("please help")

||

text.includes("i am scared")

||

text.includes("someone follows me")

){


activateSOS();


}



};



recognition.start();


recognitionRef.current=
recognition;


}




function activateSOS(){


alert(

"HERGUARDIAN SOS ACTIVATED"

);


}
function getDistance(

lat1,
lon1,

lat2,
lon2

){


const R=6371;



const dLat=

(degToRad(

lat2-lat1

));


const dLon=

(degToRad(

lon2-lon1

));



const a=

Math.sin(dLat/2)

*

Math.sin(dLat/2)


+

Math.cos(

degToRad(lat1)

)

*

Math.cos(

degToRad(lat2)

)

*

Math.sin(dLon/2)

*

Math.sin(dLon/2);



const c=

2*

Math.atan2(

Math.sqrt(a),

Math.sqrt(1-a)

);


return R*c;



}



function degToRad(degree){

return degree*

Math.PI/180;


}
return(

<>

{


journeyStarted &&(

<div

className="mb-5
rounded-3xl
bg-gradient-to-r
from-purple-700
to-pink-600
p-6
text-white
shadow-2xl"

>


<h1
className="text-3xl
font-bold"
>

SAFE JOURNEY ACTIVE

</h1>


<p
className="mt-2
text-lg"
>

{safetyStatus}

</p>


<div
className="mt-5
grid
grid-cols-2
gap-5"

>


<div>

<h2
className="font-bold"
>

ETA

</h2>

<p>

{eta} mins

</p>

</div>



<div>

<h2
className="font-bold"
>

Distance Left

</h2>

<p>

{remainingDistance} KM

</p>

</div>




<div>

<h2
className="font-bold"
>

Voice SOS

</h2>

<p>

{

voiceSOS

?

"ACTIVE"

:

"OFF"

}

</p>

</div>




<div>

<h2
className="font-bold"
>

Tracking

</h2>

<p>

LIVE

</p>

</div>


</div>




{

routeDeviation &&(

<div

className="mt-5
rounded-2xl
bg-red-600
p-4
animate-pulse"

>


<h2
className="font-bold
text-xl"
>

WARNING

</h2>


<p>

You are moving away from the selected route.

</p>


</div>

)


}



</div>


)

}



<div

className="rounded-3xl
overflow-hidden
border-2
shadow-xl"

style={{

height:"700px",
width:"100%"

}}

>



<MapContainer

center={

source??

[16.989,82.247]

}


zoom={14}

scrollWheelZoom={true}

style={{

height:"100%",
width:"100%"

}}

>



<TileLayer

attribution="© OpenStreetMap"

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


source&&(

<Marker

position={source}

>

<Popup>

YOUR LOCATION

</Popup>

</Marker>

)

}




{


destination&&(

<Marker

position={destination}

>

<Popup>

YOUR DESTINATION

</Popup>

</Marker>

)

}





{


journeyStarted

&&

currentLocation

&&(

<Marker

position={currentLocation}

icon={LiveIcon}

>

<Popup>

HERGUARDIAN

<br/>

LIVE TRACKING ACTIVE


</Popup>


</Marker>

)

}





{


source

&&

destination

&&(

<SafetyRouting


source={source}

destination={destination}

routeResults={routeResults}

setRouteResults={setRouteResults}

selectedRoute={selectedRoute}

setSelectedRoute={setSelectedRoute}


/>

)

}



</MapContainer>


</div>




<RouteCards


routeResults={routeResults}

selectedRoute={selectedRoute}

setSelectedRoute={setSelectedRoute}

startJourney={startJourney}

journeyStarted={journeyStarted}


/>



</>


);


}