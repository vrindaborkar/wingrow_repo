import React from 'react'

const FarmersListData = ({Farmers}) => {
  return (
    <>
          <div className='farmers_data_entries'>
                <div className='farmers_entries'>
                    <div className='farmers_entries_nav'>
                    <span className='farmers_entries_nav_srno'>
                        Sr. No
                    </span>
                    <span className='farmers_entries_nav_farmername'>
                        Farmers Name
                    </span>
                    <span  className='farmers_entries_nav_farmerstype'>
                        Farmers Type
                    </span>
                    </div>

                    <div className='farmers_entries_body'>
                        {
                        Farmers && Farmers.map((e,i)=>{
                            return(
                            <div key={i} className='farmers_entries_section'>
                                <span className='farmers_entries_nav_srno'>
                                    {i+1}
                                </span>
                                <span className='farmers_entries_nav_farmername'>
                                    {e.firstname} {e.lastname}
                                </span>
                                <span  className='farmers_entries_nav_farmerstype'>
                                    {e.farmertype}
                                </span>
                            </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
    </>
  )
}

export default FarmersListData