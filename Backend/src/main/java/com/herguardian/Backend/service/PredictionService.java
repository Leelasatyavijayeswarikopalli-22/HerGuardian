package com.herguardian.Backend.service;

import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PredictionService {


    public List<Double> predict(

            double crime,
            double crowd,
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
                        crowd,
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
                        crowd,
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
                        crowd,
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
                        crowd,
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
                        crowd,
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
            double crowd,
            double lighting,
            double police,
            double cctv,
            double road,
            double time,

            LocalTime futureTime

    ){


        int hour = futureTime.getHour();


        double predictedCrime = crime;
        double predictedCrowd = crowd;
        double predictedLighting = lighting;
        double predictedPolice = police;
        double predictedCCTV = cctv;
        double predictedRoad = road;
        double predictedTime = time;



        // NIGHT TIME

        if(hour>=22 || hour<=5){

            predictedCrime -=5;

            predictedCrowd -=15;

            predictedLighting -=10;

            predictedTime -=15;

        }


        // EVENING

        else if(hour>=18){

            predictedCrowd -=5;

            predictedLighting -=3;

            predictedTime -=5;

        }


        // EARLY MORNING

        else if(hour<=6){

            predictedCrowd -=10;

            predictedTime -=5;

        }


        // DAY TIME

        else{

            predictedTime +=2;

            predictedLighting +=2;

        }



        predictedCrime =
                clamp(predictedCrime);

        predictedCrowd =
                clamp(predictedCrowd);

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
                predictedCrowd,
                predictedLighting,
                predictedPolice,
                predictedCCTV,
                predictedRoad,
                predictedTime

        );


    }



    private double calculateScore(

            double crime,
            double crowd,
            double lighting,
            double police,
            double cctv,
            double road,
            double time

    ){


        return

                crime*0.25 +

                        crowd*0.15 +

                        lighting*0.15 +

                        police*0.15 +

                        cctv*0.15 +

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