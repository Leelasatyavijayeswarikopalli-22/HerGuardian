import Card from "../Card";

export default function PredictionCard({

    predictions

}){


   const timings=[

"NOW",
"NEXT 1 HOUR",
"NEXT 3 HOURS",
"NEXT 6 HOURS",
"NEXT 12 HOURS"

];


    function getStatus(score){

        if(score>=90){

            return{

                text:"VERY SAFE",
                color:"text-green-600",
                advice:"Safe To Travel"

            };

        }


        if(score>=75){

            return{

                text:"SAFE",
                color:"text-blue-600",
                advice:"Prefer Main Roads"

            };

        }


        if(score>=60){

            return{

                text:"MODERATE",
                color:"text-yellow-600",
                advice:"Avoid Isolated Areas"

            };

        }


        return{

            text:"UNSAFE",
            color:"text-red-600",
            advice:"Avoid Solo Travel"

        };

    }



    return(

        <Card

        className="space-y-5
        shadow-xl
        rounded-3xl"

        >

            <h1

            className="text-3xl
            font-bold
            bg-gradient-to-r
            from-pink-500
            via-purple-600
            to-blue-600
            text-transparent
            bg-clip-text"

            >

                AI Safety Predictions

            </h1>



            {

                predictions.map((score,index)=>{


                    const status=

                    getStatus(

                        Math.round(score)

                    );


                    return(


                        <div

                        key={index}

                        className=" rounded-2xl
  bg-white
  border
  border-purple-200
  border-l-[6px]
  border-l-purple-600
  shadow-md
  p-5
  hover:shadow-xl
  transition-all
  duration-300"

                        >


                            <h3

                            className="font-bold
text-sm
tracking-wide
text-gray-700"

                            >

                                {

                                    timings[index]

                                }

                            </h3>



                            <div

                            className="mt-2
                            flex
                            items-center
                            justify-between"

                            >


                                <h1

                                className="text-5xl
font-extrabold
text-purple-700"

                                >

                                    {

                                        Math.round(score)

                                    }

                                </h1>



                                <div>


                                    <h2

                                    className={`

                                    text-xl
                                    font-bold

                                    ${status.color}

                                    `}

                                    >

                                        {

                                            status.text

                                        }

                                    </h2>


                                    <p

                                    className="text-sm
                    font-medium
text-gray-700"

                                    >

                                        {

                                            status.advice

                                        }

                                    </p>


                                </div>


                            </div>


                        </div>

                    );


                })

            }


        </Card>

    );


}