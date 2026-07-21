export default function RouteCards({

    routeResults,
    selectedRoute,
    setSelectedRoute,
    startJourney,
    journeyStarted

}) {

    if (routeResults.length === 0)
        return null;


    return (

        <div className="mt-5 space-y-6">

            {

                routeResults.map((route) => (

                    <div

                        key={route.routeNumber}

                        onClick={() => {

                            setSelectedRoute(
                                route.routeNumber
                            );

                        }}

                        className={`

                        cursor-pointer
                        rounded-3xl
                        border-2
                        p-6
                        shadow-xl
                        transition-all
                        duration-300
                        hover:scale-[1.01]

                        ${

                            selectedRoute === route.routeNumber

                                ?

                                "border-emerald-500 bg-gradient-to-br from-emerald-50 to-cyan-50"

                                :

                                "bg-white"

                            }

                        `}

                    >

                        {/* HEADER */}


                        <div className="flex items-center justify-between">


                            <div>

                                <h1
                                className="text-2xl font-bold text-slate-800"
                                >

                                    Route {route.routeNumber}

                                </h1>


                                <p
                                className="text-sm text-gray-600"
                                >

                                    Overall Safety Score

                                </p>

                            </div>


                            <div
                            className="rounded-2xl bg-emerald-600 px-5 py-4 text-white shadow-lg"
                            >

                                <h1
                                className="text-3xl font-bold"
                                >

                                    {route.totalSafetyScore.toFixed(1)}

                                </h1>

                            </div>


                        </div>



                        {/* DISTANCE */}


                        <div
                        className="mt-5 grid grid-cols-2 gap-4"
                        >


                            <div
                            className="rounded-2xl bg-blue-50 p-4"
                            >

                                <h3
                                className="font-bold text-blue-700"
                                >
                                    Distance
                                </h3>

                                <p
                                className="text-lg font-semibold text-slate-800"
                                >

                                    {(route.distance/1000).toFixed(2)} km

                                </p>

                            </div>


                            <div
                            className="rounded-2xl bg-purple-50 p-4"
                            >

                                <h3
                                className="font-bold text-purple-700"
                                >
                                    Time
                                </h3>

                                <p
                                className="text-lg font-semibold text-slate-800"
                                >

                                    {Math.round(route.duration/60)} mins

                                </p>

                            </div>


                        </div>



                        {/* SCORES */}


                        <div
                        className="mt-5 grid grid-cols-2 gap-4 text-sm"
                        >


                            <div>Crime : <b>{route.crimeScore.toFixed(1)}</b></div>

                            <div>Crowd : <b>{route.crowdScore.toFixed(1)}</b></div>

                            <div>Lighting : <b>{route.lightingScore.toFixed(1)}</b></div>

                            <div>Police : <b>{route.policeScore.toFixed(1)}</b></div>

                            <div>Surveillance : <b>{route.cctvScore.toFixed(1)}</b></div>

                            <div>Road : <b>{route.roadScore.toFixed(1)}</b></div>

                            <div>Time : <b>{route.timeScore.toFixed(1)}</b></div>


                        </div>



                        {/* BADGES */}



                        <div
                        className="mt-6 flex flex-wrap gap-3"
                        >


                            {

                                route.safest &&(

                                    <span

                                    className="rounded-full bg-emerald-600 px-4 py-2 font-semibold text-white shadow"

                                    >

                                        🛡 SAFEST ROUTE

                                    </span>

                                )

                            }



                            {

                                route.fastest &&(

                                    <span

                                    className="rounded-full bg-blue-600 px-4 py-2 font-semibold text-white shadow"

                                    >

                                        ⚡ FASTEST ROUTE

                                    </span>

                                )

                            }



                            {

                                journeyStarted

                                &&

                                selectedRoute===route.routeNumber

                                &&(

                                    <span

                                    className="animate-pulse rounded-full bg-red-600 px-4 py-2 font-bold text-white shadow-lg"

                                    >

                                        🎙 LIVE SAFETY TRACKING

                                    </span>

                                )

                            }



                        </div>



                        {/* GUARDIAN MODE */}



                        {

                            selectedRoute===route.routeNumber

                            &&

                            journeyStarted

                            &&(


                                <div

                                className="mt-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-cyan-600 p-6 text-white shadow-2xl"

                                >


                                    <h1
                                    className="mb-4 text-2xl font-bold"
                                    >

                                        SAFE JOURNEY MODE ACTIVE

                                    </h1>


                                    <div
                                    className="space-y-3 text-lg"
                                    >

                                        <p>
                                            📍 Live Location Tracking Enabled
                                        </p>

                                        <p>
                                            🎙 Secret Voice SOS Enabled
                                        </p>

                                        <p>
                                            🚨 Emergency Monitoring Enabled
                                        </p>

                                        <p>
                                            🤖 AI Risk Detection Enabled
                                        </p>

                                        <p>
                                            🛡 Route Safety Monitoring Enabled
                                        </p>

                                        <p>
                                            👨‍👩‍👧 Emergency Contacts Ready
                                        </p>

                                        <p>
                                            📢 Microphone Active Until Destination
                                        </p>

                                    </div>



                                    <div
                                    className="mt-5 rounded-2xl bg-white/20 p-4"
                                    >

                                        <h3
                                        className="font-bold text-xl"
                                        >

                                            CURRENT STATUS

                                        </h3>

                                        <br/>

                                        <p>
                                            Risk Level : LOW
                                        </p>

                                        <p>
                                            Safety Monitoring : ACTIVE
                                        </p>

                                        <p>
                                            Location Sharing : ACTIVE
                                        </p>

                                    </div>



                                </div>

                            )

                        }




                        {/* BUTTON */}



                        {

                            selectedRoute===route.routeNumber

                            &&(

                                <button

                                onClick={(e)=>{

                                    e.stopPropagation();

                                    startJourney(route);

                                }}

                                className="mt-6 w-full rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 py-4 text-xl font-bold text-white shadow-xl transition-all duration-300 hover:scale-105"

                                >

                                    {

                                        journeyStarted

                                        ?

                                        "SAFE JOURNEY ACTIVE"

                                        :

                                        "START SAFE JOURNEY"

                                    }

                                </button>

                            )

                        }


                    </div>

                ))

            }


        </div>

    );

}