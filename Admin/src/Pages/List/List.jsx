import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [foodList, setFoodList] = useState([]);
  const [showItem, setShowItem] = useState(false);

  const fetchFoodList = async () => {
    try {
      const response = await fetch(`${url}/api/food/getfoods`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setFoodList(data);
      console.log("Fetched data", data);
    } catch (error) {
      console.error("Error fetching food list:", error);
      setFoodList([]); // Handle failure by setting foodList to an empty array
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, [url]);

  const removeFood = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this item?"
    );

    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`${url}/api/food/deletefood/${id}`);

      if (response.status === 200) {
        setFoodList((prevList) => prevList.filter((item) => item.id !== id));
        toast.success("Item removed successfully");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      toast.error("Failed to remove item");
      console.error("Error deleting food item:", error);
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price (Small / Medium / Large)</b>
          <b>Action</b>
        </div>
        {foodList.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/api/food/image/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {item.price.small} / {item.price.medium} / {item.price.large}
            </p>
            <p onClick={() => removeFood(item.id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
