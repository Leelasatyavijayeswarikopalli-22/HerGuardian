import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { getAlternativeRoutes } from "../../services/maptilerService";

export default function SafetyRouting({

    source,

    destination,

    setRouteResults,

    selectedRoute,

    setSelectedRoute

}){

    const map=useMap();

    const polylines=useRef([]);

    useEffect(()=>{

        if(!source || !destination)
            return;

        loadRoutes();

        async function loadRoutes(){

            try{

                clearRoutes();

                const routes=

                    await getAlternativeRoutes(

                        source,

                        destination

                    );

                analyzeRoutes(routes);

            }

            catch(error){

                console.log(error);

            }

        }
                async function analyzeRoutes(routes){

            const payload={

                routes:

                    routes.map((route,index)=>({

                        routeNumber:index+1,

                        distance:route.distance,

                        duration:route.duration,

                        coordinates:

                            route.geometry.coordinates.map(point=>({

                                latitude:point[1],

                                longitude:point[0]

                            }))

                    }))

            };

            const response=

                await axios.post(

                    "http://localhost:8080/api/routes/analyze",

                    payload

                );

            const rankedRoutes=response.data;

            setRouteResults(rankedRoutes);

            drawRoutes(

                routes,

                rankedRoutes

            );

        }
                function drawRoutes(

            routes,

            rankedRoutes

        ){

            routes.forEach((route,index)=>{

                const aiRoute=

                    rankedRoutes.find(

                        r=>r.routeNumber===index+1

                    );

                if(!aiRoute)
                    return;

                let color="#ef4444";

                let weight=5;

                if(aiRoute.safest){

                    color="#16a34a";

                    weight=8;

                }

                else if(aiRoute.fastest){

                    color="#2563eb";

                    weight=7;

                }

                else if(aiRoute.totalSafetyScore>=80){

                    color="#22c55e";

                }

                else if(aiRoute.totalSafetyScore>=60){

                    color="#f59e0b";

                }

                const coordinates=

                    route.geometry.coordinates.map(

                        point=>[

                            point[1],

                            point[0]

                        ]

                    );

                const polyline=

                    L.polyline(

                        coordinates,

                        {

                            color,

                            weight,

                            opacity:0.9

                        }

                    );

                polyline.addTo(map);

                polylines.current.push(polyline);
                                polyline.bindPopup(`

<div style="font-family:Arial;width:260px">

<h3>Route ${aiRoute.routeNumber}</h3>

<hr/>

<h2 style="color:#16a34a">

Safety Score

${aiRoute.totalSafetyScore.toFixed(1)}

</h2>

Crime : ${aiRoute.crimeScore.toFixed(1)}<br/>

Crowd : ${aiRoute.crowdScore.toFixed(1)}<br/>

Lighting : ${aiRoute.lightingScore.toFixed(1)}<br/>

Police : ${aiRoute.policeScore.toFixed(1)}<br/>

CCTV : ${aiRoute.cctvScore.toFixed(1)}<br/>

Road : ${aiRoute.roadScore.toFixed(1)}<br/>

Time : ${aiRoute.timeScore.toFixed(1)}<br/><br/>

${

aiRoute.safest

?

"<span style='color:green;font-weight:bold'>🛡️ SAFEST ROUTE</span><br/>"

:

""

}

${

aiRoute.fastest

?

"<span style='color:#2563eb;font-weight:bold'>⚡ FASTEST ROUTE</span>"

:

""

}

</div>

`);
                polyline.on("click",()=>{

                    setSelectedRoute(

                        aiRoute.routeNumber

                    );

                    polylines.current.forEach((line,i)=>{

                        line.setStyle({

                            opacity:

                                i===index?1:0.25,

                            weight:

                                i===index?9:5

                        });

                    });

                });

            });

        }

        function clearRoutes(){

            polylines.current.forEach(line=>{

                map.removeLayer(line);

            });

            polylines.current=[];

        }

        return()=>{

            clearRoutes();

        };

    },[source,destination]);

    return null;

}