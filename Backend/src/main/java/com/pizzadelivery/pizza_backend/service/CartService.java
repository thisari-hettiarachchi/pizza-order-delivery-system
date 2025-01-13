package com.pizzadelivery.pizza_backend.service;

import com.pizzadelivery.pizza_backend.model.Cart;
import com.pizzadelivery.pizza_backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Add item to cart
    public Cart addToCart(Cart cartItem) {
        // Check if the cart item with the same userId, itemId, and size already exists
        Optional<Cart> existingCartItem = cartRepository.findByUserNameAndItemIdAndSize(
                cartItem.getUserName(), cartItem.getItemId(), cartItem.getSize());

        if (existingCartItem.isPresent()) {
            // Update the quantity if the item already exists in the cart
            Cart existingItem = existingCartItem.get();
            int updatedQuantity = Integer.parseInt(existingItem.getQuantity()) + Integer.parseInt(cartItem.getQuantity());
            existingItem.setQuantity(String.valueOf(updatedQuantity));
            return cartRepository.save(existingItem);
        } else {
            // If item does not exist, add it to the cart
            return cartRepository.save(cartItem);
        }
    }

    // Get cart by userId (you can adjust this logic as per your requirement)

    public List<Cart> getCartByUserName(String userName) {
        // Get the list of carts from the repository, ensuring it's not wrapped in Optional
        return cartRepository.findByUserName(userName).orElse(Collections.emptyList());
    }



    public Optional<Cart> getCartByUserNameAndItemIdAndSize(String userName, String itemId, String size) {
        return cartRepository.findByUserNameAndItemIdAndSize(userName, itemId, size);
    }




    // Update cart (in case of updating quantity, size, or price)
    public Cart updateCart(Cart cart) {
        return cartRepository.save(cart);
    }

    // Remove item from cart
    public void removeItemFromCart(String cartId) {
        cartRepository.deleteById(cartId);
    }
}
