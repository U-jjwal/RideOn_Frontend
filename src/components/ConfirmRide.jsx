import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
            props.setConfirmRidePanel(false)
        }}><i className="text-3xl text-gray-200 ri-arrow-down-s-line cursor-pointer"></i></h5>
        <h3 className='text-2xl font-bold mb-5'>Confirm your Ride</h3>

        <div className='flex gap-2 justify-between flex-col items-center'>
            <img className='h-24 object-contain my-4' src="https://imgs.search.brave.com/51w8bkuSl-1-WTxyp1IuMRxu_wF60VYGCWH39XC56qE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NTMzLzEyMy9zbWFs/bC9yZWFsaXN0aWMt/c3BvcnQtY2FyLWlz/b2xhdGVkLW9uLWJh/Y2tncm91bmQtM2Qt/cmVuZGVyaW5nLWls/bHVzdHJhdGlvbi1w/bmcucG5n" alt="" />
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg bg-gray-100 p-2 rounded-full ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>Pick Up</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg bg-gray-100 p-2 rounded-full ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>Drop Off</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="text-lg bg-gray-100 p-2 rounded-full ri-currency-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                    </div>
                </div>
            </div>
            <button onClick={() => {
                props.setVehicleFound(true)
                props.setConfirmRidePanel(false)
                props.createRide()
            }} className='w-full mt-5 bg-black text-white font-semibold p-3 rounded-lg hover:bg-gray-800 transition-colors'>Confirm</button>
        </div>
    </div>
  )
}

export default ConfirmRide