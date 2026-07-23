import { useState } from "react";
import axios from "axios";
import Button from "../Button";
import Card from "../Card";

export default function ReportForm() {

    const apiKey =
        import.meta.env.VITE_MAPTILER_KEY;

    const [category, setCategory] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [location, setLocation] =
        useState("");

    const [latitude, setLatitude] =
        useState(null);

    const [longitude, setLongitude] =
        useState(null);

    const [searchLocation,setSearchLocation]=
useState("");

const [results,setResults]=
useState([]);
    const categories = [

        "Poor Lighting",
        "No CCTV",
        "Harassment",
        "Unsafe Transport",
        "Stalking",
        "Suspicious Activity",
        "Unsafe Area",
        "Others"

    ];


    async function getCurrentLocation() {

        if (!navigator.geolocation) {

            alert(
                "Geolocation is not supported."
            );

            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const lat =
                    position.coords.latitude;

                const lng =
                    position.coords.longitude;


                setLatitude(lat);
                setLongitude(lng);


                try {

                    const response =

                        await fetch(

                            `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${apiKey}`

                        );


                    const data =
                        await response.json();


                    if (data.features.length > 0) {

                        setLocation(

                            data.features[0]
                                .place_name

                        );

                    }

                }

                catch (error) {

                    console.log(error);

                    alert(
                        "Unable to fetch location."
                    );

                }

            },

            (error) => {

                console.log(error);

                alert(
                    "Location permission denied."
                );

            },

            {

                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0

            }

        );

    }

    async function searchPlaces(){


if(searchLocation===""){

return;

}


const response=

await fetch(

`https://api.maptiler.com/geocoding/${searchLocation}.json?key=${apiKey}`

);


const data=

await response.json();


setResults(

data.features

);


}

    async function submitReport() {

        if (

            category === "" ||

            description === "" ||

            location === ""

        ) {

            alert(

                "Please fill all the fields."

            );

            return;

        }


        try {

            await axios.post(

                "http://localhost:8080/api/reports",

                {

                    category,
                    description,
                    location,
                    latitude,
                    longitude

                }

            );


            alert(

                "Report Submitted Successfully."

            );


            setCategory("");
            setDescription("");
            setLocation("");

            setLatitude(null);
            setLongitude(null);


            window.dispatchEvent(

new Event("reportSubmitted")

);


        }

        catch (error) {

            console.log(error);

            alert(

                "Unable to submit report."

            );

        }


    }
    

    return (

        <Card>
            
            <input

type="text"

placeholder="Search Location"

value={searchLocation}

onChange={(e)=>{

setSearchLocation(

e.target.value

);

}}

className="mb-4
w-full
rounded-xl
border
p-4"

/>


<Button

onClick={searchPlaces}

className="mb-5
w-full"

>

SEARCH LOCATION

</Button>

{

results.map((place)=>(


<div

key={place.id}

onClick={()=>{


setLocation(

place.place_name

);


setLatitude(

place.center[1]

);


setLongitude(

place.center[0]

);


setResults([]);


}}


className="mb-2
cursor-pointer
rounded-xl
border
p-3
hover:bg-purple-100"

>


{place.place_name}


</div>


))


}
            <Button

                onClick={getCurrentLocation}

                className="mb-5 w-full"

            >

                USE MY CURRENT LOCATION

            </Button>



            {

                location && (

                    <div

                        className="mb-5 rounded-xl bg-purple-50 p-4"

                    >

                        <h3

                            className="font-bold text-purple-700"

                        >

                            Current Location

                        </h3>

                        <p>

                            {location}

                        </p>

                    </div>

                )

            }



            <h3

                className="mb-3 font-semibold"

            >

                Select Category

            </h3>



            <div

                className="mb-5 grid gap-3 sm:grid-cols-2"

            >

                {

                    categories.map((item) => (

                        <button

                            key={item}

                            onClick={() => {

                                setCategory(item);

                            }}

                            className={`

                            rounded-xl
                            border
                            p-3
                            font-semibold
                            transition-all

                            ${

                                category === item

                                    ?

                                    "bg-purple-700 text-white"

                                    :

                                    "bg-white hover:bg-purple-100"

                                }

                            `}

                        >

                            {item}

                        </button>

                    ))

                }

            </div>



            <textarea

                rows="6"

                value={description}

                placeholder="Describe the issue here..."

                onChange={(e) => {

                    setDescription(

                        e.target.value

                    );

                }}

                className="w-full rounded-xl border p-4"

            />



            <Button

                onClick={submitReport}

                className="mt-5 w-full"

            >

                SUBMIT REPORT

            </Button>


        </Card>

    );

}