import React from 'react'

const LocationSearchPanel = () => {
  return (
    <div>
      {/* this is a sample data */}
      <div className='flex gap-4 items-center my-4 justify-start '>
        <h2 className='bg-[#eee] h-10 w-16 flex items-center justify-center rounded-full'><i className="ri-map-pin-line"></i></h2>
        <h4 className='font-medium'>addres1,road2 Lorem, ipsum.lorem </h4>
      </div>
      <div className='flex gap-4 items-center my-4 justify-start '>
        <h2 className='bg-[#eee] h-10 w-16 flex items-center justify-center rounded-full'><i className="ri-map-pin-line"></i></h2>
        <h4 className='font-medium'>addres1,road2 Lorem, ipsum.lorem </h4>
      </div> 
    </div>
  )
}

export default LocationSearchPanel