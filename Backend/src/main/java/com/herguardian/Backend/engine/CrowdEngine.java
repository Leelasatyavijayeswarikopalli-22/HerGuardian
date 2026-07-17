package com.herguardian.Backend.engine;

import org.springframework.stereotype.Component;

@Component
public class CrowdEngine {


    public double calculateCrowdScore(

            double peoplePerSquareMeter

    ){

        //very isolated place

        if(peoplePerSquareMeter==0){

            return 40;

        }

        //ideal crowd

        if(peoplePerSquareMeter<=2){

            return 100;

        }

        //moderate crowd

        if(peoplePerSquareMeter<=4){

            return 85;

        }

        //high crowd

        if(peoplePerSquareMeter<=6){

            return 70;

        }

        //packed

        return 55;

    }


}