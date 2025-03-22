import basket_icon from "./basket_icon.png";
import cart_icon from "./cart_icon.png";
import shopping_bag from "./shopping_bag.png";
import logo from "./logo.png";
import header_img from "./header_img.png";
import search_icon from "./search_icon.png";
import userPic from "./user.png";

import menu_1 from "./menu_1.png";
import menu_2 from "./menu_2.png";
import menu_3 from "./menu_3.png";
import menu_4 from "./menu_4.png";
import menu_5 from "./menu_5.png";
import menu_6 from "./menu_6.png";
import menu_7 from "./menu_7.png";
import menu_8 from "./menu_8.png";

import pizza_1 from "./Cheesy Garlic Pizza.jpg";
import pizza_2 from "./Spicy Fish Pizza.jpg";
import pizza_3 from "./Veggie Masala Pizza.jpg";
import pizza_4 from "./Chilli Chicken Pizza.jpg";
import pizza_5 from "./Cheesy Onion with Green Chillies.jpg";
import pizza_6 from "./Cheesy Tomato with Green Chillies.jpg";
import pizza_7 from "./Sausage Delight.jpg";
import pizza_8 from "./Chicken Bacon & Potato with Nai Miris.jpg";
import pizza_9 from "./Chicken Triple Treat Pizza.jpg";
import pizza_10 from "./Chicken Salami Pizza.jpg";
import pizza_11 from "./Double Chicken Surprise.jpg";
import pizza_12 from "./Cheese Lovers.jpg";
import pizza_13 from "./Tandoori Chicken.jpg";
import pizza_14 from "./Black Chicken.jpg";
import pizza_15 from "./Hot & Spicy Chicken.jpg";
import pizza_16 from "./food_16.png";
import pizza_17 from "./food_17.png";
import pizza_18 from "./food_18.png";
import pizza_19 from "./food_19.png";
import pizza_20 from "./food_20.png";
import pasta_21 from "./pasta_21.png";
import pasta_22 from "./pasta_22.png";
import pasta_23 from "./pasta_23.png";
import pasta_24 from "./pasta_24.png";
import dessert_25 from "./dessert_25.png";
import dessert_26 from "./dessert_26.png";
import dessert_27 from "./dessert_27.png";
import dessert_28 from "./dessert_28.png";
import pizza_29 from "./food_29.png";
import pizza_30 from "./food_30.png";
import pizza_31 from "./food_31.png";
import pizza_32 from "./food_32.png";

import add_icon_white from "./add_icon_white.png";
import add_icon_green from "./add_icon_green.png";
import remove_icon_red from "./remove_icon_red.png";
import app_store from "./app_store.png";
import play_store from "./play_store.png";
import linkedin_icon from "./linkedin_icon.png";
import facebook_icon from "./facebook_icon.png";
import twitter_icon from "./twitter_icon.png";
import cross_icon from "./cross_icon.png";
import selector_icon from "./selector_icon.png";
import rating_starts from "./rating_starts.png";
import profile_icon from "./profile_icon.png";
import bag_icon from "./bag_icon.png";
import logout_icon from "./logout_icon.png";
import parcel_icon from "./parcel_icon.png";


import Pizza from "./pizza.png";
import Salad from "./salad.png";
import Delivery from "./delivery-bike.png";
export const assets = {
  logo,
  basket_icon,
  shopping_bag,
  cart_icon,
  header_img,
  search_icon,
  rating_starts,
  add_icon_green,
  add_icon_white,
  remove_icon_red,
  app_store,
  play_store,
  linkedin_icon,
  facebook_icon,
  twitter_icon,
  cross_icon,
  selector_icon,
  profile_icon,
  logout_icon,
  bag_icon,
  parcel_icon,
  userPic,
};

export const mockData = [
  {
    image: Pizza,
    title: "Original",
    paragraph: `Always fresh and authentic, our pizza is made with the finest ingredients, ensuring a rich and delightful flavor in every bite. We craft each pizza with passion and precision to give you the ultimate taste experience.`,
  },
  {
    image: Salad,
    title: "Qualty Foods",
    paragraph: `We prioritize quality in every dish we serve, using fresh ingredients and expert preparation techniques. Our salads, meals, and specialties are designed to offer a perfect balance of nutrition and taste.`,
  },
  {
    image: Delivery,
    title: "Fastest Delivery",
    paragraph: `Enjoy hot and delicious food delivered to your doorstep in record time. Our efficient delivery service ensures that you receive your order fresh and exactly when you need it.`,
  },
];

export const menu_list = [
  {
    menu_name: "Pizza",
    menu_image: menu_1,
  },
  {
    menu_name: "Rolls",
    menu_image: menu_2,
  },
  {
    menu_name: "Deserts",
    menu_image: menu_3,
  },
  {
    menu_name: "Sandwich",
    menu_image: menu_4,
  },
  {
    menu_name: "Cake",
    menu_image: menu_5,
  },
  {
    menu_name: "Pasta",
    menu_image: menu_6,
  },
  {
    menu_name: "Desserts",
    menu_image: menu_7,
  },
  {
    menu_name: "Beverages",
    menu_image: menu_8,
  },
];

export const food_list = [
  {
    _id: "1",
    name: "Cheesy Garlic Pizza",
    image: pizza_1,
    price: {
      small: 890,
      medium: 1350,
      large: 1650,
    },
    description:
      "Italian Pizza Dough, Original Italian Olive oil, Fresh Garlic, Mozzarella Cheese, Basil",
    category: "Pizza",
  },
  {
    _id: "2",
    name: "Spicy Fish Pizza",
    image: pizza_2,
    price: {
      small: 840,
      medium: 1560,
      large: 2840,
    },
    description: "Made with Spicy Fish & 2 layers of cheese",
    category: "Pizza",
  },
  {
    _id: "3",
    name: "Veggie Masala Pizza",
    image: pizza_3,
    price: {
      small: 840,
      medium: 1560,
      large: 2840,
    },
    description: "Made with spicy veggie masala, onions, tomato & cheese",
    category: "Pizza",
  },
  {
    _id: "4",
    name: "Chilli Chicken Pizza",
    image: pizza_4,
    price: {
      small: 840,
      medium: 1560,
      large: 2840,
    },
    description:
      "A pizza topped with Spicy Chicken, Green Chillies, Onions & Mozzarella",
    category: "Pizza",
  },
  {
    _id: "5",
    name: "Cheesy Onion with Green Chillies",
    image: pizza_5,
    price: {
      small: 840,
      medium: 1560,
      large: 2840,
    },
    description:
      "Rich tomato sauce base topped with cream cheese, onions, green chillies & Mozzarella.",
    category: "Pizza",
  },
  {
    _id: "6",
    name: "Cheesy Tomato with Green Chillies",
    image: pizza_6,
    price: {
      small: 840,
      medium: 1560,
      large: 2840,
    },
    description:
      "Rich tomato sauce base topped with cream cheese, onions, tomato, green chillies & Mozzarella",
    category: "Pizza",
  },
  {
    _id: "7",
    name: "Sausage Delight",
    image: pizza_7,
    price: {
      small: 840,
      medium: 1560,
      large: 2840,
    },
    description: "Chicken sausages & onions with a double layer of cheese.",
    category: "Pizza",
  },
  {
    _id: "8",
    name: "Chicken Bacon Potato Nai Miris",
    image: pizza_8,
    price: {
      small: 840,
      medium: 1560,
      large: 2840,
    },
    description:
      "Chicken bacon and spicy potatoes on a fiery Nai Miris sauce, with onions, green chillies, and mozzarella cheese.",
    category: "Pizza",
  },
  {
    _id: "9",
    name: "Chicken Triple Treat Pizza",
    image: pizza_9,
    price: {
      small: 980,
      medium: 1930,
      large: 3460,
    },
    description:
      "Made with Chicken Salami, Roast Chicken, Chicken Bacon, Onions & Cheese",
    category: "Pizza",
  },
  {
    _id: "10",
    name: "Chicken Salami Pizza",
    image: pizza_10,
    price: {
      small: 980,
      medium: 1930,
      large: 3460,
    },
    description: "Made with Chicken Salami, Jalapenos & cheese",
    category: "Pizza",
  },
  {
    _id: "11",
    name: "Double Chicken Surprise",
    image: pizza_11,
    price: {
      small: 980,
      medium: 1930,
      large: 3460,
    },
    description:
      "A combination of spicy chicken and succulent chicken sausages accompanied with crunchy onions and capsicum, topped with a layer of mozzarella",
    category: "Pizza",
  },
  {
    _id: "12",
    name: "Cheese Lovers",
    image: pizza_12,
    price: {
      small: 980,
      medium: 1930,
      large: 3460,
    },
    description: "Rich tomato sauce with a triple layer of mozzarella cheese.",
    category: "Pizza",
  },
  {
    _id: "13",
    name: "Tandoori Chicken",
    image: pizza_13,
    price: {
      small: 980,
      medium: 1930,
      large: 3460,
    },
    description: "Tandoori chicken & onions with a double layer of cheese.",
    category: "Pizza",
  },
  {
    _id: "14",
    name: "Black Chicken",
    image: pizza_14,
    price: {
      small: 980,
      medium: 1930,
      large: 3460,
    },
    description:
      "Flavoursome pieces of black chicken and crunchy onion with a double layer of cheese.",
    category: "Pizza",
  },
  {
    _id: "15",
    name: "Hot & Spicy Chicken",
    image: pizza_15,
    price: {
      small: 980,
      medium: 1930,
      large: 3460,
    },
    description:
      "Spicy chunks of chicken, capsicums & onions with a double layer of cheese.",
    category: "Pizza",
  },
  {
    _id: "16",
    name: "Sliced Pizza",
    image: pizza_16,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pizza",
  },
  {
    _id: "17",
    name: "Garlic Mushroom ",
    image: pizza_17,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
  },
  {
    _id: "18",
    name: "Fried Cauliflower",
    image: pizza_18,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
  },
  {
    _id: "19",
    name: "Mix Veg Pulao",
    image: pizza_19,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
  },
  {
    _id: "20",
    name: "Rice Zucchini",
    image: pizza_20,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
  },
  {
    _id: "21",
    name: "Cheese Pasta",
    image: pasta_21,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
  },
  {
    _id: "22",
    name: "Tomato Pasta",
    image: pasta_22,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
  },
  {
    _id: "23",
    name: "Creamy Pasta",
    image: pasta_23,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
  },
  {
    _id: "24",
    name: "Chicken Pasta",
    image: pasta_24,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
  },
  {
    _id: "25",
    name: "Ripple Ice Cream",
    image: dessert_25,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Desserts",
  },
  {
    _id: "26",
    name: "Fruit Ice Cream",
    image: dessert_26,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Desserts",
  },
  {
    _id: "27",
    name: "Jar Ice Cream",
    image: dessert_27,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Desserts",
  },
  {
    _id: "28",
    name: "Vanilla Ice Cream",
    image: dessert_28,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Desserts",
  },
  {
    _id: "29",
    name: "Buttter Beverages",
    image: pizza_29,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Beverages",
  },
  {
    _id: "30",
    name: "Veg Beverages",
    image: pizza_30,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Beverages",
  },
  {
    _id: "31",
    name: "Somen Beverages",
    image: pizza_31,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Beverages",
  },
  {
    _id: "32",
    name: "Cooked Beverages",
    image: pizza_32,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Beverages",
  },
];
