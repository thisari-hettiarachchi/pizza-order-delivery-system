import basket_icon from "./basket_icon.png";
import cart_icon from "./cart_icon.png";
import shopping_bag from "./shopping_bag.png";
import logo from "./logo.png";
import header_img from "./header_img.png";
import search_icon from "./search_icon.png";

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
import pizza_9 from "./food_9.png";
import pizza_10 from "./food_10.png";
import pizza_11 from "./food_11.png";
import pizza_12 from "./food_12.png";
import pizza_13 from "./food_13.png";
import pizza_14 from "./food_14.png";
import pizza_15 from "./food_15.png";
import pizza_16 from "./food_16.png";
import pizza_17 from "./food_17.png";
import pizza_18 from "./food_18.png";
import pizza_19 from "./food_19.png";
import pizza_20 from "./food_20.png";
import pizza_21 from "./food_21.png";
import pizza_22 from "./food_22.png";
import pizza_23 from "./food_23.png";
import pizza_24 from "./food_24.png";
import pizza_25 from "./food_25.png";
import pizza_26 from "./food_26.png";
import pizza_27 from "./food_27.png";
import pizza_28 from "./food_28.png";
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
};

export const mockData = [
  {
    image: Pizza,
    title: "Original",
    paragraph: `Porta semper lacus cursus, feugiat primis ultrice a ligula risus auctor an tempus feugiat dolor lacinia cubilia curae integer orci congue and metus integer primis in integer metus`,
  },
  {
    image: Salad,
    title: "Qualty Foods",
    paragraph: `Porta semper lacus cursus, feugiat primis ultrice a ligula risus auctor an tempus feugiat dolor lacinia cubilia curae integer orci congue and metus integer primis in integer metus`,
  },
  {
    image: Delivery,
    title: "Fastest Delivery",
    paragraph: `Porta semper lacus cursus, feugiat primis ultrice a ligula risus auctor an tempus feugiat dolor lacinia cubilia curae integer orci congue and metus integer primis in integer metus`,
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
    category: "Salad",
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
    category: "Salad",
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
    category: "Salad",
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
    category: "Salad",
  },
  {
    _id: "5",
    name: "Cheesy Onion with Green Chillies",
    image: pizza_5,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Rich tomato sauce base topped with cream cheese, onions, green chillies & Mozzarella.",
    category: "Rolls",
  },
  {
    _id: "6",
    name: "Cheesy Tomato with Green Chillies",
    image: pizza_6,
    price: {
      small: 1500,
      medium: 20,
      large: 2500,
    },
    description:
      "Rich tomato sauce base topped with cream cheese, onions, tomato, green chillies & Mozzarella",
    category: "Rolls",
  },
  {
    _id: "7",
    name: "Sausage Delight",
    image: pizza_7,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description: "Chicken sausages & onions with a double layer of cheese.",
    category: "Rolls",
  },
  {
    _id: "8",
    name: "Chicken Bacon & Potato with Nai Miris",
    image: pizza_8,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "A flavoursome duo of chicken bacon and spicy potatoes on a fiery base of Nai Miris sauce complemented with crunchy onions and green chillies, topped with a layer of mozzarella cheese",
    category: "Rolls",
  },
  {
    _id: "13",
    name: "Chicken Sandwich",
    image: pizza_13,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
  },
  {
    _id: "14",
    name: "Vegan Sandwich",
    image: pizza_14,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
  },
  {
    _id: "15",
    name: "Grilled Sandwich",
    image: pizza_15,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
  },
  {
    _id: "16",
    name: "Bread Sandwich",
    image: pizza_16,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
  },
  {
    _id: "17",
    name: "Cup Cake",
    image: pizza_17,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
  },
  {
    _id: "18",
    name: "Vegan Cake",
    image: pizza_18,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
  },
  {
    _id: "19",
    name: "Butterscotch Cake",
    image: pizza_19,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
  },
  {
    _id: "20",
    name: "Sliced Cake",
    image: pizza_20,
    price: {
      small: 15,
      medium: 20,
      large: 25,
    },
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
  },
  {
    _id: "21",
    name: "Garlic Mushroom ",
    image: pizza_21,
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
    _id: "22",
    name: "Fried Cauliflower",
    image: pizza_22,
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
    _id: "23",
    name: "Mix Veg Pulao",
    image: pizza_23,
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
    _id: "24",
    name: "Rice Zucchini",
    image: pizza_24,
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
    _id: "25",
    name: "Cheese Pasta",
    image: pizza_25,
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
    _id: "26",
    name: "Tomato Pasta",
    image: pizza_26,
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
    _id: "27",
    name: "Creamy Pasta",
    image: pizza_27,
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
    _id: "28",
    name: "Chicken Pasta",
    image: pizza_28,
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
    _id: "9",
    name: "Ripple Ice Cream",
    image: pizza_9,
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
    _id: "10",
    name: "Fruit Ice Cream",
    image: pizza_10,
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
    _id: "11",
    name: "Jar Ice Cream",
    image: pizza_11,
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
    _id: "12",
    name: "Vanilla Ice Cream",
    image: pizza_12,
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
