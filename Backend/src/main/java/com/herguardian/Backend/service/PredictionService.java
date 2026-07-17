package com.herguardian.Backend.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PredictionService {


    public List<Double> predict(double currentScore){

        List<Double> prediction =
                new ArrayList<>();


        prediction.add(currentScore);

        prediction.add(Math.max(
                currentScore-4,
                0
        ));

        prediction.add(Math.max(
                currentScore-8,
                0
        ));

        prediction.add(Math.max(
                currentScore-15,
                0
        ));

        prediction.add(Math.max(
                currentScore-25,
                0
        ));


        return prediction;

    }


}