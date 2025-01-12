package com.pizzadelivery.pizza_backend.controller;

import com.pizzadelivery.pizza_backend.model.Food;
import com.pizzadelivery.pizza_backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    // You can use a configurable property for image folder, or set an absolute path
    private final String imageFolder = System.getProperty("user.dir") + "/src/main/resources/uploads/";

    // Post method to upload food details and image
    @PostMapping("/addfood")
    public ResponseEntity<Food> uploadFood(@RequestParam("food") String foodJson,
                                           @RequestParam("image") MultipartFile image) {
        try {
            // Convert JSON string to Food object
            Food food = foodService.convertJsonToFood(foodJson);

            // Save the food details and upload the image
            Food uploadedFood = foodService.uploadFoodDetails(food, image);

            return ResponseEntity.ok(uploadedFood); // Return the saved food details
        } catch (Exception e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(500).body(null); // Return error response
        }
    }

    // Get method to fetch all food items
    @GetMapping("/getfoods")
    public ResponseEntity<List<Food>> getAllFoods() {
        try {
            List<Food> foods = foodService.getAllFoods(); // Fetch all food items
            return ResponseEntity.ok(foods); // Return the list of food items
        } catch (Exception e) {
            e.printStackTrace(); // Log error for debugging
            return ResponseEntity.status(500).body(null); // Return error response
        }
    }

    // Get method to fetch image by filename
    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            // Resolving the file path from your image folder
            Path filePath = Paths.get(imageFolder).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            // Check if the file exists
            if (resource.exists()) {
                // Determine the content type based on the file extension
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";  // Default to binary stream if content type can't be determined
                }

                // Serve the image with the correct content type
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType)) // Set appropriate media type for image
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build(); // Image not found
            }
        } catch (Exception e) {
            // Handle exceptions and return internal server error if something goes wrong
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // Update Food Item
    @PutMapping("/updatefood/{id}")
    public ResponseEntity<Food> updateFood(
            @PathVariable("id") String foodId,
            @RequestParam("food") String foodJson,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            // Convert JSON string to Food object
            Food updatedFood = foodService.convertJsonToFood(foodJson);

            // Update the food details and optionally the image
            Optional<Food> updatedFoodDetails = foodService.updateFood(foodId, updatedFood, image);

            // Check if the food item was found and updated
            return updatedFoodDetails.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build()); // Return 404 if the food item doesn't exist
        } catch (Exception e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(500).build(); // Return a generic server error response
        }
    }


    // Remove Food Item
    @DeleteMapping("/deletefood/{id}")
    public ResponseEntity<?> removeFood(@PathVariable String id) {
        boolean isDeleted = foodService.deleteFood(id);
        if (isDeleted) {
            return ResponseEntity.ok().body("Food item deleted successfully.");
        }
        return ResponseEntity.notFound().build();
    }
}
