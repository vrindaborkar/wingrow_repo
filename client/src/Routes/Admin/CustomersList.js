import React from 'react'

const CustomersList = ({Customer}) => {
  return (
    <>
          <div className='farmers_data_entries'>
                <div className='farmers_entries'>
                    <div className='farmers_entries_nav'>
                    <span className='farmers_entries_nav_srno'>
                        Sr. No
                    </span>
                    <span className='farmers_entries_nav_farmername'>
                        Customers Name
                    </span>
                    <span  className='farmers_entries_nav_farmerstype'>
                        Phone No.
                    </span>
                    </div>

                    <div className='farmers_entries_body'>
                        {
                        Customer && Customer.map((e,i)=>{
                            return(
                            <div key={i} className='farmers_entries_section'>
                                <span className='farmers_entries_nav_srno'>
                                    {i+1}
                                </span>
                                <span className='farmers_entries_nav_farmername'>
                                    {e.firstname} {e.lastname}
                                </span>
                                <span  className='farmers_entries_nav_farmerstype'>
                                    {e.phone}
                                </span>
                            </div>
                            )
                        })
                        }
                        {
                            !Customer && <div className='farmers_entries_section'>No data available</div>
                        }
                        {
                            Customer && Customer.length!==0 && <div className='farmers_entries_section'>No data available</div>
                        }
                    </div>
                </div>
            </div>
    </>
  )
}

export default CustomersList