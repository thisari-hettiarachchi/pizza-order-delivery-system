package com.pizzadelivery.pizza_backend;

import com.pizzadelivery.pizza_backend.config.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@SpringBootTest
@Import(SecurityConfig.class)  // Import the security config if needed in tests
public class PizzaDeliveryBackendApplicationTests {

	@Test
	void contextLoads() {
		// Test to verify the application context loads correctly
	}
}
