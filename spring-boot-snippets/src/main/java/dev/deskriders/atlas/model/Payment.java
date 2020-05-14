package dev.deskriders.atlas.model;

import lombok.ToString;

import javax.validation.constraints.Past;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@ToString
public class Payment {
    String method;
    String code;

    @Past
    LocalDateTime dateTime;

    @Positive
    float amount;
}
