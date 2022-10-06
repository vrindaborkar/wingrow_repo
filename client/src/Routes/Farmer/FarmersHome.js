import React from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../services/auth.service'
import './Farmer.css'

const FarmersHome = () => {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser)
  return (
    <div className='farmers_page'>
        <div className='farmers_navigate'>
            <Link className='links_farmersdata' to="/inward">
                Fill Inward Data
            </Link>
            <Link className='links_farmersdata' to="/outward">
                Fill Outward Data
            </Link>
        </div>
        <div className='farmers_data'>
            Welcome {currentUser.firstname} !!
        </div>
    </div>
  )
}

export default FarmersHome