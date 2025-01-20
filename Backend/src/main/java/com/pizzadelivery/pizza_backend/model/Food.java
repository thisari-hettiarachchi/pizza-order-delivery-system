package com.pizzadelivery.pizza_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "food")
public class Food {

    @Id
    private String id;
    private String name;
    private String image;
    private Price price;
    private String description;
    private String category;


    public Food() {}

    public Food(String id, String name, String image, Price price, String description, String category) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
        this.category = category;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    public Price getPrice() {
        return price;
    }

    public void setPrice(Price price) {
        this.price = price;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public static class Price {
        private int small;
        private int medium;
        private int large;


        public Price() {}

        public Price(int small, int medium, int large) {
            this.small = small;
            this.medium = medium;
            this.large = large;
        }

        public int getSmall() {
            return small;
        }

        public void setSmall(int small) {
            this.small = small;
        }


        public int getMedium() {
            return medium;
        }

        public void setMedium(int medium) {
            this.medium = medium;
        }


        public int getLarge() {
            return large;
        }

        public void setLarge(int large) {
            this.large = large;
        }
    }
}
