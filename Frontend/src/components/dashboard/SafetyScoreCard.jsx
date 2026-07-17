import Card from "../Card";

export default function SafetyScoreCard({

    score,

    status,

    recommendation

}){


    return(

        <Card
        className="space-y-5"
        >


            <div
            className="flex
            justify-between
            items-center"
            >

                <h1
                className="text-3xl
                font-bold"
                >

                    Your Safety Status

                </h1>


                <div
                className="rounded-full
                bg-green-100
                px-5
                py-2"

                >

                    {status}

                </div>


            </div>


            <h1

            className="text-7xl
            font-bold
            bg-gradient-to-r
            from-pink-500
            via-purple-600
            to-blue-600
            text-transparent
            bg-clip-text"

            >

                {Math.round(score)}

            </h1>


            <div
            className="h-4
            rounded-full
            overflow-hidden
            bg-slate-200"
            >

                <div

                style={{

                    width:`${score}%`

                }}

                className="h-full
                rounded-full
                bg-gradient-to-r
                from-pink-500
                via-purple-600
                to-blue-600"

                />

            </div>


            <div
            className="rounded-xl
            bg-purple-50
            p-5"
            >

                <h2
                className="font-bold
                text-xl"
                >

                    AI Recommendation

                </h2>


                <p
                className="mt-2"
                >

                    {recommendation}

                </p>

            </div>


        </Card>

    );

}