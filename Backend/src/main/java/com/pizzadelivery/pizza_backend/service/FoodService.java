package com.pizzadelivery.pizza_backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pizzadelivery.pizza_backend.model.Food;
import com.pizzadelivery.pizza_backend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    private final String uploadDir = System.getProperty("user.dir") + "/src/main/resources/uploads/Food images/";

    // Convert food JSON string to Food object
    public Food convertJsonToFood(String foodJson) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(foodJson, Food.class);
    }

    // Save image and return the image name (not full path)
    public String saveImage(MultipartFile image) throws IOException {
        // Create the upload directory if it doesn't exist
        Files.createDirectories(Paths.get(uploadDir));

        // Save the image file with its original name
        String imageName = image.getOriginalFilename();
        image.transferTo(Paths.get(uploadDir + imageName).toFile());

        return imageName;  // Only return the image name
    }

    // Save food details along with the image name
    public Food uploadFoodDetails(Food food, MultipartFile image) throws IOException {
        String imageName = saveImage(image);
        food.setImage(imageName);  // Set only the image name in the Food object
        return foodRepository.save(food);
    }

    // Fetch all food items from the database
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // Update Food Item with optional image
    public Optional<Food> updateFood(String id, Food newFoodData, MultipartFile image) throws IOException {
        return foodRepository.findById(id).map(existingFood -> {
            // Update fields from newFoodData
            existingFood.setName(newFoodData.getName());
            existingFood.setPrice(newFoodData.getPrice());
            existingFood.setDescription(newFoodData.getDescription());

            try {
                // If an image is provided, save it and update the image field
                if (image != null && !image.isEmpty()) {
                    String imageName = saveImage(image); // Reuse saveImage method
                    existingFood.setImage(imageName); // Update only the image name
                }
            } catch (IOException e) {
                e.printStackTrace(); // Log the error
                throw new RuntimeException("Failed to save the image: " + e.getMessage());
            }

            // Save the updated food item
            return foodRepository.save(existingFood);
        });
    }


    // Delete Food Item
    public boolean deleteFood(String id) {
        if (foodRepository.existsById(id)) {
            foodRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
