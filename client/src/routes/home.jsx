import React from 'react'
import Header from '../components/Header'
import AddRestaurant from '../components/AddRestaurant'
import RestaurantList from '../components/RestaurantList'

const home = () => {
  return (
    <div>
        <Header/>
        <AddRestaurant/>
        <RestaurantList/>
    </div>
  )
}

export default home