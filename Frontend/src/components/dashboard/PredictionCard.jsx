import Card from "../Card";

export default function PredictionCard({

    predictions

}){

    return(

        <Card
        className="space-y-4"
        >

            <h1
            className="text-2xl
            font-bold
            text-purple-700"
            >

                AI Safety Predictions

            </h1>


            {

                predictions.map((item,index)=>(

                    <div

                    key={index}

                    className="rounded-xl
                    border-l-4
                    border-purple-600
                    bg-purple-50
                    p-4"

                    >

                        <p
                        className="font-semibold"
                        >

                            {item}

                        </p>

                    </div>

                ))

            }

        </Card>

    );

}