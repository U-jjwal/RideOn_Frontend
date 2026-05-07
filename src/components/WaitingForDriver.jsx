import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className='relative'>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setWaitingForDriver(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      {/* Floating Arrival Badge */}
      <div className='absolute -top-24 right-5 bg-white shadow-lg rounded-xl p-3 flex flex-col items-center justify-center w-28'>
        <h4 className='text-base font-semibold text-gray-700'>Arrival</h4>
        <h2 className='text-xl font-bold'>9 min</h2>
      </div>

      <div className='flex items-center justify-between mt-4'>
        <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Car" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{props.ride?.captain?.fullname?.firstname || "Driver"}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain?.vehicle?.plate || "Unknown"}</h4>
          <p className='text-sm text-gray-600 capitalize'>{props.ride?.captain?.vehicle?.color || "White"} {props.ride?.captain?.vehicle?.vehicleType || "Car"}</p>
          <h1 className='text-2xl font-bold mt-1 tracking-widest'>{props.ride?.otp}</h1>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center mt-6'>
        <div className='w-full'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill text-xl"></i>
            <div>
              <h3 className='text-lg font-medium'>Pickup Location</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>Destination</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line text-xl"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver