package com.pizzadelivery.pizza_backend.service;

import com.pizzadelivery.pizza_backend.model.Item;
import com.pizzadelivery.pizza_backend.model.Order;
import com.pizzadelivery.pizza_backend.model.Order.OrderStatus;
import com.pizzadelivery.pizza_backend.repository.OrderRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

            // Save order first to generate a valid ID
            order.setPaymentStatus(Order.PaymentStatus.PENDING);
            orderRepository.save(order);

            String orderId = order.getId();
            List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();

            // Add order items
            for (Item item : order.getItems()) {
                try {
                    long quantity = Long.parseLong(item.getQuantity());
                    BigDecimal unitAmount = new BigDecimal(item.getPrice()).multiply(BigDecimal.valueOf(100));

                    if (quantity > 0 && unitAmount.compareTo(BigDecimal.ZERO) > 0) {
                        lineItems.add(SessionCreateParams.LineItem.builder()
                                .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                        .setCurrency("lkr")
                                        .setUnitAmount(unitAmount.longValue())
                                        .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                .setName(item.getItemName())
                                                .build())
                                        .build())
                                .setQuantity(quantity)
                                .build());
                    }
                } catch (NumberFormatException e) {
                    logger.warning("Invalid item quantity or price: " + item.getItemName());
                }
            }

            // Add delivery fee (ensure it's positive)
            if (order.getDeliveryFee() != null && order.getDeliveryFee().compareTo(BigDecimal.ZERO) > 0) {
                lineItems.add(SessionCreateParams.LineItem.builder()
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("lkr")
                                .setUnitAmount(order.getDeliveryFee().multiply(BigDecimal.valueOf(100)).longValue())
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Delivery Fee")
                                        .build())
                                .build())
                                .setQuantity(1L)
                        .build());
            }
            // Add discount as a separate line item if valid
            if (order.getDiscount() != null && !order.getDiscount().isEmpty()) {
                try {
                    BigDecimal discountAmount = new BigDecimal(order.getDiscount());
                    if (discountAmount.compareTo(BigDecimal.ZERO) > 0) {
                        lineItems.add(SessionCreateParams.LineItem.builder()
                                .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                        .setCurrency("lkr")
                                        .setUnitAmount(discountAmount.multiply(BigDecimal.valueOf(100)).longValue())  // Negative charge for discount
                                        .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                .setName("Discount")
                                                .build())
                                        .build())
                                .setQuantity(1L)
                                .build());
                    }
                } catch (NumberFormatException e) {
                    logger.warning("Invalid discount value: " + order.getDiscount());
                }
            }


            // Add discount as a separate metadata (instead of negative charge)


            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .addAllLineItem(lineItems)
                    .setSuccessUrl("http://localhost:5173/verify?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl("http://localhost:5173/cancel")
                    .putMetadata("order_id", orderId)
                    .build();

            Session session = Session.create(params);
            return session.getUrl();

        } catch (StripeException e) {
            logger.severe("StripeException: " + e.getMessage());
            e.printStackTrace();
            return "Error: " + e.getMessage();
        } catch (Exception e) {
            logger.severe("Exception: " + e.getMessage());
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }




    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(String id) {
        return orderRepository.findById(id).orElse(null);
    }

    public void updatePaymentStatus(String id, Order.PaymentStatus newStatus) {
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setPaymentStatus(newStatus);
            orderRepository.save(order);
        }
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