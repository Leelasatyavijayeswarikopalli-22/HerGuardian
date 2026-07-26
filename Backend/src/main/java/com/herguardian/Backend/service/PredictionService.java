package com.herguardian.Backend.service;

import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PredictionService {


    public List<Double> predict(

            double crime,
            double lighting,
            double police,
            double cctv,
            double road,
            double time

    ){


        List<Double> predictions =
                new ArrayList<>();


        LocalTime now = LocalTime.now();

        predictions.add(

                calculateScore(

                        crime,
                        lighting,
                        police,
                        cctv,
                        road,
                        time

                )

        );


        predictions.add(

                predictFuture(

                        crime,
                        lighting,
                        police,
                        cctv,
                        road,
                        time,

                        now.plusHours(1)

                )

        );


        predictions.add(

                predictFuture(

                        crime,
                        lighting,
                        police,
                        cctv,
                        road,
                        time,

                        now.plusHours(3)

                )

        );


        predictions.add(

                predictFuture(

                        crime,
                        lighting,
                        police,
                        cctv,
                        road,
                        time,

                        now.plusHours(6)

                )

        );


        predictions.add(

                predictFuture(

                        crime,
                        lighting,
                        police,
                        cctv,
                        road,
                        time,

                        now.plusHours(12)

                )

        );


        return predictions;


    }



    private double predictFuture(

            double crime,
            double lighting,
            double police,
            double cctv,
            double road,
            double time,

            LocalTime futureTime

    ){


        int hour = futureTime.getHour();


        double predictedCrime = crime;
        double predictedLighting = lighting;
        double predictedPolice = police;
        double predictedCCTV = cctv;
        double predictedRoad = road;
        double predictedTime = time;



        // NIGHT TIME

        if(hour>=22 || hour<=5){

            predictedCrime -=5;

            predictedLighting -=10;

            predictedTime -=15;

        }


        // EVENING

        else if(hour>=18){


            predictedLighting -=3;

            predictedTime -=5;

        }


        // EARLY MORNING

        else if(hour<=6){


            predictedTime -=5;

        }


        // DAY TIME

        else{

            predictedTime +=2;

            predictedLighting +=2;

        }



        predictedCrime =
                clamp(predictedCrime);

        predictedLighting =
                clamp(predictedLighting);

        predictedPolice =
                clamp(predictedPolice);

        predictedCCTV =
                clamp(predictedCCTV);

        predictedRoad =
                clamp(predictedRoad);

        predictedTime =
                clamp(predictedTime);



        return calculateScore(

                predictedCrime,
                predictedLighting,
                predictedPolice,
                predictedCCTV,
                predictedRoad,
                predictedTime

        );


    }



    private double calculateScore(

            double crime,
            double lighting,
            double police,
            double cctv,
            double road,
            double time

    ){


        return

                crime*0.30 +

                        lighting*0.15 +

                        police*0.20 +

                        cctv*0.20 +

                        road*0.10 +

                        time*0.05;


    }



    private double clamp(double value){

        if(value<0)
            return 0;

        if(value>100)
            return 100;

        return value;

    }


}