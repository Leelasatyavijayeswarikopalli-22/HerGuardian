package com.herguardian.Backend.service;

import org.springframework.stereotype.Service;

@Service
public class RecommendationService {


    public String getRecommendation(

            double score,

            String time

    ){

        if(score>=85){

            return "SAFE TO TRAVEL";

        }


        if(score>=70){

            return "TRAVEL WITH CAUTION";

        }


        if(score>=50){

            return "AVOID ISOLATED ROUTES";

        }


        return "TRAVEL NOT RECOMMENDED";


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

            return "6 PM - 9 PM";

        }


        if(score>=70){

            return "6 PM - 8 PM";

        }


        return "DAY TIME ONLY";


    }


}