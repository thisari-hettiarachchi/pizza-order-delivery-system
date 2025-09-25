import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { foodList, serverOffline } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      {serverOffline ? (
        <div className="food-display-offline">
          Server is offline. Can't display food items right now.
        </div>
      ) : (
        <div className="food-display-list">
          {foodList && foodList.length > 0 ? (
            foodList.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                );
              }
              return null;
            })
          ) : (
            <div className="food-display-empty">No items to display.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
