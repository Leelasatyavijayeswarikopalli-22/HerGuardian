import Card from "../Card";
import { useNavigate } from "react-router-dom";

export default function EmergencyCard({

    police,

    hospital

}){


    const navigate = useNavigate();

    return(

        <Card
        className="space-y-5"
        >

            <h1
            className="text-2xl
            font-bold
            text-blue-700"
            >

                Emergency Support

            </h1>


            <div
            className="grid
            gap-4
            md:grid-cols-2"
            >


                <div
                className="rounded-xl
                bg-pink-50
                p-5"
                >

                    <h2
                    className="font-bold"
                    >

                        Nearest Police

                    </h2>

                    <h1
                    className="mt-3
                    text-3xl
                    font-bold"
                    >

                        {police} KM

                    </h1>

                </div>

            </div>



            <div
            className="grid
            gap-4
            md:grid-cols-3"
            >


                <button
                 onClick={() => navigate("/safety-map")}
                className="rounded-xl
                bg-purple-700
                p-3
                font-semibold
                text-white
                hover:bg-purple-800"

                >

                    Start Safe Journey

                </button>



                <button

                className="rounded-xl
                bg-blue-700
                p-3
                font-semibold
                text-white"

                >

                    Share Location

                </button>



                <button

                className="rounded-xl
                bg-red-600
                p-3
                font-semibold
                text-white"

                >

                    Activate SOS

                </button>


            </div>


        </Card>

    );

}