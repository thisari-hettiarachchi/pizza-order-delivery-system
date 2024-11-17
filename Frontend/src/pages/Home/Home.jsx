import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import HeaderSection2 from '../../components/HeaderSection2/HeaderSection2'

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <HeaderSection2/>
      <ExploreMenu category={category} setCategory={ setCategory} />
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>
  )
}

export default Home
