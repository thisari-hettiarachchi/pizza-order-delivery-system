package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.model.Cart;
import com.pizzadelivery.pizza_backend.model.Item;
import com.pizzadelivery.pizza_backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Add an item to the cart
    @PostMapping("/addtocart/{userName}")
    public ResponseEntity<Cart> addToCart(@PathVariable String userName, @RequestBody Item cartItem) {
        try {
            Cart updatedCart = cartService.addToCart(userName, cartItem);
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception stack trace
            return ResponseEntity.badRequest().build();
        }
    }



    // Get cart by userName
    @GetMapping("/getcart/{userName}")
    public ResponseEntity<Object> getCart(@PathVariable String userName) {
        Cart cart = cartService.getCartByUserName(userName);

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            // If the cart has no items, return a custom message
            return ResponseEntity.status(404).body("No cart found for username: " + userName);
        }

        // If the cart has items, return the cart as normal
        return ResponseEntity.ok(cart);
    }


    // Update an item in the cart
    @PutMapping("/updatecart/{userName}")
    public ResponseEntity<Cart> updateCart(@PathVariable String userName, @RequestBody Item cartItem) {
        Cart updatedCart = cartService.updateCart(userName, cartItem);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/deletecart/{userName}/{itemId}/{size}")
    public ResponseEntity<String> deleteItemFromCart(@PathVariable String userName, @PathVariable String itemId, @PathVariable String size) {
        try {
            cartService.deleteItemFromCart(userName, itemId, size);
            return ResponseEntity.ok("Item removed from cart successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error removing item from cart: " + e.getMessage());
        }
    }
    @DeleteMapping("/deletecart/{username}")
    public ResponseEntity<String> deleteCart(@PathVariable String username) {
        try {
            // Attempt to delete the cart for the given username
            cartService.deleteCart(username);

            // Return a success response with status 200 OK
            return ResponseEntity.ok("Cart deleted successfully!");
        } catch (Exception e) {
            // Handle any errors that might occur and return an error response
            return ResponseEntity.status(500).body("Failed to delete cart: " + e.getMessage());
        }
    }


}
