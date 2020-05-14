package dev.deskriders.atlas;

import dev.deskriders.atlas.model.Payment;
import org.jeasy.random.EasyRandom;
import org.jeasy.random.EasyRandomParameters;
import org.junit.jupiter.api.Test;

import java.util.Random;

public class EasyRandomShould {

    private final EasyRandom easyRandom = new EasyRandom(new EasyRandomParameters().seed(new Random().nextLong()));

    @Test
    void generateRandomValues() {
        // WHEN
        Payment payment = easyRandom.nextObject(Payment.class);

        // THEN
        System.out.println(payment);
    }
}
