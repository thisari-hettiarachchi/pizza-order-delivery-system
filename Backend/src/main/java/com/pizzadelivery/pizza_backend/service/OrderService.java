package com.pizzadelivery.pizza_backend.service;

import com.pizzadelivery.pizza_backend.model.Order;
import com.pizzadelivery.pizza_backend.model.Order.OrderStatus;
import com.pizzadelivery.pizza_backend.repository.OrderRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.logging.Logger;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private static final Logger logger = Logger.getLogger(OrderService.class.getName());

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public String createStripeSession(Order order) {
        try {
            Stripe.apiKey = stripeSecretKey;

            List<SessionCreateParams.LineItem> lineItems = order.getItems().stream().map(item -> {
                // Ensure the item quantity is parsed as a long correctly
                long quantity = Long.parseLong(item.getQuantity()); // Assuming it's a long or integer

                // Calculate unit price based on the item's price
                long unitAmount = (long) (Double.parseDouble(item.getPrice()) * 100); // Convert to cents

                return SessionCreateParams.LineItem.builder()
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("lkr")
                                .setUnitAmount(unitAmount)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName(item.getItemName())
                                        .build())
                                .build())
                        .setQuantity(quantity) // Set item quantity
                        .build();
            }).collect(Collectors.toList());

            // Create session with 'mode' parameter for payment
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)  // Specify the mode (payment)
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .addAllLineItem(lineItems)
                    .setSuccessUrl("http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl("http://localhost:5173/cancel")
                    .build();

            Session session = Session.create(params);

            // Save order only if session is successfully created
            orderRepository.save(order);

            return session.getUrl();

        } catch (StripeException e) {
            logger.severe("StripeException: " + e.getMessage());
            e.printStackTrace();
            return "Error: " + e.getMessage(); // Return an error message to the frontend
        } catch (Exception e) {
            logger.severe("Exception: " + e.getMessage());
            e.printStackTrace();
            return "Error: " + e.getMessage(); // Return an error message to the frontend
        }
    }


    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(String id) {
        return orderRepository.findById(id).orElse(null);
    }

    public boolean updateOrderStatus(String id, OrderStatus newStatus) {
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus(newStatus);
            orderRepository.save(order);
            return true;
        }
        return false;
    }

    public boolean deleteOrder(String id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}