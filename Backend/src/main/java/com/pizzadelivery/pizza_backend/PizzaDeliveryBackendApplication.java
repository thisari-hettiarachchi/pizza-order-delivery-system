package com.pizzadelivery.pizza_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class PizzaDeliveryBackendApplication {

	public static void main(String[] args) {
		try {
			Dotenv dotenv = Dotenv.configure().filename(".env").load();
			System.setProperty("STRIPE_SECRET_KEY", dotenv.get("STRIPE_SECRET_KEY"));
			System.setProperty("MONGODB_URI", dotenv.get("MONGODB_URI"));
		} catch (Exception e) {
			System.out.println("Warning: .env file not loaded");
		}

		SpringApplication.run(PizzaDeliveryBackendApplication.class, args);
	}

}
