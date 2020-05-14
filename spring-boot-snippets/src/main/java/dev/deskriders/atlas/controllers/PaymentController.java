package dev.deskriders.atlas.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    @GetMapping("/greetings")
    public String say() {
        return "Hello World";
    }
}
