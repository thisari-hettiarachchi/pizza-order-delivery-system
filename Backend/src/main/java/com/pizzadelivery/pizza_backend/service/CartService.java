package com.pizzadelivery.pizza_backend.service;

import com.pizzadelivery.pizza_backend.model.Cart;
import com.pizzadelivery.pizza_backend.model.Item;
import com.pizzadelivery.pizza_backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Add an item to the cart
    public Cart addToCart(String userName, Item newItem) {
        // Retrieve the cart for the given user
        Optional<Cart> existingCartOptional = cartRepository.findByUserName(userName);

        Cart cart;
        if (existingCartOptional.isPresent()) {
            // If cart exists, update or add the item
            cart = existingCartOptional.get();
            boolean itemExists = false;

            // Check if the item already exists in the cart
            for (Item item : cart.getItems()) {
                if (item.getItemId().equals(newItem.getItemId()) && item.getSize().equals(newItem.getSize())) {
                    // Update the quantity if the item exists
                    int updatedQuantity = Integer.parseInt(item.getQuantity()) + Integer.parseInt(newItem.getQuantity());
                    item.setQuantity(String.valueOf(updatedQuantity));
                    itemExists = true;
                    break;
                }
            }

            // Add the item if it doesn't exist
            if (!itemExists) {
                cart.getItems().add(newItem);
            }
        } else {
            // Create a new cart if none exists for the user
            cart = new Cart();
            cart.setUserName(userName);
            cart.getItems().add(newItem);
        }

        // Save and return the updated cart
        return cartRepository.save(cart);
    }

    // Get cart by userName
    public Cart getCartByUserName(String userName) {
        // Fetch the cart for the given user or create a new one if not found
        return cartRepository.findByUserName(userName).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUserName(userName);
            newCart.setItems(new ArrayList<>()); // Initialize an empty list for items
            return newCart;
        });
    }


    // Update an item in the cart
    public Cart updateCart(String userName, Item updatedItem) {
        // Retrieve the cart for the given user
        Optional<Cart> existingCartOptional = cartRepository.findByUserName(userName);

        if (existingCartOptional.isPresent()) {
            Cart cart = existingCartOptional.get();

            // Update the specific item's details
            for (Item item : cart.getItems()) {
                if (item.getItemId().equals(updatedItem.getItemId()) && item.getSize().equals(updatedItem.getSize())) {
                    item.setQuantity(updatedItem.getQuantity());
                    item.setPrice(updatedItem.getPrice());
                    item.setItemName(updatedItem.getItemName());
                    break;
                }
            }

            // Save and return the updated cart
            return cartRepository.save(cart);
        }

        // If no cart exists for the user, return a new cart
        Cart newCart = new Cart();
        newCart.setUserName(userName);
        return cartRepository.save(newCart);
    }

    // Remove an item from the cart
    public void deleteItemFromCart(String userName, String itemId, String size) {
        try {
            // Find the cart and the item to be removed
            Cart cart = cartRepository.findByUserName(userName).orElseThrow(() -> new RuntimeException("Cart not found"));

            // Remove the item from the cart's items list
            List<Item> updatedItems = cart.getItems().stream()
                    .filter(item -> !(item.getItemId().equals(itemId) && item.getSize().equals(size)))
                    .collect(Collectors.toList());

            // Update the cart with the new list of items
            cart.setItems(updatedItems);
            cartRepository.save(cart);  // Save the updated cart
        } catch (Exception e) {
            throw new RuntimeException("Error deleting item from cart", e);
        }
    }

    public void deleteCart(String username) {
        cartRepository.deleteByUserName(username);
    }

}
