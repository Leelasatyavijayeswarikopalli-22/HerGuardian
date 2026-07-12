export default function RouteCards({

    routeResults,

    selectedRoute,

    setSelectedRoute

}){

    if(routeResults.length===0)
        return null;

    return(

        <div className="mt-5 space-y-4">

            {

                routeResults.map(route=>(

                    <div

                        key={route.routeNumber}

                        onClick={()=>{

                            setSelectedRoute(

                                route.routeNumber

                            );

                        }}

                        className={`

                        cursor-pointer

                        rounded-xl

                        border

                        p-5

                        shadow-md

                        transition-all

                        hover:shadow-lg

                        ${

                        selectedRoute===route.routeNumber

                        ?

                        "border-green-600 bg-green-50"

                        :

                        "bg-white"

                        }

                        `}

                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <h2 className="text-lg font-bold">

                                    Route {route.routeNumber}

                                </h2>

                                <p className="text-sm text-gray-500">

                                    Overall Safety Score

                                </p>

                            </div>

                            <div className="text-3xl font-bold text-green-600">

                                {route.totalSafetyScore.toFixed(1)}

                            </div>

                        </div>
                        <div className="mt-2 text-sm text-gray-600">

    📍 Distance :
    {(route.distance / 1000).toFixed(2)} km

    <br/>

    ⏱ Time :
    {Math.round(route.duration / 60)} mins

</div>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

                            <div>Crime : {route.crimeScore.toFixed(1)}</div>

                            <div>Crowd : {route.crowdScore.toFixed(1)}</div>

                            <div>Lighting : {route.lightingScore.toFixed(1)}</div>

                            <div>CCTV : {route.cctvScore.toFixed(1)}</div>

                            <div>Police : {route.policeScore.toFixed(1)}</div>

                            <div>Road : {route.roadScore.toFixed(1)}</div>

                            <div>Time : {route.timeScore.toFixed(1)}</div>


                        </div>

                        <div className="mt-5 flex gap-3">

                            {

                                route.safest &&(

                                <span

                                    className="rounded-lg bg-green-600 px-3 py-1 text-white"

                                >

                                    🛡 Safest

                                </span>

                            )}

                            {

                                route.fastest &&(

                                <span

                                    className="rounded-lg bg-blue-600 px-3 py-1 text-white"

                                >

                                    ⚡ Fastest

                                </span>

                            )}

                        </div>

                        {

                            selectedRoute===route.routeNumber &&

                            <button

                                className="mt-5 w-full rounded-lg bg-purple-700 py-3 text-white hover:bg-purple-800"

                            >

                                Start Journey

                            </button>

                        }

                    </div>

                ))

            }

        </div>

    );

}