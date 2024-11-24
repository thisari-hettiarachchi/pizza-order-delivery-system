import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import Section2 from "../../components/Section2/Section2";
import Section3 from "../../components/Section3/Section3";
import Section4 from "../../components/Section4/Section4";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <Section2 />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <Section3 />
      <AppDownload />
      <Section4 />
    </div>
  );
};

export default Home;
