package com.herguardian.Backend.service;

import org.springframework.stereotype.Service;

@Service
public class RecommendationService {


    public String getRecommendation(

            double safetyScore,

            double crimeScore,

            double timeScore

    ){





        if(

                safetyScore>=85

                        &&

                        crimeScore>=80

                        &&

                        timeScore>=80

        ){

            return "Safe throughout the day.";

        }


        if(

                safetyScore>=70

                        &&

                        timeScore>=70

        ){

            return "Morning and evening are recommended.";

        }


        if(

                safetyScore>=60

        ){

            return "Prefer travelling between 6 AM and 8 PM.";

        }


        return "Daytime travel is recommended.";

    }



    public String getStatus(double score){


        if(score>=85){

            return "VERY SAFE";

        }


        if(score>=70){

            return "SAFE";

        }


        if(score>=50){

            return "CAUTION";

        }


        return "UNSAFE";


    }



    public String getBestTime(double score){


        if(score>=85){

            return "Safe to travel at any time";

        }


        if(score>=70){

            return "Try to avoid late nights";

        }


        return "DAY TIME ONLY";


    }


}