import React from 'react'
import { Outlet } from 'react-router-dom'
import FarmerNav from './FarmerNav'

const FarmersMain = () => {
  return (
    <>
        <FarmerNav/>
        <Outlet/>
    </>
  )
}

export default FarmersMain