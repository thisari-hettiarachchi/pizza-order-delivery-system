package com.pizzadelivery.pizza_backend.testapi;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TESTAPI {

    @GetMapping("/greeting")
    public String greeting() {
        return "Hello from TESTAPI!";
    }
    // POST endpoint that accepts a message in the body
    @PostMapping("/echo")
    public String echo(@RequestBody String message) {
        return "You said: " + message;
    }
}
